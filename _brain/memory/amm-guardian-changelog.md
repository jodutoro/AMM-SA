---
name: AMM Guardian Changelog
description: Running log of all Guardian actions — fixes, deployments, improvements, suggestions. JD reviews for visibility and team sharing.
type: project
---

# AMM Guardian — Activity Log

> Running record of everything the Guardian does. Updated by the analyzer after each run.
> JD uses this for visibility, team updates, and tracking what changed.

---

## How to read this file

- **AUTO-EXECUTED** = Guardian created a PR automatically (>=80% confidence)
- **APPROVED** = JD approved via GitHub Issue comment
- **SUGGESTED** = Pending approval on GitHub Issues
- **INTERNAL** = Feedback captured in AMM-Internal/ (not public)
- **DIGEST** = Low-confidence idea, logged for weekly review

---

## 2026-04-23 — Run time: manual (JD session) — CALIBRATION HALT (ongoing)

> **CALIBRATION HALT continues.** All auto-PRs converted to needs-approval.

- **INTERNAL** gap-027 — White-label MCP connectivity failure (Bryan Fikes, Apr 23 weekly)
  - Confidence: 95%
  - Source: AMM Weekly 2026-04-23 — Bryan Fikes, confirmed live with SA engineer Michael (Lagos)
  - Files: `gaps.json` (appended), `gaps-sa-export.json` (pending)
  - PR/Issue: internal only
  - Impact: New production failure mode — deep freeze + site metrics returning empty for white-label clients onboarded via MCP only. SA engineer acknowledged without resolution. JD has escalated internally.

- **INTERNAL** gap-028 — Website Studio group-level behavioral avoidance confirmed (Apr 23 weekly)
  - Confidence: 98%
  - Source: AMM Weekly 2026-04-23 — 4 members bypassed Website Studio unprompted (Todd Koch, Jonathan Giner, Justin Kavanaugh, Matt Bailey)
  - Files: `gaps.json` (appended)
  - PR/Issue: internal only
  - Impact: Avoidance is no longer individual friction — it is an institutionalized group norm. Jonathan Giner made an on-record public statement warning other members against going all-in. Corroborates 11 prior gaps. Highest-priority Website Studio signal to date.

- **INTERNAL** gap-025/026 — Credit quota blindness — second member data point (Bryan Fikes)
  - Confidence: 95%
  - Source: AMM Weekly 2026-04-23 — Bryan Fikes described production disruption from unexpected quota exhaustion
  - Files: no new entries (corroborates existing gap-025 + gap-026)
  - PR/Issue: internal only
  - Impact: Two separate high-activity members (Jonathan Giner Apr 21 + Bryan Fikes Apr 23) have hit the credit wall mid-production. SA engineer confirmed live he had not heard this request — escalation path now open. Ready to elevate to Manick.

- **INTERNAL** By-member log — Todd Koch created (new member profile)
  - Source: AMM Weekly 2026-04-23 — first session where Todd contributed substantially
  - Files: `by-member/todd-koch.md` (created)
  - PR/Issue: internal only
  - Impact: Todd is running 15–16 client sites at volume with zero SA web infrastructure. Building entirely on Vercel + Next.js. Has live authority site with real traffic. No individual track existed before today.

- **INTERNAL** Session report — Meeting-Report-Apr23.md created
  - Source: AMM Weekly 2026-04-23 transcript (Fathom 646782141)
  - Files: `AMM-Internal/Meeting reports/Meeting-Report-Apr23.md` (created)
  - PR/Issue: internal only
  - Impact: Full session analysis with highlights, pain points, wins, action items, unresolved questions, and Guardian analysis embedded.

### Engagement alerts (manual)
- Justin Day: 2+ consecutive absences — DIRECT OUTREACH NEEDED
- Jay Cornelius: 14-day at-risk threshold reached — no attendance, no Circle signal
- Clayton Joyner: reduced signal, second consecutive absence

### Run stats
- Run ID: 33 (manual — triggered by JD session)
- Signals processed: 1 transcript (Fathom 646782141)
- Internal records: gap-027, gap-028, gap-025/026 corroboration, todd-koch.md created, Meeting-Report-Apr23.md created
- Issues created: 0 (calibration halt)
- Next Hunt Mode eligible: 2026-04-24

---

## 2026-04-22 — Run time: evening — CALIBRATION HALT (ongoing)

> **CALIBRATION HALT continues.** Success rate 33% (1/3 merged) — below 50% threshold. All proposed PRs converted to needs-approval issues.

- **INTERNAL** gap-025 — OTTO credit quota UX gap (no visibility into credit cost per action)
  - Confidence: 90%+ (clear, specific, actionable)
  - Source: 1-on-1 Jonathan Giner 2026-04-21 (transcript signal id=1186)
  - Files: `gaps.json` (appended), `gaps-sa-export.json` (appended)
  - PR/Issue: internal only
  - Impact: Documents that AI generation credit model is opaque — no pre-run cost estimate, no self-service quota info in UI. Escalation-ready for product.

- **INTERNAL** gap-026 — OTTO MCP has no credit query/limit per project
  - Confidence: 88%
  - Source: 1-on-1 Jonathan Giner 2026-04-21 (same session)
  - Files: `gaps.json` (appended), `gaps-sa-export.json` (appended)
  - PR/Issue: internal only
  - Impact: Agencies running automated playbooks can't gate on remaining credit balance. Feature request for MCP credit endpoint.

- **INTERNAL** stack-008 — Working from wrong root directory (workspace misconfiguration)
  - Confidence: 85%
  - Source: 1-on-1 Jonathan Giner 2026-04-21; corroborates stack-006, stack-007, stack-002
  - Files: `stack-issues/issues.json` (appended)
  - PR/Issue: internal only
  - Impact: Fourth data point on workspace root misconfiguration pattern — validates guide proposal.

- **INTERNAL** stack-009 — MCP files don't sync across machines (SyncThing/file-sync gap)
  - Confidence: 70%
  - Source: 1-on-1 Jonathan Giner 2026-04-21
  - Files: `stack-issues/issues.json` (appended)
  - PR/Issue: internal only
  - Impact: Single data point; structurally inevitable for any multi-device setup.

- **INTERNAL** By-member log — Jonathan Giner updated
  - Source: 1-on-1 Jonathan Giner 2026-04-21
  - Files: `by-member/jonathan-giner.md` (appended — 5 new entries)
  - PR/Issue: internal only

- **SUGGESTED** New guide — Agency workspace root setup in Claude Code
  - Confidence: 80% → needs-approval under CALIBRATION HALT
  - Source: 4 data points across members (stack-002/006/007/008, Apr–Apr 2026)
  - Files: `guides/setting-up-your-agency-workspace-in-claude-code.md` (would create)
  - PR/Issue: #20
  - Impact: Addresses most-repeated non-SA-product blocker in the cohort.

- **SUGGESTED** Newsletter — Claude Code v2.1.118 (hooks can call MCP tools directly)
  - Confidence: 88% → needs-approval (Circle publish rule)
  - Source: claude-code-releases feed (signal id=1261)
  - Files: `changelog/2026-04.md` (would update directly on INT after approval)
  - PR/Issue: #21 (supersedes #19 for v2.1.117)
  - Impact: Key feature for SA MCP users — hooks can now auto-invoke MCP tools at session boundaries.

- **ANALYZED** anthropic-changelog signal (id=1260) — HTML-only content_preview (models page CSS), no release notes extractable. Marked analyzed, no action.

### Run stats
- Run ID: 32
- Signals processed: 3 (1 transcript, 1 anthropic-changelog, 1 claude-code-releases)
- Acted on: 2 | Analyzed (no action): 1
- Internal records: gap-025, gap-026, stack-008, stack-009, jonathan-giner.md updated (5 entries)
- Issues created: 2 needs-approval (#20 workspace guide, #21 newsletter)
- Calibration halt: still active (33% success rate)

---

## 2026-04-21 — Run time: evening — CALIBRATION HALT (ongoing)

> **CALIBRATION HALT active.** Success rate 0% (PR #7 + PR #8 rejected). All proposed PRs converted to needs-approval issues. Two consecutive rejections both involved Website Studio guides routing members to non-SA tools — hard constraint violation per PLAYBOOK §1.

- **INTERNAL** gap-024 — Website Studio AI chat limited to dashboard UI (no MCP write access)
  - Confidence: 88%
  - Source: ClickUp AMM operational review (signal 868jb18tc, Apr 21)
  - Files: `AMM-Internal/product-feedback/sa-issues/gaps.json` (appended), `gaps-sa-export.json` (appended)
  - PR/Issue: internal only
  - Impact: Documents that WS AI chat is dashboard-only — members can't invoke it via MCP write operations. Escalation-ready for engineering.

- **INTERNAL** By-member log — Jonathan Giner (WS adoption corroboration)
  - Source: Circle post "Site Redesigns Using Warp and Claude" (signal ID 250, Apr 2026)
  - Files: `AMM-Internal/product-feedback/by-member/jonathan-giner.md` (appended)
  - PR/Issue: internal only
  - Impact: Confirms Jonathan continues building sites via Claude Code + Warp, not Website Studio. Corroborates gaps 003/007/017.

- **INTERNAL** By-member log — Andy Zelt (created new file)
  - Source: ClickUp AMM signals (MCP endpoint + non-technical onboarding)
  - Files: `AMM-Internal/product-feedback/by-member/andy-zelt.md` (created)
  - PR/Issue: internal only

- **SUGGESTED** Doc fix — MCP_SETUP.md endpoint update (api/v1/mcp)
  - Confidence: 82% (→ needs-approval under CALIBRATION HALT)
  - Source: ClickUp signal (Andy wrong endpoint) + memory rule + SA MCP V2 launch
  - Files: `docs/MCP_SETUP.md` (would update)
  - PR/Issue: #16
  - Impact: Fixes documented endpoint from legacy /sse to current /api/v1/mcp — unblocks members with connection failures. Pending JD confirmation of V2 transport type.

- **SUGGESTED** Changelog — SA MCP V2 launched April 16
  - Confidence: 75%
  - Source: Circle post "MORE, BETTER, FASTER! SA MCP V2 LIVE!" (JD, Apr 16, 3 comments)
  - Files: `changelog/2026-04.md` (would create/update), `WHATS-NEW.md` (would add entry)
  - PR/Issue: #17
  - Impact: Members get visibility into V2 launch, new capabilities, and migration action.

- **SUGGESTED** New guide — Scaling AI tools to non-technical team members
  - Confidence: 65%
  - Source: ClickUp AMM signal "Non-technical staff onboarding path for 127 employees" (Andy Zelt, Apr 2026)
  - Files: `guides/onboarding-nontechnical-team.md` (would create)
  - PR/Issue: #18
  - Impact: Addresses agency scaling challenge — getting non-developer staff onto AI marketing workflows within SA web UI.

### Run stats
- Signals fetched from DB: 2 (releases, both skipped — HTML-only preview)
- New signal sources processed: 20 circle posts + 8 targeted clickup_amm tasks (+ 103 bulk-marked)
- Signals acted_on: 5 (circle: 250, 252 / clickup_amm: 361, 364, 365)
- Signals analyzed (no action): 113 (bulk circle + clickup_amm non-priority)
- Internal records: gap-024, jonathan-giner.md updated, andy-zelt.md created
- Issues created: 3 needs-approval (#16 MCP endpoint, #17 SA MCP V2 changelog, #18 non-tech onboarding)
- Hunt Mode: not eligible (last run 2026-04-17, next eligible 2026-04-24)

---

## 2026-04-20 — Run time: evening (Monday) — CALIBRATION HALT

- **CALIBRATION HALT** Triggered by 0% merge rate (PR #7 + PR #8 both rejected, both Website Studio guides)
  - All proposed auto-PRs converted to needs-approval issues for this run
  - Pattern: Website Studio public guides being rejected — avoid this category until one lands

- **SUGGESTED** Claude Code v2.1.116 changelog entry
  - Confidence: 72%
  - Source: claude-code-releases feed (signal id=240)
  - Files: `changelog/2026-04.md` (would create new)
  - PR/Issue: #14
  - Impact: Surfaces MCP startup improvements + /resume speed for AMM members running heavy sessions

- **INTERNAL** gap-023 — Website Studio resource hosting limitation
  - Confidence: 95%+ (confirmed across 3 planning sessions)
  - Source: AMM internal meetings 04/13, 04/14, 04/20
  - Files: `AMM-Internal/product-feedback/sa-issues/gaps.json` (appended), `gaps-sa-export.json` (appended)
  - PR/Issue: internal only
  - Impact: Documents SA team routing around Website Studio for member HTML portal — highest-signal indication of platform gap

- **INTERNAL** stack-007 — Command line + file structure conceptual gap
  - Confidence: 85%
  - Source: AMM Weekly Sync 04/07 (group discussion)
  - Files: `AMM-Internal/product-feedback/stack-issues/issues.json` (appended)
  - PR/Issue: internal only
  - Impact: Multiple members need CLI basics guide; team scheduling 1:1s to compensate for missing docs

- **DIGEST** Weekly digest issue created
  - PR/Issue: #15
  - Impact: Full week summary + calibration note + unblock suggestion for JD (review PRs #1 + issue #4)

## 2026-04-20 — Run time: morning (Monday)

- **AUTO-EXECUTED** SA April 2026 platform roadmap appended to `changelog/2026-04.md`
  - Confidence: 90%
  - Source: AMM Monthly with Manick Bhan 2026-04-13 transcript
  - Files: `changelog/2026-04.md` (updated on PR #3 branch)
  - PR/Issue: extended existing PR #3 with new SA section
  - Impact: Members now have curated April SA updates — Atlas Brain v2, Content Genius v2 (half cost/2x speed), Atlas CLI (free/unlimited ~30d), Atlas Command, Universal Credits, CloudStacks 14→35+ sites, Meta/LinkedIn/Uber/ChatGPT Ads. Delivered tools: Research Oracle, Enterprise SEO Audit, Google Ads Audit playbook, SEO ROI Calculator.

- **AUTO-EXECUTED** Guide — Website Studio push failures diagnosis
  - Confidence: 90%
  - Source: 4+ member transcripts (Apr 9 weekly, Mar 26 weekly, Mar 19 weekly, Apr 6 1-on-1) — consistent group-wide blocker
  - Files: `guides/website-studio-push-failures.md` (created on branch guardian/guide-ws-push-failures-2026-04-20)
  - PR/Issue: [PR #7](https://github.com/jodutoro/AMM-SA/pull/7)
  - Impact: Documents top 4 root causes (wrong dir mapping, broken asset paths, account site cap, MCP vs direct Claude inconsistency) with diagnostic bash commands and alternative deploy paths.

- **AUTO-EXECUTED** Guide — Choosing Website Studio vs Claude Code
  - Confidence: 85%
  - Source: Cross-session evidence — member abandoned Studio for multi-page builds (Mar 26, Apr 9); another uses Studio exclusively for location-service pages (Mar 16, Apr 9)
  - Files: `guides/choosing-website-studio-vs-claude-code.md` (created on branch guardian/guide-ws-vs-claude-code-2026-04-20)
  - PR/Issue: [PR #8](https://github.com/jodutoro/AMM-SA/pull/8)
  - Impact: Decision tree + per-tool use cases + hybrid SA MCP → WS → Claude Code → CMS MCP workflow.

- **AUTO-EXECUTED** Guide — Getting consistent design output from AI website builders
  - Confidence: 85%
  - Source: Group-wide variation blocker (Apr 9 weekly, multiple members); Clayton Joyner 4-style taxonomy demo Apr 9
  - Files: `guides/getting-consistent-design-output.md` (created on branch guardian/guide-consistent-design-2026-04-20)
  - PR/Issue: [PR #9](https://github.com/jodutoro/AMM-SA/pull/9)
  - Impact: 5 concrete techniques (design brain file, 4-style taxonomy, copy-first structure, reference-page anchoring, version-controlled design state).

- **SUGGESTED** Guide — SA MCP rate limits for high-volume agencies
  - Confidence: 75%
  - Source: HIP Creative Apr 14 1-on-1 — 530-client account hitting per-endpoint daily caps
  - PR/Issue: [Issue #10](https://github.com/jodutoro/AMM-SA/issues/10) — comment "go" to publish
  - Impact: Would document throttling workarounds and escalation path for volume-tier access.

- **SUGGESTED** Guide — Transcript-to-SOP workflow
  - Confidence: 70%
  - Source: Member workflow demonstrated Mar 19 + Mar 26 weeklies
  - PR/Issue: [Issue #11](https://github.com/jodutoro/AMM-SA/issues/11) — comment "go" to publish
  - Impact: Would capture Fathom transcript → Claude → numbered SOP pattern + session-review loop.

- **SUGGESTED** Guide — HubSpot attribution report from CSV export
  - Confidence: 65%
  - Source: Live demo in Mar 19 weekly session, strong group reaction
  - PR/Issue: [Issue #12](https://github.com/jodutoro/AMM-SA/issues/12) — comment "go" to publish
  - Impact: Would document "Claude as HubSpot attribution expert" CSV pattern + localhost real-time variant.

- **INTERNAL** Signals 182 + 201 — anthropic-changelog false positives (Next.js SPA nonce hash)
  - Same collector bug as signals 125/144/163. Both marked `analyzed`. digest-staging entry already existed.

- **DIGEST** Weekly digest published — [Issue #13](https://github.com/jodutoro/AMM-SA/issues/13)
  - digest-staging.json cleared (9 items processed into PRs/issues + 2 internal bug notes)

- **HUNT MODE** Not eligible today — last hunt 2026-04-17 (3 days ago, need 7). Next eligible: 2026-04-24.

### Run stats
- Signals fetched: 2 (both anthropic-changelog false positives)
- Signals acted_on: 0
- Signals analyzed (no action): 2
- Digest-staging items promoted: 4 auto-PRs + 3 needs-approval issues + 2 internal bug notes
- PRs created: 3 new (#7 WS push failures, #8 WS vs Claude Code, #9 consistent design) + 1 updated (#3 SA changelog)
- Issues created: 3 needs-approval (#10, #11, #12) + 1 weekly digest (#13)
- Monday digest: published and digest-staging cleared

---

## 2026-04-18 — Run time: early-morning

- **AUTO-EXECUTED** Claude Code v2.1.113 + v2.1.114 appended to April changelog
  - Confidence: 85%
  - Source: claude-code-releases atom feed signals 145 (Apr 17 21:23) + 164 (Apr 18 02:32)
  - Files: `changelog/2026-04.md` (updated), `WHATS-NEW.md` (updated)
  - PR/Issue: extended existing PR #3 (same branch) + PR comment #4272660123
  - Impact: monthly changelog now covers native-binary migration, `sandbox.network.deniedDomains`, `/loop` Esc-cancel, readline Ctrl+A/E, Agent Teams permission-dialog fix

- **INTERNAL** Digest-staging — anthropic-changelog collector returns Next.js shell, not content
  - Confidence: 20%
  - Source: 3 anthropic-changelog signals (125, 144, 163) all contained only preload CSS + webpack URLs, no SSR'd content
  - Files: `digest-staging.json` (appended entry)
  - PR/Issue: internal only
  - Impact: flags collector bug — needs headless-browser fetch or a different changelog URL

- **INTERNAL** Digest-staging — repo_audit scope + fenced-code false-positive
  - Confidence: 20%
  - Source: repo_audit signal 127 — flagged 2 "broken links" inside a ```markdown code fence in a GSD plan doc
  - Files: `digest-staging.json` (appended entry)
  - PR/Issue: internal only
  - Impact: flags two collector bugs — repo_audit scan_paths resolve under workspace root instead of `agentic-mastermind/`, and broken_link detector doesn't respect fenced code blocks

### Run stats
- Signals fetched: 7 (6 releases, 1 repo_audit) — no transcripts/fathom/linear this run
- Signals acted_on: 2 (both claude-code releases consolidated into PR #3)
- Signals analyzed (no action): 5 (3 broken anthropic scrapes, 1 superseded claude-code release, 1 false-positive repo_audit)
- Hunt Mode: skipped (pending=7, threshold is ≤5)

---

## 2026-04-17 — Hunt Mode skipped (cooldown)

Empty queue; last Hunt Mode ran 2026-04-17 (<7d ago). Exited without audit per PLAYBOOK §4.5.

---

## HUNT MODE — 2026-04-17

**Trigger:** Empty signal queue at run start, no prior `## HUNT MODE` marker in changelog (first hunt ever).
**Budget:** 6 actions. **Used:** 2.

### 5-question gap audit

1. **What's undocumented?** — Top 16 SA gaps are dominated by Website Studio (gaps 001–007, 016 = 8 entries, all high/medium severity from April transcripts). Public repo has zero WS coverage. 3 relevant drafts already staged in `digest-staging.json` items 1–3 (confidence 85–90). **→ Action 1: opened Issue #5 — needs-approval for a Website Studio guide series (push-failures, studio-vs-claude-code, consistent-design-output).**

2. **What's decayed?** — Public `INT` branch currently contains 1 file (a stub `README.md`). Nothing on the repo has had time to go stale (first PRs #1–#3 opened today). **→ No action. Re-evaluate next hunt.**

3. **What's drifting from best practices?** — Claude Code v2.1.111 + v2.1.112 release drift already handled by PR #3 (shipped this morning). No other Claude Code release signals in the last 60 days warranted drift flags. The bigger drift is the stub README itself, which folds into Q4.

4. **What's unlinked?** — Once the 3 open Guardian PRs (#1 Windows setup, #2 copy-before-design, #3 Claude Code changelog) merge, the guides will live under `guides/` and `changelog/` with no entry point — README provides no index. **→ Action 2: opened Issue #6 — needs-approval for README expansion (repo-purpose paragraph, guide index, changelog pointer, contribution flow).**

5. **What's fragile?** — `INT` branch is empty aside from README. No external URLs or CLI commands to audit. **→ No action. Re-evaluate after guides land.**

### Summary

- Opened: Issue #5 (Website Studio guide series — needs-approval)
- Opened: Issue #6 (README index + orientation — needs-approval)
- Shipped zero auto-PRs (regular analyzer already shipped 3 today; avoiding duplication)
- Next hunt eligible: 2026-04-24 (7-day cooldown)

---

## 2026-04-17 — Run time: evening

- **INTERNAL** Collector noise — anthropic-changelog feed produces false positives
  - Source: 3 pending `releases` signals (ids 71, 89, 107) all scraped from `https://docs.anthropic.com/en/docs/about-claude/models` within 45 min
  - Root cause: `collector.py:218` hashes full `resp.content`. Anthropic docs pages are Next.js SPAs with per-request `nonce` attributes on `<link>` tags → content_hash changes every scrape even when the underlying page is unchanged.
  - Action: marked all 3 as `analyzed` (no meaningful version info — pure HTML boilerplate, 0 model-version tokens found in content_preview).
  - Fix suggestion (for JD): strip nonce attrs before hashing, OR switch this feed from `web_scrape` to Anthropic's public release atom feed, OR temporarily remove `anthropic-changelog` from `config.yaml` until the scraper is SPA-aware. This will otherwise recur on every collector run (~every 3h).
  - PR/Issue: internal only

## 2026-04-17 — Run time: afternoon

- **AUTO-EXECUTED** Guide — Windows Claude Code setup via WSL
  - Confidence: 85%
  - Source: Michael Vassar 1-on-1 2026-03-17 + Clayton Joyner 1-on-1 2026-04-10 (both hit WSL networking SSL handshake failures)
  - Files: `guides/windows-claude-code-setup.md` (created on branch guardian/guide-windows-setup-2026-04-17)
  - PR/Issue: [PR #1](https://github.com/jodutoro/AMM-SA/pull/1)
  - Impact: Documents the mirrored-networking `.wslconfig` fix for the single most common Windows onboarding blocker. Cuts future setup from 60 min live support to ~15 min self-serve.

- **AUTO-EXECUTED** Guide — Copy-before-design workflow
  - Confidence: 82%
  - Source: AMM weekly sessions Apr 2 + Apr 9 (Clayton Joyner live demo of Lucidchart production system, 93% revision reduction claim)
  - Files: `guides/copy-before-design-workflow.md` (created)
  - PR/Issue: [PR #2](https://github.com/jodutoro/AMM-SA/pull/2)
  - Impact: Codifies the highest-ROI workflow change surfaced in group sessions — inverts the default web production order. Generalized so it applies beyond one agency's design taxonomy.

- **AUTO-EXECUTED** Changelog + WHATS-NEW — Claude Code v2.1.111 & v2.1.112
  - Confidence: 90%
  - Source: Claude Code releases atom feed (anthropics/claude-code)
  - Files: `changelog/2026-04.md` (created), `WHATS-NEW.md` (created with 3 entries)
  - PR/Issue: [PR #3](https://github.com/jodutoro/AMM-SA/pull/3)
  - Impact: Members now have a curated monthly changelog explaining `/effort xhigh`, Max-tier auto mode, and the v2.1.112 availability-error fix in agency-relevant terms.

- **SUGGESTED** Guide — Your first session after setup (orientation gap)
  - Confidence: 70%
  - Source: Clayton Joyner 1-on-1 2026-04-10 ("I don't even know where to begin")
  - Files: would create `guides/your-first-session-after-setup.md`
  - PR/Issue: [Issue #4](https://github.com/jodutoro/AMM-SA/issues/4) — comment "go" to publish
  - Impact: Would close the post-setup orientation gap with 3 concrete starter commands and a bridge for members migrating from custom Claude projects to agentic Claude Code.

- **INTERNAL** Product feedback — April weekly + 1-on-1 signals
  - Source: fathom-meeting-2-weekly-apr9.md, fathom-meeting-2.md, fathom-meeting-3-weekly-apr2.md, Clayton-Joyner-1on1.txt, Michael-Vassar-Mar17-1on1.txt
  - Files: `sa-issues/gaps.json` (+4: gap-019 MCP docs schemas, gap-020 multi-brand MCP routing, gap-021 Website Studio HTML injection, gap-022 account-limit escalation process), `gaps-sa-export.json` (+4 anonymized), `stack-issues/issues.json` (+3: stack-004 Windows/WSL setup, stack-005 session ergonomics, stack-006 post-setup orientation), `by-member/{bryan-fikes,clayton-joyner,justin-day,justin-hual,michael-vassar}.md` (all appended)
  - PR/Issue: internal only
  - Impact: Clayton Joyner now has a dedicated friction log (first entry). Four new escalation-ready SA issues ready for engineering. Major product-gap theme this run: MCP developer experience (docs, multi-account auth, local-to-platform HTML delivery).

---

## 2026-04-17 — Run time: morning

- **INTERNAL** First full analyzer run — 10 transcript signals processed
  - Confidence: N/A (internal only)
  - Source: 10 transcripts (AMM Monthly Apr13, AMM Weekly Apr09, HIP Creative Apr14, Bryan Fikes 1on1, Michael Vassar Apr06, Jay Cornelius 1on1, Justin Day setup Mar16, Fathom weekly Mar19/Mar26, Session Mar26 chat)
  - Files: `AMM-Internal/product-feedback/by-member/{bryan-fikes,jonathan-giner,justin-day,justin-hual,michael-vassar}.md` (all created), `sa-issues/gaps.json` (+18), `sa-issues/gaps-sa-export.json` (+17), `stack-issues/issues.json` (+3)
  - PR/Issue: internal only
  - Impact: Captured 18 SA product gaps (Website Studio push failures, MCP V2 connection, rate limits, MCP docs schemas, internal linking, Atlas Brain perf, Content Genius latency, multi-brand routing) + 3 stack issues (Windows setup, file structure, Warp/Linux connector). 17 entries flagged escalation-ready for SA engineering.

- **BLOCKED — Public repo access** 8 high-confidence public-repo actions staged (could not execute)
  - Source: `amm-guardian/digest-staging.json`
  - Reason: GitHub MCP returns "Not Found" for `jodutoro/AMM-SA` — token scope likely missing access to the fork. `gh` CLI also not installed.
  - Staged proposals (would have been auto-PRs at >=80% confidence):
    1. `guides/website-studio-push-failures.md` (90%)
    2. `guides/choosing-website-studio-vs-claude-code.md` (85%)
    3. `guides/getting-consistent-design-output.md` (85%)
    4. `changelog/2026-04.md` (90%) — April SA roadmap + tool releases
    5. `guides/windows-setup-workarounds.md` (80%)
  - Staged as needs-approval (60–79%):
    6. `guides/scaling-sa-mcp-at-agency-volume.md` (75%)
    7. `guides/transcript-to-sop-workflow.md` (70%)
    8. `guides/html-attribution-report-from-hubspot.md` (65%)
  - Impact: JD must either grant GitHub MCP access to `jodutoro/AMM-SA` or install `gh` CLI for the next run to execute these.

---

## 2026-04-16 — System Deployed

- **DEPLOYED** Guardian system built and activated
  - Collector: polls transcripts (16 found), Fathom, Linear, release feeds every 3h
  - Analyzer: Claude session 2x daily (6AM/6PM COT)
  - PII scanner: deterministic privacy gate (17/17 tests passing)
  - LaunchAgents installed, collector registered
  - Output: PRs + Issues on `jodutoro/AMM-SA`, internal feedback at `AMM-Internal/product-feedback/`

---

<!-- Guardian appends new entries below this line. Newest at top. -->
