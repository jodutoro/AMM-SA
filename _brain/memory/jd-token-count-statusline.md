---
name: JD token count statusline
description: REMOVED — jd-5h-usage.js deleted 2026-04-08; statusline is now gsd-statusline.js only
type: project
---

# Token Count Statusline

## What was built
- `/Users/eillacs/.claude/hooks/jd-5h-usage.js` — outputs `▓▓▓▓░░░░░░ 98k/168k ↺3h22m` bar + count + countdown
- Uses `▓` (not `█`) to be visually distinct from GSD's context bar
- Colors: green < 50%, yellow < 75%, red ≥ 75%
- Limit: `~/.claude/jd-session-config.json` → `{"limit_tokens": 168000}` (calibrated: 155k = 92% → 168k)

## Chain command (must be in BOTH settings files)
```
tmp=$(mktemp); cat > "$tmp"; node "/Users/eillacs/.claude/hooks/gsd-statusline.js" < "$tmp" | tr -d '\n'; node "/Users/eillacs/.claude/hooks/jd-5h-usage.js" "$tmp"; rm -f "$tmp"
```

### Files that need this command
1. `~/.claude/settings.json` — user-level
2. `~/Desktop/Agentic/.claude/settings.json` — project-level (was overriding user-level, now fixed)

Note: `.claude/` is gitignored in the Agentic repo — hook changes are filesystem-only.

## 5-hour rolling window tracker (jd-5h-usage.js)
- **Rolling window** — scans current session's JSONL but only counts messages within the last 5h
  - This matches Claude's actual rate-limit behavior (rolling, not session-anchored)
  - Period start = earliest message within the last 5h window
  - Reset countdown = period_start + 5h - now
- **Session-scoped file** — reads ONLY the current session's JSONL (keyed to session_id from stdin)
  - New session (after `/logout` or restart) = new session_id = cache miss = starts fresh automatically
- **Post-compact safe** — JSONL files span old + new context after `/compact`; rolling window ignores old entries
- Cache: `/tmp/jd-5h-usage-cache.json` — refreshes every 60s, keyed to session_id
- **Statusline chain**: `jd-5h-usage.js "$tmp"` — tmp file passes session_id; update BOTH settings files if chain changes

## Key bugs fixed
1. **Timer 40 min off (2026-04-08)**: script used first timestamp in ENTIRE JSONL as period_start, but JSONL spans multiple days (old session + post-compact continuation). Fix: rolling window — only consider messages within last 5h.
2. **Limit miscalibration**: previous 135k was from different account. Recalibrated to 168k (155k = 92% on this account).

## MCP changes (token optimization)
- `railway` — removed entirely (not in use)
- `searchatlas` — moved from user-level to `Agentic/.mcp.json` (SEO work only)
- `clickup` — moved from user-level to `Work stuff/intercom-t2-triage/.mcp.json` (T2 triage only)
- `gsd-context-monitor.js` — removed from PostToolUse (replaced by autoCompactWindow)
- `autoCompactWindow: 60000` — set in `~/.claude/settings.json`

## Rules
- **Never modify `gsd-statusline.js`** for token count — the token count lives in `jd-5h-usage.js` only
- If token bar disappears, check BOTH settings.json files — project-level overrides user-level
- If limit drifts: check Claude app for X%, measure current output tokens, compute `tokens/pct` → update `jd-session-config.json`

**Why:** Jonathan wanted a visual token bar (used/total) distinct from GSD's context bar, matching Claude's actual rolling 5h window.
**How to apply:** If token count disappears, check both settings files have the chain command. If timer is off, verify rolling window logic and limit calibration.
