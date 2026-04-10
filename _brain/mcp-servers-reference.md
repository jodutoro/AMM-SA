---
name: MCP Servers Reference
description: All installed MCP servers — install commands, auth, status, known install quirks
type: reference
---

# MCP Servers Reference

All user-scoped servers are configured in `~/.claude.json` and available in every project automatically.
Project-scoped servers are in `/Users/eillacs/Desktop/Agentic/.mcp.json`.

## User-Scoped MCP Servers (always available)

| Server | Status | Purpose | Auth |
|--------|--------|---------|------|
| **SearchAtlas MCP** | ✅ Connected | SEO, GBP, PPC, Content, PR, LLM Visibility tools | API key in ~/.claude.json |
| **Intercom MCP** | ✅ Connected | Read/search conversations + contacts | Bearer token |
| **Slack MCP** | ✅ Connected | 70+ partner channel monitoring | Bot token |
| **Linear MCP** (claude_ai) | ✅ Connected | Engineering ticket management | OAuth |
| **Linear MCP** (linear) | ✅ Connected | Issue CRUD (mcp__linear__*) | API key |
| **GitHub MCP** | ✅ Connected | PR reviews, code search, repo management | PAT |
| **Railway MCP** | ✅ Connected | Deploy, logs, env vars, service management | Token |
| **Exa MCP** | ✅ Connected | Neural web search | API key |
| **Context7 MCP** | ✅ Connected | Live library docs — prevents stale API usage | Free |
| **Playwright MCP** | ✅ Connected | Browser automation + UI testing | — |
| **ClickUp MCP** | ✅ Connected | Tasks, spaces, subtasks, DMs | API token (`pk_81342217_*`) — `@taazkareem/clickup-mcp-server` via npx |
| **DevBot MCP** | ⚠️ Needs OAuth | Sentry + Loki + Linear verification | OAuth pending |

## Project-Scoped MCP Servers (Agentic workspace only)

| Server | Status | Purpose | Init command |
|--------|--------|---------|-------------|
| **Magic MCP** (21st.dev) | ✅ Connected | UI component generation + inspiration | — |
| **Stitch MCP** | ❌ Needs init | Google Stitch AI design → local dev | `! npx @_davideast/stitch-mcp init` |

## SearchAtlas MCP
- Root URL: `https://mcp.searchatlas.com/api/v1/mcp`
- Tools prefix: `mcp__searchatlas__`
- Covers: OTTO, GBP, Keywords, Content Genius, Digital PR, Site Explorer, LLM Visibility, Social Hub, Website Studio

## Context7 MCP
- Always use before writing code with any external library/SDK/API
- Tools: `mcp__context7__resolve-library-id` → `mcp__context7__query-docs`
- Prevents silent breaking changes from stale training data

## Linear (two servers)
- `mcp__claude_ai_Linear__*` — full CRUD including documents, initiatives, milestones, customers
- `mcp__linear__*` — simpler interface for issue CRUD (create, update, search, list)
- Both use the same Linear workspace. Use claude_ai version for complex operations.

## Key Install Commands (if reinstall needed)
```bash
# Context7
npx @upstash/context7-mcp

# Exa
npx @exa-labs/exa-mcp-server

# Stitch (project-scoped)
npx @_davideast/stitch-mcp init
```

**Why:** Centralizes all MCP server status and quirks in one place so I don't have to re-discover them each session.

**How to apply:** Before using any MCP tool, check this file for known auth gotchas. For any broken server, check status here first before debugging.
