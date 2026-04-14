#!/usr/bin/env bash
# run-insight.sh — Wrapper for scheduled insight + research runs.
#
# Usage:
#   bash run-insight.sh                     # runs blind-spots lens
#   bash run-insight.sh --lens weekly       # runs weekly lens + research agent
#   bash run-insight.sh --lens all          # runs all lenses
#
# This script handles env loading for launchd (which can't read .env directly).

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
VAULT="$(dirname "$SCRIPT_DIR")"
LENS="${2:-blind-spots}"  # default lens

# Parse --lens argument
while [[ $# -gt 0 ]]; do
    case "$1" in
        --lens) LENS="$2"; shift 2;;
        *) shift;;
    esac
done

LOG_PREFIX="[run-insight $(date '+%Y-%m-%d %H:%M:%S')]"
echo "$LOG_PREFIX Starting. Lens=$LENS. Vault=$VAULT"

# ---------------------------------------------------------------------------
# Load API keys from .env using Python (launchd-safe)
# ---------------------------------------------------------------------------
ENV_CANDIDATES=(
    "$HOME/Desktop/agentic/.env"
    "$HOME/.env"
    "/Users/eillacs/Desktop/Agentic/.env"
)

load_env_vars() {
    local env_file=""
    for candidate in "${ENV_CANDIDATES[@]}"; do
        if [[ -f "$candidate" ]]; then
            env_file="$candidate"
            break
        fi
    done

    if [[ -z "$env_file" ]]; then
        echo "$LOG_PREFIX WARNING: No .env file found. Relying on pre-set environment."
        return
    fi

    echo "$LOG_PREFIX Loading env from: $env_file"

    # Export vars using Python to handle quotes and edge cases
    eval "$(python3 - "$env_file" <<'PYEOF'
import sys, re, os

env_file = sys.argv[1]
with open(env_file) as f:
    for line in f:
        line = line.strip()
        if not line or line.startswith('#') or '=' not in line:
            continue
        k, _, v = line.partition('=')
        k = k.strip()
        v = v.strip().strip('"').strip("'")
        if k and k not in os.environ:
            # Print as shell export statement
            print(f"export {k}='{v}'")
PYEOF
    )"
}

load_env_vars

# ---------------------------------------------------------------------------
# Sync voice notes (Wispr) — no-op if not configured
# ---------------------------------------------------------------------------
sync_wispr() {
    local wispr_src="$HOME/Library/Application Support/Wispr/notes"
    local wispr_dst="$VAULT/Wispr"

    if [[ -d "$wispr_src" ]]; then
        echo "$LOG_PREFIX Syncing Wispr notes..."
        rsync -a --include="*.md" --exclude="*" "$wispr_src/" "$wispr_dst/" 2>/dev/null || true
    fi
}
sync_wispr

# ---------------------------------------------------------------------------
# Run insight agent
# ---------------------------------------------------------------------------
echo "$LOG_PREFIX Running insight agent (lens=$LENS)..."
python3 "$SCRIPT_DIR/insight-agent.py" --lens "$LENS"
INSIGHT_EXIT=$?

if [[ $INSIGHT_EXIT -ne 0 ]]; then
    echo "$LOG_PREFIX Insight agent failed with exit code $INSIGHT_EXIT" >&2
    exit $INSIGHT_EXIT
fi

# ---------------------------------------------------------------------------
# Trigger research agent after weekly lens
# ---------------------------------------------------------------------------
if [[ "$LENS" == "weekly" || "$LENS" == "all" ]]; then
    echo "$LOG_PREFIX Weekly lens ran — triggering research agent..."
    python3 "$SCRIPT_DIR/research-agent.py" || {
        echo "$LOG_PREFIX WARNING: Research agent failed (non-fatal)" >&2
    }
fi

echo "$LOG_PREFIX Done."
