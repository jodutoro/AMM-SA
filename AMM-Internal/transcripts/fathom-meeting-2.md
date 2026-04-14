---
date: 2026-04-09
title: Agentic Marketing Mastermind Weekly Sessions
meeting_type: group
duration: 83 minutes
participants:
  - Matt Bailey (Search Atlas / AMM host)
  - Jonathan Duque (JD, Search Atlas / AMM coach — moving to full-time Mastermind)
  - Justin Day (agency owner)
  - Clayton Joyner (agency owner)
  - Bryan Fikes (agency owner)
  - Michael Vassar (agency owner, Digital Coast Marketing)
  - Jonathan Giner (agency owner)
  - Justin Hual (agency owner, healthcare — 127 employees, 2 brands, ~500 customers)
  - Jay Cornelius (agency owner)
  - Noah (recent addition, Justin Hual's colleague)
fathom_url: https://fathom.video/share/p1sTWbE4Lckgce2SFEGGzsx44ffawmwD
source: Playwright browser snapshot (.playwright-mcp/page-2026-04-09T19-12-46-945Z.yml)
---

## Summary

**What was covered:**
- Member check-ins: wins and blockers with Claude Code + Search Atlas MCP
- Preview of Monday's session with Monik: 4-playbook comprehensive visibility audit workflow (SEO, content, paid search, AI visibility) run on a real client (Roto-Rooter / LinkGraph)
- Setup checklist review — JD flagging who still needs file structure + MCP connections
- Design/UI inconsistency problem discussed: Website Studio doesn't accept injected HTML, causing design quality gaps
- Clayton Joyner full screen-share: detailed Lucidchart-based web production system + live quoting calculator app demo
- Justin Hual: HIPAA-compliant MCP authorization layer challenge; noted Search Atlas GitHub docs are incomplete/missing schemas
- JD announcement: moving to full-time Mastermind coaching role
- In-person meetup vote: San Francisco vs Vegas (May, internal debate)
- Request for weekly homework/challenges — Matt confirmed it's in the works, Armand to be more involved
- JD to post setup checklist to Circle and share calendar for 1-on-1s

---

## Key Wins

- **Justin Day** built a fully automated command center: bank, credit cards, ClickUp, Slack, Gmail all connected; client onboarding is 100% end-to-end automated with hooks. Uploaded Alex Hormozi's $100M Leads/Offers/Money Models as modules to grade his own business in real time. Dashboard built in Supabase with user permissions for sharing with team.
- **Michael Vassar** built an HTML client kickoff report with the Atlas Brain MCP — fast output, client was happy.
- **Bryan Fikes** launched mftfinder.com — a marriage family therapist directory built with Claude, pulling from a therapist database, already live.
- **Clayton Joyner** (major demo):
  - Built a Lucidchart-based web production system: page hierarchy (core, service, CMS, compliance), design interview → copy → theme → wireframe → build pipeline, parallel processing model, 93% reduction in client revisions by nailing the theme stage first.
  - Built a quoting calculator SaaS app (in ~1 week) for the home services industry: 3-tier access (platform admin / reseller / user), material + labor + permitting indexes for all 50 states, lead magnet calculators with embed/QR code, GoHighLevel + HubSpot native integrations, white-labeled per brand, onboarding wizard in progress. $9/month reseller model.
  - Also building a Star Wars RPG character sheet app for fun/learning, using Claude Code with GitHub + Vercel + Supabase OAuth.
- **Justin Hual** deployed Anthropic's newly released managed agents infrastructure with existing skills — noted it was "super easy" vs. past attempts.

---

## Blockers / Struggles

- **Website Studio design quality**: MCP-generated sites have inconsistent design vs. locally built Claude output. JD flagged this to the team; proposed allowing members to inject pre-built HTML/zip as a workaround pending backend fix.
- **Search Atlas GitHub MCP docs incomplete**: Justin Hual's team found missing schemas and incomplete tool documentation, causing LLM confusion. They built their own schema docs. JD to coordinate with Maddy to update the repo. Pull requests from members welcomed.
- **HIPAA compliance + multi-brand auth**: Justin Hual's agency needed a custom auth layer on top of the Search Atlas MCP to segment two brands and comply with HIPAA. Multi-brand MCP routing (two separate SA accounts) is a gap.
- **Michael Vassar**: Stuck at 6 auto-sites for over a week (account: gbp.digitalcoastmarketing.com). JD to resolve directly — bypassing support queue for AMM members.
- **Michael Vassar**: Has not yet completed the setup checklist / file structure. Scheduled 1:1 with JD for tomorrow.
- **Clayton Joyner**: Mic audio issues throughout call (Zoom settings conflicting).
- **Clayton Joyner**: Design-first vs. copy-first chicken-and-egg problem — wireframes get built before copy exists, then layout has to be rethought. Sees this as the key unsolved gap in his production system.
- **Group-wide**: No weekly homework/challenges yet — Justin Day formally requested it; Matt confirmed it's coming with Armand's involvement.

---

## Screen Sharing Moments

### Matt Bailey — Screen share @ 18:21 (timestamp in recording)
Matt shared a multi-page SEO + visibility audit document built with 4 agent playbooks on a Roto-Rooter site (LinkGraph client). Visible in screen share:
- Comprehensive audit with: upfront strategy, revenue opportunity map, ROI projections, action plan
- Technical audit, content audit, paid search audit all merged into one client-ready document
- Quick wins table: keyword opportunities with current position, cost-per-click, difficulty scores
- Content production pipeline with phased automation plan
- AI visibility and LLM visibility metrics section
- Deep SEO blog post analysis (cannibalization, topical gaps)
- Proposed mini-sites section
- 4 playbooks: SEO/visibility audit, content audit, paid search audit, AI visibility
- Format: multi-page HTML report

**Context:** This is what Monday's session with Monik will replicate for each AMM member's client.

### Clayton Joyner — Screen share @ 44:37 (timestamp in recording)
Clayton shared his Lucidchart-based client journey and web production system:
- **Client journey map**: Full visual from onboarding → copy → theme → wireframe → page-by-page design → QA → GBP audit → redirect plan → NAP/citation work
- **Page hierarchy framework**: Core pages (about, homepage, contact) / Service/inner pages (parent-child) / Compliance pages / CMS/collection pages
- **Design category system**: Medical/Professional, Playful, Luxury/Red Carpet, High Fashion — each with predetermined component libraries and stock photo direction
- **Global design decisions**: CTA styling, header/nav/footer elements, global widgets, theme variables (colors, fonts, logo variants — light/dark/vertical/horizontal)
- **Approval gates**: Human-in-the-loop checkpoints at theme, homepage, collection pages, core pages
- **Production workflow spreadsheet**: Page-by-page content matrix → copy → design layer → QA → redirect plan, all parallelized
- **Quoting calculator live demo**: Platform admin view, reseller account, sample company with working calculator (roofing example), zip code material lookup, financing options, embed code, QR code generator, ClickUp project management integration in progress

**Key insight from Clayton**: Doing copy before design eliminates 90% of revision cycles. Theme approval stage is where all client feedback concentrates. Getting that right = minimal revisions throughout.

---

## Full Transcript

**Matt Bailey:** Hello, everybody. I just did a Google Meet, and it messed up all my microphones. So, and my speakers. Someone say something, so I know my speakers are working.

**Justin Day:** Matt, you are the sexiest guy in this group.

**Matt Bailey:** And they're not working yet.

**Justin Day:** I was just going to say it. I resign.

**Matt Bailey:** There we go. [...] The other thing about switching between all of these meeting softwares, it just... Let's just change all the settings from one to the next. Everyone's getting in here. Good, good. How's everyone doing today?

**Justin Day:** I'll tell you in about two hours.

**Jonathan Duque:** What hole are you in right now?

**Bryan Fikes:** I haven't teed off yet. I've moved myself to the 10:40 group so I can concentrate on this whole thing. So I got a concession finally from the group.

**Matt Bailey:** Ah, wow, Brian. Appreciate that. Appreciate that. Awesome.

**Michael Vassar:** I haven't been on.

**Matt Bailey:** All right, Mike, is Alex going to join us today?

**Michael Vassar:** You know, we can go ahead and start. I certainly hope so, but let's not hold anybody up.

**Matt Bailey:** All right. All right. Well, let's start out. First thing, I want to know, what have you been working on? What are some wins that you have experienced with the platform? I know we're still doing some, you know, working out some more of the details of setups and structures, but if you've been working in Claude and MCP and have been creating anything, first of all, yeah, let's take a look at what you've done, and then we'll look at, you know, what are some of the obstacles you're fighting with?

**Bryan Fikes:** Let's see. I'll go. Go ahead.

**Michael Vassar:** Go ahead, man.

**Bryan Fikes:** Just a brief one. I have had some issues integrating with Website Studio, but my implementer, Farhan, and I know JD are working hard, so I'll be interested to see how fast. I can go once that's done, because I've, this thing is just incredible, guys, and I think, I think we're all kind of realizing, if you've already been doing this stuff, obviously you're ahead of us, and, but man, this is, this is amazing. When we're all creators and agency people and entrepreneurial and business-minded, God, we can do so much with this.

**Matt Bailey:** All right, yeah, we know Brian's out.

**Michael Vassar:** Brian, what do you mean by you're an implementer?

**Bryan Fikes:** When I signed up for the pro, and I did the annual, one of the things that I asked for, and they gave, is that we got 10 hours when you bought the annual pro, and so a part of that 10 hours is we got a specific implementer to work with. So from February on, I've had that individual, and then obviously with JD and this group with the AMM, you know, you combine those resources, and it's, it's allowed me to probably move a little faster than some.

**Michael Vassar:** Gotcha. Cool.

**Matt Bailey:** Anyone else? Since we've had some setups, I know we've kind of worked with some people to get file structures in place. What have you been able to run so far? What are you trying to run?

**Michael Vassar:** I have not tried to build a website, but yesterday I taxed Atlas Brain a little too hard. So I actually built an HTML report that I used for a client and did it. It was fast and it looked good. And it was their kickoff report and they were really happy. So that's the only thing I've done, but, you know, it was exciting. And I look forward to doing everything that way soon enough.

**Matt Bailey:** Absolutely. Yeah. It's, it's, it's, I was trying to explain, actually, was trying to explain. My wife this morning, it's like you've got CloudCode, then you've got the Search Atlas MCP, and then you have these skills, these designs, and all these like layers of things on top of it that, yeah, you're not getting when you're in the main interface. So working through command line, it's like you've got all these extra resources on it. And it's just at this point, yeah, you're just limited by what can I do with it. So, yeah, Michael, I started out the same thing with a report, and just seeing how I can use that, modify it, and then just now, yeah, then just start thinking how else does this work into everything else.

**Michael Vassar:** I think I've got a little pro bono project I'm going to pick up, and I think that might actually be the first site that I build with Claude, since I've got basically no pressure there.

**Matt Bailey:** That's the way to do it, yeah. A friend of mine, he's had a business for 20 years, but no website, so I'm doing the same thing. No pressure. Anyone else? What do you got going on?

**Justin Day:** Yeah, I just spent most of my time, a lot of my time, just building out my command center, like tying in my bank, my credit cards, my operations from ClickUp, my Slack, my Gmail to create an executive assistant. And like, I've tied in everything into my command center so that when I build for my clients as well as myself internally, it comes from a source of truth that has everything in mind. I even uploaded, I created like three separate modules for Alex Hermosi's, you know, the $100 million leads, $100 million offers, $100 million money models, created different modules based off of those books. I uploaded a PDF, had it create modules to grade where I'm at with my offers, leads, and everything in between in real time so that it could help coach me to scale the business even better in blind spots that I'm not thinking about. So I believe I'm next to finish on that, and I know that we've got our... Call on Monday with Monic, and I believe the task is to get, obviously, the satellite and the website and all that other stuff done, which now I can do, that I have all the correct information. But I've just been obsessed with creating that command center. I just keep finding more and more stuff to put in. But now that I've got, like, all of my revenue and overhead and everything, I've literally got an agentic brain for my company now that does a lot. So it's pretty crazy.

**Matt Bailey:** That is amazing. How have you integrated some of these things? I mean, just, you know, what are you looking at from the command center, and how do you see that rolling into a lot of your client work?

**Justin Day:** Well, so being able to take the best practices of what others have out there, you know, like Alex Ramosi, it just puts it in writing, right, and then leveraging that data to match it up to what current clients are doing. So what I have, I set up this, my system so that anytime I add a new project. It goes through an onboarding process to then create all the project files and then grades them based off of where they're at in their business on that onboarding call. I take the onboarding call transcript, putting in there, it then fills out all that corresponding information so that I can see the visibility gaps and what makes sense for the client based off of where they're actually at. So it's like doing all the research based off of our methodology just in real time.

**Matt Bailey:** Amazing. Amazing. Fantastic. Is all that automated? Are you stringing all those processes together yet or is it still just sort of a...

**Justin Day:** 100% automated end to end with the hooks and everything like that.

**Matt Bailey:** Yeah. Fantastic. Justin, that's amazing. Fantastic. Who else? I've been plugging away at an app. Yeah, Clayton.

**Clayton Joyner:** So... you. It, it, I don't know how to do anything simple. I should have gone for an MVP, and I think, uh, MVP for me means, like, maximum.

**Michael Vassar:** Kiss your microphone!

**Clayton Joyner:** What's that? It's, we can't, I can't really hear you.

**Matt Bailey:** Can y'all hear him?

**Jonathan Duque:** All right, quit.

**Clayton Joyner:** Never mind.

**Matt Bailey:** We gotta hear you clean. We gotta, we gotta come back to that.

**Jonathan Duque:** I we're gonna end. I know that Noah is one of our recent, uh, additions to the group, so maybe, would you like to share? I, I mean, I met yesterday, cave, I believe, and so we, we were discussing kind of a, so. Stuff that you guys have come up with, but I wonder if you have any particular needs right now, and what do you want to get accomplished?

**Justin Hual:** Yeah, I can touch on that. Yeah, we're still working. We have, we're trying to like create an MCP layer at our agency, because we have 127 employees, two brands, and around 500 customers, and so we're trying to do it all. But like, we work in healthcare, so we have to kind of be careful with HIPAA, and where and how we source data, and then how people actually get. So we've had to build a whole authorization layer to make sure all that stays secure. So that's what we've currently been working on outside of just like some, we have like an RST team with a cloud plugin that we use for repetitive work and things like that. Um, and so we're, we're kind of like in the early stages of trying to figure. Figure out how to deploy AI across the whole agency, outside of just a few key people that actually use it. There's just a handful of us that do, like Noah does, I do, my co-founder Luke does, but there's a lot of people that don't. So we're trying to start leveraging that and then just have stuff, like I sled up, like Anthropic launched their managed agents infrastructure yesterday. And so took some of our skills last night and deployed it there just to see how that would work, what interfaces it would work with and stuff like that. So that's been kind of cool because it was like super easy to actually do versus in the past it hasn't. So, yeah, but right now we're still trying to get a wrangle around all of our data. And then how can a common person interact with the data in a digestible way is kind of where we're currently at. But we're testing a lot of stuff. We're launching a product to build AI websites, for instance, at an event May 1st. And so we're trying to polish all that and make sure it's good. And then, and things like that, so, but yeah, we're, we're excited to dig into some of this stuff and then kind of create something similar for our team members on like, how do they get onto, um, co-work or cloud code and use it where it's not scary, you know, because they're all non-technical people.

**Matt Bailey:** I think the key to the right, where it's not scary, I get that.

**Justin Hual:** Yeah, because it can be daunting, for sure.

**Jonathan Duque:** And, and to, to piggyback on what you're saying, maybe, um, me rephrase that. I know that Justin has built a dashboard kind of, uh, so, and that's probably what you're referring to earlier as your command center, right? Where you can, like, manage the files and so on and so forth. So, I was wondering if that includes as well, like, an interface that you can share with your team. Yeah. and like, like a front-end type of interface.

**Justin Day:** Yeah, absolutely. So I connected it to Supabase and be able to, like, add users in real time. And I haven't pushed it online yet for that. It's local. But, yeah, the whole purpose of that is to give that user interface and experience, right, is to share all this information in one place versus, like, living in the warp channel. I think that can be scary for people. But, yeah, it's pretty easy to just add people and make that, like, create your own command center and create user permissions, right, so that they can see what they need to see.

**Jonathan Duque:** That's awesome. Yeah, I'll leave it to you, Matt. But it's bringing me a lot of ideas on how we can support that or help you. Guarantee that you have everything that Search Atlas has to add to your workflow because it seems, I mean, the long run, what you guys are doing is bigger than just, right? What we have to offer on the Search Atlas. But it's also a crucial key to at least SEO piece. So making sure that you guys have the proper bridges to our MCPA connections, it's our main priority right now. But very interested in seeing that too.

**Justin Hual:** Yeah, for sure. Are y'all gonna, like, because we, we had to put an authentication layer in between even the Search Atlas MCP, because we have two brands, and so the users have to be on one brand or the other, which is two separate Search Atlas accounts.

> **ACTION ITEM:** Coordinate w/ Maddy to update MCP GitHub docs w/ schemas/missing tools

**Justin Hual (cont.):** But going through the MCP docs, they're not up to date. If we do anything, do y'all want us to submit, like, a pull request to update those as we go through them?

**Jonathan Duque:** So my two cents here are the MCP connections directly taking place through your API. Key, right? So my guess is that you've already added both of them, or did you're only adding one, and you would want it to switch automatically based on who's using it, or like how are you-

**Justin Hual:** I was just asking the on GitHub, that MCP GitHub repository, the documentation doesn't fully cover all the tools available when we went through it and tested each one, and then there weren't schemas built out for each. To what to expect, so the LLMs kept getting confused, and so we built some of that stuff out on our side already. Can, do y'all, if we do things like that, do you want us to submit like a pull request in a repository, so that can be updated, or?

**Jonathan Duque:** I can definitely chip in with Maddy, because it's the one like actually built into the repo, but that makes perfect sense, because essentially you're the ones who are reusing it, right? So that, you know, that aligns what we want you to be able to accomplish with that. technology. I just want to make sure that he's, you know, that is on his plan. Because, and yeah, no, I'm going to save that for later, because I guess Matt's going to talk about the, like, command initiative, or kind of, that is, like, whatever projects that we have to make it an even higher level of integration with Search Atlas. So yeah, just, just spoiling the, the surprise, yeah, Matt's going to come to that limit. But yeah, yeah, I, I got, I got you, and I copied that.

**Justin Hual:** Cool.

**Matt Bailey:** Actually, I'll share that now, since you brought that up. Monday is the call with Monik. Have you guys got email on that?

**Bryan Fikes:** Yeah, it automatically went to my schedule, but I didn't see the email. So yeah, thanks, thanks, Matt.

**Matt Bailey:** Okay. All right. Let me pull up some of that stuff here.

**Bryan Fikes:** Hey, while you're pulling that up, I did just send a quick note. I think one of the values to this group and all of us is... It's kind of an update, you know, like, and I'm sorry, man, I was, I didn't get to see the screen of the new gentleman that's here, but, you know, like, Anthropic with that update, I think if us knowing how we're implementing, how we're using it, anything to watch out for, I think that's the huge value add to this is kind of that, that, that brevity report of like, okay, guys, this is what happened.

**Matt Bailey:** Here's how we're going to, here's how we're going to use it.

**Jonathan Duque:** Yeah, and, and, and just so you guys are aware, part of what we are building internally is also the, how to the architecture and how to support you guys through this process, so we can be the ones actually sharing, as you said, like, what's new and how that has been implemented for us, and how we can help you guys, not only from a search analyst perspective, but overall agency, right, that's the, the ultimate goal. So yeah, I'll hit you up whenever Mythos gets fully released, right? I don't know if you checked that. It's crazy what's happening.

**Matt Bailey:** Let me bring this up here. So what's going to be covered Monday are applying four of the, getting four of the tool sets involved.

> **SCREEN SHARING: Matt started screen sharing**

**Matt Bailey (cont.):** And so this is what they built using four of the different agents for this audit. And this is for Roto-Rooter, which is one of the LinkGraph's clients. And so all of this was basically run just in the background through this process. So we've got the SEO and visibility audit. It creates a multi-page audit here where you've got your upfront strategy. Everything runs into then a revenue opportunity map. So you've got some initial ROI upfront and then building into the action plan. So everything that was found in technical audit, content audit, paid search audit, all those things are going to be included into here, into one main document that you can share with a client. It identifies the quick wins, as you can see here, going after specific keywords, the cost per click, where they're at right now, in position five with that, difficulty rating to get that, difficulty So all of that's being done, all in the background, and then just puts out the document like this. Yeah, deals with the content. What to do from there, very simple instructions about here's what's going to happen, then going into deep SEO posts for the blog, identifying what's being cannibalized, what's working, what's not working, getting into a lot of different things here, and then proposing a production pipeline, phased out what can be automated, what will need some human intervention, all of that built out. So even some additional mini sites for that, and also the AI visibility and visibility metrics. So there are four playbooks involved in that, and so Monday, it's basically starting to run each of these playbooks. Run in the back while Monarch kind of explains what's going on, then run the next one in the back and set up that workflow within your workspace. But that's what we'll be doing on Monday and taking care of that. I think we'll follow along with that. We've got the agenda here. I'm waiting on final approval on the agenda, and we can get that out to you here sometime soon. But this will be the audit mission. What we're going to be doing is that comprehensive visibility audit. And as you can see, we'll be running different agents all the way through the process. So what do we need to do to get you ready for that?

**Justin Day:** I guess that is the question. One question I had, I think these sessions are super helpful and valuable. Is it possible going forward to have like a weekly challenge or homework assignment so we're all working towards something? This QA is helpful for an open forum for like 10, 15 minutes, but for an hour, right? I think having more of like something that's attached to the overall monthly milestone so that we're all in lockstep together. And I don't know. I just work better when I have like an actual do this this week or at least a challenge or something, right?

**Michael Vassar:** Yeah, that's a great idea.

**Matt Bailey:** Absolutely. Yeah, that is in the works. Believe it. We are having meetings as well in the background. We want to keep up with you guys as well and make this worthwhile. So. So, yeah, that is a subject of our – we're probably meeting twice a week on this as far as, you know, keeping this going, keeping you guys challenged. So, yes, that is absolutely coming on. We'll be working with that. I'm hopefully bringing in Armand a little bit more as well to be working through some of these challenges with you.

**Justin Day:** Awesome.

**Matt Bailey:** So, yeah, thanks, Justin. If you guys have feedback like that, let us know. Because that can definitely help us make this better for you, a better experience all around. Jay, Claude can build the challenge.

**Jay Cornelius:** You like that one, right?

**Matt Bailey:** Yeah, I think – well, and that was one of the ones I think the one – So the one goal we wanted you to get to this point, you know, was building like a third-party website. I think some of you have done that already, started building out sort of that, you know, kind of a trophy content website, but, and then at least getting into one or two workflows and setting them up. Sounds like, Justin, you've built the command center to start building that out and having some fun with that. So, because I think getting that, that site there established, I know we're, we're also working through a couple things on, on the website studio, and, and Brian is pushing the, the limits on that. So we appreciate him for that. You should have seen what I built for my wife. I gave her a retirement gig. It's called mftfinder.com.

**Bryan Fikes:** It's a marriage family therapist directory. I pulled from the database that she had access to and built out a entire ecosystem nationwide for you to find the best therapist in your area.

**Matt Bailey:** Yes. Yeah.

**Justin Day:** This guy's going to come out with, like, 600 platforms tomorrow.

**Matt Bailey:** Well, that's the scale of the whole thing. You know, I'm like, you're going to put out 50 of those, one for each state?

**Bryan Fikes:** No, it's already live, MFTFinder.com. It's already live. Yeah, guys, listen, man, I'm in a space where it's a little different, man. I understand. You guys are, like, in the weeds, dude. And trust me, I've been there. I just, I mean, I'm in creator mode right now. And, yeah, I'm trying to build out an actual agency and do all that. Justin's been great in terms of listening to the command center and stuff like that. I went crazy with that, obviously, as well. I have my own command center built. It's not 100% there. But, you know, like Clayton was saying, I think all of our dreams is to have that freaking AI machine that just kicks out killer stuff for our clients, and then we just go kick ass.

**Matt Bailey:** Absolutely. Yeah, that's, that's one of the things, you know, J.D. I've both been, just so you know, JD is moving into full-time on Mastermind. So he will be available to coach, help.

**Bryan Fikes:** We know we need a few more assets on that, so JD is — Way to bury the lead, Matt. You got to start with that and say, I don't think these guys realize how freaking valuable JD is, man. Why do you think we all, dude, plug into him, dude.

**Matt Bailey:** Please, he's awesome. Absolutely, absolutely. Yeah, and that's the thing. If you guys have anything with the setup that you are running into, I mean, I had to grab JD last week just because I got wrapped up and, you know, like Justin was saying, that fear, I'm going to screw something up. I don't know what I'm doing. You know, I put my API key in the chat. What do I do? You know, what am I supposed to do with that? So don't be afraid to call JD, you know, tap him.

> **ACTION ITEM:** Post setup checklist in Circle; request completion/issues from members

**Matt Bailey (cont.):** That's what he's here for. And so, yeah, we're getting a lot more structure in on this as well. Yeah, go ahead, JD.

**Jonathan Duque:** No, I think I the kind of comments, and I wanted to piggyback on what Laney was saying earlier. Do you guys would like if we cover like a very basic checklist of what we, where we should be at, and maybe so we can figure where are you lacking, and then we can meet? I, I mean, I'm all in, so if we even have some time today, if you need to meet with me, and then just make sure that everything's airtight.

**Justin Day:** Yeah.

**Jonathan Duque:** You get it. So, yeah, definitely. Does, does that sound like a good thing for you guys? Would you like it? Awesome. So, what do you say, what do you think, man?

**Justin Day:** Maybe we can cover that?

**Jonathan Duque:** We can create a checklist. I do know that we wanted to have an initial site that we're going to be using as a satellite. So maybe that can be the first point. I'm not sure you get it. So the first thing that we, everyone should be at right now is the setup should be, like, clean. Like, has everyone had the time to check on the guide that I shared? Did you go over your file structure, connected your MCPs, and your, like, tech stack, anything missing on that end? And I'm going to just take notes and put that on a parking lot and then reach out to you directly to fix it, so we don't take everybody's time. But I want to make sure that everyone's gone through that array.

> **ACTION ITEM:** Schedule 1:1 w/ Michael re: file structure/MCP setup

**Michael Vassar:** I have not. I saw it, but I have not completed the checklist.

**Jonathan Duque:** Okay, good. Do you happen to have some time today?

**Michael Vassar:** Um, I, I. I have got, I have got a lot of time tomorrow, but not today, I'm sorry.

**Jonathan Duque:** That's good.

**Michael Vassar:** So, if you give me windows from tomorrow, even over the weekend, I mean, I would do it, so.

**Jonathan Duque:** I would, just kidding, but yeah, I can definitely share my agenda, and then we can meet and check that out.

**Michael Vassar:** Thank you.

**Jonathan Duque:** Who else is on the file structure, MCP connections, tech stack? Yep, go ahead, Clayton. Sorry, Clayton, did you, I saw you raise your hand, so it was just like, letting me know, or do you want to?

**Clayton Joyner:** Yeah, sorry, I'm trying not to talk. Yes.

**Matt Bailey:** Oh, no, you sound great, Clayton. Yeah.

**Jonathan Duque:** Yeah, yeah.

**Clayton Joyner:** [Mic fixed] It must have been some setting I found. I just started flicking all the buttons I could and the microphone, it irritates me with Zoom. But anyways, yes. So I was just saying, yes, you know, I thought you were asking, you know, who still needs help with or stuck on those different areas.

**Jonathan Duque:** Awesome. Great. So I'm going to share on Circle my, like, calendar link. I'm going to clean some availability. So you have it today, tomorrow, and even during the week if necessary. So we can go over that. The initial ask, and I'm wondering that the tech setup, not necessarily was like a roadblock for that. But do you guys have like the satellite website? Or have you built it maybe with WebStudio? On what you want to use then to fuel the rest of the projects. Does that make sense? Like the initial web that Manik mentioned, is that covered? Do you need any help with that? Does anybody has that? I know that Ryan has a bunch, so I'm not going to even ask you, but for the rest, do you guys have to read that in mind? Were it built?

**Jonathan Giner:** Any challenges? So, for me personally, and I don't know if this gives a little bit of insight, JD, but, so I've done a couple sites already. I think I've mentioned on some other calls. I guess the only thing, the only question I have, and this just might be time or whatever, but in terms of this particular quote-unquote step, is just making sure that, yeah, once again, I guess that process of building a site is quote-unquote optimized. And once again, I know this is a kind of a work in progress, and I know, you know, last, on the last call, we talked a little bit about, you know, the AI rules. And I know you shared that document. Personally, haven't been able to kind of go through it. I've got a little bit of a crazy week, but it's obviously definitely on my list. But yeah, the optimizing, I guess, of that process, and I know this is not like a one-time, but I think that maybe it's like an ongoing basis. But yeah, the optimizing of that process, I think, is kind of where I'm, I don't want to say I'm stuck, but I guess what I have a question about, you know, where I'm still a little bit kind of unclear. And the reason I say that is because I have noticed sometimes with the different projects, a little bit of inconsistencies. It was one particular project that I had a little bit of a hard time with, and I'm not sure why, because honestly, the other projects were great. So I've done five sites now. And yeah, four of the five were fantastic. But I don't know, on this last one, actually, it's not live yet. On this last one, I don't know, for whatever reason, it's like, I just wasn't getting the design the way it is that I wanted it.

**Justin Day:** That's the biggest issue I've seen, too, to echo that. The design part is, like, it looks fine, typically, when I just do it in Claude, and I can give it that direction, but when we go into MCP, it's, like, not consistent.

**Jonathan Duque:** And to your point, yes, that is something that I've already flagged, and Matt has already flagged in the team. What we're working on is to allow you guys to maybe send us the HTML or the zip of the web that you built, and then we can inject that to the backend, because the UI is where things start breaking up, right?

**Bryan Fikes:** Yes, yes, yes, yes, yes, yes, yes.

**Justin Day:** Yeah, that would be, I mean, just looking at it from a developer standpoint, the next easiest, best step that I would see is the ability to inject rendered HTML, right, and that we have done locally that makes, that we like to design of, upload that through the MCP to give that a guide. And even being able to potentially upload Markdown if needed, just because I've built out a brain that knows the design and feel that I like, and then being able to localize that on the MCP so that there's consistent design that it's always referring back to, that would be awesome.

**Clayton Joyner:** And I don't know if it helps or not, but I did take the client-first web development class structure and converted it into a skill, so .md file. So I've downloaded the entire process for that, and now it can develop and spit out the code in the same format as client-first, if that matters to anybody.

**Jonathan Duque:** Oh, that sounds super cool. I definitely want to check that out because, yeah, me, I'm struggling a lot in that particular piece of, like, design.

**Clayton Joyner:** And if you want, JD, too, just throwing it out there, I have productionized, if that's a word, the web development process. I've gotten it down to a language where we go from scope of macro design decisions down to, you know, page type or level design decisions into sections to elements and global to local structure. So I've got a whole visual breakdown on how we implement web systems for that. And I think that that's the part that I've hesitated on building the websites on because that part is so important. Getting the scaffolding right for SEO is critical, but then, you know, the thing that makes the client happy, ironically, isn't the SEO. I mean, down the road it is, right? But in the short term, it's all about the look and feel, right? And if we can't nail that, we screw the whole thing up, right? And that's the part that, I was looking at 20, was it 21.dev or something like that? And then there's another AI component plug-in piece as well that's got a whole modular plug-in system that can get access to. And just to kind of put it in perspective, like back in the day, right, when we had the big agency, I had nailed it. We down design aesthetics in the industry, because we're super niche, into three basic categories, or four. One was traditional medical, which is your green, you know, your teals and whites and, you know, the copacetic stuff. Then we found that there was a luxury style, or I call it red carpet. Then we had high fashion, and then we had a young youthful. And we basically were able to categorize in four different categories the main design elements and create that styling around that. Then we could just scroll through headers that were already pre-built in that style, know, hero sections pre-built in the style. And then if we had the idea now is, like, can we get the SEO, like, what's the perfect build, right, from an SEO structural perspective? And then how do we put a styling layer above that so that we can then display that same content and the styles that are predetermined? And so for those of us that are in niche, you know, industries, this becomes really powerful, because, you know, obviously you get the, whatever, the exponential variation of how many different components you can mix and match together. That is really cool. And then you start, you know, you can get really advanced with all the automation, animations, and all that kind of stuff, too, and 3D renderings. But, you know, at the end of the day, the UX and UI piece, I think, is the one stumbling block for me that if we can nail that part of it, then game over.

**Matt Bailey:** Yes. Love that. I mean, that's a key component there. Like you said, each industry has kind of its own aesthetic that needs to be addressed. Yeah, I kind of see that. It's almost like a, you know, a skill for a different kind of industry. Love that. That is definitely something to, something to work for.

**Clayton Joyner:** I think we can... I said, I've got infinite lucid charts to break all of these design decisions down in a visual format.

**Jonathan Duque:** So if you guys want to have a sidebar, you know, I can just show you what I've put together if you...

**Matt Bailey:** I'll love to see that.

**Jonathan Duque:** And actually, I was going to mention that that is one of the, my headaches, this, like, this thing is weird. I'll see next weeks. And the only, like, visible, short-term solution that I found was this Playground plugin. I'm not sure if you guys have used it in the past. This is actually coming from the Fathom, and that might be also a good addition there, because this Playground plugin allows you to, as you mentioned, like, switch between, like, different pre-render, pre-generated, like, team styles and designs. And you can even, like, modify fonts and sizes and so on and so forth. I'm to drop it in the chat for a little bit.

**Clayton Joyner:** Because the challenge is with this is, it's chicken or the egg, right? What comes first? Design or copy?

**Justin Day:** Yeah. Both. Right, yes.

**Clayton Joyner:** Because, I mean, you go and you put this beautiful wireframe together with styling decisions, and you get a styling guide, and you get all that stuff, and you're like, man, let's rock.

**Jonathan Duque:** And then you get all the copy, and it doesn't fit.

**Clayton Joyner:** And then you put the copy in, and you're like, okay, how do I, now I have to rethink how I style against the copy, right? And so, that's the philosophical choice that has to be, you know, made.

**Jonathan Giner:** Matt, Matt, something, another suggestion I'd like to make, yeah, once again, just a suggestion, I'm part of another mastermind, and we meet quarterly, like, in person as well, and one of the things that we do that I think, and by the way, you might have this already in mind, but one of the things that we do when we meet, somebody we meet for, like, we normally meet for three days. So, and it's, yeah, so nobody we meet for three days, and the first two days, the group is kind of, basically what happens is that everybody presents for about anywhere between, typically about 45 minutes, maybe 50 minutes, and obviously there's, everybody has the same exact presentation. Like, in other words, like, the content of the presentation is the same, so for example, like, one of the things, like, it's a part of every single one, it's like, you know, what's your biggest give, you know, this quarter, you know, and it's like, one skill, one strategy or whatnot that you implemented that, you know, was quote-unquote game-changing for you. But my point is that I think that there's a lot of talent, you know, quote-unquote in the room, at least in this virtual room, and every one of us kind of has our own superpower, so to speak, and I think being able to somehow get in a room and being able to combine those superpowers, like seeing, you know, what Justin is doing with this, or Brian is doing with that, or whatever the case might be, like, I think a lot of us are going to learn a lot from that. So getting a chance to present and getting more insight into what some of us are doing with some of the skills or whatnot that we're learning, I think would be really beneficial to the group.

**Matt Bailey:** I hear you, Jonathan. Absolutely. I like that. I think, yeah, I think our weeklies after this, especially after this second session, with Monarch, it's going to expand a little bit more, and so, yeah, our weeklies. Definitely the plan for that is going to be a bit more intense, but yeah, having time for you guys to show off what you're doing, and that's one thing. Let me ask you this, now that, you know, we're this far in, you've had one main session, you've been now working in there, I think the goals that you were asked for at the beginning of the session may have been clouded that you hadn't gotten dirty yet. Now that you've got your hands in there, now that you're working in it, what are your goals? You can even pop them in the chat, just, you know, and I'll be able to take a look at them here. But I would love to know, now that you've kind of gotten dirty, gotten in there, maybe your goals have changed, and I want to take your goals back to the team to make sure we're aligned on what we're delivering to you. So if that, if we can do that, that would be amazing. As far as... That the next, yes, there are, right now, they're talking about, let me see, in May, either San Francisco or Vegas for the in-person meetup. I have not seen, it's a debate right now, internally.

**Bryan Fikes:** Hey, I'm just going to put this out there. You guys have been San Francisco. I will roll the red carpet. I will get Kendall Jackson. I'll get all my buddies in the wine industry, you freaking winos.

**Clayton Joyner:** All right.

**Bryan Fikes:** Let's go San Fran, dude.

**Matt Bailey:** That's my vote.

**Bryan Fikes:** Vegas is cool, Fran.

**Clayton Joyner:** Vegas is gross.

**Matt Bailey:** I don't know. I'll put my vote in now. I'll put that in. It's always good to have someone on the ground. I don't care. I'll go anywhere. That'd be awesome. That'd be awesome. Jonathan, yeah, thanks for that. I appreciate it. And yes, that's... That is the plan as we as we get into this as masterminded doing more because, yeah, I mean, I'm impressed with you guys just on the call, just hearing what you're what you're thinking, how you're going about it. Absolutely. That's going to be the heart of this moving forward.

**Jonathan Duque:** Were you about to share, Clayton, was my impression, or would you rather have a different space for that?

**Clayton Joyner:** Now I can't hear your mic.

**Justin Day:** What was it you said?

**Jonathan Duque:** Oh, sorry. Can you hear me okay now?

**Clayton Joyner:** Yeah, yeah.

**Jonathan Duque:** Should be better now. So you mentioned that you were to share a little bit of what you got going when it comes to the design pieces?

**Clayton Joyner:** Yes.

**Jonathan Duque:** Or you did it. Okay.

**Clayton Joyner:** Oh, you want me to, I mean, I can, you want me to show you now or later?

**Jonathan Duque:** However you want to do it. I just want to make sure that we cover what we like.

**Justin Day:** I mean, it sounds like if you've got all that visually mapped out, man, just throw that in the cloth and say, go build it.

**Clayton Joyner:** It's in Lucidchart right now. So I'm having to figure out how to, because it's so big, how do I scope it in?

**Justin Day:** I don't know if I can do it.

**Clayton Joyner:** Chunks, yeah.

**Justin Day:** Yeah, let me pull it up real quick.

**Clayton Joyner:** I'll show you. And again, this is a little bit older, so forgive me. It's not probably as up-to-date as I'd like it to be, but this is what I had built before. I'm a giant map nerd when it comes to these things.

**Justin Day:** Maps are good.

> **SCREEN SHARING: Clayton started screen sharing**

**Clayton Joyner (cont.):** Good. Oh, man. And while I'm on this screen, actually, let me see if I can share my screen. So this is my client journey. This is my goal, is to get this fully built. Nice. And this is, I think this is, yes. So I've kind of, this is my visualization of. Kind of how we've broken things apart. So the way that I, when it comes to the design side, we organize pages in the category, right? So the main categories that we have are going to be your core pages. Those are all the unique service level pages, right? So the about us, homepage, contact, any, you know, one-off designed page. Then we have our, some people call them inner pages or service pages, you know, however you choose to describe that, right? And then you have, you know, parent-child relationships within those, and then you have compliance pages. And those are three, you know, and then collections, right? Or CMS pages. And so when we got into the design structure, you know, I did a lot of analysis. Again, this was back when I had the big marketing agency for the aesthetics, medical. And I said, what are all the sections that could go onto the homepage, right, that were relevant? And then how many sections are we going to put on the homepage, right? So then they get to choose from that. And then we put rule sets around, you know, on the home, you know, well, these are the core pages list here, actually. I'm sorry. It's not the same. So we choose our page structure, then our treatment page structure, then we've got our CMS page structure, and this is going to help kind of create the scaffolding around what the site should be built out of, right? So if we took Search Atlas and we ran it through the MCP and we said, okay, what is the perfect website for this industry, right? And what pages do they have? What ranks well? What's doing well? And obviously that can adjust over time. But if we said, if we could work in only one industry and build the perfect website every time, what would need to be included to outperform everybody in their market, especially with a regional footprint, right? That's the approach that, in my mind, I'm trying to work towards. And then from here, we started to move the hierarchy of design, right, which we got into global selections. And this is the decisions that have to be made here, right? So what's our styling decisions around the CTA? What is the CTA? What's styling decisions around each of these elements, right? What's included in the header? What's included in the navigation, what's included in the footer, right? Then we have global widgets that we need to make sure that land all throughout the website, right? So those things have to, those are components, I guess, depending on what platform or design style you're working with. And then that needs to be pre-designed. So, like, before you even get into building a web page, right, we have to develop the theme. And the theme is going to define your, you know, obviously your colors and fonts, but also your global widgets as well and CTAs and other elements that are going to be posted all throughout. And then these are the categories that I had come up with. Oh, it was medical, professional, playful, luxury, and high fashion, you know, whereas, like, high fashion is going to be, like, black and white, lifestyle photos, like, where you think New York City, you know, think Abercrombie and Fitch, right, something like that. You get luxury, that's more red carpet, that's going to be, you know, bold reds and colors and expensive wine country stuff, right? Playful is going to be more colorful, it's going to be bouncy, happy, you know, all that kind of stuff.

[Clayton continues describing design system categories, approval workflows, and web production pipeline in detail — see Screen Sharing section above for full breakdown]

**Clayton Joyner:** ...And then as a bonus here, this is the quoting software that I'm working on right now. I've developed a three-tier access system for developing calculators for home service industry. So basically we've got a platform admin, which is us, the owners of the software. We have a reseller option. So if I go, this is platform, it's a little slow. But we've got resellers, and then we've got the user tabs. I've got basically for every state, we've got the material pricing index for all the materials for each of the things we're trying to do. We've got labor index for all 50 states, permitting cost estimates for all 50 states. And then what we're doing. As we're going in, ultimately, this is a reseller account here, and then we can go into a sample brand or company, and what it does is it puts out these lead magnet calculators for the client, with the idea being that they can get an estimate without having to talk to a salesperson. And then, so, for example, like if I do this, it's going to start hiding the estimate range. I can put in this, all of this modifies the price, I can choose what level of upgrade that I want, I can put in my zip code, it'll look it up, it'll tell me exactly where I'm at, you know, this is include disposal, and I can do this for every, I'm going to basically do this for every home service option that's available. [Continues...] We're going to offer a $1,000 off or a $1,000 credit for them if they want to book an appointment to get an in-person estimate. And then we're going to put something in the middle here that's going to be able to sell the credential, credentialize the client and be able to put together, you know, like a video or some kind of creative gallery. And then you should be able to, in theory, as a user, you should be able to make as many calculators as you want and use them wherever you want. I'm going to put in a QR code generator automatically built into each calculator, and it's got an embed function, which is really cool. And so if you go to the calculator, set up here, and hit manage, I have the embed code. I've got public URLs. For the theme settings, we can set your financing options that you have available to your business inside here. We can set your pricing modifiers so they can adjust their own pricing themselves. And then I'm going to have it so that it natively integrates with GoHighLevel and HubSpot. So we'll import all the data automatically into there. Notifications. And then I'm about to put on an onboarding wizard. So it's going to make it so that when a new brand signs up, they'll automatically get their magic link, be able to self-enroll, set up their subscriptions, build out their profile, and then they'll have kind of a wizard that shows them around on how to use the software with the goal of trying to get them to build their first calculator as soon as they log in. So that's one of the things I'm working on.

**Matt Bailey:** I'm going to book my childhood here. Clayton, that is wicked smart. That is, I love the calculator. That is, and, you know, selling it, beautiful.

**Clayton Joyner:** I was like, if I could get them to pay me nine bucks a month to have a calculator that gives them, you know, qualified leads to book, you know, and then, oh, and it allows for locations, so if they're multi-location, they can have as many, and we can, so we get attribution at the location level for how they're using the calculator.

**Matt Bailey:** Crazy. Crazy. That is amazing. Clayton, you have systematized the whole process. I mean, that is, that is amazing. I love the calculator. Fantastic.

**Michael Vassar:** How long have you been working on this, man?

**Clayton Joyner:** The calculator? About a week.

**Matt Bailey:** I knew it was going to blow my mind.

**Clayton Joyner:** Well, you know, what's funny is I've got a computer science background, a computer formations degree, but I never actually really used it, right? But I think like it because of data structures and the way that they used to do it. I studied UX, I've been in marketing, copywriting, all the things. So what's fun for me is I get to do the best part of this job, which is what's the idea, and then I get to play test the software, and every time I find something I want to be different, I can just tell Claude to change it, and it does it. It's amazing. And so I've got a lot of, I also, at the same time, I'm building a second app for the nerds in the room. I played like a lot of games. So one of the tabletop games we played is a Star Wars role-playing game. So I took a 366-page rule book for the, it's like Dungeons & Dragons, if you've ever heard of that, right?

> **ACTION ITEM:** Share multi-agent design framework on next call

**Clayton Joyner (cont.):** No. I went in, rain, man. I woke up at like 4:30 in the morning and went nuts, developing a multi-agentic system and all the players that would have to be involved to make it work. And I'd really like to share that with you guys, but I may have to pull it up for the next one.

[Discussion continues on multi-agent architecture, compliance guardrails, parallel agents, flywheel self-improvement loops, token efficiency]

**Jonathan Duque:** I'm going to set the checklist, and I'm going to send it to Circle so you can check and confirm where you're at and maybe where you're struggling, like everyone, and then we guarantee that we're ready for the mastermind on Monday.

**Matt Bailey:** All right. We'll see you guys on Monday. And yeah, I think Monarch's going to roll out a couple of new things as well. We just got a quick preview on it. Yeah, with an actual interface. So we'll see how that might make things a little bit easier. I'm much more of an interface person than a command line person. So I'm kind of looking forward to see where that goes. But yeah, we'll look forward to seeing you. And yeah, thanks a lot for sharing that with Clayton. And thanks a lot, guys, for hanging on and watching.

**Jonathan Duque:** Appreciate your time, everyone.

**Michael Vassar:** See you around, guys.

[Post-call: Michael Vassar privately with Matt and JD about auto-site limit issue]

**Michael Vassar:** Hey, this is probably... It's going to be an issue soon, but at the moment, I'm juggling it by having multiple Search Atlas accounts, but I just haven't been able to add new auto sites to my account for over a week, so I don't know if that's normal or not, to be honest with you. It doesn't feel normal, but I just thought I'd ask you because I'm kind of just in a real long holding pattern with support. Maybe it won't be an issue if I can continue adding new accounts to the one I opened yesterday and then we merge them later, but if that's not going to be easy, then I'm stuck, you know?

> **ACTION ITEM:** Email Matt support ticket #s re: auto-site limit; then JD resolve limit

**Jonathan Duque:** No, totally feel you. No, let me do some... [JD confirmed he can fix the auto-site limit directly] Let me ask you, is the account, the main account that you use, gbp.digitalcoastmarketing.com?

**Michael Vassar:** That's the one, yeah. I've got, I can't get beyond six sites. I've been stuck there for about a week.

**Jonathan Duque:** No worries. I'll handle it. I'll figure what you've already submitted to support, but moving forward, just reach out to me or Matt directly, and we're going to take care of that. So you don't need to go through the support funnel anymore.

**Michael Vassar:** I appreciate that. Thanks a lot, y'all.

**Jonathan Duque:** You got it. Thank you for your time.

**Michael Vassar:** All right. I'll look for something to schedule a time with you. JD, tomorrow, if you have any, to get that file organization put together.

**Jonathan Duque:** Absolutely, yeah.

**Michael Vassar:** You can count on that. All right. All right. Thanks a lot, y'all.

**Matt Bailey:** All right. Bye.

---

## Action Items (from Fathom)

1. Coordinate w/ Maddy to update MCP GitHub docs w/ schemas/missing tools
2. Post setup checklist in Circle; request completion/issues from members
3. Schedule 1:1 w/ Michael re: file structure/MCP setup
4. Email Matt support ticket #s re: auto-site limit; then JD resolve limit
5. Share multi-agent design framework on next call (Clayton)

---

## Screen Share Timestamps

- **Matt Bailey** started screen sharing @ **18:21** — Roto-Rooter 4-playbook visibility audit report preview
- **Clayton Joyner** started screen sharing @ **44:37** — Lucidchart web production system + quoting calculator app demo

---

## Screenshots

No screenshots captured (browser_take_screenshot permission denied in this session). Screen sharing content described in detail above based on transcript + Fathom screen sharing markers.
