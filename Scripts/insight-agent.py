#!/usr/bin/env python3
"""
insight-agent.py — Stage 1: Reads vault context, runs analytical lenses through Claude.

Usage:
    python3 insight-agent.py                    # run all lenses
    python3 insight-agent.py --lens blind-spots # single lens
    python3 insight-agent.py --lens weekly      # exec brief
    python3 insight-agent.py --dry-run          # list context sizes, no API calls

Lenses:
    blind-spots   Attention gaps, assumption risks, voice-vs-action disconnects
    design        Anti-patterns, complexity hotspots, API/data model issues
    patterns      Cross-project themes, convergence opportunities, velocity
    weekly        One-page exec brief: scorecard, decisions needed, gaps
    all           Runs all four lenses sequentially
"""
from __future__ import annotations

import argparse
import json
import os
import subprocess
import sys
from datetime import datetime, timedelta
from pathlib import Path
from typing import Optional

# ---------------------------------------------------------------------------
# Config — edit these two lines
# ---------------------------------------------------------------------------
VAULT = Path(__file__).parent.parent          # auto-detects from Scripts/ location
ENV_FILE = Path.home() / "Desktop" / "agentic" / ".env"

# Fallback env locations (tried in order if ENV_FILE not found)
ENV_FALLBACKS = [
    Path.home() / ".env",
    Path.home() / "Desktop" / "agentic" / ".env",
    Path("/Users/eillacs/Desktop/Agentic/.env"),
]

CONTEXT_BUDGET = 120_000   # max chars fed to Claude
MAX_FILE_CHARS = 8_000     # max chars per individual file
CLAUDE_MODEL = "claude-opus-4-6"

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
        # Manual parse
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
    candidates = [ENV_FILE] + ENV_FALLBACKS
    for c in candidates:
        if _load_env(c):
            return
    # silently continue — keys may already be set in environment


# ---------------------------------------------------------------------------
# Context collection
# ---------------------------------------------------------------------------

def _read_file(path: Path, budget: int) -> str:
    try:
        text = path.read_text(encoding="utf-8", errors="replace")
        return text[:budget]
    except Exception:
        return ""


def _git_activity(repo: Path, hours: int = 48) -> str:
    """Recent git log for a repo."""
    try:
        since = (datetime.now() - timedelta(hours=hours)).strftime("%Y-%m-%d %H:%M")
        result = subprocess.run(
            ["git", "-C", str(repo), "log", f"--since={since}",
             "--oneline", "--no-merges", "--max-count=30"],
            capture_output=True, text=True, timeout=10,
        )
        return result.stdout.strip()
    except Exception:
        return ""


def gather_context(dry_run: bool = False) -> dict[str, str]:
    """
    Collect context from 7 sources. Budget: CONTEXT_BUDGET chars total.
    Returns dict of {source_name: content}.
    """
    ctx: dict[str, str] = {}
    used = 0

    def add(key: str, content: str, cap: int = MAX_FILE_CHARS) -> None:
        nonlocal used
        if not content or used >= CONTEXT_BUDGET:
            return
        available = min(cap, CONTEXT_BUDGET - used)
        snippet = content[:available]
        ctx[key] = snippet
        used += len(snippet)

    # 1. Live/ symlinked .planning/ dirs
    live_dir = VAULT / "Live"
    if live_dir.exists():
        for proj in sorted(live_dir.iterdir()):
            if not proj.is_dir():
                continue
            for fname in ("PROJECT.md", "STATE.md", "ROADMAP.md", "CONCERNS.md"):
                f = proj / fname
                if f.exists():
                    add(f"live/{proj.name}/{fname}", _read_file(f, MAX_FILE_CHARS))

    # 2. Architecture docs in _brain/
    brain = VAULT / "_brain"
    if brain.exists():
        for md in sorted(brain.rglob("*.md"))[:20]:
            rel = md.relative_to(VAULT)
            add(f"brain/{rel}", _read_file(md, 4000))

    # 3. Voice notes (Wispr)
    wispr_dir = VAULT / "Wispr"
    if wispr_dir.exists():
        recent = sorted(wispr_dir.glob("*.md"), key=lambda p: p.stat().st_mtime, reverse=True)[:10]
        for f in recent:
            add(f"wispr/{f.name}", _read_file(f, 3000))

    # 4. Git activity for Live/ repos
    if live_dir.exists():
        for proj in sorted(live_dir.iterdir()):
            if proj.is_dir():
                activity = _git_activity(proj)
                if activity:
                    add(f"git/{proj.name}", activity, 3000)

    # 5. Previous insights (last 3)
    insights_dir = VAULT / "Insights"
    if insights_dir.exists():
        prev = sorted(insights_dir.glob("*.html"), key=lambda p: p.stat().st_mtime, reverse=True)[:3]
        for f in prev:
            # Strip HTML tags for context
            import re
            raw = _read_file(f, 6000)
            text = re.sub(r"<[^>]+>", " ", raw)
            text = re.sub(r"\s+", " ", text).strip()
            add(f"insights/{f.name}", text, 4000)

    # 6. Session logs from Claude sessions
    projects_dir = VAULT / "projects"
    if projects_dir.exists():
        recent_logs = sorted(projects_dir.glob("*.md"), key=lambda p: p.stat().st_mtime, reverse=True)[:5]
        for f in recent_logs:
            add(f"session/{f.name}", _read_file(f, 3000))

    # 7. MEMORY.md / CLAUDE.md for system context
    for special in (VAULT / "_brain" / "memory" / "MEMORY.md", VAULT / "CLAUDE.md"):
        if special.exists():
            add(f"system/{special.name}", _read_file(special, 4000))

    return ctx


# ---------------------------------------------------------------------------
# Lens prompts
# ---------------------------------------------------------------------------

LENS_PROMPTS: dict[str, str] = {
    "blind-spots": """You are an analytical advisor reviewing a developer's vault context.

Your task: surface BLIND SPOTS — things the developer is NOT thinking about but should be.

Produce a markdown report with:
## Attention Gaps
3-5 things missing from active focus given the stated goals.

## Assumption Risks
2-4 assumptions embedded in current plans that could be wrong.

## Voice-vs-Action Disconnects
Patterns where voice notes / stated intentions diverge from actual git/code activity.

## Recommendations
3 concrete, prioritized next steps.

Be specific, reference actual project names/files where visible. No generic advice.""",

    "design": """You are a senior systems architect reviewing a developer's active projects.

Your task: identify DESIGN ISSUES from the vault context.

Produce a markdown report with:
## Anti-Patterns Detected
Specific architectural/code patterns that will cause problems.

## Complexity Hotspots
Areas of unnecessary complexity or coupling.

## API / Data Model Issues
Interface problems, schema issues, contract violations.

## Refactoring Priorities
Top 3 things to fix first, with rationale.

Be concrete. Reference actual systems/files visible in the context.""",

    "patterns": """You are a cross-project technical intelligence analyst.

Your task: identify CROSS-PROJECT PATTERNS from the vault context.

Produce a markdown report with:
## Recurring Themes
Patterns appearing across multiple projects.

## Convergence Opportunities
Where two+ projects could share code, tooling, or patterns.

## Velocity Signals
What's moving fast vs. stalled, and why.

## Strategic Observations
1-3 higher-level observations about the overall development trajectory.

Focus on patterns not obvious from looking at a single project.""",

    "weekly": """You are a technical program manager writing a weekly executive brief.

Your task: produce a ONE-PAGE executive brief from the vault context.

Produce a markdown report with:
## Status Scorecard
| Project | Status | Health | Key Metric |
(one row per active project, 3-word status each)

## Decisions Needed This Week
Numbered list of decisions with owner and deadline if visible.

## Top 3 Risks
Brief, specific, actionable.

## Gaps to Close
What's blocking progress that hasn't been addressed.

## Wins
What shipped or progressed since last review.

Keep it tight. Executive brief = skimmable in 90 seconds.""",
}


# ---------------------------------------------------------------------------
# Claude API call
# ---------------------------------------------------------------------------

def call_claude(system: str, context: dict[str, str], lens: str) -> str:
    load_env()
    api_key = os.environ.get("ANTHROPIC_API_KEY", "")
    if not api_key:
        raise RuntimeError("ANTHROPIC_API_KEY not set. Check your .env file.")

    try:
        import anthropic
    except ImportError:
        raise RuntimeError("anthropic package not installed. Run: pip install anthropic")

    client = anthropic.Anthropic(api_key=api_key)

    # Build user message
    context_text = "\n\n".join(
        f"=== {k} ===\n{v}" for k, v in context.items()
    )

    user_msg = f"""Vault context (from {len(context)} sources, {sum(len(v) for v in context.values()):,} chars):

{context_text}

---
Today: {datetime.now().strftime('%Y-%m-%d %H:%M')}

Run the {lens} analysis."""

    response = client.messages.create(
        model=CLAUDE_MODEL,
        max_tokens=4096,
        system=system,
        messages=[{"role": "user", "content": user_msg}],
    )

    return response.content[0].text


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

VALID_LENSES = list(LENS_PROMPTS.keys()) + ["all"]


def run_lens(lens: str, context: dict[str, str]) -> Optional[Path]:
    """Run a single lens and write the report. Returns output path."""
    from vault_report import render_report

    print(f"  → Running lens: {lens} ...")
    md = call_claude(LENS_PROMPTS[lens], context, lens)

    date_str = datetime.now().strftime("%Y-%m-%d")
    slug = lens.lower().replace(" ", "-")
    output_path = VAULT / "Insights" / f"{date_str}-{slug}.html"

    title_map = {
        "blind-spots": "Blind Spots Analysis",
        "design": "Design Review",
        "patterns": "Cross-Project Patterns",
        "weekly": "Weekly Executive Brief",
    }
    title = title_map.get(lens, lens.title())

    render_report(
        title=title,
        content_md=md,
        output_path=output_path,
        lens=lens,
        metadata={"sources": str(len(context))},
    )

    print(f"  ✓ Written: {output_path}")
    return output_path


def main() -> None:
    parser = argparse.ArgumentParser(description="Insight Agent — Vault Intelligence Stage 1")
    parser.add_argument("--lens", default="all", choices=VALID_LENSES,
                        help="Analytical lens to run (default: all)")
    parser.add_argument("--dry-run", action="store_true",
                        help="Preview context sizes without making API calls")
    args = parser.parse_args()

    # Add Scripts/ to path so vault_report can be imported
    sys.path.insert(0, str(Path(__file__).parent))

    print(f"\nInsight Agent — {datetime.now().strftime('%Y-%m-%d %H:%M')}")
    print(f"Vault: {VAULT}")
    print("Gathering context...")

    context = gather_context(dry_run=args.dry_run)

    total_chars = sum(len(v) for v in context.values())
    print(f"\nContext summary ({len(context)} sources, {total_chars:,} chars):")
    for k, v in context.items():
        print(f"  {k:<50} {len(v):>7,} chars")

    if args.dry_run:
        print("\n[dry-run] No API calls made.")
        return

    if not context:
        print("\nNo context found. Symlink your .planning/ dirs into Live/ first.")
        return

    load_env()

    lenses = list(LENS_PROMPTS.keys()) if args.lens == "all" else [args.lens]

    print(f"\nRunning {len(lenses)} lens(es): {', '.join(lenses)}")
    for lens in lenses:
        try:
            run_lens(lens, context)
        except Exception as e:
            print(f"  ✗ {lens} failed: {e}", file=sys.stderr)

    print("\nDone.")


if __name__ == "__main__":
    main()
