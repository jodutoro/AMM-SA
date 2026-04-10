---
name: clientops-backend roadmap
description: 22-item repo audit across 3 waves (Reliability→Automation→Velocity) with status, dependencies, and open blockers
type: project
---

# ClientOps Backend Roadmap — 22-Item Repo Audit

**Status as of 2026-03-29 design:** All items designed, not all built.
**3 waves:** Reliability → Automation → Velocity (must follow this order)

---

## Wave 1 — Reliability (10 items)

| ID | Component | Fix | Status |
|----|-----------|-----|--------|
| R1 | ClientOps Redis | pickle → JSON serialization with fallback | Designed |
| R2 | ClientOps WebSocket | `connected_clients` list mutation race condition | Designed |
| R3 | ClientOps scan guard | Collapsed into A2 — handle during auto-scan loop build | See A2 |
| R4 | ClientOps startup | DevBot skip warning missing | Designed |
| R5 | ClientOps config | `FRONTEND_URL` hardcoded → env var | Designed |
| R6 | T2 Triage batch | Unhandled JSONDecodeError crashes entire batch | Designed |
| R7 | T2 Triage cooldown | `_auto_reply_cooldown` lost on restart → Redis persist with TTL | Designed |
| R8 | T2 Triage state | Local JSON only → Redis backup | Designed |
| R9 | T2 Triage deps | Move `deepeval` to dev-only; document Langfuse env vars | Designed |
| R10 | T2 Triage audit | CSV accumulation → move to `data/audit_logs/` | Designed |
| R14 | EOD Report | Remove unused `langfuse` import | Designed |

---

## Wave 2 — Automation (7 items)

| ID | Gap | Status | Blockers |
|----|-----|--------|---------|
| A1 | DevBot auth wired (Bearer token from SA infra) | **NOT BUILT** | Need token from SearchAtlas infra team |
| A2 | Auto-scan loop + `is_running` guard hardening | **NOT BUILT** | R3 must be resolved here |
| A4 | Replace ClickUp subprocess with MCP tool | **NOT BUILT** | Must verify tool name via `claude mcp list` first |
| A5 | Parallel agent dispatch (remove sequential constraint) | **NOT BUILT** | **Depends on A6** |
| A6 | Deduplication check before dispatch | **NOT BUILT** | Must be built before A5 |
| A9 | Shift-aware EOD cron via wrapper script | **NOT BUILT** | — |
| A10 | T2 Triage daily summary endpoint `/api/summary/today` | **BUILT** ✅ | — |

### Cross-Wave Dependencies
- **A2 must absorb R3** — scan guard hardening happens during auto-scan loop build
- **A6 must precede A5** — dedup prevents double-triage at scale during parallel dispatch
- **A4 note:** Expected MCP tool name: `mcp__clickup__clickup_send_chat_message` — verify with `claude mcp list`

---

## Wave 3 — Velocity (7 items)

| ID | Item | Status | Blockers |
|----|------|--------|---------|
| V1 | Feedback accuracy endpoint + dashboard panel | **NOT BUILT** | `feedback.jsonl` data exists (CSM labels) |
| V2 | Copy-to-clipboard button for T1 draft replies | **NOT BUILT** | — |
| V3 | Weekly digest aggregation (Mon–Fri) for EOD report | **NOT BUILT** | — |
| V4 | Audit + unify T2 visualization UIs | **NOT BUILT** | — |
| V5 | Auto-run triage batch via Claude Code cron | **NOT BUILT** | — |
| V6 | Post-run summary table (--summary flag) | **NOT BUILT** | — |
| V7 | EOD report includes T2 triage counts | **NOT BUILT** | **Depends on A10** ✅ (A10 is built) |

### Note on V1
`feedback.jsonl` already exists in production with CSM accuracy labels. This data can power classifier weight tuning. V1 surfaces it in the dashboard.

### Note on V7
Since A10 is built (`/api/summary/today`), V7 can be built independently now.

---

## Morning Brief — Status

**Script:** `clientops-backend/scripts/morning_brief.py` — **BUILT AND RUNNING** ✅

Morning brief is NOT part of the 22-item audit above. It is a separate fully-built script with its own launchd setup. See `[[morning-brief-setup]]` for details.

---

## Open Blockers (Priority)

1. **DevBot Bearer token (A1)** — HIGHEST PRIORITY. Needed from SearchAtlas infra team. Blocks full P0 verification pipeline. Without it, all DevBot verifications return `inconclusive`.
2. **R1 (pickle → JSON)** — Blocks safe horizontal scaling. Pickle breaks if schema changes between deploys.
3. **V7 is unblocked** — A10 exists; EOD report can now include T2 counts.

**Why:** Repo audit was planned to harden the system before adding more automation. Wave 1 items prevent silent failures; Wave 2 closes Phase 3 automation gaps.
**How to apply:** When picking up roadmap work, start from Wave 1. Never implement Wave 2 items before the relevant Wave 1 reliability fixes. A6→A5 is a hard dependency (parallelizing without dedup causes double-tickets).
