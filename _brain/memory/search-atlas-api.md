---
name: Search Atlas MCP API Root URL
description: Always use https://mcp.searchatlas.com/api/v1/mcp as the root URL for all Search Atlas MCP requests
type: feedback
---

The correct root URL for all Search Atlas MCP API requests is:

```
https://mcp.searchatlas.com/api/v1/mcp
```

**Why:** There are multiple SearchAtlas API domains. Using the wrong root causes auth failures or routes to the wrong environment. The `/api/v1/mcp` path is the stable MCP-facing endpoint.

**How to apply:** Any time a SearchAtlas MCP tool needs a base URL or you're constructing SearchAtlas API calls manually, use this URL. Do not use `app.searchatlas.com` or other variants as the API root.
