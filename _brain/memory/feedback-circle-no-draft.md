---
name: Circle API — no draft mode
description: Circle API v1 publishes posts immediately — no draft support. Always confirm content with user before calling the API.
type: feedback
originSessionId: 3684d4b7-b1db-46bc-857b-f179133e46a4
---
Circle's `/api/v1/posts` endpoint does not support `published: false` — posts go live the moment the API call is made. There is no draft mode.

**Why:** Learned after accidentally publishing a post the user wanted to review first (2026-04-22). Had to delete and repost.

**How to apply:** Before any Circle post, show the full formatted content to the user and wait for explicit "go ahead" confirmation. Never hit the Circle API speculatively. Circle renders in dark mode — always use explicit `color: #F3F4F6` (near white) on ALL text elements (intro, card body, footer), never `#111827`. For card backgrounds, use `rgba()` semi-transparent dark tints (e.g. `rgba(139,92,246,0.18)`) not light pastel hex values — pastels get overridden by dark theme and make dark text invisible. Rule: every `<p>` must have an explicit light color.
