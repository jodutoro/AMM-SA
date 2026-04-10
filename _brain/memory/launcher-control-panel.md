---
name: launcher control panel
description: launcher.py HTTP server (port 9000) managing ClientOps and T2 Triage processes — endpoints, python path, log limits, control panel HTML
type: project
---

# Launcher & Control Panel

**Launcher:** `Work stuff/launcher.py` — run from Agentic root:
```bash
python3 "Work stuff/launcher.py"
```
**Port:** 9000
**Control Panel:** `Work stuff/control-panel.html` — open directly in browser (requires launcher on :9000)

---

## What It Manages

| Service | Port | Start command |
|---------|------|---------------|
| ClientOps Backend | 8001 | `uvicorn main:app --reload` |
| T2 Triage Server | 8002 | `uvicorn main:app --reload` |

Watches both ports via `lsof` to detect orphaned processes. Kill them from the panel or `POST /kill/pid/{N}`.

---

## API Endpoints

| Method | Path | Purpose |
|--------|------|---------|
| GET | `/status` | clientops + triage_server + triage_run + triage_run_mine status |
| GET | `/logs/{key}` | Log lines for: `clientops`, `triage`, `triage_run`, `triage_run_mine` |
| GET | `/processes` | Scan ports 8001/8002 for listening processes (including orphans) |
| POST | `/start/clientops` | Start ClientOps via uvicorn --reload |
| POST | `/start/triage` | Start T2 Triage via uvicorn --reload |
| POST | `/run/triage/queue` | Run `run_triage_tickets_only.py` (full T2 queue) |
| POST | `/run/triage/mine` | Run `run_triage_tickets_only.py --mine` (JD's conversations) |
| POST | `/kill/all` | Kill all managed processes |
| POST | `/kill/pid/{N}` | Kill specific PID |

---

## Key Implementation Details

- **Log memory:** Last 200 lines per key stored in-memory — prevents memory bloat on long-running server
- **CORS:** `Access-Control-Allow-Origin: *` — allows control-panel.html opened as local file
- **PYTHONUNBUFFERED=1:** Set on subprocess env for real-time stdout draining in background thread
- **Python path (hardcoded):** `/Library/Frameworks/Python.framework/Versions/3.14/Resources/Python.app/Contents/MacOS/Python`

---

## Troubleshooting

- **Process showing as running but not responding:** Use `GET /processes` to check for orphaned PIDs on port 8001/8002, then `POST /kill/pid/{N}`
- **Logs empty:** Log buffer is in-memory — if launcher restarted, previous logs are gone
- **Start fails silently:** Check `/logs/clientops` or `/logs/triage` — uvicorn errors appear there

**Why:** Needed a lightweight way to start/stop both servers and run triage batches without terminal access during shift. The control panel + launcher eliminates manual process management.
**How to apply:** Always start launcher.py before using the control panel. If a server won't start, check `/processes` first for orphaned processes on those ports.
