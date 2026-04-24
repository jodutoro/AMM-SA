# Jonathan Giner — Friction Log

> Running log of blockers and struggles surfaced in AMM sessions.
> Internal only — never shared externally.

---

## 2026-04-09

**Design consistency issues on 1 of 5 built sites**
- Type: search-atlas
- Product: Website Studio
- Severity: medium
- Detail: 4 of 5 sites built came out well; one had unresolved design consistency issues. Wants the build process optimized for design consistency.

---

## 2026-04-21

**Site redesigns via Warp + Claude Code (community post)**
- Type: search-atlas
- Product: Website Studio
- Severity: medium
- Detail: Active Circle community post on "Site Redesigns Using Warp and Claude" confirms Jonathan continues routing site production through Claude Code + Warp rather than Website Studio. Pattern is consistent with prior 1:1 signal (design consistency gap). Corroborates ongoing adoption issue — member has not returned to WS for multi-page site work.

---

## 2026-04-21

**SA credit quota UX — unclear credit type distinction**
- Type: search-atlas
- Product: OTTO
- Severity: high
- Detail: Hit AI generation quota unexpectedly. Confusion between auto-site credits (static, non-recurring) and AI generation credits (recurring per billing cycle). No in-product indicator of credit cost per action before running a playbook. JD had to manually refresh quota live in session. Workaround: manually monitor + ask Atlas Brain how many credits a playbook will consume before running.

---

**MCP cannot query or limit credit consumption per project**
- Type: search-atlas
- Product: OTTO
- Severity: medium
- Detail: No mechanism via MCP to check remaining credits or set per-project credit limits. Members running automated playbooks have no programmatic way to gate workflows on available credit balance.

---

**SA MCP endpoint still on V1 (corroborates gap-008)**
- Type: search-atlas
- Product: OTTO
- Severity: medium
- Detail: Still on old endpoint. Correct endpoint confirmed: https://mcp.searchatlas.com/api/v1/mcp. Corroborates gap-008 pattern — V1 → V2 migration friction is widespread.

---

**Working from wrong root directory (computer root vs. Mastermind folder)**
- Type: stack
- Product: N/A
- Severity: medium
- Detail: Was running Claude Code from /Users/Jonathan/ instead of the Mastermind SA folder. Client files scattered across disk in multiple folders. Fixed in session: Mastermind SA folder set as canonical root, new file hierarchy established (AI_rules.md, memory/, skills/, per-client CLAUDE.md).

---

**MCP files don't sync across machines via SyncThing**
- Type: stack
- Product: N/A
- Severity: medium
- Detail: Uses SyncThing for file sync between desktop and laptop. MCPs are stored in ~/.claude/ (local), not in the Mastermind folder — so SyncThing does not carry them. Must manually install MCPs on each machine.

---

