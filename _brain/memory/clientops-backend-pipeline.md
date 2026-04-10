---
name: clientops-backend pipeline
description: Architecture, API gotchas, file paths, and hard-won rules for the clientops-backend Python service
type: project
---

# clientops-backend — Pipeline Memory

**Location:** `Work stuff/clientops-backend/`
**Stack:** Python 3.14+, FastAPI, port 8001
**Purpose:** Multi-platform aggregation dashboard — pulls from Intercom, ClickUp, Linear, Slack, Userpilot, DevBot, Google Calendar.

---

## File Structure

```
clientops-backend/
├── core/
│   ├── intercom.py          ← TRACKER BUG was here (add_tracker_ticket)
│   ├── clickup.py
│   ├── linear.py
│   ├── slack_helpers.py
│   ├── devbot.py
│   ├── userpilot.py
│   ├── accounts.py
│   ├── clients.py
│   ├── detection.py
│   └── models.py
├── scripts/
│   ├── eod_report.py        ← EOD auto-poster (Slack channel C08PNQ4TR2P)
│   ├── eod_cron.sh          ← logs to logs/eod_report.log
│   ├── fetch_impact_data.py
│   └── resolve_gold_tier_ids.py
├── tier2-triage-extension/  ← Chrome extension for T2 triage
├── partner-inbox.html       ← Primary support dashboard
└── clientops-viz*.html      ← Various visualizations
```

---

## Triage API Endpoints (localhost:8001)

| Method | Path | Purpose |
|--------|------|---------|
| POST | `/api/triage/inject` | Load conversation into queue |
| GET | `/api/triage/pending` | Fetch pending for analysis |
| POST | `/api/triage/result/{conversation_id}` | Post result (auto-fetches conversation) |
| POST | `/api/reset` | Clear queue |

---

## EOD Report

- **Schedule:** Cron at 23:00 UTC (6 PM Bogota), weekdays only
- **Slack Channel:** `C08PNQ4TR2P`
- **Preview:** `python3 eod_report.py --test`
- **Override date:** `python3 eod_report.py --date YYYY-MM-DD`
- **Fixed tasks always reported:** Slack support requests, T2 escalations, follow-ups, tracker ticket checks/creation/updates, Circle MMA community support, HL tools sales confirmation

---

## API Integrations & Gotchas

### Intercom — CRITICAL BUG (fixed)
- `conversation_to_link_id` **does not exist** in Intercom OpenAPI spec v2.11–2.15
- API silently accepted + ignored it — tickets created but never linked to conversations
- **Hard limitation:** No REST endpoint for linking tracker tickets to conversations; `linked_objects` is read-only via API
- **Fix:** Removed dead field from `core/intercom.py:add_tracker_ticket()`; manual linking required via Intercom UI sidebar
- `INTERCOM_TRACKER_TICKET_TYPE_ID` env var = `'3'` in working config

### ClickUp
- Workspace ID: `9011399348`, User ID: `81342217`
- Open/in-progress tasks assigned to JD; no due date = recurring; overdue/due today = active

### Linear
- SPE Team ID: `091bd12a-9a03-4eb4-abfd-87bd3131ad75`

### Google Calendar
- OAuth token: `~/.config/eod_report/google_token.json`
- GCP Project: `536741099866` (Calendar API must be enabled)

### DevBot
- Checks Sentry/Loki signal presence to distinguish operational issues from regressions

---

## Hard Rules (Don't Do)

1. **Never assume API fields exist** — Cross-reference against official OpenAPI spec, not docs
2. **Never trust silent 200** — Verify fields actually appear in responses
3. **Never link triage resets with injection** — Clear state and re-inject atomically, or accept skips
4. **Redirect server output from day one:** `python3 main.py >> server.log 2>&1`
5. **No conversation linking via REST API** — Use Intercom UI sidebar or in-platform Workflows
6. **Track conversation state explicitly** — Avoid ambiguous "processed but not really" states

---

## Classification System (Signal-Based, Not ML)

**Issue signals** (any match → classified as issue):
`not working, broken, error, issue, bug, problem, fail, crash, wrong, missing, can't, cannot, doesn't, won't, stuck, urgent, asap, weird, unexpected, loading, slow, down, unable, blank, empty, disappeared, not showing, not loading, not updating, fix, trouble, confused, question, why is, still, again, regression, critical, blocker`

**Noise signals** (any match → filtered out):
`please note, reminder, announcement, fyi, heads up, just wanted to, letting you know, happy to, excited to, we're live, launching, new feature, update:, scheduled maintenance, webinar, event, join us`

**Auto-resolution keywords** (marks issue resolved when found in thread):
`resolved, fixed, closed, done, completed, deployed, pushed, released, merged, patched, shipped, live, all good`

**`process_thread()` is canonical** — ALL classification logic goes through it. Never add classification anywhere else.
**Channel lookup: `channel_id` first** via O(1) `_CLIENT_BY_CHANNEL_ID` dict; only fall back to name matching if returns None.
**Redis writes: fire-and-forget** — never `await` Redis writes in the hot path.

---

## MRR Tiers & SLA

| Tier | MRR | SLA |
|------|-----|-----|
| VIP | ≥ $5,000 | 10-min response window |
| Gold | $1,000–$4,999 | 10-min response window |
| Standard | $300–$999 | 10-min response window |
| Base | < $300 | 10-min response window |

**91 Gold Tier channels** monitored (15s polling cycle).
**Full scan:** 18–25s | **Incremental scan:** 5–15s | **`process_thread()`:** < 5ms

---

## DevBot Auto-Action Thresholds

| Sentry Count | Priority | Action |
|-------------|---------|--------|
| ≥ 50 events | P0 | Auto-create Linear ticket |
| ≥ 10 events | P1 | Auto-create Linear ticket |
| ≥ 1 event | P2 | Auto-create Linear ticket |
| 0 + Loki hits | P2 | Auto-create Linear ticket |
| 0 + no Loki | inconclusive | Manual review |
| Confirmed false | — | Auto-dismiss |

**Blocker:** DevBot Bearer token not yet obtained from SearchAtlas infra team. All verifications currently return `inconclusive`.

---

## Deployed URLs
- **API:** `https://clientops-backend-production.up.railway.app`
- **Dashboard:** `https://client-issue-tracker.preview.builder.searchatlas.com`
- **Deploy:** `git push main` → Railway auto-deploy via `railway.toml`

---

## Known Missing Channel
`partners-maxmobilesolutions-searchatlas` — not yet in `GOLD_TIER_CHANNELS`. Run `python3 scripts/resolve_gold_tier_ids.py` after rate limit clears.

## feedback.jsonl
Lives in project root — CSM accuracy labels (append-only). Not yet used for classifier tuning but data exists for V1 roadmap item.

**Why:** Intercom API silently discards unknown fields; months of tracker tickets were created but never linked before this was caught.
**How to apply:** Before sending any Intercom API payload, verify every field name against https://github.com/intercom/Intercom-OpenAPI
