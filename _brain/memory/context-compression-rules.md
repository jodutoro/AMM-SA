---
name: Context Compression Rules
description: Rules for minimizing context tokens in Claude Code sessions to reduce cost
type: feedback
---

# Context Compression Rules

## Session Context Management

1. **/compact at 65%** — run `/compact Focus on [current task]` when context bar hits yellow
2. **/clear at 85%** — mandatory context reset when red
3. **Lazy-load brain files** — only read `_brain/memory/` files relevant to the current task, not all of them
4. **Never re-read files** — if you already read a file in this session, use your memory of it
5. **Summarize tool output** — when a tool returns 100+ lines, summarize the relevant parts instead of keeping all in context

## CLAUDE.md Token Budget

Target: CLAUDE.md under 200 lines / 1500 words. Currently enforced by trimming (Task 5).
Anything over 200 lines risks truncation and wastes tokens on every session.

## Subagent Context Isolation

- Subagents get their own context window — they don't inherit the parent's full history
- Pass only the minimum context needed: file path, specific question, expected output format
- Use `model: "haiku"` for subagents that just need to read/search/validate

## Tool Call Optimization

1. **Batch independent tool calls** — make multiple tool calls in one response when they don't depend on each other
2. **Avoid redundant reads** — don't re-read a file to check a single line; use grep instead
3. **Use glob before grep** — find the right files first, then search within them
4. **Prefer Edit over Write** — Edit sends only the diff, Write sends the entire file

## Token Budget Per Task Type

| Task | max_tokens | Model |
|------|-----------|-------|
| Classification / routing | 256 | Haiku |
| Extraction / tagging | 512 | Haiku |
| Summarization / triage | 1024 | Sonnet |
| Code generation | 4096 | Sonnet |
| Architecture / planning | 8192 | Opus |

**Why:** Every unnecessary token costs money. At 100+ sessions/month, trimming 500 tokens per session saves ~$5-15/month on input alone.

**How to apply:** Follow these rules in every session. The model_router module enforces budgets programmatically for backend API calls.
