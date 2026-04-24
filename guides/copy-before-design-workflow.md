# Copy-Before-Design: How to Cut Client Revisions by 90%

> Common challenge for agencies running any kind of web production workflow — wireframes get built, clients review, copy gets written later, layout has to be rethought. This is avoidable.

## The Problem

The default web production order in most agencies is wireframe → design → copy → QA. This looks efficient because every stage can run in parallel, but it creates a silent cost: when copy finally lands, it almost never fits the layout. Short headlines become long. A "three-column benefits" section turns out to need six benefits. Hero subheads balloon past the two-line cap the designer optimized around.

Clients only notice the problem when they see their words on the designed page, and by then the fix is expensive — the whole visual hierarchy has to shift to accommodate the copy. Revision cycles compound because each copy edit triggers a layout edit.

## Recommended Approach

Invert the order. Copy is the first deliverable, not the last. Everything else is built around approved copy.

### The reordered pipeline

```
1. Onboarding    →  brand assets, goals, compliance
2. Copy          →  approved per page, in plain text or docs
3. Theme         →  colors, fonts, CTA styling, global widgets  ← key approval gate
4. Wireframe     →  uses real copy, not lorem ipsum
5. Page design   →  per-page visual layer
6. QA + redirect plan
```

### Why the theme stage is the second critical gate

Once copy is approved, the next place client feedback concentrates is the theme — colors, type, button style, hero treatment. Nail the theme and the per-page designs flow through with minimal feedback because the visual language is already settled. Get this approval in writing before any per-page design work starts.

### How to structure the copy stage

- Draft copy in a document with one heading per page section (Hero, Problem, Offer, Proof, CTA, etc.), not in a design tool.
- Capture actual length: exact headline word count, subhead length in characters, number of benefit bullets. This becomes the spec the designer builds around.
- Get explicit client sign-off on the copy document before the theme is chosen.

### Running it agentically

A chained workflow makes this fast:

1. **Brand intake agent** — pulls brand guide, tone, compliance constraints into a structured brief.
2. **Copy agent** — produces copy per page, page-by-page, using the brand brief and a template for the page type (core page, service page, compliance page, CMS collection page).
3. **Theme agent** — proposes 2–4 theme directions tied to an industry/positioning category (professional/playful/luxury/editorial), each with a predetermined component library reference.
4. **Design agent** — builds the wireframe and page layouts using approved copy + approved theme.

Each stage is a human-in-loop approval gate. You are not trying to remove the client from the process; you are routing their feedback to the cheapest moment to change it.

### Design categories to eliminate decision paralysis

Tell clients: "Which of these four directions feels like your brand?"

- **Professional / medical** — conservative, trust-forward, neutral palette
- **Playful** — higher contrast, illustrative elements, warmer palette
- **Luxury / editorial** — high-contrast type, generous whitespace, monochrome or jewel-tone palette
- **High fashion** — magazine-style, asymmetric grids, image-led

Each category maps to a predetermined component library and stock photo direction. This is more constrained than "design the website of their dreams" and that constraint is the feature.

## Alternatives

- **If copy is truly unknowable upfront** (a new brand with no positioning yet), start with a short brand sprint (a few hours) to produce a one-page positioning doc, then write copy against that doc before designing. The sprint is cheaper than multiple design revision cycles.
- **If the client insists on seeing a design first,** produce a **theme preview** — three or four moodboards showing type, color, and component style — rather than a page design. This satisfies the "I want to see something visual" request without committing to a layout that copy will contradict.
- **If you're locked into an existing platform** (Webflow, Wix, Website Studio, etc.), apply the same ordering inside the platform: fill a page with real content in a rough layout, get copy approval, then switch to designing.

## Related Resources

- [Component library marketplaces like 21st.dev](https://21st.dev/) — pre-built industry-specific templates, useful for the theme stage once the category is chosen
- [Anthropic docs on Claude Code skills](https://docs.anthropic.com/en/docs/claude-code/skills) — for building the brand/copy/theme/design agents as reusable skills
- [Sub-agents in Claude Code](https://docs.anthropic.com/en/docs/claude-code/sub-agents) — for orchestrating the chained pipeline
