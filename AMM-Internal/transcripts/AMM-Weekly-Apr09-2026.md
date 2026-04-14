# AMM Weekly Session — April 9, 2026

**Duration:** 83 minutes  
**Attendees:** Matt Bailey (SA), Jonathan Duque (SA), Bryan Fikes, Clayton Joyner (modrn.io), Jay Cornelius (modrn.io), Justin Day, Jonathan Giner (Marsense), Michael Vassar (digitalcoastmarketing.com), Justin Hual (hipcreativeinc.com)

---

## Key Moment — JD Role Announcement

**Matt Bailey (25:55):**
> *"JD is moving into full-time on Mastermind. So he will be available to coach, help."*

**Bryan Fikes (immediately after):**
> *"Way to bury the lead, Matt. You got to start with that and say, I don't think these guys realize how freaking valuable JD is, man. Why do you think we all plug into him, dude."*

**Matt (26:22):**
> *"He's awesome. Absolutely, absolutely. Yeah, and that's the thing. If you guys have anything with the setup that you are running into... don't be afraid to call JD, tap him. That's what he's here for."*

---

## Action Items

| Owner | Action | Timestamp |
|-------|--------|-----------|
| JD | Post setup checklist in Circle; request completion/issues from members | 26:37 |
| JD | Schedule 1:1 w/ Michael re: file structure/MCP setup (tomorrow) | 28:47 |
| JD | Coordinate w/ Maddy to update MCP GitHub docs w/ schemas/missing tools | 14:40 |
| JD | Fix Michael Vassar auto-site limit (account: gbp.digitalcoastmarketing.com, stuck at 6 sites) | 1:22:04 |
| Matt | Email support ticket #s from Michael re: auto-site limit | 1:21:32 |
| Clayton | Share multi-agent design framework on next call | 1:09:24 |
| Members | Review setup checklist; confirm file structure / MCP / tech stack | 28:10 |

---

## Member Updates & Wins

### Bryan Fikes
- MFTFinder.com — marriage family therapist nationwide directory, already live. Built with database pull + full ecosystem. Fully deployed.
- Still hitting Website Studio integration issues on roofing site (working with JD + Farhan).
- Quote: *"This thing is just incredible, guys... When we're all creators and agency people and entrepreneurial and business-minded, God, we can do so much with this."*

### Justin Day
- Built an executive assistant command center: bank, credit cards, ClickUp, Slack, Gmail all connected as source of truth.
- Uploaded Alex Hormozi's $100M Leads, $100M Offers, $100M Money Models as separate modules — grades business blind spots in real time.
- 100% automated end-to-end with hooks.
- New client onboarding: transcript in → project files out → business graded against methodology automatically.
- Built Supabase user layer for team sharing (not deployed publicly yet).
- Requested **weekly challenges / homework assignments** tied to monthly milestones — Matt confirmed this is coming; bringing Arman in more to work through challenges.

### Clayton Joyner — Main Presentation (44:00–1:07:00)
- **Lucidchart design framework:** Client journey map from onboarding → copy → theme → global widgets → page-by-page approvals → launch. 4 page categories: core, service/inner, compliance, CMS/collections.
- **Design style taxonomy:** Medical (teal/white), Luxury (bold red/wine), Playful (colorful/bouncy), High Fashion (B&W/Abercrombie).
- **Insight:** Nailing the theme (colors, fonts, CTAs, homepage) reduces client revisions by 93%.
- **Philosophy:** Copy first, then design layer — content written before design begins allows parallel processing.
- **Home service calculator app:** Built in 1 week. Multi-tenant SaaS: platform admin → resellers → brands. Features: material/labor/permitting pricing by state, lead magnet calculators, embed codes, QR generator, GoHighLevel + HubSpot native integration, subscription wizard onboarding. $9/month reseller model.
- **Second app:** Star Wars RPG character sheet app (D&D-style) with AI dungeon master — social/group finding layer planned.
- **Client-First web dev** converted to a `.md` skill file — can spit code in Client-First format.
- **Multi-agent framework doc** built at 4:30am — will share next call. Structure: "if I could build a dream team, who would be on it and in what order would they interact?"
- Matt: *"JD and I are probably going to go back and share some of that with Manick and Arman — you got to take a look at this."*

### Jonathan Giner
- 5 sites built total. 4 were excellent. 1 had design consistency issues he couldn't resolve.
- AI rules doc not yet reviewed (busy week) — on his list.
- Wants the build process optimized for design consistency.

### Michael Vassar
- Built HTML kickoff report for client using Atlas Brain — fast, looked good, client happy.
- Not yet completed file structure / MCP setup checklist.
- **Stuck at 6 auto-sites for over a week** — multiple support tickets, no resolution. JD took ownership to fix directly.
- Scheduling 1:1 with JD tomorrow.

### Justin Hual (HIP Creative) — Newest Member
- 127 employees, 2 brands, ~500 customers. Healthcare vertical — HIPAA compliance layer required.
- Built authorization layer between SA MCP and their two-brand SA setup.
- Already using Anthropic managed agents infrastructure (launched yesterday at transcript time).
- Launching AI website product at an event May 1st.
- RST team uses Claude plugin for repetitive work.
- **Key product feedback:** SA MCP GitHub docs are incomplete — missing schemas and tool descriptions, causing LLMs to get confused. They built schemas internally. Offered to submit a pull request.
- Goal: get non-technical staff onto Claude Code / Claude in a non-scary way.

---

## Design Discussion — Key Themes

**Problem (Giner + Day):** Website Studio design output is inconsistent — looks fine locally in Claude but breaks in MCP.

**JD's proposed solution (got major buy-in from Bryan, Justin Day):**
> Allow members to send HTML/zip of locally built site → inject to backend → SA publishes it.

**Justin Day's add:**
> Ability to inject rendered HTML + Markdown + design brain reference file so SA always has consistent design context.

**Clayton's framework input:**
> The chicken-and-egg problem: design before copy or copy before design? His answer: copy first, design layer second. Content written in advance unlocks parallel processing.

**Playground plugin** (JD flagged as short-term solution): allows switching between pre-generated design styles, font/size modification.

---

## Monday Manick Call Preview

Matt shared screen — 4 playbooks running for Roto-Rooter (LinkGraph enterprise client):
1. SEO & visibility audit
2. Revenue opportunity map
3. Content audit + production pipeline
4. AI visibility metrics

Output: multi-page comprehensive audit doc with quick wins, keyword opportunities, technical issues, content cannibalization, phased action plan.

Agenda: run each playbook live while Manick explains, then set up workflow in member workspaces.

---

## Platform Gaps Surfaced (April 9)

| Gap | Source |
|-----|--------|
| Website Studio design inconsistency (MCP vs local Claude) | Giner, Day |
| No HTML/zip injection to SA backend | Day, Bryan (immediate buy-in) |
| SA MCP GitHub docs incomplete — missing schemas | Justin Hual |
| No markdown/design brain upload to SA for consistency | Justin Day |
| Multi-brand MCP routing (two SA accounts per agency) | Justin Hual |

---

## In-Person Meetup

May — SF vs Vegas (Bryan lobbying hard for SF, offering red carpet + wine connections).

---

## Strategic Notes (JD)

- Matt publicly announced JD full-time on Mastermind **before Manick has formally approved the PM role** — this is significant leverage.
- Bryan's public endorsement ("why do you think we all plug into him") is the clearest signal of member trust to date.
- Matt explicitly plans to take Clayton's work to Manick + Arman — positions JD as the connective layer who surfaces member intelligence upward.
- Arman being brought in more for weekly challenges = his involvement in AMM increasing.
- JD handled Michael's support issue directly and on-call — demonstrated ownership beyond facilitation.
- JD proposed the HTML/zip injection feature live in the call — got immediate signal from Bryan and Day. This is a structured product request ready to route to engineering.
