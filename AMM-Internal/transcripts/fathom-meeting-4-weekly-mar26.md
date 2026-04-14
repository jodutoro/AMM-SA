---
title: Agentic Marketing Mastermind Weekly Sessions
date: 2026-03-26
type: group session
duration: 61 mins
participants:
  - Matt Bailey (SA, host)
  - Justin Day (member)
  - Bryan Fikes (member)
  - Jonathan Duque / JD (SA support, screen shared)
url: https://fathom.video/share/mnkze6YhnESwmzAGZjk-ezYBL26DSSMX
screenshot: ../screenshots/meeting-4-weekly-session.png
---

# Agentic Marketing Mastermind — Weekly Session: Mar 26, 2026

**Date:** March 26, 2026 | **Duration:** 61 mins | **Type:** Group weekly session

## Participants
- **Matt Bailey** — SA host ("jeeva.ai is taking notes" visible in recording)
- **Justin Day** — Agency owner, Austin TX
- **Bryan Fikes** — Member (on the golf course calling in)
- **Jonathan Duque (JD)** — SA support, screen sharing file structure

## Action Items
- [ ] Post file-structure guide + skills/repos list in Circle; include Webflow import research + wishlist request — **Jonathan Duque** @ 7:26
- [ ] Confirm JD 1:1 cap; share booking link in Circle — **Matt Bailey** @ 56:43
- [ ] Post next-session prep checklist in Circle — **Matt Bailey** @ 59:05

## Screen Sharing
- Justin started screen sharing @ 6:10
- Jonathan started screen sharing @ 10:38 (file structure walkthrough)

---

## Context
Previous session had Monik presenting. Homework: build satellite sites and ensure main site is bulletproof (technical SEO). This session: check-in on homework progress, file structure deep-dive.

---

## Member Updates

### Bryan Fikes — Moved to Warp + Claude Code (Abandoning Website Studio)
Bryan completely switched from Website Studio to building sites in Warp/Claude Code as HTML/CSS. Result: **zero hiccups, life-changing.**

> *"I've done now two additional ones that are pretty large sites, and man, I haven't had one hiccup. I mean, it's been, I mean, a life-changing experience. I mean, this is like the next best thing to meeting Jesus. I mean, it's been incredible. Just so, yeah, just it's been very painless."*

Bryan is fully committed to Claude Code over Website Studio for larger/multi-page sites.

### Justin Day — Website Studio Working for Landing Pages (Screen Share @ 6:10)
Justin showed a location services landing page built with Website Studio — **only 3 prompts**, done. Light speed results. But unsure how to connect to the root domain for SEO purposes.

> *"I did three prompts and it was done... the concern I have is like, what's the next step? Connecting it to the root domain so that we leverage it from an SEO perspective."*

Also noticed: every time he goes back in, it has to "restore the project files."

**Key insight Justin shared:** Website Studio works well for landing pages for location services — not full multi-page sites. This approach works with high success rate.

### Bryan Fikes — Hub Site Issue (File Structure Root Cause)
Bryan was building a multi-page hub site with JD present. Issue: Claude kept saying it was pushing to Website Studio but it wasn't working. JD diagnosed: one of the files was dumping into the wrong core file — incorrect file structure, not a Claude or Website Studio bug.

> *"We realized that one of the files that it was dumping into wasn't the core file that it should be. And so that was my mistake."*

---

## File Structure Deep-Dive (JD Screen Share @ 10:38)

Matt and JD identified file structure as the #1 pain point group-wide. JD screen shared to walk through best practices.

### JD's Core Principles:
1. **Root directory** = the one master folder you created at setup. Stay there.
2. **For new projects:** `mkdir project-name` → `cd project-name` → open Claude → start working
3. **For quick tasks/checks:** Stay in root, trigger `claude --dangerously-skip-permissions`
4. **Never lose track of where you are** — check the folder path in terminal at all times
5. **File structure IS the reason Website Studio pushes fail** — wrong target directory

### Bryan's analogy:
> *"I had ChatGPT draw me up a diagram. I printed it out, put it as big as night and day on my wall. I do this exactly. Stop thinking like an SEO. Think more like a scientist."*

### Matt's takeaway:
> *"I'm willing to bet that there's a lot of guys that the problem that you diagnosed for me — when you have one-on-ones with them, you're going to find probably have some similar stuff going on."*

**JD confirmed:** He found similar issues in other 1-on-1s. File structure fix is the #1 diagnostic step.

### SA Platform Update (JD):
SA is implementing file structure and architecture directly in the Vault. Plan: a vault that includes infrastructure/architecture for your model, with per-project vaults and markdown files all linked and hosted on Search Atlas.

---

## Key Discussion: Thinking Like a Developer vs an SEO

**Matt** on the shift required:
> *"File structure in a prompt is not something I'm familiar with. So JD is going to be working on that to get out sort of a here's how it works, here's how to do it, but kind of align us a little bit."*

**Justin** — feedback loop automation:
> *"On when I do a session, I have that — do a deep dive — like I have the whole session log, go review on Claude, and then review it: What did I do wrong? What could have been better? What are the things to improve on? Review the file structure and the folder structure, make sure the integrity is still there. I have it send me a whole report so that I remember, and then I also add that into the memory to learn on the next one. So Claude continues to learn."*

**Justin** asked about SA MCP landing page best practices (24% opt-in rate from Monik's webinar):
- JD: Monik likely has those SOPs; SA has handicrafted MCP workflows/playbooks you can trigger directly from Claude Code. Ask Claude to "list your MCP workflows."

---

## Transcript (Key Moments)

**Matt Bailey:** All right, looks like everyone's starting to make their way in. How is everyone doing today?

**Justin Day:** Doing good.

**Bryan Fikes:** Terrible. We were up one and we just got down to one, so. [calling from golf course]

**Matt Bailey:** Are playing golf, Bryan? You're going to see me every Thursday.

**Bryan Fikes:** Hey man, tee time's important, man.

---

**Matt Bailey:** I wanted to check in. Going back two weeks ago — Monik was presenting and gave everyone a number of goals. Two specifically: one, build micro satellite sites. But first, make sure your site is bulletproof, running all of the technical side that needs to be taken care of. So if you've done that, please share it.

**Bryan Fikes:** I'll go. I had a lot of issues with Website Studio. But, you know, I know I mentioned it on Circle, but I did it just for the sake of completing the assignment. I had a lot of issues. I feel like I spent a good amount of time in Website Studio, and I don't know if it was user error, lack of prompting ability... But yeah, I had a lot of issues with Website Studio, so that's kind of how I stumbled upon going ahead and making the sites via Warp and Claude Code — just making them HTML, CSS. And yeah, I mean, I've done now two additional ones that are pretty large sites, and man, I haven't had one hiccup. I mean, it's been a life-changing experience. I mean, this is like the next best thing to meeting Jesus.

**Justin Day:** Yeah, I actually have had some pretty good success with Website Studio for landing pages for location services. Only three prompts, and it was done.

**Bryan Fikes:** And I had JD on with me yesterday trying to complete my hub site. It produced a phenomenal multi-page product. The problem is it just kept saying it was pushing to Website Studio — it wasn't working. So I'm going to get with JD when he has time to figure that out. But in terms of what MCP can do — he went through my configuration and realized that one of the files that it was dumping into wasn't the core file that it should be. And so that was my mistake.

**Matt Bailey:** File structure is an issue that a number of you have been asking about. I've been asking about it as well. So JD is going to be working on that to get out sort of a "here's how it works, here's how to do it" to kind of align us.

**Bryan Fikes:** Yeah, I had ChatGPT draw me up a diagram. I printed it out, put it as big as night and day on my wall. Stop thinking like an SEO. Think more like a scientist.

---

**JD (Jonathan Duque):** [screen sharing @ 10:38] So remember that from the very start, we asked you guys to create a folder where you were going to keep everything together. That folder is the root directory, and I strongly suggest you to stay there.

I'm not an agency, right? I do have a file structure that I consider to be helpful for you guys. But you need to translate this into your current state of things. Of course, some of you may have already a structure that's better than this, but I'm just going to show you the way I handle it.

---

**Justin Day:** In a way that I'm kind of automating that feedback to and that learning experience — to use AI to help me learn faster — is when I do a session, I have Claude do a deep dive on the whole session log. Review: what did I do wrong? What could have been better? What do I need to improve on? Review the file structure and the folder structure, make sure the integrity is still there and I didn't change anything. I have it send me a whole report so that I remember, and then I also add that into the memory to learn on the next one. So Claude continues to learn.

**Matt Bailey:** I like that a lot.

---

**Bryan Fikes:** JD, I'll tell you — when you showed me the 21st.dev and the other design repos — I went into the repository where you showed all the different styles of pre-made industry-specific templates. I mean, it took me five minutes to knock it out, and she was absolutely floored and loved it. And it was a five-minute project, and now my wife has free hair for a year. [beauty salon client]

**Matt Bailey:** That's awesome, man, because half the battle is figuring out what the design should look like. Having a quote-unquote cheat sheet is game-changing.

---

**Justin Day:** I know we're coming up to the hour here. Two things I want to share:

One — if you haven't done the sync thing [Syncthing], definitely set it up. Super important especially as you start working on projects and for your team — making sure everybody has access to the same files and everything is syncing in the same place.

Second — having an intake form that gets filled out with as much information on the business as possible (brand, content, services). We use a Google Form for it. Giving access to Warp to those Google files — where it can go in, reference that particular business by name, pull the data from it — man, the amount of time saved and improvement in the end product, because you're not giving surface-level stuff. You're giving it the nuts and bolts.

**Bryan Fikes:** And guys, I learned very quickly that Google Tag Manager and a lot of the other Google assets have individual MCPs for certain sections. In my intake process I'm developing, I'm going to force everyone to use Google Drive, and have them pre-set it up, because MCP loves pulling from Google Drive.

**JD:** Yeah, for some of these projects that we've been doing — for galleries, before and after pictures — you give access to Google Drive, and if there's new homes vs old homes, or however the galleries are segmented, you segment the Google Drive the same way. It literally goes into Google Drive, pulls all the pictures, uploads it — it's game-changing.

---

## Key Takeaways

1. **File structure = #1 root cause** of Website Studio push failures and lost work. JD's screen share covered the fix. SA is building vault-level architecture support.
2. **Justin's landing page workflow** — Website Studio + 3 prompts = done for location service pages. The key: use it for single/simple pages, not multi-page sites.
3. **Bryan fully switched to Warp/Claude Code HTML/CSS** — zero hiccups, calls it "life-changing" and "next best thing to meeting Jesus."
4. **Intake form + Google Drive access** — Justin's workflow: Google Form → Claude references live business data → dramatically better output quality and time savings.
5. **Justin's learning loop:** After each session → Claude reviews the session log → report on what went wrong → adds to memory. Claude learns and improves session-over-session.
