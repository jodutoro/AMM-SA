---
name: EOD report — never use Slack MCP to post
description: EOD report must be sent via eod_report.py script, not Slack MCP — MCP adds a "via Claude" attribution footer that JD does not want
type: feedback
---

Never use `mcp__claude_ai_Slack__slack_send_message` to post the EOD report. Always run `eod_report.py` directly, which uses the workspace SLACK_TOKEN and posts without any Claude attribution.

**Why:** The Slack MCP tool (Claude AI integration) adds a "via Claude" or "Sent with Claude" footer that JD explicitly does not want on EOD reports.

**How to apply:** For EOD report → always use:
```bash
/Library/Frameworks/Python.framework/Versions/3.14/bin/python3 "Work stuff/clientops-backend/scripts/eod_report.py"
# Or with date override:
... eod_report.py --date 2026-04-07
```
Never post via Slack MCP, even if the script fails — fix the script instead.
