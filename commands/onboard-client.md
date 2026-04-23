# /onboard-client

Guided wizard to onboard a new client into SearchAtlas. Collects information, maps needs to tools, and executes the setup workflow.

## Instructions

### Phase 1: Collect Client Information

Ask the user for the following (one question at a time or in a form):

1. **Client name** — business or brand name
2. **Domain** — primary website URL
3. **Industry** — what the business does
4. **Target location** — city/region they serve
5. **Primary keyword** — the pillar keyword for their niche
6. **Pillar URL** — the main page to build content around (e.g., /services)

### Phase 2: Identify Needs

Ask which services the client needs (multi-select):

- [ ] **SEO** — OTTO project, audit, content, indexing
- [ ] **GBP** — Google Business Profile optimization
- [ ] **PPC** — Google Ads campaigns via Smart Ads
- [ ] **Content** — Articles, topical maps, brand vault
- [ ] **Authority** — Press releases, cloud stacks, digital PR
- [ ] **LLM Visibility** — AI search monitoring

### Phase 3: Execute Setup

Based on selections, run the appropriate workflows:

**If SEO selected:**
1. Load `workflows/seo-onboarding.yaml` template
2. Fill in client info
3. Execute steps 1–7 (project → audit → pillar scores → brand vault → keywords → topical map → articles)

**If GBP selected:**
1. Ask for GBP location ID (or help them find it via `gbp_locations_crud` → `list_locations`)
2. Load `workflows/gbp-optimization.yaml`
3. Execute full optimization

**If PPC selected:**
1. Ask for Google Ads account ID and landing page URLs
2. Load `workflows/ppc-launch.yaml`
3. Execute campaign setup

**If Content selected (without SEO):**
1. Create brand vault via `brand_vault` → `create_brand_vault`
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

### Phase 4: Summary

After all workflows complete, present a consolidated summary:

```
✅ {Client Name} — Onboarding Complete

{emoji} {Product}  {result summary}  [View →](dashboard_url)
...

{total} actions completed · {failed} failed
Next steps: {recommendations}
```

## Golden Rules

- **Schema discovery first** — call any tool with empty params `{}` before first use to discover the real schema
- **Never hardcode IDs** — discover all project/location/business IDs via API
- **Poll async tasks** — many operations return task IDs, poll with 5–10 second intervals until complete
- **Confirm before destructive actions** — always ask before publishing content, activating campaigns, or deploying GBP changes
