#!/usr/bin/env python3
"""JD Command Center — live work aggregator server.
Serves the dashboard at http://localhost:8765
Pulls ClickUp + Linear every 5 min; Calendar/Slack from cloud_data.json (updated by Claude).
"""

import asyncio
import json
import os
import time
from datetime import datetime, timezone
from pathlib import Path

import httpx
from dotenv import load_dotenv
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, HTMLResponse, JSONResponse

load_dotenv(Path(__file__).parent.parent / ".env")

# ── Config ─────────────────────────────────────────────────────────────────────
CLICKUP_TOKEN       = os.getenv("CLICKUP_TOKEN", "")
CLICKUP_WORKSPACE   = "9011399348"
CLICKUP_USER_ID     = "81342217"
LINEAR_API_KEY      = os.getenv("LINEAR_API_KEY", "")
SLACK_BOT_TOKEN     = os.getenv("SLACK_BOT_TOKEN", "")
MCP_QA_API_KEY      = os.getenv("MCP_QA_API_KEY", "")
FATHOM_API_KEY      = os.getenv("FATHOM_API_KEY", "")
SLACK_JD_USER_ID    = "U06J10MNAVB"
GITHUB_TOKEN        = os.getenv("GUARDIAN_GITHUB_TOKEN", "") or os.getenv("GITHUB_TOKEN", "")
DASHBOARD_DIR       = Path(__file__).parent
CACHE_TTL           = 300   # 5 min

# ── Startup diagnostics ──
print(f"[env] CLICKUP_TOKEN={'SET' if CLICKUP_TOKEN else 'MISSING'}")
print(f"[env] LINEAR_API_KEY={'SET' if LINEAR_API_KEY else 'MISSING'}")
print(f"[env] SLACK_BOT_TOKEN={'SET' if SLACK_BOT_TOKEN else 'MISSING'}")
print(f"[env] MCP_QA_API_KEY={'SET' if MCP_QA_API_KEY else 'MISSING'}")
print(f"[env] FATHOM_API_KEY={'SET' if FATHOM_API_KEY else 'MISSING'}")
print(f"[env] GITHUB_TOKEN={'SET' if GITHUB_TOKEN else 'MISSING'}")

app = FastAPI(title="JD Command Center")
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

_cache: dict = {"data": None, "ts": 0.0}


# ── Data fetchers ──────────────────────────────────────────────────────────────

async def fetch_clickup() -> list:
    if not CLICKUP_TOKEN:
        return []
    headers = {"Authorization": CLICKUP_TOKEN}
    tasks = []
    try:
        async with httpx.AsyncClient(timeout=20) as client:
            r = await client.get(
                f"https://api.clickup.com/api/v2/team/{CLICKUP_WORKSPACE}/task",
                headers=headers,
                params={
                    "assignees[]": CLICKUP_USER_ID,
                    "include_closed": "false",
                    "subtasks": "true",
                    "reverse": "true",
                    "order_by": "updated",
                    "page": 0,
                },
            )
            if r.status_code == 200:
                tasks = r.json().get("tasks", [])
            else:
                print(f"[ClickUp] {r.status_code}: {r.text[:200]}")
    except Exception as e:
        print(f"[ClickUp] fetch error: {e}")
    return tasks


async def fetch_linear() -> list:
    if not LINEAR_API_KEY:
        return []
    query = """
    query {
      issues(
        filter: {
          assignee: { isMe: { eq: true } }
          state: { type: { nin: ["completed", "cancelled"] } }
        }
        first: 50
        orderBy: updatedAt
      ) {
        nodes {
          id identifier title priority
          state { name type }
          dueDate updatedAt url
          project { name }
          team { name }
        }
      }
    }
    """
    try:
        async with httpx.AsyncClient(timeout=20) as client:
            r = await client.post(
                "https://api.linear.app/graphql",
                headers={"Authorization": LINEAR_API_KEY, "Content-Type": "application/json"},
                json={"query": query},
            )
            if r.status_code == 200:
                return r.json().get("data", {}).get("issues", {}).get("nodes", [])
            print(f"[Linear] {r.status_code}")
    except Exception as e:
        print(f"[Linear] fetch error: {e}")
    return []


async def fetch_slack_mentions() -> list:
    """Search for @JD mentions. Requires user token (xoxp-); bot tokens can't search."""
    if not SLACK_BOT_TOKEN or not SLACK_BOT_TOKEN.startswith("xoxp"):
        return []
    try:
        async with httpx.AsyncClient(timeout=20) as client:
            r = await client.get(
                "https://slack.com/api/search.messages",
                headers={"Authorization": f"Bearer {SLACK_BOT_TOKEN}"},
                params={"query": f"<@{SLACK_JD_USER_ID}>", "count": 20, "sort": "timestamp"},
            )
            if r.status_code == 200:
                d = r.json()
                if d.get("ok"):
                    return d.get("messages", {}).get("matches", [])
    except Exception as e:
        print(f"[Slack] fetch error: {e}")
    return []


async def fetch_mcp_qa() -> list:
    """Fetch SA MCP module health from QA dashboard."""
    if not MCP_QA_API_KEY:
        return []
    try:
        async with httpx.AsyncClient(timeout=20) as client:
            r = await client.get(
                "https://mcp-platform-nu.vercel.app/api/v1/groups",
                headers={"x-api-key": MCP_QA_API_KEY, "Authorization": f"Bearer {MCP_QA_API_KEY}"},
            )
            if r.status_code == 200:
                return r.json().get("data", [])
            print(f"[MCP-QA] {r.status_code}")
    except Exception as e:
        print(f"[MCP-QA] fetch error: {e}")
    return []


async def fetch_fathom_recent() -> list:
    """Fetch recent calls from Fathom. Returns stub until API key is set."""
    if not FATHOM_API_KEY:
        return []
    try:
        async with httpx.AsyncClient(timeout=20) as client:
            r = await client.get(
                "https://api.fathom.video/api/v1/calls",
                headers={"Authorization": f"Bearer {FATHOM_API_KEY}"},
                params={"limit": 10},
            )
            if r.status_code == 200:
                return r.json().get("calls", r.json() if isinstance(r.json(), list) else [])
            print(f"[Fathom] {r.status_code}: {r.text[:200]}")
    except Exception as e:
        print(f"[Fathom] fetch error: {e}")
    return []


async def fetch_guardian() -> dict:
    """Fetch AMM Guardian activity from GitHub — open issues/PRs on jodutoro/AMM-SA."""
    headers = {}
    if GITHUB_TOKEN:
        headers["Authorization"] = f"Bearer {GITHUB_TOKEN}"
    headers["Accept"] = "application/vnd.github+json"
    result = {"auto_prs": [], "pending_approval": [], "weekly_digests": [], "last_run": None}
    try:
        async with httpx.AsyncClient(timeout=20) as client:
            # Fetch open PRs by guardian
            pr_resp = await client.get(
                "https://api.github.com/repos/jodutoro/AMM-SA/pulls",
                headers=headers,
                params={"state": "open", "per_page": 10},
            )
            if pr_resp.status_code == 200:
                for pr in pr_resp.json():
                    labels = [l["name"] for l in pr.get("labels", [])]
                    if "guardian-auto" in labels or pr.get("head", {}).get("ref", "").startswith("guardian/"):
                        result["auto_prs"].append({
                            "number": pr["number"],
                            "title": pr["title"],
                            "url": pr["html_url"],
                            "created": pr["created_at"],
                            "labels": labels,
                        })

            # Fetch open issues by guardian — separate requests per label (GitHub AND's comma-separated labels)
            seen_issue_ids: set = set()
            for label_filter in ["needs-approval", "weekly-digest", "privacy-blocked"]:
                issue_resp = await client.get(
                    "https://api.github.com/repos/jodutoro/AMM-SA/issues",
                    headers=headers,
                    params={"state": "open", "labels": label_filter, "per_page": 20},
                )
                if issue_resp.status_code != 200:
                    continue
                for iss in issue_resp.json():
                    if iss.get("pull_request") or iss["number"] in seen_issue_ids:
                        continue
                    seen_issue_ids.add(iss["number"])
                    labels = [l["name"] for l in iss.get("labels", [])]
                    item = {
                        "number": iss["number"],
                        "title": iss["title"],
                        "url": iss["html_url"],
                        "created": iss["created_at"],
                        "labels": labels,
                    }
                    if "needs-approval" in labels or "privacy-blocked" in labels:
                        result["pending_approval"].append(item)
                    elif "weekly-digest" in labels:
                        result["weekly_digests"].append(item)

            # Last analyzer run from changelog
            changelog = Path(__file__).parent.parent / "_brain" / "memory" / "amm-guardian-changelog.md"
            if changelog.exists():
                for line in changelog.read_text().splitlines():
                    if line.startswith("## 20"):
                        result["last_run"] = line.replace("## ", "").strip()
                        break
    except Exception as e:
        print(f"[Guardian] fetch error: {e}")
    return result


def load_cloud() -> dict:
    p = DASHBOARD_DIR / "cloud_data.json"
    try:
        if p.exists():
            with open(p) as f:
                return json.load(f)
    except Exception as e:
        print(f"[cloud] read error: {e}")
    return {"calendar": [], "email": [], "slack_mentions": [], "last_synced": None, "dismissed_tasks": []}


def save_cloud(cloud: dict) -> None:
    with open(DASHBOARD_DIR / "cloud_data.json", "w") as f:
        json.dump(cloud, f, indent=2)


# ── Task categorization ────────────────────────────────────────────────────────

def categorize_tasks(raw_tasks: list) -> dict:
    """Categorize raw ClickUp API tasks (has nested objects)."""
    now_ms = int(time.time() * 1000)
    cats = {"amm": [], "mastermind": [], "townhall": [], "other": []}

    for t in raw_tasks:
        # Skip tasks whose status type is done/closed — ClickUp returns these
        # even with include_closed=false when the status is named "complete"
        status_obj = t.get("status") or {}
        if isinstance(status_obj, dict) and status_obj.get("type") in ("done", "closed"):
            continue

        list_name = (t.get("list") or {}).get("name", "")
        name = t.get("name", "")
        due = t.get("due_date")
        overdue = bool(due) and int(due) < now_ms

        item = {
            "id": t.get("id"),
            "name": name,
            "status": (t.get("status", {}).get("status", "") if isinstance(t.get("status"), dict) else t.get("status", "")),
            "priority": (t.get("priority", {}).get("priority", None) if isinstance(t.get("priority"), dict) else t.get("priority")),
            "due_date": due,
            "overdue": overdue,
            "url": t.get("url", ""),
            "list": list_name,
            "list_id": (t.get("list") or {}).get("id", ""),
            "assignees": [a.get("username", "") for a in (t.get("assignees") or [])],
        }

        if "AMM Action Items" in list_name:
            cats["amm"].append(item)
        elif "Townhall" in list_name:
            cats["townhall"].append(item)
        elif "Shared with me" in list_name or "Mastermind" in name:
            cats["mastermind"].append(item)
        else:
            cats["other"].append(item)

    return cats


def categorize_cloud_tasks(tasks: list) -> dict:
    """Categorize pre-normalized tasks from cloud_data.json (flat objects)."""
    now_ms = int(time.time() * 1000)
    cats = {"amm": [], "mastermind": [], "townhall": [], "other": []}

    for t in tasks:
        list_name = t.get("list", "")
        name = t.get("name", "")
        due = t.get("due_date")
        # Recompute overdue in case time has passed since last sync
        t["overdue"] = bool(due) and int(due) < now_ms

        if "AMM Action Items" in list_name:
            cats["amm"].append(t)
        elif "Townhall" in list_name:
            cats["townhall"].append(t)
        elif "Shared with me" in list_name or "Mastermind" in name:
            cats["mastermind"].append(t)
        else:
            cats["other"].append(t)

    return cats


# ── Build response ─────────────────────────────────────────────────────────────

async def build_data() -> dict:
    cu_raw, li_issues, sl_live, mcp_qa, fathom_calls, guardian = await asyncio.gather(
        fetch_clickup(),
        fetch_linear(),
        fetch_slack_mentions(),
        fetch_mcp_qa(),
        fetch_fathom_recent(),
        fetch_guardian(),
    )
    cloud = load_cloud()

    # ClickUp: use live API if it returned tasks, else fall back to cloud_data
    dismissed = set(cloud.get("dismissed_tasks", []))
    if cu_raw:
        filtered_raw = [t for t in cu_raw if t.get("id") not in dismissed]
        clickup = categorize_tasks(filtered_raw)
        all_tasks_flat = filtered_raw
    else:
        cloud_tasks = [t for t in cloud.get("clickup_tasks", []) if t.get("id") not in dismissed]
        if cloud_tasks:
            print("[ClickUp] API returned 0 tasks — using cloud_data cache")
        clickup = categorize_cloud_tasks(cloud_tasks)
        all_tasks_flat = cloud_tasks

    # Slack: live API first, then cloud_data
    slack_all = sl_live or cloud.get("slack_mentions", [])

    now_ms = int(time.time() * 1000)
    overdue_count = sum(
        1 for t in all_tasks_flat
        if t.get("due_date") and int(t.get("due_date")) < now_ms
    )
    total_tasks = sum(len(v) for v in clickup.values())
    cal_today = [e for e in cloud.get("calendar", []) if e.get("today")]

    return {
        "clickup": clickup,
        "linear": li_issues,
        "slack": slack_all,
        "calendar": cloud.get("calendar", []),
        "email": cloud.get("email", []),
        "cloud_synced": cloud.get("last_synced"),
        "mcp_qa": mcp_qa,
        "clickup_source": "live" if cu_raw else "cloud",
        "stats": {
            "total_tasks": total_tasks,
            "overdue": overdue_count,
            "linear_open": len(li_issues),
            "meetings_today": len(cal_today),
            "slack_mentions": len(slack_all),
        },
        "fathom": {
            "recent": fathom_calls,
            "processed": cloud.get("fathom_processed", []),
        },
        "guardian": guardian,
        "refreshed_at": datetime.now().isoformat(),
    }


# ── Routes ─────────────────────────────────────────────────────────────────────

@app.get("/")
async def index():
    # Hard no-cache so Safari/Chrome can't serve stale UI after deploys
    return FileResponse(
        DASHBOARD_DIR / "index.html",
        headers={
            "Cache-Control": "no-cache, no-store, must-revalidate",
            "Pragma": "no-cache",
            "Expires": "0",
        },
    )


@app.get("/api/data")
async def get_data():
    global _cache
    now = time.time()
    if _cache["data"] is None or (now - _cache["ts"]) > CACHE_TTL:
        print(f"[cache] refreshing at {datetime.now().strftime('%H:%M:%S')}")
        _cache["data"] = await build_data()
        _cache["ts"] = now
    return JSONResponse(_cache["data"])


@app.post("/api/refresh")
async def force_refresh():
    global _cache
    _cache["data"] = await build_data()
    _cache["ts"] = time.time()
    return JSONResponse({"ok": True, "refreshed_at": _cache["data"]["refreshed_at"]})


@app.post("/api/cloud-update")
async def cloud_update(request: Request):
    """Claude calls this to push fresh calendar/email/slack data."""
    body = await request.json()
    p = DASHBOARD_DIR / "cloud_data.json"
    existing = load_cloud()
    existing.update(body)
    existing["last_synced"] = datetime.now().isoformat()
    with open(p, "w") as f:
        json.dump(existing, f, indent=2)
    # Bust cache so next /api/data returns fresh cloud data
    global _cache
    _cache["ts"] = 0
    return JSONResponse({"ok": True})


@app.get("/api/morning-brief")
async def morning_brief():
    """Aggregated morning brief — today's calendar, overdue tasks, linear due,
    unprocessed Fathom calls, and AMM Guardian insights."""
    data = await build_data()
    cal_today = [e for e in data.get("calendar", []) if e.get("today")]
    overdue = []
    for sec, tasks in data.get("clickup", {}).items():
        overdue.extend([t for t in tasks if t.get("overdue")])
    linear_due = [i for i in data.get("linear", []) if i.get("dueDate")]
    fathom_unprocessed = [c for c in data.get("fathom", {}).get("recent", []) if not c.get("processed")]

    # Guardian surface — PRs/approvals/digests from fetch_guardian() + pending
    # signals from the collector DB (what the analyzer will process next run)
    guardian = data.get("guardian") or {}

    # Feedback stats — how well Guardian's recent proposals landed.
    # Pulls from amm-guardian/feedback.jsonl (maintained by feedback_collector).
    feedback_stats: dict = {}
    try:
        import sys
        sys.path.insert(0, str(Path(__file__).parent.parent / "amm-guardian"))
        import feedback_collector as fc  # type: ignore
        feedback_stats = fc.stats(days=30)
    except Exception as e:
        print(f"[morning-brief] feedback stats error: {e}")
        feedback_stats = {}

    pending_signals: list[dict] = []
    try:
        import sqlite3
        gdb = Path(__file__).parent.parent / "amm-guardian" / "guardian.db"
        if gdb.exists():
            conn = sqlite3.connect(str(gdb))
            conn.row_factory = sqlite3.Row
            try:
                rows = conn.execute(
                    "SELECT source, signal_key, status, collected_at, metadata "
                    "FROM signals WHERE status IN ('collected', 'pending') "
                    "ORDER BY collected_at DESC LIMIT 8"
                ).fetchall()
                for r in rows:
                    md: dict = {}
                    try:
                        md = json.loads(r["metadata"]) if r["metadata"] else {}
                    except Exception:
                        md = {}
                    # Pick the best human-readable label for this signal type
                    title = (
                        md.get("file_name")
                        or md.get("feed_name")
                        or md.get("title")
                        or (r["signal_key"].split(":", 2)[-1] if r["signal_key"] else "")
                    )
                    pending_signals.append({
                        "source": r["source"],
                        "title": title,
                        "url": md.get("url"),
                        "collected_at": r["collected_at"],
                    })
            finally:
                conn.close()
    except Exception as e:
        print(f"[morning-brief] guardian signals read error: {e}")

    return {
        "date": datetime.now().strftime("%A, %B %d"),
        "calendar": cal_today,
        "overdue": overdue,
        "linear_due": linear_due,
        "fathom_unprocessed": fathom_unprocessed,
        "guardian": {
            "auto_prs": guardian.get("auto_prs", []),
            "pending_approval": guardian.get("pending_approval", []),
            "weekly_digests": guardian.get("weekly_digests", []),
            "pending_signals": pending_signals,
            "last_run": guardian.get("last_run"),
            "feedback": feedback_stats,
        },
        "stats": data.get("stats", {}),
    }


@app.get("/api/health")
async def health():
    return {"ok": True, "sources": {
        "clickup": bool(CLICKUP_TOKEN),
        "linear": bool(LINEAR_API_KEY),
        "slack": bool(SLACK_BOT_TOKEN),
        "mcp_qa": bool(MCP_QA_API_KEY),
        "fathom": bool(FATHOM_API_KEY),
    }}


# ── ClickUp write endpoints ────────────────────────────────────────────────────

@app.get("/api/clickup/task/{task_id}")
async def get_task_detail(task_id: str):
    """Return task details + comment thread."""
    if not CLICKUP_TOKEN:
        return JSONResponse({"error": "no_token"}, status_code=401)
    headers = {"Authorization": CLICKUP_TOKEN}
    async with httpx.AsyncClient(timeout=20) as client:
        t_r, c_r = await asyncio.gather(
            client.get(f"https://api.clickup.com/api/v2/task/{task_id}", headers=headers),
            client.get(f"https://api.clickup.com/api/v2/task/{task_id}/comment", headers=headers),
        )
    task     = t_r.json() if t_r.status_code == 200 else {}
    comments = c_r.json().get("comments", []) if c_r.status_code == 200 else []
    return JSONResponse({"task": task, "comments": comments})


@app.post("/api/clickup/task/{task_id}/complete")
async def complete_task(task_id: str):
    """Dismiss task from dashboard permanently + best-effort close in ClickUp."""
    # Always dismiss server-side first (survives refresh regardless of ClickUp state)
    cloud = load_cloud()
    dismissed = list(set(cloud.get("dismissed_tasks", []) + [task_id]))
    cloud["dismissed_tasks"] = dismissed
    cloud["clickup_tasks"] = [t for t in cloud.get("clickup_tasks", []) if t.get("id") != task_id]
    save_cloud(cloud)
    global _cache
    _cache["ts"] = 0  # bust cache so next render reflects dismissal

    # Best-effort ClickUp close (workspace automations may revert, that's OK)
    if CLICKUP_TOKEN:
        headers = {"Authorization": CLICKUP_TOKEN, "Content-Type": "application/json"}
        try:
            async with httpx.AsyncClient(timeout=15) as client:
                t_r = await client.get(f"https://api.clickup.com/api/v2/task/{task_id}", headers=headers)
                if t_r.status_code == 200:
                    list_id = (t_r.json().get("list") or {}).get("id")
                    closed_status = "complete"
                    if list_id:
                        l_r = await client.get(f"https://api.clickup.com/api/v2/list/{list_id}", headers=headers)
                        if l_r.status_code == 200:
                            for s in (l_r.json().get("statuses") or []):
                                if s.get("type") == "closed":
                                    closed_status = s.get("status", "complete")
                                    break
                    await client.put(
                        f"https://api.clickup.com/api/v2/task/{task_id}",
                        headers=headers,
                        json={"status": closed_status},
                    )
        except Exception as e:
            print(f"[ClickUp] close best-effort failed for {task_id}: {e}")

    return JSONResponse({"ok": True})


@app.post("/api/clickup/task/{task_id}/comment")
async def post_comment(task_id: str, request: Request):
    """Post a comment on a ClickUp task."""
    if not CLICKUP_TOKEN:
        return JSONResponse({"error": "no_token"}, status_code=401)
    body = await request.json()
    text = (body.get("text") or "").strip()
    if not text:
        return JSONResponse({"error": "empty"}, status_code=400)
    headers = {"Authorization": CLICKUP_TOKEN, "Content-Type": "application/json"}
    async with httpx.AsyncClient(timeout=20) as client:
        r = await client.post(
            f"https://api.clickup.com/api/v2/task/{task_id}/comment",
            headers=headers,
            json={"comment_text": text, "notify_all": False},
        )
    if r.status_code in (200, 201):
        return JSONResponse({"ok": True})
    return JSONResponse({"ok": False, "error": r.text[:400]}, status_code=r.status_code)


@app.put("/api/clickup/task/{task_id}/status")
async def update_task_status(task_id: str, request: Request):
    """Change a ClickUp task's status."""
    if not CLICKUP_TOKEN:
        return JSONResponse({"error": "no_token"}, status_code=401)
    body = await request.json()
    new_status = (body.get("status") or "").strip()
    if not new_status:
        return JSONResponse({"error": "empty"}, status_code=400)
    headers = {"Authorization": CLICKUP_TOKEN, "Content-Type": "application/json"}
    async with httpx.AsyncClient(timeout=15) as client:
        r = await client.put(
            f"https://api.clickup.com/api/v2/task/{task_id}",
            headers=headers,
            json={"status": new_status},
        )
    if r.status_code == 200:
        global _cache
        _cache["ts"] = 0  # bust cache
        return JSONResponse({"ok": True, "status": new_status})
    return JSONResponse({"ok": False, "error": r.text[:400]}, status_code=r.status_code)


@app.get("/api/clickup/list/{list_id}/statuses")
async def get_list_statuses(list_id: str):
    """Return available statuses for a ClickUp list."""
    if not CLICKUP_TOKEN:
        return JSONResponse({"error": "no_token"}, status_code=401)
    headers = {"Authorization": CLICKUP_TOKEN}
    async with httpx.AsyncClient(timeout=15) as client:
        r = await client.get(f"https://api.clickup.com/api/v2/list/{list_id}", headers=headers)
    if r.status_code == 200:
        statuses = r.json().get("statuses", [])
        return JSONResponse({"statuses": [{"status": s["status"], "color": s.get("color", ""), "type": s.get("type", "")} for s in statuses]})
    return JSONResponse({"statuses": []})


@app.post("/api/clickup/task/{task_id}/undismiss")
async def undismiss_task(task_id: str):
    """Remove a task from the dismissed list so it reappears on next refresh."""
    cloud = load_cloud()
    cloud["dismissed_tasks"] = [t for t in cloud.get("dismissed_tasks", []) if t != task_id]
    save_cloud(cloud)
    global _cache
    _cache["ts"] = 0
    return JSONResponse({"ok": True})


@app.post("/api/fathom/process/{call_id}")
async def process_fathom_call(call_id: str):
    """Fetch transcript, save to AMM-Internal/transcripts/, create ClickUp tasks for action items."""
    if not FATHOM_API_KEY:
        return JSONResponse({"error": "fathom_not_connected"}, status_code=400)

    try:
        async with httpx.AsyncClient(timeout=30) as client:
            # Fetch call details + transcript
            r = await client.get(
                f"https://api.fathom.video/api/v1/calls/{call_id}",
                headers={"Authorization": f"Bearer {FATHOM_API_KEY}"},
            )
            if r.status_code != 200:
                return JSONResponse({"error": f"fathom_{r.status_code}"}, status_code=r.status_code)
            call = r.json()

        title = call.get("title", "Untitled Call")
        date_str = call.get("date", datetime.now().strftime("%Y-%m-%d"))
        # Normalize date
        if "T" in str(date_str):
            date_str = str(date_str).split("T")[0]

        # Build slug
        slug = title.lower().replace(" ", "-").replace("/", "-")
        slug = "".join(c for c in slug if c.isalnum() or c == "-")[:60]
        filename = f"{date_str}-{slug}.md"

        # Extract transcript text and action items
        transcript = call.get("transcript", call.get("summary", "No transcript available."))
        action_items = call.get("action_items", [])
        # Also try to extract from transcript text
        if not action_items and isinstance(transcript, str):
            lines = transcript.split("\n")
            for line in lines:
                lower = line.lower().strip()
                if any(kw in lower for kw in ["action item", "todo", "will do", "follow up", "action:"]):
                    action_items.append({"text": line.strip()})

        # Save transcript to AMM-Internal/transcripts/
        transcripts_dir = Path(__file__).parent.parent / "AMM-Internal" / "transcripts"
        transcripts_dir.mkdir(parents=True, exist_ok=True)
        transcript_path = transcripts_dir / filename

        participants = ", ".join(call.get("participants", [])) if call.get("participants") else "Unknown"
        duration = call.get("duration", "Unknown")

        md_content = f"""---
title: {title}
date: {date_str}
duration: {duration}
participants: {participants}
source: fathom
call_id: {call_id}
---

# {title}

> Auto-processed from Fathom recording.

## Summary

{call.get("summary", "No summary available.")}

## Action Items

"""
        if action_items:
            for ai in action_items:
                text = ai if isinstance(ai, str) else ai.get("text", str(ai))
                md_content += f"- [ ] {text}\n"
        else:
            md_content += "No action items extracted.\n"

        md_content += f"\n## Transcript\n\n{transcript}\n"

        with open(transcript_path, "w") as f:
            f.write(md_content)

        # Create ClickUp tasks for action items
        tasks_created = 0
        if CLICKUP_TOKEN and action_items:
            headers = {"Authorization": CLICKUP_TOKEN, "Content-Type": "application/json"}
            # AMM Action Items list
            async with httpx.AsyncClient(timeout=15) as client:
                for ai in action_items[:10]:  # Cap at 10 tasks per call
                    text = ai if isinstance(ai, str) else ai.get("text", str(ai))
                    try:
                        await client.post(
                            f"https://api.clickup.com/api/v2/list/901105637498/task",
                            headers=headers,
                            json={
                                "name": f"[Fathom] {text[:120]}",
                                "description": f"From call: {title} ({date_str})\nTranscript: {filename}",
                                "assignees": [int(CLICKUP_USER_ID)],
                                "status": "to do",
                            },
                        )
                        tasks_created += 1
                    except Exception as e:
                        print(f"[Fathom→ClickUp] task create error: {e}")

        # Track in cloud_data
        cloud = load_cloud()
        processed = cloud.get("fathom_processed", [])
        processed.append({"call_id": call_id, "title": title, "date": date_str, "transcript_file": filename, "tasks_created": tasks_created})
        cloud["fathom_processed"] = processed
        save_cloud(cloud)

        return JSONResponse({
            "ok": True,
            "transcript_path": str(transcript_path),
            "tasks_created": tasks_created,
            "action_items_found": len(action_items),
        })
    except Exception as e:
        print(f"[Fathom] process error: {e}")
        return JSONResponse({"error": str(e)}, status_code=500)


# ── Service health (LaunchAgents we rely on) ──────────────────────────────────

# Each service declares how we decide if it's healthy:
#   daemon   — always-on process; healthy if launchctl reports a PID
#   interval — fires every N sec; healthy if its log was touched within 1.5*N
#   calendar — fires at specific times; healthy if its log was touched within max_gap_sec
SERVICES_CONFIG = [
    {
        "label": "com.jd.command-center",
        "name": "Dashboard",
        "mode": "daemon",
        "log": Path.home() / "Library" / "Logs" / "jd-command-center.log",
    },
    {
        "label": "com.jd.trigger-daemon",
        "name": "Phone Triggers",
        "mode": "daemon",
        "log": Path.home() / "Library" / "Logs" / "trigger-daemon.log",
    },
    {
        "label": "com.jduque.amm-guardian-collector",
        "name": "Guardian Collector",
        "mode": "interval",
        "interval_sec": 10800,  # 3h
        "log": Path.home() / "Library" / "Logs" / "amm-guardian-collector.log",
    },
    {
        "label": "com.jduque.amm-guardian-analyzer",
        "name": "Guardian Analyzer",
        # 11:00 & 23:00 UTC = 12h apart, allow 14h as max healthy gap
        "mode": "calendar",
        "max_gap_sec": 14 * 3600,
        "log": Path.home() / "Library" / "Logs" / "amm-guardian-analyzer.log",
    },
    {
        "label": "com.jduque.meeting-inbox",
        "name": "Meeting Inbox",
        "mode": "interval",
        "interval_sec": 2400,  # 40min
        "log": Path.home() / "Library" / "Logs" / "meeting_inbox.log",
    },
]


def _launchctl_pid(label: str) -> tuple[bool, int | None, int | None]:
    """Return (loaded, pid_or_none, last_exit_or_none) by parsing `launchctl list`.

    `launchctl list` rows: `PID<TAB>LASTEXIT<TAB>LABEL`. PID is `-` when the
    job isn't currently running (interval/calendar jobs between fires).
    """
    import subprocess
    try:
        r = subprocess.run(
            ["launchctl", "list"], capture_output=True, text=True, timeout=5
        )
        if r.returncode != 0:
            return (False, None, None)
        for line in r.stdout.splitlines():
            parts = line.split("\t")
            if len(parts) >= 3 and parts[2].strip() == label:
                pid = None if parts[0].strip() == "-" else int(parts[0])
                try:
                    last_exit = int(parts[1]) if parts[1].strip() != "-" else None
                except ValueError:
                    last_exit = None
                return (True, pid, last_exit)
    except Exception as e:
        print(f"[services] launchctl error: {e}")
    return (False, None, None)


def _log_mtime(path: Path) -> float | None:
    try:
        return path.stat().st_mtime
    except FileNotFoundError:
        return None
    except Exception:
        return None


def _service_verdict(cfg: dict, loaded: bool, pid: int | None, mtime: float | None) -> dict:
    now = time.time()

    if not loaded:
        return {"verdict": "missing", "detail": "not in launchctl list"}

    mode = cfg["mode"]

    if mode == "daemon":
        if pid and pid > 0:
            return {"verdict": "ok", "detail": f"PID {pid}"}
        return {"verdict": "stale", "detail": "daemon has no PID"}

    if mtime is None:
        return {"verdict": "stale", "detail": "no log file — never ran"}

    gap = now - mtime
    if mode == "interval":
        threshold = cfg["interval_sec"] * 1.5
        if gap <= threshold:
            return {
                "verdict": "ok",
                "detail": f"ran {int(gap / 60)}m ago (every {cfg['interval_sec'] // 60}m)",
            }
        return {
            "verdict": "stale",
            "detail": f"last run {int(gap / 60)}m ago — expected ≤ {int(threshold / 60)}m",
        }

    if mode == "calendar":
        threshold = cfg["max_gap_sec"]
        if gap <= threshold:
            hrs = gap / 3600
            return {"verdict": "ok", "detail": f"ran {hrs:.1f}h ago"}
        return {
            "verdict": "stale",
            "detail": f"last run {gap / 3600:.1f}h ago — expected ≤ {threshold / 3600:.1f}h",
        }

    return {"verdict": "unknown", "detail": f"unknown mode: {mode}"}


@app.get("/api/services")
async def services_health():
    """Per-service load + staleness report for the dashboard health pulse."""
    out = []
    for cfg in SERVICES_CONFIG:
        loaded, pid, last_exit = _launchctl_pid(cfg["label"])
        mtime = _log_mtime(cfg["log"])
        verdict = _service_verdict(cfg, loaded, pid, mtime)
        out.append({
            "label": cfg["label"],
            "name": cfg["name"],
            "mode": cfg["mode"],
            "loaded": loaded,
            "pid": pid,
            "last_exit": last_exit,
            "last_run_ts": mtime,
            "last_run_iso": datetime.fromtimestamp(mtime).isoformat() if mtime else None,
            **verdict,
        })
    any_bad = any(s["verdict"] != "ok" for s in out)
    return {"services": out, "all_ok": not any_bad, "checked_at": datetime.now().isoformat()}


# ── Newsletter endpoints ───────────────────────────────────────────────────────

NEWSLETTER_DRAFT_FILE = Path("/var/tmp/newsletter_draft.json")


@app.get("/api/newsletter-preview", response_class=HTMLResponse)
async def newsletter_preview():
    """Mobile-optimized HTML preview of the current newsletter draft. Used by iOS Shortcut."""
    if not NEWSLETTER_DRAFT_FILE.exists():
        return HTMLResponse("""<!DOCTYPE html>
<html><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Newsletter</title>
<style>body{font-family:-apple-system,sans-serif;padding:40px 24px;background:#f9fafb;color:#6b7280;text-align:center;}</style>
</head><body><p style="margin-top:80px;">No draft found.<br>Run the drafter first.</p></body></html>""")

    try:
        draft = json.loads(NEWSLETTER_DRAFT_FILE.read_text())
    except Exception as e:
        return HTMLResponse(f"<p style='padding:20px;font-family:sans-serif;'>Error reading draft: {e}</p>")

    title = draft.get("title", "Newsletter Draft")
    date_str = draft.get("date", "")
    html_body = draft.get("html_body", "")
    published_at = draft.get("published_at")
    circle_url = draft.get("circle_url", "")

    if published_at:
        status_html = f"""
<div style="background:#dcfce7;border:1px solid #86efac;border-radius:8px;padding:12px 16px;margin-bottom:20px;">
  <p style="margin:0;color:#166534;font-weight:600;font-size:14px;">&#10003; Already Published — {published_at[:10]}</p>
  {"<a href='" + circle_url + "' style='color:#166534;font-size:13px;'>View on Circle &rarr;</a>" if circle_url else ""}
</div>"""
    else:
        status_html = """
<div style="background:#fef9c3;border:1px solid #fde047;border-radius:8px;padding:12px 16px;margin-bottom:20px;">
  <p style="margin:0;color:#854d0e;font-weight:600;font-size:14px;">Draft &mdash; Pending Approval</p>
</div>"""

    return HTMLResponse(f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1">
  <title>{title}</title>
  <style>
    *{{box-sizing:border-box;}}
    body{{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#f9fafb;
         color:#111827;margin:0;padding:20px;}}
    .header{{padding:20px 0 16px;border-bottom:1px solid #e5e7eb;margin-bottom:20px;}}
    .label{{font-size:11px;font-weight:600;color:#6b7280;text-transform:uppercase;
            letter-spacing:0.05em;margin:0 0 6px;}}
    h1{{font-size:20px;font-weight:700;color:#111827;margin:0 0 4px;line-height:1.3;}}
    .date{{font-size:13px;color:#6b7280;margin:0;}}
    .content{{font-size:15px;line-height:1.6;color:#111827;}}
  </style>
</head>
<body>
  <div class="header">
    <p class="label">AMM Newsletter</p>
    <h1>{title}</h1>
    <p class="date">{date_str}</p>
  </div>
  {status_html}
  <div class="content">{html_body}</div>
</body>
</html>""")


@app.post("/api/newsletter-publish")
async def publish_newsletter():
    """Publish the current newsletter draft to Circle. Called by iOS Shortcut."""
    if not NEWSLETTER_DRAFT_FILE.exists():
        return JSONResponse({"ok": False, "error": "No draft found — run the drafter first"}, status_code=404)

    try:
        draft = json.loads(NEWSLETTER_DRAFT_FILE.read_text())
    except Exception as e:
        return JSONResponse({"ok": False, "error": f"Could not read draft: {e}"}, status_code=500)

    if draft.get("published_at"):
        return JSONResponse({
            "ok": False,
            "error": "Already published",
            "circle_url": draft.get("circle_url", ""),
            "published_at": draft["published_at"],
        }, status_code=409)

    circle_key = os.getenv("CIRCLE_API_KEY", "")
    community_id_raw = os.getenv("CIRCLE_COMMUNITY_ID", "")
    if not circle_key or not community_id_raw:
        return JSONResponse({"ok": False, "error": "CIRCLE_API_KEY or CIRCLE_COMMUNITY_ID not in .env"}, status_code=500)

    try:
        community_id = int(community_id_raw)
    except ValueError:
        return JSONResponse({"ok": False, "error": f"Invalid CIRCLE_COMMUNITY_ID: {community_id_raw}"}, status_code=500)

    title = draft.get("title", "Newsletter")
    html_body = draft.get("html_body", "")
    space_id = int(draft.get("space_id", 2507912))

    async with httpx.AsyncClient(timeout=20) as client:
        r = await client.post(
            "https://app.circle.so/api/v1/posts",
            content=json.dumps({
                "community_id": community_id,
                "space_id": space_id,
                "name": title,
                "body": html_body,
            }).encode(),
            headers={
                "Authorization": f"Bearer {circle_key}",
                "Content-Type": "application/json",
            },
        )

    if r.status_code in (200, 201):
        circle_url = r.json().get("topic", {}).get("url", "")
        draft["published_at"] = datetime.now(timezone.utc).isoformat()
        draft["circle_url"] = circle_url
        NEWSLETTER_DRAFT_FILE.write_text(json.dumps(draft, indent=2))
        print(f"[newsletter] ✓ Published: {circle_url}")
        return JSONResponse({"ok": True, "circle_url": circle_url, "title": title})

    err = r.text[:300]
    print(f"[newsletter] ✗ Circle {r.status_code}: {err}")
    return JSONResponse({"ok": False, "error": f"Circle API {r.status_code}: {err}"}, status_code=r.status_code)


if __name__ == "__main__":
    import uvicorn
    print("⚡ JD Command Center → http://localhost:8765")
    uvicorn.run("server:app", host="127.0.0.1", port=8765, reload=False, log_level="warning")
