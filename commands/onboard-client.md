# /onboard-client

Guided wizard to onboard a new client into SearchAtlas. Supports two paths: pulling data automatically from an existing SearchAtlas brand vault, or setting up a brand new client from scratch.

## Instructions

### Phase 0: Choose Onboarding Path

Start by asking which scenario applies:

```
How would you like to onboard this client?

1. 🔄  Existing client in SearchAtlas — pull data automatically from their brand vault
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

### A2: Auto-Fetch Client Data

After selection, silently fetch:
- `brand_vault` → `get_brand_vault_business_info` (param: `brand_vault_uuid`) — name, industry, location
- `brand_vault` → `get_brand_vault_overview` (param: `hostname`) — primary keywords, positioning

Then show a confirmation block — member reviews, not types:

```
Here's what I found in your SearchAtlas account:

🏢  Client       Coastal Dental Group
🌐  Domain       coastaldentalgroup.com
🏷️  Industry     Dental Clinic
📍  Location     Miami, FL
🔑  Primary KW   dentist miami fl

Does this look right? (yes / edit any field)
```

If member says "edit", prompt only for the specific fields they want to change.

### A3: Discover Service IDs (Silent)

While member reviews the confirmation, silently fetch:
- **OTTO Project ID** → `project_management` → `list_otto_projects`, match by domain
- **Brand Vault ID** → already known from list
- **GBP Location ID** → `gbp_locations_crud` → `list_locations`, match by domain
- **PPC Business ID** → `business_crud` → `list_businesses`, match by domain

If an ID isn't found, mark as "not configured yet" — the member sets it up when running that workflow.

→ Skip to **Phase 2: Identify Needs**

---

## Path B — New Client (Manual Setup)

Use when the client is not yet in SearchAtlas, or when the member prefers to enter details manually.

### B1: Collect Client Information

Ask the following, one at a time (or present as a form):

1. **Client name** — business or brand name
2. **Domain** — primary website URL
3. **Industry** — what the business does (e.g., Dental Clinic, Home Services, Law Firm)
4. **Target location** — city/state they serve
5. **Primary keyword** — their main pillar keyword (e.g., "plumber miami fl")
6. **Pillar URL** — the main page to build content around (e.g., /services)

### B2: Create Brand Vault

If not already in SearchAtlas, create the brand vault:
- `brand_vault` → `create_brand_vault` with collected business info
- Note the new `brand_vault_uuid` for the plan file

→ Continue to **Phase 2: Identify Needs**

---

## Phase 2: Identify Needs

Ask which services the client needs (multi-select, works for both paths):

```
Which services does this client need?
(Select all that apply — type the numbers separated by commas)

1. SEO     — OTTO project, audit, content, indexing
2. GBP     — Google Business Profile optimization
3. PPC     — Google Ads campaigns via Smart Ads
4. Content — Articles, topical maps, brand vault
5. PR      — Press releases, cloud stacks, digital PR
6. LLM     — AI search visibility monitoring
```

## Phase 3: Create Client Folder + Plan File

After confirmation, create the client's local workspace:

1. Create folder: `clients/{client-slug}/`
2. Copy `clients/_template/CLAUDE.md` → `clients/{client-slug}/CLAUDE.md`
3. Populate all fields (IDs, business info, active services checkboxes)
4. Create `clients/{client-slug}/plans/` directory

The CLAUDE.md should be fully populated — the member should not need to fill in anything manually after this step.

## Phase 4: Execute Setup

Based on service selections, run the appropriate workflows:

**If SEO selected:**
1. Load `workflows/seo-onboarding.yaml`
2. Fill in all client info (already discovered)
3. Execute steps 1–7 (project → audit → pillar scores → brand vault → keywords → topical map → articles)

**If GBP selected:**
1. Confirm GBP Location ID (from Phase A3 or discovered now)
2. Load `workflows/gbp-optimization.yaml`
3. Execute full optimization

**If PPC selected:**
1. Ask for Google Ads account ID and landing page URLs (not auto-discoverable)
2. Load `workflows/ppc-launch.yaml`
3. Execute campaign setup

**If Content selected (without SEO):**
1. Brand vault exists (auto-discovered or just created)
2. Build keyword research via `keyword_research` → `create_keyword_research_project`
3. Create topical map and generate articles

**If PR selected:**
1. Load `workflows/authority-building.yaml`
2. Ask for press release topic and angle
3. Execute press release + cloud stack + digital PR

**If LLM selected:**
1. Load `workflows/llm-visibility.yaml`
2. Ask for competitors and prompts to simulate
3. Execute visibility audit

## Phase 5: Summary

After all workflows complete, present a consolidated summary:

```
✅ {Client Name} — Onboarding Complete

📁  Client folder    clients/{slug}/CLAUDE.md created
🔗  Brand Vault      {brand_vault_uuid}
🚀  OTTO Project     {project_id} (or: not configured)
📍  GBP Location     {location_id} (or: not configured)

{emoji} {Product}  {result summary}  [View →](dashboard_url)
...

{total} actions completed · {failed} failed
Next steps: {recommendations}
```

## Golden Rules

- **Always offer both paths** — never assume a client is new or existing; ask first
- **Brand vault first on Path A** — call `list_brand_vaults` before asking member for any data
- **Schema discovery** — call any tool with empty params `{}` before first use to see the real schema
- **Never hardcode IDs** — discover all project/location/business IDs via API
- **Poll async tasks** — many operations return task IDs, poll with 5–10 second intervals until complete
- **Confirm before destructive actions** — always ask before publishing content, activating campaigns, or deploying GBP changes
- **Never ask for data you can pull** — if it's in the brand vault, fetch it and confirm, don't prompt
