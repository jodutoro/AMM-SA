---
tags: [workflow, ppc, google-ads, campaign]
source: agentic-mastermind/workflows/ppc-launch.yaml
---

# PPC Campaign Launch

**Template:** `ppc-launch` | **Version:** 1.0

> PPC campaign launch — business setup, products, keyword clusters, Google Ads submission, activation.

---

## Required Inputs

| Field | Description |
|---|---|
| `config.business_name` | Client business name |
| `config.business_type` | e.g. "aesthetic medicine clinic" |
| `config.landing_pages` | List of `{url, name}` pairs |
| `ids.ads_account_id` | Google Ads account to link |
| `config.daily_budget_usd` | Default: 50 |
| `config.campaign_type` | SEARCH / DISPLAY / PERFORMANCE_MAX |
| `config.target_location` | e.g. "Cape Coral, FL" |
| `config.keywords_per_product` | Default: 20 |

---

## Steps

- [ ] **1. Create + validate business** → saves `ppc_business_id`
- [ ] **2. Generate + add products** — from landing pages (iterate per page)
- [ ] **3. Validate landing page URLs + approve products** — bulk operations
- [ ] **4. Bulk create keyword clusters** — per product, per location
- [ ] **5. Set campaign budget + send to Google Ads** — link to ads account
- [ ] **6. Activate campaigns** — bulk set remote status to ENABLED
- [ ] **7. Create landing pages** (optional — only if `create_landing_pages: true`)

---

## Output Summary
```
✅  {client} — PPC Campaign Launch · {period}

🏢  Business        created + validated
🛍️  Products        {N} products generated from landing pages
🔑  Keywords        {N} clusters created · {K} total keywords
📤  Google Ads      campaigns sent to account
▶️  Campaigns       activated + running
```

---

← [[../00-BRAIN-INDEX|Brain Index]] | Source: `agentic-mastermind/workflows/ppc-launch.yaml`
