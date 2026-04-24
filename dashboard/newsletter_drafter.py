#!/usr/bin/env python3
"""
AMM Daily Newsletter Drafter

Runs every morning at 10 AM COT (15:00 UTC).
- Picks today's content: release signal if available, otherwise daily tip rotation
- Saves draft to /tmp/newsletter_draft.json
- Posts markdown preview to ClickUp Chat (SA-AMM channel) for JD review
- Sends ntfy push notification

To publish after review:
  Send 'newsletter-publish' via ntfy iOS Shortcut, or tell Claude "publish the newsletter"
"""

import json
import os
import sqlite3
import urllib.request
import urllib.error
from datetime import datetime, timezone, timedelta
from pathlib import Path

# ── Bootstrap ────────────────────────────────────────────────────────────────

AGENTIC_ROOT = Path(__file__).resolve().parent.parent
DOTENV_PATH = AGENTIC_ROOT / ".env"

def load_env():
    if not DOTENV_PATH.exists():
        return
    for line in DOTENV_PATH.read_text(errors="replace").splitlines():
        line = line.strip()
        if line and not line.startswith("#") and "=" in line:
            key, _, val = line.partition("=")
            os.environ.setdefault(key.strip(), val.strip())

load_env()

CLICKUP_TOKEN     = os.environ.get("CLICKUP_TOKEN", "")
CLICKUP_WORKSPACE = os.environ.get("CLICKUP_WORKSPACE", "9011399348")
# SA-AMM ClickUp Chat channel for newsletter review
NEWSLETTER_CHANNEL_ID = os.environ.get("NEWSLETTER_CHANNEL_ID", "4-90114142872-8")

CIRCLE_API_KEY      = os.environ.get("CIRCLE_API_KEY", "")
CIRCLE_COMMUNITY_ID = os.environ.get("CIRCLE_COMMUNITY_ID", "")
CIRCLE_SPACE_ID     = 2507912  # Mastermind Announcements!

NTFY_TOPIC    = os.environ.get("NTFY_TOPIC", "")
GUARDIAN_DB   = AGENTIC_ROOT / "amm-guardian" / "guardian.db"
DRAFT_FILE    = Path("/var/tmp/newsletter_draft.json")  # /var/tmp persists across reboots

BOGOTA_TZ = timezone(timedelta(hours=-5))

def today_bogota() -> datetime:
    return datetime.now(timezone.utc).astimezone(BOGOTA_TZ)

def log(msg: str):
    print(f"[{datetime.now():%H:%M:%S}] {msg}")

# ── Tip rotation (7 tips — one per day of week) ───────────────────────────────

TIPS = [
    {
        "title": "Daily Tip: One change at a time",
        "card_headline": "💡 Tip — Avoid Claude getting confused mid-build",
        "card_body": (
            "<p style='margin:0 0 10px;color:#111827;'>The fastest way to lose Claude mid-build is overloading it.</p>"
            "<p style='margin:0 0 10px;color:#111827;'><strong>What's working:</strong> 50–60 micro-improvements a day — "
            "one feature, one fix, test, push, move on. Each change is atomic. If something breaks, you know exactly what caused it.</p>"
            "<p style='margin:0;color:#111827;'>One change. Test. Push. Repeat.</p>"
        ),
        "preview": (
            "The fastest way to lose Claude mid-build is overloading it.\n\n"
            "50–60 micro-improvements a day — one feature, one fix, test, push, move on. "
            "One change. Test. Push. Repeat."
        ),
    },
    {
        "title": "Daily Tip: The design brain file",
        "card_headline": "💡 Tip — Stop Claude from improvising your design",
        "card_body": (
            "<p style='margin:0 0 10px;color:#111827;'>Claude will improvise fonts, colors, and spacing unless you tell it not to.</p>"
            "<p style='margin:0 0 10px;color:#111827;'><strong>Fix:</strong> Create a "
            "<code style='background:#1f2937;color:#f9fafb;padding:2px 6px;border-radius:3px;'>.md</code> "
            "file with your exact style decisions — fonts, hex codes, spacing scale, component names. "
            "Feed it at the start of every session. Claude stops guessing and starts executing to spec.</p>"
            "<p style='margin:0;color:#111827;'>Takes 20 minutes to build. Pays back on every project after.</p>"
        ),
        "preview": (
            "Claude will improvise fonts, colors, and spacing unless you tell it not to.\n\n"
            "Fix: Create a .md file with your exact style decisions — fonts, hex codes, spacing. "
            "Feed it at the start of every session. Takes 20 minutes to build, pays back on every project."
        ),
    },
    {
        "title": "Daily Tip: Lock the theme first",
        "card_headline": "💡 Tip — Cut client revisions by 90%+",
        "card_body": (
            "<p style='margin:0 0 10px;color:#111827;'>90% of client feedback happens at the theme stage — not the content pages.</p>"
            "<p style='margin:0 0 10px;color:#111827;'><strong>The sequence that works:</strong> Build homepage + one interior page. "
            "Get them approved. Everything downstream becomes substitutions, not redesigns.</p>"
            "<p style='margin:0;color:#111827;'>One member clocked a 93% reduction in revisions by moving the approval gate "
            "to the theme phase instead of the final build.</p>"
        ),
        "preview": (
            "90% of client feedback happens at the theme stage.\n\n"
            "Build homepage + one interior page, get them approved — everything downstream becomes substitutions, not redesigns. "
            "One member cut revisions by 93% doing this."
        ),
    },
    {
        "title": "Daily Tip: Copy before design",
        "card_headline": "💡 Tip — Build the thing that actually fits",
        "card_body": (
            "<p style='margin:0 0 10px;color:#111827;'>The most common rebuild trigger: great design, wrong copy fit.</p>"
            "<p style='margin:0 0 10px;color:#111827;'><strong>The fix:</strong> Write (or get) the copy first. "
            "Feed it to Claude with layout instructions. The design wraps around real content "
            "instead of placeholder text that never matches what the client wants to say.</p>"
            "<p style='margin:0;color:#111827;'>The order: copy → wireframe → design → build.</p>"
        ),
        "preview": (
            "The most common rebuild trigger: great design, wrong copy fit.\n\n"
            "Write the copy first. Feed it to Claude with layout instructions. "
            "The design wraps around real content. Order: copy → wireframe → design → build."
        ),
    },
    {
        "title": "Daily Tip: Your AI rules file",
        "card_headline": "💡 Tip — Give Claude your operating manual",
        "card_body": (
            "<p style='margin:0 0 10px;color:#111827;'>Claude starts fresh every session unless you tell it who it's working for and how.</p>"
            "<p style='margin:0 0 10px;color:#111827;'><strong>Create an "
            "<code style='background:#1f2937;color:#f9fafb;padding:2px 6px;border-radius:3px;'>AI_rules.md</code> file</strong> "
            "with your stack, your standards, what not to touch. Drop it into every project. "
            "Claude reads it and operates inside your system instead of inventing its own.</p>"
            "<p style='margin:0;color:#111827;'>The difference between Claude that drifts and Claude that delivers is usually this file.</p>"
        ),
        "preview": (
            "Claude starts fresh every session unless you tell it how to work.\n\n"
            "Create an AI_rules.md with your stack, standards, and what not to touch. "
            "Drop it into every project. The difference between Claude that drifts and Claude that delivers is usually this file."
        ),
    },
    {
        "title": "Daily Tip: Build niche design styles",
        "card_headline": "💡 Tip — Stop solving the same design problem every project",
        "card_body": (
            "<p style='margin:0 0 10px;color:#111827;'>Design decisions that work for a law firm don't work for a med spa. Solving this every project wastes hours.</p>"
            "<p style='margin:0 0 10px;color:#111827;'><strong>What works:</strong> Build 3–4 style presets for your niche "
            "— e.g. Traditional, Luxury, Modern, Youthful. Define fonts, colors, spacing, tone for each. "
            "Let clients pick a direction in the first call.</p>"
            "<p style='margin:0;color:#111827;'>Members who've done this report client feedback drops dramatically — "
            "they're reacting to intentional choices, not improvised ones.</p>"
        ),
        "preview": (
            "Design decisions that work for a law firm don't work for a med spa.\n\n"
            "Build 3–4 style presets for your niche — Traditional, Luxury, Modern, Youthful. "
            "Define fonts, colors, tone for each. Let clients pick in the first call."
        ),
    },
    {
        "title": "Daily Tip: MCP directly vs Website Studio — know when to switch",
        "card_headline": "💡 Tip — Pick the right tool for the complexity",
        "card_body": (
            "<p style='margin:0 0 10px;color:#111827;'>Website Studio is fast for standard pages. "
            "For multi-page builds with complex logic, going directly through the SA MCP in Claude Code "
            "is more predictable.</p>"
            "<p style='margin:0 0 10px;color:#111827;'><strong>Rule of thumb:</strong><br>"
            "Single pages, quick edits → Website Studio<br>"
            "Multi-page builds, custom components, heavy logic → Claude Code + SA MCP directly</p>"
            "<p style='margin:0;color:#111827;'>The UI adds a processing layer. For complex builds, "
            "removing it gives you direct control and consistent output.</p>"
        ),
        "preview": (
            "Website Studio for simple pages. Claude Code + SA MCP directly for complex builds.\n\n"
            "The UI adds a processing layer — for multi-page builds with custom logic, going direct "
            "gives you more control and consistent output."
        ),
    },
]


# ── Guardian DB: check for unprocessed release signals ───────────────────────

def check_for_new_release() -> dict | None:
    """
    Look for a claude-code release signal collected in the last 72h
    that hasn't been analyzed yet. Returns basic info if found.
    """
    if not GUARDIAN_DB.exists():
        return None
    try:
        conn = sqlite3.connect(str(GUARDIAN_DB))
        c = conn.cursor()
        cutoff = (datetime.now(timezone.utc) - timedelta(hours=72)).isoformat()
        c.execute(
            "SELECT signal_key, file_path, collected_at FROM signals "
            "WHERE source = 'releases' AND status = 'collected' AND collected_at > ? "
            "ORDER BY collected_at DESC LIMIT 1",
            (cutoff,)
        )
        row = c.fetchone()
        conn.close()
        if not row:
            return None
        signal_key, file_path, collected_at = row
        # Try to read the signal file for version info
        if file_path:
            fp = Path(file_path)
            if not fp.is_absolute():
                fp = AGENTIC_ROOT / file_path
            if fp.exists():
                data = json.loads(fp.read_text())
                preview = data.get("content_preview", "")
                # Extract version numbers from the atom feed
                import re
                versions = re.findall(r"v2\.\d+\.\d+", preview)
                if versions:
                    return {"versions": list(dict.fromkeys(versions))[:3], "collected_at": collected_at}
        return None
    except Exception as e:
        log(f"[guardian-check] {e}")
        return None


# ── Content picker ────────────────────────────────────────────────────────────

def pick_content(today: datetime) -> dict:
    """
    Returns a dict with: title, card_headline, card_body, preview, card_color, intro
    """
    release = check_for_new_release()
    if release:
        versions = release["versions"]
        version_str = " + ".join(versions[:2])
        return {
            "title": f"Claude Code update: {version_str}",
            "card_headline": f"🔵 Claude Code {version_str} — no action needed",
            "card_body": (
                f"<p style='margin:0 0 10px;color:#111827;'>New Claude Code release picked up: "
                f"<strong>{version_str}</strong>.</p>"
                f"<p style='margin:0;color:#111827;'>Full analysis coming from the Guardian. "
                f"Update with <code style='background:#1f2937;color:#f9fafb;padding:2px 6px;border-radius:3px;'>"
                f"npm update -g @anthropic-ai/claude-code</code> to stay current.</p>"
            ),
            "preview": f"New Claude Code release: {version_str}. Update with: npm update -g @anthropic-ai/claude-code",
            "card_color": "#38bdf8",
            "card_bg": "#f0f9ff",
            "intro": f"Quick heads up — Claude Code has a new release.",
        }

    # Daily tip rotation by day of week
    tip = TIPS[today.weekday() % len(TIPS)]
    return {
        **tip,
        "card_color": "#f59e0b",
        "card_bg": "#fffbeb",
        "intro": "A quick tip from what's been working across sessions.",
    }


# ── HTML formatter (matches the newsletter card format) ──────────────────────

def build_html(content: dict) -> str:
    color = content["card_color"]
    bg = content["card_bg"]
    headline = content["card_headline"]
    body = content["card_body"]
    intro = content["intro"]
    return (
        f"<p>{intro}</p>"
        f"<div style='border-left:4px solid {color};background:{bg};border-radius:6px;"
        f"padding:16px 20px;margin:16px 0;color:#111827;'>"
        f"<p style='margin:0 0 12px;font-weight:600;color:#111827;'>{headline}</p>"
        f"{body}"
        f"</div>"
        f"<p>Questions? Drop them below.</p>"
    )


# ── ClickUp Chat sender ───────────────────────────────────────────────────────

def post_to_clickup(markdown: str) -> str:
    """Post markdown message to the SA-AMM newsletter review channel."""
    url = (
        f"https://api.clickup.com/api/v3/workspaces/{CLICKUP_WORKSPACE}"
        f"/chat/channels/{NEWSLETTER_CHANNEL_ID}/messages"
    )
    import urllib.request
    data = json.dumps({
        "type": "message",
        "content": markdown,
        "content_format": "text/md",
    }).encode()
    req = urllib.request.Request(
        url,
        data=data,
        headers={
            "Authorization": CLICKUP_TOKEN,
            "Content-Type": "application/json",
        },
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            body = json.loads(resp.read())
            msg_id = body.get("id", "")
            log(f"[clickup] ✓ Draft sent (id: {msg_id})")
            return msg_id
    except urllib.error.HTTPError as e:
        err = e.read().decode(errors="replace")
        log(f"[clickup] ✗ HTTP {e.code}: {err[:300]}")
        raise


# ── ntfy helper ──────────────────────────────────────────────────────────────

def notify(title: str, message: str):
    if not NTFY_TOPIC:
        return
    try:
        req = urllib.request.Request(
            f"https://ntfy.sh/{NTFY_TOPIC}",
            data=message.encode(),
            headers={"Title": title, "Priority": "default", "Tags": "newspaper"},
        )
        urllib.request.urlopen(req, timeout=10)
    except Exception as e:
        log(f"[ntfy] {e}")


# ── Main ──────────────────────────────────────────────────────────────────────

def main():
    today = today_bogota()
    date_str = today.strftime("%Y-%m-%d")
    log(f"Newsletter drafter — {date_str}")

    # Idempotency: skip if today's draft already exists and was sent
    if DRAFT_FILE.exists():
        try:
            existing = json.loads(DRAFT_FILE.read_text())
            if existing.get("date") == date_str and existing.get("clickup_sent"):
                log(f"[skip] Draft for {date_str} already sent — not re-sending")
                return
        except Exception:
            pass  # corrupt file, overwrite it

    content = pick_content(today)
    html_body = build_html(content)

    # Save draft for publisher
    draft = {
        "date": date_str,
        "title": content["title"],
        "html_body": html_body,
        "space_id": CIRCLE_SPACE_ID,
        "generated_at": datetime.now(timezone.utc).isoformat(),
    }
    DRAFT_FILE.write_text(json.dumps(draft, indent=2))
    log(f"[draft] Saved to {DRAFT_FILE}")

    # Build ClickUp markdown preview
    clickup_msg = (
        f"📨 **Newsletter Draft — {today.strftime('%B %d')}**\n\n"
        f"**Space:** Mastermind General Q&A\n"
        f"**Title:** {content['title']}\n\n"
        f"---\n\n"
        f"{content['preview']}\n\n"
        f"---\n"
        f"_Send `newsletter-publish` via ntfy to post to Circle._"
    )

    if not CLICKUP_TOKEN:
        log("[clickup] CLICKUP_TOKEN not set — skipping ClickUp post")
        log(f"[preview]\n{clickup_msg}")
    else:
        try:
            post_to_clickup(clickup_msg)
            draft["clickup_sent"] = True
            DRAFT_FILE.write_text(json.dumps(draft, indent=2))
        except Exception as e:
            log(f"[clickup] Failed: {e}")

    notify(
        "Newsletter Draft Ready",
        f"{content['title']} — send newsletter-publish to post to Circle",
    )
    log("Done.")


if __name__ == "__main__":
    main()
