---
name: Bella Caramella WA System
description: WhatsApp number, dynamic product button pattern, size selection, and quantity selector for Bella Caramella site
type: project
---

## WhatsApp number
`+57 313 640 1801` stored as `573136401801` in `js/main.js` (`WA_NUMBER`).
Previous number (`573107279595`) was incorrect — always use the above.

## Two WA button types

**Product cards** use `data-product-wa` (no value). On click, JS in `main.js` builds message from:
- `.product-name` text content (product name)
- `.size-pill.active` text (selected size, optional)
- `.qty-value` number (quantity, default 1)

Message: `"Hola Bella Caramella! Me interesa [name], talla [size], cantidad: [qty]. ¿Tienen disponibilidad? 🌸"`

**Generic CTAs** (floating button, hero, etc.) keep `data-wa="message"` — href set statically on page load.

## Interactive size pills
`.size-pill` elements are clickable. Click toggles `.active` (filled pink, white text). Clicking active pill deselects it. One active per `.product-sizes` container.

## Quantity selector structure
```html
<div class="product-qty">
  <span class="qty-label">Cantidad</span>
  <div class="qty-controls">
    <button class="qty-btn qty-minus" aria-label="Menos">−</button>
    <span class="qty-value">1</span>
    <button class="qty-btn qty-plus" aria-label="Más">+</button>
  </div>
</div>
```
Min quantity: 1. All logic in `js/main.js`.

## New product card checklist
1. `.product-sizes` with `.size-pill` spans
2. `.product-qty` block (copy snippet above)
3. `<a class="btn btn-primary btn-full" data-product-wa href="#">Consultar por WhatsApp</a>`

**Why:** Reduces back-and-forth WA messages — client receives size + quantity upfront.
**How to apply:** Always use `data-product-wa` for product buttons, never `data-wa`. Copy the qty block from an existing card.

---
*See also:* [[bella-caramella-brand-manual]] · [[bella-caramella-map]]
