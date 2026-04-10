---
title: Agentic Marketing Mastermind - Set-up (Justin Day 1-on-1)
date: 2026-03-16
type: 1-on-1 setup
duration: 29 mins
participants:
  - Justin Day (member, agency owner, Austin TX, Windows)
  - Ismar Costa - SA (Search Atlas support)
  - Matt Bailey (SA)
url: https://fathom.video/share/yY4yi7ZxAfoyczmzeyCGPTVsfx-ybQxN
screenshot: ../screenshots/meeting-1-justin-setup-mar16.png
---

# Agentic Marketing Mastermind — Set-up: Justin Day 1-on-1

**Date:** March 16, 2026 | **Duration:** 29 mins | **Type:** 1-on-1 setup session

## Participants
- **Justin Day** — Agency owner, Austin TX, Windows machine, 3–4 years SA user
- **Ismar Costa - SA** — SA support, running setup
- **Matt Bailey** — SA, listening in

## Action Items
- [ ] **Rebuild setup script; send to Justin** — Ismar Costa - SA (@ 4:43)

## Screen Sharing
- Justin started screen sharing @ 0:10

## Member Background
- SA user for 3–4 years; most of his agency fulfillment is Search Atlas but done by humans clicking buttons
- Wants to automate the entire workflow end-to-end
- Client communication via **email** (not Slack/ClickUp — keeps inbox clean)
- Previously on ChatGPT, has a lot of history there; worried about losing context when switching to Claude
- On Windows (important — caused bash issues throughout session)

---

## Transcript

**Justin Day:** Hey there.

**Ismar Costa - SA:** Hey there. All good?

**Justin Day:** Should be good.

**Ismar Costa - SA:** Nice. Run that warp terminal again, and let's proceed.

*[SCREEN SHARING — Justin started screen sharing @ 0:10]*

**Ismar Costa - SA:** All right. So you see on the top right, you have a drop down arrow, not on the top left, sorry. Yeah. Click on bash.exe. There we go. Now you are running on bash. So we shouldn't have more problems. Here, let's just install the git package. So let me send you the commands. Try running these commands.

**Justin Day:** Do you want me to run this other one?

**Ismar Costa - SA:** Yeah, you can run it. Then you can run this one.

**Justin Day:** Do you want me to do either of those, do you want me to just run what you just sent over?

**Ismar Costa - SA:** Let's run a different command. Instead of sudo, so you don't have to install it. Use per instead.

**Justin Day:** So this other one, or are you writing one out?

**Ismar Costa - SA:** No, I'm sending you a new script for this.

**Justin Day:** Oh, okay.

*[ACTION ITEM — Rebuild setup script; send to Justin]*

**Ismar Costa - SA:** Let's do this instead — while I'm rebuilding the script, open a new tab, and you need to open it as admin, so can you right click on the Warp icon on the bottom, yeah right click on Warp — the first item that showed up on the list — run as administrator. All right, now try running the sudo command again. Should be fine on windows. No, it's not working either. Okay. All right, now open a new one with the drop arrow on the top left.

So we can do something parallel — open the bash. Yeah. Let me see if you have Perl installed, so we can do it instead with it. Run this command I sent you on the chat, the last one. Okay, perfect. You already have it. So let's proceed with the installation using curl. Let me just check if the npm or the nodes. Yes. It was correctly installed, run this command as well. Okay, that's great. Now let's install Claude and run this one.

Nice, now press the arrow key up, that should give you the last command again, until you go to the Anthropic one — so one more time, no, below that, yes, this one, press enter.

**Ismar Costa - SA:** Let me check one thing, run this command as well. All right, let's ignore the funding part and run this command to set it to false, and let's proceed with the regular installation. Okay, now run this, let's see if it works or if we need to run it again. Okay, perfect. Now, let's actually run Claude Code. Is Claude already authenticated in your browser?

**Justin Day:** Yes, I believe so.

**Ismar Costa - SA:** You can run this command on the terminal. And always — have you used Claude Code before?

**Justin Day:** No, not at all.

**Ismar Costa - SA:** All right. So every time you open a new window or a new terminal, you need to open Claude in there. I suggest you open using this command I shared with you, because otherwise it's going to ask you a bunch of technical confirmations that you might not know how to answer. So just run `claude --dangerously-skip-permissions`, because this way it will always bypass these questions.

I've sent you a new command — yeah there you go — so press enter so you can go through with the dark mode, select this one, the first one, and that will open your browser so you can authenticate.

**Justin Day:** Is it this folder or are we going, is it the folder I set up?

**Ismar Costa - SA:** It's okay, you can click on "Yes, I trust this folder." It's just so we can confirm it's installed. Yes, I accept. Right, nice. So we are in and already authenticated. The next step is to install the Search Atlas MCP. Do you already have a folder you want to use for this? Whenever you're running projects, it's important to have a specific folder dedicated for that.

**Justin Day:** Yeah.

**Ismar Costa - SA:** Do you know the path of this folder?

**Justin Day:** What's the best way to get the path?

**Ismar Costa - SA:** You can open it. Then click on the navigation bar, copy address as text. Yeah — so go back to the Claude Code terminal, type `/exit`... Because this is important: whenever you run a Claude Code terminal, you're running it inside the folder that you are selected in Warp. So right now you are in the Warp default location. Let's go back to the root and navigate to your folder. Type `cd` — no, just `cd` space.

Let me give you the full command. Just `cd`, space. Now paste the path. Now go back to the C and delete the column. On the folder path — also delete that. Is there a space there?

**Justin Day:** There is a space.

**Ismar Costa - SA:** Delete the SA as well. Press Enter. Let's do it manually. It's in users, viral, desktop. Okay so delete all the path, now go `cd`, space, dot dot, enter. You can, now you are at C/users. What was the path again? It's viral after that? Yeah. Okay, so erase everything, just keep `cd`, space, viral.

We are navigating through the terminal to your folders. That's what we're doing.

**Justin Day:** Yeah.

**Ismar Costa - SA:** What was the next folder?

**Justin Day:** Desktop.

**Ismar Costa - SA:** Desktop, so `cd Desktop`. Now type `ls`, enter. It's going to list how the folders are written in there. Copy that. Now type `cd`, space, and enter. We are in. Do you see at the bottom, it's saying that you're in this folder?

So now you can run that `claude --dangerously-skip-permissions` again. When you see that alien pixel, you're in — there you go.

So, one important thing: do you see that below that orange alien, you're seeing Sonnet 4.6? This is one of the three models that you have on Claude Code. If you type `/model`, enter, you will see the options. You have Sonnet, Opus, and Haiku. Opus burns through tokens really fast, so you need to be mindful when using that. It's best for when you are laying out a plan. But if you are executing a plan, or a not-as-complex task, you always use Sonnet. And if you're doing your day-to-day quick things that you know are not complex at all, you change to Haiku. This way you're going to optimize your usage bucket.

Okay, let's keep for this session on Sonnet, and by default you should use it as well. So press enter to confirm, and now type "clone this repo" and paste this link.

When you are inside Claude, you don't need to use slash anymore, it's just natural conversation. So "clone this repo" and paste this link.

Okay, now let's see if it's working with just this repository. So ask it to use your new MCP to list your projects on your account. You might need to reset the terminal because it's going to add the new MCP server. Your API key — you're going to find that inside the Search Atlas dashboard. Go to API keys, last one, copy this. And on the terminal, ask it to "add this key to my .env file."

**Justin Day:** That?

**Ismar Costa - SA:** Env. E-N-V. N as in nation.

**Justin Day:** Oh, N? E-M-N file.

**Ismar Costa - SA:** No, you can remove the M, it's E-N-V. Nice. Hit enter.

**Justin Day:** I'll be right back, I've got to do something.

**Ismar Costa - SA:** Okay. Can you confirm it listed correctly?

**Justin Day:** Yeah.

**Ismar Costa - SA:** All right, so you are set up for the session. You have the MCP connected, Claude Code and Warp, everything is working. Do you have any questions? Actually, let's do one thing — let's set up your Warp to always use Bash so you don't need to worry about this when you're opening a new tab.

Click on your profile picture on the top right. Find settings. Click on features on the left. Scroll down to session. Click on the default shell for new sessions. Click the first one that works, and select Bash.

**Justin Day:** Okay.

**Ismar Costa - SA:** Yeah, there you go. Now any new tab that you open, you will open straight on Bash, and Bash is where you need to trigger Claude Code.

Awesome. So quick check — always check the folder you're at. And then if you need to navigate, `cd ..` goes back one folder, `ls` lists the folders on the directory you're at, and `cd folder-name` takes you in.

What I suggest is whenever you're trying to build something inside this SAMM folder, you type `mkdir folder-name` — this will create a new folder — and then `cd folder-name` to go to that folder, open Claude, and start working on the project. This is only when you're actually building something. If you just want to do a quick check, go to the SAMM and trigger `claude --dangerously-skip-permissions` and you're good to go.

**Justin Day:** Got it. And so for creating a new project, I'd run this to create a new folder that would be for that project specifically.

**Ismar Costa - SA:** You just replace "folder name" with the name you want.

**Justin Day:** Okay. Great.

**Ismar Costa - SA:** Then yeah, you're ready for the session.

**Justin Day:** Do you have any questions? No, that all does it. I appreciate the help.

**Ismar Costa - SA:** Perfect. Just on time as well. So I'll see you on the session.

**Justin Day:** All right. Thank you. Looking forward to it.

**Ismar Costa - SA:** All right. Take care. Bye-bye.

**Matt Bailey:** All right. Thanks a lot, guys.

**Justin Day:** Thanks, Matt. Appreciate it.

---

## Key Takeaways

1. **Windows setup is hard** — bash.exe workaround, sudo doesn't work, Perl/curl workaround for Claude install. Ismar needs to rebuild the Windows setup script.
2. **Justin's automation goal** — 3–4 years SA user who wants to automate the human button-clicking his agency does. Email-first communication.
3. **Model tier guidance Ismar gave Justin:** Haiku = quick daily tasks, Sonnet = execution default, Opus = planning only (expensive).

## Screen Share Insights
- Justin on Windows Surface, using Warp terminal
- Had bash.exe vs PowerShell confusion
- File path navigation issue — spaces in folder names caused CLI issues
- Successfully got SA MCP connected and listed projects by end of session
