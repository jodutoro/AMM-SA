---
name: bella-caramella site details
description: Full architecture, design system, JS patterns, font stand-ins, image rules, Phase 2 plan, and bug fixes for Bella Caramella boutique site
type: project
---

# Bella Caramella — Site Details

**Location:** `Clients/Bella Caramella/`
**Language:** Spanish only
**Stack:** Static HTML + CSS + vanilla JS — no framework, no build step
**Pages:** `index.html`, `nosotras.html`, `contacto.html` + category pages (`blusas.html`, `pantalones.html`, `vestidos.html`)
**Single shared CSS:** `css/styles.css` | Single shared JS: `js/main.js`

---

## Font Stand-ins (IMPORTANT)

Real brand fonts (Tahu + Ordinary) are NOT available as web fonts. Current implementation uses:
- **Great Vibes** (cursive) → stand-in for Tahu (flowing script headings)
- **Nunito** (sans-serif) → stand-in for Ordinary (body/UI)

Swap to real fonts when client provides licensed web font files. The memory file `bella-caramella-brand-manual.md` notes the official fonts — the site currently uses the free stand-ins above.

---

## Design System

**Aesthetic:** Sweet Editorial Maximalism / Pastel Editorial. Hero fills viewport, typography-driven layout.

**Hero background:** Soft CSS `@keyframes hue-rotate` gradient — barely perceptible, creates optical breathing without distraction.

**Section rhythm:** Hard edges between sections, alternating backgrounds:
```
White → Soft Blush (#f8d3ce) → White → Gradient → White footer
```

**Card style:** `border-radius: 20px` + pink shadow — intentional soft/feminine override of any Neo-Brutalist defaults.

**Hero H1:** 96–120px desktop, 56–72px mobile (not just responsive scale — two discrete sizes).

---

## WhatsApp Integration Patterns

Two distinct patterns — **never mix them on the same button:**

| Pattern | Attribute | Use case |
|---------|----------|---------|
| Dynamic (product cards) | `data-product-wa` (no value) | JS builds message from product name + selected size + qty |
| Static (generic CTAs) | `data-wa="message text"` | Hero, floating button, footer |

**WA constant (define once, never hardcode inline):**
```javascript
const WA_NUMBER = "573136401801"  // Colombia: no +, no spaces
```

**Pre-filled message format for product cards:**
```
Hola Bella Caramella! Me interesa [NOMBRE], talla [TALLA], cantidad: [QTY]. ¿Tienen disponibilidad? 🌸
```

---

## Product Image Rules

**Naming convention:**
- `assets/blusa-01.jpg` → `blusa-10.jpg` (10 blouses)
- `assets/pantalon-01.jpg` → `pantalon-08.jpg` (8 pants)
- `assets/vestido-01.jpg` → `vestido-08.jpg` (8 dresses)

**Source:** Google Drive folder (public, gdown-downloadable).

**CRITICAL — No image duplication across sections:**
Each product image may appear in only ONE of: Category card hero, "Nuestros Favoritos" featured, Instagram catalog. Violating this creates visual redundancy.

---

## Size System

S · M · L · XL · XXL across all products. Size pills are interactive via JS (`.active` class toggle). One active size per card at a time.

---

## JS Patterns

**IntersectionObserver (scroll animation):** Product cards and sections fade+lift in on scroll with `once: true`. No continuous reflow.

**SnapWidget Instagram embed:**
- Wraps in `<div class="ig-embedded">`
- Default fallback: 3×3 grid of Unsplash placeholder tiles linking to @bellacaramella
- JS hides fallback only after SnapWidget confirms render via callback
- **Never rely on SnapWidget alone** — connectivity failure will break the page without fallback

**Marquee strip** in Instagram section: `"¿Te gustó algo? · Consulta disponibilidad · Pedidos por WhatsApp · @bellacaramella ·"` in Bella Pink `#e9828f`.

**`prefers-reduced-motion`:** Apply per-element, NOT as a global toggle:
- Marquee → static centered text
- Gradient → static
- Entry animations → instant opacity only (no translateY/scale)
- WA button pulse → suppressed entirely

---

## Mobile Navigation

Full-screen overlay with gradient `--gradient-brand`, z-index 1001. Nav links centered in large column at Great Vibes 40px. Close button (×) top-right. Overlay suppresses floating WA button behind it (z-index stacking matters).

All 5 pages linked: Blusas y Camisas, Pantalones, Vestidos, Nosotras, Contacto.

**"Nuestros Favoritos" on mobile:** horizontal scroll-snap instead of 3-column grid. Asymmetric card heights (desktop only — middle card raised).

---

## Bugs Fixed

| Bug | Root Cause | Fix |
|-----|-----------|-----|
| Hero height overflow cut off category pills | `height: 100vh` + `overflow: hidden` | Changed to `height: 88vh`, removed overflow constraint |
| Nav text unreadable over hero | No background on nav | Added frosted translucent bg + `backdrop-filter` |
| Mobile nav only showed "Catálogo" | Missing category page links | Expanded overlay to all 5 pages |

---

## What's Missing / Pre-Launch Checklist

- [ ] OG image: must be absolute URL at deploy time (`https://bellacaramella.co/assets/og-cover.jpg`)
- [ ] Real product photos (currently Unsplash placeholders)
- [ ] Tahu + Ordinary licensed web font files
- [ ] Favicon (not set)
- [ ] Additional logo variants
- [ ] Structured data / JSON-LD (planned as task 10)
- [ ] mailto: fallback link on Contacto page

---

## Phase 2 (Planned, Not Built)

- Per-product detail pages with image galleries
- Individual category pages with filtered listings
- Product-level WA pre-filled messages (currently only in 3 mockup cards on index)
- JSON catalog management if founder wants more control than Instagram

---

## Deployment Notes

- OG image needs absolute URL (not relative) at deploy time
- SnapWidget may require @bellacaramella credentials for widget auth
- Font swap: client provides Tahu/Ordinary files
- `Work stuff/clientops-backend/` note: BC has no backend dependency

**Why:** Client operates entirely through Instagram + WhatsApp. Site is a brand presence, not an e-commerce system. All product additions happen via Instagram; the site mirrors the feed.
**How to apply:** Preserve the Instagram-first, WA-direct flow. Never add complexity (cart, backend, CMS) without explicit client request. Always verify image uniqueness across sections. Use Great Vibes/Nunito until client provides real font files.
