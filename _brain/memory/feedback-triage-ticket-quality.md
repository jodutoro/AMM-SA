---
name: T2 Triage Ticket Quality Rules
description: What belongs in a Linear ticket vs what stays backend-only; DevBot enrichment role
type: feedback
---

Never put `triage_score` or `confidence_score` in the Linear ticket description. Both are backend-only signals used for routing and DevBot gating — QA and engineers should never see them.

**Why:** Score numbers in tickets create noise and confusion for engineers. The ticket should be signal-dense for the reader, not expose internal model metrics.

**How to apply:** If asked to add scoring/confidence to a ticket, keep it in the triage dict and pipeline state only. The ticket description fields are: customer block → component → problem → error → steps → expected → actual → troubleshooting → debug_clues (DevBot) → Intercom link.

---

DevBot enrichment runs on EVERY `engineering_ticket`, not just low-confidence ones.

**Why:** `confidence_score` measures triage decision quality (is this really a bug?), not data richness. Even a 95-confidence ticket still benefits from Sentry error count + stack trace + existing ticket check. DevBot is the one who fixes the ticket — it needs runtime context baked in at creation time.

**How to apply:** `_inject_devbot_debug_clues()` in `main.py` always runs before `create_t2_ticket` when devbot_result is present. Claude's `debug_clues` field is always output as `""` — DevBot is the sole writer. Do NOT add AI notes or any Claude-generated content to debug_clues; the field is reserved for DevBot findings + visual evidence (recording + screenshots) only.

---

`affected_component` and `error_message` are required ticket fields.

**Why:** These are the two fields DevBot needs to locate and fix the bug. Vague component names ("the platform") or missing error text were the #1 cause of DevBot auto-fix failures in Linear ticket analysis.

**How to apply:** Both are Pydantic-required in `TicketDetails`. `error_message` renders as a fenced code block; omitted only when value is literally "none visible to user".
