---
name: Claude Code Best Practices
description: CLAUDE.md limits, hook patterns, subagent patterns, context thresholds, memory layers, power tips (2026)
type: reference
---

# Claude Code Best Practices (2026)

## CLAUDE.md Best Practices
- Global CLAUDE.md: `~/.claude/CLAUDE.md` — applies to ALL projects
- Project CLAUDE.md: `<project>/CLAUDE.md` — project-specific overrides
- Sub-project CLAUDE.md: read automatically when Claude operates in that directory
- Keep CLAUDE.md focused: rules, not documentation. Move large docs to `_brain/memory/`
- Trigger rules beat passive context — "when asked for X, do Y" is more reliable than background context

## Context Management
| Threshold | Action |
|-----------|--------|
| < 50% | Green — work freely |
| 50–65% | Yellow — wrap up long tasks |
| 65–80% | Orange — avoid new complex work |
| > 80% | Red — run `/gsd:pause-work` or `/compact` immediately |

- At 70%: `/compact Focus on [X]`
- At 85%+: `/clear` mandatory
- Context bar formula: normalized to usable context (excludes 16.5% autocompact buffer)

## Subagent Patterns
- Use `Agent` tool with `subagent_type` for independent parallelizable work
- Protect main context: delegate research/analysis to subagents, get back summaries
- `isolation: "worktree"` — gives subagent isolated git worktree (auto-cleaned if no changes)
- Never poll subagent status — results arrive via hooks or return value
- Foreground vs background: foreground when you need results before proceeding; background for truly independent work

## Hook Patterns (settings.json)
```json
{
  "hooks": {
    "PreToolUse": [{"matcher": "Write|Edit", "hooks": [{"type": "command", "command": "/path/to/hook.sh"}]}],
    "PostToolUse": [{"matcher": "Bash", "hooks": [{"type": "command", "command": "/path/to/hook.sh"}]}],
    "Stop": [{"hooks": [{"type": "command", "command": "echo 'Session end checklist reminder'"}]}]
  }
}
```
- Exit 0: allow / success
- Exit 2: block with message to Claude
- Other non-zero: hook error (also blocks in current implementation)
- Hook receives tool input as JSON on stdin

## Memory Layers
| Layer | Location | Scope |
|-------|----------|-------|
| Global CLAUDE.md | `~/.claude/CLAUDE.md` | All projects |
| Project CLAUDE.md | `<project>/CLAUDE.md` | This project |
| Auto-memory | `~/.claude/projects/.../memory/` → symlink to `_brain/memory/` | This project |
| Session context | Conversation history | This session only |

- `_brain/memory/MEMORY.md` is the index — keep under 200 lines (truncated after)
- Memory files use frontmatter: `name`, `description`, `type` (user/feedback/project/reference)
- Feedback and project memories need `**Why:**` and `**How to apply:**` lines

## Power Tips
- `/effort max` for complex architectural decisions (not `ultrathink` — deprecated Jan 2026)
- `/fast` toggles fast mode (same Opus 4.6, faster output)
- `! <command>` runs shell commands directly in the session — output lands in conversation
- `/compact Focus on [X]` — compress context while keeping focus
- Multi-tool parallelism: put all independent tool calls in one response block
- `mcp__ruflo__memory_search` before any non-trivial task — reuse learned patterns

## Ruflo Swarm Rules (CLAUDE.md mandate)
- Required for: 3+ independent tasks, multi-file changes, research+implementation, batch ops
- Protocol: memory_search → swarm_init → work → neural_train
- Default topology: hierarchical (6 agents)
- NEVER poll swarm status — fire-and-wait

## Development Workflow
- New feature → `superpowers:test-driven-development` skill first
- Bug → `superpowers:systematic-debugging` skill first
- Plan > 3 steps → `superpowers:writing-plans` skill first
- Parallel work → `superpowers:dispatching-parallel-agents` skill
- Before claiming done → `superpowers:verification-before-completion`

## Git Rules
- Never commit: `.env`, `__pycache__`, `.DS_Store`, `feedback.jsonl`
- Commit frequently after meaningful changes
- `clientops-backend/` and `intercom-t2-triage/` are separate git repos — commit from inside them
- Never skip hooks (`--no-verify`) without explicit user request
- Never force push to main/master without explicit user request
