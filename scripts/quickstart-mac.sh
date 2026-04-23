#!/usr/bin/env bash
# Agentic Marketing Mastermind — macOS Quick Start
# Creates your workspace, installs all prerequisites, and launches Claude Code.
#
# Usage (copy-paste into Terminal):
#   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/jodutoro/AMM-SA/INT/scripts/quickstart-mac.sh)"

set -e

REPO_URL="https://github.com/jodutoro/AMM-SA.git"

GREEN='\033[0;32m'
CYAN='\033[0;36m'
YELLOW='\033[1;33m'
BOLD='\033[1m'
NC='\033[0m'

ok()   { echo -e "  ${GREEN}✓${NC}  $1"; }
step() { echo -e "\n  ${CYAN}[$1]${NC} $2"; }
warn() { echo -e "  ${YELLOW}⚠${NC}  $1"; }
fail() { echo -e "  [X]  $1"; exit 1; }
info() { echo -e "  $1"; }
hr()   { echo "  ─────────────────────────────────────────────────────"; }

clear
echo ""
echo "  ╔══════════════════════════════════════════════════════╗"
echo "  ║    Agentic Marketing Mastermind — macOS Setup       ║"
echo "  ╚══════════════════════════════════════════════════════╝"
echo ""
echo "  This sets up your full agentic workspace from scratch."
echo "  Estimated time: 5–10 minutes. You'll only need to do this once."
echo ""

# ── 0a: Workspace Naming ─────────────────────────────────────────────────────
hr
echo ""
echo -e "  ${BOLD}Step 1 of 2 — Name your workspace${NC}"
echo ""
echo "  This is the root folder where everything lives:"
echo "  your toolkit, client folders, and AI memory."
echo "  Choose a name that reflects your agency."
echo ""
echo "  Examples: MyAgency-Agentic  |  JohnSmith-AMM  |  AMM-Workspace"
echo ""
echo -n "  Workspace name (Enter for 'AMM-Workspace'): "
read -r WORKSPACE_NAME </dev/tty
WORKSPACE_NAME="${WORKSPACE_NAME:-AMM-Workspace}"
WORKSPACE_DIR="$HOME/$WORKSPACE_NAME"
REPO_DIR="$WORKSPACE_DIR/AMM-SA"

echo ""
ok "Workspace → $WORKSPACE_DIR"
echo ""

# ── 0b: IDE / Terminal Selection ─────────────────────────────────────────────
hr
echo ""
echo -e "  ${BOLD}Step 2 of 2 — Choose your coding environment${NC}"
echo ""
echo "  Claude Code will run from inside your workspace in this tool."
echo "  Select what you use (only installed apps are shown):"
echo ""

IDE_NAMES=()
IDE_OPEN_CMDS=()

# Detect installed editors on this Mac
if [[ -d "/Applications/Cursor.app" ]] || command -v cursor &>/dev/null; then
  IDE_NAMES+=("Cursor")
  IDE_OPEN_CMDS+=("cursor \"$WORKSPACE_DIR\"")
fi

if [[ -d "/Applications/Windsurf.app" ]] || command -v windsurf &>/dev/null; then
  IDE_NAMES+=("Windsurf")
  IDE_OPEN_CMDS+=("windsurf \"$WORKSPACE_DIR\"")
fi

if [[ -d "/Applications/Visual Studio Code.app" ]] || command -v code &>/dev/null; then
  IDE_NAMES+=("VS Code")
  IDE_OPEN_CMDS+=("code \"$WORKSPACE_DIR\"")
fi

if [[ -d "/Applications/Warp.app" ]]; then
  IDE_NAMES+=("Warp")
  IDE_OPEN_CMDS+=("open -a Warp \"$WORKSPACE_DIR\"")
fi

if [[ -d "/Applications/iTerm.app" ]]; then
  IDE_NAMES+=("iTerm2")
  IDE_OPEN_CMDS+=("open -a iTerm \"$WORKSPACE_DIR\"")
fi

# Always include Terminal as the fallback
IDE_NAMES+=("Terminal (stay here)")
IDE_OPEN_CMDS+=("")

for i in "${!IDE_NAMES[@]}"; do
  echo "  $((i+1)). ${IDE_NAMES[$i]}"
done

echo ""
DEFAULT_N="${#IDE_NAMES[@]}"
echo -n "  Enter number (Enter for option $DEFAULT_N — Terminal): "
read -r IDE_NUM </dev/tty
IDE_NUM="${IDE_NUM:-$DEFAULT_N}"

if ! [[ "$IDE_NUM" =~ ^[0-9]+$ ]] || (( IDE_NUM < 1 || IDE_NUM > ${#IDE_NAMES[@]} )); then
  IDE_NUM="$DEFAULT_N"
fi

IDX=$((IDE_NUM - 1))
IDE_NAME="${IDE_NAMES[$IDX]}"
IDE_OPEN_CMD="${IDE_OPEN_CMDS[$IDX]}"

echo ""
ok "Using: $IDE_NAME"
echo ""
hr

# ── Step 1: Xcode Command Line Tools ────────────────────────────────────────
step "1/5" "Xcode Command Line Tools"

if ! xcode-select -p &>/dev/null; then
  warn "Not found — installing..."
  xcode-select --install 2>/dev/null || true
  echo ""
  echo "  A macOS dialog just opened — click Install and wait for it to finish."
  echo "  Then re-run this script:"
  echo ""
  echo '  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/jodutoro/AMM-SA/INT/scripts/quickstart-mac.sh)"'
  echo ""
  exit 0
fi
ok "Xcode Command Line Tools"

# ── Step 2: Homebrew ─────────────────────────────────────────────────────────
step "2/5" "Homebrew"

if ! command -v brew &>/dev/null; then
  warn "Not found — installing..."
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

  if [[ "$(uname -m)" == "arm64" ]]; then
    BREW_PREFIX="/opt/homebrew"
  else
    BREW_PREFIX="/usr/local"
  fi
  eval "$("$BREW_PREFIX/bin/brew" shellenv)"

  SHELL_PROFILE="$HOME/.zprofile"
  [[ "$SHELL" == *"bash"* ]] && SHELL_PROFILE="$HOME/.bash_profile"
  echo "" >> "$SHELL_PROFILE"
  echo 'eval "$('"$BREW_PREFIX"'/bin/brew shellenv)"' >> "$SHELL_PROFILE"
fi
ok "Homebrew $(brew --version 2>/dev/null | head -1 | awk '{print $2}')"

# ── Step 3: Git + Node.js ────────────────────────────────────────────────────
step "3/5" "Git + Node.js"

if ! command -v git &>/dev/null; then
  warn "Git not found — installing..."
  brew install git
fi
ok "$(git --version)"

if ! command -v node &>/dev/null; then
  warn "Node.js not found — installing LTS..."
  brew install node
fi
ok "Node $(node --version) · npm $(npm --version)"

# ── Step 4: Claude Code ──────────────────────────────────────────────────────
step "4/5" "Claude Code"

if command -v claude &>/dev/null; then
  ok "Already installed — $(claude --version 2>/dev/null | head -1)"
else
  info "Installing via npm..."
  npm install -g @anthropic-ai/claude-code
  ok "Installed — $(claude --version 2>/dev/null | head -1)"
fi

# ── Step 5: Workspace + AMM-SA Toolkit ──────────────────────────────────────
step "5/5" "Creating workspace + installing toolkit"

# Workspace folder structure
mkdir -p "$WORKSPACE_DIR/clients"
info "Created: $WORKSPACE_DIR/"
info "Created: $WORKSPACE_DIR/clients/"

# Clone or update AMM-SA
if [[ -d "$REPO_DIR" ]]; then
  warn "AMM-SA already exists — pulling latest..."
  git -C "$REPO_DIR" pull origin INT 2>/dev/null || true
else
  info "Cloning AMM-SA toolkit..."
  git clone -b INT "$REPO_URL" "$REPO_DIR"
fi
ok "AMM-SA toolkit ready at $REPO_DIR"

# Workspace-level CLAUDE.md so Claude knows the layout on first open
if [[ ! -f "$WORKSPACE_DIR/CLAUDE.md" ]]; then
  cat > "$WORKSPACE_DIR/CLAUDE.md" <<CLAUDEMD
# $WORKSPACE_NAME — Agentic Workspace

## Layout
- \`AMM-SA/\`   — toolkit: slash commands, workflows, SearchAtlas MCP
- \`clients/\`  — one subfolder per client (e.g. \`clients/acme-roofing/\`)

## Quick Start
1. Run \`/my-account\` — see your SearchAtlas account at a glance
2. Run \`/setup-integrations\` — connect HubSpot, ClickUp, Linear, and more
3. Run \`/onboard-client\` — guided setup for a new client
4. Run \`/help\` — full command list
CLAUDEMD
  info "Created: $WORKSPACE_DIR/CLAUDE.md"
fi

# Run AMM-SA setup (slash commands + SA MCP + optional comms)
echo ""
cd "$REPO_DIR"
bash setup.sh

# ── Done ─────────────────────────────────────────────────────────────────────
echo ""
hr
echo ""
echo -e "  ${BOLD}Your workspace is ready.${NC}"
echo ""
echo "  $WORKSPACE_DIR/"
echo "  ├── AMM-SA/       ← toolkit (slash commands, workflows)"
echo "  └── clients/      ← add one folder per client here"
echo ""
hr
echo ""

if [[ -n "$IDE_OPEN_CMD" ]]; then
  echo "  Opening $IDE_NAME at your workspace..."
  eval "$IDE_OPEN_CMD" 2>/dev/null || true
  echo ""
  echo "  In $IDE_NAME, open the integrated terminal and run:"
  echo ""
  echo -e "    ${BOLD}cd ~/\"$WORKSPACE_NAME\"${NC}"
  echo -e "    ${BOLD}claude${NC}"
else
  echo "  Run these two commands to start:"
  echo ""
  echo -e "    ${BOLD}cd ~/\"$WORKSPACE_NAME\"${NC}"
  echo -e "    ${BOLD}claude${NC}"
fi

echo ""
echo "  Claude Code will open in your workspace."
echo "  Then type: /my-account"
echo ""
hr
echo ""
echo "  Next: /setup-integrations inside Claude Code to connect"
echo "  HubSpot, ClickUp, Linear, Notion, Slack, Gmail, GitHub."
echo ""
