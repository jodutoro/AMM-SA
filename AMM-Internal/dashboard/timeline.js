// ─── AMM Program Timeline ────────────────────────────────────────────────────
// Horizontal progress timeline with member avatar chips at their current stage.
// Requires AMM_DATA.programStages + programStage field on each member.
// Exposes window.ProgramTimeline — call ProgramTimeline.init() after DOM renders.
// ─────────────────────────────────────────────────────────────────────────────

(function () {
  'use strict';

  const STAGE_ORDER = ['enrolled','oriented','setup','building','active','autonomous','champion'];

  const TIER_COLORS = {
    advanced: { bg: '#DCFCE7', fg: '#16A34A' },
    growing:  { bg: '#DBEAFE', fg: '#2563EB' },
    starting: { bg: '#FEF9C3', fg: '#D97706' },
    risk:     { bg: '#FEE2E2', fg: '#DC2626' }
  };

  function injectCSS() {
    document.head.insertAdjacentHTML('beforeend', `<style>
      /* ── Program Timeline ── */
      .pt-wrap {
        margin-bottom: 28px;
        background: var(--bg-card);
        border: 1px solid var(--border);
        border-radius: var(--radius);
        padding: 22px 28px 20px;
        overflow: hidden;
      }
      .pt-eyebrow {
        font-size: .5625rem; font-weight: 800;
        letter-spacing: .12em; text-transform: uppercase;
        color: var(--muted); margin-bottom: 16px;
        display: flex; align-items: center; gap: 10px;
      }
      .pt-eyebrow::after {
        content: ''; flex: 1; height: 1px; background: var(--border);
      }

      /* Stage column grid */
      .pt-stage-row {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
      }
      .pt-members-col {
        display: flex; flex-direction: column;
        align-items: center; gap: 4px;
        min-height: 36px; padding-bottom: 8px;
      }

      /* Track */
      .pt-track-row {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        align-items: center;
        position: relative;
      }
      .pt-track-row::before {
        content: ''; position: absolute;
        top: 50%; left: calc(100% / 14);
        right: calc(100% / 14);
        height: 2px;
        background: linear-gradient(90deg, var(--border) 0%, var(--border-mid) 50%, var(--border) 100%);
        z-index: 0;
      }
      .pt-checkpoint-wrap {
        display: flex; justify-content: center;
        position: relative; z-index: 1;
      }
      .pt-checkpoint {
        width: 10px; height: 10px; border-radius: 50%;
        background: var(--bg-card2);
        border: 2px solid var(--border-mid);
        transition: all 200ms; cursor: pointer;
        flex-shrink: 0;
      }
      .pt-checkpoint.has-members {
        background: var(--blue);
        border-color: var(--blue);
        box-shadow: 0 0 0 4px rgba(59,130,246,.15);
      }
      .pt-checkpoint.is-champion {
        background: #F59E0B;
        border-color: #F59E0B;
        box-shadow: 0 0 0 4px rgba(245,158,11,.2);
        width: 12px; height: 12px;
      }

      /* Stage labels */
      .pt-label-row {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        margin-top: 8px;
      }
      .pt-stage-lbl {
        text-align: center;
        font-size: .5625rem; font-weight: 700;
        text-transform: uppercase; letter-spacing: .06em;
        color: var(--muted); padding: 0 4px;
        line-height: 1.3; opacity: .6;
        transition: opacity 200ms;
      }
      .pt-stage-lbl.has-members { opacity: 1; color: var(--text-2); }

      /* Member chips */
      .pt-chip {
        width: 42px; height: 42px; border-radius: 50%;
        display: flex; align-items: center; justify-content: center;
        font-size: .6875rem; font-weight: 800; letter-spacing: -.01em;
        cursor: pointer; flex-shrink: 0;
        border: 2px solid transparent;
        transition: transform 150ms cubic-bezier(0.23,1,0.32,1),
                    box-shadow 150ms cubic-bezier(0.23,1,0.32,1);
        overflow: hidden;
        background-clip: padding-box;
      }
      .pt-chip:hover {
        transform: scale(1.22);
        box-shadow: 0 4px 16px rgba(0,0,0,.18);
        z-index: 10; position: relative;
      }
      .pt-chip:active { transform: scale(0.95); }
      .pt-chip img {
        width: 100%; height: 100%;
        object-fit: cover; border-radius: 50%;
      }

      /* Tooltip */
      .pt-tip {
        position: fixed; z-index: 900;
        background: #FFFFFF;
        border: 1px solid var(--border);
        border-radius: 6px; padding: 10px 14px;
        pointer-events: none; white-space: nowrap;
        box-shadow: 0 8px 24px rgba(0,0,0,.10);
        opacity: 0; transition: opacity 100ms;
      }
      .pt-tip.visible { opacity: 1; }
      .pt-tip-name   { font-size: .8125rem; font-weight: 700; color: var(--text); }
      .pt-tip-agency { font-size: .6875rem; color: var(--muted); margin-top: 2px; }
      .pt-tip-stage  {
        font-size: .5625rem; font-weight: 800;
        letter-spacing: .08em; text-transform: uppercase;
        color: var(--amber, #D97706); margin-top: 5px;
      }

      /* Responsive */
      @media (max-width: 768px) { .pt-wrap { display: none; } }
    </style>`);
  }

  function initials(name) {
    return name.split(' ').map(x => x[0]).join('').slice(0, 2).toUpperCase();
  }

  // ── Render ──────────────────────────────────────────────────────────────────
  function render() {
    const container = document.querySelector('#members .container');
    if (!container) return;

    let wrap = container.querySelector('.pt-wrap');
    if (!wrap) {
      wrap = document.createElement('div');
      wrap.className = 'pt-wrap';
      const sectionHdr = container.querySelector('.section-hdr');
      container.insertBefore(wrap, sectionHdr ? sectionHdr.nextSibling : container.firstChild);
    }

    const stages  = AMM_DATA.programStages || [];
    const members = AMM_DATA.members || [];

    // Group members by stage
    const byStage = {};
    STAGE_ORDER.forEach(s => (byStage[s] = []));
    members.forEach(m => {
      const s = m.programStage || 'enrolled';
      if (byStage[s]) byStage[s].push(m);
    });

    // Member chips per stage column
    const memberCols = STAGE_ORDER.map(stageId => {
      const stageDef  = stages.find(s => s.id === stageId);
      const stageLabel = stageDef?.label || stageId;
      const chips = (byStage[stageId] || []).map(m => {
        const tc  = TIER_COLORS[m.tier] || TIER_COLORS.growing;
        const img = m.avatarUrl
          ? `<img src="${m.avatarUrl}" alt="${m.name}" onerror="this.style.display='none'">`
          : initials(m.name);
        return `<div class="pt-chip"
          style="background:${tc.bg};color:${tc.fg};border-color:${tc.fg}44;"
          data-mid="${m.id}"
          data-name="${m.name}"
          data-agency="${m.agency}"
          data-stage="${stageLabel}"
          onmouseenter="ProgramTimeline.showTip(this,event)"
          onmouseleave="ProgramTimeline.hideTip()"
          onclick="ProgramTimeline.scrollTo('${m.id}')"
          title="${m.name}">${img}</div>`;
      }).join('');
      return `<div class="pt-members-col">${chips}</div>`;
    }).join('');

    // Checkpoint dots
    const checkpoints = STAGE_ORDER.map(stageId => {
      const hasMembers = (byStage[stageId] || []).length > 0;
      const isCh = stageId === 'champion';
      return `<div class="pt-checkpoint-wrap">
        <div class="pt-checkpoint${hasMembers ? ' has-members' : ''}${isCh && hasMembers ? ' is-champion' : ''}"></div>
      </div>`;
    }).join('');

    // Stage labels
    const stageLabels = STAGE_ORDER.map(stageId => {
      const stageDef  = stages.find(s => s.id === stageId);
      const hasMembers = (byStage[stageId] || []).length > 0;
      return `<div class="pt-stage-lbl${hasMembers ? ' has-members' : ''}">${stageDef?.label || stageId}</div>`;
    }).join('');

    wrap.innerHTML = `
      <div class="pt-eyebrow">Program Progress</div>
      <div class="pt-stage-row">${memberCols}</div>
      <div class="pt-track-row">${checkpoints}</div>
      <div class="pt-label-row">${stageLabels}</div>
    `;
  }

  // ── Tooltip ────────────────────────────────────────────────────────────────
  let _tip = null;

  function getTip() {
    if (!_tip) {
      _tip = document.createElement('div');
      _tip.className = 'pt-tip';
      document.body.appendChild(_tip);
    }
    return _tip;
  }

  // ── Public API ─────────────────────────────────────────────────────────────
  const ProgramTimeline = {
    init() {
      if (typeof AMM_DATA === 'undefined') return;
      injectCSS();
      render();
    },

    showTip(chip, event) {
      const tip = getTip();
      tip.innerHTML = `
        <div class="pt-tip-name">${chip.dataset.name}</div>
        <div class="pt-tip-agency">${chip.dataset.agency}</div>
        <div class="pt-tip-stage">${chip.dataset.stage}</div>
      `;
      const x = event.clientX + 14;
      const y = event.clientY - 12;
      const w = 220;
      tip.style.left = (x + w > window.innerWidth ? x - w - 24 : x) + 'px';
      tip.style.top  = y + 'px';
      tip.classList.add('visible');
    },

    hideTip() {
      if (_tip) _tip.classList.remove('visible');
    },

    scrollTo(memberId) {
      const card = document.querySelector(`.m-card[data-id="${memberId}"]`);
      if (!card) return;
      card.scrollIntoView({ behavior: 'smooth', block: 'center' });
      const prev = card.style.outline;
      card.style.outline = '2px solid var(--blue)';
      card.style.outlineOffset = '3px';
      setTimeout(() => { card.style.outline = prev; card.style.outlineOffset = ''; }, 1800);
    }
  };

  window.ProgramTimeline = ProgramTimeline;
})();
