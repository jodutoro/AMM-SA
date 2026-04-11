#!/usr/bin/env python3
"""
AMM Slack Puller — pulls a Slack channel or thread and saves as markdown transcript.

Usage:
  python3 scripts/pull_slack.py --channel amm-coaching --limit 100
  python3 scripts/pull_slack.py --channel C0XXXXXXX --limit 50 --thread 1234567890.123456

Output: transcripts/slack-{channel}-{YYYY-MM-DD}.md
Pushing that file triggers the auto-ingest GitHub Action → dashboard updates.

Token: reads SLACK_BOT_TOKEN from .env (falls back to SLACK_TOKEN)
"""

import argparse
import os
from datetime import datetime, timezone
from pathlib import Path

import requests
from dotenv import load_dotenv

ROOT = Path(__file__).parent.parent
TRANSCRIPTS_DIR = ROOT / "transcripts"
SLACK_API = "https://slack.com/api"


def auth_headers(token):
    return {"Authorization": f"Bearer {token}"}


def resolve_channel_id(token, name):
    name = name.lstrip("#")
    if name.startswith("C") and len(name) > 8:
        return name
    r = requests.get(
        f"{SLACK_API}/conversations.list",
        headers=auth_headers(token),
        params={"limit": 200, "types": "public_channel,private_channel"},
    )
    data = r.json()
    if not data.get("ok"):
        raise RuntimeError(f"conversations.list error: {data.get('error')}")
    for ch in data.get("channels", []):
        if ch["name"] == name:
            return ch["id"]
    return name


def resolve_user(token, user_id, _cache={}):
    if user_id in _cache:
        return _cache[user_id]
    r = requests.get(
        f"{SLACK_API}/users.info", headers=auth_headers(token), params={"user": user_id}
    )
    name = r.json().get("user", {}).get("real_name") or user_id
    _cache[user_id] = name
    return name


def fetch_messages(token, channel_id, limit, thread_ts=None):
    if thread_ts:
        endpoint = f"{SLACK_API}/conversations.replies"
        params = {"channel": channel_id, "ts": thread_ts, "limit": limit}
    else:
        endpoint = f"{SLACK_API}/conversations.history"
        params = {"channel": channel_id, "limit": limit}
    r = requests.get(endpoint, headers=auth_headers(token), params=params)
    data = r.json()
    if not data.get("ok"):
        raise RuntimeError(f"Slack API error: {data.get('error')}")
    return data.get("messages", [])


def messages_to_markdown(messages, token, channel_name):
    lines = [
        f"# Slack — #{channel_name}",
        f"Pulled: {datetime.now(timezone.utc).strftime('%Y-%m-%d %H:%M UTC')}",
        "",
    ]
    for msg in reversed(messages):
        ts = datetime.fromtimestamp(float(msg.get("ts", 0)), tz=timezone.utc)
        user_id = msg.get("user", "")
        user = resolve_user(token, user_id) if user_id else "Bot"
        text = msg.get("text", "").strip()
        if not text:
            continue
        lines.append(f"**{user}** [{ts.strftime('%H:%M')}]: {text}")
        lines.append("")
    return "\n".join(lines)


def main():
    load_dotenv(ROOT / ".env")
    token = os.getenv("SLACK_BOT_TOKEN") or os.getenv("SLACK_TOKEN")
    if not token:
        raise SystemExit("SLACK_BOT_TOKEN not found in .env")

    parser = argparse.ArgumentParser(description="Pull Slack channel → AMM transcript")
    parser.add_argument("--channel", required=True, help="Channel name or ID")
    parser.add_argument("--limit", type=int, default=100)
    parser.add_argument("--thread", metavar="TS", help="Thread timestamp for replies")
    args = parser.parse_args()

    channel_name = args.channel.lstrip("#")
    channel_id = resolve_channel_id(token, channel_name)

    print(f"Fetching #{channel_name} (id={channel_id}, limit={args.limit})...")
    messages = fetch_messages(token, channel_id, args.limit, args.thread)

    if not messages:
        print("No messages found.")
        return

    content = messages_to_markdown(messages, token, channel_name)
    date_str = datetime.now().strftime("%Y-%m-%d")
    out_file = TRANSCRIPTS_DIR / f"slack-{channel_name}-{date_str}.md"
    out_file.write_text(content, encoding="utf-8")

    print(f"✅ {len(messages)} messages → {out_file.relative_to(ROOT)}")
    print(f"   git add transcripts/ && git commit -m 'chore: pull slack {channel_name}' && git push")


if __name__ == "__main__":
    main()
