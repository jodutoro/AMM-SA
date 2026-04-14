---
name: FastAPI AI Backend Patterns 2025
description: Best practices for Claude SDK integration, structured outputs, retry patterns, prompt caching, observability, agent frameworks (2025/2026)
type: reference
---

# FastAPI + Claude SDK Best Practices (2025/2026)

## Core Rules (Non-Negotiable)

```python
# ✅ Always — async client inside async FastAPI
from anthropic import AsyncAnthropic
client = AsyncAnthropic()

# ❌ Never — sync client inside async endpoint
from anthropic import Anthropic  # blocks event loop
```

## Prompt Caching
Add `cache_control: {"type": "ephemeral"}` on stable system prompts (>1024 tokens):
```python
messages=[
    {
        "role": "user",
        "content": [
            {
                "type": "text",
                "text": SYSTEM_PROMPT,
                "cache_control": {"type": "ephemeral"}
            },
            {"type": "text", "text": user_input}
        ]
    }
]
```
- Caches for 5 minutes, reduces cost ~90% on stable prompts
- Use on: triage system prompts, classification rules, large context docs

## Retry Pattern (tenacity)
```python
from tenacity import retry, stop_after_attempt, wait_exponential, retry_if_exception_type
import anthropic

@retry(
    retry=retry_if_exception_type((anthropic.RateLimitError, anthropic.APIStatusError)),
    wait=wait_exponential(multiplier=1, min=4, max=60),
    stop=stop_after_attempt(3)
)
async def call_claude(prompt: str) -> str:
    response = await client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=2048,
        messages=[{"role": "user", "content": prompt}]
    )
    return response.content[0].text
```

## Structured Outputs
Force JSON output for triage, classification, and data extraction:
```python
# Add to system prompt:
"Return ONLY valid JSON — no markdown, no explanation, no code fences."

# Parse with fallback:
import json
try:
    result = json.loads(response_text)
except json.JSONDecodeError:
    # extract JSON from text if model adds prose
    import re
    match = re.search(r'\{.*\}', response_text, re.DOTALL)
    result = json.loads(match.group()) if match else {}
```

## Extended Thinking
- Use `/effort max` (not `ultrathink` — deprecated Jan 2026)
- Only for: architectural decisions and complex debugging
- Do NOT use for routine classification or triage — adds latency and cost

## Model Selection (2026)
| Model | ID | Use case |
|-------|----|---------|
| Opus 4.6 | claude-opus-4-6 | Complex reasoning, architecture |
| Sonnet 4.6 | claude-sonnet-4-6 | Default — triage, classification |
| Haiku 4.5 | claude-haiku-4-5-20251001 | Simple transforms, high-volume |

## Agent Frameworks
- **claude_agent_sdk** — `query()` for `claude -p` subprocess-based agents (DevBot pattern)
- **AsyncAnthropic** — direct API for FastAPI endpoints
- **Ruflo MCP** — multi-agent swarm orchestration for 3+ independent tasks

## Observability
- **Langfuse** — LLM tracing, prompt versioning, cost tracking
  - Env vars: `LANGFUSE_PUBLIC_KEY`, `LANGFUSE_SECRET_KEY`, `LANGFUSE_HOST`
  - Keep as optional import — add to `requirements-dev.txt` not main `requirements.txt`
- **DeepEval** — LLM evaluation framework (also dev-only dependency)

## Context Engineering
- System prompt: cache with `ephemeral` if >1024 tokens
- Keep conversation history trimmed — Claude's context window fills fast in multi-turn
- For batch processing: spawn parallel agents, not sequential loops
- Engineer feedback injection: fetch from Linear at startup, inject into every triage prompt (`audit_ticket_quality.py` pattern)

## FastAPI Patterns
```python
# Startup: load expensive context once
@app.on_event("startup")
async def startup():
    global _ticket_quality_feedback
    _ticket_quality_feedback = await get_feedback_summary()

# Dependency injection for shared clients
async def get_anthropic() -> AsyncAnthropic:
    return AsyncAnthropic()
```

## Key Gotchas
- `AsyncAnthropic` is required — sync `Anthropic()` blocks the event loop in FastAPI
- `lin_api_...` Linear API keys: NO Bearer prefix in Authorization header
- `claude_agent_sdk` `query()` is for subprocess-based agents — use `AsyncAnthropic` for in-process calls
- Langfuse/DeepEval must be in dev deps — fail gracefully if not installed in prod
- ClickUp workspace ID: use numeric `9011399348`, not slug `8chy2nm`
