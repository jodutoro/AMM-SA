# Agentic Marketing Mastermind — Windows Quick Start
# Creates your workspace, installs all prerequisites, and launches Claude Code.
#
# Usage — run in PowerShell as Administrator (Win + X -> Terminal (Admin)):
#   irm https://raw.githubusercontent.com/jodutoro/AMM-SA/INT/scripts/quickstart-windows.ps1 | iex

$ErrorActionPreference = "Stop"

$REPO_URL = "https://github.com/jodutoro/AMM-SA.git"
$GIT_BASH  = "C:\Program Files\Git\bin\bash.exe"

function Write-Ok($msg)   { Write-Host "  [OK] $msg" -ForegroundColor Green }
function Write-Step($n, $msg) { Write-Host "`n  [$n] $msg" -ForegroundColor Cyan }
function Write-Warn($msg) { Write-Host "  [!]  $msg" -ForegroundColor Yellow }
function Write-Info($msg) { Write-Host "       $msg" }
function Write-Hr()       { Write-Host "  ─────────────────────────────────────────────────────" }
function Write-Fail($msg) { Write-Host "  [X]  $msg" -ForegroundColor Red; exit 1 }

function Update-SessionPath {
  $env:Path = [System.Environment]::GetEnvironmentVariable("Path", "Machine") + ";" +
              [System.Environment]::GetEnvironmentVariable("Path", "User")
}

Clear-Host
Write-Host ""
Write-Host "  +──────────────────────────────────────────────────────+"
Write-Host "  |    Agentic Marketing Mastermind — Windows Setup     |"
Write-Host "  +──────────────────────────────────────────────────────+"
Write-Host ""
Write-Host "  This sets up your full agentic workspace from scratch."
Write-Host "  Estimated time: 5-10 minutes. You'll only need to do this once."
Write-Host ""

# ── 0a: Workspace Naming ──────────────────────────────────────────────────────
Write-Hr
Write-Host ""
Write-Host "  Step 1 of 2 — Name your workspace" -ForegroundColor White
Write-Host ""
Write-Host "  This is the root folder where everything lives:"
Write-Host "  your toolkit, client folders, and AI memory."
Write-Host "  Choose a name that reflects your agency."
Write-Host ""
Write-Host "  Examples: MyAgency-Agentic  |  JohnSmith-AMM  |  AMM-Workspace"
Write-Host ""
$WORKSPACE_NAME = Read-Host "  Workspace name (Enter for 'AMM-Workspace')"
if ([string]::IsNullOrWhiteSpace($WORKSPACE_NAME)) { $WORKSPACE_NAME = "AMM-Workspace" }

$WORKSPACE_DIR = "$HOME\$WORKSPACE_NAME"
$REPO_DIR = "$WORKSPACE_DIR\AMM-SA"

Write-Host ""
Write-Ok "Workspace -> $WORKSPACE_DIR"
Write-Host ""

# ── 0b: IDE / Terminal Selection ──────────────────────────────────────────────
Write-Hr
Write-Host ""
Write-Host "  Step 2 of 2 — Choose your coding environment" -ForegroundColor White
Write-Host ""
Write-Host "  Claude Code will run from inside your workspace in this tool."
Write-Host "  Select what you use (only installed apps are shown):"
Write-Host ""

$IDE_NAMES   = [System.Collections.ArrayList]@()
$IDE_OPEN    = [System.Collections.ArrayList]@()

# Detect installed editors on Windows
if (Get-Command cursor -ErrorAction SilentlyContinue) {
  [void]$IDE_NAMES.Add("Cursor")
  [void]$IDE_OPEN.Add("cursor `"$WORKSPACE_DIR`"")
}

if (Get-Command windsurf -ErrorAction SilentlyContinue) {
  [void]$IDE_NAMES.Add("Windsurf")
  [void]$IDE_OPEN.Add("windsurf `"$WORKSPACE_DIR`"")
}

$vscodePaths = @(
  "$env:LOCALAPPDATA\Programs\Microsoft VS Code\Code.exe",
  "C:\Program Files\Microsoft VS Code\Code.exe"
)
if ((Get-Command code -ErrorAction SilentlyContinue) -or ($vscodePaths | Where-Object { Test-Path $_ })) {
  [void]$IDE_NAMES.Add("VS Code")
  [void]$IDE_OPEN.Add("code `"$WORKSPACE_DIR`"")
}

# Warp for Windows
$warpPath = "$env:LOCALAPPDATA\Programs\Warp\Warp.exe"
if (Test-Path $warpPath) {
  [void]$IDE_NAMES.Add("Warp")
  [void]$IDE_OPEN.Add("& `"$warpPath`" `"$WORKSPACE_DIR`"")
}

# Always include PowerShell as fallback
[void]$IDE_NAMES.Add("PowerShell (stay here)")
[void]$IDE_OPEN.Add("")

for ($i = 0; $i -lt $IDE_NAMES.Count; $i++) {
  Write-Host "  $($i+1). $($IDE_NAMES[$i])"
}

Write-Host ""
$DEFAULT_N = $IDE_NAMES.Count
$IDE_INPUT = Read-Host "  Enter number (Enter for option $DEFAULT_N — PowerShell)"
if ([string]::IsNullOrWhiteSpace($IDE_INPUT)) { $IDE_INPUT = "$DEFAULT_N" }

$IDX = ([int]$IDE_INPUT) - 1
if ($IDX -lt 0 -or $IDX -ge $IDE_NAMES.Count) { $IDX = $IDE_NAMES.Count - 1 }

$IDE_NAME     = $IDE_NAMES[$IDX]
$IDE_OPEN_CMD = $IDE_OPEN[$IDX]

Write-Host ""
Write-Ok "Using: $IDE_NAME"
Write-Host ""
Write-Hr

# ── Step 1: Execution Policy ──────────────────────────────────────────────────
Write-Step "1/5" "PowerShell execution policy"

$policy = Get-ExecutionPolicy -Scope CurrentUser
if ($policy -eq "Restricted" -or $policy -eq "AllSigned") {
  Write-Warn "Policy is '$policy' — setting to RemoteSigned..."
  Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser -Force
}
Write-Ok "Execution policy: $(Get-ExecutionPolicy -Scope CurrentUser)"

# ── Step 2: winget ────────────────────────────────────────────────────────────
Write-Step "2/5" "winget (Windows Package Manager)"

if (-not (Get-Command winget -ErrorAction SilentlyContinue)) {
  Write-Host ""
  Write-Host "  winget is not available on your system." -ForegroundColor Yellow
  Write-Host "  Install 'App Installer' from the Microsoft Store:" -ForegroundColor Yellow
  Write-Host "    https://aka.ms/getwinget" -ForegroundColor White
  Write-Host ""
  Write-Host "  Or install prerequisites manually and re-run:" -ForegroundColor Yellow
  Write-Host "    Node.js : https://nodejs.org  (choose LTS)" -ForegroundColor White
  Write-Host "    Git     : https://git-scm.com/download/win" -ForegroundColor White
  Write-Host ""
  exit 1
}
Write-Ok "winget available"

# ── Step 3: Git + Node.js ─────────────────────────────────────────────────────
Write-Step "3/5" "Git + Node.js"

if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
  Write-Warn "Git not found — installing..."
  winget install -e --id Git.Git --accept-source-agreements --accept-package-agreements
  Update-SessionPath
}
Write-Ok "$(git --version)"

if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
  Write-Warn "Node.js not found — installing LTS..."
  winget install -e --id OpenJS.NodeJS.LTS --accept-source-agreements --accept-package-agreements
  Update-SessionPath
}
Write-Ok "Node $(node --version) - npm $(npm --version)"

# ── Step 4: Claude Code ───────────────────────────────────────────────────────
Write-Step "4/5" "Claude Code"

if (Get-Command claude -ErrorAction SilentlyContinue) {
  Write-Ok "Already installed"
} else {
  Write-Info "Installing via npm..."
  npm install -g @anthropic-ai/claude-code
  Update-SessionPath
  Write-Ok "Installed"
}

# ── Step 5: Workspace + AMM-SA Toolkit ───────────────────────────────────────
Write-Step "5/5" "Creating workspace + installing toolkit"

# Workspace structure
New-Item -ItemType Directory -Force -Path "$WORKSPACE_DIR\clients" | Out-Null
Write-Info "Created: $WORKSPACE_DIR\"
Write-Info "Created: $WORKSPACE_DIR\clients\"

# Clone or update
if (Test-Path $REPO_DIR) {
  Write-Warn "AMM-SA already exists — pulling latest..."
  git -C $REPO_DIR pull origin INT 2>$null
} else {
  Write-Info "Cloning AMM-SA toolkit..."
  git clone -b INT $REPO_URL $REPO_DIR
}
Write-Ok "Toolkit ready at $REPO_DIR"

# Workspace CLAUDE.md
$claudeMdPath = "$WORKSPACE_DIR\CLAUDE.md"
if (-not (Test-Path $claudeMdPath)) {
  @"
# $WORKSPACE_NAME — Agentic Workspace

## Layout
- ``AMM-SA/``   — toolkit: slash commands, workflows, SearchAtlas MCP
- ``clients/``  — one subfolder per client (e.g. ``clients/acme-roofing/``)

## Quick Start
1. Run ``/my-account`` — see your SearchAtlas account at a glance
2. Run ``/setup-integrations`` — connect HubSpot, ClickUp, Linear, and more
3. Run ``/onboard-client`` — guided setup for a new client
4. Run ``/help`` — full command list
"@ | Out-File -FilePath $claudeMdPath -Encoding utf8
  Write-Info "Created: $WORKSPACE_DIR\CLAUDE.md"
}

# Run setup.sh via Git Bash
if (Test-Path $GIT_BASH) {
  Write-Info "Running setup via Git Bash..."
  $unixDir = $REPO_DIR -replace "\\", "/" -replace "^([A-Za-z]):", { "/$($_.Value[0].ToString().ToLower())" }
  & $GIT_BASH -c "cd '$unixDir' && bash setup.sh"
} else {
  Write-Host ""
  Write-Warn "Git Bash not found at expected location."
  Write-Warn "Open Git Bash (search 'Git Bash' in Start) and run:"
  Write-Host "    cd '$REPO_DIR'" -ForegroundColor White
  Write-Host "    bash setup.sh" -ForegroundColor White
  Write-Host ""
  Write-Warn "Then continue from there."
}

# ── Done ─────────────────────────────────────────────────────────────────────
Write-Host ""
Write-Hr
Write-Host ""
Write-Host "  Your workspace is ready." -ForegroundColor White
Write-Host ""
Write-Host "  $WORKSPACE_DIR\"
Write-Host "  ├── AMM-SA\       <- toolkit (slash commands, workflows)"
Write-Host "  └── clients\      <- add one folder per client here"
Write-Host ""
Write-Hr
Write-Host ""

if (-not [string]::IsNullOrWhiteSpace($IDE_OPEN_CMD)) {
  Write-Host "  Opening $IDE_NAME at your workspace..."
  Invoke-Expression $IDE_OPEN_CMD
  Write-Host ""
  Write-Host "  In $IDE_NAME, open the integrated terminal and run:" -ForegroundColor White
  Write-Host ""
  Write-Host "    cd `"$WORKSPACE_DIR`"" -ForegroundColor Cyan
  Write-Host "    claude" -ForegroundColor Cyan
} else {
  Write-Host "  Run these two commands to start:" -ForegroundColor White
  Write-Host ""
  Write-Host "    cd `"$WORKSPACE_DIR`"" -ForegroundColor Cyan
  Write-Host "    claude" -ForegroundColor Cyan
}

Write-Host ""
Write-Host "  Claude Code will open in your workspace."
Write-Host "  Then type: /my-account"
Write-Host ""
Write-Hr
Write-Host ""
Write-Host "  Next: /setup-integrations inside Claude Code to connect"
Write-Host "  HubSpot, ClickUp, Linear, Notion, Slack, Gmail, GitHub."
Write-Host ""
