#!/usr/bin/env bash
# Preflight check — run before setup.sh to verify all prerequisites are installed.
# Members using quickstart-mac.sh / quickstart-windows.ps1 will never hit this.
# This guard catches anyone who clones the repo directly and skips the quickstart.

set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

ok()   { echo -e "  ${GREEN}✓${NC}  $1"; }
warn() { echo -e "  ${YELLOW}⚠${NC}  $1"; }
fail() { echo -e "  ${RED}✗${NC}  $1"; }

FAILED=0

echo ""
echo "  Checking prerequisites..."
echo ""

# ── Git ───────────────────────────────────────────────────────────────────────
if command -v git &>/dev/null; then
  ok "Git — $(git --version)"
else
  fail "Git not found"
  if [[ "$OSTYPE" == "darwin"* ]]; then
    warn "Install with Homebrew: brew install git"
    warn "Or use the one-command quickstart:"
    warn "  /bin/bash -c \"\$(curl -fsSL https://raw.githubusercontent.com/jodutoro/AMM-SA/INT/scripts/quickstart-mac.sh)\""
  else
    warn "Install from: https://git-scm.com/download/win"
    warn "Or use the one-command quickstart (PowerShell as Admin):"
    warn "  irm https://raw.githubusercontent.com/jodutoro/AMM-SA/INT/scripts/quickstart-windows.ps1 | iex"
  fi
  FAILED=1
fi

# ── Node.js ───────────────────────────────────────────────────────────────────
if command -v node &>/dev/null; then
  ok "Node.js — $(node --version)"
else
  fail "Node.js not found"
  if [[ "$OSTYPE" == "darwin"* ]]; then
    warn "Install with Homebrew: brew install node"
    warn "Or use the one-command quickstart:"
    warn "  /bin/bash -c \"\$(curl -fsSL https://raw.githubusercontent.com/jodutoro/AMM-SA/INT/scripts/quickstart-mac.sh)\""
  else
    warn "Install from: https://nodejs.org  (choose LTS)"
    warn "Or use the one-command quickstart (PowerShell as Admin):"
    warn "  irm https://raw.githubusercontent.com/jodutoro/AMM-SA/INT/scripts/quickstart-windows.ps1 | iex"
  fi
  FAILED=1
fi

# ── npm ───────────────────────────────────────────────────────────────────────
if command -v npm &>/dev/null; then
  ok "npm — $(npm --version)"
else
  fail "npm not found (usually installed with Node.js)"
  FAILED=1
fi

# ── Claude Code ───────────────────────────────────────────────────────────────
if command -v claude &>/dev/null; then
  ok "Claude Code CLI"
else
  fail "Claude Code not found"
  warn "Download from: https://claude.ai/code"
  FAILED=1
fi

echo ""

if [[ "$FAILED" -ne 0 ]]; then
  echo "  One or more prerequisites are missing."
  echo ""
  echo "  Fastest fix — run the one-command quickstart for your platform:"
  echo ""
  if [[ "$OSTYPE" == "darwin"* ]]; then
    echo '  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/jodutoro/AMM-SA/INT/scripts/quickstart-mac.sh)"'
  else
    echo "  irm https://raw.githubusercontent.com/jodutoro/AMM-SA/INT/scripts/quickstart-windows.ps1 | iex"
  fi
  echo ""
  exit 1
fi
