# What's New

Latest additions and updates to the Agentic Marketing Mastermind toolkit.

---

<!-- AMM Guardian adds entries here automatically. Newest at top. -->

## 2026-04-23 — Setup Overhaul + Integration Wizard

### One-Command Quickstart (Mac + Windows)
Getting started is now a single paste into your terminal. The quickstart scripts handle everything — no manual installs, no configuration files.

**macOS:**
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/jodutoro/AMM-SA/INT/scripts/quickstart-mac.sh)"
```

**Windows (PowerShell as Admin):**
```powershell
irm https://raw.githubusercontent.com/jodutoro/AMM-SA/INT/scripts/quickstart-windows.ps1 | iex
```

What it does:
- Creates your agency workspace folder (`~/YourAgency-AMM/`)
- Detects your coding environment and recommends the best one already installed
- Installs Git, Node.js, and Claude Code automatically if missing
- Clones this toolkit and installs all slash commands
- Connects the SearchAtlas MCP

### Workspace-First Structure
Every member now gets a named workspace root with a clear layout:
```
~/YourAgency-AMM/
├── AMM-SA/       ← this toolkit
└── clients/      ← one folder per client
```
Claude Code reads a `CLAUDE.md` file at the workspace root, so it understands your setup from the first message.

### IDE Selection
The quickstart detects which coding environments you have installed and recommends one. Cursor, Warp, Windsurf, VS Code, and iTerm2 are all supported. If you haven't installed one yet, it offers a download link.

### `/setup-integrations` — New Command
Connect your existing tools to Claude Code in a guided wizard. Supports:
- **HubSpot** — contacts, deals, pipeline
- **ClickUp** — tasks, lists, time tracking
- **Linear** — issues, projects, cycles
- **Notion** — pages, databases, workspace search
- **Slack** — channels, messages, search
- **Gmail + Google Calendar** — email and scheduling
- **GitHub** — repos, issues, pull requests

Run it inside Claude Code anytime: `/setup-integrations`

### Example Client Plans
The `plans/examples/` folder now has three filled-in YAML examples showing what a real plan looks like after running a workflow — including IDs, step results, and output summaries.

---

## How to Update

Pull the latest toolkit version:
```bash
git -C ~/YourWorkspace/AMM-SA pull origin INT
bash ~/YourWorkspace/AMM-SA/setup.sh
```
