---
name: AMM Dashboard Gotchas
description: Technical gotchas for AMM-Internal/dashboard/demo.html — data architecture, ROI formula, DevBot DB numbers
type: project
---

# AMM Dashboard — Technical Gotchas

**Why:** Encountered a data-edit bug where changes to data.js had no effect. Root cause: `AMM_DATA` is defined **inline inside demo.html** (search for `const AMM_DATA =` in demo.html), not loaded from data.js. All edits to platformGaps, members, KPIs, etc. must go into demo.html directly.

**How to apply:** Before editing any dashboard data, always confirm you are editing the inline `AMM_DATA` object in `demo.html`. Changes to `data.js` are a dead end.

---

## ROI Score Formula

Used in the gaps table ROI pill:

```js
function roiScore(gap) {
  const gainLvl = parseArrMid(gap.arrEstimate) >= 100 ? 3
                : parseArrMid(gap.arrEstimate) >= 50  ? 2 : 1;
  const effMap = { low: 1, medium: 2, high: 3 };
  const effLvl = effMap[gap.effort] || 2;
  return gainLvl / effLvl;
}
```

ROI labels: ≥1.5 → "High ROI", ≥0.75 → "Med ROI", else "Low ROI".

---

## DevBot DB Numbers (Apr 10, 2026)

Used for ARR estimates in platformGaps:

- 5,171 paid subscribers
- ~$155 ARPC (average revenue per customer/month)
- ~3% monthly churn
- ~16 LPS devs, ~27 AI Agent devs
- 2-week sprint cadence

Source footnote in dashboard: "DevBot DB pull Apr 10, 2026 · 5,171 paid subs · $155 ARPC · 3% monthly churn · 2-wk sprints"

---

## Comments Panel + Member Grid

- Comments panel was dark-themed; restyled to match light dashboard using CSS vars (`var(--bg-card)`, `var(--border)`).
- Member cards go 2-col when a **VIEW filter** (Builds/Blockers/Wishlist) is active. CSS class on `#memberGrid` is `.view-active` (not `.filtered`).
