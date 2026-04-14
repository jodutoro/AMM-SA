---
name: MCP Check-in Apr 9 2026
description: Internal SA meeting on MCP testing status, ticket routing rules, Webflow integration opportunity, V2 launch timeline, and Arena event strategy
type: project
---

**Meeting:** MCP Check-in — 04/09/2026  
**Attendees:** Arman Advani, Lucas Zarochinski, Juan Nicolas Villamil (Nico), Ismar Costa, Justin Rondeau  
**Transcript:** `AMM-Internal/transcripts/mcp-checkin-apr9-2026.md`  
**Visual Intelligence:** `AMM-Internal/mcp-visual-intelligence-apr9.md`  
**API Access:** MCP QA Dashboard key stored in `Agentic/.env` as `MCP_QA_API_KEY` | Dashboard: `mcp-platform-nu.vercel.app`

### API Endpoints (key in x-api-key + Authorization: Bearer headers)
- `GET /api/v1/dashboard` — top-line stats (totalTools, totalTested, totalPassed, totalFailed, totalBugs, coveragePercent, groupStats)
- `GET /api/v1/groups` — all 19 modules with tool_count, tested_count, passed, failed, bugs
- `GET /api/v1/tools?limit=760&group_slug=X` — full tool catalog: id, name, slug, mcp_method, group_slug, latest_status, assignees
- `GET /api/v1/activity?limit=N` — live test recording feed: action, status, notes, tool_name, user_name
- `GET /api/v1/assignments` — who owns each module (user_name → group_name)

---

## Key Facts

### MCP Testing Status (Lucas)
- Most tools covered. Main bug pattern: tool is listed in MCP but endpoint doesn't execute — agent thinks it has capability when it doesn't.
- Module status: Website Builder ✅ back on track | Brand Vault ✅ | Content Genius ⚠️ (core works, bugs) | GBP ✅ (Unhely did deep test) | PPC ❌ — Lucas is bottleneck (needs account setup)
- All bugs tracked in Linear.
- Tech stack note: Vercel was wrong call — migrating to Northflank. DevOps to handle.

### Ticket Assignment Rules (Ismar)
- Endpoint exists but returns errors → ticket to **tool team** (e.g., Content Genius, Auto, GBP)
- MCP mis-bundles/mis-calls endpoint → ticket to **AI agent team**
- Linear team names ≈ tool names. Ismar will share markdown mapping (Brand Vault lives inside Content Genius; Knowledge Graph is within Auto)
- For developer assignment: use Linear MCP to find dev with most expertise based on past ticket history
- Ismar will create a script to automate ticket weight/priority

### Priority Rule
- **Nothing is HIGH priority** unless it blocks V2 launch (scheduled ~April 15, "next Tuesday")
- Post-V2: one dedicated dev full-time on MCP until challenge date
- Others: bug fixes + front-end for new UI release (was due April 7, now delayed to before events)

### Event Timeline
- **April 21** — Event 1
- **April 23** — Event 2
- **May** — Event 3 (TBD)
- Arena does NOT use MCP terminal. Front-end UI only. MCP not involved in Arena until event 3 at earliest.

### Arena Format (Arman + Justin)
- Two people compete head-to-head. Arman + Justin are judges, not builders.
- Judges give prompt, timer runs, same goal, creative freedom.
- Phase 1: build website + run Google Ads. Phase 2: optimize + publish content.
- Key insight: **MCP terminal is not sexy for live demos.** Front-end UI preferred.
- Manick's idea of using MCP to create landing pages for advertising = NOT part of Arena scope currently.

### Webflow Integration Opportunity (Arman)
- Partner use case: Customer B (mature brand) wants CMS (Webflow) but agency wants to build with Website Studio.
- Proposed: Build in Website Studio → use Webflow MCP → publish to Webflow CMS.
- Ismar confirmed: connect SA MCP + CMS MCP locally to test if output format is accepted.
- Lucas confirmed: Webflow MCP publishes blog posts as HTML directly — just needs variable mapping to Webflow CMS fields.
- Nico: exporting to top CMSs (Webflow, WordPress) is a planned Website Studio feature.
- WordPress plugin update (HTML → Elementor/Divi) being discussed with Rafa.
- Arman's contacts for Webflow test: Nico (Website Studio) + Lucas (MCP)

### Website Studio PPC Mode
- Free mode working. PPC mode is **incomplete** — next critical priority.
- Blog post publishing schema bug: inconsistently applied depending on website theme — known bug.

**Why:** Needed to track SA internal MCP roadmap, ticket routing rules, and event strategy. Directly informs how AMM positions MCP capabilities.  
**How to apply:** Use ticket routing rules when advising on MCP bug escalation. Webflow integration is a live sales opportunity (Arman's partner). Arena strategy means front-end polish matters more than MCP terminal UX for near-term demos.
