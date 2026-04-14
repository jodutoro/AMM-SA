---
name: lunanolasco site details
description: Full design system, file structure, integrations, and content rules for the Luna Nolasco personal brand/e-commerce site
type: project
---

# Luna Nolasco — Site Details

**Location:** `Clients/lunanolasco/index.html` (single-file SPA)
**Language:** Spanish only
**Stack:** HTML5 + inline CSS + vanilla JS (no build system, no backend)
**Contact:** WhatsApp-only — `573136401801`

---

## Design System

### Color Palette (CSS Custom Properties)
```css
--blush:      #FDF0F3   /* primary background */
--blush-2:    #F7DDE4
--blush-3:    #EEC5CF
--rose:       #C4607A   /* primary brand/buttons */
--rose-dark:  #9E3D56   /* nav logo, dark CTA */
--rose-mid:   #D47F93
--rose-pale:  #F9E4EA
--sage:       #8BAF96   /* secondary accent */
--sage-light: #C8DFD0
--sage-pale:  #EEF6F1
--cream:      #FFFBFC   /* body background */
--cream-2:    #FDF5F7
--plum:       #3D1A24   /* primary text */
--plum-mid:   #7A3A50
--plum-light: #B07080
--gold:       #C9946A
```

### Typography
- **Headings:** Playfair Display (serif, 400/500/600/700/italic)
- **Accent/Script:** Dancing Script (cursive, 500/600/700)
- **Body/UI:** Poppins (sans-serif, 300/400/500/600)

### Layout Tokens
- `--radius: 20px` / `--radius-sm: 12px`
- `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)`
- Container: `max-width: 1180px; padding: 0 32px`
- Section padding: `100px 0`

### Mobile Breakpoints
| Breakpoint | Change |
|-----------|--------|
| 900px | Hero/About layout shift |
| 768px | Nav links hidden |
| 640px | TikTok grid 4→2 columns |
| 540px | Products grid 3→1 column |

---

## Page Sections

| Selector | Section | Anchor |
|---------|---------|--------|
| `.nav` | Fixed navigation | — |
| `.hero` | Hero + main CTA | — |
| `.marquee-strip` | Repeating brand strip | — |
| `.about` | Her story | #about |
| `.benefits` | Product benefits | — |
| `.testimonials` | 6 cards + featured | #testimonials |
| `.follow` | TikTok tiles (4) | #follow |
| `.products` | 3 product cards | #products |
| `.cta-section` | Final conversion | — |
| `.footer` | Links + social | — |
| `.wa-float` | Persistent WA widget | — |

---

## Products

### Lipotex — 30 días ($27.99/mes)
- Badge: "Más vendido"
- WA message: `"Hola Luna! Me interesa el Lipotex 30 días ($27.99). ¿Tienen disponibilidad? 🌸"`

### Lipotex — 90 días ($47.99/3 meses)
- Badge: "Mejor valor" (sage color)
- Card bg: `linear-gradient(145deg, #EEF6F1, #C8DFD0)`
- WA message: `"Hola Luna! Me interesa el Lipotex 90 días ($47.99). ¿Tienen disponibilidad? 🌸"`

### Desodorante Luna ($18.99/unidad)
- Card bg: `linear-gradient(145deg, #F5E6FF, #DDB0F0)` (purple)
- WA message: `"Hola Luna! Me interesa el Desodorante Luna. ¿Tienen disponibilidad? 🌸"`

---

## WhatsApp Integration

```javascript
const WA_NUMBER = "573136401801";
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-wa]').forEach(el => {
    const msg = el.getAttribute('data-wa');
    el.href = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
    el.target = '_blank';
    el.rel = 'noopener noreferrer';
  });
});
```
All WA CTAs use `data-wa="message text"` attributes.

---

## Social Links
- **TikTok:** `https://www.tiktok.com/@luna_resilienteoficial` (hardcoded, multiple places)
- **Instagram:** `href="#"` (placeholder — not live)

---

## Brand Voice (Key Messaging)
- "Yo lo hice primero — y estoy aquí para ayudarte"
- "No vendo nada que no haya probado primero en mí misma y en mi familia"
- "Tu aliada en salud" / "Tu aliada diaria para una vida saludable"
- Marquee: `100% Natural • Mamá Soltera • Emprendedora • Probado por mí • Resultados reales • Mujeres resilientes • Tejocote Root • Since 2020 • Tu aliada en salud`
- **Emotional angle:** Single mother, resilience, wellness authenticity

---

## Reference Assets (in `Clients/lunanolasco/`)
`lunanolasco-full.jpeg`, `lunanolasco-hero.jpeg`, `lunanolasco-redesign.png`, `lunanolasco-mockup-full.jpeg`, `lunanolasco-real-site.jpeg`, `luna-product-page.jpeg`, `luna-tiktok-real.jpeg`, `lunanolasco-tiktok.jpeg`

---

## Constraints & Gotchas

1. **Single-file HTML** — All CSS is inline in `<style>`; no external stylesheets to import
2. **WhatsApp-only contact** — No email form, no shopping cart, no backend
3. **Spanish-only copy** — Never default to English
4. **Fixed `.nav`** — position:fixed with blur backdrop; z-index matters when adding sections
5. **TikTok tiles are styled boxes** — not embedded widgets; no TikTok API
6. **Photos are SVG placeholders** — actual client photos not integrated yet (hero, about)
7. **Testimonials are hard-coded** — no CMS
8. **TikTok stat cards:** marked for removal (2026-03-30 redesign)
9. **Rose/blush palette is non-negotiable** — core brand identity

**Why:** Luna's brand is built on personal authenticity + WhatsApp-direct commerce; adding backend complexity or changing the aesthetic would undermine the brand.
**How to apply:** Always preserve WA-first flow, Spanish copy, and rose/blush palette. Any new sections must fit single-file structure.
