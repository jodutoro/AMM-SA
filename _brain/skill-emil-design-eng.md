---
name: Emil Kowalski Design Engineering Skill
description: Emil Kowalski's design engineering philosophy — UI polish, animation, component craft; invoke for any frontend/UI work
type: reference
---

# Emil Kowalski Design Engineering Skill

**Skill location:** `~/.claude/skills/skills/emil-design-eng/SKILL.md`
**Invoke via:** `Skill` tool with skill name `emil-design-eng` (or via the frontend-design stack)

## When to Use
Invoke for **any** frontend, UI, component, or animation work — before writing any CSS or component code.

## Philosophy (Emil Kowalski's approach)
- **Invisible details are everything** — the details users don't consciously notice are what make UI feel premium
- **Animation should feel physical** — spring physics over linear easing, match real-world weight
- **Components earn trust** — a polished micro-interaction creates confidence in the whole product
- **Typography as layout** — type choices drive the entire visual system
- **Restraint is craft** — knowing what NOT to add is harder and more important than adding more

## Key Principles
1. **Motion** — spring-based animations, not linear. `spring(stiffness: 300, damping: 30)` territory.
2. **Hover states** — always have them. 150-200ms transitions. Subtle scale + opacity shifts.
3. **Focus states** — visible, styled, never the default browser outline. Part of the design.
4. **Loading states** — skeleton screens over spinners. Optimistic UI where possible.
5. **Empty states** — designed, not forgotten. Part of the component spec.
6. **Error states** — inline, contextual, never modal. Never "an error occurred".
7. **Spacing** — 8px grid, consistent scale. Padding tells users what belongs together.
8. **Color** — meaningful use only. Every color should communicate something.

## Frontend Design Stack (always apply together)
When doing any UI work, use all of these in parallel:
1. Read `_brain/memory/design-spec.md` — Jonathan's aesthetic (editorial typographic maximalism)
2. Read `_brain/memory/visual-creation-spec.md` — image/video system
3. Invoke `frontend-design:frontend-design` skill
4. Read `~/.claude/skills/skills/theme-factory/SKILL.md` — theming
5. Use `mcp__magic__21st_magic_component_inspiration` + `mcp__magic__21st_magic_component_builder`

**Goal:** Every UI should feel like a poster — kinetic, editorial, raw, typographic, intentional. Not generic SaaS.
