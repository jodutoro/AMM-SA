// ─── Gap Notes System ─────────────────────────────────────────────────────────
// Per-gap: overridden title, notes, comment thread → persisted in localStorage
// Usage: GapNotes.open(gapId)
const GapNotes = (() => {
  const LS_KEY = 'amm-gap-notes-v1';
  let _store = {};

  function load() {
    try { _store = JSON.parse(localStorage.getItem(LS_KEY) || '{}'); } catch { _store = {}; }
  }
  function persist() { localStorage.setItem(LS_KEY, JSON.stringify(_store)); }
  function getGap(id) {
    if(!_store[id]) _store[id] = { titleOverride: null, notesOverride: null, comments: [] };
    return _store[id];
  }

  const CATS = ['note', 'update', 'blocker', 'question'];
  const CAT_LABELS = { note: 'Note', update: 'Update', blocker: 'Blocker', question: 'Question' };

  function fmtTs(ts) {
    const d = new Date(ts);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) + ' · ' +
           d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  }

  // escapeStr is defined in index.html — safe to call here since this loads after
  function esc(s) { return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

  function renderPanel(gapId) {
    const raw    = (typeof AMM_DATA !== 'undefined') ? AMM_DATA.platformGaps.find(g => g.id === gapId) : null;
    if(!raw) return;
    const stored  = getGap(gapId);
    const title   = stored.titleOverride ?? raw.title;
    const notes   = stored.notesOverride ?? (raw.notes || '');
    const comments = stored.comments || [];

    // Priority meta — mirror index.html's prioMeta (safe to duplicate here)
    const pm = { critical:{cls:'p-critical',label:'Critical'}, high:{cls:'p-high',label:'High'},
                 medium:{cls:'p-medium',label:'Medium'}, low:{cls:'p-low',label:'Low'} };
    const prio = pm[raw.priority] || pm.medium;

    const commentsHTML = comments.length ? comments.map((c, ci) => {
      const repliesHTML = (c.replies || []).map(r => `
        <div class="gn-reply">
          <div class="gn-reply-meta">${fmtTs(r.ts)}</div>
          ${esc(r.text)}
        </div>`).join('');
      return `
        <div class="gn-comment${c.solved ? ' solved' : ''}" data-ci="${ci}">
          ${c.solved ? '<div class="gn-solved-badge">&#x2713; Resolved</div>' : ''}
          <div class="gn-comment-meta">
            <span class="gn-cat-badge gn-cat-${c.cat}">${CAT_LABELS[c.cat] || c.cat}</span>
            <span>${fmtTs(c.ts)}</span>
          </div>
          <div class="gn-comment-text">${esc(c.text)}</div>
          ${repliesHTML ? `<div class="gn-reply-thread">${repliesHTML}</div>` : ''}
          <div class="gn-comment-actions">
            <button class="gn-action-btn" onclick="GapNotes._toggleSolved('${gapId}',${ci})">
              ${c.solved ? 'Reopen' : 'Mark resolved'}
            </button>
            <button class="gn-action-btn" onclick="GapNotes._showReply('${gapId}',${ci},this)">Reply</button>
          </div>
        </div>`;
    }).join('') : '<p style="font-size:.8125rem;color:var(--muted);margin:8px 0">No comments yet.</p>';

    document.getElementById('gn-panel').innerHTML = `
      <div class="gn-header">
        <div>
          <div class="gn-lbl" style="margin-bottom:4px">Platform Gap</div>
          <a href="#gaps" onclick="GapNotes.close()" style="font-size:.75rem;color:var(--blue);text-decoration:none;">&#x2191; Back to gaps</a>
        </div>
        <button class="gn-close" onclick="GapNotes.close()" aria-label="Close">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <line x1="4" y1="4" x2="12" y2="12"/><line x1="12" y1="4" x2="4" y2="12"/>
          </svg>
        </button>
      </div>
      <div class="gn-body">
        <div>
          <div class="gn-lbl">Title</div>
          <textarea class="gn-title-edit" id="gnTitleEdit" rows="2">${esc(title)}</textarea>
        </div>
        <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">
          <span class="${prio.cls}">${prio.label}</span>
          ${raw.product ? `<span class="gap-prod">${esc(raw.product)}</span>` : ''}
          <span class="gap-who">${esc(raw.category)}</span>
        </div>
        <div>
          <div class="gn-lbl">Description</div>
          <p style="font-size:.8125rem;color:var(--text-2);line-height:1.55;margin:0">${esc(raw.description)}</p>
        </div>
        <div>
          <div class="gn-lbl">Members Affected</div>
          <p style="font-size:.8125rem;color:var(--muted);margin:0">${esc(raw.membersAffected.join(', '))}</p>
        </div>
        <div>
          <div class="gn-lbl">Internal Notes</div>
          <textarea class="gn-notes-edit" id="gnNotesEdit" placeholder="Add progress notes, links, context&hellip;">${esc(notes)}</textarea>
          <button class="gn-save-btn" style="margin-top:8px" onclick="GapNotes._save('${gapId}')">Save changes</button>
        </div>
        <div>
          <div class="gn-lbl" style="margin-bottom:0">Comments (${comments.length})</div>
          <div class="gn-comment-list" id="gnCommentList">${commentsHTML}</div>
        </div>
        <div class="gn-add-form">
          <div class="gn-lbl" style="margin:0">Add comment</div>
          <div class="gn-add-row">
            <select class="gn-cat-select" id="gnCatSelect">
              ${CATS.map(c => `<option value="${c}">${CAT_LABELS[c]}</option>`).join('')}
            </select>
          </div>
          <textarea class="gn-add-textarea" id="gnCommentText" placeholder="Write a note, update, or question&hellip;"></textarea>
          <button class="gn-post-btn" onclick="GapNotes._addComment('${gapId}')">Post</button>
        </div>
      </div>`;
  }

  return {
    init() {
      load();
      if(!document.getElementById('gn-overlay')) {
        const ov = document.createElement('div');
        ov.id = 'gn-overlay';
        ov.className = 'gn-overlay';
        ov.innerHTML = '<div id="gn-panel" class="gn-panel"></div>';
        ov.addEventListener('click', e => { if(e.target === ov) GapNotes.close(); });
        document.body.appendChild(ov);
      }
    },
    open(gapId) {
      renderPanel(gapId);
      document.getElementById('gn-overlay').classList.add('open');
      document.body.style.overflow = 'hidden';
    },
    close() {
      document.getElementById('gn-overlay').classList.remove('open');
      document.body.style.overflow = '';
    },
    _save(gapId) {
      const stored = getGap(gapId);
      stored.titleOverride = document.getElementById('gnTitleEdit')?.value.trim() || null;
      stored.notesOverride = document.getElementById('gnNotesEdit')?.value.trim() || null;
      persist();
      const btn = document.querySelector('.gn-save-btn');
      if(btn) { btn.textContent = 'Saved \u2713'; setTimeout(() => btn.textContent = 'Save changes', 1500); }
      if(typeof renderGaps === 'function') renderGaps();
    },
    _addComment(gapId) {
      const text = document.getElementById('gnCommentText')?.value.trim();
      if(!text) return;
      const cat = document.getElementById('gnCatSelect')?.value || 'note';
      getGap(gapId).comments.push({ text, cat, ts: Date.now(), solved: false, replies: [] });
      persist();
      renderPanel(gapId);
    },
    _toggleSolved(gapId, ci) {
      const c = getGap(gapId).comments[ci];
      if(c) c.solved = !c.solved;
      persist();
      renderPanel(gapId);
    },
    _showReply(gapId, ci, btn) {
      const wrap = btn.closest('.gn-comment');
      wrap.querySelectorAll('.gn-reply-input-row').forEach(el => el.remove());
      const row = document.createElement('div');
      row.className = 'gn-reply-input-row';
      row.innerHTML = `
        <textarea placeholder="Reply\u2026"></textarea>
        <button class="gn-post-btn" style="white-space:nowrap">Post</button>`;
      row.querySelector('button').onclick = () => {
        const txt = row.querySelector('textarea').value.trim();
        if(!txt) return;
        const c = getGap(gapId).comments[ci];
        if(!c.replies) c.replies = [];
        c.replies.push({ text: txt, ts: Date.now() });
        persist();
        renderPanel(gapId);
      };
      wrap.appendChild(row);
      row.querySelector('textarea').focus();
    },
    getNoteCount(gapId) { return (_store[gapId]?.comments || []).length; },
    getTitleOverride(gapId) { return _store[gapId]?.titleOverride || null; }
  };
})();
