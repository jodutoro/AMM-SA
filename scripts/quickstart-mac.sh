#!/usr/bin/env bash
# Agentic Marketing Mastermind — macOS Quick Start
# Installs all prerequisites and sets up the toolkit in one run.
#
# Usage (copy-paste into Terminal):
#   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/jodutoro/AMM-SA/INT/scripts/quickstart-mac.sh)"

set -e

REPO_URL="https://github.com/jodutoro/AMM-SA.git"
REPO_DIR="$HOME/AMM-SA"

GREEN='\033[0;32m'
CYAN='\033[0;36m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

ok()   { echo -e "  ${GREEN}✓${NC} $1"; }
step() { echo -e "\n  ${CYAN}[$1]${NC} $2"; }
warn() { echo -e "  ${YELLOW}⚠${NC}  $1"; }
fail() { echo -e "  ${RED}✗${NC} $1"; exit 1; }

echo ""
echo "  ╔══════════════════════════════════════════════════╗"
echo "  ║   Agentic Marketing Mastermind — macOS Setup    ║"
echo "  ╚══════════════════════════════════════════════════╝"
echo ""

# ── Step 1: Xcode Command Line Tools ────────────────────────────────────────
step "1/6" "Xcode Command Line Tools"

if ! xcode-select -p &>/dev/null; then
  warn "Xcode CLT not found — installing..."
  xcode-select --install 2>/dev/null || true
  echo ""
  echo "  A dialog box has opened asking to install developer tools."
  echo "  Click 'Install', wait for it to finish, then re-run this script."
  echo ""
  echo "  Re-run with:"
  echo "  /bin/bash -c \"\$(curl -fsSL https://raw.githubusercontent.com/jodutoro/AMM-SA/INT/scripts/quickstart-mac.sh)\""
  exit 0
fi
ok "Xcode Command Line Tools"

# ── Step 2: Homebrew ─────────────────────────────────────────────────────────
step "2/6" "Homebrew (package manager)"

if ! command -v brew &>/dev/null; then
  warn "Homebrew not found — installing..."
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

  # Add Homebrew to PATH for this session + persist it
  if [[ "$(uname -m)" == "arm64" ]]; then
    BREW_PREFIX="/opt/homebrew"
  else
    BREW_PREFIX="/usr/local"
  fi

  eval "$("$BREW_PREFIX/bin/brew" shellenv)"

  # Persist to shell profile
  SHELL_PROFILE="$HOME/.zprofile"
  [[ "$SHELL" == *"bash"* ]] && SHELL_PROFILE="$HOME/.bash_profile"
  echo "" >> "$SHELL_PROFILE"
  echo 'eval "$('"$BREW_PREFIX"'/bin/brew shellenv)"' >> "$SHELL_PROFILE"
fi
ok "Homebrew $(brew --version 2>/dev/null | head -1 | awk '{print $2}')"

# ── Step 3: Git ──────────────────────────────────────────────────────────────
step "3/6" "Git"

if ! command -v git &>/dev/null; then
  warn "Git not found — installing..."
  brew install git
fi
ok "$(git --version)"

# ── Step 4: Node.js + npm ────────────────────────────────────────────────────
step "4/6" "Node.js + npm"

if ! command -v node &>/dev/null; then
  warn "Node.js not found — installing LTS..."
  brew install node
fi
ok "Node $(node --version) · npm $(npm --version)"

# ── Step 5: Claude Code CLI ──────────────────────────────────────────────────
step "5/6" "Claude Code CLI"

if ! command -v claude &>/dev/null; then
  echo ""
  echo "  Claude Code is not installed yet."
  echo ""
  echo "  Install it from: https://claude.ai/code"
  echo "  → Download the Mac app, open it, and follow the setup."
  echo ""
  echo "  Once installed, re-run this script:"
  echo "  /bin/bash -c \"\$(curl -fsSL https://raw.githubusercontent.com/jodutoro/AMM-SA/INT/scripts/quickstart-mac.sh)\""
  echo ""
  exit 0
fi
ok "Claude Code ready"

# ── Step 6: Clone + Setup ────────────────────────────────────────────────────
step "6/6" "AMM-SA toolkit"

if [[ -d "$REPO_DIR" ]]; then
  warn "Repo already exists — pulling latest..."
  git -C "$REPO_DIR" pull origin INT 2>/dev/null || true
else
  echo "  Cloning into $REPO_DIR ..."
  git clone -b INT "$REPO_URL" "$REPO_DIR"
fi

cd "$REPO_DIR"
bash setup.sh

echo ""
echo "  ╔══════════════════════════════════════════════════╗"
echo "  ║              Setup complete!                    ║"
echo "  ╚══════════════════════════════════════════════════╝"
echo ""
echo "  Open Claude Code, navigate to: $REPO_DIR"
echo "  Then try: /my-account"
echo ""
