---
name: Intercom T2 Triage Pipeline
description: Live T2 triage pipeline — architecture, run instructions, API gotchas (Intercom, ClickUp, Linear), control panel
type: project
---

# Intercom T2 Triage Pipeline

**App location:** `Work stuff/intercom-t2-triage/`
**Server port:** `:8002` (FastAPI, `main.py`)
**Control panel:** `Work stuff/control-panel.html` (open directly in browser, requires launcher.py on :9000)
**Launcher:** `Work stuff/launcher.py` — run with `python3 "Work stuff/launcher.py"` from Agentic root or from within Work stuff/

## Architecture (post-consolidation, 2026-04-06)

Single SDK engine — all triage (webhook + manual batch) runs through `main.py`:

1. **Webhook path:** Intercom fires `conversation.admin.assigned` → `POST /webhooks/intercom/escalation` → enqueued → `triage_worker` processes via Anthropic SDK
2. **Batch path:** Control panel Run button → `run_triage_tickets_only.py` (thin wrapper) → `POST /api/triage/batch` → fetches Intercom queue → enqueues → same `triage_worker`
3. **Result:** Linear ticket created, Intercom internal note posted, ClickUp QA notification sent directly from `_send_clickup_chat()`

`run_triage_tickets_only.py` is now a ~20-line HTTP wrapper — all logic lives in `main.py`.

## Running Triage via Control Panel

1. Start `launcher.py` (port 9000)
2. Open `control-panel.html` in browser
3. Click **Start** on T2 Triage Server → wait for RUNNING
4. Click **Run** on "Triage — My Conversations" or "Triage — Full T2 Queue"
5. Watch stdout log for `[batch] mode=X queued=N skipped=M` then per-conversation results

## Running Triage Manually (DevBot mode)

When `auto_triage_mode=subprocess` and Redis is down, Claude Code acts as DevBot:
1. `POST /api/triage/batch` with `{"mode": "mine"}` — queues conversations
2. Loop: `GET /api/triage/pending` → classify → `POST /api/triage/result/{id}`
3. Stop when pending returns `{"no_pending": true}` or same conversation repeats

## Triage Decision Rules
- `engineering_ticket` — ALL true: clear product bug, T1 confirmed/replicated, cannot be resolved by T1, **Jam/video evidence present**
- `t2_actions` — ANY true: how-to/config question, billing, feature request, resolved before escalation, T1 didn't confirm bug

## Video Evidence Gate (2026-04-08)
Engineering tickets now **require** a Jam/Loom/screen recording in the conversation.
If missing: posts internal Intercom note to T1 requesting Jam recording → marks `awaiting_evidence` → no Linear ticket created.
T1 must re-assign after adding Jam link.

## Triage Score (1–3 each)
- `impact`: 3=data loss/service down, 2=feature broken, 1=cosmetic
- `reproducibility`: 3=always, 2=sometimes, 1=hard to reproduce
- `user_impact`: 3=enterprise/>$500 MRR, 2=growth/$100-500, 1=starter/<$100

## Priority
P0=service down/data loss, P1=critical multi-user, P2=confirmed reproducible, P3=minor/workaround, P4=cosmetic

## Product Areas
OTTO SEO, Site Metrics, Content Assistant, Brain / Atlas AI, Local SEO, Digital PR, Reporting, Billing, Website Studio, Integrations, API, Onboarding, Account, Site Audit

## Key IDs
- Jonathan Duque Intercom admin ID: `7688400`
- T2 team ID (Intercom): `8418880`
- Linear team (Support Specialists Triage): `091bd12a-9a03-4eb4-abfd-87bd3131ad75`
- ClickUp workspace: `9011399348` (numeric — not slug `8chy2nm`)
- Auto-reply cooldown: 7200s (2 hours)

## ClickUp Channel Routing Map

| Product Area | ClickUp Channel | Channel ID |
|---|---|---|
| OTTO SEO / Site Audit | ps-qa-otto-seo-support | 8chy2nm-1128651 |
| Site Metrics | sa-product-support-alignment | 8chy2nm-1082751 |
| Brain / Atlas AI | ps-qa-llm-visiblity-support | 8chy2nm-1451651 |
| Content Assistant | ps-qa-content-genius-support | 8chy2nm-1150371 |
| Local SEO | ps-qa-gbp-galactic-local-seo-support | 8chy2nm-1084191 |
| Digital PR | ps-qa-authority-building-support | 8chy2nm-1084291 |
| Reporting | ps-qa-report-builder-support | 8chy2nm-1161991 |
| Billing | ps-qa-qp-stripe-support | 8chy2nm-1161971 |
| Website Studio | ps-qa-website-studio-support | 8chy2nm-1375991 |
| Onboarding / Account / API / Integrations | sa-product-support-alignment | 8chy2nm-1082751 |
| Fallback | sa-product-support-alignment | 8chy2nm-1082751 |

## Intercom Agent → ClickUp User ID Map
| Intercom agent | ClickUp ID |
|---|---|
| Firman Halimi | 81552362 |
| Tahmina | 81568686 |
| Sweta Shaw | 81571654 |
| Basit Afraz | 81565783 |
| Matt (Mateo Lopez) | 87309504 |
| Jay (Armen Talicug) | 81552948 |

## Linear Label Map (product_area → Linear label)
| product_area | Linear label |
|---|---|
| OTTO SEO / Site Audit | OTTO & Site Audit |
| Content Assistant / Brain / Atlas AI | Content Genius |
| Digital PR | Authority Building |
| Website Studio / CMS Sync | Website Builder |
| Local SEO | GBP / Local SEO |
| Billing | QP Billing |
| Reporting | Report Builder |
| Integrations / API | Integrations |

## API Gotchas

### Intercom
- API version: `2.11` (header: `Intercom-Version: 2.11`)
- Base: `https://api.intercom.io`
- Search: `POST /conversations/search` with nested `query.operator=AND` + `value` array
- Fetching conversation: `GET /conversations/{id}?display_as=plaintext`
- Contact details need a second call: `GET /contacts/{id}` — initial conversation response only has contact ID
- **Assignee filter field: `admin_assignee_id`** (not `assignee_id` or `assignee.id` — both return 400 invalid_field)
- Team filter field: `team_assignee_id` (int, not string)
- Open filter: `{"field": "open", "operator": "=", "value": True}`
- **Attachment URLs:** `attachment.url` fields in conversation parts are `search-atlas.intercom-attachments-*.com` — these expire. For fresh URLs, use `img src` inside `part.body` HTML: `downloads.intercomcdn.com` URLs with fresh signatures.

### .env Path
- `.env` lives at `/Users/eillacs/Desktop/Agentic/.env` — two levels above project root
- In `main.py`: `load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), "../..", ".env"))`
- One `..` lands in `Work stuff/` which has no `.env` — causes silent 401s on all Intercom/Linear calls

### ClickUp OAuth
- ClickUp workspace ID must be **numeric** (`9011399348`), not the slug (`8chy2nm`)
- ClickUp MCP tool is connected (replaces old `claude -p` subprocess workaround)
- Auto path in `main.py` now calls `_send_clickup_chat()` directly (was silently dropped before)

### Linear ticket linking
- Tracker ticket must be linked to the Intercom conversation via internal note after creation
- All T2 tickets created in team `091bd12a-9a03-4eb4-abfd-87bd3131ad75` (Support Specialists Triage)
- Linear API key: NO Bearer prefix — `lin_api_...` keys pass directly in `Authorization` header
- Priority map: P1→1, P2→2, P3→3 (Linear numeric priority)
- **Image uploads:** Use `fileUpload` GraphQL mutation → PUT to `uploadUrl` with `Content-Type` header → use `assetUrl` in description as `![alt](assetUrl)`. Linear adds short-lived JWT signatures on read but the underlying file is permanent.
- **Footer:** Do NOT include "Auto-triaged by Intercom T2 Triage System" — removed 2026-04-08. Only keep Intercom conversation link.

### Deduplication
- Redis key prefix: `t2_triaged:` + conversation_id, TTL 86400s (24h)
- Fallback: in-memory dict when Redis unavailable
- `is_processed()` + `should_retry()` in `core/state.py`
- **`_in_flight` guard** lives in `_process_triage_result` (not just HTTP endpoint) — prevents triage_worker + HTTP path from both creating tickets simultaneously (2026-04-08 fix)

## Auto-Reply
- Fires when client sends a message to an open T2 conversation
- Cooldown: 2 hours per conversation (persisted to Redis)
- Message: "Hi! Thanks for your message. Just wanted to let you know that our team is still actively working on your request..."
- Jonathan's admin ID (`7688400`) is excluded from triggering auto-replies

## Endpoints
| Method | Path | Purpose |
|--------|------|---------|
| POST | /webhooks/intercom/escalation | Receives Intercom webhook |
| POST | /api/triage/batch | Fetch Intercom queue + enqueue (mine or queue mode) |
| GET | /api/triage/pending | Returns next conversation for Claude Code (DevBot path) |
| POST | /api/triage/result/{id} | Accepts triage result (DevBot path) |
| GET | /api/summary/today | Returns T2 triage counts for today |
| GET | /health | Uptime + queue status |

## Session 2026-04-08 — Tickets Created
- SPE-439: Andrew / Site Metrics no data (Google/Facebook Ads integrations)
- SPE-441: Jessica ($399 MRR) / Report Builder April 1 reports not sent + recipient dropdown broken
- SPE-442: Adam / White label permission denied (PRO admin)
- SPE-444: Micah / Digital PR service interruption + UX signal dropped to 0
- SPE-445: Cohen ($488 MRR) / OTTO quota 5/5 but can't unfreeze 5th project
- SPE-447: Ricardo / Billing sync — paid but plan not activated
- SPE-448 (P1): Sean ($1,077 MRR) / Recurring $1,573 OTTO top-up charge every month for 6 months
- SPE-450: Vickie / Shopify CMS connector 410/401 — blog auto-publish never worked
- T2 actions only: Sheila (GBP-714 priority escalation), Anthony (MCP STARTER tier)

## AI Engine Details

### Auth Auto-Detection
- `ANTHROPIC_API_KEY` in env → SDK path (direct or Helicone proxy)
- No key → `claude -p` subprocess (uses logged-in CLI session)
- No manual config needed locally; key only needed for production/cost tracking

### Retry Logic (Tenacity)
4× retries, exponential backoff 2s → 30s on: `RateLimitError (429)`, `APIStatusError (500/503/529)`, `APIConnectionError`, `ValidationError`

### Output Validation
Claude's JSON response validated via Pydantic v2 `TriageResult` before accepting. Invalid JSON → retry (not silent failure).

### Prompt Caching
System prompt sent with `cache_control: {"type": "ephemeral"}`. ~90% cost reduction on cache hits during batch runs (~5 min cache window).

### Observability
- **Langfuse:** `@observe` decorator on `run_triage()` — logs conversation_id, email, plan, MRR as input; decision/priority/product as output. Silently disabled if Langfuse not installed.
- **Helicone:** Set `HELICONE_API_KEY` for cost dashboards + semantic caching.

### Ticket Description Format (2026-04-08)
Order: `by JD` → customer block (name/email/plan/MRR/QP link) → **Component** → Problem → Error (fenced code block, omitted if "none visible to user") → Steps to Reproduce → Expected → Actual → Troubleshooting Done → Debug Clues → Intercom link.
- `triage_score` is **internal only** — present in Claude's JSON output and backend state, never written to the Linear ticket description.
- `confidence_score` is **internal only** — same.
- `affected_component` and `error_message` are required ticket fields, always included as structured sections.

### DevBot Enrichment + Visual Evidence (2026-04-08)
`core/devbot.py` runs on every `engineering_ticket`. `_inject_devbot_debug_clues()` in `main.py` prepends DevBot findings to `debug_clues` before `create_t2_ticket` is called.

`_process_triage_result_inner` builds the evidence block first (before DevBot prepends):
- Jam/Loom URL extracted from transcript via regex (`jam\.dev/c/` or `loom\.com/share/`)
- Screenshots rehosted from expiring Intercom signed URLs to permanent Linear-hosted URLs
- No AI notes — Claude always outputs `debug_clues: ""` and it's intentionally ignored

Final `## Debug Clues` structure in Linear ticket:
```
[DevBot] Sentry/logs [P2]: ErrorTitle × N
[DevBot] Existing ticket: none found

**Recording:** https://jam.dev/c/...

**Screenshots:**
![Screenshot 1](permanent-url)
![Screenshot 2](permanent-url)
```
If DevBot not configured: evidence block only. If no recording: omitted. If no screenshots: omitted.

### Linear Label Gotcha
Product area labels have **team-scoped copies** with different IDs. Query team labels first; if product label causes cross-team conflict → retry with base labels only (User + Bug). `lin_api_...` keys: NO Bearer prefix.

### state.py Retry Behavior
`data/processed.json` tracks per-conversation status. `status=failed` → up to 3 retry attempts → permanently skipped after 3rd failure. `status=done` → always skipped (deduplication).

**Why:** Automates T2 escalation triage — SDK engine classifies, scores, and routes each conversation with prompt caching + tenacity retries.

**How to apply:** Use control panel to start server and trigger batches. If Intercom returns 401, check .env path (two levels up). If `mine` mode returns 0, verify `admin_assignee_id` filter field (not `assignee_id`). If ClickUp fails, check token in .env. Orphaned server processes visible in Process Monitor — kill from panel.

---
*See also:* [[intercom-classification-audit]]
