---
name: LaunchAgent plist — script paths must include "Work stuff/"
description: Both EOD and morning brief plists had wrong paths (missing "Work stuff/"); fixed 2026-04-08
type: feedback
---

Both LaunchAgent plists had scripts pointing to `/Users/eillacs/Desktop/Agentic/clientops-backend/scripts/` — missing `Work stuff/` — causing silent failures on every scheduled run since the workspace reorganization.

**Correct paths:**
- EOD: `/Users/eillacs/Desktop/Agentic/Work stuff/clientops-backend/scripts/eod_report.py`
- Morning brief: `/Users/eillacs/Desktop/Agentic/Work stuff/clientops-backend/scripts/morning_brief.py`

**Why:** The workspace was reorganized (commit `5146023`) and scripts moved under `Work stuff/`, but the plists were never updated.

**How to apply:** Any time a LaunchAgent breaks after a workspace reorganization, first check the script path in the plist. Also ensure `PATH` includes `/Users/eillacs/.local/bin` (for `claude` CLI) and log paths go to `~/Library/Logs/` not Desktop (FDA-blocked for launchd).
