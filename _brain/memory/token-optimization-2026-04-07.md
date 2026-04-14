---
name: Token optimization — 2026-04-07 session
description: All changes made to reduce per-request token overhead; MCP scoping, plugin dedup, hook trim, compact window
type: feedback
---

Applied 2026-04-07. These changes are already in effect — do not re-apply.

## What was done

**MCP changes:**
- `mcp-api` removed (was failing duplicate of devbot, stored in local `.claude.json`)
- `magic` (21st.dev) moved user-scope → project-scope via `Agentic/.mcp.json`
- `playwright` moved user-scope → project-scope via `Agentic/.mcp.json`
- `slack` (npx) intentionally kept — has `add_reaction`, `get_users`, `list_channels`, `reply_to_thread` not in `claude.ai Slack`

**Plugin dedup:**
- `Work stuff/clientops-backend/.claude/settings.json` `enabledPlugins` cleared — all 4 plugins (frontend-design, superpowers, feature-dev, code-review) were double-loading because they're already enabled at user-scope

**Settings:**
- `autoCompactWindow` lowered from 120000 → 80000 in `~/.claude/settings.json`
- SessionStart hook `else` branch trimmed: now only loads MEMORY.md by default (was also loading intercom-t2-triage-pipeline.md + agentic-mastermind-map.md)
- PostCompact hook same trim applied

**AI rules added to `docs/AI_rules.md` Critical Rules:**
- Log Management: use `tail -n 100` / `grep -C 20 "ERROR"`, never `cat` full logs
- UI Debugging: inspect DOM/HTML/CSS first; screenshots only for strictly aesthetic issues
- Brain file loading: never read `_brain/` files at session start unless CWD matches that project

## Why
Session start was burning ~6% of a 5-hour token window. Root causes:
- 150+ MCP tool schemas (~15k tokens/request)
- SessionStart hook injecting 15.8KB of brain files unconditionally
- Plugin double-injection in clientops-backend sessions
- autoCompactWindow too high caused conversations to bloat before compacting

**Why:** Token budget conservation on 5-hour usage windows.
**How to apply:** If token burn feels high again, check MCP server count first (each server = ~60-150 tool schema tokens per request), then check for hook bloat.

---
*See also:* [[token-optimization-setup]]
