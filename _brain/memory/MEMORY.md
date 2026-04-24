---
tags: [brain, index, hub]
originSessionId: 2d16becd-4777-4769-9ccb-40d46776efe2
---
# Memory Index

> Single source of truth. Lives in `_brain/memory/` (Obsidian) and is symlinked from Claude's memory system.
> Add new memories here — they are immediately available to both Claude and Obsidian.

## Auto-Triggers (no file read needed)
- **Any frontend / UI / website task** → invoke `design-create` skill before writing code
- **Interactive tool / explorer / visual configurator / parameter space** → invoke `playground` skill first
- **Any new feature** → invoke `superpowers:test-driven-development` skill first
- **Any bug** → invoke `superpowers:systematic-debugging` skill first
- **Plan > 3 steps** → invoke `superpowers:writing-plans` before executing
- **Parallel work / multiple files** → invoke `superpowers:dispatching-parallel-agents`
- **Spreadsheet/Word/PDF/Slides output** → invoke `xlsx`/`docx`/`pdf`/`pptx` skill
- **Any external API/SDK code** → use Context7 MCP for live docs before writing
- **Subagents:** Haiku=search/validate, Sonnet=implement/analyze, Opus=architecture only
- **Context:** `/compact` at 65%, `/clear` at 85%

## Feedback — Working Rules
- [[feedback-circle-no-draft]] — Circle API publishes immediately (no draft mode). Always confirm content with user before calling the API. Always set explicit `color: #111827` on card text or it goes invisible in dark theme.
- [[feedback-commit-push-deploy]] — Every commit must immediately push. Netlify deploys from GitHub remote only — commit without push = nothing deployed
- [[feedback-eod-slack-attribution]] — EOD report must use eod_report.py, never Slack MCP. Posts to ClickUp (CLICKUP_TOKEN). Token rotated 2026-04-14 — if 401, update BOTH .env files (Desktop + iCloud paths are separate); use --tasks "A;B;C" to inject task items, --note for additional needs
- [[feedback-eod-manual-date]] — Manual EOD sends use --date YYYY-MM-DD; triage tickets may fall on previous calendar day in Bogota time
- [[feedback-launchagent-paths]] — LaunchAgent plists must use full path incl. "Work stuff/"; PATH needs ~/.local/bin for claude CLI; logs → ~/Library/Logs/
- [[search-atlas-api]] — SA MCP is OAuth 2.1 at https://mcp.searchatlas.com/mcp — install via `claude mcp add searchatlas --type http https://mcp.searchatlas.com/mcp`, no API key needed
- [[sa-mcp-npm-package]] — Official SA npm package (searchatlas-mcp-server) for Cursor/Windsurf/VS Code users; F12 JWT login flow; 16 tools; last updated Mar 12; follow-up pending with engineering (ClickUp 868jc93dj)
- [[gitlab-to-linear]] — Team migrated from GitLab to Linear; always use Linear for issue tracking, never GitLab
- [[feedback-image-repetition]] — Never repeat the same image in category cards + featured + catalog on the same page (flagged on Bella Caramella)
- [[feedback-no-neon-saas]] — HARD RULE: Never use neon/glow/teal SaaS aesthetic. Always use DESIGN.md (Apple-inspired) + Emil Kowalski principles. Think Apple.com, not Vercel dashboard
- [[feedback-transcripts-folder]] — All transcripts must be saved to AMM-Internal/transcripts/ — never elsewhere
- [[feedback-ruflo-removed]] — Ruflo fully uninstalled 2026-04-01; never reference mcp__ruflo__ tools or ruflo CLI again
- [[subagent-model-routing]] — Agent tool model selection: Haiku for search/validate, Sonnet for implement/analyze, Opus for architecture only
- [[context-compression-rules]] — Token optimization: /compact at 65%, /clear at 85%, tool batching, subagent isolation, token budgets
- [[token-optimization-setup]] — Full token optimization stack: autoCompactWindow, PreCompact hook, statusline ⚡compact at 60%, model_router.py, usage tracking
- [[token-optimization-2026-04-07]] — 2026-04-07 applied fixes: MCP scoping (magic/playwright→project), plugin dedup (clientops-backend), hook trim, autoCompactWindow→80k

## Project Context
- [[imac-migration-progress]] — iMac migration 2026-04-18: Steps 1-7 done, Step 9 smoke test pending in fresh session
- [[morning-brief-setup]] — Morning brief DM script: cron setup, sources, JD user ID (U06J10MNAVB), week parity logic
- [[eod-report-setup]] — EOD Tier 2 auto-poster: LaunchAgent runner, Calendar+Linear, 'by JD' description filter, macOS FDA gotchas
- [[eod-report-linear-fix]] — Linear query must search ALL teams (not T2 only) + filter by '## by JD' in description; confirmed final format 2026-03-31
- [[intercom-classification-audit]] — Script + workflow for auditing/correcting Intercom SA - Type of Issue classifications; located at Work stuff/intercom-t2-triage/audit_classifications.py
- [[intercom-t2-triage-pipeline]] — Live T2 triage pipeline: SDK engine, control panel, video evidence gate, API gotchas (assignee field, .env path, ClickUp OAuth)
- [[feedback-triage-ticket-quality]] — Ticket quality rules: triage_score/confidence internal-only, DevBot enriches ALL engineering tickets, affected_component + error_message required
- [[intercom-t2-playwright]] — Playwright auto-recording system: session auth, QP impersonation, catbox.moe upload, product area URL map, audit themes
- [[t2-automation-vision]] — Option C plan: Slack approval queue, agent roster (Health Monitor, Escalation Detector), open question: Quantum Puppy API vs web-only
- [[clientops-backend-pipeline]] — clientops-backend architecture: issue signals, MRR tiers, DevBot thresholds, 91-channel scan, API gotchas, deployed URLs
- [[clientops-backend-roadmap]] — 22-item repo audit: Wave 1 Reliability (10), Wave 2 Automation (7, A1 DevBot auth blocking), Wave 3 Velocity (7, V7 unblocked)
- [[agentic-mastermind-architecture]] — Agentic Mastermind toolkit: 12 slash commands, 7 workflows, SA MCP golden rules, parameter gotchas, intent routing
- [[dev-tools-setup]] — GSD + Superpowers (user-scoped plugins), Stitch MCP + 21st.dev Magic (project-scoped via .mcp.json); setup status and commands
- [[priority-clients]] — Client slugs requiring P1 escalation in triage
- [[fastapi-ai-backend-patterns-2025]] — Best practices: Claude SDK integration, structured outputs, retry patterns, prompt caching, observability, agent frameworks (2025/2026)

## Design
- [[design-workflow-stack]] — Unified design-create skill + UI UX Pro Max: how the full pipeline works, install locations, key commands
- [[visual-creation-spec]] — AI image & video system: 7-layer prompt structure, tool stack (Higgsfield/Kling/ElevenLabs/CapCut), aesthetic-to-prompt translation table, web integration rules
- [[video-generation-research]] — 2026 video gen research: model comparison, 8-layer prompt system, full camera vocabulary, lighting temps, character consistency fixes, failure modes, full production workflow
- [[ai-video-hyperrealism-spec]] — Hyperrealism techniques: lighting temp specs, lens simulation, camera physics, character grounding, failure mode fixes, consistency protocol

## Skills
- [[skill-emil-design-eng]] — Emil Kowalski's design engineering skill: UI polish, animation, component craft; invoke for any frontend/UI work
- [[skill-playground]] — Playground skill: single-file HTML interactive explorer with live preview + prompt output; invoke for any visual/parameter-space tool

## Statusline
- [[jd-token-count-statusline]] — Custom token bar (`▓▓░░ 52k/200k`) chained after GSD statusline; never touch gsd-statusline.js

## Infra / Reliability
- [[whisper-dictation]] — Push-to-talk local voice-to-text: Right Option key, MLX Whisper small (~300ms), runs offline. `tools/whisper-dictation/dictate.py`
- [[tailscale-setup]] — Tailscale on MacBook Air via custom LaunchAgent (userspace-networking, socket at /opt/homebrew/var/run/tailscale/). Devices: MacBook 100.126.18.73, iMac 100.118.236.50, iPhone 100.93.54.12
- [[launchagent-tcc-gotcha]] — /bin/bash can't read Desktop (TCC); Python framework can. Audit + fix pattern for silent-failing LaunchAgents
- [[imac-migration-runbook]] — Install + verify checklist to bring a new Mac to parity with MacBook Claude Code setup (runtimes, symlink, MCPs, plugins, LaunchAgents, TCC)
- [[imac-migration-prompt]] — Drop-in prompt for iMac Claude session to execute the migration (rename, install, symlink, plugin cache reset, smoke test)
- [[mcp-config-location]] — HARD RULE: user-scope MCPs live in ~/.claude.json, NOT ~/.claude/settings.json. Verified 2026-04-18 after a wrong migration broke 8 MCPs

## Reference — Tools & Standards
- [[workspace-ai-rules]] — Master .env path, DevBot-only-via-MCP constraint, log inspection rule, /effort max, Python async + Railway deploy standards
- [[workspace-design-system]] — Viktor's 4-phase build framework, style presets (Dark Premium / Light SaaS), Google Flow tools (Nano Banana 2, Veo 3.1), client acquisition + upsell framework
- [[launcher-control-panel]] — launcher.py port 9000: start/stop/kill ClientOps+T2, endpoints, 200-line log buffer, control-panel.html
- [[mcp-servers-reference]] — All installed/recommended MCP servers: install commands, auth, status, known install quirks
- [[zoom-mcp-setup]] — Zoom MCP: 3 remote OAuth servers (workspace/docs/whiteboard) added to ~/.claude/settings.json 2026-04-09
- [[claude-code-best-practices]] — CLAUDE.md limits, hook patterns, subagent patterns, context thresholds, memory layers, power tips (2026)
- [[ai-engineering-2025]] — Context engineering framework, eval tools (DeepEval/Langfuse), cost optimization, CS automation tools, top communities

## User Context
- [[user_work_schedule]] — Jonathan's rotating shift schedule (morning 5AM-3PM / noon 10AM-7PM, alternating weeks, Bogota timezone)
- [[jd-user-profile]] — Full profile: strengths, working style, communication rules — read this to calibrate every response

## JD Command Center
- [[jd-command-center]] — Live work dashboard at localhost:8765; ClickUp/Linear/Calendar/Slack; LaunchAgent auto-starts; Claude refreshes cloud data via /api/cloud-update
- [[dashboard-rebuild-apr15]] — Apr 15 rebuild: LaunchAgent fixed (python3 direct), MCP QA strip, Fathom scaffolding, morning brief popup. Needs: Google Calendar auth + Fathom auth next session

## AMM Dashboard
- [[amm-dashboard-gotchas]] — AMM_DATA is inline in demo.html (not data.js); ROI formula; DevBot DB numbers (Apr 10); comments panel + view-active 2-col layout

## Newsletter
- [[newsletter-pipeline]] — Daily AMM Circle newsletter: drafter (10AM COT), ClickUp Chat draft review, ntfy `newsletter-publish` triggers Circle post. Draft at `/var/tmp/newsletter_draft.json`. Circle space 2507913.

## Northflank Deployments
- [[northflank-amm-deployment]] — AMM dashboard + knowledge hub deploy: `amm-hosting` project created (us-east1), blocked on Andreé Wlodkovski (andre.wlodkovski@searchatlas.com) reply for DNS + container registry

## Active Work
- [[amm-guardian-system]] — Semi-autonomous agent: Python collector (3h) + Claude analyzer (2x/day), monitors transcripts/signals, improves AMM repo, tracks SA product feedback. LaunchAgents need manual load.
- [[amm-guardian-changelog]] — Running log of all Guardian actions (PRs, issues, internal feedback). JD reviews for visibility and team sharing.
- [[amm-brain-session-pending]] — AMM Brain design session (2026-04-20): pending implementation tasks, architectural decisions, ClickUp Chat source rationale
- [[amm-state]] — Living AMM state (symlinked from AMM-Internal/amm-state.md); updated every 12h by state_manager.py from all sources
- [[mobile-remote-triggers]] — Phone→Mac trigger system via ntfy: 4 commands (eod/brief/fathom/ask), iOS Shortcuts, daemon at dashboard/trigger_daemon.py
- [[meeting-inbox-pipeline]] — Auto-logs ClickUp meeting action items (J D / Jonathan Duque) into Meeting Inbox list (901113611668) every 40 min; replaces broken Fathom path
- [[repo-audit-execution-state]] — All 3 plans complete (23/23 tasks); remote trigger disabled, local cron is authoritative ✅
- [[t2-automation-vision]] — Option C architecture planned; blocked on Quantum Puppy API status (web-only vs API)
- [[amm-pm-initiative]] — AMM member intelligence (clean, shareable with Matt): profiles, platform gaps, timeline, contributions
- [[amm-role-strategy-private]] — Private strategy: Manick reply final draft (updated member profiles with Built/Said structure), buy-ins, preemptive counters, open items. DO NOT share.
- [[amm-jk-conflict]] — Jonathan Kilton conflict context + two-version system (real reply vs JK review version at manick-reply-jk-version.md)
- [[amm-jk-apr15-role-meeting]] — Apr 15 meeting outcome: role = operational support, Matt owns strategy, 3-month review, action plan, JK dynamics
- [[amm-internal-folder]] — Shareable team folder at /Users/eillacs/Desktop/Agentic/AMM-Internal/: member intelligence, transcripts (6 1-on-1s + 3 group sessions), progress tracker CSV, knowledge hub, reports. Safe to zip and share.
- [[mcp-checkin-apr9]] — SA internal MCP Check-in 04/09/26: testing status by module, ticket routing rules, Webflow integration, V2 ~Apr 15, Arena = no MCP terminal, events Apr 21/23/May. API access: MCP_QA_API_KEY in .env → 5 live endpoints (dashboard/groups/tools/activity/assignments).
- [[clayton-joyner-systems]] — Visual intelligence from Apr 9 screen share: Lucidchart production system (approval grid, 4-style design system, copy-before-design gate), Google Sheets client onboarding doc (MT Construction Group), quoting calculator SaaS (3-tier, $9/mo, Vercel+Supabase). 22 screenshots at AMM-Internal/screenshots/clayton-screen-*.png
- [[design-process-from-clayton]] — 6 concrete process upgrades: 4-style design packages, copy-before-design gate, approval grid in ClickUp, Google Sheets client intake template, Vercel+Supabase SaaS pattern, process personality files for agents

## Project Maps (use these when working on a specific project)
- [[amm-program-map]] — AMM cohort map: members, sessions, strategy, hub → `AMM-Internal/index.md`
- [[bella-caramella-map]] — Bella Caramella boutique site (`Clients/Bella Caramella/`): pages, image system, Drive source, WA integration
- [[lunanolasco-map]] — Luna Nolasco personal brand site (`Clients/lunanolasco/`): rose/blush palette, story-first, e-commerce
- [[lunanolasco-site-details]] — Full design system (hex colors, fonts, breakpoints), products + WA messages, content rules, constraints
- [[bella-caramella-map]] — Bella Caramella boutique site (`Clients/Bella Caramella/`): pages, image system, Drive source, WA integration
- [[bella-caramella-site-details]] — Full architecture (fonts, JS patterns, image rules, SnapWidget fallback, Phase 2 plan, bugs fixed, pre-launch checklist)
- [[bella-caramella-wa-system]] — WA number (+57 313 640 1801), dynamic product button pattern (data-product-wa), size pills, qty selector
- [[bella-caramella-brand-manual]] — Official brand identity: Tahu+Ordinary fonts (site uses wrong ones), logo variants needed, custom icons, favicon missing, color palette confirmed

## Brain Navigation
- Workflows: `_brain/workflows/` — 7 runnable workflow playbooks
- Project maps: `_brain/maps/` — MOC files for each project
- Brain index: [[00-BRAIN-INDEX]]
