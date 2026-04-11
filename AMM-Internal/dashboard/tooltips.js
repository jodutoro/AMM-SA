// ─── AMM Unified Tooltip System ───────────────────────────────────────────────
// Covers: badge pills, effort/priority/status/gain badges, KPI cards,
//         skill tags, filter buttons, and [data-tip] for ad-hoc tooltips.
//
// Emil principles applied:
//   • scale(0.94)+opacity:0 → scale(1)+opacity:1 entry (nothing appears from nothing)
//   • Strong ease-out: cubic-bezier(0.23,1,0.32,1) — feels instantly responsive
//   • 120ms delay on first hover, 0ms (instant) within same hover group
//   • Exits are instant — no animation, just opacity:0 (the system is responding)
//   • Origin-aware positioning — tooltip never clips viewport edges
//   • prefers-reduced-motion respected
//
// Exposes: window.AMMTooltip — call AMMTooltip.init() after AMM_DATA is loaded.
// ─────────────────────────────────────────────────────────────────────────────

(function () {
  'use strict';

  // ── CSS ─────────────────────────────────────────────────────────────────────
  const css = `
    /* ── Tooltip element ── */
    #amm-tip {
      position: fixed;
      z-index: 8000;
      pointer-events: none;
      max-width: 272px;
      min-width: 140px;
      padding: 9px 13px 10px;
      border-radius: 10px;
      font-family: var(--font, 'Plus Jakarta Sans', system-ui, sans-serif);
      font-size: .8125rem;
      line-height: 1.5;
      color: var(--text, #0F172A);
      background: rgba(255,255,255,0.94);
      border: 1px solid rgba(0,0,0,.07);
      border-top: 2px solid rgba(124,58,237,.45);
      box-shadow: 0 4px 20px rgba(0,0,0,.11), 0 1px 4px rgba(0,0,0,.06);
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      /* entry state */
      opacity: 0;
      transform: scale(0.94) translateY(5px);
      transition: opacity 150ms cubic-bezier(0.23,1,0.32,1),
                  transform 150ms cubic-bezier(0.23,1,0.32,1);
      will-change: transform, opacity;
    }
    [data-theme="dark"] #amm-tip {
      background: rgba(10,10,20,0.93);
      border-color: rgba(255,255,255,.05);
      border-top-color: rgba(168,85,247,.55);
      box-shadow: 0 8px 32px rgba(0,0,0,.55), 0 0 0 1px rgba(168,85,247,.1);
      color: var(--text, #F8FAFC);
    }
    #amm-tip.tip-vis {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
    #amm-tip.tip-instant {
      transition-duration: 0ms;
    }

    /* ── Tip content pieces ── */
    .tip-title {
      font-weight: 700;
      font-size: .6875rem;
      letter-spacing: .06em;
      text-transform: uppercase;
      color: var(--purple, #7C3AED);
      margin-bottom: 4px;
    }
    [data-theme="dark"] .tip-title { color: var(--purple, #A855F7); }
    .tip-body {
      color: var(--text-2, #334155);
      font-size: .8125rem;
      font-weight: 500;
    }
    [data-theme="dark"] .tip-body { color: var(--text-2, #CBD5E1); }
    .tip-sub {
      color: var(--muted, #64748B);
      font-size: .75rem;
      margin-top: 3px;
      line-height: 1.45;
    }
    .tip-who-list {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
      margin-top: 6px;
    }
    .tip-who-chip {
      font-size: .625rem;
      font-weight: 700;
      letter-spacing: .03em;
      padding: 2px 7px;
      border-radius: 999px;
      background: rgba(124,58,237,.1);
      color: var(--purple, #7C3AED);
    }
    [data-theme="dark"] .tip-who-chip {
      background: rgba(168,85,247,.15);
      color: #C4B5FD;
    }

    /* ── Micro-interaction elevation ── */
    @media (hover: hover) and (pointer: fine) {

      /* Badges scale up slightly on hover */
      .bdg2 {
        cursor: default;
        transition: transform 140ms cubic-bezier(0.23,1,0.32,1),
                    box-shadow 140ms cubic-bezier(0.23,1,0.32,1);
      }
      .bdg2:hover {
        transform: scale(1.05);
        box-shadow: 0 2px 8px rgba(0,0,0,.1);
      }

      .roi-pill, .effort-badge, .gain-type,
      .p-critical, .p-high, .p-medium, .p-low {
        cursor: default;
        transition: transform 140ms cubic-bezier(0.23,1,0.32,1);
      }
      .roi-pill:hover, .effort-badge:hover, .gain-type:hover,
      .p-critical:hover, .p-high:hover, .p-medium:hover, .p-low:hover {
        transform: scale(1.05);
      }

      /* KPI cards lift on hover */
      .kpi-card {
        transition: background 150ms cubic-bezier(0.23,1,0.32,1),
                    transform 200ms cubic-bezier(0.23,1,0.32,1),
                    box-shadow 200ms cubic-bezier(0.23,1,0.32,1);
      }
      .kpi-card:hover {
        transform: translateY(-3px);
        box-shadow: 0 6px 20px rgba(0,0,0,.09);
      }
      [data-theme="dark"] .kpi-card:hover {
        box-shadow: 0 6px 24px rgba(0,0,0,.4);
      }

      /* Member cards lift */
      .m-card {
        transition: box-shadow 200ms cubic-bezier(0.23,1,0.32,1),
                    transform 200ms cubic-bezier(0.23,1,0.32,1);
      }
      .m-card:hover {
        transform: translateY(-3px);
        box-shadow: 0 8px 28px rgba(0,0,0,.1);
      }
      [data-theme="dark"] .m-card:hover {
        box-shadow: 0 8px 36px rgba(0,0,0,.42);
      }

      /* Skill tags lift + glow */
      .m-skill-tag {
        transition: background 120ms, color 120ms,
                    transform 130ms cubic-bezier(0.23,1,0.32,1);
        cursor: pointer;
      }
      .m-skill-tag:hover {
        transform: scale(1.07);
      }

      /* Filter / view buttons */
      .filter-btn, .view-btn {
        transition: background 150ms cubic-bezier(0.23,1,0.32,1),
                    color 150ms,
                    transform 120ms cubic-bezier(0.23,1,0.32,1);
      }
      .filter-btn:hover, .view-btn:hover {
        transform: translateY(-1px);
      }

      /* Nav links */
      .nav-links a {
        transition: color 150ms cubic-bezier(0.23,1,0.32,1),
                    background 150ms cubic-bezier(0.23,1,0.32,1);
      }

      /* Gap rows subtle lift */
      .gap-row {
        transition: background 120ms cubic-bezier(0.23,1,0.32,1);
      }
    }

    /* ── Press / active states (all devices) ── */
    .cm-btn:active, .cp-submit:active, .cm-reply-send:active,
    .cp-close:active, .cm-trigger:active,
    .filter-btn:active, .view-btn:active,
    .act-add-btn:active, .cu-sync-btn:active,
    .gn-save-btn:active, .gn-post-btn:active {
      transform: scale(0.97) !important;
      transition-duration: 80ms !important;
    }

    /* ── Reduced motion ── */
    @media (prefers-reduced-motion: reduce) {
      #amm-tip {
        transition: opacity 100ms linear;
        transform: none !important;
      }
      .bdg2, .roi-pill, .effort-badge, .gain-type,
      .p-critical, .p-high, .p-medium, .p-low,
      .kpi-card, .m-card, .m-skill-tag,
      .filter-btn, .view-btn, .gap-row {
        transition: none !important;
        transform: none !important;
      }
    }
  `;

  function injectCSS() {
    if (document.getElementById('amm-tip-styles')) return;
    const s = document.createElement('style');
    s.id = 'amm-tip-styles';
    s.textContent = css;
    document.head.appendChild(s);
  }

  // ── Tooltip DOM ──────────────────────────────────────────────────────────────
  let _tip = null;
  let _showTimer = null;
  let _groupActive = false;
  let _groupTimer = null;

  function getEl() {
    if (!_tip) {
      _tip = document.createElement('div');
      _tip.id = 'amm-tip';
      document.body.appendChild(_tip);
    }
    return _tip;
  }

  // ── Positioning ─────────────────────────────────────────────────────────────
  // Called after innerHTML is set so offsetWidth/Height are available
  function position(anchor) {
    const el = getEl();
    const r  = anchor.getBoundingClientRect();
    const tw = el.offsetWidth  || 220;
    const th = el.offsetHeight || 56;
    const GAP = 10;
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // Prefer above; flip below if insufficient room
    let top  = r.top  - th - GAP;
    let left = r.left + r.width / 2 - tw / 2;

    if (top < 8) top = r.bottom + GAP;
    if (top + th > vh - 8) top = vh - th - 8;

    left = Math.max(8, Math.min(left, vw - tw - 8));

    el.style.left = left + 'px';
    el.style.top  = top  + 'px';
  }

  // ── Show / hide ──────────────────────────────────────────────────────────────
  function show(content, anchor) {
    const el = getEl();
    el.innerHTML = content;

    // Position before revealing so size is known
    el.style.visibility = 'hidden';
    el.classList.add('tip-vis');
    position(anchor);
    el.style.visibility = '';

    if (_groupActive) {
      el.classList.add('tip-instant');
    } else {
      el.classList.remove('tip-instant');
    }

    // Force reflow then trigger transition
    void el.offsetWidth;
    el.classList.add('tip-vis');

    _groupActive = true;
    clearTimeout(_groupTimer);
  }

  function hide() {
    clearTimeout(_showTimer);
    _showTimer = null;
    const el = getEl();
    el.classList.remove('tip-vis', 'tip-instant');

    clearTimeout(_groupTimer);
    _groupTimer = setTimeout(() => { _groupActive = false; }, 450);
  }

  // ── Content helpers ──────────────────────────────────────────────────────────
  function h(title, body, sub) {
    const t = title ? `<div class="tip-title">${title}</div>` : '';
    const b = body  ? `<div class="tip-body">${body}</div>`   : '';
    const s = sub   ? `<div class="tip-sub">${sub}</div>`     : '';
    return t + b + s;
  }

  // ── Content dictionaries ─────────────────────────────────────────────────────
  const ROI = {
    'roi-high': h('High ROI', 'Gain-to-effort ratio ≥ 1.5',    'High value · low complexity — prioritize first'),
    'roi-med':  h('Med ROI',  'Gain-to-effort ratio ≥ 0.75',   'Solid return with moderate effort'),
    'roi-low':  h('Low ROI',  'Gain-to-effort ratio &lt; 0.75','Strategic value, higher effort required'),
  };

  const EFFORT = {
    'eff-low':    h('Low Complexity',    'Ships in &lt;1 sprint',   'No architectural changes · quick win'),
    'eff-medium': h('Medium Complexity', '1–3 sprint effort',       'Some cross-team coordination required'),
    'eff-high':   h('High Complexity',   'Multi-sprint build',      'Deep platform integration or infra work'),
  };

  const PRIO = {
    'p-critical': h('Critical', 'Blocking member outcomes or revenue', 'Must address immediately'),
    'p-high':     h('High',     'Significant friction or growth opportunity', 'Address this quarter'),
    'p-medium':   h('Medium',   'Quality-of-life improvement',  'Schedule on the roadmap'),
    'p-low':      h('Low',      'Nice-to-have',                  'Revisit in future planning cycles'),
  };

  const STATUS = {
    'st-open':        h('Open',        'Not yet started',       'Needs prioritization'),
    'st-in-progress': h('In Progress', 'Actively being worked on'),
    'st-resolved':    h('Resolved',    'Shipped or addressed'),
  };

  const GAIN = {
    'gt-retention':   h('Retention',   'Reduces churn or increases stickiness', 'Protects existing MRR'),
    'gt-acquisition': h('Acquisition', 'Attracts new customers or segments',    'Grows top of funnel'),
    'gt-upsell':      h('Upsell',      'Drives upgrades from existing users',   'Expands ARR per account'),
    'gt-mixed':       h('Mixed',       'Impacts both retention and acquisition'),
    'gt-positioning': h('Positioning', 'Improves brand or competitive perception', 'Indirect revenue impact'),
  };

  const BDG = {
    // Tier
    'Advanced':        h('Tier: Advanced',  'Top performer',       'Deeply engaged with program and SA platform'),
    'Growing':         h('Tier: Growing',   'Active participant',  'Increasing engagement and platform adoption'),
    'Starting':        h('Tier: Starting',  'Onboarding',          'Early in SA journey · building momentum'),
    'At Risk':         h('Tier: At Risk',   'Needs attention',     'Low activity or disengagement signals'),
    // SA Alignment
    'In Platform':     h('SA Alignment',    'Primarily using SA tools', 'DevBot · OTTO · Website Studio · Atlas Brain'),
    'Mixed':           h('SA Alignment',    'SA tools + external',     'Partial ecosystem adoption'),
    'Around SA':       h('SA Alignment',    'Building outside SA',     'Potential gap or churn signal'),
    'Unknown':         h('SA Alignment',    'Not yet assessed'),
    // Support demand
    'Self-Sufficient': h('Support',         'Fully independent',       'Minimal bandwidth needed from JD'),
    'Low':             h('Support: Low',    'Occasional questions',    'Mostly self-directed'),
    'Medium':          h('Support: Medium', 'Regular check-ins helpful','Benefits from guided support'),
    'High':            h('Support: High',   'Frequent 1-on-1 needed',  'Priority for JD bandwidth'),
    // Engagement style
    'Champion':        h('Engagement',      'Proactively promotes SA', 'Shares wins · refers others'),
    'Collaborative':   h('Engagement',      'Active in discussions',   'Engaged but not always vocal'),
    'Quiet':           h('Engagement',      'Mostly observes',         'Participates when prompted'),
    'Silent':          h('Engagement',      'Minimal engagement',      'At risk of dropping off'),
  };

  const KPI = {
    'Total Members':   h('Total Members',   'All enrolled in this AMM cohort',        'Active = last 30 days · At Risk = disengagement signals'),
    'Inside Platform': h('Inside Platform', 'Primary work is within SA tools',         'DevBot · OTTO · Website Studio · Atlas'),
    'Mixed or Around': h('Mixed or Around', 'Building outside SA ecosystem',           'Potential gap signal · possible churn indicator'),
    'Platform Gaps':   h('Platform Gaps',   'Documented gaps from member sessions',    'Each row in the Gaps table is one gap'),
    'Open Actions':    h('Open Actions',    'Active action items',                     'Updated Apr 10 · includes restructuring items'),
  };

  const NAV = {
    'All Members':      h('All Members',       'Show every AMM member'),
    'Advanced':         h('Advanced Filter',   'Top-performing, deeply engaged members'),
    'At Risk':          h('At Risk Filter',    'Members with disengagement or low activity signals'),
    'Around Platform':  h('Around SA Filter',  'Members building primarily outside the SA ecosystem'),
    'High Support':     h('High Support Filter','Members needing frequent 1-on-1 attention'),
  };

  // ── Content resolver ─────────────────────────────────────────────────────────
  function resolve(el) {
    if (el.dataset.tip) return el.dataset.tip; // [data-tip] override

    const c = el.className || '';

    // ROI pill
    if (c.includes('roi-pill')) {
      for (const k of Object.keys(ROI)) if (c.includes(k)) return ROI[k];
    }
    // Effort badge
    if (c.includes('effort-badge')) {
      for (const k of Object.keys(EFFORT)) if (c.includes(k)) return EFFORT[k];
    }
    // Priority
    for (const k of Object.keys(PRIO)) if (c.includes(k)) return PRIO[k];
    // Status
    for (const k of Object.keys(STATUS)) if (c.includes(k)) return STATUS[k];
    // Gain type
    for (const k of Object.keys(GAIN)) if (c.includes(k)) return GAIN[k];

    // bdg2 — derive from value label text
    if (c.includes('bdg2')) {
      const valEl = el.querySelector('.bdg2-val');
      const val = valEl ? valEl.textContent.trim() : '';
      return BDG[val] || null;
    }

    // KPI card
    if (c.includes('kpi-card')) {
      const lbl = el.querySelector('.kpi-label');
      return KPI[lbl ? lbl.textContent.trim() : ''] || null;
    }

    // Filter / view button
    if (c.includes('filter-btn') || c.includes('view-btn')) {
      const txt = el.textContent.replace(/[^\w\s]/g,'').trim();
      return NAV[txt] || null;
    }

    // Skill tag — list who shares this skill
    if (c.includes('m-skill-tag')) {
      return resolveSkillTip(el.textContent.trim());
    }

    return null;
  }

  function resolveSkillTip(skill) {
    if (!window.AMM_DATA) return h('Skill', skill, 'Click to filter by this skill');
    const matches = window.AMM_DATA.members.filter(m =>
      (m.skills || []).some(s => s.toLowerCase() === skill.toLowerCase())
    );
    if (!matches.length) return h('Skill', skill);
    const chips = matches.map(m =>
      `<span class="tip-who-chip">${m.name.split(' ')[0]}</span>`
    ).join('');
    const countLabel = `${matches.length} member${matches.length > 1 ? 's' : ''} with this skill`;
    return h('Skill', skill,
      `<span style="color:var(--muted);font-size:.6875rem;">${countLabel}</span>
       <div class="tip-who-list">${chips}</div>`
    );
  }

  // ── Event delegation ─────────────────────────────────────────────────────────
  const TARGETS = [
    '.roi-pill', '.effort-badge', '.gain-type',
    '.p-critical', '.p-high', '.p-medium', '.p-low',
    '.st-open', '.st-in-progress', '.st-resolved',
    '.bdg2', '.kpi-card', '.m-skill-tag',
    '.filter-btn', '.view-btn',
    '[data-tip]',
  ].join(', ');

  function onEnter(e) {
    const target = e.target.closest(TARGETS);
    if (!target) return;
    // Don't tooltip inside comments panel
    if (document.getElementById('comments-panel')?.contains(target)) return;

    clearTimeout(_showTimer);
    const delay = _groupActive ? 0 : 120;
    _showTimer = setTimeout(() => {
      const content = resolve(target);
      if (content) show(content, target);
    }, delay);
  }

  function onLeave(e) {
    const target = e.target.closest(TARGETS);
    if (!target) return;
    hide();
  }

  // ── Init ─────────────────────────────────────────────────────────────────────
  function init() {
    injectCSS();
    document.addEventListener('mouseover', onEnter, true);
    document.addEventListener('mouseout',  onLeave, true);
  }

  window.AMMTooltip = { init, show, hide };

})();
