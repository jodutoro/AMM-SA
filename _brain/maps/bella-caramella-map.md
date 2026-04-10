---
tags: [map, bella-caramella]
---

# Bella Caramella — Map of Content

> Boutique femenina online. Santa Rosa de Cabal. Tallas S–XXL. Sells exclusively via WhatsApp.

**Location:** `Clients/Bella Caramella/`
**Full context:** [[Clients/Bella Caramella/CLAUDE|CLAUDE.md]]

---

## Pages
- [[Clients/Bella Caramella/index|index.html]] — Home
- [[Clients/Bella Caramella/blusas|blusas.html]] — Blusas & Bodys (10 products)
- [[Clients/Bella Caramella/pantalones|pantalones.html]] — Pantalones (8 products)
- [[Clients/Bella Caramella/vestidos|vestidos.html]] — Vestidos (8 products)
- [[Clients/Bella Caramella/nosotras|nosotras.html]] — About
- [[Clients/Bella Caramella/contacto|contacto.html]] — Contact

---

## Product Image Source
Google Drive: `https://drive.google.com/drive/folders/1PjBrTSv-jaqjtd1MFqk5VpJAsvC9YB-P`
Download: `gdown --folder <url>` (publicly shared, no auth needed)

Categories in Drive: `Blusas y Bodys /`, `Pantalones /`, `Vestidos/`, `Videos/`

---

## WhatsApp Integration

**Number:** `+57 313 640 1801` → stored as `573136401801` in `js/main.js` (`WA_NUMBER`)

Two types of WA buttons:

| Type | Attribute | Behaviour |
|---|---|---|
| **Product buttons** | `data-product-wa` | Dynamic — JS reads product name, selected size + qty at click time |
| **Generic CTAs** (float, hero) | `data-wa="message"` | Static — href set once on DOMContentLoaded |

**Product WA message format:**
`"Hola Bella Caramella! Me interesa [name], talla [size], cantidad: [qty]. ¿Tienen disponibilidad? 🌸"`
(size omitted if no pill selected)

**Size selection:** `.size-pill` elements are clickable — click toggles `.active` class (filled pink). Deselectable (click active pill again). One active per card.

**Quantity selector:** `.product-qty` > `.qty-controls` with `.qty-minus`, `.qty-value`, `.qty-plus`. Starts at 1, min 1. Controlled in `js/main.js`.

---

## Key Rules
- Product CTA buttons use `data-product-wa` — **never** `data-wa` for product cards
- Never repeat the same image across category cards + featured + catalog sections
- New categories → create a new `<category>.html` page + add card to `index.html` categories grid
- Every new product card must include: `.product-sizes` with `.size-pill` spans + `.product-qty` block before the CTA button

---

← [[_brain/00-BRAIN-INDEX|Brain Index]]
