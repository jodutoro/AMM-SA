---
name: Search Atlas MCP API Root URL
description: OAuth-based MCP at https://mcp.searchatlas.com/mcp — confirmed by dev team Apr 23 2026.
type: feedback
---

Search Atlas MCP endpoint (confirmed by dev team, Apr 23 2026):

```
https://mcp.searchatlas.com/mcp   ← correct, OAuth 2.1
```

**Auth:** OAuth 2.1 — Claude Code handles it natively. No API key, no `X-API-KEY` header, no manual JSON editing.

**Install:**
```bash
claude mcp add searchatlas --type http https://mcp.searchatlas.com/mcp
```

**Why:** The MCP is now OAuth-based (not API-key-based). The `/api/v1/mcp` and `/sse` endpoints are deprecated. The `/mcp/` path (with trailing slash) also works — same backend.

**How to apply:** Always use `https://mcp.searchatlas.com/mcp` for any SA MCP setup docs or configs. Never use `/api/v1/mcp`, `/sse`, or `X-API-KEY` header patterns. The old `ed7dec5313434faf1486868e0f0356fd` API key in `.mcp.json` was revoked 2026-04-23 — already removed.

**OAuth resource metadata:** `https://mcp.searchatlas.com/.well-known/oauth-protected-resource`
**Authorization server:** `https://api.searchatlas.com`
**Scopes:** `mcp:tools:read`, `mcp:tools:execute`, `mcp:prompts:read`, `mcp:resources:read`

← [[_brain/memory/mcp-servers-reference|MCP Servers]]
