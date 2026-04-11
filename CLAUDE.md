# 🧠 Agentic Workspace — Session Context

> **Obsidian is the single AI brain.** All memory, workflows, and context live in `_brain/`.
> **User:** Jonathan Duque (Medellin, CO) | **Stack:** Python/FastAPI, Vanilla JS/HTML, Railway.
> **Global Env:** `/Users/eillacs/Desktop/Agentic/.env`

---

## 📍 Session Startup & Navigation
On every session start, do this before anything else:
1. **State:** Read `_brain/memory/MEMORY.md` (rules, feedback, active context).
2. **Projects:** Check `_brain/00-BRAIN-INDEX.md` to find workspace paths.
3. **Tasks:** Read `Plan.md` for the current phase and open tasks.
4. **Project Maps:** If working on a specific area, immediately load its MOC (e.g., `_brain/maps/clientops-backend-map.md` or `agentic-mastermind/CLAUDE.md`).

---

## 📖 Core Directives (Router)
You are expected to know and follow the rules defined in the following files. Read them if you need the exact specs:
* **Working Style & Triggers:** `docs/AI_rules.md` *(Contains GSD/Superpowers workflow rules, MCP routing, Subagent model selection, and Output format skills).*
* **System Design:** `docs/architecture.md`
* **Active Integrations & Tools:** `_brain/memory/mcp-servers-reference.md` & `dev-tools-setup.md`.
* **Priority Escalations:** `_brain/memory/priority-clients.md`

---

## 🚦 Quick Engineering Reminders
* **Docs First:** Always use `Context7 MCP` before coding any external API/SDK to prevent stale data.
* **Move Fast:** Minimal scope. Visual first. Do not ask permission for obvious next steps.
* **Workflow:** GSD Commands (`/gsd:plan-phase`, etc.) are active.
* **Context Bar:** `/compact` at 70%, `/clear` at 85%.
* **Tracker:** We use Linear. (Never reference GitLab).
* **Deploy rule:** Every `git commit` in this workspace must be immediately followed by `git push origin main`. Netlify auto-deploys on push — commit without push = nothing deployed.

---

## 🏁 Session End Hook (MANDATORY)
Before closing any session, sync learnings to the Obsidian brain:
1. Document **new bugs/fixes** in `_brain/memory/`.
2. Document **new API gotchas** in relevant pipeline memory files.
3. Update routing rules in `_brain/maps/` if changed.
4. Save client/user feedback to `_brain/memory/feedback_*.md`.
5. **Update the master index** at `_brain/memory/MEMORY.md` with pointers to any new files.