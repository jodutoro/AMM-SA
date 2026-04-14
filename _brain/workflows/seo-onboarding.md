---
tags: [workflow, seo, onboarding, client]
source: agentic-mastermind/workflows/seo-onboarding.yaml
---

# New Client SEO Onboarding

**Template:** `new-client-seo` | **Version:** 1.0

> Full SEO onboarding — project setup, audit, brand vault, keyword research, topical map, first content batch.

Copy `seo-onboarding.yaml` to `plans/clients/{client-slug}/{YYYY-MM}.yaml` and fill in variables.

---

## Required Inputs

| Field | Description |
|---|---|
| `client` | Client name, e.g. "Acme Digital Marketing" |
| `domain` | Client domain, e.g. "example-client.com" |
| `period` | Month, e.g. "2026-02" |
| `config.pillar_keyword` | Primary keyword, e.g. "digital marketing services austin" |
| `config.pillar_url` | Target page URL |
| `config.target_location` | Geo target, e.g. "Austin, TX" |
| `config.articles_to_generate` | First batch size (default: 4) |

---

## Steps

- [ ] **1. Create & verify OTTO project** — `engage_otto_project` + `verify_otto_installation` → saves `otto_project_id`
- [ ] **2. Create site audit** — `create_audit` → saves `audit_id`
- [ ] **3. Get holistic SEO pillar scores** — Technical, Content, Authority, UX
- [ ] **4. Create brand vault + voice profile** — saves `brand_vault_id` ⚠️ may have auth issues, retry if needed
- [ ] **5. Build keyword research project** — `create_keyword_research_project` → saves `keyword_research_id`
- [ ] **6. Create topical map** — from pillar keyword → saves `topical_map_id` + article titles
- [ ] **7. Generate first article batch** — 4-step per article: create → info retrieval → headings → generate

---

## Output Summary
```
✅  {client} — {period}

🏗️  OTTO Project    installed + verified
🔍  Site Audit      created · pillar scores: T/C/A/UX
🏷️  Brand Vault     created + voice profile set
🔑  Keywords        research project built
🗺️  Topical Map     {N} article ideas generated
✍️  Content         {N} articles created · avg score {X}
```

---

← [[../00-BRAIN-INDEX|Brain Index]] | Source: `agentic-mastermind/workflows/seo-onboarding.yaml`
