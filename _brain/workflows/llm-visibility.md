---
tags: [workflow, llm, visibility, reporting, ai-brand]
source: agentic-mastermind/workflows/llm-visibility.yaml
---

# LLM Visibility & Reporting

**Template:** `llm-visibility` | **Version:** 1.0

> Track how the client appears in AI-generated responses (ChatGPT, Perplexity, etc.) and generate monthly SEO summary exports.

---

## Required Inputs

| Field | Description |
|---|---|
| `config.brand_name` | Exact brand name as known to LLMs |
| `config.competitors` | e.g. ["Competitor A", "Competitor B"] |
| `config.prompts_to_simulate` | Questions an ideal customer would ask an LLM |
| `config.topics_to_track` | Sentiment/visibility topics |
| `ids.otto_project_id` | For work summary export |
| `ids.site_explorer_id` | For SERP analysis |

---

## Steps

- [ ] **1. Brand overview + competitor share of voice** — visibility trend, rank vs competitors, share of voice
- [ ] **2. Sentiment trends by topic** — sentiment overview + trend per topic
- [ ] **3. Simulate AI prompts** — submit prompts → poll → get responses + summary + visibility
- [ ] **4. SERP features + position distribution** — features captured, position trends, historical
- [ ] **5. Export monthly work summary to Google Sheet** (if `export_to_google_sheet: true`)

---

## Output Summary
```
✅  {client} — LLM Visibility Report · {period}

👁️  AI Visibility   {score}% brand presence · #{rank} vs competitors
💬  Sentiment       {positive}% positive · {neutral}% neutral
🤖  Prompt Sims     {N} prompts run · mentioned in {M}/{N}
📈  SERP            {N} features captured · avg position {X}
📊  Export          monthly summary exported to Google Sheet
```

---

← [[../00-BRAIN-INDEX|Brain Index]] | Source: `agentic-mastermind/workflows/llm-visibility.yaml`
