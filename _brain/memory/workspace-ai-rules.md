---
name: workspace AI rules
description: Master rules from docs/AI_rules.md — .env path, DevBot constraint, Python async standards, HTML standards, log inspection rule, Railway deploy
type: reference
---

# Workspace AI Rules (docs/AI_rules.md)

## Master .env
**Single `.env` for all projects:** `/Users/eillacs/Desktop/Agentic/.env`
Load in subdirectory projects with:
```python
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), "../..", ".env"))
```
Never put credentials in subdirectory `.env` files. Never commit `.env`, `__pycache__`, `.DS_Store`, `feedback.jsonl`.

## DevBot — CRITICAL CONSTRAINT
**DevBot MCP cannot be called by the backend directly.** It uses SSO-only auth through Claude Code MCP. Backend code must never import or call DevBot tools. Only Claude Code (the CLI) can invoke DevBot via MCP.

MCP setup when Bearer token arrives from SearchAtlas infra:
```bash
claude mcp add --transport http --scope user \
  --header "Authorization: Bearer TOKEN" \
  devbot https://api.devbot.infra.searchatlas.com/mcp/
```

## Log Inspection Rule
**Never `cat` full logs.** Always:
```bash
tail -n 100 logs/eod_report.log
grep -C 20 "ERROR" logs/morning_brief.log
```
Reading full logs causes context bloat.

## Extended Thinking
Use `/effort max` for architectural decisions and complex debugging. `ultrathink` is deprecated — do not use it.

## Python/FastAPI Standards
- **Async-first:** All Slack SDK calls via `asyncio.to_thread()` (it's a sync library)
- **Claude API:** Use `AsyncAnthropic` inside async FastAPI only. Use sync `Anthropic()` only in non-async scripts
- **Prompt caching:** `cache_control: {"type": "ephemeral"}` on stable system prompts — ~90% cost reduction on cache hits
- **Retry:** Wrap Claude calls with `tenacity` (4× retries, 2s→30s backoff on 429/500/503/529)
- **Models:** Pydantic v2 in `core/models.py`
- **Logic:** Split into `core/` modules — never monolithic `main.py`
- **State:** In-memory with Redis fallback (pickle for now, migrate to JSON — see roadmap R1)
- **Auth:** `X-API-Key` header on all `/api/*` routes (value = `API_SECRET` env var)
- **Real-time:** WebSocket for dashboard push

## HTML/JS Standards
- Single-file, self-contained (no build step, no npm)
- Internal dashboards: dark theme `#0f1117` background, `#6366f1` accent
- Vanilla JS — **no React, no Vue**
- CSS animations for interactivity
- Desktop-first, mobile-friendly

## Python Path (always use full path in cron/launchd)
`/Library/Frameworks/Python.framework/Versions/3.14/bin/python3`
System Python lacks all required packages.

## Railway Deployment
- Auto-deploy on `git push` to `main`
- Config: `railway.toml` in each deployable project
- clientops production: `https://clientops-backend-production.up.railway.app`
- Dashboard: `https://client-issue-tracker.preview.builder.searchatlas.com`

## Working Style Rules
- **Move fast:** No permission needed on obvious next steps. Confirm only before destructive/irreversible actions.
- **Visual first:** HTML dashboards preferred over markdown. Jonathan responds better to interactive outputs.
- **Minimum working solution:** Single-file HTML is fine. In-memory state is fine.
- **Executive-ready by default:** Explain *why* before *how*. Everything must be shareable to non-technical stakeholders.
- **Never rewrite existing files** without reading first — use Edit for targeted changes. Commit before touching `main.py`, `core/*.py`, dashboards.

## MCP Tool Stack
| Tool | Auth | Note |
|------|------|------|
| DevBot | SSO via Claude Code only | NEVER call from backend |
| SearchAtlas | `X-API-KEY` header | `https://mcp.searchatlas.com/api/v1/mcp` |
| Linear | `lin_api_...` — NO Bearer prefix | Direct in Authorization header |
| ClickUp | `pk_...` Bearer | Numeric workspace ID `9011399348` |
| Slack | `xoxp-...` Bearer | Rate limit shared across MCP instances |

**Why:** Consistency across projects reduces debugging time. The DevBot constraint cost multiple sessions of confusion before the SSO-only nature was understood.
**How to apply:** Before building any new automation touching DevBot, confirm the execution path goes through Claude Code MCP (not backend HTTP). Before writing any cron/launchd entry, use the full Python 3.14 path.
