---
name: Bella Caramella Brand Manual
description: Full brand identity specs from the official corporate identity manual — fonts, colors, logo variants, icons, correct usage rules
type: project
---

## Source
PDF: `/Users/eillacs/Downloads/Manual de identidad corporativa Bella Caramella (1).pdf`

## Fonts (CORRECT — site currently uses wrong fonts)
- **Primary:** Tahu font — titles, signage, key words needing prominence
- **Secondary:** Ordinary font — body text, supporting copy
- **Site currently uses:** Great Vibes + Nunito — these are substitutes, not brand fonts
- **Action needed:** Obtain Tahu + Ordinary font files and self-host as woff2

## Colors (confirmed)
- `#e9828f` — Pantone 701c — Primary pink (Bella text, flower outline)
- `#f5d997` — Pantone 7402c — Yellow/gold (Caramella text)
- `#f8d3ce` — Pantone 7422c — Brand blush (backgrounds, footer)

## Logo Variants (all exist in brand manual, files needed from designer)
- **Vertical** — stacked Bella / Caramella (current logo.png)
- **Horizontal** — side by side, more compact — good for nav
- **Símbolos** — B monogram + flower icon only — good for favicon
- **Original negativo** — white version on pink background — use on colored/dark backgrounds
- **Blanco y negro** — black version on white
- **Blanco y negro negativo** — white on black

## Current logo problem
The logo is two-tone (pink "Bella" + yellow "Caramella") but may be rendering mono-pink in the PNG on the site. Verify by checking `assets/logo.png` — if yellow is missing, need a new export from designer.

## Custom Brand Icons (exist in manual, not yet on site)
Flower-decorated versions of: Instagram, TikTok, Facebook, WhatsApp, location pin, phone, email, B monogram, flower symbol. These should replace the generic SVGs in the footer.

## Favicon (missing from site)
Use the flower symbol or "B" monogram. Need PNG exports at 16x16, 32x32, 180x180 (apple-touch-icon).

## Footer
Should use `var(--color-blush)` = `#f8d3ce` as background — this is the official brand blush. Previously was `#fdf6f6` (near-white), killing logo contrast. Fixed 2026-03-31.

## Logo Usage Rules (from section 2.2)
- Original colors on light background ✓
- White negativo on pink/gradient backgrounds ✓
- Never: wrong colors, deformation, wrong typefaces, incorrect spacing

**Why:** Brand manual was ignored when building the site — fonts, logo variants, and icon set are all specified and diverge from current implementation.
**How to apply:** Before any new design work on Bella Caramella, check this file. Priority actions: get font files from designer, get logo variants (especially white negativo + horizontal), get favicon PNGs, get custom social icons.

---
*See also:* [[bella-caramella-wa-system]] · [[bella-caramella-map]]
