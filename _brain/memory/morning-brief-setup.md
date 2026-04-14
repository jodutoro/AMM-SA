---
name: Morning Brief Setup
description: Morning brief DM script — cron setup, sources, JD Slack user ID, week parity logic
type: project
---

# Morning Brief

**Script:** `clientops-backend/scripts/morning_brief.py`
**Logs:** `logs/morning_brief.log`

## Run Commands
```bash
python3 clientops-backend/scripts/morning_brief.py           # normal run
python3 clientops-backend/scripts/morning_brief.py --test    # preview, no Slack post
python3 clientops-backend/scripts/morning_brief.py --now     # run immediately (bypasses nothing, schedule logic removed)
```

## Delivery
- DMs **Jonathan Duque** directly on Slack
- JD Slack user ID: **U06J10MNAVB** (set via `JD_SLACK_USER_ID` in `.env`)

## Data Sources
| Source | What it pulls |
|--------|--------------|
| Slack | Overnight messages from partner channels + internal channels |
| Linear | New tickets and status changes in the SPE team |
| Gmail | Overnight emails (read-only via Calendar+Gmail OAuth) |
| ClickUp | JD's assigned tasks (user ID `81342217`, workspace `9011399348`) |

## Auth
- **Google OAuth token:** `~/.config/eod_report/google_token.json` (pickle format, shared with EOD report)
- **Google OAuth client:** `~/.config/eod_report/google_oauth_client.json`
- Scopes: `calendar.readonly` + `gmail.readonly`
- Token auto-refreshes — run `setup_google_auth.py` once if token is missing
- **Slack token:** `SLACK_TOKEN` from `.env`
- **Linear API key:** `LINEAR_API_KEY` from `.env` — NO Bearer prefix
- **ClickUp token:** `CLICKUP_TOKEN` from `.env`

## Channel cache
- Slack channel list cached at `/tmp/morning_brief_channels.json` (TTL 12 hours)
- Avoids Tier-2 rate limit on `conversations.list`

## Scheduler — launchd (NOT cron)

**Plist:** `~/Library/LaunchAgents/com.jduque.morning-brief.plist`
**Label:** `com.jduque.morning-brief`
**Time:** 8:00 AM Bogota every weekday (UTC 13:00) — no week rotation, fires every day

Manage with:
```bash
launchctl list | grep morning-brief          # verify loaded
launchctl kickstart -p gui/$(id -u)/com.jduque.morning-brief   # force run now
launchctl bootout gui/$(id -u)/com.jduque.morning-brief        # unload
launchctl bootstrap gui/$(id -u) ~/Library/LaunchAgents/com.jduque.morning-brief.plist  # reload
```

## Channel Cache

Cache moved from `/tmp` (wiped on reboot) to `~/.cache/morning_brief_channels.json`.
Script also has Retry-After-aware backoff if `conversations.list` is rate-limited on cold start.

## Off-Hours Window
Fixed: previous weekday 8PM → now. No shift-based logic.

## Links in the Brief
- **Slack items**: `chat.getPermalink` called per message → direct thread link in `url` field
- **ClickUp items**: `url` field = `https://app.clickup.com/t/{task_id}` (renamed from `task_url`)
- **Linear items**: URL from API response, passed directly

## Key Gotchas
- Python 3.14 path mandatory — system Python lacks required packages
- Slack user ID for DM delivery must be set in `.env` as `JD_SLACK_USER_ID`
- Google token is pickle format despite `.json` extension — do not parse as JSON
- Linear API key: NO Bearer prefix — `lin_api_...` keys pass directly in Authorization header
- `clientops-backend/` is its own separate git repo — commit from inside that directory
- 3 `mcp-server-slack` MCP instances share the same token rate limit; channel fetch may be slow on first cold start while Claude is active

**Why:** Automates daily catch-up so JD starts each shift already aware of overnight activity across Slack, Linear, Gmail, and ClickUp.

**How to apply:** If brief isn't arriving, check: (1) launchd loaded (`launchctl list | grep morning-brief`), (2) Python path in plist, (3) `JD_SLACK_USER_ID` in .env, (4) Google token at `~/.config/eod_report/google_token.json`.
