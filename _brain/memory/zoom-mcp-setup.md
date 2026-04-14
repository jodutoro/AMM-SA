---
name: zoom-mcp-setup
description: Zoom MCP servers installed in ~/.claude/settings.json — 3 remote OAuth servers for workspace/docs/whiteboard
type: reference
---

# Zoom MCP Setup

Installed 2026-04-09. Added to `~/.claude/settings.json` under `mcpServers`.

## Servers

| Key | URL | Capabilities |
|-----|-----|--------------|
| `zoom-workspace` | `https://mcp.zoom.us/mcp/zoom/streamable` | Meetings, Team Chat, Docs, recordings, transcripts, AI summaries |
| `zoom-docs` | `https://mcp.zoom.us/mcp/docs/streamable` | Create & retrieve Zoom Docs |
| `zoom-whiteboard` | `https://mcp.zoom.us/mcp/whiteboard/streamable` | Create & manage whiteboards |

## Auth
- Transport: `streamable-http` (type: `"http"` in config)
- Auth: **OAuth** — no API key. On first use after restart, browser OAuth flow is triggered automatically.
- Source: `https://github.com/zoom/mcp-registry`

## Notes
- Transcripts are part of `zoom-workspace` (not a separate server)
- No npm install needed — pure remote endpoints
