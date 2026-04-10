---
name: AI Engineering 2025
description: Context engineering framework, eval tools (DeepEval/Langfuse), cost optimization, CS automation tools, top communities
type: reference
---

# AI Engineering 2025/2026

## Context Engineering Framework
Context engineering > prompt engineering — the full information environment matters:

| Layer | What it is | Managed by |
|-------|-----------|------------|
| System prompt | Stable rules + persona | `cache_control: ephemeral` |
| Retrieved context | RAG / memory lookup | Ruflo memory_search |
| Conversation history | Multi-turn state | Trim aggressively |
| Tool results | Dynamic data | Inject at call time |
| Few-shot examples | Task demonstrations | Cache with system prompt |

**Key principle:** Model quality is often less important than context quality. A well-contextualized smaller model beats a poorly-contextualized larger one.

## Eval Tools

### Langfuse
- LLM observability: tracing, prompt versioning, cost tracking, latency monitoring
- Install: `pip install langfuse` (dev dependency — not in prod requirements)
- Env vars: `LANGFUSE_PUBLIC_KEY`, `LANGFUSE_SECRET_KEY`, `LANGFUSE_HOST`
- Use for: triage accuracy tracking, prompt A/B testing, cost monitoring per endpoint
- Gotcha: add to `requirements-dev.txt`, not `requirements.txt` — fail gracefully if missing

### DeepEval
- LLM unit testing + evaluation framework
- Metrics: faithfulness, answer relevance, contextual precision/recall, hallucination
- Install: `pip install deepeval` (dev dependency)
- Use for: regression testing triage classification accuracy before shipping prompt changes
- Gotcha: same as Langfuse — dev-only dependency, guard with try/except on import

## Cost Optimization
1. **Prompt caching** — `cache_control: ephemeral` on system prompts >1024 tokens (~90% cost reduction on stable prompts)
2. **Model tiering** — Haiku for simple transforms, Sonnet for triage, Opus only for architecture
3. **Batch processing** — group similar tasks, reuse cached context window
4. **Token counting** — `client.beta.messages.count_tokens()` before large calls
5. **Streaming** — use `stream=True` for long outputs to improve perceived latency

## CS Automation Tools (SearchAtlas stack)
| Tool | Purpose | Integration |
|------|---------|------------|
| Intercom | Customer conversations | MCP: `mcp__intercom__*` |
| Linear | Bug + ticket tracking | MCP: `mcp__linear__*` / `mcp__claude_ai_Linear__*` |
| ClickUp | QA channel notifications | MCP: `mcp__clickup__*` |
| Slack | Partner/internal comms | MCP: `mcp__slack__*` |
| SearchAtlas | SEO/GBP/content tooling | MCP: `mcp__searchatlas__*` |

## Agent Frameworks (2026)
| Framework | Use case |
|-----------|---------|
| `claude_agent_sdk` | `claude -p` subprocess agents (DevBot pattern, no API key) |
| `AsyncAnthropic` SDK | Direct API calls in FastAPI async endpoints |
| Ruflo swarms | Multi-agent orchestration, 98 agent types |
| Claude Code subagents | `Agent` tool with `subagent_type` — parallel research/implementation |

## Communities & Resources
- Anthropic Discord — model updates, API changes
- LangChain Discord — agent patterns, RAG
- Latent Space podcast — AI engineering deep dives
- Context7 MCP — always use for live library docs before coding

## Key 2025/2026 Shifts
- Extended thinking: `/effort max` (not `ultrathink` — deprecated Jan 2026)
- Claude 4.x family: Opus 4.6, Sonnet 4.6, Haiku 4.5 — use these model IDs
- Prompt caching TTL: 5 minutes for `ephemeral` type
- Tool use is now preferred over few-shot for structured extraction
- MCP (Model Context Protocol) is the standard for tool integration
