#!/usr/bin/env bash
# Agentic Marketing Mastermind — Setup Script
# Installs slash commands and runs the interactive setup wizard.

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
COMMANDS_SRC="$SCRIPT_DIR/commands"
COMMANDS_DST="$HOME/.claude/commands"

echo "=== Agentic Marketing Mastermind Setup ==="
echo ""

# ── 1. Install slash commands ────────────────────────────────────────────────

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

# ── 2. Run interactive setup wizard ─────────────────────────────────────────

WIZARD="$SCRIPT_DIR/scripts/setup-interactive.sh"

if [ -f "$WIZARD" ]; then
    if [ ! -f "$SCRIPT_DIR/.env" ]; then
        echo "No .env file found — launching setup wizard..."
        echo ""
        bash "$WIZARD"
    else
        echo ".env already exists. To reconfigure, run:"
        echo "  bash scripts/setup-interactive.sh"
        echo ""

        # Still check MCP config
        SETTINGS_FILE="$HOME/.claude/settings.json"
        CLAUDE_JSON="$HOME/.claude.json"
        if [ -f "$SETTINGS_FILE" ] && grep -q "searchatlas" "$SETTINGS_FILE" 2>/dev/null; then
            echo "SearchAtlas MCP server found in Claude Code settings."
        elif [ -f "$CLAUDE_JSON" ] && grep -q "searchatlas" "$CLAUDE_JSON" 2>/dev/null; then
            echo "SearchAtlas MCP server found in Claude Code config."
        else
            echo "NOTE: SearchAtlas MCP server not configured."
            echo "  See docs/MCP_SETUP.md or re-run: bash scripts/setup-interactive.sh"
        fi
    fi
else
    # Fallback: manual setup guidance
    if [ ! -f "$SCRIPT_DIR/.env" ]; then
        echo "NOTE: No .env file found."
        echo "  Copy .env.example to .env and add your SearchAtlas API key:"
        echo "  cp .env.example .env"
    fi
fi

echo ""
echo "Setup complete! Open Claude Code in this directory and try /help"
