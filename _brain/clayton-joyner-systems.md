---
name: Clayton Joyner Systems — Apr 9 Screen Share
description: Visual intelligence from Clayton's Apr 9 screen share — Lucidchart production system, Google Sheets client onboarding doc, quoting calculator SaaS architecture
type: project
---

Captured 22 screenshots from Clayton Joyner's screen share (44:37–1:00:00) in the Apr 9 AMM weekly session. Full analysis at `AMM-Internal/clayton-screenshare-analysis.md`.

## System 1 — Lucidchart Web Production System

**File:** `Production Strategy - MODRN Digital (Master)`

**Core structure:**
- Horizontal approval grid: each column = production phase, each row = deliverable type (Content Order / Layout / Copy / Images)
- Every cell has an explicit `Approval?` gate → this is the mechanism behind "93% revision reduction"
- Copy-before-design is a hard gate: wireframe phase doesn't start until copy exists

**Page taxonomy (built into the same doc):**
- Core pages, Procedure/Treatment pages, Compliance, CMS collection pages
- Global Sections: Header, Navigation (with full sub-menu structure)
- Global Widgets: Forms, Testimonials, CTA Buttons
- Style Attributes: 4 design styles (Medical Professional / Playful / Luxury / High Fashion), Font families, Color schema

**Design category system:** Picking a style locks in component library + stock photo direction automatically. Eliminates blank-canvas design paralysis.

**Client phase sequence (separate flow):** Design Planning Session → WireFrame Review (Pkg 1) → WireFrame (Revision) Review → Photo Selection Review

**Why:** These phases are visible in Lucidchart with exact sub-steps. Each phase ends with a structured feedback/approval step.

## System 2 — Google Sheets Client Onboarding Doc

**Real example shown:** MT Construction Group — Website & SEO Plan v2.0

**Tab structure:** Summary & Pricing | Notes | Core Pages | Service Pages | Blog Pages | Compliance Pages | GBP | Original Sitemaps | Redirect Plan | Workflow | Company Information

**Summary & Pricing tab:** Strategic pivot narrative + page-by-page inventory with Grid Price per page → client sees exactly what they're buying.

**Company Information tab:** Full structured client intake (name, services, target cities, positioning, owner info, etc.) — this is the "process personality" data that feeds agents.

**How to apply:** The Company Information tab is essentially a structured memory file for each client. Replicable as a SA client intake template.

## System 3 — Quoting Calculator SaaS App

**Built:** ~1 week | **Stack:** Claude Code + GitHub + Vercel + Supabase

**Architecture (3 tiers):** Platform Admin → Reseller ($9/mo) → End User (embeds calculator)

**Features visible in demo:**
- Lead magnet: "How Much Will Your Project Cost?" with zip code input → donut chart result ($7,865–$10,873 roofing example)
- Permit Costs admin database (per jurisdiction + work type)
- White-label settings: custom HTML, thank-you message, CTA button
- Email notification system, delayed notifications
- GoHighLevel + HubSpot native integrations (mentioned verbally)
- Embed code + QR code generator (mentioned verbally)

**Revenue model:** $9/month per reseller (home service company). Onboarding wizard in progress.

## System 4 — Ad Creative Pipeline (verbal, no screen)

Research (deep listening + top asset identification) → Codify (extract causation framework) → Copy build → Compliance guard (FB/Google, loops back to copy) → Split test generation (unlimited) → Dialect/region awareness

Memory layer: extracting ClickUp/Slack/Teams internal conversations → "process personality" files → agent training data

Flywheel: "I did X → Goal Y → Outcome Z → Hypothesize refractive options → Test → repeat"

**Why:** This is also the token efficiency argument — parallel agents writing to memory files directly, bypassing chat interface entirely.

## What to Apply

1. **4-style design system** → replicable in SA Website Studio onboarding
2. **Copy-before-design gate** → enforce in T2 site feedback tickets
3. **Google Sheets intake → Company Information tab** → template for SA client onboarding
4. **Approval grid in Lucidchart** → replicable as ClickUp/Linear board
5. **Quoting calculator SaaS model** → study the reseller tier pattern for SA tools
6. **"Process personality" files** → same concept as this brain system, applied to client-facing agency ops
