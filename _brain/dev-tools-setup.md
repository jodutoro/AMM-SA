---
name: Dev Tools Setup
description: GSD + Superpowers (user-scoped plugins), Stitch MCP + 21st.dev Magic (project-scoped via .mcp.json)
type: project
---

# Dev Tools Setup

## User-Scoped Plugins (available in ALL projects automatically)

| Tool | Install scope | Source dir | Slash commands |
|------|--------------|------------|----------------|
| **GSD** (Get Shit Done) | User-scoped | `get-shit-done/` | `/gsd:new-project`, `/gsd:plan-phase`, `/gsd:execute-phase`, `/gsd:debug`, `/gsd:progress`, `/gsd:quick` |
| **Superpowers** | User-scoped | `superpowers/` | `/brainstorm`, `/write-plan`, `/execute-plan` |
| **frontend-design** | User-scoped | — | `/design` |
| **feature-dev** | User-scoped | — | `/feature` |
| **code-review** | User-scoped | — | `/review` |
| **ralph-loop** | User-scoped | — | `/ralph-loop` |

**Important:** GSD and Superpowers are **installed globally** — do NOT re-install from source dirs. The source dirs are for reference only.

## Project-Scoped MCP Servers (this workspace only, via `.mcp.json`)

| Server | Purpose | Status |
|--------|---------|--------|
| **Stitch MCP** | Google Stitch AI design → local dev bridge | ❌ Needs init — run `! npx @_davideast/stitch-mcp init` |
| **21st.dev Magic** | UI component generation + inspiration + refinement | ✅ Connected |

21st.dev Magic MCP tools:
- `mcp__magic__21st_magic_component_inspiration` — find reference components
- `mcp__magic__21st_magic_component_builder` — generate polished component code
- `mcp__magic__21st_magic_component_refiner` — iterate on generated components
- `mcp__magic__logo_search` — logo search

## User-Scoped MCP Servers (all projects, via `~/.claude.json`)

Full reference: `_brain/memory/mcp-servers-reference.md`

Key servers: SearchAtlas, Intercom, Slack, Linear, GitHub, Railway, Exa, Context7, Playwright, Ruflo, ClickUp.

## Extended Skills Library
Marketplace: `claude-code-skills` (205 skills across 6 bundles).
Install: `/plugin install <bundle>@claude-code-skills`

**Why:** Keeping track of what's user-scoped vs project-scoped prevents confusion about why tools appear/disappear across projects.

**How to apply:** User-scoped tools are always available. Project-scoped tools only work from `/Users/eillacs/Desktop/Agentic/`. For Stitch MCP, run the init command before first use.
