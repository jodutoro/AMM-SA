---
name: Design Process Upgrades — From Clayton Joyner Apr 9
description: Solo-operator takeaways from Clayton's Apr 9 screen share — what applies when you're a one-person operation with direct client relationships
type: project
---

# Design Process Upgrades from Clayton (Solo Context)

Source: `AMM-Internal/clayton-screenshare-analysis.md` + Apr 9 screen share frames

> JD is a one-person operation. Clayton's system is built for an agency with multiple designers, reviewers, and approval chains. Filter accordingly — keep the thinking, drop the process theater.

---

## 1. The 4-Style Design Package System ✅ Directly Applicable

**What it is:** Four locked design styles — Medical Professional / Playful / Luxury / High Fashion. Picking one at onboarding locks in font families, color schema, stock photo direction. No more blank-canvas decisions.

**Why it works solo:** You make the decision once per client, not per page. Every future design question answers itself — "does this match the style we picked?" That's it.

**Apply now:**
- Bella Caramella → **Luxury / High Fashion**
- Luna Nolasco → **Luxury** (personal brand variant: warmer, story-first)
- For new clients: add one question to intake — "pick the vibe" — and map their answer to one of the 4 styles. The rest follows.

Build a one-page reference card: each style = 2 reference sites + one font pairing + one palette rule + one photography description. Use it to pitch direction at kickoff instead of showing mood boards.

---

## 2. Copy-Before-Design ✅ Directly Applicable

**What it is:** Copy is done and approved before any visual work starts.

**Why it works solo:** You're doing both copy and design yourself. The discipline here is about *client commitment*, not team handoffs — once copy is signed off, the client can't keep shifting the message while you're building.

**Apply now:**
- Make it a contract point: "Design begins after copy is approved."
- When a client sends design feedback that's really a messaging problem — recognize it immediately and redirect: "Let's fix the copy, then the design will follow."
- For T2 triage context: most "design looks wrong" tickets are actually copy-not-finalized problems.

---

## 3. Google Sheets Client Doc — The Company Information Tab ✅ Directly Applicable

**What it is:** A structured intake sheet per client with: business name, positioning, services, target cities, owner info, tone, prior campaigns, etc.

**Why it works solo:** This is your Claude context file. Instead of re-explaining the client every session, you load this sheet → paste relevant fields → Claude already knows who they are and what they're building.

**Apply now:**
- Create one for Bella Caramella and one for Luna Nolasco if they don't already exist in the maps.
- Minimum fields: business name, product/service, target customer, tone of voice, what they've tried, what's worked, what's off-limits.
- Keep it in the client's map file or as a separate `[client]-context.md` in `_brain/maps/`.

---

## 4. The SaaS-in-a-Week Stack ✅ Keep as Reference

**Stack:** Claude Code + GitHub + Vercel + Supabase

This isn't about building a product right now — it's knowing the pattern exists. Anytime a client needs a calculator, a form with results, a directory, a lead magnet with a backend — this stack can deliver it in days, not weeks.

The key insight from Clayton's build: the data layer (permit costs by jurisdiction) is what made it valuable. The UI is trivial. **The data structure is the product.**

---

## 5. Approval Grid → Skip

Clayton's multi-column approval grid (Design / Initial Design Review / Design Package Review / Core Page Approvals) is built for a team where multiple people hand off deliverables. Solo, this is overhead with no benefit. 

**What to keep instead:** The *categories* he tracks — content order, layout, copy, images per page. Use these as a personal checklist per page, not a cross-team approval flow.

---

## 6. Process Personality Files ✅ Already Doing This

Your `_brain/` system is this. The value Clayton sees in it is real — he's just implementing it for the first time. You're ahead here. The one thing to add: a per-client version.

Create `[client]-context.md` per client with decisions made, tone rules, what the client responds to, constraints. Load it at the start of every client session.

---

## What to Do First

| Action | Context |
|---|---|
| Create 4-style reference card | Use for all future client kickoffs — pick the style, lock decisions |
| Copy-before-design as client rule | Add to contract or at least to kickoff conversation |
| Build client context files for Bella Caramella + Luna Nolasco | Load into Claude at session start |
| File the Vercel+Supabase stack pattern | Use when clients need a lead magnet or interactive tool |
