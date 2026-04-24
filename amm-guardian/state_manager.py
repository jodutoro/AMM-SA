#!/usr/bin/env python3
"""AMM Brain State Manager

Runs after each collector cycle. Loads new signals from the DB, reads the
current amm-state.md, invokes Claude CLI to merge them, then hands off to
validator.py before writing the result.

File locking (fcntl.flock) ensures two overlapping collector runs cannot
corrupt the state file simultaneously.
"""

import fcntl
import json
import os
import subprocess
import sys
import time
from datetime import datetime, timezone
from pathlib import Path

import yaml
from dotenv import load_dotenv

ROOT = Path(__file__).parent
DOTENV_PATH = ROOT.parent / ".env"
CONFIG_PATH = ROOT / "config.yaml"

load_dotenv(DOTENV_PATH)
sys.path.insert(0, str(ROOT))
import db

LOCK_FILE = ROOT / ".state_manager.lock"


def load_config() -> dict:
    return yaml.safe_load(CONFIG_PATH.read_text())


def now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


def notify(title: str, msg: str) -> None:
    """Fire a macOS notification. Non-fatal if it fails."""
    try:
        subprocess.run(
            ["osascript", "-e", f'display notification "{msg}" with title "{title}"'],
            timeout=5,
            capture_output=True,
        )
    except Exception:
        pass


SIGNAL_PRIORITY = ["transcripts", "circle", "gmail", "clickup_chat", "clickup_amm"]
SIGNAL_CAPS = {
    "transcripts": 5,
    "circle": 10,
    "gmail": 8,
    "clickup_chat": 10,
    "clickup_amm": 10,
}
# Transcripts use a longer lookback — meetings don't happen every day
# and 1-on-1 context shouldn't disappear from state after 12h.
SIGNAL_WINDOWS: dict[str, int] = {
    "transcripts": 168,   # 7 days
    "gmail": 48,          # 2 days — email threads accumulate slowly
}


def load_new_signals(signal_types: list[str], window_hours: int = 12) -> list[dict]:
    """Load signals per source, each using its own lookback window.

    Transcripts use 7 days (meetings are infrequent).
    Gmail uses 2 days (threads accumulate slowly).
    Everything else uses the default window_hours (12h).
    Priority order: transcripts > circle > gmail > clickup_chat > clickup_amm.
    """
    from datetime import timedelta
    conn = db.get_conn()
    rows: list[dict] = []
    try:
        cur = conn.cursor()
        for src in SIGNAL_PRIORITY:
            if src not in signal_types:
                continue
            hours = SIGNAL_WINDOWS.get(src, window_hours)
            cutoff = (datetime.now(timezone.utc) - timedelta(hours=hours)).isoformat()
            cap = SIGNAL_CAPS.get(src, 15)
            cur.execute(
                """SELECT source, signal_key, file_path, metadata, collected_at
                   FROM signals
                   WHERE source = ? AND collected_at > ?
                   ORDER BY collected_at DESC
                   LIMIT ?""",
                (src, cutoff, cap),
            )
            for row in cur.fetchall():
                rows.append({
                    "type": row[0],
                    "hash": row[1],
                    "path": row[2],
                    "data": json.loads(row[3]) if row[3] else {},
                    "created_at": row[4],
                })
    finally:
        conn.close()
    return rows


def format_signals_for_claude(signals: list[dict]) -> str:
    """Format signals as a readable text block for the Claude CLI context."""
    if not signals:
        return "(no new signals)"

    lines = []
    for s in signals:
        d = s["data"]
        src = s["type"]
        ts = s.get("created_at", "")[:19]

        if src == "transcripts":
            origin = d.get("origin", "fathom")
            if origin == "clickup_doc":
                lines.append(f"[{ts}] CLICKUP DOC: {d.get('doc_title','')} / {d.get('page_title','')}")
                lines.append(f"  Content: {d.get('content_preview','')[:600]}")
            else:
                fname = d.get("file_name", "")
                fpath = d.get("file_path", "")
                lines.append(f"[{ts}] TRANSCRIPT: {fname}")
                # Read actual file content so Claude has the conversation
                try:
                    content = Path(fpath).read_text(errors="ignore")[:2000]
                    lines.append(f"  Content:\n{content}")
                except Exception:
                    lines.append(f"  Path: {fpath} (could not read)")

        elif src == "gmail":
            lines.append(f"[{ts}] GMAIL: {d.get('subject','')} — from {d.get('from','')}")
            lines.append(f"  Snippet: {d.get('snippet','')[:300]}")

        elif src == "circle":
            lines.append(f"[{ts}] CIRCLE (space {d.get('space_id','')}): {d.get('title','')}")
            lines.append(f"  Author: {d.get('author','')} | Comments: {d.get('comments_count',0)}")
            lines.append(f"  Body: {d.get('body_preview','')[:300]}")

        elif src == "clickup_chat":
            lines.append(f"[{ts}] CLICKUP CHAT: {d.get('author','')} said:")
            lines.append(f"  {d.get('content','')[:400]}")

        elif src == "clickup_amm":
            lines.append(f"[{ts}] CLICKUP TASK: {d.get('name','')} [{d.get('status','')}]")
            lines.append(f"  Assignees: {', '.join(d.get('assignees',[]))} | URL: {d.get('url','')}")

        else:
            lines.append(f"[{ts}] {src.upper()}: {json.dumps(d)[:300]}")

        lines.append("")

    return "\n".join(lines)


def read_state(state_file: Path, playbook: Path) -> str:
    """Return current state file content, or initial template if it doesn't exist."""
    if state_file.exists() and state_file.stat().st_size > 100:
        return state_file.read_text()

    # Build from template — first run
    ts = now_iso()
    return f"""---
updated_at: {ts}
sources_checked: none
ttl_hours: 12
---

## What We Know
None identified.

## What We Need
None identified.

## What We're Working On
None identified.

## Pain Points
None identified.

## At Risk
None identified.

## Changelog
[{ts}] init → state file created (first run)
"""


def invoke_claude(state: str, signals_text: str, playbook: Path, timeout: int) -> str | None:
    """Call Claude CLI to merge signals into state. Returns merged content or None on failure."""
    # Combine playbook instructions + context into a single prompt — no stdin piping.
    # Splitting across -p and stdin causes Claude CLI to hang waiting for interactive input.
    full_prompt = (
        playbook.read_text()
        + "\n\n---\n\n"
        + f"CURRENT_STATE:\n{state}\n\nNEW_SIGNALS:\n{signals_text}"
    )

    try:
        # Strip ANTHROPIC_API_KEY from env — if .env has a stale key it overrides
        # Claude's stored credentials and causes auth failure.
        clean_env = {k: v for k, v in os.environ.items() if k != "ANTHROPIC_API_KEY"}
        result = subprocess.run(
            ["claude", "--dangerously-skip-permissions", "--print", "-p", full_prompt],
            capture_output=True,
            text=True,
            timeout=timeout,
            env=clean_env,
        )
        if result.returncode != 0:
            err = (result.stderr or result.stdout or "unknown error")[:600]
            print(f"[state_manager] Claude CLI error (rc={result.returncode}): {err}", file=sys.stderr)
            return None
        return result.stdout.strip()
    except subprocess.TimeoutExpired:
        print(f"[state_manager] Claude CLI timed out after {timeout}s", file=sys.stderr)
        notify("AMM Brain", f"State update timed out after {timeout}s. Previous state kept.")
        return None
    except FileNotFoundError:
        print("[state_manager] 'claude' CLI not found in PATH", file=sys.stderr)
        return None


def append_changelog(content: str, sources: list[str], signal_count: int) -> str:
    """Append one line to the ## Changelog section."""
    ts = now_iso()[:19]
    entry = f"[{ts}] {', '.join(sources)} → {signal_count} signals merged"
    if "## Changelog" in content:
        return content.replace("## Changelog", f"## Changelog\n{entry}", 1)
    return content + f"\n## Changelog\n{entry}\n"


def run_validator(state_file: Path, backup_file: Path) -> bool:
    """Call validator.py. Returns True if validation passed."""
    validator = ROOT / "validator.py"
    if not validator.exists():
        print("[state_manager] validator.py not found — skipping validation", file=sys.stderr)
        return True
    result = subprocess.run(
        [sys.executable, str(validator), str(state_file), str(backup_file)],
        capture_output=True,
        text=True,
        timeout=30,
    )
    if result.returncode != 0:
        print(f"[state_manager] Validator rejected: {result.stdout.strip()}", file=sys.stderr)
        return False
    return True


def get_last_state_update(state_file: Path) -> str | None:
    """Extract updated_at from frontmatter."""
    if not state_file.exists():
        return None
    for line in state_file.read_text().splitlines()[:10]:
        if line.startswith("updated_at:"):
            return line.split(":", 1)[1].strip()
    return None


def main():
    config = load_config()
    sm_cfg = config.get("state_manager", {})
    state_file = Path(sm_cfg.get("state_file", "/Users/eillacs/Desktop/Agentic/AMM-Internal/amm-state.md"))
    backup_file = Path(sm_cfg.get("backup_file", state_file.parent / ".amm-state.backup.md"))
    playbook = Path(sm_cfg.get("playbook", ROOT / "STATE_PLAYBOOK.md"))
    timeout = int(sm_cfg.get("timeout_seconds", 90))
    signal_types = sm_cfg.get("signal_types", ["transcripts", "gmail", "circle", "clickup_amm", "clickup_chat"])

    if not playbook.exists():
        print(f"[state_manager] STATE_PLAYBOOK.md not found at {playbook}", file=sys.stderr)
        sys.exit(1)

    db.init_db()

    # Acquire exclusive file lock — blocks if another instance is running
    lock_fd = open(LOCK_FILE, "w")
    try:
        fcntl.flock(lock_fd, fcntl.LOCK_EX)

        window_hours = sm_cfg.get("window_hours", 12)
        signals = load_new_signals(signal_types, window_hours)

        if not signals:
            print("[state_manager] No new signals since last update — nothing to merge")
            return

        print(f"[state_manager] {len(signals)} new signals to merge")
        signals_text = format_signals_for_claude(signals)
        current_state = read_state(state_file, playbook)

        merged = invoke_claude(current_state, signals_text, playbook, timeout)
        if not merged:
            print("[state_manager] Claude returned nothing — keeping previous state")
            return

        # Update frontmatter timestamp
        ts = now_iso()
        sources_used = sorted(set(s["type"] for s in signals))
        if "updated_at:" in merged[:200]:
            lines = merged.splitlines()
            merged = "\n".join(
                f"updated_at: {ts}" if l.startswith("updated_at:") else
                f"sources_checked: {', '.join(sources_used)}" if l.startswith("sources_checked:") else l
                for l in lines
            )

        merged = append_changelog(merged, sources_used, len(signals))

        # Write to a temp file first
        tmp = state_file.with_suffix(".tmp")
        tmp.write_text(merged)

        # Validate (validator reads the tmp file and compares to backup)
        if not run_validator(tmp, backup_file):
            tmp.unlink(missing_ok=True)
            notify("AMM Brain", "State update rejected by validator. Previous version kept.")
            return

        # Backup current, then promote tmp → state file
        if state_file.exists():
            backup_file.write_text(state_file.read_text())
        tmp.replace(state_file)

        print(f"[state_manager] State updated — {len(signals)} signals merged from {', '.join(sources_used)}")

    finally:
        fcntl.flock(lock_fd, fcntl.LOCK_UN)
        lock_fd.close()


if __name__ == "__main__":
    main()
