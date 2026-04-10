---
name: T2 automation vision
description: Planned architecture for full T2 support automation — Option C (Staged Resolution + Slack Approval Queue), open questions, agent roster
type: project
---

# T2 Automation Vision — Option C

**Context:** From `_scratch/Full automation plan.txt` — research + planning session for replacing manual T2 support work with Claude Code agents.

**Chosen approach:** **Option C — Staged Resolution with Slack Approval Queue**

**Why C over A or B:**
- Option A (fully autonomous) fails unpredictably on novel cases ("many other scenarios")
- Option B (fully manual approval) requires JD as first responder — no leverage
- Option C: agent auto-resolves what it knows, routes novel/complex cases to Slack queue for JD approval. As agent learns patterns, JD touches fewer conversations. Incremental autonomy.

---

## Planned Agent Roster

| Agent | Pattern | Replaces |
|-------|---------|---------|
| T2 Triage | `claude -p` subprocess (already built) | Manual Intercom review |
| EOD Reporter | Scheduled trigger (already built) | Daily manual report writing |
| Partner Health Monitor | Scheduled trigger (daily) | Scanning 70+ Slack channels manually |
| Escalation Detector | `claude -p` subprocess | Manual escalation identification |

---

## Option C Architecture

1. T2 Triage agent classifies conversation → assigns product area + priority
2. Resolution agent attempts fix based on known playbooks (Stripe refund, SA reset, toggle features)
3. **Slack approval queue:** Novel cases → DM to JD with context + proposed action → JD approves/modifies
4. After approval → agent posts reply to customer, reassigns ticket, closes loop

---

## Open Question (UNANSWERED — blocking full Option C)

**Is Quantum Puppy accessible via API or web-only?**

- **Has API** → agent can execute fixes autonomously (refunds, resets, toggles), post reply, reassign to T1 — full Option C
- **Web-only** → agent drafts fix + response, JD approves in Slack, then executes manually — Option C with extra human step
- **Mix (most likely):** Stripe/SearchAtlas have APIs (agent auto-executes) + Quantum Puppy is web-only (agent drafts, JD executes)

This answer determines whether the resolution step is truly autonomous or human-in-the-loop for execution.

---

## Three Claude Code Agent Patterns (reference)

1. **`claude -p` subprocess** — Stateless, task-specific. Pass context via stdin, get JSON back. Best for: triage, classification, generation, routing decisions.
2. **Custom slash commands** — Prompt templates that activate a mode. Best for: recurring workflows needing consistency without babysitting.
3. **Scheduled remote triggers (`/schedule` skill)** — Full Claude sessions on cron. Best for: EOD reports, health checks, batch jobs needing reasoning + tool use (Linear, Slack, Intercom).

**Why:** JD wants to only touch the hard/novel cases. The Slack queue is the safety valve — agent proposes, JD approves, autonomy increases over time as playbooks expand.
**How to apply:** Before building any new automation agent, identify: (1) which pattern (subprocess/command/trigger), (2) what it replaces, (3) whether execution requires API or web panel. For QP-dependent actions, assume human execution step until API status is confirmed.
