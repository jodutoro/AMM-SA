---
tags: [workflow, seo, monthly, recurring]
source: agentic-mastermind/workflows/monthly-seo.yaml
---

# Monthly SEO Maintenance

**Template:** `monthly-seo` | **Version:** 1.0

> Monthly SEO cycle — suggestions, schema, indexing, content expansion, grading. Run every month for existing clients.

---

## Required Inputs

| Field | Description |
|---|---|
| `ids.otto_project_id` | REQUIRED — from onboarding |
| `ids.brand_vault_id` | REQUIRED — for content generation |
| `config.monthly_keyword` | New/expanded topical keyword this month |
| `config.pillar_url` | Page to expand from |
| `config.articles_to_generate` | Default: 4 |
| `config.articles_to_grade` | Existing articles to grade. Default: 5 |

---

## Steps

- [ ] **1. Get issues overview** — reprocess autopilot, review project state
- [ ] **2. Review + apply OTTO suggestions** — bulk apply all approved suggestions
- [ ] **3. Generate + deploy pending schemas** — list + deploy domain-level schemas
- [ ] **4. Check + fix indexing issues** — sitemaps + custom URLs + select for indexing
- [ ] **5. Create / expand topical map** — from monthly keyword → article titles
- [ ] **6. Generate articles** — 4-step per article (repeat × `articles_to_generate`)
- [ ] **7. Run content grader** — grade existing articles (repeat × `articles_to_grade`)

---

## Output Summary
```
✅  {client} — {period} Monthly SEO

🔧  Suggestions     {N} applied automatically
📋  Schema          {N} schemas deployed
🔗  Indexing        {N} URLs submitted
🗺️  Topical Map     {N} new article ideas
✍️  Content         {N} articles created · avg score {X}
📊  Content Grader  {N} articles graded
```

---

← [[../00-BRAIN-INDEX|Brain Index]] | Source: `agentic-mastermind/workflows/monthly-seo.yaml`
