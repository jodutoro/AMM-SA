---
name: Token Optimization Setup
description: Subscription token optimization stack — model routing, autocompact, PreCompact hook, statusline compact flag
type: project
---

# Token & Subscription Optimization Stack

## What's in place (as of 2026-04-01)

### Claude Code session layer
- `autoCompactWindow: 120000` in `~/.claude/settings.json` — auto-compacts at ~60% context (~120k tokens)
- `PreCompact` hook in `~/.claude/settings.json` — injects preservation instructions before each compact: keep task/files/decisions/blockers, discard verbose tool output. Target: 300-500 token compact summary.
- `PostCompact` hook — reloads brain files after every compact
- Status bar turns orange + shows `⚡compact` at 60% in `~/.claude/hooks/gsd-statusline.js`

### Status bar color thresholds (gsd-statusline.js)
- Green < 50%
- Yellow 50-60%
- Orange + ⚡compact: 60-80% (auto-compact territory)
- Red blink 💀: > 80%

### Backend API layer (clientops-backend)
- `core/model_router.py` — `pick_model(task_type)` routes: classification/extraction → Haiku, summarization/coding/analysis → Sonnet, architecture → Opus
- `core/usage_tracker.py` — logs all API calls to `logs/api_usage.jsonl` with cache metrics
- `core/batch_helpers.py` — Batch API wrapper (50% discount for cron jobs)
- `morning_brief.py` updated to use Sonnet + `build_cached_system()` prompt caching
- `scripts/analyze_usage.py` — CLI report: spend by model, savings vs Opus, caching opportunity
- `account-usage-dashboard.html` — drag-drop dashboard for JSONL/CSV usage visualization
- Daily cron: `0 9 * * *` runs analyze_usage.py → `logs/daily_usage_report.log`

**Why:** Jonathan was hitting subscription rate limits every window (not just API billing). Both layers address different cost centers.

**How to apply:** When subscription tokens are tight → remind about /compact early (60%), check statusline. For new backend AI calls → always use pick_model(), never hardcode claude-opus-4-6.

---
*See also:* [[token-optimization-2026-04-07]] · [[context-compression-rules]]
