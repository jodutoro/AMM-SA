# Clayton Joyner — Screen Share Analysis
**Meeting:** Agentic Marketing Mastermind Weekly, Apr 9, 2026
**Screen share start:** 44:37 | **Ended:** ~1:00:00 (verbal from ~62:00 onward)
**Source:** Fathom video frames extracted via Playwright canvas capture
**Screenshots:** `AMM-Internal/screenshots/clayton-screen-*.png`

> The transcript captured Clayton's verbal descriptions. This document captures what was **visually on screen** — the actual tools, data structures, and UI patterns he built.

---

## SECTION 1 — Lucidchart: Web Production System
**Timestamps:** 44:37–52:00 | **File:** `Production Strategy - MODRN Digital (Master).lucid`

Clayton built his entire agency production system inside Lucidchart. It is a single master document with multiple interconnected diagrams.

### 1A — The Approval Pipeline Grid (44:37)
`screenshot: clayton-screen-4437.png`

The top-level view is a horizontal grid where **columns = production phases** and **rows = page/section deliverable types**.

**Columns (left → right):**
1. Design
2. Initial Design Review
3. Design Package Review
4. Core Page Approvals (extends further right, cut off)

**Rows (repeating pattern per phase):**
- Section Content Order — `Approval?`
- Section Layout — `Approval?`
- Section Copy — `Approval?`
- Section Images — `Approval?`
- Home Page Layout — `Approval?`
- Service/Product Pg Layout — `Approval?`
- Relational Pg Layout — `Approval?`
- Specials Pg Layout — `Approval?`
- Specialty Pg Layout — `Approval?`
- Testimonial Pg Layout — `Approval?`
- About Dr Pg Layout — `Approval?`
- Patient Res Page — `Approval?`

**Key insight:** Every deliverable has an explicit `Approval?` gate. Nothing moves forward without sign-off. This is how he achieves 93% revision reduction — the approval is baked into the structure, not left to ad hoc communication.

---

### 1B — Page Taxonomy + Global Components Table (46:00–48:00)
`screenshots: clayton-screen-4600-lucidchart.png, 4700-lucidchart.png, 4800-lucidchart.png`

This is a separate table showing the full **site architecture taxonomy** used as the input to the approval grid above.

**Column 1 — Page Designs:**
- *Core Pages:* About Us, Contact Us, Patient Resources, Specials Pages, Testimonials, About Dr, Events, Media, Financial, Staff, Facility, FAQs, Providers, MISC
- *Procedure/Treatment Pages:* Parent Category Page, Procedure Page, Conditions Page, Symptoms Page

**Column 2 — Global Sections:**
- Header: CTA, Phone #, Geo Reference, Logo
- Navigation full structure:
  - About Us, Contact Us, Patient Resources, Specials Pages, Testimonials
  - Procedures (parent) → Face, Body, Breast, Non-Surgical, Skin Care, Injectables, Facial Rejuvenation (sub-items)

**Column 3 — Global Widgets:**
- Forms: "Schedule a consultation"
- Testimonials
- CTA Buttons: Request a Consultation, Learn More, See Examples, View Patient Photos

**Column 4 — Style Attributes:**
- Design Style options: Medical Professional | Playful | Luxury | High Fashion
- Font Families: H1, H2, H3, `<P>`, Button
- Color Schema: Primary, Secondary, Accent
- Logos

**Key insight:** The Design Style system (Medical/Playful/Luxury/High Fashion) is a pre-defined "style package." When a client onboards, you pick one. That choice locks in component library + stock photo direction automatically. No more blank-canvas design paralysis.

---

### 1C — Design Planning → Wireframe Flow (52:00)
`screenshot: clayton-screen-5200-content.png`

A separate Lucidchart flow showing the **client-facing phase sequence:**

```
[Design Planning Session]
  → Design Selections
  → Confirm Design Selections
  → Set Next Step Expectations
  → Recap Email

[WireFrame Review (Pkg 1)]
  → Global Design Choices
  → Home Page
  → Feedback with Client

[WireFrame (Revision) Review]
  → Global Design Choices
  → Home Page
  → Navigation
  → Footer
  → Collect Feedback / Approvals

[Photo Selection Review]
```

**Key insight:** Copy is done BEFORE any of this. The wireframe review phase only starts once copy exists. That's the source of the revision reduction — designers are never waiting on words, and clients can't change their mind on direction because copy already anchors it.

---

### 1D — Full Diagram Overview (49:00–51:00)
`screenshots: clayton-screen-4900-content.png, 5000-content.png, 5100-content.png`

These show the full Lucidchart canvas zoomed out — both the approval grid (left) and the taxonomy table (right) are connected in one document. You can see additional sections below the main grid that appear to be lower in the process (post-design phases). Too small to read at this zoom level but confirms the scope of the system.

---

## SECTION 2 — Google Sheets: Client Onboarding Document
**Timestamps:** 54:00–55:30 | **Real client:** MT Construction Group

This is the actual client deliverable doc Clayton uses during onboarding. It is a Google Sheets file with structured tabs.

### 2A — Website & SEO Plan (54:00)
`screenshot: clayton-screen-5400-content.png`

**Document title:** `MT Construction Group — Website & SEO Plan v2.0 | Commercial & Luxury Residential`

**Tabs visible across the bottom:**
Summary & Pricing | Notes | Core Pages | Service Pages | Blog Pages | Compliance Pages | GBP | Original Sitemaps | Redirect Plan | Workflow | Company Information

**"Summary & Pricing" tab contents:**
- Strategic pivot description: "Luxury residential contractor for affluent executives and high-net-worth homeowners"
- New positioning keywords: luxury residential, estate/home renovation, bespoke, historic restoration
- Target cities listed (local SEO targets)
- Domain action: new domain + redirect from old
- Target client: $500k–$3M+ projects

**Pricing breakdown table:**
| Page Category | Tab | # Pages | Grid Price | Subtotal | Notes |
|---|---|---|---|---|---|
| Commercial Service Pennies | Service Pages | 3 | $100 | $300 | Phase 1 |
| Location Landing Pages | Service Pages | (varies) | varies | varies | Phase 1 |
| (more rows below fold) | | | | | |

**Key insight:** This is the "discovery doc" Clayton sends clients. It maps the entire SEO + content strategy to a page-by-page build plan with exact pricing per page. The client can see exactly what they're buying.

### 2B — Company Information Tab (55:30)
`screenshot: clayton-screen-5600-quoting-app.png` *(tab: Company Information)*

This tab contains the full client intake form — pre-filled from onboarding:
- Business Legal Name, Description, Primary Phone, Owner
- Primary Address, D&C location info
- Owner/manager names + confirmation "Clients by Pivos confirmed via Pilovs rep/AI/platform team"
- Primary/Luxury Services listed
- Target Cities, Primary Markets
- Experience Markets
- Average Project Size
- UMP URL
- Agency Capacity note
- Website Status
- Contact Status

**Key insight:** This is the "process personality" data Clayton mentioned in his verbal explanation — structured client data that feeds into agents. The Company Information tab IS the client memory file.

### 2C — Core Pages Tab (55:00)
`screenshot: clayton-screen-5500.png`

Shows the actual page-by-page inventory for MT Construction Group with columns for page type, URL structure, content notes. Visible entries include core pages (Home, About, Contact) and service pages with parent/child structure.

---

## SECTION 3 — Quoting Calculator SaaS App
**Timestamps:** 56:30–1:00:00 | **Stack:** Claude Code + GitHub + Vercel + Supabase

### 3A — Reseller Dashboard (56:30)
`screenshot: clayton-screen-5630.png`

**App name not visible but UI shows:**
- Sidebar: Dashboard, Calculator Performance, Leads
- "Recent Companies" section — visible entries:
  - MT Construction Group
  - Home 4 Services
  - (2 more entries)
- Stats showing 0 leads / 0 submissions (likely demo reseller account)

**3-tier architecture visible in sidebar navigation** suggesting: platform admin > reseller > user levels.

### 3B — Permit Costs Database (57:00)
`screenshot: clayton-screen-5700.png`

A full admin table — **Permit Costs by jurisdiction and work type.** Columns appear to be: Jurisdiction | Category | Base Unit | Min Cost | Max Cost | notes. Dozens of rows across multiple states/counties. This is the data layer behind the zip-code-to-cost lookup.

### 3C — Lead Magnet Calculator — User View (57:30)
`screenshot: clayton-screen-5730.png`

**The actual end-user calculator front-end:**
- Headline: "How Much Will Your Project Cost?"
- Input field: "Where is the project located?" with zip code autocomplete showing results (e.g. "Clinton Springs Lake, TX", "Clinton County...")
- Clean minimal UI, dark-mode style

### 3D — Calculator Results Page (58:00)
`screenshot: clayton-screen-5800-quoting-app.png`

**The output page after zip code + project type input:**
- Headline range: **$7,865 – $10,873**
- Donut chart breaking down costs by category
- Line items visible:
  - Labor: ~$4K range
  - Equipment: ~$1–2K range
  - Materials: ~$1–2K range
  - Permits/fees: smaller amount
  - Total / subtotal rows

### 3E — Reseller Settings Pages (58:30–59:30)
`screenshots: clayton-screen-5830.png, 5900.png, 5930.png`

**Settings tabs visible:** Profile | Pricing | Company | Notifications | Integrations | Billing

**"Company" tab (5900):** Fields for Contact Fields, Custom HTML Language (for embedding), Thank-You Message, Results Page CTA Button — this is the white-label customization layer.

**"Notifications" tab (5930):** Email notifications toggle, Send Well Reminders, Use Delayed Notifications, other notification rules. Confirmation email flow visible.

**"Billing" tab (6000):** Shows "Upgrade Your Plan" → $9/month reseller tier. The upsell path for home service contractors.

---

## SECTION 4 — Ad Pipeline (verbal only, ~62:00+)
**Screen share ended before this discussion.** Clayton explained the concept verbally — no screen capture available. See transcript for full description.

Key concepts to follow up on:
- ClickUp/Slack/Teams conversation extraction → "process personality" files
- Chained agent pipeline: Research → Codify → Copy → Compliance Guard → Split Test
- Flywheel: "I did X → Goal was Y → Outcome was Z → Hypothesize improvements → Test"
- Token efficiency via parallel agents writing to memory files directly

---

## What to Apply to Your Own Processes

### Immediately replicable:
1. **The 4-column style package system** — Medical/Playful/Luxury/High Fashion maps directly to SA Website Studio design category presets. Create this decision tree for client onboarding.
2. **Copy-before-design gate** — make this an explicit policy in T2 triage tickets that involve site feedback. If a ticket says "design doesn't match brand," first question is always "was copy finalized before design started?"
3. **Google Sheets client doc structure** — the Summary & Pricing + Company Information tab pattern is replicable as a SA client intake template. The page inventory with per-page pricing is especially clean.
4. **Approval?-gated deliverable grid** — the Lucidchart approval grid maps directly to a ClickUp or Linear board. Each row is a task, each column is a status, and "Approval?" is a custom field.

### Longer-term study:
5. **The quoting calculator SaaS model** — $9/month reseller tier, white-labeled per brand, embed code + QR generator, GoHighLevel/HubSpot integrations. This is a standalone SaaS product built in 1 week with Claude Code + Vercel + Supabase. The business model (reseller layer between platform admin and end user) is the interesting part.
6. **"Process personality" files** — extracting internal comms (ClickUp/Slack/Teams) into structured memory files for agents. This is essentially the same thing you're doing with the brain system but applied to client-facing agency processes.

---

## Screenshot Index

| File | Timestamp | What it shows |
|---|---|---|
| `clayton-screen-4437.png` | 45:30 | Lucidchart approval grid — Design → Core Page Approvals columns |
| `clayton-screen-4600-lucidchart.png` | 46:00 | Page taxonomy — Core/Procedure pages + Global Sections/Widgets/Style Attrs |
| `clayton-screen-4700-lucidchart.png` | 47:00 | Same table zoomed in — Navigation full structure visible |
| `clayton-screen-4800-lucidchart.png` | 48:00 | Global Widgets + Style Attributes detail |
| `clayton-screen-4900-content.png` | 49:00 | Full Lucidchart canvas zoomed out |
| `clayton-screen-5000-content.png` | 50:00 | Both approval grid + taxonomy side by side |
| `clayton-screen-5100-content.png` | 51:00 | Same zoomed-out view |
| `clayton-screen-5200-content.png` | 52:00 | Design Planning → Wireframe flow (client phase sequence) |
| `clayton-screen-5400-content.png` | 54:00 | MT Construction Group Google Sheets — Summary & Pricing + strategy |
| `clayton-screen-5500.png` | 55:00 | Google Sheets — Core Pages tab |
| `clayton-screen-5600-quoting-app.png` | 55:30 | Google Sheets — Company Information tab (client intake data) |
| `clayton-screen-5630.png` | 56:30 | Quoting app — Reseller Dashboard (Recent Companies) |
| `clayton-screen-5700.png` | 57:00 | Quoting app — Permit Costs admin database |
| `clayton-screen-5730.png` | 57:30 | Quoting app — User-facing calculator (zip code input) |
| `clayton-screen-5800-quoting-app.png` | 58:00 | Quoting app — Results page ($7,865–$10,873 with donut chart) |
| `clayton-screen-5830.png` | 58:30 | Quoting app — Reseller dashboard (different account, 0 leads) |
| `clayton-screen-5900.png` | 59:00 | Quoting app — Settings: Company tab (white-label fields) |
| `clayton-screen-5930.png` | 59:30 | Quoting app — Settings: Notifications tab |
| `clayton-screen-6000-quoting-app.png` | 60:00 | Quoting app — Billing: Upgrade Your Plan ($9/mo) |
| `clayton-screen-6200-ad-pipeline.png` | 62:00 | Clayton on camera (screen share ended) |
| `clayton-screen-6400-ad-pipeline.png` | 64:00 | JD on camera |
| `clayton-screen-6600-ad-pipeline.png` | 66:00 | Clayton on camera (verbal ad pipeline discussion) |
