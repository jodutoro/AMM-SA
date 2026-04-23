# /onboard-client

Guided wizard to onboard a new client into SearchAtlas. Pulls client data directly from the SearchAtlas brand vault — no manual data entry needed.

## Instructions

### Phase 0: Pull From Brand Vault (Auto-Discovery)

Before asking the user anything, pull existing client data from their SearchAtlas account:

1. Call `brand_vault` → `list_brand_vaults` with empty params `{}`
2. Display the list as a numbered menu:
   ```
   Which client are you onboarding?
   1. Coastal Dental Group (coastaldentalgroup.com)
   2. Sunrise Home Services (sunrisehomeservices.com)
   3. ...
   0. New client (not in SearchAtlas yet)
   ```
3. **If member picks an existing brand vault:**
   - Call `brand_vault` → `get_brand_vault_business_info` with `brand_vault_uuid` from the list
   - Call `brand_vault` → `get_brand_vault_overview` with `hostname` from the list
   - Extract and confirm with member:
     - **Client name** — from business info
     - **Domain** — from brand vault
     - **Industry** — from business info
     - **Location** — from business info (city, state)
     - **Primary keyword** — top keyword from brand vault overview
   - Show a confirmation block:
     ```
     Here's what I found in your SearchAtlas account:

     🏢  Client       Coastal Dental Group
     🌐  Domain       coastaldentalgroup.com
     🏷️  Industry     Dental Clinic
     📍  Location     Miami, FL
     🔑  Primary KW   dentist miami fl

     Does this look right? (yes / edit)
     ```
   - If member says "edit", prompt only for the fields they want to change

4. **If member picks "0 — New client":**
   - Fall back to Phase 1 manual collection below

### Phase 1: Manual Collection (New Clients Only)

Ask the user for the following (one question at a time):

1. **Client name** — business or brand name
2. **Domain** — primary website URL
3. **Industry** — what the business does
4. **Target location** — city/region they serve
5. **Primary keyword** — the pillar keyword for their niche
6. **Pillar URL** — the main page to build content around (e.g., /services)

### Phase 2: Discover Service IDs

Silently fetch the IDs needed for this client's workflows (show progress but don't ask member to provide these):

- **OTTO Project ID** → Call `project_management` → `list_otto_projects`, match by domain
- **Brand Vault ID** → Already known from Phase 0 (or create via `brand_vault` → `create_brand_vault` for new clients)
- **GBP Location ID** → Call `gbp_locations_crud` → `list_locations`, match by domain
- **PPC Business ID** → Call `business_crud` → `list_businesses`, match by domain

If a service ID isn't found (e.g., no GBP connected yet), note it as "not configured" — the member will set it up when they run that specific workflow.

### Phase 3: Identify Needs

Ask which services the client needs (multi-select):

- [ ] **SEO** — OTTO project, audit, content, indexing
- [ ] **GBP** — Google Business Profile optimization
- [ ] **PPC** — Google Ads campaigns via Smart Ads
- [ ] **Content** — Articles, topical maps, brand vault
- [ ] **Authority** — Press releases, cloud stacks, digital PR
- [ ] **LLM Visibility** — AI search monitoring

### Phase 4: Create Client Folder + Plan File

After confirmation, create the client's workspace:

1. Create folder: `clients/{client-slug}/`
2. Copy `clients/_template/CLAUDE.md` → `clients/{client-slug}/CLAUDE.md`
3. Fill in all discovered values (IDs, business info, active services)
4. Create `clients/{client-slug}/plans/` directory

The CLAUDE.md should be fully populated — the member should not need to fill in anything manually.

### Phase 5: Execute Setup

Based on service selections, run the appropriate workflows:

**If SEO selected:**
1. Load `workflows/seo-onboarding.yaml` template
2. Fill in all client info (already discovered)
3. Execute steps 1–7 (project → audit → pillar scores → brand vault → keywords → topical map → articles)

**If GBP selected:**
1. Confirm GBP Location ID (discovered in Phase 2, or help find it)
2. Load `workflows/gbp-optimization.yaml`
3. Execute full optimization

**If PPC selected:**
1. Ask for Google Ads account ID and landing page URLs (not auto-discoverable)
2. Load `workflows/ppc-launch.yaml`
3. Execute campaign setup

**If Content selected (without SEO):**
1. Brand vault already exists (discovered in Phase 0)
2. Build keyword research via `keyword_research` → `create_keyword_research_project`
3. Create topical map and generate articles

**If Authority selected:**
1. Load `workflows/authority-building.yaml`
2. Ask for press release topic and angle
3. Execute press release + cloud stack + digital PR

**If LLM Visibility selected:**
1. Load `workflows/llm-visibility.yaml`
2. Ask for competitors and prompts to simulate
3. Execute visibility audit

### Phase 6: Summary

After all workflows complete, present a consolidated summary:

```
✅ {Client Name} — Onboarding Complete

📁  Client folder    clients/{slug}/CLAUDE.md created
🔗  Brand Vault      {brand_vault_uuid}
🚀  OTTO Project     {project_id}
📍  GBP Location     {location_id} (or: not configured)

{emoji} {Product}  {result summary}  [View →](dashboard_url)
...

{total} actions completed · {failed} failed
Next steps: {recommendations}
```

## Golden Rules

- **Brand vault first** — always check `list_brand_vaults` before asking the member for any client info
- **Schema discovery** — call any tool with empty params `{}` before first use to discover the real schema
- **Never hardcode IDs** — discover all project/location/business IDs via API
- **Poll async tasks** — many operations return task IDs, poll with 5–10 second intervals until complete
- **Confirm before destructive actions** — always ask before publishing content, activating campaigns, or deploying GBP changes
- **Never ask for data you can pull** — if it's in the brand vault, fetch it silently and confirm, don't prompt
