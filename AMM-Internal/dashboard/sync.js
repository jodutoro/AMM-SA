// ─── AMM Sync — GitHub-backed edit persistence ────────────────────────────────
// Writes AMM_DATA back to data.json in the repo on every saved edit.
// Netlify auto-deploys on push → all viewers see the change within ~30s.
//
// Auth: GitHub Fine-grained PAT stored in localStorage (never committed).
//   Required scope: Contents → Read and write (repo: jodutoro/AMM-SA)
//   Create at: github.com/settings/personal-access-tokens/new
//
// Exposes: window.AMMSync — call AMMSync.init() after AMM_DATA is loaded.
// ─────────────────────────────────────────────────────────────────────────────

(function () {
  'use strict';

  const OWNER    = 'jodutoro';
  const REPO     = 'AMM-SA';
  const JSON_PATH = 'AMM-Internal/dashboard/data.json';
  const LS_PAT   = 'amm-sync-pat';
  const LS_LOG   = 'amm-sync-log';

  let _log      = [];
  let _pending  = [];
  let _timer    = null;

  // ── Edit log ─────────────────────────────────────────────────────────────────
  function loadLog() {
    try { _log = JSON.parse(localStorage.getItem(LS_LOG)) || []; } catch { _log = []; }
  }
  function saveLog() {
    localStorage.setItem(LS_LOG, JSON.stringify(_log.slice(-200)));
  }
  function addToLog(entry) {
    _log.unshift({ ts: new Date().toISOString(), ...entry });
    saveLog();
  }

  // ── CSS ──────────────────────────────────────────────────────────────────────
  const css = `
    /* ── Sync status pill in nav ── */
    #amm-sync-pill {
      display: inline-flex; align-items: center; gap: 5px;
      padding: 4px 10px; border-radius: var(--radius-sm);
      font-size: .6875rem; font-weight: 700; letter-spacing: .04em;
      transition: all 200ms cubic-bezier(0.23,1,0.32,1);
      cursor: default; border: none; background: transparent; color: var(--muted);
    }
    #amm-sync-pill.syncing {
      color: var(--blue); background: rgba(37,99,235,.08);
    }
    #amm-sync-pill.synced {
      color: var(--green); background: rgba(22,163,74,.08);
    }
    #amm-sync-pill.error {
      color: var(--red); background: rgba(220,38,38,.08);
      cursor: pointer;
    }
    #amm-sync-pill.setup {
      color: var(--purple); background: rgba(124,58,237,.08);
      cursor: pointer;
    }
    #amm-sync-pill:active { transform: scale(0.97); }

    /* ── Sync dot indicator ── */
    .sync-dot {
      width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0;
      background: currentColor;
    }
    .syncing .sync-dot {
      animation: syncPulse 900ms cubic-bezier(0.4,0,0.6,1) infinite;
    }
    @keyframes syncPulse {
      0%, 100% { opacity: 1; }
      50%       { opacity: .25; }
    }

    /* ── PAT setup modal ── */
    #amm-sync-modal {
      position: fixed; inset: 0; z-index: 10000;
      background: rgba(0,0,0,.55); backdrop-filter: blur(4px);
      display: flex; align-items: center; justify-content: center;
      opacity: 0; pointer-events: none;
      transition: opacity 200ms cubic-bezier(0.23,1,0.32,1);
    }
    #amm-sync-modal.open { opacity: 1; pointer-events: auto; }
    .sync-modal-box {
      background: var(--bg-card); border: 1px solid var(--border);
      border-radius: 14px; padding: 28px 32px; max-width: 440px; width: 90%;
      box-shadow: 0 24px 60px rgba(0,0,0,.25);
      transform: scale(0.95); transition: transform 200ms cubic-bezier(0.23,1,0.32,1);
    }
    #amm-sync-modal.open .sync-modal-box { transform: scale(1); }
    .sync-modal-title {
      font-size: 1rem; font-weight: 800; color: var(--text);
      margin-bottom: 6px;
    }
    .sync-modal-desc {
      font-size: .8125rem; color: var(--muted); line-height: 1.6; margin-bottom: 18px;
    }
    .sync-modal-desc a { color: var(--blue); text-decoration: none; }
    .sync-modal-desc a:hover { text-decoration: underline; }
    .sync-modal-steps {
      background: var(--bg-card2); border: 1px solid var(--border);
      border-radius: 8px; padding: 12px 16px; margin-bottom: 18px;
      font-size: .75rem; color: var(--text-2); line-height: 1.8;
    }
    .sync-modal-steps ol { padding-left: 16px; }
    .sync-modal-steps code {
      background: var(--border); padding: 1px 5px; border-radius: 4px;
      font-family: monospace; font-size: .6875rem;
    }
    .sync-pat-input {
      width: 100%; background: var(--bg-card2); border: 1px solid var(--border-mid);
      border-radius: 8px; padding: 10px 12px; font-size: .875rem;
      color: var(--text); font-family: monospace; margin-bottom: 14px;
      transition: border-color 150ms;
    }
    .sync-pat-input:focus { outline: none; border-color: var(--purple); }
    .sync-modal-row { display: flex; gap: 8px; justify-content: flex-end; }
    .sync-modal-cancel {
      padding: 8px 16px; border-radius: 8px; border: 1px solid var(--border);
      background: transparent; color: var(--muted); cursor: pointer; font-size: .8125rem;
      transition: background 150ms;
    }
    .sync-modal-cancel:hover { background: var(--bg-card2); color: var(--text); }
    .sync-modal-save {
      padding: 8px 20px; border-radius: 8px; border: none;
      background: var(--purple); color: #fff; cursor: pointer;
      font-size: .8125rem; font-weight: 700; transition: opacity 150ms;
    }
    .sync-modal-save:hover { opacity: .85; }
    .sync-modal-save:active { transform: scale(0.97); }

    /* ── Edit log panel ── */
    #amm-sync-log-panel {
      position: fixed; top: 0; right: 0; bottom: 0; z-index: 600;
      width: 340px; max-width: 100vw;
      background: var(--bg-card); border-left: 1px solid var(--border);
      display: flex; flex-direction: column;
      transform: translateX(100%);
      transition: transform 280ms cubic-bezier(0.32,0.72,0,1);
      box-shadow: -20px 0 50px rgba(0,0,0,.15);
    }
    [data-theme="dark"] #amm-sync-log-panel {
      box-shadow: -20px 0 50px rgba(0,0,0,.45);
    }
    #amm-sync-log-panel.open { transform: translateX(0); }
    .slp-header {
      display: flex; align-items: center; justify-content: space-between;
      padding: 16px 20px; border-bottom: 1px solid var(--border); flex-shrink: 0;
    }
    .slp-title { font-size: .8125rem; font-weight: 800; letter-spacing: .05em;
      text-transform: uppercase; color: var(--text-2); }
    .slp-close {
      width: 28px; height: 28px; border-radius: 6px; border: none;
      background: transparent; color: var(--muted); cursor: pointer;
      display: flex; align-items: center; justify-content: center;
    }
    .slp-close:hover { background: var(--bg-card2); color: var(--text); }
    .slp-list { flex: 1; overflow-y: auto; padding: 14px 20px; display: flex; flex-direction: column; gap: 10px; }
    .slp-empty { font-size: .8125rem; color: var(--muted); text-align: center; padding: 32px 0; }
    .slp-entry {
      background: var(--bg-card2); border: 1px solid var(--border);
      border-radius: 8px; padding: 10px 12px;
    }
    .slp-summary { font-size: .8125rem; font-weight: 600; color: var(--text); margin-bottom: 4px; }
    .slp-meta { font-size: .6875rem; color: var(--muted); }
    .slp-diff {
      margin-top: 6px; font-size: .75rem; color: var(--muted);
      background: var(--bg-card); border-radius: 5px; padding: 5px 8px;
      border-left: 2px solid var(--border-mid);
    }
    .slp-diff-old { color: var(--red); text-decoration: line-through; margin-bottom: 2px; }
    .slp-diff-new { color: var(--green); }
    .slp-footer {
      padding: 14px 20px; border-top: 1px solid var(--border); flex-shrink: 0;
      display: flex; gap: 8px;
    }
    .slp-reconnect {
      flex: 1; padding: 8px; border-radius: 7px; border: 1px solid var(--border);
      background: transparent; color: var(--muted); cursor: pointer; font-size: .75rem;
      transition: all 150ms;
    }
    .slp-reconnect:hover { color: var(--text); border-color: var(--border-mid); }

    @media (prefers-reduced-motion: reduce) {
      #amm-sync-log-panel { transition: none; }
      #amm-sync-modal, .sync-modal-box { transition: none; }
      .syncing .sync-dot { animation: none; }
    }
  `;

  function injectCSS() {
    if (document.getElementById('amm-sync-css')) return;
    const s = document.createElement('style');
    s.id = 'amm-sync-css';
    s.textContent = css;
    document.head.appendChild(s);
  }

  // ── Status pill ──────────────────────────────────────────────────────────────
  let _statusTimer = null;

  function getPill() {
    return document.getElementById('amm-sync-pill');
  }

  function setStatus(state, label) {
    const pill = getPill();
    if (!pill) return;
    pill.className = state;
    const dot = `<span class="sync-dot"></span>`;
    const labels = {
      idle:    '',
      setup:   dot + ' Connect to sync',
      syncing: dot + ' Saving…',
      synced:  dot + ' Saved to repo',
      error:   dot + ' Sync failed',
    };
    pill.innerHTML = labels[state] + (label ? ` · ${label}` : '');
    pill.title = label || '';

    clearTimeout(_statusTimer);
    if (state === 'synced') {
      _statusTimer = setTimeout(() => {
        pill.className = 'idle';
        pill.innerHTML = '';
      }, 3500);
    }
  }

  // ── PAT setup modal ──────────────────────────────────────────────────────────
  let _onPatSaved = null;

  function injectModal() {
    if (document.getElementById('amm-sync-modal')) return;
    const el = document.createElement('div');
    el.id = 'amm-sync-modal';
    el.innerHTML = `
      <div class="sync-modal-box">
        <div class="sync-modal-title">Connect to GitHub</div>
        <div class="sync-modal-desc">
          A Personal Access Token lets the dashboard write edits directly back to the repo.
          It's stored only in your browser — never committed.
        </div>
        <div class="sync-modal-steps">
          <ol>
            <li>Go to <a href="https://github.com/settings/personal-access-tokens/new" target="_blank">GitHub → Settings → Fine-grained tokens</a></li>
            <li>Set <strong>Repository access</strong> → <code>jodutoro/AMM-SA</code></li>
            <li>Under <strong>Repository permissions</strong>, set <strong>Contents → Read and write</strong></li>
            <li>Generate and paste the token below</li>
          </ol>
        </div>
        <input class="sync-pat-input" id="amm-sync-pat-input"
               type="password" placeholder="github_pat_…" autocomplete="off" spellcheck="false">
        <div class="sync-modal-row">
          <button class="sync-modal-cancel" onclick="AMMSync._closeModal()">Cancel</button>
          <button class="sync-modal-save"   onclick="AMMSync._savePat()">Connect</button>
        </div>
      </div>
    `;
    el.addEventListener('click', e => { if (e.target === el) AMMSync._closeModal(); });
    document.body.appendChild(el);
    void el.offsetWidth;
    el.classList.add('open');
    setTimeout(() => document.getElementById('amm-sync-pat-input')?.focus(), 50);
  }

  // ── Log panel ────────────────────────────────────────────────────────────────
  let _logPanelOpen = false;

  function injectLogPanel() {
    if (document.getElementById('amm-sync-log-panel')) return;
    const el = document.createElement('div');
    el.id = 'amm-sync-log-panel';
    document.body.appendChild(el);
  }

  function renderLogPanel() {
    const el = document.getElementById('amm-sync-log-panel');
    if (!el) return;
    const items = _log.length
      ? _log.map(e => {
          const d = new Date(e.ts);
          const ts = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) +
                     ' · ' + d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
          const diffHtml = (e.old !== undefined && e.new !== undefined)
            ? `<div class="slp-diff">
                 <div class="slp-diff-old">${String(e.old).slice(0, 80)}</div>
                 <div class="slp-diff-new">${String(e.new).slice(0, 80)}</div>
               </div>` : '';
          return `
            <div class="slp-entry">
              <div class="slp-summary">${e.summary || e.field || 'Edit'}</div>
              <div class="slp-meta">${ts}</div>
              ${diffHtml}
            </div>`;
        }).join('')
      : `<div class="slp-empty">No edits yet.<br>Changes will appear here.</div>`;

    el.innerHTML = `
      <div class="slp-header">
        <span class="slp-title">Edit Log</span>
        <button class="slp-close" onclick="AMMSync._closeLog()">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round">
            <line x1="1" y1="1" x2="11" y2="11"/><line x1="11" y1="1" x2="1" y2="11"/>
          </svg>
        </button>
      </div>
      <div class="slp-list">${items}</div>
      <div class="slp-footer">
        <button class="slp-reconnect" onclick="AMMSync._openSetup()">
          ${localStorage.getItem(LS_PAT) ? '🔑 Replace token' : '🔑 Connect GitHub'}
        </button>
      </div>
    `;
  }

  // ── Nav injection ────────────────────────────────────────────────────────────
  function injectNavElements() {
    const navMeta = document.querySelector('.nav-meta');
    if (!navMeta) return;

    // Status pill
    if (!document.getElementById('amm-sync-pill')) {
      const pill = document.createElement('button');
      pill.id = 'amm-sync-pill';
      pill.className = 'idle';
      pill.onclick = () => {
        if (pill.classList.contains('setup')) { AMMSync._openSetup(); return; }
        if (pill.classList.contains('error')) { AMMSync._openSetup(); return; }
        AMMSync._toggleLog();
      };
      navMeta.insertBefore(pill, navMeta.firstChild);
    }

    // Show setup prompt if no PAT
    if (!localStorage.getItem(LS_PAT)) {
      setStatus('setup');
    }
  }

  // ── GitHub API ───────────────────────────────────────────────────────────────
  async function getFileSha(pat) {
    const r = await fetch(
      `https://api.github.com/repos/${OWNER}/${REPO}/contents/${JSON_PATH}`,
      { headers: { Authorization: `Bearer ${pat}`, Accept: 'application/vnd.github+json' } }
    );
    if (r.status === 401) throw new Error('Invalid token — reconnect GitHub');
    if (!r.ok) throw new Error(`GitHub ${r.status}: ${r.statusText}`);
    const d = await r.json();
    return d.sha;
  }

  async function putDataJson(pat, content, message) {
    const sha = await getFileSha(pat);
    const encoded = btoa(unescape(encodeURIComponent(content)));
    const r = await fetch(
      `https://api.github.com/repos/${OWNER}/${REPO}/contents/${JSON_PATH}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${pat}`,
          Accept: 'application/vnd.github+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message, content: encoded, sha }),
      }
    );
    if (!r.ok) {
      const err = await r.json().catch(() => ({}));
      throw new Error(err.message || `GitHub ${r.status}`);
    }
    return r.json();
  }

  // ── Debounced sync ────────────────────────────────────────────────────────────
  async function doSync(changes) {
    const pat = localStorage.getItem(LS_PAT);
    if (!pat) {
      _onPatSaved = () => doSync(changes);
      injectModal();
      return;
    }

    setStatus('syncing');
    try {
      const summaries = [...new Set(changes.map(c => c.summary))].join('; ');
      const msg = `edit(dashboard): ${summaries} [auto-sync]`;
      const content = JSON.stringify(window.AMM_DATA, null, 2);

      await putDataJson(pat, content, msg);

      changes.forEach(c => addToLog(c));
      _pending = [];

      setStatus('synced');
      if (_logPanelOpen) renderLogPanel();
    } catch (e) {
      console.error('[AMMSync]', e);
      setStatus('error', e.message);
      // If auth error, clear PAT and prompt to reconnect
      if (e.message.includes('Invalid token')) {
        localStorage.removeItem(LS_PAT);
      }
    }
  }

  function queueSync(change) {
    _pending.push(change);
    clearTimeout(_timer);
    setStatus('syncing');
    _timer = setTimeout(() => doSync([..._pending]), 1500);
  }

  // ── Public API ───────────────────────────────────────────────────────────────
  const AMMSync = {
    init() {
      injectCSS();
      loadLog();
      injectLogPanel();
      // Wait for nav to exist
      if (document.querySelector('.nav-meta')) {
        injectNavElements();
      } else {
        document.addEventListener('DOMContentLoaded', injectNavElements);
      }
    },

    // Call after mutating AMM_DATA with a description of what changed
    recordEdit(summary, field, oldVal, newVal) {
      queueSync({ summary, field, old: oldVal, new: newVal });
    },

    isConnected() { return !!localStorage.getItem(LS_PAT); },

    getLog() { return [..._log]; },

    // Internal UI methods (called from inline HTML)
    _openSetup() { injectModal(); },

    _closeModal() {
      const el = document.getElementById('amm-sync-modal');
      if (el) {
        el.classList.remove('open');
        setTimeout(() => el.remove(), 250);
      }
    },

    _savePat() {
      const input = document.getElementById('amm-sync-pat-input');
      const pat = input?.value.trim();
      if (!pat) { input?.focus(); return; }
      localStorage.setItem(LS_PAT, pat);
      AMMSync._closeModal();
      setStatus('idle');
      if (_onPatSaved) { _onPatSaved(); _onPatSaved = null; }
    },

    _toggleLog() {
      _logPanelOpen = !_logPanelOpen;
      const el = document.getElementById('amm-sync-log-panel');
      if (!el) return;
      if (_logPanelOpen) { renderLogPanel(); el.classList.add('open'); }
      else el.classList.remove('open');
    },

    _closeLog() {
      _logPanelOpen = false;
      const el = document.getElementById('amm-sync-log-panel');
      if (el) el.classList.remove('open');
    },
  };

  window.AMMSync = AMMSync;
})();
