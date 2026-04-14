---
name: Subagent Model Routing
description: Rules for which model to use when spawning Agent tool subagents
type: feedback
---

## Subagent Model Tiers

| Subagent Task | Model | Why |
|---------------|-------|-----|
| File search / grep across codebase | haiku | Just pattern matching, no reasoning |
| Read and summarize a file | haiku | Simple extraction |
| Classify or tag content | haiku | Structured output, no creativity |
| Validate test output | haiku | Binary pass/fail check |
| Write implementation code | sonnet | Needs coding ability |
| Analyze a bug / debug | sonnet | Needs reasoning about code |
| Research a topic | sonnet | Needs synthesis |
| Code review | sonnet | Needs quality judgment |
| Architecture / system design | opus | Needs cross-system reasoning |
| Write implementation plan | opus | Needs deep planning |
| Complex refactoring across files | opus | Needs global context |

**Why:** Opus costs 5x more than Sonnet and 19x more than Haiku. Most subagent tasks are Haiku-tier (search, validate) or Sonnet-tier (implement, analyze). Only planning/architecture genuinely needs Opus.

**How to apply:** When using the Agent tool, always pass `model: "haiku"` or `model: "sonnet"` unless the task is architecture/planning. Default is Sonnet if unsure.
