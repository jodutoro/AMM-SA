---
name: EOD report manual send — use --date for previous day
description: When sending EOD manually for a past date, pass --date YYYY-MM-DD to the script
type: feedback
---

When JD asks to send the EOD report manually (e.g. forgot yesterday's), use:

```bash
/Library/Frameworks/Python.framework/Versions/3.14/bin/python3 "Work stuff/clientops-backend/scripts/eod_report.py" --date 2026-04-07
```

**Why:** The script defaults to today in Bogota timezone. Triage tickets created late afternoon (17:xx–18:xx Bogota) fall in today's window, but if JD is asking the next morning, `--date yesterday` is correct.

**How to apply:** Always confirm which shift date JD wants before running. If Linear shows 0 tickets for the date, check: triage tickets need `## by JD` in description OR query SPE team directly by creation window. The script's `--test` flag previews without posting.
