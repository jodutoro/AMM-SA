---
title: Agentic Marketing Mastermind Weekly Sessions
date: 2026-04-09
type: group session
duration: 83 mins
participants:
  - Matt Bailey (SA, host)
  - Justin Day (member, Austin TX)
  - Bryan Fikes (member)
  - Michael Vassar (member)
  - Clayton Joyner (member, screen shared)
  - Noah (new member, healthcare agency)
  - Jonathan Duque / JD (SA support)
url: https://fathom.video/share/p1sTWbE4Lckgce2SFEGGzsx44ffawmwD
screenshot: ../screenshots/meeting-2-weekly-session.png
---

# Agentic Marketing Mastermind — Weekly Session: Apr 9, 2026

**Date:** April 9, 2026 | **Duration:** 83 mins | **Type:** Group weekly session (most recent)

## Participants
- **Matt Bailey** — SA host
- **Justin Day** — Agency owner, Austin TX
- **Bryan Fikes** — Member (presented command center)
- **Michael Vassar** — Member (auto-site limit issue)
- **Clayton Joyner** — Member (screen shared, building agency management system)
- **Noah** — New member, healthcare agency (127 employees, 2 brands, 500 customers)
- **Jonathan Duque (JD)** — SA support

## Action Items
- [ ] Coordinate w/ Maddy to update MCP GitHub docs w/ schemas/missing tools — **Jonathan Duque** @ 19:23
- [ ] Post setup checklist in Circle; request completion/issues from members — **Jonathan Duque** @ 26:55
- [ ] Schedule 1:1 w/ Michael re: file structure/MCP setup — **Jonathan Duque** @ 28:44
- [ ] Share multi-agent design framework on next call — **Clayton Joyner** @ 1:00:05
- [ ] Email Matt support ticket #s re: auto-site limit; then JD resolve limit — **Michael Vassar** @ 1:21:05

## Screen Sharing
- Matt Bailey started screen sharing @ 18:21 (showing Bryan's work in Circle)
- Clayton Joyner started screen sharing @ 44:37

> **Visual analysis:** See `AMM-Internal/clayton-screenshare-analysis.md` for full frame-by-frame breakdown of what was on Clayton's screen (Lucidchart system, Google Sheets client doc, quoting app UI). 22 screenshots captured, timestamps 44:37–1:00:00.

---

## Member Wins & Updates

### Bryan Fikes — Agentic Command Center (100% Automated, End-to-End)
Bryan's most advanced build yet: a full command center for his agency.

**What's connected:**
- Bank accounts and credit cards
- ClickUp (operations)
- Slack
- Gmail
- Alex Hormozi books ($100M Leads, $100M Offers, $100M Money Models) — uploaded PDFs, created modules that grade his business in real time and coach him toward scaling

**Key feature:** New project onboarding automation
1. Add new project → triggers onboarding process
2. Takes onboarding call transcript → feeds to system
3. System fills out all corresponding client information
4. Grades the client based on business maturity
5. Identifies visibility gaps and what makes sense for the client

> *"100% automated end to end with the hooks and everything like that."* — Bryan

**Future goal:** Apply this same framework to the mastermind — agents that run things agenetically, reporting to memory files rather than through the chat interface.

### Justin Day — Supabase Dashboard (Client-Facing Interface)
Justin built a command center connected to Supabase with user auth and a real-time front-end interface.

- Add users in real time
- User permissions — clients see only what they need
- Local for now, not yet pushed online
- Purpose: give clients and team members a non-scary interface instead of living in the Warp terminal

> *"I connected it to Supabase and be able to add users in real time. I haven't pushed it online yet. But yeah, the whole purpose of that is to give that user interface and experience — share all this information in one place versus living in the Warp channel. I think that can be scary for people."*

Noah (new member) immediately asked if Justin had thought about making it shareable with a larger team:
> *"I was wondering if that includes as well an interface that you can share with your team — yeah, like a front-end type of interface."*

### Noah — New Member (Healthcare, 127 Employees)
Noah joined recently. Context:
- **Agency:** 127 employees, 2 brands, ~500 customers
- **Vertical:** Healthcare — HIPAA compliance is a hard constraint on where/how data is sourced and who accesses it
- **Current work:** Building an authorization layer between the SA MCP and their users (two separate SA accounts, one per brand; users must be routed to correct account)
- **Technical state:** Built-in RST team using Claude plugin for repetitive work; a handful of technical users (Noah, Luke/co-founder, few others) — rest are non-technical
- **Launched:** Anthropic managed agents infrastructure the day before this session — took existing skills and deployed there overnight ("super easy")

**SA MCP GitHub docs issue Noah raised:**
Going through the MCP docs, found them incomplete — schemas not built out for many tools, LLMs get confused without them. Noah's team has already started building schemas on their own.

Asked: *"If we do things like that, do you want us to submit a pull request to the repository so that can be updated?"*

JD's response: Loop in Maddy (who built the repo); pull requests are absolutely welcome. Aligned with what SA wants.

**SA GitHub PR collaboration confirmed:** Noah's team + JD/Maddy to collaborate on MCP docs.

**Noah's May 1st launch:** Launching a product to build AI websites at a client event.

### Michael Vassar — Auto-Site Limit Issue
Michael is stuck at **6 auto-sites** on his account for over a week. Support ticket submitted but no resolution. Main account: gbp.digitalcoastmarketing.com.

After the main session, Michael stayed on to discuss with Matt and JD directly:
- Matt: "I don't see an enterprise-level ticket right now on something like that, so... I can fix that for you right away."
- **Resolution:** Matt/JD taking ownership directly. Michael told to contact Matt or JD directly going forward — bypass the support funnel.

---

## Matt Bailey Screen Share @ 18:21 — Roto-Rooter 4-Playbook Audit Preview

Matt shared the comprehensive visibility audit built for a real client (Roto-Rooter / LinkGraph). Monday's session with Monik will teach members to build this for their own clients.

**Visible in screen share:** Multi-page HTML report — technical audit + content audit + paid search audit + AI visibility all merged. Quick wins table with keyword opportunities (position, CPC, difficulty). Content production pipeline with phased automation. AI/LLM visibility metrics section. Deep SEO cannibalization + topical gap analysis. Proposed mini-sites section.

**4 playbooks:** SEO/visibility audit, content audit, paid search audit, AI visibility.

---

## Bryan Fikes — mftfinder.com (New Build)

Bryan also launched **mftfinder.com** — a marriage and family therapist directory built with Claude, pulling from a therapist database. Already live. This is the "review-style directory / third-party authority site" from Monik's assignment.

---

## JD — Moving to Full-Time Mastermind Coaching Role 🚨

JD announced on this call that he is moving to a **full-time Mastermind coaching role**. This is a formal role change, not just expanded duties.

---

## Clayton Joyner Screen Share @ 44:37 — Lucidchart Web Production System + Quoting Calculator SaaS

Clayton's most detailed screen share yet. Two major demos plus the ad pipeline concept.

### Lucidchart-Based Web Production System
**Client journey (full flow):** Onboarding → copy → theme → wireframe → page-by-page design → QA → GBP audit → redirect plan → NAP/citation work

**Page hierarchy:** Core (about/homepage/contact) / Service/inner (parent-child) / Compliance / CMS collection pages

**Design category system** (eliminates design paralysis):
- Medical/Professional | Playful | Luxury/Red Carpet | High Fashion
- Each has predetermined component libraries + stock photo direction

**Approval gates (human-in-loop):** theme → homepage → collection pages → core pages

**Key insight:** *"Doing copy before design eliminates 90% of revision cycles. Theme approval stage is where all client feedback concentrates."* → **93% reduction in client revisions.**

### Quoting Calculator SaaS App (~1 week build)
Stack: Claude Code + GitHub + Vercel + Supabase
- **Market:** Home services industry
- **Tiers:** Platform admin / reseller / user
- Material + labor + permitting cost indexes for all 50 states; zip code material lookup
- Lead magnet calculators with embed code + QR code generator
- GoHighLevel + HubSpot native integrations; white-labeled per brand
- **Revenue model:** $9/month reseller — onboarding wizard in progress
- Live demo shown (roofing example with working zip code lookup)

**Side project:** Star Wars RPG character sheet app (Claude Code + GitHub + Vercel + Supabase OAuth) — for learning.

### Multi-Agent Ad Creative Pipeline (also discussed)

Clayton presented his most advanced concept yet: a **chained multi-agent ad creative system.**

**Pipeline:**
1. **Research phase** — deep listening from social media, identifying what worked and why, finding top-performing assets
2. **Codify** — extract the causation of past success into a replicable framework
3. **Copy building** — AI builds ad copy based on research
4. **Compliance guard** — runs copy through Facebook/Google compliance; if rejected, sends back to copywriter
5. **Split test generation** — unlimited split tests automatically
6. **Dialect/region awareness** — programmatic writer understands local nomenclature by region

**Memory layer:**
Clayton is extracting internal conversations from ClickUp, Slack, Teams into "process personality" files — not copying a person's personality, but their process approach. These become training data for agents that then replicate and adapt those processes.

**Flywheel:**
> *"You're completing the flywheel, right? I did X. The goal was Y. Here's Z is the outcome. Now let me hypothesize all the other refractive options that I might have to improve that Z. And then let's build our test and keep going through that flywheel."*

**Token efficiency note:**
> *"That really is also the token saver because the responses — the outputs — those take five times what you input. So by transforming that into parallel agents working locally in the backend, registered directly to the memory files, you go through that instead of talking, because the machine is going to translate what it's doing."*

**JD's reaction:** Wants to flag this for Monik and Armand — "you've got to take a look at this."

**Clayton's ultimate goal:** Agency management system (production layer + client portal) that doesn't yet exist as a software product.

---

## SA MCP GitHub Docs — Coordination Item

Noah raised, JD confirmed, action item created:
- MCP GitHub repo documentation is incomplete — many tools have no schemas defined
- Without schemas, LLMs get confused and hallucinate tool usage
- Noah's team has already started adding schemas on their side
- **JD to coordinate with Maddy (repo owner) to accept PRs and update docs**
- This is an open contribution opportunity for technical AMM members

---

## Transcript (Key Moments)

**Matt Bailey:** Hello, everybody. I just did a Google Meet, and it messed up all my microphones. So, and my speakers. Someone say something, so I know my speakers are working.

**Justin Day:** Matt, you are the sexiest guy in this group.

**Matt Bailey:** And they're not working yet.

**Justin Day:** I was just going to say it. I resign.

**Matt Bailey:** There we go.

---

**Matt Bailey:** First thing, I want to know — what have you been working on? What are some wins that you have experienced with the platform?

**Bryan Fikes:** Just a brief one. I have had some issues integrating with Website Studio, but my implementer Farhan, and I know JD are working hard. But man, this is amazing. When we're all creators and agency people and entrepreneurial and business-minded, God, we can do so much with this.

**Michael Vassar:** I actually built an HTML report that I used for a client and did it. It was fast and it looked good. And it was their kickoff report and they were really happy. So that's the only thing I've done, but it was exciting.

**Justin Day:** Yeah, just spent most of my time building out my command center — tying in my bank, credit cards, operations from ClickUp, my Slack, my Gmail to create an executive assistant. I've tied in everything into my command center. I even uploaded PDFs of Alex Hormozi's books — $100M Leads, $100M Offers, $100M Money Models — created different modules based off of those books. I uploaded a PDF, had it create modules to grade where I'm at with my offers, leads, and everything in between in real time so that it could help coach me to scale the business. I believe I'm next to finish on that. I've been obsessed. I just keep finding more and more stuff to put in. But now I've got all my revenue and overhead and everything — I've literally got an agentic brain for my company now that does a lot.

**Matt Bailey:** Is all that automated? Are you stringing all those processes together?

**Justin Day:** 100% automated end to end with the hooks and everything like that.

---

**Noah:** We work in healthcare, so we have to be careful with HIPAA, and where and how we source data, and then how people actually get access. So we've had to build a whole authorization layer to make sure all that stays secure. We have an RST team with a Claude plugin for repetitive work. We're kind of in the early stages of trying to figure out how to deploy AI across the whole agency. I slid up last night — Anthropic launched their managed agents infrastructure yesterday. And so took some of our skills last night and deployed it there just to see how that would work. And it was like super easy to actually do versus in the past it hasn't been.

We're launching a product to build AI websites for instance at an event May 1st.

Going through the MCP docs — they're not up to date. We went through and tested each tool, there weren't schemas built out for each, and so the LLMs kept getting confused, and so we built some of that stuff out on our side already. Do y'all want us to submit like a pull request in the repository so that can be updated?

**JD:** I can definitely chip in with Maddy, because it's the one who actually built the repo. And yeah, no — you're the ones who are re-using it, so that aligns what we want you to be able to accomplish with that technology. I just want to make sure that he's on his plan. So yes, I got you.

---

**Clayton Joyner:** [screen share @ 44:37] The creative, as opposed to advertising copy, allows me to drop in funnel creation, and develop what needs to be in the funnel creation. The trick is in the research phase — how to pull in the top performing assets that we already know were [working], finding out how to codify those into a framework that then allows us to replicate what was the causation of why that worked. And then the deep listening from social media can then play a part in identifying that and being the scout to look for future opportunities. And then we pull that into one chained system that will ask a bunch of questions on the front end, do its own research, build its own copy, and then spit out all the advertisement that you want. You have unlimited split tests.

---

**Michael Vassar** (post-session): I can't get beyond six sites. I've been stuck there for about a week.

**Matt Bailey:** No worries. I'll handle it. I'll figure out what you've already submitted to support, but moving forward, just reach out to me or Matt directly, and we're going to take care of that. So you don't need to go through the support funnel anymore.

---

## Key Takeaways

1. **Bryan's command center** is the group's most operationally mature build — 100% automated from onboarding call transcript to gap analysis. Hooks, Supabase, email, ClickUp, Slack all connected.
2. **Noah's healthcare agency** is the highest-stakes deployment — HIPAA constraints, 127 employees, authorization layer needed. Their MCP docs work (schemas) is a major contribution SA should accelerate.
3. **Clayton's multi-agent ad pipeline** — research → codify → copy → compliance guard → split test. Flywheel model where agents learn from outcomes. JD flagging for Monik/Armand.
4. **MCP GitHub docs are broken** — Noah confirmed, schemas missing for many tools. SA needs to prioritize this with Maddy. Noah's team ready to contribute via PR.
5. **Michael Vassar's auto-site limit** — resolved post-session, Matt taking ownership. Direct line to Matt/JD going forward, no support funnel.
