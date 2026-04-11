// ─── AMM Intelligence Dashboard — Data Layer ──────────────────────────────
// Edit this file to update the dashboard. Push to GitHub → Netlify auto-deploys.
// ─────────────────────────────────────────────────────────────────────────────

const AMM_DATA = {

  meta: {
    program:        "Agentic Marketing Mastermind",
    cohort:         "Q1–Q2 2026",
    lastUpdated:    "April 10, 2026",
    projectManager: "Jonathan Duque",
    host:           "Matt Bailey"
  },

  kpis: {
    totalMembers:          11,
    activeMembers:         10,
    atRiskMembers:          1,
    membersInsidePlatform:  2,
    membersMixed:           4,
    membersAroundPlatform:  3,
    platformGapsOpen:      15,
    openActionItems:       13,
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
      lastActive:      "2026-04-09"
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
      lastActive:      "2026-04-09"
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
        "No AI brain/memory system inside SA — building externally",
        "No markdown/design brain injection for consistent SA output"
      ],
      currentBuilds: [
        "AI command center: bank + CCs + ClickUp + Slack + Gmail + Hormozi $100M modules (100% automated)",
        "Supabase front-end dashboard with user auth + permissions (pre-deploy)",
        "Automated client onboarding: transcript in → project files out → business graded automatically",
        "Branding pipeline: competitor research → Google Reviews extraction → copy (chaining into single flow)"
      ],
      featureRequests: [
        "Weekly homework tied to monthly milestones (formally requested April 9 — confirmed by Matt)",
        "HTML/zip injection + design brain context into SA",
        "Markdown upload for SA design consistency"
      ],
      platformFriction: [
        "No persistent AI brain inside SA — built own system outside platform",
        "Design output inconsistency between local Claude and SA MCP"
      ],
      personality:     "The program's systems architect. Longest SA customer in the group (3–4 years) — knows exactly what SA can and can't do. Builds everything into repeatable, shareable systems and gives them to the group without being asked. Structured, methodical, collaborative. His request for weekly homework was the direct trigger that confirmed the curriculum restructuring. High collaborative value, low noise.",
      quote:           "Humans are the ones making the button clicks. I've got a system for it — I want to automate the whole thing.",
      quoteContext:    "On his automation vision for the agency",
      skills:          ['Claude Code', 'Automation', 'System Design', 'Supabase'],
      lastActive:      "2026-04-09"
    },
    {
      id:              "jonathan-giner",
      programStage:    "active",
      avatarUrl:       "avatars/jonathan-giner.png",
      name:            "Jonathan Giner",
      agency:          "Agency Owner · Independent",
      tier:            "advanced",
      saAlignment:     "around",
      supportDemand:   "none",
      engagementStyle: "quiet",
      setupStatus:     "complete",
      setupItems:      ["Claude Code", "Warp terminal", "SA (research only, not publishing)"],
      blockers:        [
        "Web Studio abandoned after repeated instability",
        "Design consistency at scale still being refined"
      ],
      currentBuilds: [
        "4+ large client sites via Warp + Claude Code (zero SA publish workflow)",
        "Refining design consistency across multi-page builds"
      ],
      featureRequests: [
        "Stable, predictable SA publishing workflow",
        "Design consistency tooling"
      ],
      platformFriction: [
        "Abandoned Web Studio entirely after instability — no work lost if he stays outside SA",
        "Full build pipeline now runs outside SA ecosystem"
      ],
      personality:     "Delivers without fanfare. Self-directed, zero support demand, maximum output. Found instability in Web Studio early, self-solved by leaving the platform, shipped 4 client sites without one hiccup. Doesn't raise issues loudly. The risk is quiet attrition: if SA's build quality doesn't match what he's achieving outside it, he won't say anything — he'll just stay outside.",
      quote:           "Whatever it is that you want to do, you literally tell Claude Code to do it.",
      quoteContext:    "On his build workflow, shared with the group",
      skills:          ['Claude Code', 'Site Building', 'Client Delivery'],
      lastActive:      "2026-04-09"
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
      lastActive:      "2026-04-10"
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
      lastActive:      "2026-04-09"
    },
    {
      id:              "jay-cornelius",
      programStage:    "active",
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
      lastActive:      "2026-03-26"
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
      lastActive:      "2026-03-26"
    },
    {
      id:              "kane-sivesind",
      programStage:    "active",
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
      currentBuilds:   ["Configuration complete — builds in progress (reporting TBD)"],
      featureRequests: [],
      platformFriction: [],
      personality:     "Arrived at the first session fully configured — Claude Code, SA MCP, agentic repo, and swarm workflows already running. Zero onboarding needed, zero support demand. Currently quiet on output reporting. No active blockers. A self-sufficient signal in a group with many support needs.",
      quote:           "—",
      quoteContext:    "",
      skills:          ['Claude Code', 'SA MCP', 'Swarm Workflows'],
      lastActive:      "2026-03-26"
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
      lastActive:      "2026-04-10"
    },
    {
      id:              "andy-zelt",
      programStage:    "enrolled",
      name:            "Andy Zelt",
      agency:          "Independent",
      tier:            "risk",
      saAlignment:     "unknown",
      supportDemand:   "unknown",
      engagementStyle: "silent",
      setupStatus:     "unknown",
      setupItems:      [],
      blockers:        ["No engagement data", "Absent during March status check (vacation)"],
      currentBuilds:   [],
      featureRequests: [],
      platformFriction: [],
      personality:     "Confirmed communication gap — named in Matt's April 10 internal executive summary as the one member with notably poor attendance and communication. Was absent during March status check (vacation). No engagement pattern established in any recorded session. Setup status unknown. Direct outreach required before Monday April 14 to assess baseline and whether the program format is working.",
      quote:           "—",
      quoteContext:    "",
      skills:          [],
      lastActive:      "2026-04-02"
    }
  ],

  // ─── Platform Gaps ────────────────────────────────────────────────────────
  // priority: critical | high | medium | low
  // status:   open | in-progress | resolved
  // category: platform | feature-request | documentation | integration | onboarding | support
  // effort.complexity: low | medium | high
  // effort.team: LPS | AI Agent | Platform | Both | Atlas Brain | Brand Vault
  // gain.type: retention | acquisition | upsell | mixed | positioning

  platformGaps: [
    {
      id:              "web-studio-inconsistency",
      title:           "Website Studio Output Inconsistency",
      description:     "Design varies dramatically between runs — same prompt produces very different visual output. Members cannot deliver predictable, brand-consistent results.",
      priority:        "critical",
      product:         "Website Studio",
      membersAffected: ["Bryan Fikes", "Clayton Joyner", "Group-wide"],
      status:          "open",
      category:        "platform",
      notes:           "",
      effort:          { devDays: "60", sprints: "4", team: "LPS", complexity: "high" },
      gain:            { type: "retention", arr: "$150–250K", note: "Fixing inconsistency is a direct churn blocker for agency-tier customers who need brand-predictable output. Estimated 5% churn reduction in WS-heavy segment." }
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
      notes:           "Jonathan Giner abandoned Web Studio entirely and shipped 4 client sites outside SA",
      effort:          { devDays: "80", sprints: "4", team: "LPS", complexity: "high" },
      gain:            { type: "retention", arr: "$120–200K", note: "Instability is causing full platform defection (Jonathan Giner, Bryan migrated to Netlify). Saving ~5% of at-risk base from defection at ~$155 ARPC." }
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
      notes:           "JD coordinating with Maddy to accept PRs from HIP Creative's team",
      effort:          { devDays: "15", sprints: "1", team: "AI Agent", complexity: "low" },
      gain:            { type: "acquisition", arr: "$30–80K", note: "Community PRs + improved docs accelerate MCP adoption. Low effort with outsized developer-trust returns. HIP Creative team already writing schemas." }
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
      notes:           "Endorsed live on April 9 call — structured product request ready for engineering",
      effort:          { devDays: "45", sprints: "3", team: "LPS", complexity: "medium" },
      gain:            { type: "mixed", arr: "$80–180K", note: "Keeps power users (Bryan, Justin) publishing through SA instead of Netlify. Opens agency-tier upsell path: 15+ new Agency plan customers projected." }
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
      notes:           "Linear CG-1223: Obsidian-style knowledge base in Brand Vault",
      effort:          { devDays: "80", sprints: "5", team: "Brand Vault", complexity: "high" },
      gain:            { type: "retention", arr: "$100–250K", note: "Memory/knowledge lock-in is the highest-stickiness feature in AI tools. Once active, switching cost approaches zero. Direct competitor differentiator vs. ChatGPT." }
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
      notes:           "All 3 Windows users hit this in setup sessions",
      effort:          { devDays: "15", sprints: "1", team: "Platform", complexity: "low" },
      gain:            { type: "acquisition", arr: "$20–60K", note: "~40% of the market is Windows. Scripted installer removes full-session support burden and improves trial-to-paid conversion for dev users." }
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
      notes:           "",
      effort:          { devDays: "64", sprints: "4", team: "Both", complexity: "high" },
      gain:            { type: "mixed", arr: "$150–350K", note: "This is the core agency value proposition. Unified output converts full-service agencies at higher tiers ($399+). Biggest single new-revenue unlock in the gap list." }
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
      notes:           "Clayton: 'I've got all these custom Claude projects I've put a ton of energy into — and I end up still having to manually move through each of them'",
      effort:          { devDays: "60", sprints: "5", team: "AI Agent", complexity: "high" },
      gain:            { type: "retention", arr: "$60–120K", note: "Niche but high-LTV: agency-tier power users building multi-agent pipelines are exactly SA's stickiest segment. Partial dependency on Anthropic API changes." }
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
      notes:           "",
      effort:          { devDays: "40", sprints: "3", team: "LPS", complexity: "medium" },
      gain:            { type: "acquisition", arr: "$80–200K", note: "WordPress powers 43% of the web. WP agencies are a large untapped SA segment. Plugin + export path confirmed feasible by Nico/Lucas (MCP check-in Apr 9)." }
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
      notes:           "First raised March 18 setup session",
      effort:          { devDays: "25", sprints: "2", team: "AI Agent", complexity: "medium" },
      gain:            { type: "acquisition", arr: "$50–120K", note: "GHL has 60K+ agencies. SA + GHL MCP opens adjacent pipeline and partnership play. Jay's entire vision is blocked without this — direct retention risk." }
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
      notes:           "Bryan: 3+ years of client memory trained into ChatGPT ('Bodhi')",
      effort:          { devDays: "45", sprints: "3", team: "Platform", complexity: "medium" },
      gain:            { type: "acquisition", arr: "$50–120K", note: "Removes the #1 hidden switching cost. Most AI marketers have ChatGPT history they can't move. Improves trial conversion and reduces 90-day early churn." }
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
      notes:           "",
      effort:          { devDays: "25", sprints: "2", team: "AI Agent", complexity: "medium" },
      gain:            { type: "acquisition", arr: "$50–150K", note: "Arman confirmed live partner use case (Apr 9). Webflow publishes HTML directly — variable mapping is the only blocker. Design-forward agencies are higher-ARPU segment." }
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
      notes:           "",
      effort:          { devDays: "40", sprints: "3", team: "Platform", complexity: "medium" },
      gain:            { type: "retention", arr: "$50–120K", note: "Network effect flywheel: shared skills increase platform value for all users. Community stickiness reduces long-term churn and drives organic acquisition." }
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
      notes:           "Kav is operating ~500 live sites — this is a volume play",
      effort:          { devDays: "55", sprints: "4", team: "Both", complexity: "medium" },
      gain:            { type: "acquisition", arr: "$60–150K", note: "Kav's 500-site operation is a single-customer enterprise deal. Email-triggered automation is a scale-operator differentiator that no SEO platform currently offers." }
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
      notes:           "",
      effort:          { devDays: "30", sprints: "2", team: "Atlas Brain", complexity: "medium" },
      gain:            { type: "mixed", arr: "$80–200K", note: "SA's core moat is SEO intelligence. Making it agentic is the clearest defensive differentiator vs. generic AI tools. High positioning value beyond direct revenue." }
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
      notes:           "Resolved April 9 post-call via Matt + JD direct channel. Michael directed to bypass support funnel.",
      effort:          { devDays: "5", sprints: "1", team: "Platform", complexity: "low" },
      gain:            { type: "retention", arr: "$10–20K", note: "Resolved. Clear escalation path prevents high-potential customers from churning during onboarding due to fixable limits." }
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
