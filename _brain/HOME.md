---
tags: [home, dashboard, index]
---

# Agentic Brain — Command Center

> The master index for everything in this workspace. Open this first.

---

## Brain & Memory

> `_brain/memory/` is Claude's live memory — symlinked from `~/.claude/projects/.../memory/`. Writing here writes to Claude. Claude saving a memory writes here.

| | |
|---|---|
| [[_brain/00-BRAIN-INDEX\|Brain Index]] | Full map of the AI brain |
| [[_brain/memory/MEMORY\|Memory Index]] | All memory files — Claude reads this on every session |
| [[_brain/memory/search-atlas-api\|Search Atlas API]] | Root URL & API rules |
| [[_brain/memory/gitlab-to-linear\|GitLab → Linear]] | Issue tracking migration |
| [[_brain/memory/intercom-classification-audit\|Intercom Audit Workflow]] | Classification audit script & results |
| [[_brain/memory/intercom-t2-triage-pipeline\|T2 Triage Pipeline]] | Run instructions, API gotchas, ClickUp routing |
| [[_brain/memory/dev-tools-setup\|Dev Tools Setup]] | GSD, Superpowers, Stitch MCP, 21st.dev Magic |

---

## Projects

### Client Operations
| | |
|---|---|
| [[_brain/maps/clientops-backend-map\|ClientOps Backend]] | Python backend, dashboards, integrations |
| [[_brain/maps/intercom-triage-map\|Intercom T2 Triage]] | Automated ticket classification |

### Agentic Mastermind
| | |
|---|---|
| [[_brain/maps/agentic-mastermind-map\|Agentic Mastermind]] | Commands, workflows, integrations |
| [[agentic-mastermind/CLAUDE\|CLAUDE.md]] | Agent rules for mastermind |
| [[agentic-mastermind/docs/GOLDEN_RULES\|Golden Rules]] | Non-negotiable operating principles |
| [[agentic-mastermind/docs/WORKFLOWS\|Workflows Doc]] | Workflow definitions |
| [[agentic-mastermind/docs/TOOL_REFERENCE\|Tool Reference]] | All available MCP tools |

### Skills & Learning
| | |
|---|---|
| [[_brain/maps/anthropic-skills-map\|Anthropic Skills]] | Claude API, MCP builder, office tools |
| [[_brain/maps/threejs-skills-map\|Three.js Skills]] | WebGL / Three.js — 10 skill modules |

---

## Workflows (Runnable Templates)

| Workflow | Purpose |
|---|---|
| [[_brain/workflows/seo-onboarding\|SEO Onboarding]] | New client full SEO setup |
| [[_brain/workflows/monthly-seo\|Monthly SEO]] | Recurring monthly SEO cycle |
| [[_brain/workflows/gbp-monthly\|GBP Monthly]] | Google Business Profile maintenance |
| [[_brain/workflows/gbp-optimization\|GBP Optimization]] | First-time GBP profile cleanup |
| [[_brain/workflows/authority-building\|Authority Building]] | Press release + cloud stack + digital PR |
| [[_brain/workflows/ppc-launch\|PPC Launch]] | Google Ads campaign launch |
| [[_brain/workflows/llm-visibility\|LLM Visibility]] | AI brand visibility & reporting |

---

## Core Docs

| | |
|---|---|
| [[AI_rules\|AI Rules]] | Rules governing all AI behavior in this workspace |
| [[architecture\|Architecture]] | System architecture overview |
| [[PRD\|PRD]] | Product requirements document |
| [[Plan\|Plan]] | Project plan |
| [[README\|README]] | Repo README / partner inbox overview |
| [[CLAUDE\|CLAUDE.md]] | Workspace-level Claude Code instructions |
| [[SETUP\|SETUP]] | Initial setup guide |

---

### Dev Tools & Plugins (User-Scoped)

| Tool | Source | Slash Commands |
|---|---|---|
| **GSD** | `get-shit-done/` | `/gsd:new-project` `/gsd:plan` `/gsd:build` `/gsd:debug` |
| **Superpowers** | `superpowers/` | `/brainstorm` `/write-plan` `/execute-plan` |
| **frontend-design** | plugin | `/design` |
| **feature-dev** | plugin | `/feature` |
| **code-review** | plugin | `/review` |
| **Stitch MCP** | `stitch-mcp/` | Project-scoped MCP (needs `init` for OAuth) |
| **21st.dev Magic** | npm | MCP server — UI component generation |

---

## Infographics & Visuals

- `agentic-agency-series-infographs/` — 3-part Agentic Agency Series + unified hub
  - Part 1: Command Center Setup
  - Part 2: Daily Playbook
  - Part 3: Field Guide
  - MMA Cheat Sheet

---

## Quick Reference

```
Search Atlas API root: https://mcp.searchatlas.com/api/v1/mcp
Issue Tracker: Linear (not GitLab)
Memory files: _brain/memory/
Workflow templates: _brain/workflows/
Intercom audit script: Work stuff/intercom-t2-triage/audit_classifications.py
```

---

## Related

| | |
|---|---|
| [[_brain/00-BRAIN-INDEX\|Brain Index]] | Full knowledge map — all memory, workflows, project maps |
| [[AI_rules\|AI Rules]] | Working rules that govern this workspace |
| [[architecture\|Architecture]] | System design for all projects |
| [[Plan\|Plan]] | Roadmap and active project status |
| [[SETUP\|Setup Guide]] | How to set up this vault on a new machine |
