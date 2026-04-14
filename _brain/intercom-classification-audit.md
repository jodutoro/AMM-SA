---
name: Intercom Classification Audit
description: Script + workflow for auditing and correcting Intercom SA - Type of Issue classifications
type: project
---

# Intercom Classification Audit

**Script:** `Work stuff/intercom-t2-triage/audit_classifications.py`

## What it does
Fetches Intercom conversation transcripts and verifies the `SA - Type of Issue` custom attribute set by Tier 1 agents. If Claude's classification disagrees with T1's at ≥85% confidence, it updates Intercom with the corrected value.

- Uses the active Claude Code session via `claude_agent_sdk` (no Anthropic API key needed)
- Confidence threshold: **85%** — falls back to T1's classification if below
- Writes audit results to CSV in `Work stuff/intercom-t2-triage/data/audit_logs/`

## Run
```bash
cd /Users/eillacs/Desktop/Agentic
python3 Work stuff/intercom-t2-triage/audit_classifications.py
```

## Related audit scripts
| Script | Purpose |
|--------|---------|
| `audit_classifications.py` | Audit/correct SA - Type of Issue classification |
| `audit_sa_feature.py` | Audit SA feature attribute specifically |
| `audit_ticket_quality.py` | Fetch engineer feedback from Linear for ticket quality |

## Auth
- `INTERCOM_ACCESS_TOKEN` from `.env`
- Intercom API v2.11, base URL: `https://api.intercom.io`
- 0.5s delay between Intercom API calls to avoid rate limits

## Classification categories
The script checks the `SA - Type of Issue` custom attribute against Claude's re-classification. Confidence <85% → keep T1 value. Confidence ≥85% → update Intercom.

**Why:** T1 agents sometimes misclassify issue types, which skews reporting and routing. This script auto-corrects the backlog.

**How to apply:** Run periodically or after any large batch of T1 classifications. Check `data/audit_logs/` for the CSV output showing what was changed.

---
*See also:* [[intercom-t2-triage-pipeline]]
