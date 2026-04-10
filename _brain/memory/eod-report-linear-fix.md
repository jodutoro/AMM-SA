---
name: EOD Report — Linear query fix
description: Linear ticket filter must query all teams with 'by JD' description marker — not T2 team only
type: project
---

# EOD Report Linear Query — Confirmed Working State

**Script:** `clientops-backend/scripts/eod_report.py`
**Confirmed working format approved by JD on 2026-03-31.**

## The Fix
Linear tickets are created by `support@searchatlas.com` (service account) in whatever team matches the product area (RB, CG, SPE, AI, etc.) — not just T2. The triage system stamps `## by JD` in the description for every ticket JD raises.

**Old (broken):** queried only `T2_TEAM_ID`, so cross-team tickets like RB-952 were invisible.
**Fixed:** query all teams with `createdAt` filter, filter client-side by `"by jd" in description.lower()`.

**Why:** JD creates tickets in RB, CG, SPE, AI, OTTO and other teams. Scoping to T2 only missed everything else.

**How to apply:** If tickets ever show 0 again, check: (1) is `## by JD` present in the description? (2) Is the date window correct for Bogota timezone? Do not revert to team-scoped query.

## Confirmed Output Format (2026-03-31)
- **Bold** section headers (Date, Name, Meetings, Tasks, Tickets Created, Additional Needs)
- Meetings: bullet list from Google Calendar (all-day window, skips personal/OOO/meals)
- Tasks: BASE_TASKS list (6 items)
- Tickets Created: linked `IDENTIFIER: Title` lines (no bullets — inline links)
- Additional Needs: `:x:` emoji when none
- No "Sent using @Claude" workaround needed — user accepts this Slack app attribution

---
*See also:* [[eod-report-setup]]
