---
name: Design Workflow Stack
description: Unified design skill setup — design-create skill, UI UX Pro Max install, how the full pipeline works
type: reference
---

# Design Workflow Stack

## Unified Skill: `design-create`

Single entry point for all visual/design/media work. Replaces the old 7-step manual list in CLAUDE.md.

**Location:** `~/.claude/skills/design-create/SKILL.md`  
**Invoke:** `Skill tool → design-create`  
**Auto-triggers:** Any website, UI component, dashboard, landing page, frontend, social media graphic, AI image/video prompt, visual deliverable

### Pipeline (in order)
1. **Context load** (parallel) — `design-spec.md` + `emil-design-eng` skill; add `visual-creation-spec.md` if image/video
2. **Design system** — run `python3 ~/.claude/skills/ui-ux-pro-max/scripts/search.py "<query>" --design-system -p "<Project>"`, then override with Jonathan's aesthetic spec
3. **Design direction** — invoke `frontend-design:frontend-design` skill, commit to bold aesthetic
4. **Component discovery** — `mcp__magic__21st_magic_component_inspiration`
5. **Generation** — `mcp__magic__21st_magic_component_builder` (+ refiner for complex pages)
6. **Polish pass** — `emil-design-eng` rules + UI UX Pro Max pre-delivery checklist

For multi-page projects use `--persist` flag to write `design-system/MASTER.md`.

## UI UX Pro Max

**What:** Design intelligence database — 67 styles, 96 palettes, 57 font pairings, 161 industry reasoning rules, 99 UX guidelines, 25 chart types.  
**Installed:** `~/.claude/skills/ui-ux-pro-max/` (via `uipro-cli`)  
**Skill name:** `ui-ux-pro-max` (available in skills list)  
**Source:** https://github.com/nextlevelbuilder/ui-ux-pro-max-skill  
**Update:** `uipro update`

### Key command
```bash
python3 ~/.claude/skills/ui-ux-pro-max/scripts/search.py "<product_type> <industry> <keywords>" --design-system -p "<Project Name>"
```

Domain searches for supplemental detail:
```bash
python3 ~/.claude/skills/ui-ux-pro-max/scripts/search.py "<keywords>" --domain <style|color|typography|ux|landing|chart>
python3 ~/.claude/skills/ui-ux-pro-max/scripts/search.py "<keywords>" --stack html-tailwind
```

### Priority order
Pro Max output = starting point. Jonathan's `design-spec.md` = final override.  
If Pro Max conflicts with Jonathan's anti-patterns (Inter, purple gradients, centered layouts, generic SaaS) → Jonathan wins.

## CLAUDE.md Status
Old 7-step design stack replaced with single line: invoke `design-create` skill.  
Triggers table updated to include AI image/video as explicit trigger.

**Why:** Fragile manual checklist replaced by a skill that orchestrates everything automatically. Pro Max adds systematic design system generation before any code is written.

**How to apply:** Always invoke `design-create` first on any visual task. Never write UI code before running the design system generator.

---
*See also:* [[visual-creation-spec]] · [[video-generation-research]]
