---
tags: [workflow, authority, press-release, backlinks, digital-pr]
source: agentic-mastermind/workflows/authority-building.yaml
---

# Authority Building

**Template:** `authority-building` | **Version:** 1.0

> Authority building — press release creation + distribution, cloud stack, digital PR outreach, backlink monitoring.

---

## Required Inputs

| Field | Description |
|---|---|
| `config.press_release.topic` | e.g. "Acme Co Launches New Service Line" |
| `config.press_release.angle` | e.g. "expansion", "award", "new service launch" |
| `config.press_release.target_keywords` | SEO keywords to weave in |
| `config.press_release.distribution_network` | standard / premium / elite |
| `config.cloud_stack.template` | Cloud stack template |
| `config.cloud_stack.anchor_text` | Primary anchor text |
| `config.cloud_stack.target_url` | Page to point cloud stack links to |
| `config.digital_pr.outreach_topic` | e.g. "aesthetic medicine trends 2026" |
| `config.digital_pr.template_id` | PR email template |

---

## Steps

- [ ] **1. Create + write press release** → saves `press_release_id`
- [ ] **2. Distribute press release** — publish to network (standard/premium/elite)
- [ ] **3. Create + build cloud stack** → saves `cloud_stack_id`
- [ ] **4. Publish cloud stack** — get providers → build → publish
- [ ] **5. Set up digital PR outreach campaign** → create + activate → saves `digital_pr_campaign_id`
- [ ] **6. Monitor new backlinks** — new backlinks + referring domains report (runs after steps 2 + 4)

---

## Output Summary
```
✅  {client} — Authority Building · {period}

📰  Press Release   written + distributed ({network})
☁️  Cloud Stack     built + published · {N} properties
📧  Digital PR      outreach campaign live · {N} targets
🔗  Backlinks       {N} new backlinks detected
```

---

← [[../00-BRAIN-INDEX|Brain Index]] | Source: `agentic-mastermind/workflows/authority-building.yaml`
