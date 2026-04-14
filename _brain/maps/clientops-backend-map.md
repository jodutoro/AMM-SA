---
tags: [map, clientops, backend, python]
---

# ClientOps Backend — Map of Content

> Python backend service for client operations dashboard. Integrates Intercom, ClickUp, Linear, Slack, Userpilot, DevBot.

**Location:** `Work stuff/clientops-backend/`

---

## Docs
- [[Work stuff/clientops-backend/README|README]]
- [[Work stuff/clientops-backend/PRD|PRD]] — Product requirements
- [[Work stuff/clientops-backend/Plan|Plan]] — Development plan
- [[Work stuff/clientops-backend/AI_rules|AI Rules]] — AI behavior rules
- [[Work stuff/clientops-backend/architecture|Architecture]] — System architecture
- [[Work stuff/clientops-backend/EXECUTIVE_OVERVIEW|Executive Overview]]

## Core Modules (`core/`)
| Module | Purpose |
|---|---|
| `accounts.py` | Account management |
| `clickup.py` | ClickUp integration |
| `clients.py` | Client data |
| `detection.py` | Detection logic |
| `devbot.py` | DevBot API integration |
| `intercom.py` | Intercom integration |
| `linear.py` | Linear issue tracking |
| `models.py` | Data models |
| `slack_helpers.py` | Slack utilities |
| `userpilot.py` | Userpilot integration |

## Scripts (`scripts/`)
- `eod_report.py` — **EOD Tier 2 auto-poster** — posts daily report to Slack `C08PNQ4TR2P`. Sources: Google Calendar (meetings), Linear SPE team (JD tickets), ClickUp (active/assigned tasks). Run: `python3 eod_report.py --test` to preview, `--date YYYY-MM-DD` to override date.
- `eod_cron.sh` — Cron wrapper for eod_report.py (log rotation → `logs/eod_report.log`)
- `fetch_impact_data.py` — Pull impact/metrics data
- `resolve_gold_tier_ids.py` — Resolve Gold Tier client IDs

## EOD Report — Cron Setup
```
# Crontab (0 23 UTC = 6 PM Bogota), weekdays only
0 23 * * 1-5 /Library/Frameworks/Python.framework/Versions/3.14/bin/python3 "/Users/eillacs/Desktop/Agentic/Work stuff/clientops-backend/scripts/eod_report.py" >> /Users/eillacs/Desktop/Agentic/logs/eod_report.log 2>&1
```
**Key IDs:** Slack `C08PNQ4TR2P` · Linear team `091bd12a-9a03-4eb4-abfd-87bd3131ad75` · ClickUp workspace `9011399348` · ClickUp user `81342217`
**Fixed tasks (always):** Slack support requests · Tier 2 escalations · Followed up on escalations · Checked/created/updated tracker tickets · Circle MMA community support · HL tools sales confirmation
**ClickUp tasks:** open/in-progress tasks assigned to JD (no due date = recurring; overdue/due today = active)
**Calendar:** OAuth token `~/.config/eod_report/google_token.json` · GCP project `536741099866` must have Calendar API enabled

## Browser Extension (`tier2-triage-extension/`)
- Chrome extension for Tier-2 ticket triage
- Files: `manifest.json`, `popup.html`, `popup.js`, `content.js`

## Dashboards (HTML)
- `partner-inbox.html` — Primary support dashboard
- `clientops-viz.html` / `clientops-viz-v3.html` / `clientops-viz-3d.html` — Visualizations

---

← [[../00-BRAIN-INDEX|Brain Index]]
