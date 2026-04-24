# Golden Rules

Hard-won rules for reliable SearchAtlas MCP tool usage. Follow these to avoid common pitfalls.

---

## Rule 1: Schema Discovery First

**Before calling ANY tool for the first time**, send it with empty params `{}` to discover the real schema.

Documentation may be outdated — the actual API response shows the correct parameter names, types, and required fields.

```
Step 1: Call the tool with op: "help" and params: {} to see all operations
Step 2: Call with the specific op and params: {} to see that operation's schema
```

**Why this matters:** Tool schemas evolve. A parameter named `project_id` in docs might actually be `otto_project_id` in the API. Discovery prevents wasted calls.

---

## Rule 2: Read Error Messages Carefully

Error responses contain the information you need to fix the call:

| Error | What it means | What to do |
|-------|--------------|------------|
| **Parameter Validation Error** | Wrong params | The error response contains the correct schema — read it |
| **Internal Server Error** | Backend issue | Not your fault. Wait and retry |
| **"credentials not provided"** | Auth issue | Check API key in MCP config |
| **"Tool not found"** | Name changed | Run schema discovery again |
| **"404"** | Resource doesn't exist | Verify the ID — discover it via list/search first |

---

## Rule 3: Poll Async Tasks

Many operations return a **task ID** instead of immediate results. You must poll for completion.

**OTTO SEO tasks:**
```
1. Call the operation → receive task_id
2. Call get_otto_task_status with the task_id
3. If status != SUCCESS, call otto_wait (5-10 seconds)
4. Repeat steps 2-3 until status = SUCCESS
5. Read the result from the task response
```

**OTTO PPC tasks:**
```
1. Call the operation → receive task_id
2. Call get_otto_ppc_task_status with the task_id
3. If not complete, call wait (5-10 seconds)
4. Repeat until complete
```

**Content generation:**
```
1. start_information_retrieval → poll_information_retrieval (until completed)
2. start_headings_outline → poll_headings_outline (until completed)
3. generate_complete_article
```

**Common mistake:** Assuming an operation completed instantly. Always check the response — if it returns a task ID, you need to poll.

---

## Rule 4: Watch for Tool Name Collisions

Some short tool names map to multiple underlying tools. If a tool behaves unexpectedly:

1. Try the full prefixed name (e.g., `otto_project_management` instead of `project_management`)
2. Use schema discovery to verify which tool you're actually calling
3. Check the operation list — the wrong tool may have similar-sounding operations

**Known collisions:**
- `project_management` — could be OTTO SEO or generic
- `content` — could be press release content or article content
- `distribution` — could be press release or cloud stack

---

## Rule 5: Never Hardcode IDs

Project IDs, location IDs, business IDs, brand vault IDs — **always discover them via API first.**

```
Bad:  Use project_id: "12345" (hardcoded)
Good: Call list_otto_projects → find the project → use the returned ID
```

IDs can change when resources are recreated, and differ between accounts. Always use the discovery → action pattern.

---

## Rule 6: Never Expose Secrets

- API keys come from `.env` or MCP config — **never print them in output**
- When sharing results (Slack, Circle, reports), only include public-safe data
- Never include raw UUIDs or internal IDs in user-facing output — use names and links instead

---

## Rule 7: Confirm Before Destructive Actions

Some operations have real-world consequences. **Always ask for confirmation before:**

- Publishing content to WordPress/CMS
- Deploying GBP changes (pushes to Google)
- Activating PPC campaigns (starts spending money)
- Distributing press releases (uses credits, can't be undone)
- Sending outreach emails (Digital PR)
- Deleting resources (projects, articles, campaigns)

**Pattern:**
```
Here's what will happen:
- {action description}
- {cost/impact}

Proceed? (yes/no)
```

---

## Rule 8: Follow the Workflow Order

Multi-step workflows have dependencies. Don't skip ahead.

**SEO Onboarding order:**
1. Project → 2. Audit → 3. Pillar scores → 4. Brand vault → 5. Keywords → 6. Topical map → 7. Articles

**PPC Launch order:**
1. Business → 2. Products → 3. Approve → 4. Keywords → 5. Send to Ads → 6. Activate

**Why:** Each step produces IDs and data that later steps need. Skipping steps causes missing data errors.

---

## Rule 9: Use the Dashboard Links

Every tool maps to a dashboard URL. Always include clickable links in output so users can verify results visually.

| Tool Category | Dashboard URL |
|--------------|---------------|
| OTTO SEO | `https://dashboard.searchatlas.com/otto/` |
| Brand Vault | `https://dashboard.searchatlas.com/brand-vault/` |
| Content | `https://dashboard.searchatlas.com/content/articles/` |
| Topical Maps | `https://dashboard.searchatlas.com/content/topical-maps/` |
| GBP | `https://dashboard.searchatlas.com/gbp/` |
| PPC / Smart Ads | `https://dashboard.searchatlas.com/otto-ppc/` |
| Press Releases | `https://dashboard.searchatlas.com/press-releases/` |
| Cloud Stacks | `https://dashboard.searchatlas.com/cloud-stacks/` |
| Digital PR | `https://dashboard.searchatlas.com/digital-pr/` |
| LLM Visibility | `https://dashboard.searchatlas.com/llm-visibility/` |
| Site Explorer | `https://dashboard.searchatlas.com/site-explorer/` |
| Local SEO | `https://dashboard.searchatlas.com/local-seo/` |
| Website Studio | `https://dashboard.searchatlas.com/website-studio/` |

---

## Rule 10: Handle Known Quirks

| Tool | Known Issue | Workaround |
|------|------------|------------|
| `brand_vault` | Intermittent auth errors | Retry 2-3 times; if persistent, create vault manually in dashboard |
| GBP `deploy_location` | Only works on verified locations | Check verification status first via `get_location` |
| GBP `get_location_stats` | Returns empty for new/low-traffic locations | This is normal — stats populate over time after verification |
| Content 4-step workflow | Each poll can take 30-60 seconds | Be patient — don't assume failure if polling takes time |
| Content `search_articles` | Does not filter by domain | Articles aren't domain-tagged. Use `get_article_summary` or `filter_articles_by_status` instead |
| PPC `business_crud` → `list` | Requires `google_ads_account_id` + `google_ads_client_id` | Call `ads_account_crud` → `list` first, then ask user to select an account |
| PPC `bulk_create_keyword_clusters` | Async, can take several minutes | Poll `get_otto_ppc_task_status` — don't proceed until complete |
| `project_management` | Tool name collision — may resolve to content project ops | If you get ops like `list_content_projects`, you hit the wrong tool. Use `OTTO_Installations` or `seo_analysis` for OTTO-specific work, or retry |

---

## Rule 11: Know the Parameter Names

Parameter naming is **inconsistent across tools**. The same concept uses different param names depending on the tool group. Always use schema discovery (Rule 1), but here's a cheat sheet:

### Brand Vault tools
| Operation | Key Parameter | Name |
|-----------|--------------|------|
| `retrieve_brand_vault_details` | vault ID | `brand_vault_uuid` |
| `get_brand_vault_business_info` | vault ID | `brand_vault_uuid` |
| `get_knowledge_graph` | domain | `hostname` |
| `get_brand_vault_overview` | domain | `hostname` |
| `list_voice_profiles` | domain | `hostname` |

**Pattern:** CRUD by UUID → uses `brand_vault_uuid`. Read-only by domain → uses `hostname`.

### Site Explorer tools (`organic`, `backlinks`, `analysis`, `adwords`)
All use `project_identifier` (not `domain`):
```
project_identifier: "example.com"    # domain works
project_identifier: "https://..."    # full URL works
project_identifier: "12345"          # project ID works
```

### GBP tools
All use `location_id` (integer, from `list_locations`).

### PPC tools
- `business_crud` → `list` needs `google_ads_account_id` + `google_ads_client_id`
- `product_crud` → uses `business_id`
- `campaign` → uses `business_id`

### OTTO tools
- Most use `project_id` (the OTTO project UUID)
- `holistic_audit` uses `domain` (plain domain string)

---

## Rule 12: Use Current Tool Names

Legacy tool names from early MCP versions still appear in some documentation and workflow templates. The API accepts both, but prefer the current names:

| Deprecated Name | Current Name |
|----------------|-------------|
| `BrandVaultTools` | `brand_vault` |
| `OTTO_Project_Management` | `project_management` |
| `OTTO_Audit_Management` | `audit_management` |
| `OTTO_Knowledge_Graph` | `brand_vault` (use `get_knowledge_graph` op) |
| `Site_Explorer_Holistic_Audit_Tool` | `holistic_audit` |
| `Site_Explorer_Keyword_Research_Tool` | `keyword_research` |
| `Site_Explorer_Backlinks_Tool` | `backlinks` |
| `Content_Generation_Tool` | `content_generation` |
| `Topical_Maps_Tools` | `topical_maps` |
| `Visibility_Analysis_Tools` | `visibility` |
| `Prompt_Simulator_Tools` | `prompt_simulator` |
| `otto_ppc_business_crud` | `business_crud` |
| `otto_ppc_product_crud` | `product_crud` |
| `otto_ppc_campaign` | `campaign` |

See [INTENT_MAPPING.md](INTENT_MAPPING.md) for the full deprecated → current mapping table.
