# Agentic Marketing Mastermind

AI-powered digital marketing toolkit for [SearchAtlas](https://searchatlas.com) agencies. Run SEO, GBP, PPC, content, and LLM visibility workflows — all from your terminal with Claude Code.

## Setup (~5 minutes)

```bash
git clone https://github.com/jodutoro/AMM-SA.git
cd AMM-SA
bash setup.sh
```

The setup will:
- Add the SearchAtlas MCP to Claude Code (OAuth — no API key needed)
- Optionally configure Slack, Discord, Email, and Circle integrations
- Install all slash commands

**First use:** When you run any SearchAtlas command, Claude Code will prompt you to authorize via your SearchAtlas account. One-time OAuth flow.

## Commands

### Account & Clients
```
/my-account          # All businesses, projects, campaigns, GBP locations
/business-report     # Deep dive on a single business
/onboard-client      # Guided new client setup
```

### Execute Workflows
```
/run-seo             # SEO onboarding or monthly maintenance
/run-gbp             # Google Business Profile optimization
/run-ppc             # PPC campaign build and launch
/run-content         # Article generation from topical maps
/run-pr              # Press releases + cloud stacks + digital PR
/run-visibility      # LLM visibility and sentiment monitoring
```

### Share Results
```
/send-slack          # Post to Slack (supports multiple channels)
/send-discord        # Post to Discord via webhook
/send-email          # Send an email via Resend API
/send-circle         # Post to a Circle community space
```

## All Commands

| Command | Description |
|---------|-------------|
| `/my-account` | Show all businesses, projects, campaigns, and GBP locations |
| `/onboard-client` | Guided client onboarding — collect info, map needs to tools, execute |
| `/business-report` | Deep dive report on a single business |
| `/run-seo` | SEO onboarding or monthly maintenance workflow |
| `/run-gbp` | Optimize a Google Business Profile |
| `/run-ppc` | Build and launch a PPC campaign |
| `/run-content` | Generate articles, topical maps, content briefs |
| `/run-pr` | Create and distribute press releases |
| `/run-visibility` | Run LLM visibility and sentiment analysis |
| `/send-slack` | Post to Slack (supports multiple channels) |
| `/send-discord` | Post to Discord via webhook |
| `/send-email` | Send an email via Resend API |
| `/send-circle` | Post to a Circle community space |
| `/help` | List all available commands |

## Automate with Workflow Templates

Templates in `workflows/` define step-by-step tool chains for recurring tasks:

| Template | Use case |
|----------|----------|
| `seo-onboarding.yaml` | Full new client SEO setup |
| `monthly-seo.yaml` | Monthly maintenance: suggestions, schema, indexing |
| `gbp-optimization.yaml` | GBP cleanup: recommendations, categories, services |
| `gbp-monthly.yaml` | GBP maintenance: reviews, posts, automation |
| `ppc-launch.yaml` | PPC campaign: business, products, keywords, campaigns |
| `authority-building.yaml` | PR and link building: press, cloud stacks, outreach |
| `llm-visibility.yaml` | AI search: visibility, sentiment, SERP analysis |

## Prerequisites

- [Claude Code](https://claude.ai/code) installed
- A [SearchAtlas](https://searchatlas.com) account

## Manual MCP Setup

If you prefer to add the MCP server manually:

```bash
claude mcp add searchatlas --type http https://mcp.searchatlas.com/mcp
```

See [docs/MCP_SETUP.md](docs/MCP_SETUP.md) for full details and troubleshooting.

## Verify Setup

```bash
bash scripts/verify-setup.sh
```

## Documentation

- [MCP Setup Guide](docs/MCP_SETUP.md) — Connect to the SearchAtlas MCP
- [Tool Reference](docs/TOOL_REFERENCE.md) — Tool groups and operations
- [Golden Rules](docs/GOLDEN_RULES.md) — Best practices for reliable tool usage
- [Workflows Guide](docs/WORKFLOWS.md) — How workflow templates work
- [Intent Mapping](docs/INTENT_MAPPING.md) — Keyword-to-tool routing reference
- [Setup Guide (printable)](docs/Agentic-Marketing-Mastermind-Setup-Guide.html)

## Updating

```bash
git pull origin INT
bash setup.sh
```

## License

MIT — see [LICENSE](LICENSE)
