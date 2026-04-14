---
name: agentic-mastermind architecture
description: Architecture, slash commands, workflow templates, SearchAtlas MCP rules, and integration patterns for the agentic-mastermind toolkit
type: project
---

# Agentic Mastermind — Architecture & Rules

**Location:** `agentic-mastermind/`
**What it is:** Open-source digital marketing agency toolkit for SearchAtlas users. Clone the repo, connect SearchAtlas API key via MCP, run marketing workflows via Claude Code slash commands.
**Philosophy:** "One key, all integrations" — SA key unlocks SEO, GBP, Google Ads, content, press releases, WordPress, LLM visibility. No per-service credentials.
**Status:** Phase 5 complete (all commands, workflows, integrations, docs built). Delete `PLAN.md` before going fully public.

---

## File Structure

```
agentic-mastermind/
├── commands/        ← 12 slash commands (.md files)
├── workflows/       ← 7 YAML workflow templates
├── integrations/    ← Slack, Discord, Email (Resend), Circle bash scripts
├── scripts/         ← setup-interactive.sh, verify-setup.sh
├── docs/            ← MCP_SETUP, TOOL_REFERENCE, GOLDEN_RULES, WORKFLOWS, INTENT_MAPPING
├── plans/           ← per-client monthly plan files (e.g. plans/acme/2026-03.yaml)
├── setup.sh         ← interactive wizard
├── CLAUDE.md        ← AI orchestration context
├── AGENTS.md        ← WARP agent guidance
└── PLAN.md          ← DELETE before public release
```

---

## MCP Server

- **Endpoint:** `https://mcp.searchatlas.com/sse`
- **Protocol:** JSON-RPC 2.0 via SSE
- **Auth:** `X-API-KEY` header
- **Config:** `~/.claude/settings.json` → `mcpServers.searchatlas`
- **Scale:** 53 tool groups, ~308 operations

---

## Slash Commands (12)

| Command | Purpose |
|---------|---------|
| `/help` | List all commands |
| `/my-account` | Discover all projects, businesses, locations, quota |
| `/onboard-client` | Guided wizard for new client setup |
| `/business-report` | Deep dive: OTTO, brand vault, content, Site Explorer, GBP, PPC, LLM |
| `/run-seo` | SEO onboarding or monthly maintenance |
| `/run-gbp` | GBP optimization or monthly maintenance |
| `/run-ppc` | PPC campaign build + launch |
| `/run-content` | Article generation from topical maps |
| `/run-pr` | Press releases, cloud stacks, digital PR |
| `/run-visibility` | LLM visibility + sentiment audit |
| `/send-slack` | Post to Slack (named webhooks: `SLACK_WEBHOOK_{NAME}`) |
| `/send-discord` | Post to Discord webhook |
| `/send-email` | Send via Resend API |
| `/send-circle` | Post to Circle community space |

---

## Workflow Templates (7)

| Workflow | Steps | Notes |
|---------|-------|-------|
| seo-onboarding | Project→Audit→Pillars→BrandVault→Keywords→TopicalMap→Articles | Steps 4+5 parallelizable |
| monthly-seo | Issues→[Suggestions+Schemas+Indexing]→TopicalMap→Articles→ContentGrader | 3 parallel middle steps |
| gbp-optimization | LoadLocation→Recommendations→[Categories+Services+Attrs]→Deploy | 3 parallel middle steps |
| gbp-monthly | Reviews→Recommendations→Posts→Automation→Stats | Sequential |
| ppc-launch | Business→Products→Approve→Keywords→SendToAds→Activate | Strictly sequential |
| authority-building | [PressRelease+CloudStack+DigitalPR]→MonitorBacklinks | 3 parallel start steps |
| llm-visibility | [BrandOverview+Sentiment+PromptSims+SERP]→Export | 4 parallel start steps |

---

## GOLDEN RULES (memorize these)

### 1. Schema Discovery First
Before calling any MCP tool for the first time: call with `params: {}` to get real schema. Docs may be outdated.

### 2. Read Error Messages
- Parameter Validation Error → wrong params; error body has correct schema
- Internal Server Error → backend issue; retry later
- "credentials not provided" → check API key in MCP config
- "Tool not found" → re-run schema discovery

### 3. Poll Async Tasks
Many ops return task ID not result. Poll:
- OTTO SEO: `get_otto_task_status` until `status = SUCCESS`
- OTTO PPC: `get_otto_ppc_task_status`
- Content generation: 4-step (start_info → poll → start_headings → poll → generate)

### 4. Watch Tool Name Collisions
- `project_management` → OTTO or content? Use `OTTO_Installations` or `seo_analysis` for OTTO-specific
- `content` → press release or article?
- `distribution` → press release or cloud stack?

### 5. Never Hardcode IDs — Discover via API

### 6. Confirm Before Destructive Actions
Deploying GBP changes, activating PPC (starts spending), distributing press releases (uses credits), sending outreach emails.

---

## Parameter Naming Gotchas

| Tool Group | ID Param Name |
|-----------|--------------|
| Brand Vault CRUD (create/update/delete) | `brand_vault_uuid` |
| Brand Vault read-only (info/overview/graph) | `hostname` |
| Site Explorer (organic/backlinks/analysis/adwords) | `project_identifier` |
| GBP all tools | `location_id` (integer) |
| PPC most tools | `business_id` |
| PPC business_crud list | `google_ads_account_id` + `google_ads_client_id` |
| OTTO most tools | `project_id` (UUID) |
| OTTO holistic_audit | `domain` (plain string) |

---

## Known Tool Quirks

| Tool | Quirk | Workaround |
|------|-------|-----------|
| `brand_vault` | Intermittent auth errors | Retry 2-3x; create manually if persistent |
| GBP `deploy_location` | Only verified locations | Check verification first |
| GBP `get_location_stats` | Empty for new locations | Normal; populates over time |
| Content workflow | Polls take 30-60s | Be patient |
| PPC `business_crud` list | Needs `google_ads_account_id` | Call `ads_account_crud` first |

---

## Dashboard Links (always include in output)

- OTTO: https://dashboard.searchatlas.com/otto/
- Brand Vault: https://dashboard.searchatlas.com/brand-vault/
- Content: https://dashboard.searchatlas.com/content/articles/
- GBP: https://dashboard.searchatlas.com/gbp/
- PPC: https://dashboard.searchatlas.com/otto-ppc/
- Press: https://dashboard.searchatlas.com/press-releases/
- LLM Visibility: https://dashboard.searchatlas.com/llm-visibility/

---

## Intent Routing Quick Reference

| User says | Action |
|-----------|--------|
| "tell me about {client}" / "what do we have" | `/business-report` |
| "show my account" / "what clients" | `/my-account` |
| "set up new client" | `/onboard-client` |
| "run SEO" | `/run-seo` |
| "optimize GBP" | `/run-gbp` |
| "launch ads" / "set up PPC" | `/run-ppc` |
| "press release" / "link building" | `/run-pr` |
| "check AI visibility" | `/run-visibility` |

---

## Env Vars

- `SA_API_KEY` — required; chmod 600 on `.env`
- `SLACK_WEBHOOK_URL`, `SLACK_WEBHOOK_{NAME}` — named channels
- `DISCORD_WEBHOOK_URL`
- `RESEND_API_KEY` + `EMAIL_FROM`
- `CIRCLE_API_KEY` + `CIRCLE_COMMUNITY_ID`

**Why:** SearchAtlas is the single auth source for all marketing ops. The slash command + YAML workflow pattern lets Claude Code orchestrate complex multi-step marketing workflows without a web UI.
**How to apply:** Always run schema discovery on first use of any SA tool. Confirm before any destructive action. Follow dependency order in workflows — steps produce IDs consumed downstream.
