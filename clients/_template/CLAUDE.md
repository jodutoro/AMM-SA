# [Client Name] — Client Workspace

## Business Info
- **Name:** [Client business name]
- **Domain:** [example.com]
- **Industry:** [e.g. Home Services, Dental, Law Firm]
- **Location:** [City, State]
- **Phone:** [Phone number]
- **Primary keyword:** [e.g. "plumber miami fl"]

## SearchAtlas IDs
<!-- Populated automatically by /onboard-client -->
- **OTTO Project ID:** 
- **Brand Vault ID:** 
- **GBP Location ID:** 
- **PPC Business ID:** 

## Active Services
<!-- Mark which services are running for this client -->
- [ ] SEO — OTTO project + monthly maintenance
- [ ] GBP — profile optimization + monthly posts/reviews
- [ ] PPC — Google Ads campaigns
- [ ] Content — topical maps + article generation
- [ ] Authority — press releases + cloud stacks
- [ ] LLM Visibility — AI search monitoring

## Brand Context
<!-- Quick reference for Claude — full brand data in brand-profile.md -->
- **Voice:** [e.g. Professional & Reassuring]
- **Description:** [One-line business description]

## Notes
<!-- Any client-specific context Claude should know -->
- 

## Files
- Full brand data: `brand-profile.md`
- Plans: `plans/`

---

## Auto-Sync (Claude reads this — do not remove)

**On every session start, before doing any work:**
1. Read `brand-profile.md` and note the `Last pulled from SA` timestamp in the Sync section
2. Run a silent pull from the SearchAtlas brand vault using these 4 parallel calls:
   - `brand_vault` → `retrieve_brand_vault_details` (Brand Vault ID above)
   - `brand_vault` → `get_brand_vault_business_info` (Brand Vault ID above)
   - `brand_vault` → `get_knowledge_graph` (Domain above)
   - `brand_vault` → `list_voice_profiles` (Domain above)
3. If SA has any fields newer than `brand-profile.md`, update those fields silently
4. Update `Last pulled from SA` timestamp in the Sync section
5. Do not announce this to the user unless something changed — if data was updated, say: "Brand profile synced — [N] fields updated from SearchAtlas."

**After every session, before closing:**
1. Read `brand-profile.md` and compare it against what was pulled at session start
2. For any field that changed during this session, push it to SA using the correct tool:
   - Business / brand / logo / colors → `brand_vault` → `update_brand_vault` (Brand Vault ID)
   - Phone / email / address / hours → `brand_vault` → `update_brand_vault_business_info` (Brand Vault ID)
   - Voice / tone / style / transcripts → `brand_vault` → `update_refine_prompt` (Domain)
   - Entities / topics / competitors → `brand_vault` → `update_knowledge_graph` (Domain)
3. Update `Last pushed to SA` timestamp in the Sync section
4. Confirm each write succeeded before updating the timestamp
5. Say: "Brand profile synced to SearchAtlas — [N] fields pushed." or "No changes to push."
