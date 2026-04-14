---
name: Commit must include push (deploy rule)
description: Every git commit in this workspace must be immediately followed by git push origin main — Netlify only deploys on push
type: feedback
---

Every `git commit` must be immediately followed by `git push origin main`.

**Why:** Netlify watches the GitHub remote, not local commits. Committing without pushing means nothing deploys — found this when dashboard was 31 min stale despite a fresh commit (2026-04-11).

**How to apply:** Never end a commit sequence without pushing. Treat commit + push as a single atomic action in this workspace. No exceptions.
