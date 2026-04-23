# Agentic Marketing Mastermind — Windows Quick Start
# Installs all prerequisites and sets up the toolkit in one run.
#
# Usage — run in PowerShell as Administrator (Win + X -> Terminal (Admin)):
#   irm https://raw.githubusercontent.com/jodutoro/AMM-SA/INT/scripts/quickstart-windows.ps1 | iex

$ErrorActionPreference = "Stop"

$REPO_URL = "https://github.com/jodutoro/AMM-SA.git"
$REPO_DIR = "$HOME\AMM-SA"
$GIT_BASH  = "C:\Program Files\Git\bin\bash.exe"

function Write-Ok($msg)   { Write-Host "  [OK] $msg" -ForegroundColor Green }
function Write-Step($n, $msg) { Write-Host "`n  [$n] $msg" -ForegroundColor Cyan }
function Write-Warn($msg) { Write-Host "  [!]  $msg" -ForegroundColor Yellow }
function Write-Fail($msg) { Write-Host "  [X]  $msg" -ForegroundColor Red; exit 1 }

function Update-SessionPath {
  $env:Path = [System.Environment]::GetEnvironmentVariable("Path", "Machine") + ";" +
              [System.Environment]::GetEnvironmentVariable("Path", "User")
}

Clear-Host
Write-Host ""
Write-Host "  +--------------------------------------------------+"
Write-Host "  |  Agentic Marketing Mastermind -- Windows Setup  |"
Write-Host "  +--------------------------------------------------+"
Write-Host ""

# ── Step 1: Execution Policy ─────────────────────────────────────────────────
Write-Step "1/6" "PowerShell execution policy"

$policy = Get-ExecutionPolicy -Scope CurrentUser
if ($policy -eq "Restricted" -or $policy -eq "AllSigned") {
  Write-Warn "Execution policy is '$policy' — setting to RemoteSigned..."
  Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser -Force
}
Write-Ok "Execution policy: $(Get-ExecutionPolicy -Scope CurrentUser)"

# ── Step 2: winget ────────────────────────────────────────────────────────────
Write-Step "2/6" "winget (Windows Package Manager)"

if (-not (Get-Command winget -ErrorAction SilentlyContinue)) {
  Write-Host ""
  Write-Host "  winget is not available on your system." -ForegroundColor Yellow
  Write-Host "  Install 'App Installer' from the Microsoft Store, then re-run:" -ForegroundColor Yellow
  Write-Host "    https://aka.ms/getwinget" -ForegroundColor White
  Write-Host ""
  Write-Host "  Or install prerequisites manually:" -ForegroundColor Yellow
  Write-Host "    Node.js : https://nodejs.org  (choose LTS)" -ForegroundColor White
  Write-Host "    Git     : https://git-scm.com/download/win" -ForegroundColor White
  Write-Host ""
  Write-Host "  Then re-run this script." -ForegroundColor Yellow
  exit 1
}
Write-Ok "winget available"

# ── Step 3: Git ───────────────────────────────────────────────────────────────
Write-Step "3/6" "Git"

if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
  Write-Warn "Git not found — installing via winget..."
  winget install -e --id Git.Git --accept-source-agreements --accept-package-agreements
  Update-SessionPath
}
Write-Ok "$(git --version)"

# ── Step 4: Node.js + npm ────────────────────────────────────────────────────
Write-Step "4/6" "Node.js + npm"

if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
  Write-Warn "Node.js not found — installing LTS via winget..."
  winget install -e --id OpenJS.NodeJS.LTS --accept-source-agreements --accept-package-agreements
  Update-SessionPath
}
Write-Ok "Node $(node --version) - npm $(npm --version)"

# ── Step 5: Claude Code CLI ──────────────────────────────────────────────────
Write-Step "5/6" "Claude Code"

if (-not (Get-Command claude -ErrorAction SilentlyContinue)) {
  Write-Host ""
  Write-Host "  Claude Code is not installed yet." -ForegroundColor Yellow
  Write-Host ""
  Write-Host "  Download and install it from: https://claude.ai/code" -ForegroundColor White
  Write-Host "  Then re-run this script." -ForegroundColor Yellow
  Write-Host ""
  exit 0
}
Write-Ok "Claude Code ready"

# ── Step 6: Clone + Setup ────────────────────────────────────────────────────
Write-Step "6/6" "AMM-SA toolkit"

if (Test-Path $REPO_DIR) {
  Write-Warn "Repo already exists — pulling latest..."
  git -C $REPO_DIR pull origin INT 2>$null
} else {
  Write-Host "  Cloning into $REPO_DIR ..."
  git clone -b INT $REPO_URL $REPO_DIR
}

# Run bash setup in Git Bash
if (Test-Path $GIT_BASH) {
  Write-Host "  Running setup in Git Bash..."
  $unixDir = $REPO_DIR -replace "\\", "/" -replace "^([A-Za-z]):", { "/$($_.Value[0].ToString().ToLower())" }
  & $GIT_BASH -c "cd '$unixDir' && bash setup.sh"
} else {
  Write-Host ""
  Write-Warn "Git Bash not found at expected location."
  Write-Warn "Open Git Bash manually (search 'Git Bash' in Start) and run:"
  Write-Host "    cd '$REPO_DIR'" -ForegroundColor White
  Write-Host "    bash setup.sh" -ForegroundColor White
  exit 0
}

Write-Host ""
Write-Host "  +--------------------------------------------------+"
Write-Host "  |             Setup complete!                     |"
Write-Host "  +--------------------------------------------------+"
Write-Host ""
Write-Host "  Open Claude Code, navigate to: $REPO_DIR"
Write-Host "  Then try: /my-account"
Write-Host ""
