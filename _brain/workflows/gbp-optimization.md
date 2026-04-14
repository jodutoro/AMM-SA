---
tags: [workflow, gbp, google-business, optimization]
source: agentic-mastermind/workflows/gbp-optimization.yaml
---

# GBP Profile Optimization

**Template:** `gbp-optimization` | **Version:** 1.0

> Full GBP profile optimization — recommendations, categories, services, attributes, AI description, deploy. Use for first-time or deep cleanup.

---

## Required Inputs

| Field | Description |
|---|---|
| `ids.gbp_location_id` | REQUIRED — from `gbp_locations_crud.list_locations` |
| `config.primary_category` | e.g. "Aesthetic Medicine Clinic" |
| `config.additional_categories` | e.g. ["Medical Spa", "Plastic Surgeon"] |
| `config.services` | List of `{name, description}` — AI generates description if blank |
| `config.auto_apply_recommendations` | Default: true (CHANGE + ADD types only) |
| `config.deploy_after_changes` | Default: true |

---

## Steps

- [ ] **1. Load location + get current state** — sync from Google
- [ ] **2. Generate AI recommendations + bulk apply** — CHANGE + ADD types (skip DELETE — review manually)
- [ ] **3. Fix categories** — update primary + additional
- [ ] **4. Add / update services** — AI generates descriptions if blank
- [ ] **5. Add missing attributes** — get available → set
- [ ] **6. Generate AI description + deploy all changes** — suggest description → deploy to Google

---

## Output Summary
```
✅  {client} — GBP Profile Optimization

📍  Location        synced from Google
🤖  Recommendations {N} applied (CHANGE + ADD)
🏷️  Categories      primary + {N} additional fixed
🛎️  Services        {N} services added/updated
✅  Attributes      {N} missing attributes added
📝  Description     AI description generated + deployed
```

---

← [[../00-BRAIN-INDEX|Brain Index]] | Source: `agentic-mastermind/workflows/gbp-optimization.yaml`
