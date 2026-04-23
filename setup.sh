#!/usr/bin/env bash
# Agentic Marketing Mastermind — Setup Script
# Installs slash commands and configures the SearchAtlas MCP.

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
COMMANDS_SRC="$SCRIPT_DIR/commands"
COMMANDS_DST="$HOME/.claude/commands"

echo "=== Agentic Marketing Mastermind Setup ==="
echo ""

# ── 1. Check prerequisites ───────────────────────────────────────────────────

if ! command -v claude &>/dev/null; then
    echo "ERROR: Claude Code CLI not found."
    echo "Install it first: https://claude.ai/code"
    exit 1
fi

# ── 2. Install slash commands ────────────────────────────────────────────────

mkdir -p "$COMMANDS_DST"

if [ -d "$COMMANDS_SRC" ] && [ "$(ls -A "$COMMANDS_SRC" 2>/dev/null)" ]; then
    cp "$COMMANDS_SRC"/*.md "$COMMANDS_DST/" 2>/dev/null || true
    echo "Installed commands:"
    for f in "$COMMANDS_SRC"/*.md; do
        name=$(basename "$f" .md)
        echo "  /$name"
    done
else
    echo "No commands found in $COMMANDS_SRC"
fi

echo ""

# ── 3. Configure SearchAtlas MCP ─────────────────────────────────────────────

if claude mcp list 2>/dev/null | grep -q "searchatlas"; then
    echo "SearchAtlas MCP already configured."
else
    echo "Adding SearchAtlas MCP server..."
    claude mcp add searchatlas --type http https://mcp.searchatlas.com/mcp
    echo "SearchAtlas MCP configured."
fi

echo ""

# ── 4. Optional: communication channels ──────────────────────────────────────

WIZARD="$SCRIPT_DIR/scripts/setup-interactive.sh"

if [ ! -f "$SCRIPT_DIR/.env" ] && [ -f "$WIZARD" ]; then
    echo "No communication channels configured yet."
    read -p "Set up Slack/Discord/Email/Circle integrations? (y/n): " SETUP_COMMS
    if [[ "$SETUP_COMMS" == "y" || "$SETUP_COMMS" == "Y" ]]; then
        bash "$WIZARD"
    else
        echo "Skipped. Run 'bash scripts/setup-interactive.sh' anytime to configure."
    fi
elif [ -f "$SCRIPT_DIR/.env" ]; then
    echo "Communication channels already configured."
    echo "To reconfigure, run: bash scripts/setup-interactive.sh"
fi

echo ""
echo "Setup complete!"
echo ""
echo "Next steps:"
echo "  1. Open Claude Code in this directory"
echo "  2. Try: /my-account  (will prompt OAuth authorization on first use)"
echo "  3. Connect your other tools: /setup-integrations"
echo "     Supports: HubSpot, ClickUp, Linear, Notion, Slack, Gmail, Google Calendar, GitHub"
echo "  4. Verify everything: bash scripts/verify-setup.sh"
