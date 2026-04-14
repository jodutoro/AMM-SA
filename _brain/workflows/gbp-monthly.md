---
tags: [workflow, gbp, google-business, monthly, recurring]
source: agentic-mastermind/workflows/gbp-monthly.yaml
---

# GBP Monthly Recurring

**Template:** `gbp-monthly` | **Version:** 1.0

> Monthly GBP cycle — reply to reviews, generate + schedule posts, performance summary. Run every month.

---

## Required Inputs

| Field | Description |
|---|---|
| `ids.gbp_location_id` | REQUIRED |
| `config.posts_to_generate` | Default: 8 |
| `config.post_type` | STANDARD / OFFER / EVENT |
| `config.post_topics` | Optional: specific topics |
| `config.auto_publish_reviews` | Default: true |
| `config.enable_automated_posting` | Default: true |

---

## Steps

- [ ] **1. List unanswered reviews** → AI-generate replies → publish
- [ ] **2. Bulk generate posts for the month** → bulk create
- [ ] **3. Configure + enable automated posting** (if enabled)
- [ ] **4. Approve + publish posts** — iterate pending approval
- [ ] **5. GBP performance summary** — stats for the period

---

## Output Summary
```
✅  {client} — GBP Monthly · {period}

⭐  Reviews         {N} replies published
📢  Posts           {N} posts generated + published
🤖  Auto-posting    enabled · {frequency} schedule
📊  Performance     {impressions} views · {clicks} clicks
```

---

← [[../00-BRAIN-INDEX|Brain Index]] | Source: `agentic-mastermind/workflows/gbp-monthly.yaml`
