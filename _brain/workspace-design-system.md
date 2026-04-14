---
name: workspace design system
description: Jonathan's personal brand aesthetic, Viktor's design framework, standard build workflow, and Google Flow tools
type: reference
---

# Workspace Design System (docs/design.md)

## Viktor's Design Framework (for client sites)

### Pre-Build Setup (Phase 0 — ALWAYS first)
1. Add System Knowledge Prompt to project (role: world-class web designer/developer)
2. Collect **3 reference images** matching target aesthetic
3. Define: color palette, font stack, brand tone

### Standard Build Phases
| Phase | What to build |
|-------|--------------|
| 0 — Shell | Nav (logo+links+CTA) + Hero (headline+subhead+badge+CTA+media) + Footer |
| 1 — Core | Benefits/features grid, social proof (testimonials+stats+logos), product showcase, FAQ |
| 2 — Interactive | Carousel, modal/drawer, contact form, scroll animations |
| 3 — Polish | Mobile pass (375px), `/audit typography`, `/audit colors`, meta/OG/favicon |

### Build Rules
- **One section at a time** — never full site in one prompt
- **Mobile is not optional** — test at 375px after every section
- **Surgical fixes:** `"Fix [issue] in [component] but do NOT change [other elements]"`
- **Specificity = quality:** Vague prompts → generic output

### Viktor's Style Presets

**Dark Premium (internal dashboards):**
```
bg: #0A0A0A | accent: #7B5BFF (purple) or #00E5FF (cyan)
text: #FFFFFF / #A1A1AA | border: rgba(255,255,255,0.08) | radius: 12px cards / 8px btns
```

**Light Clean SaaS (client sites default):**
```
bg: #FFFFFF | accent: #6366F1 (indigo)
text: #111827 / #6B7280 | border: #E5E7EB | radius: 8px cards / 6px btns
shadow: 0 1px 3px rgba(0,0,0,0.1)
```

---

## AI Generation Tools

| Tool | Use | Access |
|------|-----|--------|
| **Nano Banana 2** (Google Flow) | AI image generation, design variations | `labs.google/fx/tools/flow` |
| **Veo 3.1 Fast** (Google Flow) | Text-to-video generation | `labs.google/fx/tools/flow` |
| **Magic MCP** (21st.dev) | UI component generation | MCP — already installed |
| **Playwright MCP** | Browser/UI testing | MCP — project-scoped |
| **Lovable** | No-code site builder | Needs account setup |

---

## Client Acquisition Workflow
1. Pick underserved niche on Dribbble
2. Collect 3 references matching their aesthetic
3. Generate mockup via Nano Banana or Magic MCP with client logo
4. Send cold pitch (DM/email with 2–3 options)
5. After trust built: upsell AI automation at 2× service fee

### Upsell Framework
| Client Pain | AI Solution | Fee Multiplier |
|-------------|------------|----------------|
| Repetitive content updates | CMS + AI content pipeline | 1.5× |
| Manual lead follow-up | AI chatbot + CRM | 2× |
| Slow SEO growth | AI keyword + auto-publish | 2× |
| Inconsistent social posting | AI scheduling + generation | 1.5× |

**Why:** Consistent aesthetic language across sessions prevents style drift. Personal brand must be dark/gothic/zero-radius — never apply SaaS card patterns to Jonathan's own pages.
**How to apply:** For any new client site, always run Phase 0 (3 refs + palette + fonts) before touching code. For JD's own brand work, use dark gothic spec above — never rounded cards or gradients.
