# /onboard-client

Guided wizard to onboard a new client into SearchAtlas. Supports two paths: pulling full brand data automatically from an existing SearchAtlas brand vault, or setting up a brand new client from scratch.

## Instructions

### Phase 0: Choose Onboarding Path

Start by asking which scenario applies:

```
How would you like to onboard this client?

1. 🔄  Existing client in SearchAtlas — pull everything from their brand vault automatically
2. ✏️   New client — enter their details and create everything from scratch

Which option? (1 or 2)
```

---

## Path A — Existing Client (Brand Vault Pull)

Use when the client already has a brand vault in the member's SearchAtlas account.

### A1: Select Client From Account

1. Call `brand_vault` → `list_brand_vaults` with empty params `{}`
2. Display as a numbered list:
   ```
   Which client are you onboarding?
   1. Coastal Dental Group (coastaldentalgroup.com)
   2. Sunrise Home Services (sunrisehomeservices.com)
   3. Rivera Law Firm (riveralaw.com)
   ```
3. Member picks a number

### A2: Full Brand Vault Pull (4 parallel calls)

After selection, make all four calls simultaneously:

| Call | Tool | Params | What It Returns |
|------|------|--------|-----------------|
| 1 | `brand_vault` → `retrieve_brand_vault_details` | `brand_vault_uuid` | Full vault data: name, domain, logo URL, brand colors, description, assets |
| 2 | `brand_vault` → `get_brand_vault_business_info` | `brand_vault_uuid` | Contact info: address, city, state, zip, phone, email, hours, social links |
| 3 | `brand_vault` → `get_knowledge_graph` | `hostname` | Entity graph: main topics, semantic clusters, competitor entities |
| 4 | `brand_vault` → `list_voice_profiles` | `hostname` | Brand voice: tone, writing style, example phrases, active profile |

### A3: Discover Service IDs (parallel, while member reviews data)

Simultaneously fetch the IDs needed for this client's workflows:
- **OTTO Project ID** → `project_management` → `list_otto_projects`, match by domain
- **GBP Location ID** → `gbp_locations_crud` → `list_locations`, match by domain
- **PPC Business ID** → `business_crud` → `list_businesses`, match by domain

If an ID isn't found, mark as "not configured yet."

### A4: Confirm With Member

Present a summary of what was pulled — member confirms or edits specific fields:

```
Here's everything I pulled from your SearchAtlas brand vault:

━━ Business ━━━━━━━━━━━━━━━━━━━━━━━━━━
🏢  Name           Coastal Dental Group
🌐  Domain         coastaldentalgroup.com
🏷️  Industry       Dental Clinic
📍  Address        123 Ocean Blvd, Miami, FL 33101
📞  Phone          (305) 555-0182
✉️  Email          hello@coastaldentalgroup.com
🕐  Hours          Mon–Fri 8AM–5PM, Sat 9AM–1PM

━━ Brand ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📝  Description    [first 120 chars of description...]
🎨  Brand colors   #1A3C6E (primary), #F5F5F5 (background)
🖼️  Logo           [URL on file]
🔊  Voice profile  Professional & Reassuring (active)

━━ SEO & Content ━━━━━━━━━━━━━━━━━━━━━
🔑  Primary KW     dentist miami fl
🧠  Key entities   [top 5 from knowledge graph]
🏆  Competitors    [top 3 competitor domains]

━━ IDs ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔗  Brand Vault    [uuid]
🚀  OTTO Project   [project_id or: not configured]
📍  GBP Location   [location_id or: not configured]
💰  PPC Business   [business_id or: not configured]

Does this look right? (yes / edit any field)
```

→ Skip to **Phase 2: Identify Needs**

---

## Path B — New Client (Manual Setup)

Use when the client is not yet in SearchAtlas, or when the member prefers to enter details manually.

### B1: Collect Client Information

Ask the following one at a time:

**Business basics:**
1. **Client name** — business or brand name
2. **Domain** — primary website URL
3. **Industry** — what the business does (e.g., Dental Clinic, Home Services, Law Firm)
4. **Business description** — 2–3 sentences describing what they do and who they serve
5. **Phone number**
6. **Email**

**Location:**
7. **Full address** — street, city, state, zip
8. **Service areas** — additional cities/regions they serve (if any)

**SEO & Content:**
9. **Primary keyword** — their main pillar keyword
10. **Pillar URL** — the main page to build content around (e.g., /services)
11. **Top competitors** — 2–3 competitor domains to track

**Brand:**
12. **Brand voice / tone** — how they like to communicate (professional, friendly, authoritative, etc.)

### B2: Create Brand Vault

Create the brand vault with all collected info:
- `brand_vault` → `create_brand_vault` with business info
- `brand_vault` → `update_brand_vault_business_info` with contact details
- Note the new `brand_vault_uuid`

→ Continue to **Phase 2: Identify Needs**

---

## Phase 2: Identify Needs

Ask which services the client needs (works for both paths):

```
Which services does this client need?
(Type the numbers separated by commas, e.g. 1,2,4)

1. SEO     — OTTO project, audit, content, indexing
2. GBP     — Google Business Profile optimization
3. PPC     — Google Ads campaigns via Smart Ads
4. Content — Articles, topical maps, brand vault
5. PR      — Press releases, cloud stacks, digital PR
6. LLM     — AI search visibility monitoring
```

## Phase 3: Create Client Files

Create two files in the client's workspace folder:

### File 1: `clients/{client-slug}/CLAUDE.md`
Lean session context — loaded by Claude at the start of every session.
Copy from `clients/_template/CLAUDE.md` and populate all fields.

### File 2: `clients/{client-slug}/brand-profile.md`
Full brand data — loaded when running content, GBP, or SEO workflows that need brand context.
Copy from `clients/_template/brand-profile.md` and populate all fields pulled from the vault.

Also create: `clients/{client-slug}/plans/` directory

## Phase 4: Execute Setup

Based on service selections:

**If SEO selected:**
1. Load `workflows/seo-onboarding.yaml` — all client data already populated
2. Execute steps 1–7

**If GBP selected:**
1. Confirm GBP Location ID (discovered in A3 or find now)
2. Load `workflows/gbp-optimization.yaml`
3. Execute full optimization — brand description and voice from `brand-profile.md` inform GBP copy

**If PPC selected:**
1. Ask for Google Ads account ID and landing page URLs
2. Load `workflows/ppc-launch.yaml`

**If Content selected (without SEO):**
1. Brand vault exists — use voice profile from `brand-profile.md` for article generation
2. Build keyword research via `keyword_research` → `create_keyword_research_project`
3. Create topical map and generate articles

**If PR selected:**
1. Load `workflows/authority-building.yaml`
2. Ask for press release topic and angle

**If LLM selected:**
1. Load `workflows/llm-visibility.yaml`
2. Use competitor domains already captured in `brand-profile.md`

## Phase 5: Summary

```
✅ {Client Name} — Onboarding Complete

📁  CLAUDE.md         clients/{slug}/CLAUDE.md
📋  Brand Profile     clients/{slug}/brand-profile.md
🔗  Brand Vault       {brand_vault_uuid}
🚀  OTTO Project      {project_id}
📍  GBP Location      {location_id}

{emoji} {Product}  {result summary}  [View →](url)
...

{total} actions completed · {failed} failed
Next steps: {recommendations}
```

## Golden Rules

- **Always offer both paths** — never assume a client is new or existing; ask first
- **Pull everything on Path A** — run all 4 brand vault calls in parallel, not just business info
- **Two files per client** — CLAUDE.md (lean) + brand-profile.md (full brand data)
- **Schema discovery** — call any tool with `{}` before first use to see real schema
- **Never hardcode IDs** — discover all IDs via API
- **Poll async tasks** — poll with 5–10 second intervals until status = SUCCESS
- **Confirm before destructive actions** — ask before publishing, activating campaigns, deploying GBP
- **Never ask for data you can pull** — fetch silently and confirm, don't prompt
