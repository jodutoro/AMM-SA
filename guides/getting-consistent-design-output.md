# Getting Consistent Design Output from AI Website Builders
> How to reduce variation and hit your design standards across multiple AI-generated sites

## The Problem

AI website generators — whether SA Website Studio, direct Claude HTML generation, or similar tools — have a randomness problem: the same prompt produces meaningfully different results between runs. For agencies doing client work, this is a quality issue. You get one great site, then three mediocre ones, then spend sessions trying to get back to the first result. The inconsistency isn't a model limitation you can't address — it's a context and input problem you can solve.

## Recommended Approach

### 1. Build a design brain file (highest leverage)

A design brain is a single reference document you attach to every site build session. It gives the AI a stable anchor for decisions it would otherwise make randomly.

Minimum viable design brain structure:

```markdown
# [Client/Project] Design Brain

## Brand Colors
- Primary: #1A1A2E (deep navy)
- Secondary: #E94560 (coral)
- Background: #FFFFFF
- Text: #2D2D2D

## Typography
- Headings: Playfair Display, 700 weight
- Body: Inter, 400/500 weight
- Hierarchy: H1 = 48px, H2 = 32px, H3 = 24px, body = 16px

## Design Style
Single sentence positioning: "Medical professional aesthetic — clean, authoritative, minimal decoration"

## Reference Component
Below is an approved hero section you've already validated:
[paste your working HTML snippet]

## What to avoid
- No gradient backgrounds
- No stock photo style imagery
- No rounded buttons (use sharp corners)
```

Attach this file at the start of every session. When the AI has explicit constraints, it makes far fewer random choices.

### 2. Use a 4-style design taxonomy

Instead of describing aesthetics in open-ended terms, classify your client's brand into one of four categories before writing any prompt. This forces you to be specific and gives the AI a clear stylistic anchor:

| Style | Examples | AI prompt anchor phrase |
|-------|----------|------------------------|
| **Medical / Professional** | Clinics, law firms, financial | "clinical, minimal, authoritative — think Mayo Clinic" |
| **Luxury / Premium** | High-end retail, real estate, hospitality | "refined, spacious, luxury editorial — think Bottega Veneta" |
| **Playful / Consumer** | DTC, food, lifestyle brands | "warm, approachable, energetic — think Glossier" |
| **High Fashion / Bold** | Creative agencies, fashion, music | "editorial contrast, strong typography, unexpected layout — think Celine" |

Add the anchor phrase to every generation prompt: "Build in medical/professional style — clinical, minimal, authoritative."

### 3. Use copy-first structure to reduce layout randomness

Layout randomness comes from the AI having to decide structure and copy simultaneously. When you write the copy first (even a draft), the AI has a fixed content structure to work with and makes fewer layout decisions independently.

Before generating any HTML:
```
Write copy for [page type] with this content structure:
- Hero: [one sentence about primary value prop]
- 3 services: [list them]
- Trust section: [what credibility elements to include]
- CTA: [what you want visitors to do]
```

Then feed that copy output into the HTML generation prompt. The layout follows the content, not the other way around.

### 4. Anchor new pages to a validated reference

Once you have one approved page, use it as a structural anchor:

```
Build a [Services] page using the same layout system as the attached index.html.
Keep the navigation, footer, and color system identical.
Only change the hero headline, services grid content, and page-specific sections.
```

Attaching the working `index.html` as a reference file constrains the AI to replicate structure decisions you've already approved, rather than making new ones.

### 5. Version-control your design system state

Don't rely on session memory for design decisions. After any session where you approve a design element, immediately write it into your design brain file. Treat the design brain as a living document — never start a new session from memory alone.

```bash
# After approving a design decision:
echo "\n## Approved: [what you approved and why]" >> design-brain.md
git add design-brain.md && git commit -m "design: [what changed]"
```

## Alternatives

**If output is still inconsistent despite a design brain:** Switch to building one high-quality page in Claude Code (where you can iterate at the code level), then use Website Studio only for generating variant pages (different locations, services) with the approved page as the reference. This isolates design decisions to one controlled environment.

**For SA Website Studio specifically:** Use the platform's design-reference attachment feature to link your approved HTML. This primes the generator with your existing visual system before it makes any layout decisions.

**For multi-brand agencies:** Maintain a separate design brain file per client. Keep them in a `/design-brains/` directory in your working repo and name them by client. Never mix design brain content between clients — the AI will average them.

## Related Resources

- [Choosing Between Website Studio and Claude Code](./choosing-website-studio-vs-claude-code.md)
- [Copy-Before-Design Workflow](./copy-before-design-workflow.md)
- [Diagnosing Website Studio Push Failures](./website-studio-push-failures.md)
