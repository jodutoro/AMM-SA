# Agentic Marketing Mastermind

AI-powered digital marketing toolkit for [SearchAtlas](https://searchatlas.com) agencies. Connect your account, onboard clients, and execute marketing workflows — all from your terminal with Claude Code.

> **One key, all integrations.** Your SearchAtlas API key unlocks SEO, GBP, Google Ads, content, press releases, WordPress publishing, and LLM visibility. No separate credentials needed for each service.

## How It Works

### 1. Set Up
Clone, run the setup wizard, enter your API key.

```bash
git clone https://github.com/manickbhan/agentic-mastermind.git
cd agentic-mastermind
bash setup.sh
```

The setup wizard will:
- Ask for your SearchAtlas API key (required)
- Optionally configure Slack, Discord, Email, and Circle integrations
- Auto-configure Claude Code MCP servers
- Install all slash commands

### 2. Analyze
See what a client has across all SearchAtlas products.

```
/my-account          # All businesses, projects, campaigns, GBP locations
/business-report     # Deep dive on a single business
```

### 3. Onboard
Walk through setting up a new client with the tools they need.

```
/onboard-client      # Guided setup — maps client needs to the right tools
```

### 4. Execute
Run pre-built workflows for any marketing channel.

```
/run-seo             # SEO onboarding or monthly maintenance
/run-gbp             # Google Business Profile optimization
/run-ppc             # PPC campaign build and launch
/run-content         # Article generation from topical maps
/run-pr              # Press releases + cloud stacks + digital PR
/run-visibility      # LLM visibility and sentiment monitoring
```

### 5. Automate
Use workflow templates for recurring monthly tasks.

Workflow templates in `workflows/` define step-by-step tool chains:
- **seo-onboarding.yaml** — Full SEO setup: project, audit, keywords, content
- **monthly-seo.yaml** — Recurring: suggestions, schema, indexing, grading
- **gbp-optimization.yaml** — GBP cleanup: recommendations, categories, services
- **gbp-monthly.yaml** — GBP maintenance: reviews, posts, automation
- **ppc-launch.yaml** — PPC: business, products, keywords, campaigns
- **authority-building.yaml** — PR and link building: press, cloud stacks, outreach
- **llm-visibility.yaml** — AI search: visibility, sentiment, SERP analysis

### 6. Communicate
Share results with clients via Slack, Discord, Email, or Circle.

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
| `/run-seo` | Execute SEO onboarding or monthly maintenance workflow |
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

## Prerequisites

- [Claude Code](https://claude.ai/code) installed
- A SearchAtlas account with an API key ([get one here](https://searchatlas.com))

## Manual Setup (if not using the wizard)

```bash
cp .env.example .env
# Edit .env — add your SearchAtlas API key
bash setup.sh
```

Then add the MCP server to `~/.claude/settings.json`:

```json
{
  "mcpServers": {
    "searchatlas": {
      "type": "url",
      "url": "https://mcp.searchatlas.com/sse",
      "headers": {
        "X-API-KEY": "<your-api-key>"
      }
    }
  }
}
```

See [docs/MCP_SETUP.md](docs/MCP_SETUP.md) for detailed instructions.

## Verify Setup

```bash
bash scripts/verify-setup.sh
```

Checks your `.env`, API key, file permissions, MCP config, and optionally tests API connectivity.

## Documentation

- [MCP Setup Guide](docs/MCP_SETUP.md) — How to get your API key and connect
- [Tool Reference](docs/TOOL_REFERENCE.md) — All 59 tool groups and ~310 operations
- [Intent Mapping](docs/INTENT_MAPPING.md) — Keyword-to-tool routing reference
- [Golden Rules](docs/GOLDEN_RULES.md) — Best practices for reliable tool usage
- [Workflows Guide](docs/WORKFLOWS.md) — How workflow templates work
- [Setup Guide (printable)](docs/Agentic-Marketing-Mastermind-Setup-Guide.html) — Step-by-step onboarding with clickable links
- [Setup Presentation](docs/Agentic-Marketing-Mastermind-Setup-Guide.pptx) — Slide deck for team walkthroughs

## Updating

```bash
git pull origin main
bash setup.sh
```

## License

MIT — see [LICENSE](LICENSE)
