---
name: EOD Tier 2 Report Setup
description: How the automated EOD Tier 2 report works — runner, data sources, verify safety net, gotchas
type: project
---

# EOD Tier 2 Report

**Script:** `Work stuff/clientops-backend/scripts/eod_report.py`
**Verify:** `Work stuff/clientops-backend/scripts/eod_verify.py`
**Log:** `~/Library/Logs/eod_report.log`
**Verify log:** `~/Library/Logs/eod_verify.log`

## Run Commands
```bash
python3 "Work stuff/clientops-backend/scripts/eod_report.py" --test         # preview, no post
python3 "Work stuff/clientops-backend/scripts/eod_report.py"                # live post to ClickUp
python3 "Work stuff/clientops-backend/scripts/eod_report.py" --date 2026-04-08  # override date
python3 "Work stuff/clientops-backend/scripts/eod_verify.py" --date 2026-04-08  # manual verify
```

## Runner — LaunchAgent

**LaunchAgent (report):** `~/Library/LaunchAgents/com.eillacs.eod-report.plist`
**LaunchAgent (verify):** `~/Library/LaunchAgents/com.eillacs.eod-verify.plist`

Schedule: report at 20:05 UTC / verify at 20:15 UTC (morning), 00:05 UTC / 00:15 UTC (noon).
Python `--shift-gate` auto-detects week from anchor 2026-03-30 and skips wrong slot.

- Morning shift (5AM-3PM): fires at 15:05 Bogota = 20:05 UTC
- Noon shift (10AM-7PM): fires at 19:05 Bogota = 00:05 UTC next day
- Python path: `/Library/Frameworks/Python.framework/Versions/3.14/bin/python3`

## Output — ClickUp Chat (switched from Slack 2026-04-08)

- Channel: `8chy2nm-1651891` (EOD report channel)
- Workspace: `9011399348`
- Token: `CLICKUP_TOKEN` from `.env`
- Format: markdown (matches channel convention: `**Date**`, `* bullets`, `[link](url)`)
- API: `POST /api/v3/workspaces/{workspace_id}/chat/channels/{channel_id}/messages`

## Verify Safety Net (added 2026-04-08)

10 min after each EOD slot, `eod_verify.py` runs and:
1. Checks `/tmp/eod_receipt_YYYY-MM-DD.json` exists (written by report on success)
2. GETs last 25 messages from ClickUp channel, confirms message ID is present
3. If anything is wrong → Slack DMs JD (`U06J10MNAVB`) with specific failure reason

Three caught failure modes: no receipt (script crashed), receipt with no ID (silent post failure), message not in channel (deleted or API error).

## Data Sources

### Google Calendar (meetings)
- OAuth token: `~/.config/eod_report/google_token.json` (pickle format)
- Scopes: `calendar.readonly` + `gmail.readonly`
- Token auto-refreshes — no manual renewal needed
- Deduplication: identical event titles collapsed to one

### Linear (tickets created today by JD)
- Queries ALL teams (not just T2) — filter client-side for `## by JD` in description
- All T2 tickets created by service account `support@searchatlas.com`, NOT JD's user ID
- Auth: `LINEAR_API_KEY` — NO Bearer prefix
- If ticket doesn't appear: make sure you wrote `by JD` in the description

### ClickUp tasks
- Fetched but rarely adds anything (JD doesn't maintain ClickUp tasks actively)

## Fixed Tasks (hardcoded, always in every report)
1. Slack support requests
2. Tier 2 escalations
3. Followed up on escalations
4. Checked, created, and updated tracker tickets
5. Circle MMA community support
6. AMM progress review and standardization

## ClickUp Token Rotation (2026-04-10)
Old token `pk_81342217_TVCOIXT20OD1PR5ZUJ64S3XWDXABIMPI` expired (401). New token set as `CLICKUP_TOKEN` in `.env`. If auth fails again, regenerate at ClickUp → Settings → Apps and update `.env` (hook blocks Claude from writing `.env` directly — user must run a Python one-liner or sed).

## BASE_TASKS Updated (2026-04-10)
After Matt announced JD going full-time on Mastermind (April 9), BASE_TASKS updated to:
- Circle MMA community support and Q&A
- AMM member 1:1 coaching sessions
- AMM onboarding, setup support, and member follow-up
- AMM session prep, member intelligence, and platform gap documentation

## Root Bug Fixed (2026-04-08)
`ROOT = Path(__file__).resolve().parent.parent.parent` resolved to `Work stuff/` (3 parents), not `Agentic/` (4 parents). `load_dotenv` silently did nothing on missing file → `SLACK_TOKEN` / `CLICKUP_TOKEN` KeyError.
**Fix:** `parent.parent.parent.parent` — now loads `Agentic/.env` correctly.

## Remote Trigger (DISABLED — do not re-enable)
- Disabled 2026-03-31 — caused double-posts, Claude attribution text
- Local LaunchAgent is the authoritative runner

## Key Gotchas — macOS FDA
- **Do NOT use cron** — FDA blocks Desktop paths
- **Do NOT set LaunchAgent log to Desktop** — use `~/Library/Logs/`
- **Do NOT call a .sh script from LaunchAgent** — call Python directly with `--shift-gate`
- `Work stuff/clientops-backend/` is its own separate git repo — commit from inside that directory

## Key Gotchas
- Python 3.14 path mandatory — system Python lacks required packages
- Linear API key: NO Bearer prefix
- Google Calendar token is pickle format (binary, `.json` extension) — do not parse as JSON
- Receipt file lives in `/tmp/` — cleared on reboot, that's fine (verify only checks today)

**How to apply:** If EOD breaks, check in order: (1) `~/Library/Logs/eod_report.log` for specific error, (2) `.env` path resolves to `Agentic/.env` (4 parents up from script), (3) `CLICKUP_TOKEN` in env, (4) Linear tickets missing → check `by JD` in description.

---
*See also:* [[eod-report-linear-fix]] · [[morning-brief-setup]]
