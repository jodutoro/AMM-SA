---
name: Playground skill auto-trigger
description: When to invoke the playground skill — interactive HTML tools with live preview + prompt output
type: feedback
originSessionId: 8a14e27d-6717-4ff3-9c65-6e012472ba21
---
Invoke the `playground` skill whenever the request involves an interactive explorer, configurator, or visual tool where the input space is too large or too visual to express as plain text.

**Why:** Jonathan wants the playground skill self-embedded into the design workflow so it fires automatically without needing to be asked.

**How to apply:**

Trigger on any of these signals:
- "playground", "explorer", "interactive tool", "visual configurator"
- Exploring a large parameter space (typography, color, spacing, layout, shadows, animation)
- User wants to tweak values and copy the result back as a prompt
- Building a design decision aid (component variants, style presets)
- "Let me play with X" or "help me explore X visually"

Template selection:
- Design decisions → `design-playground.md`
- Data/query building → `data-explorer.md`
- Learning/concept mapping → `concept-map.md`
- Document review → `document-critique.md`
- Code diff/PR review → `diff-review.md`
- Codebase architecture → `code-map.md`

Always: single HTML file, inline everything, live preview, prompt output (natural language, non-default values only), copy button, dark theme, open with `open <file>.html` after writing.
