#!/usr/bin/env python3
"""
AMM ClickUp Puller — pulls tasks/comments from a ClickUp list or task.

Usage:
  python3 scripts/pull_clickup.py --list 901234567 --limit 30
  python3 scripts/pull_clickup.py --task abc123xyz

Output: transcripts/clickup-{slug}-{YYYY-MM-DD}.md
Pushing that file triggers the auto-ingest GitHub Action → dashboard updates.

Token: reads CLICKUP_TOKEN from .env
"""

import argparse
import os
from datetime import datetime, timezone
from pathlib import Path

import requests
from dotenv import load_dotenv

ROOT = Path(__file__).parent.parent
TRANSCRIPTS_DIR = ROOT / "transcripts"
API = "https://api.clickup.com/api/v2"


def _headers(token):
    return {"Authorization": token, "Content-Type": "application/json"}


def get_task_comments(token, task_id):
    r = requests.get(f"{API}/task/{task_id}/comment", headers=_headers(token))
    data = r.json()
    if "err" in data:
        print(f"  [warn] comments for {task_id}: {data['err']}")
        return []
    return data.get("comments", [])


def get_list_tasks(token, list_id, limit):
    r = requests.get(
        f"{API}/list/{list_id}/task",
        headers=_headers(token),
        params={"limit": limit, "order_by": "updated", "reverse": True, "include_closed": True},
    )
    data = r.json()
    if "err" in data:
        raise RuntimeError(f"ClickUp list error: {data['err']}")
    return data.get("tasks", [])


def format_list(tasks, token, list_id):
    lines = [
        f"# ClickUp — List {list_id}",
        f"Pulled: {datetime.now(timezone.utc).strftime('%Y-%m-%d %H:%M UTC')}",
        "",
    ]
    for task in tasks:
        status = task.get("status", {}).get("status", "unknown")
        lines.append(f"## {task['name']} (status: {status})")
        desc = (task.get("description") or "").strip()
        if desc:
            lines.append(desc[:500])
        for c in get_task_comments(token, task["id"]):
            user = c.get("user", {}).get("username") or "unknown"
            text = c.get("comment_text", "").strip()
            ts = datetime.fromtimestamp(c.get("date", 0) / 1000, tz=timezone.utc).strftime("%Y-%m-%d %H:%M")
            lines.append(f"  **{user}** [{ts}]: {text}")
        lines.append("")
    return "\n".join(lines)


def format_task_comments(task_id, comments):
    lines = [
        f"# ClickUp — Task {task_id}",
        f"Pulled: {datetime.now(timezone.utc).strftime('%Y-%m-%d %H:%M UTC')}",
        "",
    ]
    for c in comments:
        user = c.get("user", {}).get("username") or "unknown"
        text = c.get("comment_text", "").strip()
        ts = datetime.fromtimestamp(c.get("date", 0) / 1000, tz=timezone.utc).strftime("%Y-%m-%d %H:%M")
        lines.append(f"**{user}** [{ts}]: {text}")
    return "\n".join(lines)


def main():
    load_dotenv(ROOT / ".env")
    token = os.getenv("CLICKUP_TOKEN") or os.getenv("CLICKUP_API_TOKEN")
    if not token:
        raise SystemExit("CLICKUP_TOKEN not found in .env")

    parser = argparse.ArgumentParser(description="Pull ClickUp list or task → AMM transcript")
    group = parser.add_mutually_exclusive_group(required=True)
    group.add_argument("--list", dest="list_id", help="ClickUp list ID")
    group.add_argument("--task", dest="task_id", help="ClickUp task ID")
    parser.add_argument("--limit", type=int, default=50)
    args = parser.parse_args()

    date_str = datetime.now().strftime("%Y-%m-%d")

    if args.list_id:
        print(f"Fetching list {args.list_id} (limit={args.limit})...")
        tasks = get_list_tasks(token, args.list_id, args.limit)
        content = format_list(tasks, token, args.list_id)
        slug = f"list-{args.list_id}"
        count = f"{len(tasks)} tasks"
    else:
        print(f"Fetching task {args.task_id} comments...")
        comments = get_task_comments(token, args.task_id)
        content = format_task_comments(args.task_id, comments)
        slug = f"task-{args.task_id}"
        count = f"{len(comments)} comments"

    out_file = TRANSCRIPTS_DIR / f"clickup-{slug}-{date_str}.md"
    out_file.write_text(content, encoding="utf-8")

    print(f"✅ {count} → {out_file.relative_to(ROOT)}")
    print(f"   git add transcripts/ && git commit -m 'chore: pull clickup {slug}' && git push")


if __name__ == "__main__":
    main()
