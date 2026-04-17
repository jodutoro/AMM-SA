# Setting Up Claude Code on Windows (via WSL)

> Common challenge for agency owners coming from non-developer backgrounds — the Windows setup for Claude Code is a multi-step process with networking gotchas that can derail the first hour.

## The Problem

Windows users hit several compounding friction points during their first Claude Code setup:

- Claude Code does not run natively on Windows — it requires WSL (Windows Subsystem for Linux).
- After WSL is installed, the WSL environment can inherit network permissions that block outbound HTTPS, producing SSL handshake failures (`exit code 35`) even though Chrome on Windows reaches the same endpoint fine.
- Warp's default shell must be switched to bash/Ubuntu, and the working directory must be re-pointed each session unless it is set in settings.
- The `claude --dangerously-skip-permissions` command has to be re-run every time a new terminal session opens — users often forget it is in their command history and re-type it.

The result: a 60-minute setup that should be 15 minutes, often requiring live support.

## Recommended Approach

### Step 1 — Install WSL (once)

From an elevated PowerShell:

```powershell
wsl --install -d Ubuntu
```

Reboot when prompted. On first launch Ubuntu will ask for a username and password; the password can be left blank for a personal machine.

### Step 2 — Set Warp defaults so you don't redo this every session

In Warp: **Settings → Features → Session**

- **Default shell for new sessions:** `bash`
- **Default working directory:** `Custom` → path of your project folder (e.g. `C:\sa-mcp` translated to `/mnt/c/sa-mcp` in WSL).

Avoid spaces in the folder name. Paths with spaces break bash commands later.

### Step 3 — Install Node, Claude Code, and run first OAuth

Inside an Ubuntu tab:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.bashrc
nvm install --lts
npm install -g @anthropic-ai/claude-code
claude --dangerously-skip-permissions
```

The last command triggers OAuth in your browser. Accept, return to the terminal, press Enter.

### Step 4 — Mirror Windows network permissions to WSL (the fix most people miss)

If your first MCP call fails with `fetch failed` or `SSL handshake error (exit code 35)` but `curl` to the same URL works from Windows Chrome, WSL is being network-isolated. Fix:

1. Create/edit `C:\Users\<you>\.wslconfig`:

```ini
[wsl2]
networkingMode=mirrored
firewall=false
dnsTunneling=true
autoProxy=true
```

2. From PowerShell (admin):

```powershell
wsl --shutdown
```

3. Reopen Warp → Ubuntu tab. Retest the MCP connection. The mirrored networking mode makes WSL use the same firewall/proxy posture as Windows itself.

### Step 5 — Bookmark the one command you'll use every morning

Every session starts the same way:

```bash
cd /path/to/your/project
claude --dangerously-skip-permissions
```

Pin this to your Warp "workflows" (the `@` menu) so you do not have to remember or retype it. Up-arrow also works if it is in history.

## Alternatives

- **If you don't need the file-system access that `--dangerously-skip-permissions` provides,** just run `claude` and answer the permission prompts per-session. Slower, safer.
- **If your agency runs on Macs,** skip all of the above and install the Claude Code macOS binary directly. WSL is a Windows-only concern.
- **If you want the one-file reference that mirrors this on your Windows machine,** ask Claude Code itself to translate a Mac-oriented setup doc to Windows equivalents and render an HTML checklist — it can read a text file you drop into the current folder and output a click-through page.

## Related Resources

- [Claude Code installation docs](https://docs.anthropic.com/en/docs/claude-code/setup)
- [WSL networking modes (Microsoft)](https://learn.microsoft.com/en-us/windows/wsl/wsl-config#wsl-2-settings)
- [Warp documentation](https://docs.warp.dev/)
