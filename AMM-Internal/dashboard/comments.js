// ─── AMM Comments System ─────────────────────────────────────────────────────
// Per-item commenting for the AMM executive dashboard (member cards, gap rows,
// agenda cards, action rows). Sliding right-side panel. localStorage persistence.
// Exposes window.CommentsSystem — call CommentsSystem.init() after DOM renders.
// ─────────────────────────────────────────────────────────────────────────────

(function () {
  'use strict';

  const LS_KEY  = 'amm-dashboard-comments';
  const shortId = () => Math.random().toString(36).slice(2, 8);

  // ── CSS ────────────────────────────────────────────────────────────────────
  const css = `
    /* ── Comments toggle in nav ── */
    #comments-toggle {
      display:inline-flex; align-items:center; gap:6px;
      padding:5px 12px; border-radius:var(--radius-sm); border:none;
      background:transparent; color:var(--muted); cursor:pointer;
      font-size:.8125rem; font-weight:500; transition:color 150ms, background 150ms;
      position:relative;
    }
    #comments-toggle:hover { color:var(--text); background:var(--bg-card2); }
    .toggle-label { /* text label */ }
    .cm-nav-badge {
      display:inline-flex; align-items:center; justify-content:center;
      min-width:16px; height:16px; border-radius:999px; padding:0 4px;
      background:var(--purple); color:#fff;
      font-size:.625rem; font-weight:800;
    }

    /* ── Comment trigger buttons (appears on item hover) ── */
    .cm-trigger {
      display:inline-flex; align-items:center; justify-content:center;
      width:24px; height:24px; border-radius:6px; border:none;
      background:transparent; cursor:pointer; color:var(--muted);
      opacity:0; transition:opacity 150ms, color 150ms, background 150ms;
      flex-shrink:0;
    }
    .m-card:hover .cm-trigger,
    .ag-card:hover .cm-trigger,
    tr:hover .cm-trigger       { opacity:1; }
    .cm-trigger:hover          { color:var(--purple); background:rgba(168,85,247,.1); }
    .cm-trigger.has-comments   { opacity:1; color:var(--purple); }

    /* ── Panel ── */
    #comments-panel {
      position:fixed; top:0; right:0; bottom:0; z-index:500;
      width:360px; max-width:100vw;
      background:#0A0A12; border-left:1px solid rgba(255,255,255,.07);
      display:flex; flex-direction:column;
      transform:translateX(100%); transition:transform 260ms cubic-bezier(.4,0,.2,1);
      box-shadow:-24px 0 60px rgba(0,0,0,.45);
    }
    #comments-panel.open { transform:translateX(0); }

    .cp-header {
      display:flex; align-items:center; justify-content:space-between;
      padding:16px 20px; border-bottom:1px solid rgba(255,255,255,.07);
      flex-shrink:0;
    }
    .cp-header-left { display:flex; flex-direction:column; gap:2px; min-width:0; }
    .cp-title {
      font-size:.8125rem; font-weight:700; letter-spacing:.05em;
      text-transform:uppercase; color:var(--text-2);
    }
    .cp-filter-label {
      font-size:.75rem; color:var(--purple); font-weight:600;
      white-space:nowrap; overflow:hidden; text-overflow:ellipsis;
    }
    .cp-close {
      width:32px; height:32px; border-radius:8px; border:none;
      background:transparent; color:var(--muted); cursor:pointer;
      display:flex; align-items:center; justify-content:center;
      transition:background 150ms; flex-shrink:0;
    }
    .cp-close:hover { background:rgba(255,255,255,.06); color:var(--text); }
    .cp-clear-filter {
      font-size:.6875rem; font-weight:600; color:var(--muted);
      background:none; border:none; cursor:pointer; padding:2px 4px;
      text-decoration:underline; transition:color 150ms;
    }
    .cp-clear-filter:hover { color:var(--text); }

    .cp-list {
      flex:1; overflow-y:auto; padding:16px 20px;
      display:flex; flex-direction:column; gap:14px;
    }
    .cp-empty {
      text-align:center; color:var(--muted);
      font-size:.8125rem; padding:40px 0;
    }

    /* ── Comment card ── */
    .cm-card {
      background:rgba(255,255,255,.03); border:1px solid rgba(255,255,255,.06);
      border-radius:10px; padding:14px;
    }
    .cm-card.resolved { opacity:.5; }
    .cm-card-meta {
      display:flex; align-items:center; gap:8px; margin-bottom:8px; flex-wrap:wrap;
    }
    .cm-item-label {
      font-size:.625rem; font-weight:700; letter-spacing:.06em;
      text-transform:uppercase; color:var(--purple);
      background:rgba(168,85,247,.1); padding:2px 8px; border-radius:999px;
    }
    .cm-ts { font-size:.6875rem; color:var(--muted); margin-left:auto; white-space:nowrap; }
    .cm-body { font-size:.8125rem; color:var(--text-2); line-height:1.6; word-break:break-word; }
    .cm-actions {
      display:flex; gap:6px; margin-top:10px; flex-wrap:wrap;
    }
    .cm-btn {
      font-size:.6875rem; font-weight:600; padding:3px 9px;
      border-radius:6px; border:1px solid rgba(255,255,255,.08);
      background:transparent; cursor:pointer; color:var(--muted);
      transition:color 150ms, background 150ms, border-color 150ms;
    }
    .cm-btn:hover   { color:var(--text); background:rgba(255,255,255,.04); border-color:rgba(255,255,255,.15); }
    .cm-btn.resolve { color:#22C55E; border-color:rgba(34,197,94,.2); }
    .cm-btn.remove  { color:#EF4444; border-color:rgba(239,68,68,.2); }

    /* ── Replies ── */
    .cm-replies { margin-top:10px; display:flex; flex-direction:column; gap:8px; }
    .cm-reply-card {
      background:rgba(255,255,255,.025); border-radius:8px; padding:10px 12px;
      border-left:2px solid rgba(168,85,247,.35);
    }
    .cm-reply-body { font-size:.8125rem; color:var(--text-2); line-height:1.55; }
    .cm-reply-ts   { font-size:.625rem; color:var(--muted); margin-top:4px; }
    .cm-reply-input-wrap { display:flex; gap:6px; margin-top:8px; }
    .cm-reply-input {
      flex:1; background:rgba(255,255,255,.04); border:1px solid rgba(255,255,255,.08);
      border-radius:7px; padding:7px 10px; font-size:.8125rem; color:var(--text);
      font-family:inherit; transition:border-color 150ms;
    }
    .cm-reply-input:focus { outline:none; border-color:var(--purple); }
    .cm-reply-send {
      padding:7px 12px; border-radius:7px; border:none;
      background:rgba(168,85,247,.2); color:var(--purple); cursor:pointer;
      font-size:.75rem; font-weight:700; transition:background 150ms;
      white-space:nowrap;
    }
    .cm-reply-send:hover { background:rgba(168,85,247,.35); }

    /* ── New comment form ── */
    .cp-form {
      padding:16px 20px; border-top:1px solid rgba(255,255,255,.07); flex-shrink:0;
    }
    .cp-form-label {
      font-size:.6875rem; font-weight:700; letter-spacing:.06em;
      text-transform:uppercase; color:var(--muted); margin-bottom:8px;
    }
    #cp-new-body {
      width:100%; background:rgba(255,255,255,.04);
      border:1px solid rgba(255,255,255,.08); border-radius:8px;
      padding:10px 12px; font-size:.8125rem; color:var(--text);
      font-family:inherit; resize:vertical; min-height:72px;
      transition:border-color 150ms;
    }
    #cp-new-body:focus { outline:none; border-color:var(--purple); }
    .cp-form-row { display:flex; justify-content:flex-end; margin-top:8px; gap:8px; }
    .cp-submit {
      padding:8px 18px; border-radius:8px; border:none;
      background:#7B5BFF; color:#fff; cursor:pointer;
      font-size:.8125rem; font-weight:700; transition:opacity 150ms;
    }
    .cp-submit:hover { opacity:.85; }

    /* ── Reduce motion ── */
    @media (prefers-reduced-motion: reduce) {
      #comments-panel { transition:none; }
    }
  `;

  function injectCSS() {
    const s = document.createElement('style');
    s.textContent = css;
    document.head.appendChild(s);
  }

  // ── Storage ─────────────────────────────────────────────────────────────────
  let _comments = [];

  function load() {
    try { _comments = JSON.parse(localStorage.getItem(LS_KEY)) || []; }
    catch (e) { _comments = []; }
  }

  function save() {
    localStorage.setItem(LS_KEY, JSON.stringify(_comments));
  }

  // ── Panel state ─────────────────────────────────────────────────────────────
  let _filterItemId    = null;
  let _filterItemTitle = null;
  let _panelOpen       = false;

  // ── Helpers ─────────────────────────────────────────────────────────────────
  function fmtTs(iso) {
    const d = new Date(iso);
    return d.toLocaleDateString('en-US', { month:'short', day:'numeric' }) +
           ' ' + d.toLocaleTimeString('en-US', { hour:'numeric', minute:'2-digit' });
  }

  function commentSVG(hasCount) {
    const fill = hasCount ? 'rgba(168,85,247,.25)' : 'none';
    return `<svg width="14" height="14" viewBox="0 0 14 14" fill="${fill}" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2H2a1 1 0 00-1 1v7a1 1 0 001 1h3l2 2 2-2h3a1 1 0 001-1V3a1 1 0 00-1-1z"/></svg>`;
  }

  // ── Inject trigger buttons ──────────────────────────────────────────────────
  function injectTrigger(el, id, title) {
    if (el.querySelector('.cm-trigger')) return; // already injected
    const btn = document.createElement('button');
    btn.className = 'cm-trigger';
    btn.title = 'Add / view comments';
    btn.setAttribute('data-cm-item', id);
    btn.innerHTML = commentSVG(false);
    btn.onclick = (e) => {
      e.stopPropagation();
      CommentsSystem.openPanel(id, title);
    };
    el.appendChild(btn);
    return btn;
  }

  function updateTriggers() {
    document.querySelectorAll('[data-cm-item]').forEach(btn => {
      const id = btn.getAttribute('data-cm-item');
      const count = _comments.filter(c => c.itemId === id && !c.resolved).length;
      btn.innerHTML = commentSVG(count > 0);
      btn.classList.toggle('has-comments', count > 0);
    });
  }

  function injectAllTriggers() {
    // Member cards
    document.querySelectorAll('.m-card[data-id]').forEach(card => {
      const id = card.dataset.id;
      const nameEl = card.querySelector('.m-name');
      const title = nameEl ? nameEl.textContent : id;
      const top = card.querySelector('.m-card-top');
      if (top) injectTrigger(top, id, title);
    });

    // Gap table rows
    document.querySelectorAll('.gaps-tbl tbody tr[data-id]').forEach(row => {
      const id = row.dataset.id;
      const titleEl = row.querySelector('.gap-title');
      const title = titleEl ? titleEl.textContent : id;
      const lastTd = row.querySelector('td:last-child');
      if (lastTd) {
        const wrap = document.createElement('div');
        wrap.style.cssText = 'display:flex;align-items:center;gap:6px;';
        wrap.innerHTML = lastTd.innerHTML;
        lastTd.innerHTML = '';
        lastTd.appendChild(wrap);
        injectTrigger(wrap, `gap-${id}`, title);
      }
    });

    // Agenda cards
    document.querySelectorAll('.ag-card[data-id]').forEach(card => {
      const id = card.dataset.id;
      const titleEl = card.querySelector('.ag-title');
      const title = titleEl ? titleEl.textContent : id;
      const meta = card.querySelector('.ag-meta');
      if (meta) injectTrigger(meta, `agenda-${id}`, title);
    });

    // Action rows — injected by ActionsManager, rows have data-id
    document.querySelectorAll('#actionsBody tr[data-id]').forEach(row => {
      const id = row.dataset.id;
      const textEl = row.querySelector('.act-text');
      const title = textEl ? textEl.textContent : id;
      const btnsTd = row.querySelector('.act-row-btns');
      if (btnsTd) injectTrigger(btnsTd, `action-${id}`, title);
    });

    updateTriggers();
  }

  // ── Panel render ────────────────────────────────────────────────────────────
  function renderPanel() {
    const panel = document.getElementById('comments-panel');
    if (!panel) return;

    const filtered = _filterItemId
      ? _comments.filter(c => c.itemId === _filterItemId)
      : _comments;

    const filterLabel = _filterItemTitle
      ? `<span class="cp-filter-label">${_filterItemTitle}</span>
         <button class="cp-clear-filter" onclick="CommentsSystem.clearFilter()">Show all</button>`
      : '<span class="cp-filter-label" style="color:var(--muted)">All items</span>';

    const listHTML = filtered.length === 0
      ? `<div class="cp-empty">No comments yet.<br>Click any item's chat icon to annotate.</div>`
      : filtered.slice().reverse().map(c => {
          const repliesHTML = (c.replies || []).map(r => `
            <div class="cm-reply-card">
              <div class="cm-reply-body">${r.body}</div>
              <div class="cm-reply-ts">${fmtTs(r.ts)}</div>
            </div>
          `).join('');

          const itemLabelShow = !_filterItemId;
          return `
            <div class="cm-card${c.resolved ? ' resolved' : ''}" id="cm-${c.id}">
              <div class="cm-card-meta">
                ${itemLabelShow ? `<span class="cm-item-label">${c.itemTitle || c.itemId}</span>` : ''}
                <span class="cm-ts">${fmtTs(c.ts)}</span>
              </div>
              <div class="cm-body">${c.body}</div>
              ${repliesHTML ? `<div class="cm-replies">${repliesHTML}</div>` : ''}
              <div class="cm-reply-input-wrap">
                <input type="text" class="cm-reply-input" id="reply-${c.id}"
                       placeholder="Reply..." onkeydown="if(event.key==='Enter')CommentsSystem.submitReply('${c.id}')">
                <button class="cm-reply-send" onclick="CommentsSystem.submitReply('${c.id}')">↩</button>
              </div>
              <div class="cm-actions">
                <button class="cm-btn resolve" onclick="CommentsSystem.toggleResolve('${c.id}')">
                  ${c.resolved ? 'Unresolve' : 'Resolve'}
                </button>
                <button class="cm-btn remove" onclick="CommentsSystem.remove('${c.id}')">Delete</button>
              </div>
            </div>
          `;
        }).join('');

    panel.innerHTML = `
      <div class="cp-header">
        <div class="cp-header-left">
          <span class="cp-title">Comments</span>
          <div style="display:flex;align-items:center;gap:6px;margin-top:2px;">${filterLabel}</div>
        </div>
        <button class="cp-close" onclick="CommentsSystem.closePanel()">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><line x1="1" y1="1" x2="13" y2="13"/><line x1="13" y1="1" x2="1" y2="13"/></svg>
        </button>
      </div>
      <div class="cp-list">${listHTML}</div>
      <div class="cp-form">
        <div class="cp-form-label">Add Comment${_filterItemTitle ? ' on ' + _filterItemTitle : ''}</div>
        <textarea id="cp-new-body" placeholder="Annotate this item..."></textarea>
        <div class="cp-form-row">
          <button class="cp-submit" onclick="CommentsSystem.submitFromPanel()">Add Comment</button>
        </div>
      </div>
    `;
  }

  function updateNavBadge() {
    const badge = document.querySelector('#comments-toggle .cm-nav-badge');
    const count = _comments.filter(c => !c.resolved).length;
    if (badge) {
      badge.textContent = count || '';
      badge.style.display = count ? 'inline-flex' : 'none';
    }
  }

  // ── Public API ──────────────────────────────────────────────────────────────
  const CommentsSystem = {

    init() {
      injectCSS();
      load();

      // Ensure panel exists
      let panel = document.getElementById('comments-panel');
      if (!panel) {
        panel = document.createElement('div');
        panel.id = 'comments-panel';
        document.body.appendChild(panel);
      }

      // Add comments toggle to nav
      const navMeta = document.querySelector('.nav-meta');
      if (navMeta && !document.getElementById('comments-toggle')) {
        const btn = document.createElement('button');
        btn.id = 'comments-toggle';
        btn.innerHTML = `
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2H2a1 1 0 00-1 1v7a1 1 0 001 1h3l2 2 2-2h3a1 1 0 001-1V3a1 1 0 00-1-1z"/></svg>
          <span class="toggle-label">Notes</span>
          <span class="cm-nav-badge" style="display:none">0</span>
        `;
        btn.onclick = () => CommentsSystem.togglePanel();
        navMeta.insertBefore(btn, navMeta.firstChild);
      }

      injectAllTriggers();
      updateNavBadge();

      // Re-inject triggers when ActionsManager re-renders the table
      // (MutationObserver on actionsBody)
      const tbody = document.getElementById('actionsBody');
      if (tbody) {
        new MutationObserver(() => {
          document.querySelectorAll('#actionsBody tr[data-id]').forEach(row => {
            const id = row.dataset.id;
            const textEl = row.querySelector('.act-text');
            const title = textEl ? textEl.textContent : id;
            const btnsTd = row.querySelector('.act-row-btns');
            if (btnsTd) injectTrigger(btnsTd, `action-${id}`, title);
          });
          updateTriggers();
        }).observe(tbody, { childList: true });
      }
    },

    togglePanel() {
      const panel = document.getElementById('comments-panel');
      if (!panel) return;
      _panelOpen = !_panelOpen;
      if (_panelOpen) {
        renderPanel();
        panel.classList.add('open');
      } else {
        panel.classList.remove('open');
      }
    },

    openPanel(itemId, itemTitle) {
      _filterItemId    = itemId;
      _filterItemTitle = itemTitle;
      _panelOpen = true;
      const panel = document.getElementById('comments-panel');
      if (panel) {
        renderPanel();
        panel.classList.add('open');
      }
    },

    closePanel() {
      _panelOpen = false;
      const panel = document.getElementById('comments-panel');
      if (panel) panel.classList.remove('open');
    },

    clearFilter() {
      _filterItemId    = null;
      _filterItemTitle = null;
      renderPanel();
    },

    submitFromPanel() {
      const ta = document.getElementById('cp-new-body');
      if (!ta) return;
      const body = ta.value.trim();
      if (!body) return;

      _comments.push({
        id:        shortId(),
        itemId:    _filterItemId    || 'general',
        itemTitle: _filterItemTitle || 'General',
        body,
        ts:        new Date().toISOString(),
        resolved:  false,
        replies:   []
      });
      save();
      ta.value = '';
      renderPanel();
      updateTriggers();
      updateNavBadge();
    },

    submitReply(commentId) {
      const input = document.getElementById(`reply-${commentId}`);
      if (!input) return;
      const body = input.value.trim();
      if (!body) return;
      const c = _comments.find(x => x.id === commentId);
      if (!c) return;
      if (!c.replies) c.replies = [];
      c.replies.push({ body, ts: new Date().toISOString() });
      save();
      renderPanel();
    },

    toggleResolve(commentId) {
      const c = _comments.find(x => x.id === commentId);
      if (!c) return;
      c.resolved = !c.resolved;
      save();
      renderPanel();
      updateTriggers();
      updateNavBadge();
    },

    remove(commentId) {
      _comments = _comments.filter(c => c.id !== commentId);
      save();
      renderPanel();
      updateTriggers();
      updateNavBadge();
    },

    getCount() {
      return _comments.filter(c => !c.resolved).length;
    }
  };

  window.CommentsSystem = CommentsSystem;
})();
