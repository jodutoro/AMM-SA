#!/usr/bin/env python3
"""
ntfy command bus daemon — listens for phone commands, runs local scripts, sends results back.

Architecture:
  Phone (iOS Shortcut) → ntfy command topic → this daemon → runs script → ntfy result topic → Phone

Commands supported:
  eod-report      — Run EOD report (no --shift-gate, always executes)
  morning-brief   — Run morning brief on demand
  fathom-process  — Process latest Fathom transcripts via dashboard API
"""

import json
import os
import subprocess
import sys
import time
import urllib.request
import urllib.error
from pathlib import Path
from datetime import datetime, timezone

# ── Config ──────────────────────────────────────────────────────────────────

DOTENV_PATH = Path(__file__).resolve().parent.parent / ".env"

def load_env():
    """Load .env file into environment."""
    if DOTENV_PATH.exists():
        for line in DOTENV_PATH.read_text().splitlines():
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                key, _, val = line.partition("=")
                os.environ.setdefault(key.strip(), val.strip())

load_env()

NTFY_CMD_TOPIC = os.environ.get("NTFY_CMD_TOPIC", "")
NTFY_TOPIC = os.environ.get("NTFY_TOPIC", "")
PYTHON = "/Library/Frameworks/Python.framework/Versions/3.14/bin/python3"
SCRIPTS_DIR = Path.home() / "Desktop/Agentic/Work stuff/clientops-backend/scripts"
DASHBOARD_URL = "http://localhost:8765"

if not NTFY_CMD_TOPIC or not NTFY_TOPIC:
    print("ERROR: NTFY_CMD_TOPIC and NTFY_TOPIC must be set in .env", file=sys.stderr)
    sys.exit(1)

NTFY_STREAM_URL = f"https://ntfy.sh/{NTFY_CMD_TOPIC}/json"
NTFY_PUBLISH_URL = f"https://ntfy.sh/{NTFY_TOPIC}"

# ── Notification helper ─────────────────────────────────────────────────────

def notify(title: str, message: str, priority: str = "default"):
    """Send push notification via ntfy."""
    try:
        req = urllib.request.Request(
            NTFY_PUBLISH_URL,
            data=message.encode(),
            headers={
                "Title": title,
                "Priority": priority,
                "Tags": "robot",
            },
        )
        urllib.request.urlopen(req, timeout=10)
    except Exception as e:
        print(f"[ntfy] Failed to send notification: {e}", file=sys.stderr)


def run_script(script_name: str, args: list[str] | None = None) -> tuple[int, str, str]:
    """Run a Python script and return (exit_code, stdout, stderr)."""
    cmd = [PYTHON, str(SCRIPTS_DIR / script_name)]
    if args:
        cmd.extend(args)
    # CWD must be clientops-backend/ so `from core.model_router import ...` resolves
    cwd = SCRIPTS_DIR.parent
    try:
        result = subprocess.run(
            cmd,
            capture_output=True,
            text=True,
            timeout=300,
            cwd=str(cwd),
            env={**os.environ, "PYTHONDONTWRITEBYTECODE": "1"},
        )
        return result.returncode, result.stdout, result.stderr
    except subprocess.TimeoutExpired:
        return -1, "", "Script timed out after 5 minutes"
    except Exception as e:
        return -1, "", str(e)

# ── Command handlers ────────────────────────────────────────────────────────

def handle_eod_report():
    """Run EOD report without shift gate."""
    notify("EOD Report", "Running EOD report...", "low")
    log("Running eod_report.py...")
    code, stdout, stderr = run_script("eod_report.py")
    log(f"eod_report.py exited with code {code}")
    if stdout.strip():
        log(f"  stdout: {stdout.strip()[:200]}")
    if stderr.strip():
        log(f"  stderr: {stderr.strip()[:200]}")
    if code == 0:
        notify("EOD Report", "Posted to ClickUp successfully", "default")
    else:
        err_summary = (stderr or stdout or "Unknown error")[:300]
        notify("EOD Report FAILED", err_summary, "high")


def handle_morning_brief():
    """Run morning brief on demand."""
    notify("Morning Brief", "Generating morning brief...", "low")
    log("Running morning_brief.py...")
    code, stdout, stderr = run_script("morning_brief.py")
    log(f"morning_brief.py exited with code {code}")
    if stdout.strip():
        log(f"  stdout: {stdout.strip()[:200]}")
    if stderr.strip():
        log(f"  stderr: {stderr.strip()[:200]}")
    if code == 0:
        notify("Morning Brief", "Sent to Slack DM", "default")
    else:
        err_summary = (stderr or stdout or "Unknown error")[:300]
        notify("Morning Brief FAILED", err_summary, "high")


def handle_fathom_process():
    """Process Fathom transcripts via dashboard API."""
    notify("Fathom", "Processing transcripts...", "low")
    try:
        # Check if dashboard is running
        health_req = urllib.request.Request(f"{DASHBOARD_URL}/api/health")
        urllib.request.urlopen(health_req, timeout=5)
    except Exception:
        notify("Fathom FAILED", "Dashboard not running on port 8765", "high")
        return

    try:
        # Get cloud data to find unprocessed calls
        data_req = urllib.request.Request(f"{DASHBOARD_URL}/api/morning-brief")
        resp = urllib.request.urlopen(data_req, timeout=30)
        brief_data = json.loads(resp.read())
        fathom_calls = brief_data.get("fathom", {}).get("unprocessed", [])

        if not fathom_calls:
            notify("Fathom", "No new calls to process", "default")
            return

        processed = []
        failed = []
        for call in fathom_calls:
            call_id = call.get("id") or call.get("call_id")
            if not call_id:
                continue
            try:
                proc_req = urllib.request.Request(
                    f"{DASHBOARD_URL}/api/fathom/process/{call_id}",
                    method="POST",
                    data=b"",
                )
                urllib.request.urlopen(proc_req, timeout=60)
                title = call.get("title", call_id)
                processed.append(title)
            except Exception as e:
                failed.append(f"{call_id}: {e}")

        parts = []
        if processed:
            parts.append(f"Processed {len(processed)}: {', '.join(processed[:3])}")
        if failed:
            parts.append(f"Failed {len(failed)}: {', '.join(failed[:2])}")
        notify("Fathom", " | ".join(parts) or "Done", "default")

    except Exception as e:
        notify("Fathom FAILED", str(e)[:300], "high")


def handle_newsletter_publish():
    """Read saved newsletter draft and post it to Circle."""
    draft_file = Path("/var/tmp/newsletter_draft.json")
    if not draft_file.exists():
        notify("Newsletter", "No draft at /var/tmp/newsletter_draft.json — run drafter first", "high")
        return

    try:
        draft = json.loads(draft_file.read_text())
    except Exception as e:
        notify("Newsletter FAILED", f"Could not read draft: {e}", "high")
        return

    # Guard against double-publish
    if draft.get("published_at"):
        existing_url = draft.get("circle_url", "already published")
        notify("Newsletter", f"Already published: {existing_url}", "low")
        log(f"[newsletter] Already published at {draft['published_at']} — skipping")
        return

    title = draft.get("title", "Newsletter")
    html_body = draft.get("html_body", "")
    space_id = draft.get("space_id", 2507912)

    circle_key = os.environ.get("CIRCLE_API_KEY", "")
    community_id_raw = os.environ.get("CIRCLE_COMMUNITY_ID", "")

    if not circle_key or not community_id_raw:
        notify("Newsletter FAILED", "CIRCLE_API_KEY or CIRCLE_COMMUNITY_ID not set in .env", "high")
        return

    try:
        community_id = int(community_id_raw)
    except ValueError:
        notify("Newsletter FAILED", f"CIRCLE_COMMUNITY_ID is not a valid integer: {community_id_raw}", "high")
        return

    notify("Newsletter", f"Publishing: {title}", "low")
    log(f"Publishing newsletter to Circle: {title}")

    payload = json.dumps({
        "community_id": community_id,
        "space_id": space_id,
        "name": title,
        "body": html_body,
    }).encode()

    req = urllib.request.Request(
        "https://app.circle.so/api/v1/posts",
        data=payload,
        headers={
            "Authorization": f"Bearer {circle_key}",
            "Content-Type": "application/json",
        },
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=20) as resp:
            data = json.loads(resp.read())
            url = data.get("topic", {}).get("url", "no url returned")
            log(f"[circle] ✓ Published: {url}")
            draft["published_at"] = datetime.now(timezone.utc).isoformat()
            draft["circle_url"] = url
            draft_file.write_text(json.dumps(draft, indent=2))
            notify("Newsletter Published", url, "default")
    except urllib.error.HTTPError as e:
        err = e.read().decode(errors="replace")[:300]
        log(f"[circle] ✗ HTTP {e.code}: {err}")
        notify("Newsletter FAILED", f"HTTP {e.code}: {err}", "high")
    except Exception as e:
        log(f"[circle] ✗ {e}")
        notify("Newsletter FAILED", str(e)[:300], "high")


def handle_ask_claude(prompt: str):
    """Run a custom prompt via Claude CLI and return the result."""
    notify("Ask Claude", f"Running: {prompt[:80]}...", "low")
    log(f"Running claude -p with prompt: {prompt[:100]}")
    try:
        result = subprocess.run(
            ["/Users/eillacs/.local/bin/claude", "-p", prompt, "--output-format", "text"],
            capture_output=True,
            text=True,
            timeout=300,
            cwd=str(Path(__file__).resolve().parent.parent),
            env={**os.environ, "PYTHONDONTWRITEBYTECODE": "1"},
        )
        output = (result.stdout or result.stderr or "No output").strip()
        log(f"Claude exited with code {result.returncode}, output length: {len(output)}")
        # ntfy has a ~4KB message limit; truncate to 500 chars for readability
        truncated = output[:500] + ("..." if len(output) > 500 else "")
        notify("Claude Result", truncated, "default")
    except subprocess.TimeoutExpired:
        notify("Ask Claude FAILED", "Timed out after 5 minutes", "high")
    except Exception as e:
        notify("Ask Claude FAILED", str(e)[:300], "high")


COMMANDS = {
    "eod-report": handle_eod_report,
    "morning-brief": handle_morning_brief,
    "fathom-process": handle_fathom_process,
    "newsletter-publish": handle_newsletter_publish,
}

# ── Logging helper ──────────────────────────────────────────────────────────

def log(msg: str):
    print(f"[{datetime.now():%H:%M:%S}] {msg}")

# ── Main loop ───────────────────────────────────────────────────────────────

POLL_INTERVAL = 10  # seconds between polls
LAST_ID_FILE = Path(__file__).resolve().parent / ".trigger_last_id"


def get_last_id() -> str:
    """Read the last processed message ID to avoid replaying old commands."""
    try:
        return LAST_ID_FILE.read_text().strip()
    except FileNotFoundError:
        return ""


def save_last_id(msg_id: str):
    LAST_ID_FILE.write_text(msg_id)


def poll_commands():
    """Poll ntfy for new commands and dispatch them. More reliable than streaming."""
    log(f"Listening on ntfy topic: {NTFY_CMD_TOPIC}")
    log(f"Results go to: {NTFY_TOPIC}")
    log(f"Commands: {', '.join(COMMANDS.keys())}")
    log(f"Poll interval: {POLL_INTERVAL}s")

    # On first start, set since=10s to avoid replaying old messages
    last_id = get_last_id()
    since = last_id if last_id else "10s"

    while True:
        try:
            url = f"https://ntfy.sh/{NTFY_CMD_TOPIC}/json?poll=1&since={since}"
            req = urllib.request.Request(url)
            with urllib.request.urlopen(req, timeout=30) as resp:
                for line in resp.read().decode().splitlines():
                    line = line.strip()
                    if not line:
                        continue
                    try:
                        msg = json.loads(line)
                    except json.JSONDecodeError:
                        continue

                    if msg.get("event") != "message":
                        continue

                    msg_id = msg.get("id", "")
                    raw_message = (msg.get("message") or "").strip()

                    # iOS Shortcuts sends JSON like {"":"eod-report"} (empty key, command as value)
                    # or {"eod-report":""} (command as key, empty value)
                    # ntfy passes the whole JSON string as the message — extract the command
                    command = raw_message.lower()
                    if command.startswith("{"):
                        try:
                            parsed = json.loads(raw_message)
                            if isinstance(parsed, dict) and parsed:
                                first_key = next(iter(parsed))
                                first_val = parsed[first_key]
                                # Pick whichever is non-empty: key or value
                                extracted = first_key if first_key else str(first_val) if first_val else first_key
                                # For ask commands: {"ask":"prompt"} or {"":"ask:prompt"}
                                if extracted.lower().startswith("ask:") or (first_key.lower() == "ask" and first_val):
                                    raw_message = f"ask:{first_val}" if first_key.lower() == "ask" else extracted
                                else:
                                    raw_message = extracted
                                command = raw_message.lower()
                        except (json.JSONDecodeError, StopIteration):
                            pass

                    if command.startswith("ask:"):
                        prompt = raw_message[4:].strip()  # preserve original case
                        if prompt:
                            log(f"Received ask command: {prompt[:80]}")
                            try:
                                handle_ask_claude(prompt)
                                log("Completed: ask")
                            except Exception as e:
                                log(f"Handler error for ask: {e}")
                                notify("Ask Claude ERROR", str(e)[:300], "high")
                        else:
                            notify("Ask Claude", "Empty prompt — send ask:your question here", "low")
                    elif command in COMMANDS:
                        log(f"Received command: {command}")
                        try:
                            COMMANDS[command]()
                            log(f"Completed: {command}")
                        except Exception as e:
                            log(f"Handler error for {command}: {e}")
                            notify(f"{command} ERROR", str(e)[:300], "high")
                    elif command:
                        log(f"Unknown command: {command}")
                        notify("Unknown Command", f"'{command}' not valid. Use: {', '.join(COMMANDS.keys())}, ask:<prompt>", "low")

                    # Track last message so we never replay
                    if msg_id:
                        save_last_id(msg_id)
                        since = msg_id

        except Exception as e:
            log(f"Poll error: {e}")

        time.sleep(POLL_INTERVAL)


if __name__ == "__main__":
    poll_commands()
