// ─── AMM Actions — ClickUp Live Sync ─────────────────────────────────────────
// Bidirectional sync with a ClickUp list.
// All custom fields and tags auto-detected and rendered.
// One-time setup: enter your Personal API Token + List ID.
// Falls back gracefully when not configured.
// ─────────────────────────────────────────────────────────────────────────────

(function () {
  'use strict';

  const LS_CONFIG  = 'amm-cu-config';   // { token, listId }
  const LS_CACHE   = 'amm-cu-cache';    // snapshot for instant paint
  const CU_API     = 'https://api.clickup.com/api/v2';
  const POLL_MS    = 30_000;

  // ── State ──────────────────────────────────────────────────────────────────
  let _cfg       = null;
  let _listMeta  = null;
  let _cfDefs    = [];      // custom field definitions (filtered to renderable types)
  let _members   = [];      // list members for assignee dropdown
  let _tasks     = [];      // current task set
  let _spaceTags = [];      // space-level tags for tag picker
  let _syncing   = false;
  let _lastSync  = null;
  let _pollTimer = null;
  let _editId    = null;    // task id being edited in modal, null = new

  // ── CSS ────────────────────────────────────────────────────────────────────
  function injectCSS() {
    document.head.insertAdjacentHTML('beforeend', `<style>
      /* ── Setup card ── */
      .cu-setup {
        background: var(--bg-card); border: 1px solid var(--border);
        border-radius: var(--radius); padding: 32px;
        max-width: 480px; display: flex; flex-direction: column; gap: 20px;
      }
      .cu-setup-title { font-size: 1rem; font-weight: 700; }
      .cu-setup-desc  { font-size: .8125rem; color: var(--muted); line-height: 1.65; margin-top: 6px; }
      .cu-setup-field { display: flex; flex-direction: column; gap: 6px; }
      .cu-setup-field label {
        font-size: .6875rem; font-weight: 700;
        text-transform: uppercase; letter-spacing: .05em; color: var(--muted);
      }
      .cu-setup-field input {
        background: var(--bg-card2); border: 1px solid var(--border-mid);
        border-radius: 8px; padding: 9px 12px;
        color: var(--text); font-size: .875rem; font-family: inherit;
        transition: border-color 150ms;
      }
      .cu-setup-field input:focus { outline: none; border-color: var(--blue); }
      .cu-setup-hint { font-size: .6875rem; color: var(--muted); line-height: 1.6; margin-top: 2px; }
      .cu-setup-err  { font-size: .75rem; color: var(--red); }
      .cu-connect-btn {
        padding: 10px 20px; border-radius: 8px; border: none;
        background: #7B5BFF; color: #fff; cursor: pointer;
        font-size: .875rem; font-weight: 700; align-self: flex-start;
        transition: opacity 150ms;
      }
      .cu-connect-btn:hover    { opacity: .85; }
      .cu-connect-btn:disabled { opacity: .45; cursor: not-allowed; }

      /* ── Sync bar ── */
      .cu-sync-bar {
        display: flex; align-items: center; gap: 8px;
        font-size: .6875rem; color: var(--muted); margin-left: auto; flex-shrink: 0;
      }
      .cu-sync-dot {
        width: 7px; height: 7px; border-radius: 50%;
        background: var(--green); flex-shrink: 0;
      }
      .cu-sync-dot.syncing {
        background: var(--yellow);
        animation: livepulse 1s ease-in-out infinite;
      }
      .cu-sync-dot.error { background: var(--red); }
      .cu-sync-text { white-space: nowrap; }
      .cu-sync-btn, .cu-disconnect-btn {
        padding: 3px 9px; border-radius: 6px; border: 1px solid var(--border);
        background: transparent; cursor: pointer; font-size: .6875rem; font-weight: 600;
        color: var(--muted); transition: color 150ms, border-color 150ms;
        white-space: nowrap;
      }
      .cu-sync-btn:hover       { color: var(--text); border-color: var(--border-mid); }
      .cu-disconnect-btn:hover { color: var(--red);  border-color: rgba(239,68,68,.4); }

      /* ── Tag pills ── */
      .cu-tag {
        display: inline-flex; align-items: center;
        padding: 2px 7px; border-radius: 999px;
        font-size: .5625rem; font-weight: 700; white-space: nowrap;
      }

      /* ── Status pill (clickable) ── */
      .cu-status {
        display: inline-flex; align-items: center; gap: 5px;
        padding: 3px 10px; border-radius: 999px;
        font-size: .5625rem; font-weight: 700;
        letter-spacing: .04em; text-transform: uppercase;
        cursor: pointer; border: 1px solid transparent;
        transition: opacity 150ms; white-space: nowrap;
      }
      .cu-status:hover { opacity: .72; }
      .cu-status-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }

      /* ── Row action buttons ── */
      .act-row-btns { display: flex; gap: 4px; opacity: 0; transition: opacity 150ms; align-items: center; }
      tr:hover .act-row-btns { opacity: 1; }
      .act-edit-btn, .act-delete-btn {
        display: flex; align-items: center; justify-content: center;
        width: 26px; height: 26px; border-radius: 6px; border: none;
        background: transparent; cursor: pointer; color: var(--muted);
        transition: color 150ms, background 150ms;
      }
      .act-edit-btn:hover   { color: var(--blue); background: rgba(59,130,246,.1); }
      .act-delete-btn:hover { color: var(--red);  background: rgba(239,68,68,.1); }
      .act-cu-link {
        display: inline-flex; align-items: center;
        width: 26px; height: 26px; justify-content: center;
        border-radius: 6px; color: var(--muted); text-decoration: none;
        transition: color 150ms, background 150ms;
      }
      .act-cu-link:hover { color: var(--blue); background: rgba(59,130,246,.1); }

      /* ── Add button ── */
      .act-add-btn {
        display: inline-flex; align-items: center; gap: 6px;
        padding: 7px 14px; border-radius: 8px; border: 1px solid var(--border-mid);
        background: transparent; color: var(--text-2); cursor: pointer;
        font-size: .8125rem; font-weight: 600;
        transition: background 150ms, border-color 150ms; white-space: nowrap;
      }
      .act-add-btn:hover { background: var(--bg-card2); border-color: var(--border-hi); }

      /* ── Text states ── */
      .act-done-text { text-decoration: line-through; opacity: .4; }

      /* ── Custom field cells ── */
      .col-cf { max-width: 150px; }
      .cf-text {
        font-size: .8125rem; color: var(--muted);
        max-width: 140px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
        display: block;
      }
      .cf-number    { font-size: .8125rem; color: var(--muted); font-variant-numeric: tabular-nums; }
      .cf-check     { color: var(--green); font-size: .875rem; }
      .cf-nocheck   { color: var(--muted); opacity: .3; font-size: .875rem; }
      .cf-progress-bar {
        height: 4px; border-radius: 2px;
        background: rgba(255,255,255,.08); overflow: hidden; min-width: 56px;
      }
      .cf-progress-fill { height: 100%; background: var(--blue); border-radius: 2px; }
      .cf-label-pill {
        display: inline-flex; align-items: center;
        padding: 2px 7px; border-radius: 999px;
        font-size: .5625rem; font-weight: 700;
        margin-right: 2px; margin-bottom: 2px;
      }

      /* ── Modal ── */
      #actionModal { display: none; }
      #actionModal.open { display: block; }
      .am-overlay {
        position: fixed; inset: 0; z-index: 599;
        background: rgba(15,23,42,.45); backdrop-filter: blur(4px);
      }
      .am-modal {
        position: fixed; top: 50%; left: 50%; z-index: 600;
        transform: translate(-50%,-50%);
        background: var(--bg-card); border: 1px solid var(--border);
        border-radius: 10px; width: min(520px, 92vw);
        max-height: 88vh; overflow-y: auto; padding: 0;
        box-shadow: 0 20px 60px rgba(0,0,0,.14);
      }
      .am-modal-header {
        display: flex; align-items: center; justify-content: space-between;
        padding: 20px 24px 16px; position: sticky; top: 0;
        background: var(--bg-card); z-index: 1;
        border-bottom: 1px solid var(--border);
      }
      .am-modal-body { padding: 20px 24px; }
      .am-modal-title { font-size: 1rem; font-weight: 700; color: var(--text); }
      .am-close {
        width: 32px; height: 32px; border-radius: 6px; border: none;
        background: transparent; color: var(--muted); cursor: pointer;
        display: flex; align-items: center; justify-content: center;
        transition: background 150ms cubic-bezier(0.23,1,0.32,1);
      }
      .am-close:hover { background: var(--bg-card2); color: var(--text); }
      .am-close:active { transform: scale(0.95); }
      .am-field { display: flex; flex-direction: column; gap: 6px; margin-bottom: 14px; }
      .am-field label {
        font-size: .6875rem; font-weight: 700; color: var(--muted);
        letter-spacing: .04em; text-transform: uppercase;
      }
      .am-optional { text-transform: none; font-weight: 400; opacity: .55; }
      .am-field input, .am-field textarea, .am-field select {
        background: var(--bg-card2); border: 1px solid var(--border);
        border-radius: 6px; padding: 9px 12px;
        color: var(--text); font-size: .875rem; font-family: inherit;
        transition: border-color 150ms; resize: vertical;
      }
      .am-field input:focus, .am-field textarea:focus, .am-field select:focus {
        outline: none; border-color: var(--blue);
        box-shadow: 0 0 0 3px rgba(37,99,235,.1);
      }
      .am-field select option { background: var(--bg-card2); color: var(--text); }
      .am-2col { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
      .am-footer {
        display: flex; justify-content: flex-end; gap: 10px;
        padding: 14px 24px 20px; position: sticky; bottom: 0;
        background: var(--bg-card);
        border-top: 1px solid var(--border);
      }
      .am-cancel {
        padding: 9px 18px; border-radius: 6px; border: 1px solid var(--border);
        background: transparent; color: var(--muted); cursor: pointer;
        font-size: .875rem; font-weight: 600;
        transition: background 150ms, color 150ms;
      }
      .am-cancel:hover  { background: var(--bg-card2); color: var(--text); }
      .am-cancel:active { transform: scale(0.97); }
      .am-submit {
        padding: 9px 24px; border-radius: 6px; border: none;
        background: var(--text); color: var(--bg-card); cursor: pointer;
        font-size: .875rem; font-weight: 700;
        transition: opacity 150ms;
      }
      .am-submit:hover    { opacity: .82; }
      .am-submit:active   { transform: scale(0.97); }
      .am-submit:disabled { opacity: .4; cursor: not-allowed; }

      /* ── Assignee searchbar ── */
      .am-assignee-wrap { position: relative; }
      .am-assignee-dropdown {
        position: absolute; top: calc(100% + 4px); left: 0; right: 0;
        background: var(--bg-card); border: 1px solid var(--border);
        border-radius: 6px; z-index: 10; max-height: 200px; overflow-y: auto;
        box-shadow: 0 8px 24px rgba(0,0,0,.1);
        display: none;
      }
      .am-assignee-dropdown.open { display: block; }
      .am-assignee-opt {
        padding: 9px 12px; font-size: .875rem; cursor: pointer;
        color: var(--text); display: flex; align-items: center; gap: 10px;
        transition: background 100ms;
      }
      .am-assignee-opt:hover { background: var(--bg-card2); }
      .am-assignee-opt.selected { background: var(--bg-card2); font-weight: 600; }
      .am-assignee-avatar {
        width: 26px; height: 26px; border-radius: 50%;
        background: var(--bg-card2); border: 1px solid var(--border);
        display: flex; align-items: center; justify-content: center;
        font-size: .625rem; font-weight: 700; color: var(--muted);
        flex-shrink: 0; overflow: hidden;
      }
      .am-assignee-avatar img { width: 100%; height: 100%; object-fit: cover; border-radius: 50%; }
      .am-assignee-none { color: var(--muted); font-style: italic; }

      /* ── Tag picker in modal ── */
      .am-tags-grid { display: flex; flex-wrap: wrap; gap: 6px; }
      .am-tag-toggle {
        padding: 3px 10px; border-radius: 999px; cursor: pointer;
        font-size: .6875rem; font-weight: 700;
        border: 1px solid var(--border);
        background: var(--bg-card2); color: var(--muted);
        transition: opacity 150ms, background 150ms;
      }
      .am-tag-toggle.active { opacity: 1; }
      .am-tag-toggle:not(.active) { opacity: .45; }
      .am-tags-note { font-size: .6875rem; color: var(--muted); margin-top: 6px; }
    </style>`);
  }

  // ── API client ──────────────────────────────────────────────────────────────
  async function api(path, opts = {}) {
    const res = await fetch(`${CU_API}${path}`, {
      ...opts,
      headers: {
        'Authorization': _cfg.token,
        'Content-Type': 'application/json',
        ...(opts.headers || {})
      }
    });
    if (!res.ok) {
      const j = await res.json().catch(() => ({}));
      throw new Error(j.err || j.ECODE || `HTTP ${res.status}`);
    }
    return res.json();
  }

  // ── Config ──────────────────────────────────────────────────────────────────
  function loadConfig() {
    try { _cfg = JSON.parse(localStorage.getItem(LS_CONFIG)) || null; } catch { _cfg = null; }
  }
  function saveConfig(c) { _cfg = c; localStorage.setItem(LS_CONFIG, JSON.stringify(c)); }
  function clearConfig() {
    _cfg = null;
    localStorage.removeItem(LS_CONFIG);
    localStorage.removeItem(LS_CACHE);
  }

  // ── Cache (instant paint before API returns) ────────────────────────────────
  function loadCache() {
    try {
      const c = JSON.parse(localStorage.getItem(LS_CACHE));
      if (!c) return;
      _tasks     = c.tasks     || [];
      _listMeta  = c.listMeta  || null;
      _cfDefs    = (c.cfDefs || []).filter(f => f.name.toLowerCase() !== 'department');
      _members   = c.members   || [];
      _spaceTags = c.spaceTags || [];
      _lastSync  = c.ts        || null;
      if (_tasks.length) render();
    } catch {}
  }
  function saveCache() {
    localStorage.setItem(LS_CACHE, JSON.stringify({
      tasks: _tasks, listMeta: _listMeta, cfDefs: _cfDefs,
      members: _members, spaceTags: _spaceTags, ts: _lastSync
    }));
  }

  // ── Custom field types we can render ────────────────────────────────────────
  const RENDERABLE = new Set([
    'text', 'short_text', 'number', 'currency', 'url', 'email', 'phone',
    'date', 'checkbox', 'drop_down', 'labels', 'progress', 'rating'
  ]);

  // ── Fetch all (parallel) ────────────────────────────────────────────────────
  async function fetchAll() {
    if (!_cfg || _syncing) return;
    _syncing = true;
    setSyncDot('syncing');

    try {
      const [listData, fieldsData, membersData, page0] = await Promise.all([
        api(`/list/${_cfg.listId}`),
        api(`/list/${_cfg.listId}/field`),
        api(`/list/${_cfg.listId}/member`),
        api(`/list/${_cfg.listId}/task?include_closed=true&order_by=created&reverse=true&page=0`)
      ]);

      _listMeta  = listData;
      _cfDefs    = (fieldsData.fields || []).filter(f => RENDERABLE.has(f.type) && f.name.toLowerCase() !== 'department');
      _members   = membersData.members || [];
      _tasks     = page0.tasks || [];

      // Paginate (ClickUp max 100/page)
      if (_tasks.length === 100) {
        let page = 1;
        while (page < 10) {
          const more = await api(`/list/${_cfg.listId}/task?include_closed=true&order_by=created&reverse=true&page=${page}`);
          const batch = more.tasks || [];
          _tasks = _tasks.concat(batch);
          if (batch.length < 100) break;
          page++;
        }
      }

      // Space tags (best-effort — only available if API token has space access)
      if (listData.space?.id) {
        try { _spaceTags = (await api(`/space/${listData.space.id}/tag`)).tags || []; } catch {}
      }

      _lastSync = Date.now();
      saveCache();
      render();
      setSyncDot('ok');
    } catch (e) {
      console.error('[CU Sync]', e);
      setSyncDot('error', e.message);
    } finally {
      _syncing = false;
    }
  }

  // ── Status helpers ──────────────────────────────────────────────────────────
  function getStatusDef(statusObj) {
    if (!_listMeta?.statuses) return { color: '#94A3B8', type: 'open' };
    return _listMeta.statuses.find(s => s.status === statusObj?.status) ||
           { color: '#94A3B8', type: 'open' };
  }
  function isClosedStatus(statusObj) {
    return getStatusDef(statusObj).type === 'closed';
  }
  function getOpenStatus() {
    if (!_listMeta?.statuses) return 'to do';
    return (_listMeta.statuses.find(s => s.type === 'open') ||
            _listMeta.statuses[0])?.status || 'to do';
  }
  function getClosedStatus() {
    if (!_listMeta?.statuses) return 'complete';
    return (_listMeta.statuses.find(s => s.type === 'closed') ||
            _listMeta.statuses[_listMeta.statuses.length - 1])?.status || 'complete';
  }

  // ── Formatting ──────────────────────────────────────────────────────────────
  function fmtDate(ms) {
    if (!ms) return '—';
    return new Date(Number(ms)).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }

  function renderCFCell(cfValue, defn) {
    const val = cfValue?.value;
    if (val === null || val === undefined || val === '') {
      return `<span style="color:var(--muted);opacity:.25">—</span>`;
    }
    switch (defn.type) {
      case 'checkbox':
        return val ? `<span class="cf-check">✓</span>` : `<span class="cf-nocheck">✗</span>`;
      case 'date':
        return `<span class="cf-text">${fmtDate(val)}</span>`;
      case 'number': case 'rating':
        return `<span class="cf-number">${val}</span>`;
      case 'currency': {
        const sym = defn.type_config?.currency_type || '';
        return `<span class="cf-number">${sym}${Number(val).toLocaleString()}</span>`;
      }
      case 'url':
        return `<a href="${val}" target="_blank" rel="noopener" class="act-cu-link" style="opacity:.65;width:auto;padding:0 4px">${String(val).replace(/^https?:\/\//, '').slice(0, 24)}…</a>`;
      case 'email':
        return `<a href="mailto:${val}" class="act-cu-link" style="opacity:.65;width:auto;padding:0 4px">${val}</a>`;
      case 'phone':
        return `<span class="cf-text">${val}</span>`;
      case 'drop_down': {
        const opt = (defn.type_config?.options || []).find(o => o.orderindex === val || o.name === val);
        if (!opt) return `<span class="cf-text">${val}</span>`;
        return `<span class="cf-label-pill" style="background:${opt.color||'rgba(255,255,255,.1)'};color:#fff">${opt.name}</span>`;
      }
      case 'labels': {
        if (!Array.isArray(val) || !val.length) return `<span style="color:var(--muted);opacity:.25">—</span>`;
        return val.map(v => {
          const opt = (defn.type_config?.options || []).find(o => o.id === v || o.name === v);
          return opt
            ? `<span class="cf-label-pill" style="background:${opt.color||'rgba(255,255,255,.1)'};color:#fff">${opt.name}</span>`
            : '';
        }).join('');
      }
      case 'progress':
        return `<div class="cf-progress-bar"><div class="cf-progress-fill" style="width:${Math.min(100, Number(val))}%"></div></div>`;
      default:
        return `<span class="cf-text" title="${String(val).replace(/"/g, '&quot;')}">${String(val).slice(0, 36)}${String(val).length > 36 ? '…' : ''}</span>`;
    }
  }

  // ── Sync dot ────────────────────────────────────────────────────────────────
  function setSyncDot(state, msg) {
    const dot  = document.querySelector('.cu-sync-dot');
    const text = document.querySelector('.cu-sync-text');
    if (!dot) return;
    dot.className = `cu-sync-dot${state !== 'ok' ? ' ' + state : ''}`;
    if (text) {
      if (state === 'ok')      text.textContent = `Synced ${new Date().toLocaleTimeString('en-US',{hour:'numeric',minute:'2-digit'})}`;
      else if (state === 'syncing') text.textContent = 'Syncing…';
      else                     text.textContent = `Error: ${(msg || '').slice(0, 40)}`;
    }
  }

  // ── SVGs ────────────────────────────────────────────────────────────────────
  const SVG = {
    edit:  `<svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 1.5l2.5 2.5-7 7H2v-2.5l7-7z"/></svg>`,
    trash: `<svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><polyline points="1 3 12 3"/><path d="M10.5 3v8.5a1 1 0 01-1 1h-6a1 1 0 01-1-1V3"/><path d="M4.5 3V2a1 1 0 011-1h2a1 1 0 011 1v1"/></svg>`,
    ext:   `<svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 2H2a1 1 0 00-1 1v7a1 1 0 001 1h7a1 1 0 001-1V7"/><polyline points="8 1 11 1 11 4"/><line x1="11" y1="1" x2="6" y2="6"/></svg>`,
    plus:  `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><line x1="7" y1="1" x2="7" y2="13"/><line x1="1" y1="7" x2="13" y2="7"/></svg>`,
    close: `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><line x1="1" y1="1" x2="13" y2="13"/><line x1="13" y1="1" x2="1" y2="13"/></svg>`
  };

  // ── Static fallback render (AMM_DATA.actionItems) ───────────────────────────
  function renderStaticActions() {
    const wrap    = document.querySelector('#actions .container');
    const tblWrap = wrap?.querySelector('.tbl-wrap');
    if (!tblWrap) return;
    tblWrap.style.display = '';

    const thead = document.querySelector('.actions-tbl thead tr');
    if (thead) {
      thead.innerHTML = `<th>Assignee</th><th>Action</th><th>Due</th><th>Status</th><th class="col-act-src">Source</th>`;
    }

    const items = (typeof AMM_DATA !== 'undefined' && AMM_DATA.actionItems) ? AMM_DATA.actionItems : [];
    const open     = items.filter(i => i.status === 'open').length;
    const resolved = items.filter(i => i.status === 'resolved').length;
    const chip = document.getElementById('actionsChip');
    if (chip) chip.textContent = `${open} open · ${resolved} resolved`;

    const statusMap = {
      open:     ['st-open',     'Open'],
      resolved: ['st-resolved', 'Resolved'],
    };

    const tbody = document.getElementById('actionsBody');
    if (tbody) {
      tbody.innerHTML = items.map(item => {
        const [sCls, sLabel] = statusMap[item.status] || ['st-open', 'Open'];
        return `<tr>
          <td><span class="act-owner">${item.owner}</span></td>
          <td><span class="act-text">${item.action}</span></td>
          <td><span class="act-due">${item.dueDate || '—'}</span></td>
          <td><span class="${sCls}">${sLabel}</span></td>
          <td class="col-act-src"><span class="act-src">${item.source || ''}</span></td>
        </tr>`;
      }).join('');
    }
  }

  // ── Setup card (collapsible — shown below static table) ──────────────────────
  function renderSetupCard() {
    // First render static data so the section is never empty
    renderStaticActions();

    const wrap = document.querySelector('#actions .container');
    if (!wrap) return;

    let card = wrap.querySelector('.cu-setup');
    if (card) return; // already injected
    card = document.createElement('div');
    card.style.marginTop = '16px';
    wrap.appendChild(card);
    card.className = 'cu-setup';
    card.innerHTML = `
      <div>
        <div class="cu-setup-title">Connect ClickUp for Live Sync</div>
        <p class="cu-setup-desc">
          Optionally link a ClickUp list for real-time bidirectional sync — create, edit, and complete tasks without leaving the dashboard.
        </p>
      </div>
      <div class="cu-setup-field">
        <label>Personal API Token</label>
        <input id="cu-token" type="password" placeholder="pk_…" autocomplete="off">
        <span class="cu-setup-hint">ClickUp → your avatar (bottom-left) → Apps → API Token → Generate. Stored only in this browser.</span>
      </div>
      <div class="cu-setup-field">
        <label>List ID or List URL</label>
        <input id="cu-listid" type="text" placeholder="901113562911" value="901113562911">
        <span class="cu-setup-hint">AMM Action Items list pre-configured (ID: 901113562911). <a href="https://app.clickup.com/9011399348/v/l/901113562911" target="_blank" rel="noopener" style="color:var(--sky)">Open in ClickUp →</a></span>
      </div>
      <div id="cu-setup-err" class="cu-setup-err" style="display:none"></div>
      <button class="cu-connect-btn" id="cu-connect-btn" onclick="ActionsManager.connectClickUp()">
        Connect List
      </button>
    `;
  }

  // ── Main render ─────────────────────────────────────────────────────────────
  function render() {
    if (!_cfg) { renderSetupCard(); return; }

    // Show table, hide setup
    const wrap    = document.querySelector('#actions .container');
    const tblWrap = wrap?.querySelector('.tbl-wrap');
    const setup   = wrap?.querySelector('.cu-setup');
    if (tblWrap) tblWrap.style.display = '';
    if (setup)   setup.style.display = 'none';

    // Inject header controls once
    const hdr = document.querySelector('#actions .section-hdr');
    if (hdr && !hdr.querySelector('.act-add-btn')) {
      const addBtn = document.createElement('button');
      addBtn.className = 'act-add-btn';
      addBtn.innerHTML = `${SVG.plus} New Task`;
      addBtn.onclick = () => ActionsManager.openNewForm();
      hdr.appendChild(addBtn);
    }
    if (hdr && !hdr.querySelector('.cu-sync-bar')) {
      const bar = document.createElement('div');
      bar.className = 'cu-sync-bar';
      bar.innerHTML = `
        <span class="cu-sync-dot"></span>
        <span class="cu-sync-text">—</span>
        <button class="cu-sync-btn" onclick="ActionsManager.manualSync()">↺ Refresh</button>
        <button class="cu-disconnect-btn" onclick="ActionsManager.disconnectClickUp()">Disconnect</button>
      `;
      hdr.appendChild(bar);
    }

    // Dynamic table head
    const thead = document.querySelector('.actions-tbl thead tr');
    if (thead) {
      thead.innerHTML = `
        <th>Assignee</th>
        <th>Task</th>
        <th>Due</th>
        <th>Status</th>
        ${_cfDefs.map(f => `<th class="col-cf">${f.name}</th>`).join('')}
        <th></th>
      `;
    }

    // Chip
    const open     = _tasks.filter(t => !isClosedStatus(t.status)).length;
    const resolved = _tasks.filter(t => isClosedStatus(t.status)).length;
    const chip = document.getElementById('actionsChip');
    if (chip) chip.textContent = `${open} open · ${resolved} resolved`;

    // Rows
    const tbody = document.getElementById('actionsBody');
    if (!tbody) return;

    tbody.innerHTML = _tasks.map(t => {
      const closed    = isClosedStatus(t.status);
      const sm        = getStatusDef(t.status);
      const assignee  = t.assignees?.[0];
      const tagsHTML  = (t.tags || []).map(tg =>
        `<span class="cu-tag" style="background:${tg.tag_bg||'rgba(255,255,255,.1)'};color:${tg.tag_fg||'#fff'}">${tg.name}</span>`
      ).join('');

      const cfMap = {};
      (t.custom_fields || []).forEach(cf => { cfMap[cf.id] = cf; });
      const cfCells = _cfDefs.map(f =>
        `<td class="col-cf">${renderCFCell(cfMap[f.id], f)}</td>`
      ).join('');

      return `
        <tr data-id="${t.id}" class="${closed ? 'act-resolved-row' : ''}">
          <td>
            <span class="act-owner" style="${closed ? 'opacity:.4' : ''}">
              ${assignee ? (assignee.username || assignee.email || '—') : '—'}
            </span>
          </td>
          <td>
            <div style="display:flex;flex-direction:column;gap:4px;">
              <span class="act-text${closed ? ' act-done-text' : ''}">${t.name}</span>
              ${tagsHTML ? `<div style="display:flex;flex-wrap:wrap;gap:3px;margin-top:1px;">${tagsHTML}</div>` : ''}
            </div>
          </td>
          <td>
            <span class="act-due" style="${closed ? 'opacity:.4' : ''}">${fmtDate(t.due_date)}</span>
          </td>
          <td>
            <button class="cu-status" onclick="ActionsManager.toggleStatus('${t.id}')"
              style="background:${sm.color}1A;color:${sm.color};border-color:${sm.color}33;">
              <span class="cu-status-dot" style="background:${sm.color}"></span>
              ${t.status?.status || '—'}
            </button>
          </td>
          ${cfCells}
          <td>
            <div class="act-row-btns">
              <a href="${t.url}" target="_blank" rel="noopener" class="act-cu-link" title="Open in ClickUp">${SVG.ext}</a>
              <button class="act-edit-btn"   onclick="ActionsManager.openEditForm('${t.id}')"  title="Edit">${SVG.edit}</button>
              <button class="act-delete-btn" onclick="ActionsManager.deleteAction('${t.id}')" title="Delete">${SVG.trash}</button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  }

  // ── Modal ───────────────────────────────────────────────────────────────────
  function getOrCreateModal() {
    let el = document.getElementById('actionModal');
    if (!el) { el = document.createElement('div'); el.id = 'actionModal'; document.body.appendChild(el); }
    return el;
  }

  function buildCFInput(defn, cfValue) {
    const val  = cfValue?.value;
    const elId = `cf-${defn.id}`;
    const lbl  = `<label>${defn.name} <span class="am-optional">(${defn.type})</span></label>`;

    switch (defn.type) {
      case 'checkbox':
        return `<div class="am-field" style="flex-direction:row;align-items:center;gap:10px;">
          <input type="checkbox" id="${elId}" data-cf-id="${defn.id}" style="width:16px;height:16px;accent-color:var(--blue);cursor:pointer" ${val ? 'checked' : ''}>
          ${lbl}
        </div>`;
      case 'date': {
        const dv = val ? new Date(Number(val)).toISOString().split('T')[0] : '';
        return `<div class="am-field">${lbl}<input type="date" id="${elId}" data-cf-id="${defn.id}" value="${dv}"></div>`;
      }
      case 'number': case 'rating':
        return `<div class="am-field">${lbl}<input type="number" id="${elId}" data-cf-id="${defn.id}" value="${val ?? ''}"${defn.type === 'rating' ? ' min="1" max="5"' : ''}></div>`;
      case 'currency':
        return `<div class="am-field">${lbl}<input type="number" id="${elId}" data-cf-id="${defn.id}" step="0.01" value="${val ?? ''}"></div>`;
      case 'url':
        return `<div class="am-field">${lbl}<input type="url" id="${elId}" data-cf-id="${defn.id}" placeholder="https://…" value="${val ?? ''}"></div>`;
      case 'email':
        return `<div class="am-field">${lbl}<input type="email" id="${elId}" data-cf-id="${defn.id}" value="${val ?? ''}"></div>`;
      case 'phone':
        return `<div class="am-field">${lbl}<input type="tel" id="${elId}" data-cf-id="${defn.id}" value="${val ?? ''}"></div>`;
      case 'drop_down': {
        const opts = (defn.type_config?.options || []).map(o =>
          `<option value="${o.orderindex}"${val === o.orderindex ? ' selected' : ''}>${o.name}</option>`
        ).join('');
        return `<div class="am-field">${lbl}<select id="${elId}" data-cf-id="${defn.id}"><option value="">— None —</option>${opts}</select></div>`;
      }
      case 'labels': {
        const selected = new Set(Array.isArray(val) ? val : []);
        const pills = (defn.type_config?.options || []).map(o =>
          `<label style="display:flex;align-items:center;gap:6px;font-size:.8125rem;cursor:pointer;padding:3px 0;">
            <input type="checkbox" value="${o.id}" data-cf-label="${defn.id}" style="accent-color:var(--blue)" ${selected.has(o.id) ? 'checked' : ''}>
            <span class="cf-label-pill" style="background:${o.color||'rgba(255,255,255,.1)'};color:#fff">${o.name}</span>
          </label>`
        ).join('');
        return `<div class="am-field">${lbl}<div style="display:flex;flex-direction:column;gap:2px;">${pills}</div></div>`;
      }
      case 'progress': {
        const pv = val ?? 0;
        return `<div class="am-field">${lbl}
          <div style="display:flex;align-items:center;gap:10px;">
            <input type="range" id="${elId}" data-cf-id="${defn.id}" min="0" max="100" step="1" value="${pv}"
              style="flex:1;cursor:pointer;accent-color:var(--blue)"
              oninput="document.getElementById('cf-pv-${defn.id}').textContent=this.value+'%'">
            <span id="cf-pv-${defn.id}" style="font-size:.75rem;color:var(--muted);min-width:32px;">${pv}%</span>
          </div>
        </div>`;
      }
      default:
        return `<div class="am-field">${lbl}<input type="text" id="${elId}" data-cf-id="${defn.id}" value="${String(val ?? '').replace(/"/g, '&quot;')}"></div>`;
    }
  }

  function buildModalHTML(task) {
    const isNew   = !task;
    const title   = isNew ? 'New ClickUp Task' : 'Edit Task';
    const statuses = _listMeta?.statuses || [];
    const currentStatus = task?.status?.status || getOpenStatus();

    const statusOpts = statuses.map(s =>
      `<option value="${s.status}"${s.status === currentStatus ? ' selected' : ''}>${s.status}</option>`
    ).join('');

    const curAssignee = task?.assignees?.[0] || null;
    const curAssigneeId = curAssignee?.id || '';
    const curAssigneeName = curAssignee ? (curAssignee.profilePicture
      ? `<img src="${curAssignee.profilePicture}" alt="">` : '') + (curAssignee.username || curAssignee.email || '') : '';

    const dueDateVal = task?.due_date
      ? new Date(Number(task.due_date)).toISOString().split('T')[0]
      : '';

    // Tags
    const taskTagNames = new Set((task?.tags || []).map(t => t.name));
    const tagsSection = _spaceTags.length ? `
      <div class="am-field">
        <label>Tags <span class="am-optional">(optional)</span></label>
        <div class="am-tags-grid">
          ${_spaceTags.map(t => {
            const active = taskTagNames.has(t.name);
            return `<button type="button" class="am-tag-toggle${active ? ' active' : ''}"
              data-tag="${t.name}"
              style="${active ? `background:${t.tag_bg};color:${t.tag_fg};border-color:${t.tag_bg}` : ''}"
              onclick="
                this.classList.toggle('active');
                const on=this.classList.contains('active');
                this.style.background=on?'${t.tag_bg}':'';
                this.style.color=on?'${t.tag_fg}':'';
                this.style.borderColor=on?'${t.tag_bg}':'';
              ">${t.name}</button>`;
          }).join('')}
        </div>
      </div>` : '';

    return `
      <div class="am-overlay" onclick="ActionsManager.closeModal()"></div>
      <div class="am-modal">
        <div class="am-modal-header">
          <h3 class="am-modal-title">${title}</h3>
          <button class="am-close" type="button" onclick="ActionsManager.closeModal()">${SVG.close}</button>
        </div>
        <div class="am-modal-body">
          <form id="actionForm" onsubmit="ActionsManager.submitForm(event)">
            <div class="am-field">
              <label>Task Name *</label>
              <textarea id="am-name" rows="2" required placeholder="What needs to happen…">${task?.name || ''}</textarea>
            </div>
            <div class="am-2col">
              <div class="am-field">
                <label>Assignee</label>
                <div class="am-assignee-wrap">
                  <input type="text" id="am-assignee-search"
                    placeholder="Search member…"
                    autocomplete="off"
                    value="${curAssignee ? (curAssignee.username || curAssignee.email || '') : ''}"
                    oninput="ActionsManager.filterAssignees(this.value)"
                    onfocus="ActionsManager.openAssigneeDropdown()"
                    onblur="setTimeout(()=>ActionsManager.closeAssigneeDropdown(),200)">
                  <input type="hidden" id="am-assignee" value="${curAssigneeId}">
                  <div class="am-assignee-dropdown" id="am-assignee-dropdown"></div>
                </div>
              </div>
              <div class="am-field">
                <label>Status</label>
                <select id="am-status">${statusOpts}</select>
              </div>
            </div>
            <div class="am-2col">
              <div class="am-field">
                <label>Due Date <span class="am-optional">(optional)</span></label>
                <input type="date" id="am-due" value="${dueDateVal}">
              </div>
              <div class="am-field">
                <label>Description <span class="am-optional">(optional)</span></label>
                <input type="text" id="am-desc" placeholder="Brief note…"
                  value="${(task?.description || '').split('\n')[0].slice(0, 120)}">
              </div>
            </div>
            ${tagsSection}
          </form>
        </div>
        <div class="am-footer">
          <button type="button" class="am-cancel" onclick="ActionsManager.closeModal()">Cancel</button>
          <button type="submit" form="actionForm" class="am-submit" id="am-submit-btn">Save to ClickUp</button>
        </div>
      </div>
    `;
  }

  function collectFormData() {
    const name       = document.getElementById('am-name')?.value?.trim();
    const assigneeId = document.getElementById('am-assignee')?.value;
    const status     = document.getElementById('am-status')?.value;
    const dueRaw     = document.getElementById('am-due')?.value;
    const desc       = document.getElementById('am-desc')?.value?.trim();
    const due_date   = dueRaw ? String(new Date(dueRaw).getTime()) : null;

    const activeTags = [...document.querySelectorAll('.am-tag-toggle.active')].map(b => b.dataset.tag);

    const customFields = [];
    _cfDefs.forEach(f => {
      if (f.type === 'labels') {
        const vals = [...document.querySelectorAll(`[data-cf-label="${f.id}"]:checked`)].map(el => el.value);
        customFields.push({ id: f.id, value: vals });
        return;
      }
      const el = document.getElementById(`cf-${f.id}`);
      if (!el) return;
      let value;
      switch (f.type) {
        case 'checkbox': value = el.checked; break;
        case 'date':     value = el.value ? String(new Date(el.value).getTime()) : null; break;
        case 'drop_down': value = el.value !== '' ? Number(el.value) : null; break;
        case 'number': case 'currency': case 'rating': case 'progress':
          value = el.value !== '' ? Number(el.value) : null; break;
        default: value = el.value || null;
      }
      if (value !== null && value !== undefined) customFields.push({ id: f.id, value });
    });

    return { name, assigneeId, status, due_date, desc, activeTags, customFields };
  }

  // ── CRUD ────────────────────────────────────────────────────────────────────
  async function cuCreate({ name, assigneeId, status, due_date, desc, activeTags, customFields }) {
    const body = {
      name,
      status: status || getOpenStatus(),
      ...(due_date && { due_date, due_date_time: false }),
      ...(desc      && { description: desc }),
      ...(assigneeId && { assignees: [Number(assigneeId)] })
    };
    const task = await api(`/list/${_cfg.listId}/task`, { method: 'POST', body: JSON.stringify(body) });

    const extra = [];
    if (activeTags.length) {
      extra.push(...activeTags.map(t =>
        api(`/task/${task.id}/tag/${encodeURIComponent(t)}`, { method: 'POST' }).catch(() => {})
      ));
    }
    if (customFields.length) {
      extra.push(...customFields.map(cf =>
        api(`/task/${task.id}/field/${cf.id}`, { method: 'POST', body: JSON.stringify({ value: cf.value }) }).catch(() => {})
      ));
    }
    if (extra.length) await Promise.all(extra);
    return task;
  }

  async function cuUpdate(taskId, { name, assigneeId, status, due_date, desc, activeTags, customFields, existingAssigneeId }) {
    const body = {};
    if (name !== undefined)   body.name        = name;
    if (status !== undefined) body.status       = status;
    if (desc !== undefined)   body.description  = desc;
    if (due_date !== undefined) {
      body.due_date = due_date || null;
      if (due_date) body.due_date_time = false;
    }
    // Assignee diff
    if (assigneeId !== undefined) {
      const add = assigneeId ? [Number(assigneeId)] : [];
      const rem = existingAssigneeId && existingAssigneeId !== assigneeId ? [Number(existingAssigneeId)] : [];
      if (add.length || rem.length) body.assignees = { add, rem };
    }

    if (Object.keys(body).length) {
      await api(`/task/${taskId}`, { method: 'PUT', body: JSON.stringify(body) });
    }

    const extra = [];
    if (activeTags !== undefined) {
      // Compute add/remove against current task tags
      const task = _tasks.find(t => t.id === taskId);
      const existingTags = new Set((task?.tags || []).map(t => t.name));
      const newTags      = new Set(activeTags);
      const toAdd = activeTags.filter(t => !existingTags.has(t));
      const toRem = [...existingTags].filter(t => !newTags.has(t));
      extra.push(
        ...toAdd.map(t => api(`/task/${taskId}/tag/${encodeURIComponent(t)}`, { method: 'POST' }).catch(() => {})),
        ...toRem.map(t => api(`/task/${taskId}/tag/${encodeURIComponent(t)}`, { method: 'DELETE' }).catch(() => {}))
      );
    }
    if (customFields?.length) {
      extra.push(...customFields.map(cf =>
        api(`/task/${taskId}/field/${cf.id}`, { method: 'POST', body: JSON.stringify({ value: cf.value }) }).catch(() => {})
      ));
    }
    if (extra.length) await Promise.all(extra);
  }

  // ── Polling ─────────────────────────────────────────────────────────────────
  function startPolling() {
    if (_pollTimer) clearInterval(_pollTimer);
    _pollTimer = setInterval(fetchAll, POLL_MS);
  }

  // ── Public API ───────────────────────────────────────────────────────────────
  const ActionsManager = {

    init() {
      injectCSS();
      loadConfig();
      if (_cfg) {
        loadCache();
        fetchAll();
        startPolling();
        window.addEventListener('focus', () => {
          if (Date.now() - (_lastSync || 0) > 15_000) fetchAll();
        });
      } else {
        renderSetupCard();
      }
      getOrCreateModal();
    },

    async connectClickUp() {
      const tokenEl = document.getElementById('cu-token');
      const listEl  = document.getElementById('cu-listid');
      const errEl   = document.getElementById('cu-setup-err');
      const btn     = document.getElementById('cu-connect-btn');

      const token  = tokenEl?.value?.trim();
      const rawList = listEl?.value?.trim();
      if (!token || !rawList) {
        if (errEl) { errEl.textContent = 'Both fields are required.'; errEl.style.display = 'block'; }
        return;
      }

      // Extract list ID from URL formats:
      // https://app.clickup.com/9011399348/v/li/901103456789
      // https://app.clickup.com/.../list/8chy2nm-12345678
      // or raw ID like 901103456789
      const urlMatch = rawList.match(/\/(?:li(?:st)?|l)\/([a-z0-9_-]+)(?:[/?#]|$)/i);
      const listId   = urlMatch ? urlMatch[1] : rawList;

      if (btn) { btn.textContent = 'Connecting…'; btn.disabled = true; }
      if (errEl) errEl.style.display = 'none';

      try {
        _cfg = { token, listId };
        const testList = await api(`/list/${listId}`);
        saveConfig({ token, listId });
        if (btn) btn.textContent = `✓ Connected to "${testList.name}"`;
        await fetchAll();
        startPolling();
        window.addEventListener('focus', () => {
          if (Date.now() - (_lastSync || 0) > 15_000) fetchAll();
        });
      } catch (e) {
        _cfg = null;
        if (btn) { btn.textContent = 'Connect List'; btn.disabled = false; }
        if (errEl) {
          errEl.textContent = `Connection failed: ${e.message}. Check your token and list ID.`;
          errEl.style.display = 'block';
        }
      }
    },

    disconnectClickUp() {
      if (!confirm('Disconnect ClickUp? Cached data will be cleared.')) return;
      clearConfig();
      if (_pollTimer) clearInterval(_pollTimer);
      _tasks = []; _listMeta = null; _cfDefs = []; _members = []; _spaceTags = [];
      // Clean up live-sync header controls
      document.querySelector('#actions .act-add-btn')?.remove();
      document.querySelector('#actions .cu-sync-bar')?.remove();
      // Remove the old setup card so renderSetupCard can re-inject it below the static table
      document.querySelector('#actions .cu-setup')?.remove();
      renderSetupCard();
    },

    openNewForm() {
      _editId = null;
      const modal = getOrCreateModal();
      modal.innerHTML = buildModalHTML(null);
      modal.classList.add('open');
      document.getElementById('am-name')?.focus();
    },

    openEditForm(taskId) {
      const task = _tasks.find(t => t.id === taskId);
      if (!task) return;
      _editId = taskId;
      const modal = getOrCreateModal();
      modal.innerHTML = buildModalHTML(task);
      modal.classList.add('open');
      document.getElementById('am-name')?.focus();
    },

    closeModal() {
      const modal = document.getElementById('actionModal');
      if (modal) { modal.classList.remove('open'); modal.innerHTML = ''; }
      _editId = null;
    },

    async submitForm(e) {
      e.preventDefault();
      const submitBtn = document.getElementById('am-submit-btn');
      if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Saving…'; }

      const formData = collectFormData();
      if (!formData.name) return;

      try {
        if (_editId) {
          const existing = _tasks.find(t => t.id === _editId);
          await cuUpdate(_editId, {
            ...formData,
            existingAssigneeId: existing?.assignees?.[0]?.id || null
          });
        } else {
          await cuCreate(formData);
        }
        this.closeModal();
        await fetchAll();
      } catch (err) {
        if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Save to ClickUp'; }
        alert(`Save failed: ${err.message}`);
      }
    },

    openAssigneeDropdown() {
      this.filterAssignees(document.getElementById('am-assignee-search')?.value || '');
      document.getElementById('am-assignee-dropdown')?.classList.add('open');
    },

    closeAssigneeDropdown() {
      document.getElementById('am-assignee-dropdown')?.classList.remove('open');
    },

    filterAssignees(query) {
      const dd = document.getElementById('am-assignee-dropdown');
      if (!dd) return;
      const q = query.trim().toLowerCase();
      const curId = document.getElementById('am-assignee')?.value || '';
      const filtered = q
        ? _members.filter(m => (m.username || m.email || '').toLowerCase().includes(q))
        : _members;

      const items = [{ id: '', username: 'Unassigned', profilePicture: null }].concat(filtered);
      dd.innerHTML = items.map(m => {
        const name = m.id === '' ? 'Unassigned' : (m.username || m.email || 'Unknown');
        const avatar = m.profilePicture
          ? `<div class="am-assignee-avatar"><img src="${m.profilePicture}" alt=""></div>`
          : `<div class="am-assignee-avatar">${name.split(' ').map(x=>x[0]).join('').slice(0,2).toUpperCase()}</div>`;
        return `<div class="am-assignee-opt${m.id === curId ? ' selected' : ''}"
          onmousedown="ActionsManager.selectAssignee('${m.id}','${name.replace(/'/g,"\\'")}')">
          ${avatar}<span class="${m.id===''?'am-assignee-none':''}">${name}</span>
        </div>`;
      }).join('');
      dd.classList.add('open');
    },

    selectAssignee(id, name) {
      const hidden = document.getElementById('am-assignee');
      const search = document.getElementById('am-assignee-search');
      if (hidden) hidden.value = id;
      if (search) search.value = id === '' ? '' : name;
      this.closeAssigneeDropdown();
    },

    async toggleStatus(taskId) {
      const task = _tasks.find(t => t.id === taskId);
      if (!task) return;
      const newStatus = isClosedStatus(task.status) ? getOpenStatus() : getClosedStatus();
      // Optimistic paint
      task.status = { ...(task.status || {}), status: newStatus };
      render();
      try {
        await api(`/task/${taskId}`, { method: 'PUT', body: JSON.stringify({ status: newStatus }) });
        await fetchAll();
      } catch (e) {
        console.error('[CU] toggleStatus:', e);
        await fetchAll(); // revert
      }
    },

    async deleteAction(taskId) {
      if (!confirm('Delete this task in ClickUp? This cannot be undone.')) return;
      _tasks = _tasks.filter(t => t.id !== taskId); // optimistic
      render();
      try {
        await api(`/task/${taskId}`, { method: 'DELETE' });
        await fetchAll();
      } catch (e) {
        console.error('[CU] delete:', e);
        await fetchAll(); // revert
      }
    },

    async manualSync() { await fetchAll(); },
    render
  };

  window.ActionsManager = ActionsManager;
})();
