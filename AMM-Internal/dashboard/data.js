// ─── AMM Intelligence Dashboard — Data Layer ──────────────────────────────
// Edit this file to update the dashboard. Push to GitHub → Netlify auto-deploys.
// ─────────────────────────────────────────────────────────────────────────────

window.AMM_DATA = {

  meta: {
    program:        "Agentic Marketing Mastermind",
    cohort:         "Q1–Q2 2026",
    lastUpdated:    "April 23, 2026",
    projectManager: "Jonathan Duque",
    host:           "Matt Bailey",
    lastSession:    "Weekly AMM — Apr 23, 2026 (Michael Asuquo-Eyo guest: MCP updates + Q&A)"
  },

  kpis: {
    totalMembers:          12,
    activeMembers:         12,
    atRiskMembers:          4,
    membersInsidePlatform:  4,
    membersMixed:           5,
    membersAroundPlatform:  2,
    platformGapsOpen:      15,
    openActionItems:       10,
    currentRevenue:        "$200,000",
    principleOnlyMembers:  5,
    principleWithTeams:    4,
    advancedPrincipleOnly: 4
  },

  // ─── Program Stages ───────────────────────────────────────────────────────
  programStages: [
    { id: 'enrolled',   label: 'Enrolled'   },
    { id: 'oriented',   label: 'Oriented'   },
    { id: 'setup',      label: 'Setup'      },
    { id: 'building',   label: 'Building'   },
    { id: 'active',     label: 'Active'     },
    { id: 'autonomous', label: 'Autonomous' },
    { id: 'champion',   label: 'Champion'   }
  ],

  // ─── Members ─────────────────────────────────────────────────────────────
  // tier:          advanced | growing | starting | risk
  // saAlignment:   in-platform | mixed | around | unknown
  // supportDemand: high | medium | low | none | unknown
  // engagementStyle: champion | collaborative | quiet | silent
  // setupStatus:   complete | in-progress | blocked | unknown

  members: [
    {
      id:              "bryan-fikes",
      programStage:    "champion",
      avatarUrl:       "https://media.licdn.com/dms/image/v2/D5603AQGcACSJ3W3Kag/profile-displayphoto-scale_200_200/B56ZzglipMH0AY-/0/1773294464299?e=2147483647&v=beta&t=ka2Mmuybe4LeKZLK9BANRA-uFabS0dkdJOKDNYq1cWc",
      name:            "Bryan Fikes",
      agency:          "Independent · White-Label SA Reseller",
      tier:            "advanced",
      saAlignment:     "mixed",
      supportDemand:   "low",
      engagementStyle: "champion",
      setupStatus:     "complete",
      setupItems:      ["Claude Code", "SA MCP", "Multi-agent workflows", "Netlify + Payload CMS", "GoDaddy API MCP"],
      blockers:        ["Web Studio integration on 395-page roofing site (JD + Farhan active)"],
      currentBuilds: [
        "mftfinder.com — marriage family therapist directory (live)",
        "AICashmaker.com — AI income directory (built in 3 hrs)",
        "DAXRewards.com — gamified chore app for his son",
        "Command Center: bank + credit cards + ClickUp + Slack + Gmail + Hormozi coaching modules (100% automated)",
        "395-page roofing client site"
      ],
      featureRequests: [
        "HTML/zip injection to SA backend — endorsed live on April 9 call",
        "ChatGPT → Claude context migration tooling (3+ years of client history)"
      ],
      platformFriction: [
        "Web Studio hit limits at scale (395-page build)",
        "Production stack migrated to Netlify + Payload CMS + GoDaddy API"
      ],
      personality:     "Sets the pace the group follows. Builds around every blocker independently, then reports wins publicly. Energetic, generous with credit — publicly endorsed both JD and the program twice on record. Won't wait for SA to catch up. His enthusiasm sets the cultural tone and establishes what's possible for the group. Watch when he goes quiet: it means he's found a workaround and moved on.",
      quote:           "Why do you think we all plug into him, dude.",
      quoteContext:    "On JD's value to the group, unprompted, to the full member audience",
      skills:          ['Claude Code', 'Multi-agent', 'Site Building', 'Automation'],
      lastActive:      "2026-04-20",
      clickupUrl:      "https://app.clickup.com/t/868jb0aev",
      pendingItems: [
        { text: "Install missing MCPs on MacBook + copy .env from Mac Studio", priority: "high" },
        { text: "Enable Universal Control between Mac Studio and MacBook", priority: "normal" },
        { text: "White label WP plugin icon fix — SA logo showing after update", priority: "high" },
        { text: "BonsaiX.ai — confirm backup so Farhan can remove duplicate OTTO", priority: "high" },
        { text: "Advise on Cloudflare access for OTTO install (email unanswered Apr 17)", priority: "normal" },
        { text: "Review gallery display on bonsaimarketingcompany.com", priority: "normal" },
        { text: "Gmail animated signature — help implement chosen GIF variant", priority: "low" }
      ]
    },
    {
      id:              "clayton-joyner",
      programStage:    "autonomous",
      avatarUrl:       "avatars/clayton-joyner.png",
      name:            "Clayton Joyner",
      agency:          "modrn.io",
      tier:            "advanced",
      saAlignment:     "around",
      supportDemand:   "low",
      engagementStyle: "collaborative",
      setupStatus:     "complete",
      setupItems:      ["Claude Code", "SA MCP (recently connected)", "Windows WSL resolved", "Lucidchart", "Figma-to-Webflow", "ClickUp", "HubSpot", "Canva", "Fireflies"],
      blockers:        [
        "Cannot chain agents across custom Claude projects",
        "No Webflow export from Claude builds",
        "Full production stack currently routes outside SA"
      ],
      currentBuilds: [
        "Lucidchart client production system: copy → theme → wireframe → QA → GBP → redirects (93% fewer client revisions)",
        "Home services quoting calculator SaaS — live, $9/mo reseller, GoHighLevel + HubSpot native, all 50 states",
        "Multi-agent ad pipeline: research → compliance guard → split test generator → dialect-aware copy",
        "Multi-agent design framework doc — sharing on next call (built 4:30am)"
      ],
      featureRequests: [
        "Cross-project agent orchestration (critical for his architecture)",
        "Webflow export from Claude-built sites",
        "SA SEO workflow playbooks as agentic SOPs"
      ],
      platformFriction: [
        "No cross-project orchestration — breaks multi-agent pipeline",
        "SA MCP surfaced canonical issues not visible in SA UI (useful, but unexpected)",
        "Full production stack currently built outside SA ecosystem"
      ],
      personality:     "The group's architectural ceiling. Methodical systems thinker — builds frameworks before writing code, ships at 4:30am, brings back production-grade systems. Will route around SA when blocked, not out of preference but because he ships. SA leadership has already flagged his work for Manick/Arman review. His multi-agent design doc is the blueprint the program should be building toward. Low noise, high signal.",
      quote:           "I've got a vision.",
      quoteContext:    "On building a full agentic agency OS",
      skills:          ['Claude Code', 'Multi-agent', 'System Design', 'Client Delivery'],
      lastActive:      "2026-04-20",
      clickupUrl:      "https://app.clickup.com/t/868jb0j19",
      pendingItems: [
        { text: "Schedule architectural map prompts session (explicitly requested Apr 2)", priority: "high" },
        { text: "Review Clayton's Claude site-plan skill (Apr 2 action item)", priority: "normal" },
        { text: "Confirm SA MCP integrated into his multi-agent ad pipeline", priority: "normal" }
      ]
    },
    {
      id:              "justin-day",
      programStage:    "autonomous",
      avatarUrl:       "avatars/justin-day.png",
      name:            "Justin Day",
      agency:          "Agency Owner · Austin TX",
      tier:            "advanced",
      saAlignment:     "mixed",
      supportDemand:   "low",
      engagementStyle: "collaborative",
      setupStatus:     "complete",
      setupItems:      ["Claude Code", "SA MCP", "Windows", "Supabase connected", "Google Drive MCP", "ClickUp + Slack + Gmail MCP"],
      blockers:        [
        "ws_create_project 500 error — Website Studio MCP write path fully blocked (confirmed Apr 14 + Apr 16 1:1s)",
        "No AI brain/memory system inside SA — building externally",
        "Claude outputs generic dark/neon designs without structured design spec injection"
      ],
      currentBuilds: [
        "Agency website — blocked on generic Claude design output (8hrs invested)",
        "AI command center: bank + CCs + ClickUp + Slack + Gmail + Hormozi $100M modules (100% automated)",
        "Supabase front-end dashboard with user auth + permissions (pre-deploy)",
        "Automated client onboarding: transcript in → project files out → business graded automatically",
        "Branding pipeline: competitor research → Google Reviews extraction → copy (chaining into single flow)"
      ],
      featureRequests: [
        "Weekly homework tied to monthly milestones (formally requested April 9 — confirmed by Matt)",
        "HTML/zip injection + design brain context into SA",
        "Markdown upload for SA design consistency",
        "Website Studio MCP push/pull commands (create-project + update workflow blocked)"
      ],
      platformFriction: [
        "ws_create_project 500 — MCP lacks create-project; API likely refactored without docs update",
        "No push command for Website Studio via MCP — can't sync local edits back",
        "No persistent AI brain inside SA — built own system outside platform",
        "Design output inconsistency between local Claude and SA MCP"
      ],
      personality:     "The program's systems architect. Longest SA customer in the group (3–4 years) — knows exactly what SA can and can't do. Builds everything into repeatable, shareable systems and gives them to the group without being asked. Structured, methodical, collaborative. His request for weekly homework was the direct trigger that confirmed the curriculum restructuring. High collaborative value, low noise.",
      quote:           "Humans are the ones making the button clicks. I've got a system for it — I want to automate the whole thing.",
      quoteContext:    "On his automation vision for the agency",
      skills:          ['Claude Code', 'Automation', 'System Design', 'Supabase'],
      lastActive:      "2026-04-16",
      clickupUrl:      "https://app.clickup.com/t/868jb0j2b",
      pendingItems: [
        { text: "Build design-focused brain/workflow/spec using Justin's reference sites", priority: "high" },
        { text: "Confirm WebStudio E2E workflow + release timing with PM; update Justin", priority: "high" },
        { text: "Set up weekly homework + challenges system with Arman", priority: "high" },
        { text: "Push Supabase dashboard live (also reference model for HIP's team)", priority: "normal" },
        { text: "Help chain branding pipeline into single automated flow", priority: "normal" }
      ]
    },
    {
      id:              "jonathan-giner",
      programStage:    "active",
      avatarUrl:       "avatars/jonathan-giner.png",
      name:            "Jonathan Giner",
      agency:          "Agency Owner · Independent",
      tier:            "advanced",
      saAlignment:     "around",
      supportDemand:   "low",
      engagementStyle: "collaborative",
      setupStatus:     "complete",
      setupItems:      [
        "Claude Code + Warp terminal",
        "Mastermind SA root directory (fixed Apr 21 — was using wrong root)",
        "AI Rules + Memory brain + per-client CLAUDE.md structure",
        "Obsidian vault (configured Apr 21, pointing to Mastermind SA)",
        "SyncThing cross-machine sync (laptop + desktop)",
        "Session-end hooks: auto-commit memory files"
      ],
      blockers:        [
        "MCPs not on laptop — SyncThing doesn't sync .claude/ folder, needs manual install",
        "MCP endpoint likely still v1 — needs update to /api/v1/mcp",
        "Orphan Obsidian files not yet interlinked to brain index",
        "Web Studio abandoned after repeated instability"
      ],
      currentBuilds: [
        "Plastic surgery / beauty client sites (Speta Cosmetics confirmed)",
        "4+ client sites via Claude Code (zero SA publish workflow)",
        "Image gen pipeline: ChatGPT prompts → Grok generation → Gemini/Nano Banana character consistency"
      ],
      featureRequests: [
        "Stable, predictable SA publishing workflow",
        "MCP credit quota visibility (no way to check cost before running playbook)",
        "Per-project credit limits in autopilot (feature was removed)"
      ],
      platformFriction: [
        "SA credit quota system confusing — auto-site credits static, AI generation credits monthly; no documentation",
        "No per-project credit limits in autopilot (removed)",
        "MCP cannot query or control credit consumption",
        "Full build pipeline runs outside SA ecosystem"
      ],
      personality:     "Delivers without fanfare — but more open and engaged than his quiet reputation suggests. Self-directed, methodical, asks precise questions when he does reach out. Was working from wrong root directory for weeks; once shown the correct architecture, implemented it fully in one session. Has a developed image generation workflow for beauty/plastic surgery clients (ChatGPT → Grok → Gemini). His quiet attrition risk is real: SA needs to offer him a reason to publish inside the platform.",
      quote:           "I keep on digesting stuff... I'm just constantly fighting the feeling of being overwhelmed.",
      quoteContext:    "On the pace of AI tooling — Apr 21 1:1",
      skills:          ['Claude Code', 'Site Building', 'Client Delivery', 'Image Gen', 'Automation'],
      lastActive:      "2026-04-21",
      clickupUrl:      "https://app.clickup.com/t/868jb0j2y",
      pendingItems: [
        { text: "Help install MCPs on laptop (SyncThing won't do it)", priority: "high" },
        { text: "Confirm MCP endpoint updated to v2 (/api/v1/mcp)", priority: "high" },
        { text: "Guide linking orphan Obsidian brain files", priority: "normal" },
        { text: "Connect with Justin re: Google Ads via SA", priority: "normal" },
        { text: "Explore re-integration path — building fully outside SA ecosystem", priority: "normal" }
      ]
    },
    {
      id:              "michael-vassar",
      programStage:    "building",
      avatarUrl:       "avatars/michael-vassar.png",
      name:            "Michael Vassar",
      agency:          "Digital Coast Marketing · Charleston SC",
      tier:            "growing",
      saAlignment:     "in-platform",
      supportDemand:   "medium",
      engagementStyle: "collaborative",
      setupStatus:     "complete",
      setupItems:      ["Claude Code (active)", "Atlas Brain (active)", "File structure (Apr 10 1:1 — complete)"],
      blockers:        [
        "Team (web designer Alex + SEO lead Pam) needs structured onboarding",
        "WordPress-primary workflow — unclear path to SA publishing"
      ],
      currentBuilds: [
        "SA file structure — fully built in Apr 10 1:1 session",
        "HTML kickoff report from Atlas Brain — client response positive",
        "Law firm landing pages via Atlas Brain"
      ],
      featureRequests: [
        "Design + content in one command (Alex's key product ask)",
        "Clear WordPress → SA publishing workflow",
        "Recorded, step-by-step team walkthrough (not live Q&A)"
      ],
      platformFriction: [
        "Auto-site limit stuck at 6 for over a week (resolved Apr 9 via Matt/JD direct)",
        "Team expects guided documentation, not exploratory sessions"
      ],
      personality:     "Agency owner managing a team — decisions go through him, but execution goes through Alex (design) and Pam (SEO). File structure and setup now complete after productive Apr 10 1:1. Responds well to direct JD outreach — momentum is building. His designer Alex's question — 'So it can't be design plus content in one command?' — remains the most commercially actionable product requirement raised in any session. Next unlock: getting Alex and Pam live inside the structure.",
      quote:           "If we put one or two clients on with someone proficient in SA and recorded it, I think we'd be good to go.",
      quoteContext:    "On his team's learning need",
      skills:          ['Atlas Brain', 'Team Management', 'File Structure'],
      lastActive:      "2026-04-20",
      clickupUrl:      "https://app.clickup.com/t/868ja6ukd",
      pendingItems: [
        { text: "Get Alex + Pam live inside SA file structure — recorded walkthrough needed", priority: "high" },
        { text: "Clarify WordPress → SA publishing path for Alex's workflow", priority: "normal" }
      ]
    },
    {
      id:              "justin-hual",
      programStage:    "autonomous",
      avatarUrl:       "avatars/justin-hual.png",
      name:            "Justin Hual",
      agency:          "HIP Creative Inc.",
      tier:            "advanced",
      saAlignment:     "mixed",
      supportDemand:   "low",
      engagementStyle: "collaborative",
      setupStatus:     "complete",
      setupItems:      ["SA MCP", "Custom HIPAA authorization layer (built in-house)", "Anthropic managed agents (deployed overnight)", "RST team on Claude plugin"],
      blockers:        [
        "SA MCP GitHub docs incomplete — LLMs hallucinate usage without schemas",
        "Multi-brand routing (2 separate SA accounts for 2 brands)",
        "Non-technical staff onboarding (127 employees, HIPAA constraints)"
      ],
      currentBuilds: [
        "HIPAA-compliant authorization layer over SA MCP for 2-brand routing",
        "Anthropic managed agents deployment — scaled existing skills overnight",
        "AI website product launch — client event May 1st"
      ],
      featureRequests: [
        "Multi-brand MCP routing (route agents to correct SA account by brand)",
        "Complete SA MCP schema documentation (team offered to submit PRs)",
        "Non-technical employee onboarding path (127 staff to onboard)"
      ],
      platformFriction: [
        "Found SA MCP docs incomplete on day 1 — already building schemas internally",
        "Offered PR contributions to SA's own repo — JD/Maddy coordinating to accept"
      ],
      personality:     "Enterprise executor with the highest operational complexity in the group. 127 employees, HIPAA constraints, 2 brands, ~500 customers. Doesn't wait for documentation — deployed Anthropic managed agents overnight and arrived already patching gaps in SA's own MCP docs. Precise, enterprise-grade, offers solutions not just problems. His team has contributed more to SA's technical infrastructure than SA expected. The PRs he offered are an asset, not a risk.",
      quote:           "The LLMs kept getting confused, so we built some of that stuff out on our side already.",
      quoteContext:    "On SA MCP documentation gaps, first meeting",
      skills:          ['Claude Code', 'SA MCP', 'Enterprise AI', 'HIPAA'],
      lastActive:      "2026-04-09",
      clickupUrl:      "https://app.clickup.com/t/868ja6pm1",
      pendingItems: [
        { text: "Coordinate with Maddy to accept HIP's SA MCP schema PRs", priority: "high" },
        { text: "Define JD support role for May 1st AI website product launch", priority: "high" },
        { text: "Non-technical staff onboarding path — 127 employees, HIPAA constraints", priority: "normal" }
      ]
    },
    {
      id:              "noah-hip",
      programStage:    "setup",
      name:            "Noah",
      agency:          "HIP Creative Inc. (Justin Hual's team)",
      tier:            "growing",
      saAlignment:     "mixed",
      supportDemand:   "unknown",
      engagementStyle: "quiet",
      setupStatus:     "unknown",
      setupItems:      [],
      blockers:        ["No individual ClickUp track — unclear if he has independent program access"],
      currentBuilds:   [],
      featureRequests: [],
      platformFriction: [],
      personality:     "Justin Hual's colleague. Participated in Apr 9 group session alongside Justin. No individual signals, no ClickUp task, no Circle activity. Unclear whether he has a separate program seat or is attached to Justin's track. Needs a direct outreach or clarification on his access and onboarding path.",
      quote:           "—",
      quoteContext:    "",
      skills:          [],
      lastActive:      "2026-04-09",
      clickupUrl:      "",
      pendingItems: [
        { text: "Clarify whether Noah has independent program access or is on Justin's seat", priority: "high" },
        { text: "Direct outreach — assess setup status and program fit", priority: "normal" }
      ]
    },
    {
      id:              "jay-cornelius",
      programStage:    "building",
      name:            "Jay Cornelius",
      agency:          "modrn.io · Ops Manager",
      tier:            "growing",
      saAlignment:     "mixed",
      supportDemand:   "medium",
      engagementStyle: "collaborative",
      setupStatus:     "complete",
      setupItems:      ["Claude Code", "ClickUp MCP", "Webflow", "Whisper Flow"],
      blockers:        [
        "GoHighLevel MCP missing — critical dependency for full vision",
        "No cross-platform agentic chain"
      ],
      currentBuilds: [
        "Claude dashboards for client teams",
        "ClickUp super-agent system (in progress)"
      ],
      featureRequests: [
        "GoHighLevel MCP (core ask since setup session — March 18)",
        "Webflow + GoHighLevel + SA + ClickUp agentic chain"
      ],
      platformFriction: [
        "GoHighLevel MCP doesn't exist — blocking his full agency vision"
      ],
      personality:     "modrn.io's operational backbone. Knows exactly what integrated stack he wants: Webflow + GoHighLevel + SA + ClickUp, all agentic. Collaborative, aligned with Clayton's architectural vision. GoHighLevel MCP is his single critical dependency — once it exists, his full vision unlocks.",
      quote:           "The agent effectively becomes the trainer.",
      quoteContext:    "On agentic system design",
      skills:          ['Claude Code', 'ClickUp MCP', 'Webflow', 'Client Delivery'],
      lastActive:      "2026-04-09",
      clickupUrl:      "https://app.clickup.com/t/868jb0j4e",
      pendingItems: [
        { text: "Escalate GoHighLevel MCP to product team — critical blocker since Mar 18", priority: "high" },
        { text: "ClickUp super-agent system — check progress and unblock", priority: "normal" }
      ]
    },
    {
      id:              "kav-coach-cav",
      programStage:    "building",
      avatarUrl:       "https://cdn.prod.website-files.com/68ff11de6a330717f3458dc2/6904090f53af51c2817bf1a3_Coach%20-%20Photo%20-%201%20(1).jpg",
      name:            "Kav / Coach Cav",
      agency:          "11-yr Agency · ~500 WordPress sites",
      tier:            "growing",
      saAlignment:     "around",
      supportDemand:   "low",
      engagementStyle: "quiet",
      setupStatus:     "in-progress",
      setupItems:      ["Claude Code"],
      blockers:        [
        "SA not yet in his automation pipeline",
        "Email → Claude → live site pipeline not yet built"
      ],
      currentBuilds: [
        "Email → Claude → live site edit → client confirmation pipeline (planning phase)"
      ],
      featureRequests: [
        "Email-triggered Claude live site edits",
        "SA integration into WordPress automation pipeline"
      ],
      platformFriction: [
        "SA not currently in his execution path for 500-site operations"
      ],
      personality:     "Scale operator with a singular, precise automation vision: client email → Claude → live site edit → client confirmation, zero human layer. Not experimenting with building blocks — building the end state. If SA can fit cleanly into that pipeline, he's a significant account. If it can't, it won't be in it.",
      quote:           "I want zero human layer.",
      quoteContext:    "On his agency automation vision",
      skills:          ['Claude Code', 'WordPress', 'Automation'],
      lastActive:      "2026-04-09",
      clickupUrl:      "https://app.clickup.com/t/868jb0j5p",
      pendingItems: [
        { text: "Re-engage and schedule 1:1 — last active Mar 26", priority: "normal" },
        { text: "Design email → Claude → SA → live site architecture session", priority: "normal" }
      ]
    },
    {
      id:              "kane-sivesind",
      programStage:    "building",
      avatarUrl:       "https://coachcatalyst.com/wp-content/uploads/2025/04/kane-test-photo-1.png",
      name:            "Kane Sivesind",
      agency:          "Independent",
      tier:            "advanced",
      saAlignment:     "in-platform",
      supportDemand:   "none",
      engagementStyle: "quiet",
      setupStatus:     "complete",
      setupItems:      ["Claude Code", "SA MCP", "Agentic repo", "Swarm workflows"],
      blockers:        [],
      currentBuilds:   ["Configuration complete — builds in progress", "Exploring file/workflow organization structure (Circle post Apr 20)"],
      featureRequests: [],
      platformFriction: [],
      personality:     "Arrived at the first session fully configured — Claude Code, SA MCP, agentic repo, and swarm workflows already running. Zero onboarding needed, zero support demand. Currently quiet on output reporting. No active blockers. A self-sufficient signal in a group with many support needs.",
      quote:           "—",
      quoteContext:    "",
      skills:          ['Claude Code', 'SA MCP', 'Swarm Workflows'],
      lastActive:      "2026-04-20",
      clickupUrl:      "https://app.clickup.com/t/868jb0j6k",
      pendingItems: [
        { text: "Get progress report — last active Mar 26, no output reported since", priority: "low" }
      ]
    },
    {
      id:              "rick-janson",
      programStage:    "building",
      avatarUrl:       "https://media.cdn.builder.searchatlas.com/user-uploads/dbd55441-f011-497b-af9f-b70a3ac8bf83_Rick%20Headshot%202.jpg",
      name:            "Rick Janson",
      agency:          "Janson.ai",
      tier:            "growing",
      saAlignment:     "in-platform",
      supportDemand:   "medium",
      engagementStyle: "quiet",
      setupStatus:     "complete",
      setupItems:      ["SA MCP", "Claude Code", "Custom tech stack integrations"],
      blockers:        [],
      currentBuilds:   ["Client folders + workflow structure via SA MCP", "Integrating SA MCP with personal tech stack"],
      featureRequests: [],
      platformFriction: [],
      personality:     "Was quiet during sessions — but fully activated after April 10 1:1 with JD. Setup complete: already building client folders and workflows with SA MCP and integrating his full tech stack. The silence was a setup gap, not a commitment gap. Now in building mode — watch for output in coming sessions.",
      quote:           "—",
      quoteContext:    "",
      skills:          ['SA MCP', 'Client Workflows'],
      lastActive:      "2026-04-10",
      clickupUrl:      "https://app.clickup.com/t/868jb0j7x",
      pendingItems: [
        { text: "Follow-up 1:1 — build on Apr 10 momentum, check SA MCP integration", priority: "normal" }
      ]
    },
    {
      id:              "andy-zelt",
      programStage:    "building",
      name:            "Andy Zelt",
      agency:          "Independent",
      tier:            "growing",
      saAlignment:     "in-platform",
      supportDemand:   "medium",
      engagementStyle: "async",
      setupStatus:     "complete",
      setupItems:      ["SA MCP connected (SSE)"],
      blockers:        ["Website Studio AI chat unavailable via MCP (by design — use dashboard UI)"],
      currentBuilds:   ["Website via SA Website Studio + Claude Code MCP pipeline (UUID: 151a5bcb-5a93-43fb-aaa6-0a02267cce21)"],
      featureRequests: ["MCP write access to Website Studio AI chat"],
      platformFriction: ["ws_create_project 500 error confused him — unclear that AI chat is dashboard-only"],
      personality:     "Tech-forward independent — building his site directly with SA Website Studio + Claude Code MCP. Communicates async and on his own timeline, not low-engagement. Proactively debugged MCP connection issues and reached out via Circle when stuck. Responded well to direct technical guidance. Was flagged at-risk due to silence, but is actually building. 1:1 invite sent Apr 20, awaiting confirmation.",
      quote:           "I was able to finally get it to work and connect",
      quoteContext:    "After resolving MCP SSE connection — Circle DM Apr 19",
      skills:          ["CLAUDE CODE", "SA MCP", "SITE BUILDING"],
      lastActive:      "2026-04-20",
      clickupUrl:      "https://app.clickup.com/t/868jb0j8t",
      pendingItems: [
        { text: "Confirm correct MCP endpoint (api/v1/mcp)", priority: "high" },
        { text: "Explain Website Studio AI chat = dashboard only", priority: "high" },
        { text: "Share SA MCP tools walkthrough in 1:1", priority: "normal" }
      ]
    }
  ],

  // ─── Platform Gaps ────────────────────────────────────────────────────────
  // priority: critical | high | medium | low
  // status:   open | in-progress | resolved
  // category: platform | feature-request | documentation | integration | onboarding | support

  platformGaps: [
    {
      id:              "mcp-create-project-500",
      title:           "MCP ws_create_project Returns 500 — Website Studio Write Path Blocked",
      description:     "Members using Claude Code + SA MCP cannot create or update Website Studio projects via MCP. ws_create_project and ws_bulk_send_message both fail (500 / JWT error). Write path is intentionally restricted to the dashboard UI but undocumented. No push/pull commands exist.",
      priority:        "high",
      product:         "SA MCP / Website Studio",
      membersAffected: ["Justin Day", "Andy Zelt"],
      status:          "open",
      category:        "platform",
      notes:           "Confirmed Apr 14 + Apr 16 (Justin 1:1) and Apr 18 (Andy via Circle). Workaround: create site in dashboard, use MCP for read/data ops only."
    },
    {
      id:              "sa-credit-quota-ux",
      title:           "SA Credit Quota System Confusing — No Per-Project Visibility or Limits",
      description:     "Members don't understand the difference between auto-site credits (static, non-recurring) and AI generation credits (monthly refresh). No way to check credit cost before running a playbook via MCP. Per-project credit limits were removed from autopilot.",
      priority:        "high",
      product:         "SA Platform / Atlas Brain / MCP",
      membersAffected: ["Jonathan Giner", "Group-wide"],
      status:          "open",
      category:        "documentation",
      notes:           "Confirmed Apr 21 (Jonathan 1:1). JD manually refreshed Jonathan's quota. Auto-site = static. AI generation = monthly (billing cycle). MCP has no quota query or limit capability."
    },
    {
      id:              "web-studio-inconsistency",
      title:           "Website Studio Output Inconsistency",
      description:     "Design varies dramatically between runs — same prompt produces very different visual output. Members cannot deliver predictable, brand-consistent results.",
      priority:        "critical",
      product:         "Website Studio",
      membersAffected: ["Bryan Fikes", "Clayton Joyner", "Group-wide"],
      status:          "open",
      category:        "platform",
      notes:           ""
    },
    {
      id:              "web-studio-instability",
      title:           "Website Studio Instability",
      description:     "Builds hang mid-session, work is lost without warning, published sites disappear. Driving members to external publishing tools (Netlify, Vercel, Payload).",
      priority:        "critical",
      product:         "Website Studio",
      membersAffected: ["Jonathan Giner", "Justin Day", "Bryan Fikes"],
      status:          "open",
      category:        "platform",
      notes:           "Jonathan Giner abandoned Web Studio entirely and shipped 4 client sites outside SA"
    },
    {
      id:              "mcp-docs-incomplete",
      title:           "SA MCP GitHub Docs — Schemas Missing",
      description:     "Many tools lack schemas and descriptions. LLMs hallucinate usage without them. HIP Creative found this on day 1 and has already built schemas internally.",
      priority:        "high",
      product:         "SA MCP",
      membersAffected: ["Justin Hual (HIP Creative)"],
      status:          "in-progress",
      category:        "documentation",
      notes:           "JD coordinating with Maddy to accept PRs from HIP Creative's team"
    },
    {
      id:              "html-injection",
      title:           "No HTML/Zip Injection to SA Backend",
      description:     "Members want to build locally in Claude Code (better output) and publish through SA — currently not possible. Live endorsement from Bryan Fikes and Justin Day on April 9.",
      priority:        "high",
      product:         "Website Studio",
      membersAffected: ["Justin Day", "Bryan Fikes"],
      status:          "open",
      category:        "feature-request",
      notes:           "Endorsed live on April 9 call — structured product request ready for engineering"
    },
    {
      id:              "ai-brain-in-platform",
      title:           "No Persistent AI Brain / Memory Inside SA",
      description:     "Members building knowledge systems (Obsidian, custom memory layers) outside SA. JD flagged this publicly March 26 — Manick created Linear ticket CG-1223 same day.",
      priority:        "high",
      product:         "Brand Vault",
      membersAffected: ["Multiple members", "JD"],
      status:          "in-progress",
      category:        "feature-request",
      notes:           "Linear CG-1223: Obsidian-style knowledge base in Brand Vault"
    },
    {
      id:              "windows-wsl",
      title:           "Windows WSL Setup Reliability",
      description:     "WSL/SSL/firewall issues are consuming entire setup sessions for Windows users — leaving members without MCP configured after a full hour of support.",
      priority:        "high",
      product:         "Developer Tools",
      membersAffected: ["Michael Vassar", "Justin Day", "Clayton Joyner"],
      status:          "open",
      category:        "onboarding",
      notes:           "All 3 Windows users hit this in setup sessions"
    },
    {
      id:              "design-content-unified",
      title:           "Design + Content in One Command",
      description:     "Agency teams expect unified output from SA. 'So it can't be design plus content in one command?' — Alex (Michael's web designer). Most commercially actionable product ask in the group.",
      priority:        "high",
      product:         "Content AI",
      membersAffected: ["Michael Vassar + team"],
      status:          "open",
      category:        "feature-request",
      notes:           ""
    },
    {
      id:              "cross-project-orchestration",
      title:           "No Agent Orchestration Across Claude Projects",
      description:     "Cannot chain agents across custom Claude projects — members must manually switch between projects, breaking agentic pipelines.",
      priority:        "high",
      product:         "Claude Code",
      membersAffected: ["Clayton Joyner"],
      status:          "open",
      category:        "platform",
      notes:           "Clayton: 'I've got all these custom Claude projects I've put a ton of energy into — and I end up still having to manually move through each of them'"
    },
    {
      id:              "wordpress-publishing",
      title:           "WordPress → SA Publishing Workflow",
      description:     "Agencies primary-built on WordPress have no clear path to SA publishing. The output question ('What is the output of this?') came from Michael's designer on their first session.",
      priority:        "medium",
      product:         "Website Studio",
      membersAffected: ["Michael Vassar", "Alex (web designer)"],
      status:          "open",
      category:        "integration",
      notes:           ""
    },
    {
      id:              "ghl-mcp",
      title:           "GoHighLevel MCP Missing",
      description:     "GoHighLevel is a primary CRM/automation tool for multiple agencies. No MCP integration exists. Jay Cornelius asked for it on day 1 of setup — his full vision is blocked without it.",
      priority:        "medium",
      product:         "Integrations",
      membersAffected: ["Jay Cornelius", "Justin Day"],
      status:          "open",
      category:        "integration",
      notes:           "First raised March 18 setup session"
    },
    {
      id:              "chatgpt-migration",
      title:           "ChatGPT → Claude Context Migration",
      description:     "Members with years of ChatGPT history (clients, tone, campaign context) have no tooling to migrate. Real switching cost keeping them on ChatGPT in parallel.",
      priority:        "medium",
      product:         "Platform Core",
      membersAffected: ["Bryan Fikes", "Justin Day"],
      status:          "open",
      category:        "platform",
      notes:           "Bryan: 3+ years of client memory trained into ChatGPT ('Bodhi')"
    },
    {
      id:              "webflow-export",
      title:           "No Webflow Export from Claude Builds",
      description:     "Members building client sites in Claude Code want Webflow as a deployment target. Currently no path from Claude-built site → Webflow.",
      priority:        "medium",
      product:         "Integrations",
      membersAffected: ["Clayton Joyner"],
      status:          "open",
      category:        "integration",
      notes:           ""
    },
    {
      id:              "skill-repository",
      title:           "No Shared Skill / Prompt Repository Inside SA",
      description:     "Members are building workflows, skills, and SOPs in isolation. No SA-native place to share them with the group. Clayton proposed this March 26 — group responded strongly.",
      priority:        "medium",
      product:         "Platform Core",
      membersAffected: ["Clayton Joyner", "Justin Day", "Group-wide"],
      status:          "open",
      category:        "platform",
      notes:           ""
    },
    {
      id:              "mcp-context-overhead",
      title:           "MCP Context Consumption — No Visibility or Controls",
      description:     "Members hitting high context consumption when running MCP-heavy workflows. No way to see how much context an MCP call will use before running it, and no way to control or limit it mid-session.",
      priority:        "high",
      product:         "SA MCP",
      membersAffected: ["Clayton Joyner", "Group-wide"],
      status:          "open",
      category:        "platform",
      notes:           "Raised by Clayton Joyner as Circle post topic Apr 20. Highest-engagement recurring theme."
    },
    {
      id:              "autonomous-config-complexity",
      title:           "Autonomous Config Setup — High Drop-Off Complexity",
      description:     "Setting up autonomous agentic configs is generating high member friction. Justin Day's 'Autonomous Config' Circle post drew 8 comments — highest engagement in the Apr 20 batch. Members are struggling or actively working through configuration setup.",
      priority:        "high",
      product:         "Claude Code / Onboarding",
      membersAffected: ["Justin Day", "Group-wide"],
      status:          "open",
      category:        "onboarding",
      notes:           "8-comment thread on Apr 20 — highest engagement signal in the batch. Suggests a gap between setup instructions and what members are actually hitting."
    },
    {
      id:              "workspace-file-organization",
      title:           "Workspace File / Folder Organization — Recurring Friction",
      description:     "Multiple members independently posting about how to structure their agentic workspaces. 'Organization Questions' (Kane) and 'File Command Center' (Justin Day) both appeared Apr 20. Suggests the file structure mental model isn't landing from sessions alone.",
      priority:        "medium",
      product:         "Onboarding / Documentation",
      membersAffected: ["Kane Sivesind", "Justin Day", "Group-wide"],
      status:          "open",
      category:        "onboarding",
      notes:           "Recurring pattern — flagged in at least 2 separate Circle posts Apr 20. JD's Apr 23 file structure deep-dive (screen share) addressed this partially."
    },
    {
      id:              "email-to-site",
      title:           "Email → Claude → Live Site Automation",
      description:     "Scale operators want email-triggered Claude edits to live sites with automated client confirmation. SA not in this execution path yet.",
      priority:        "medium",
      product:         "Website Studio",
      membersAffected: ["Kav / Coach Cav", "Justin Day"],
      status:          "open",
      category:        "feature-request",
      notes:           "Kav is operating ~500 live sites — this is a volume play"
    },
    {
      id:              "seo-playbooks",
      title:           "No SA SEO Workflow Playbooks for Members",
      description:     "Members can't access SA's proven SEO workflows agentically. Clayton asked directly: 'Can your MCP develop an agentic SOP for the absolute best landing page structure based on your data?'",
      priority:        "medium",
      product:         "Atlas Brain",
      membersAffected: ["Clayton Joyner"],
      status:          "open",
      category:        "documentation",
      notes:           ""
    },
    {
      id:              "auto-site-limit",
      title:           "Auto-Site Limit Escalation Path",
      description:     "Michael Vassar stuck at 6 sites for over a week with multiple support tickets and no resolution. No clear escalation path existed outside normal support flow.",
      priority:        "low",
      product:         "Platform Admin",
      membersAffected: ["Michael Vassar"],
      status:          "resolved",
      category:        "support",
      notes:           "Resolved April 9 post-call via Matt + JD direct channel. Michael directed to bypass support funnel."
    }
  ],

  // ─── Restructuring Roadmap ────────────────────────────────────────────────
  // status: in-planning | needs-definition | structure-only | on-hold

  agenda: [
    {
      id:          "mastermind-curriculum",
      pillar:      "Mastermind",
      priority:    1,
      title:       "Curriculum Restructure",
      description: "Converting to hybrid mastermind-course structure (confirmed April 10 by Matt's exec summary). Quarterly milestones with weekly homework + challenges. Member 'superpowers' cross-pollination. SA team rotating show-and-tell. Implementation hours formally communicated. Tag-in structure (Matt → JD → Justin → Implementation) established.",
      owner:       "JD + Matt + Arman",
      status:      "in-planning",
      targetQ:     "Q2 2026",
      keyItems: [
        "Hybrid mastermind-course: quarterly milestones + weekly homework + challenges",
        "Weekly call format: temp check ('what's holding you back?') → goal reports → member showcase → homework",
        "Member 'superpowers' sharing — cross-pollination model",
        "Arman/Lucas/PMs/Juan Jara/Camila/Justin rotating show-and-tell guests",
        "Implementation hours: clearer communication of benefits + how to use them",
        "Tag-in structure: Matt → JD → Justin → Implementation",
        "Pre-onboard prep + educational materials for non-programmers (JD + Matt)",
        "Arman's Corner: weekly 1-hr internal training (bridges Arman → Matt → JD knowledge gap)",
        "JD added to weekly engineering sync",
        "Monday April 14: Visibility Audit + Playbooks with Manick (120 min) — Roto-Rooter example, homework: audit + notes by Thursday"
      ]
    },
    {
      id:          "academy",
      pillar:      "Academy",
      priority:    2,
      title:       "Online Training Curriculum",
      description: "Currently undefined in scope. Needs clear offering definition before resources are allocated. Atlas Brain V2 releases April 15 and Website Studio is updating ~April 10 — curriculum must reflect both.",
      owner:       "Matt + Arman + Esteban",
      status:      "needs-definition",
      targetQ:     "Q2 2026",
      keyItems: [
        "Define the offering: course vs. resource library vs. hybrid",
        "Update curriculum to reflect Atlas Brain V2 (Apr 15 release)",
        "Update for Website Studio refresh (~Apr 10)",
        "Establish domain-level expert ownership by topic area",
        "Bridge internal knowledge gap: Arman → Matt → JD before member training"
      ]
    },
    {
      id:          "youtube",
      pillar:      "YouTube",
      priority:    3,
      title:       "Content Structure",
      description: "Low execution priority. Current action: define content hierarchy so Mastermind and Academy output can be repurposed as free content for acquisition. Esteban's 60-video list is the starting asset.",
      owner:       "Arman + Esteban",
      status:      "structure-only",
      targetQ:     "Q2–Q3 2026",
      keyItems: [
        "Define hierarchy: Mastermind → Academy → YouTube (free stuff is splinter of paid)",
        "Identify high-signal 'big shiny' moments from Mastermind to repurpose",
        "Esteban's 60-video list as content backlog"
      ]
    },
    {
      id:          "workshops",
      pillar:      "Workshops",
      priority:    4,
      title:       "Live Workshops",
      description: "De-prioritized in April 9 restructuring. Bandwidth consolidated on Mastermind and Academy quality. Will revisit once those are running at the standard we're proud of.",
      owner:       "TBD",
      status:      "on-hold",
      targetQ:     "Q3 2026",
      keyItems: []
    }
  ],

  // ─── Action Items ─────────────────────────────────────────────────────────
  // status: open | resolved

  radarLabelQuotes: {
    'Web Studio':          '"I abandoned Web Studio entirely — shipped 4 client sites without one hiccup." — Jonathan Giner',
    'MCP & Docs':          '"The LLMs kept getting confused, so we built some of that stuff out on our side already." — Justin Hual',
    'AI Automation':       '"Humans are the ones making the button clicks. I\'ve got a system — I want to automate the whole thing." — Justin Day',
    'Onboarding':          '"If we put one or two clients on with someone proficient in SA and recorded it, I think we\'d be good to go." — Michael Vassar',
    'Feature Requests':    '"So it can\'t be design plus content in one command?" — Alex (Michael\'s designer)',
    'Content/SEO':         '"Can your MCP develop an agentic SOP for the absolute best landing page structure based on your data?" — Clayton Joyner',
    'Platform Adoption':   '"Why do you think we all plug into him, dude." — Bryan Fikes',
    'Collaboration':       '"I\'ve got a vision." — Clayton Joyner',
    'Enthusiasm':          '"Why do you think we all plug into him, dude." — Bryan Fikes',
    'Progress Velocity':   '"I built it in 3 hours." — Bryan Fikes (on AICashmaker.com)',
    'Platform Confidence': '"The LLMs kept getting confused, so we built some of that stuff out on our side already." — Justin Hual',
    'Clarity / Direction': '"Weekly homework tied to monthly milestones." — confirmed April 9 by Matt Bailey',
    'Group Cohesion':      '"Why do you think we all plug into him, dude." — Bryan Fikes',
    'Building Output':     '"Whatever it is that you want to do, you literally tell Claude Code to do it." — Jonathan Giner',
    'SA Relationship':     '"HTML/zip injection to SA backend — endorsed live on April 9 call." — Bryan Fikes',
  },

  actionItems: [
    {
      id:      "ai1",
      owner:   "Matt Bailey",
      action:  "Draft Monday reset messaging for members — public framing of JD full-time role and new check-in structure",
      dueDate: "Apr 10",
      status:  "resolved",
      source:  "Restructuring Session"
    },
    {
      id:      "ai2",
      owner:   "Arman Advani",
      action:  "Schedule Arman's Corner — weekly Friday 1-hr expert session (SEO strategy, platform depth)",
      dueDate: "Apr 10",
      status:  "open",
      source:  "Restructuring Session"
    },
    {
      id:      "ai3",
      owner:   "JD",
      action:  "Fill in check-in structure doc — define what each biweekly covers to eliminate ad hoc support requests",
      dueDate: "Apr 10",
      status:  "open",
      source:  "Restructuring Session"
    },
    {
      id:      "ai4",
      owner:   "JD",
      action:  "Member readiness map + Q2 roadmap draft — foundation for Monday reset",
      dueDate: "Apr 13",
      status:  "open",
      source:  "Restructuring Session"
    },
    {
      id:      "ai5",
      owner:   "JD + Matt",
      action:  "Updated job description draft — requested by JK for formal role definition",
      dueDate: "TBD",
      status:  "open",
      source:  "Restructuring Session"
    },
    {
      id:      "ai6",
      owner:   "JK",
      action:  "Connect JD + Lucas Zarochinski — MCP call logs access + engineering weekly sync",
      dueDate: "Apr 10",
      status:  "open",
      source:  "Restructuring Session"
    },
    {
      id:      "ai7",
      owner:   "JK",
      action:  "Escalate JD Claude quota limits — hitting project context ceiling, needs internal resolution",
      dueDate: "TBD",
      status:  "open",
      source:  "Restructuring Session"
    },
    {
      id:      "ai8",
      owner:   "JD",
      action:  "1:1 with Michael Vassar — SA MCP setup + file structure + team onboarding path",
      dueDate: "Apr 10",
      status:  "resolved",
      source:  "Weekly Session"
    },
    {
      id:      "ai9",
      owner:   "JD + Maddy",
      action:  "Coordinate SA MCP GitHub docs update — accept schema PRs from HIP Creative",
      dueDate: "TBD",
      status:  "open",
      source:  "Weekly Session"
    },
    {
      id:      "ai10",
      owner:   "Clayton Joyner",
      action:  "Share multi-agent design framework with group on next weekly call",
      dueDate: "Apr 16",
      status:  "open",
      source:  "Weekly Session"
    },
    {
      id:      "ai11",
      owner:   "JD",
      action:  "HIP Creative (Justin Hual) crash course before April 13 — HIPAA context + SA MCP routing",
      dueDate: "Apr 13",
      status:  "open",
      source:  "Weekly Session"
    },
    {
      id:      "ai12",
      owner:   "Matt + JD",
      action:  "Resolve Michael Vassar auto-site limit — stuck at 6 sites for 1+ week",
      dueDate: "Apr 9",
      status:  "resolved",
      source:  "Weekly Session"
    },
    {
      id:      "ai13",
      owner:   "JD",
      action:  "Post setup checklist in Circle — request completion status from all members",
      dueDate: "Apr 9",
      status:  "resolved",
      source:  "Weekly Session"
    },
    {
      id:      "ai14",
      owner:   "JD + Matt + Arman",
      action:  "Define quarterly milestones — foundation for hybrid mastermind-course structure (launch Monday April 14)",
      dueDate: "Apr 14",
      status:  "open",
      source:  "Apr 10 Exec Summary"
    },
    {
      id:      "ai15",
      owner:   "JD + Matt",
      action:  "Restructure weekly call format — implement: temp check → goal reports → member showcase → homework assignment cadence",
      dueDate: "Apr 14",
      status:  "open",
      source:  "Apr 10 Exec Summary"
    },
    {
      id:      "ai16",
      owner:   "JD + Matt",
      action:  "Build pre-onboard prep + educational materials for non-programmers — cover Claude Code basics, file structure, Rules.md/memory.md, skills/plugins",
      dueDate: "TBD",
      status:  "open",
      source:  "Apr 10 Exec Summary"
    },
    {
      id:      "ai17",
      owner:   "Matt + Justin",
      action:  "Decide Monday April 14 format — deck vs. last-time format (confirm before Monday)",
      dueDate: "Apr 13",
      status:  "open",
      source:  "Apr 10 Exec Summary"
    }
  ]

};
