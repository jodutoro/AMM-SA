#!/usr/bin/env python3
"""
research-agent.py — Stage 2: Reads insights, queries Gemini + Claude, writes research reports.

Usage:
    python3 research-agent.py                          # auto-picks top 3 from latest insight
    python3 research-agent.py --topic "LLM cost optimization"   # research specific topic
    python3 research-agent.py --num-topics 5           # pick top N instead of 3

Flow:
    1. Read latest insight HTML + voice notes
    2. Ask Claude to pick top N research topics (returns JSON)
    3. For each topic: query Gemini for live data (SDK → CLI → Claude fallback)
    4. Synthesize with Claude into structured report
    5. Write HTML to Vault/Research/
"""
from __future__ import annotations

import argparse
import json
import os
import re
import subprocess
import sys
from datetime import datetime
from pathlib import Path
from typing import Optional

# ---------------------------------------------------------------------------
# Config
# ---------------------------------------------------------------------------
VAULT = Path(__file__).parent.parent
ENV_FILE = Path.home() / "Desktop" / "agentic" / ".env"
ENV_FALLBACKS = [
    Path.home() / ".env",
    Path("/Users/eillacs/Desktop/Agentic/.env"),
]

CLAUDE_MODEL = "claude-sonnet-4-6"
GEMINI_MODEL = "gemini-2.0-flash"
MAX_CONTEXT_CHARS = 40_000

# ---------------------------------------------------------------------------
# Env loading
# ---------------------------------------------------------------------------

def _load_env(path: Path) -> bool:
    if not path.exists():
        return False
    try:
        from dotenv import load_dotenv
        load_dotenv(path, override=False)
        return True
    except ImportError:
        for line in path.read_text().splitlines():
            line = line.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue
            k, _, v = line.partition("=")
            k, v = k.strip(), v.strip().strip('"').strip("'")
            if k and k not in os.environ:
                os.environ[k] = v
        return True


def load_env() -> None:
    for c in [ENV_FILE] + ENV_FALLBACKS:
        if _load_env(c):
            return


# ---------------------------------------------------------------------------
# Read context for topic selection
# ---------------------------------------------------------------------------

def _strip_html(html: str) -> str:
    text = re.sub(r"<[^>]+>", " ", html)
    return re.sub(r"\s+", " ", text).strip()


def read_insight_context() -> str:
    """Read latest insight report + recent voice notes for topic selection."""
    parts: list[str] = []

    # Latest insight report
    insights_dir = VAULT / "Insights"
    if insights_dir.exists():
        recent = sorted(insights_dir.glob("*.html"), key=lambda p: p.stat().st_mtime, reverse=True)
        if recent:
            raw = recent[0].read_text(encoding="utf-8", errors="replace")
            text = _strip_html(raw)[:12_000]
            parts.append(f"=== Latest Insight ({recent[0].name}) ===\n{text}")

    # Voice notes
    wispr_dir = VAULT / "Wispr"
    if wispr_dir.exists():
        for f in sorted(wispr_dir.glob("*.md"), key=lambda p: p.stat().st_mtime, reverse=True)[:5]:
            try:
                parts.append(f"=== Voice Note ({f.name}) ===\n{f.read_text(encoding='utf-8', errors='replace')[:2000]}")
            except Exception:
                pass

    # Recent session logs
    projects_dir = VAULT / "projects"
    if projects_dir.exists():
        for f in sorted(projects_dir.glob("*.md"), key=lambda p: p.stat().st_mtime, reverse=True)[:3]:
            try:
                parts.append(f"=== Session Log ({f.name}) ===\n{f.read_text(encoding='utf-8', errors='replace')[:2000]}")
            except Exception:
                pass

    ctx = "\n\n".join(parts)
    return ctx[:MAX_CONTEXT_CHARS]


# ---------------------------------------------------------------------------
# Topic selection via Claude
# ---------------------------------------------------------------------------

def pick_topics(context: str, num: int = 3) -> list[dict]:
    """Ask Claude to return top N research topics as JSON."""
    import anthropic

    api_key = os.environ.get("ANTHROPIC_API_KEY", "")
    if not api_key:
        raise RuntimeError("ANTHROPIC_API_KEY not set.")

    client = anthropic.Anthropic(api_key=api_key)

    prompt = f"""You are a research prioritization agent.

Based on the vault context below, identify the top {num} topics that need deeper research.
For each topic, research should help the developer make better technical decisions.

Context:
{context}

Return ONLY valid JSON — an array of {num} objects:
[
  {{
    "topic": "Short topic title (4-8 words)",
    "query": "Specific search query for Gemini (actionable, technical)",
    "rationale": "1-2 sentences: why this matters right now"
  }},
  ...
]

No explanation outside the JSON block."""

    response = client.messages.create(
        model=CLAUDE_MODEL,
        max_tokens=1000,
        messages=[{"role": "user", "content": prompt}],
    )

    raw = response.content[0].text.strip()

    # Extract JSON from response
    match = re.search(r"\[.*\]", raw, re.DOTALL)
    if match:
        raw = match.group(0)

    try:
        topics = json.loads(raw)
        return topics[:num]
    except json.JSONDecodeError:
        print(f"Warning: Could not parse topics JSON. Raw:\n{raw[:500]}", file=sys.stderr)
        return [{"topic": "General Research", "query": "current best practices AI development 2025", "rationale": "Fallback topic"}]


# ---------------------------------------------------------------------------
# Gemini query (SDK → CLI → Claude fallback)
# ---------------------------------------------------------------------------

def query_gemini_sdk(query: str) -> Optional[str]:
    """Try Gemini SDK."""
    api_key = os.environ.get("GEMINI_API_KEY", "")
    if not api_key:
        return None
    try:
        import google.generativeai as genai
        genai.configure(api_key=api_key)
        model = genai.GenerativeModel(GEMINI_MODEL)
        result = model.generate_content(
            f"Research this topic thoroughly with current information and practical insights:\n\n{query}"
        )
        return result.text
    except Exception as e:
        print(f"  Gemini SDK error: {e}", file=sys.stderr)
        return None


def query_gemini_cli(query: str) -> Optional[str]:
    """Try Gemini CLI fallback."""
    try:
        result = subprocess.run(
            ["gemini", query],
            capture_output=True, text=True, timeout=30,
        )
        if result.returncode == 0 and result.stdout.strip():
            return result.stdout.strip()
    except (FileNotFoundError, subprocess.TimeoutExpired):
        pass
    return None


def query_claude_research(query: str) -> str:
    """Final fallback: use Claude to research from its knowledge."""
    import anthropic

    api_key = os.environ.get("ANTHROPIC_API_KEY", "")
    client = anthropic.Anthropic(api_key=api_key)

    response = client.messages.create(
        model=CLAUDE_MODEL,
        max_tokens=2000,
        messages=[{
            "role": "user",
            "content": f"Provide a thorough technical research summary on: {query}\n\nInclude: current state, best practices, gotchas, practical recommendations.",
        }],
    )
    return response.content[0].text


def query_gemini(query: str) -> str:
    """Try Gemini SDK → CLI → Claude fallback."""
    result = query_gemini_sdk(query)
    if result:
        print("  ✓ Gemini SDK")
        return result

    result = query_gemini_cli(query)
    if result:
        print("  ✓ Gemini CLI")
        return result

    print("  → Gemini unavailable, using Claude knowledge fallback")
    return query_claude_research(query)


# ---------------------------------------------------------------------------
# Synthesis via Claude
# ---------------------------------------------------------------------------

def synthesize(topic: str, rationale: str, raw_research: str) -> str:
    """Synthesize raw research into a structured markdown report."""
    import anthropic

    api_key = os.environ.get("ANTHROPIC_API_KEY", "")
    client = anthropic.Anthropic(api_key=api_key)

    prompt = f"""You are a technical research synthesizer writing for a senior developer.

Topic: {topic}
Why it matters: {rationale}

Raw research data:
{raw_research[:8000]}

Write a comprehensive markdown research report with:
## Executive Summary
2-3 sentences: what this is and why it matters.

## Key Findings
Bullet points of the most important insights.

## Technical Deep Dive
The most relevant technical details, patterns, or approaches.

## Practical Recommendations
3-5 specific, actionable recommendations with rationale.

## Potential Risks / Gotchas
What to watch out for when applying this.

## Resources
Links or references mentioned in the research (if any).

---
Write for a developer who will act on this today. Be specific. No fluff."""

    response = client.messages.create(
        model=CLAUDE_MODEL,
        max_tokens=3000,
        messages=[{"role": "user", "content": prompt}],
    )
    return response.content[0].text


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def research_topic(topic_info: dict) -> Optional[Path]:
    """Research a single topic and write HTML report. Returns output path."""
    sys.path.insert(0, str(Path(__file__).parent))
    from vault_report import render_report

    topic = topic_info["topic"]
    query = topic_info.get("query", topic)
    rationale = topic_info.get("rationale", "")

    print(f"\n  Topic: {topic}")
    print(f"  Query: {query}")

    print("  Querying live data...")
    raw = query_gemini(query)

    print("  Synthesizing with Claude...")
    report_md = synthesize(topic, rationale, raw)

    date_str = datetime.now().strftime("%Y-%m-%d")
    slug = re.sub(r"[^a-z0-9]+", "-", topic.lower()).strip("-")[:50]
    output_path = VAULT / "Research" / f"{date_str}-{slug}.html"

    render_report(
        title=topic,
        content_md=report_md,
        output_path=output_path,
        lens="research",
        metadata={"rationale": rationale[:40] + "..." if len(rationale) > 40 else rationale},
        source="Research Agent (Gemini + Claude)",
    )

    print(f"  ✓ Written: {output_path}")
    return output_path


def main() -> None:
    parser = argparse.ArgumentParser(description="Research Agent — Vault Intelligence Stage 2")
    parser.add_argument("--topic", default=None,
                        help="Research a specific topic (skips Claude topic selection)")
    parser.add_argument("--num-topics", type=int, default=3,
                        help="Number of topics to auto-select (default: 3)")
    args = parser.parse_args()

    sys.path.insert(0, str(Path(__file__).parent))

    print(f"\nResearch Agent — {datetime.now().strftime('%Y-%m-%d %H:%M')}")
    print(f"Vault: {VAULT}")

    load_env()

    if args.topic:
        topics = [{"topic": args.topic, "query": args.topic, "rationale": "User-specified topic"}]
    else:
        print("\nReading vault context for topic selection...")
        context = read_insight_context()
        if not context:
            print("No context found. Run insight-agent.py first or provide --topic.")
            sys.exit(1)
        print(f"Context: {len(context):,} chars")
        print("Asking Claude to select top topics...")
        topics = pick_topics(context, num=args.num_topics)
        print(f"\nSelected {len(topics)} topic(s):")
        for i, t in enumerate(topics, 1):
            print(f"  {i}. {t['topic']}")
            print(f"     {t.get('rationale', '')}")

    print(f"\nResearching {len(topics)} topic(s)...")
    for topic_info in topics:
        try:
            research_topic(topic_info)
        except Exception as e:
            print(f"  ✗ Failed: {e}", file=sys.stderr)

    print("\nDone.")


if __name__ == "__main__":
    main()
