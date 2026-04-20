# Choosing Between Website Studio and Claude Code for Client Sites
> A decision framework for agencies building sites with agentic tools

## The Problem

Both Website Studio (SA's AI site builder) and Claude Code (direct HTML generation via Claude) can produce a publishable website. Agencies that default to one tool for every project end up with sites that either take longer to build than necessary or outgrow what the tool can deliver. Picking the wrong tool is the most common source of wasted sessions and mid-project rebuilds.

## Recommended Approach

Use this decision tree before starting any new site build:

```
Is this a single-page or small landing page (≤ 5 pages)?
  ├── YES → Does it need a CMS with client editing access?
  │         ├── YES → Website Studio → CMS MCP (Webflow or WordPress) import
  │         └── NO  → Website Studio → direct deploy
  └── NO  → Is it a multi-page site with shared components and complex routing?
            ├── YES → Claude Code (HTML/CSS) → Netlify or Railway deploy
            └── NO  → Evaluate by complexity; default to Claude Code for anything
                      with ≥ 10 pages, interactive features, or custom JS
```

### When Website Studio is the right call

- **Location-service landing pages** — single page, clear service + CTA, minimal JS. Three well-structured prompts typically produce a publishable result.
- **Satellite site networks** — when you're producing 5–20 similar pages with the same structure but different geo/service variations. Website Studio is faster than Claude Code for this pattern because you can iterate the design once and replicate it.
- **Clients who need CMS access** — Website Studio outputs CMS-compatible structures. Use the SA MCP → Website Studio → CMS MCP workflow (Webflow or WordPress) for clients who need to edit content themselves.
- **Rapid prototyping** — when you need to show a client a working mockup in under an hour and pixel-perfect fidelity isn't the goal yet.

### When Claude Code is the right call

- **Multi-page sites with shared navigation, layout, or design system** — Claude Code gives you full control over component reuse and CSS architecture. Website Studio generates page-level output; Claude Code generates system-level output.
- **Sites with custom JavaScript** — complex interactions (calculators, dynamic filtering, multi-step forms, API calls) require you to write and test JS directly. Claude Code in a terminal environment does this cleanly; Website Studio does not.
- **Premium client work where design consistency is non-negotiable** — Claude Code gives you a deterministic output (same prompt + same codebase = same result). Website Studio's output varies between runs for the same prompt, which matters when consistency is a client deliverable.
- **Sites that will be maintained and updated over time** — code in a git repo with a file structure you control is maintainable; Website Studio's output structure is harder to version and diff.

### The hybrid workflow (SA MCP + Claude Code)

For full-service clients who need both scale and quality:

```
1. SA MCP → research (keywords, SERP, competitors)
2. Website Studio → initial layout and copy draft
3. Claude Code → refine HTML, fix structure, add JS, enforce design consistency
4. CMS MCP → import to Webflow or WordPress for client handoff
```

This gives you the SA research signal, the Website Studio speed advantage on the first draft, and Claude Code's precision on the final output.

## Alternatives

**If you're unsatisfied with Website Studio output quality:** Before switching to Claude Code, try providing a "design brain" reference file — a markdown file containing your brand colors, font choices, example component descriptions, and a link to a rendered HTML reference. Attach it to every Website Studio session. This substantially reduces variation.

**If Claude Code is too slow for your volume:** For satellite site networks where you need 20+ near-identical pages, Website Studio is faster even accounting for quality variation. Run one high-quality page through Claude Code, then use Website Studio to generate the variant pages at volume.

## Related Resources

- [Diagnosing Website Studio Push Failures](./website-studio-push-failures.md)
- [Getting Consistent Design Output from AI Website Builders](./getting-consistent-design-output.md)
- [Copy-Before-Design Workflow](./copy-before-design-workflow.md)
