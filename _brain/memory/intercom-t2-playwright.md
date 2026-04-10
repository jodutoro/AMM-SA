---
name: intercom-t2-playwright recording system
description: Playwright auto-recording system added to T2 triage pipeline — video capture, QP impersonation, session auth, upload targets
type: project
---

# T2 Triage — Playwright Auto-Recording System

**Added to:** `Work stuff/intercom-t2-triage/`
**Purpose:** Auto-generates `.webm` screen recordings when conversations lack Jam/Loom/YouTube/Vimeo URLs; attaches recording URL to ticket's `debug_clues` field.

---

## Four Core Functions (`playwright_recorder.py`)

| Function | What it does |
|----------|-------------|
| `has_recording(conversation)` | Scans `conversation["attachments"]` + `conversation["transcript"]` for video URLs |
| `generate_playwright_script(steps, product_area, qp_url)` | Calls Claude AI to generate self-contained Playwright Python script |
| `record_steps(script)` | Runs script in subprocess with `record_video_dir` flag; returns `.webm` path |
| `upload_video(path)` | Uploads to catbox.moe (permanent, no auth); fallback → tmpfiles.org (60-day TTL) |

---

## Auth Pattern — Saved Browser Session (NOT credentials)

- **Session file:** `~/.sa_session.json` (path overridable via `SA_SESSION_PATH` env var)
- **One-time setup:** `playwright_recorder.py --save-session` → opens real Chrome → user logs in via Google OAuth → session saved
- **Execution:** All recordings load `storage_state=SA_SESSION_PATH` → no login automation, no Google OAuth issues
- **Gotcha:** Session must be re-saved if user logs out or session expires

---

## Quantum Puppy (QP) Impersonation Flow

1. Load saved session (authenticated as JD)
2. Navigate to `conv["qp_link"]`
3. Click "Log in as customer": `page.locator("a:has-text('Log in as customer')")`
4. Navigate to product area URL from `PRODUCT_AREA_URLS` map
5. Reproduce steps from triage result
6. **Fallback:** If `qp_link` is empty → use saved session directly (no impersonation)

---

## Product Area URL Map

```python
PRODUCT_AREA_URLS = {
    "OTTO SEO":           "https://app.searchatlas.com/otto-seo/",
    "Site Audit":         "https://app.searchatlas.com/site-audit/",
    "Content Assistant":  "https://app.searchatlas.com/content-assistant/",
    "Digital PR":         "https://app.searchatlas.com/digital-pr/",
    "Website Studio":     "https://app.searchatlas.com/website-studio/",
    "Local SEO":          "https://app.searchatlas.com/local-seo/",
}
DEFAULT_URL = "https://app.searchatlas.com/"
```

---

## Integration in `main.py` (`apply_triage_result`)

```python
if not has_recording(conv):
    steps = triage_dict.get("steps_to_reproduce", "")
    product_area = triage_dict.get("product_area", "")
    qp_url = conv.get("qp_link", "")
    if steps and steps != "N/A":
        script = generate_playwright_script(steps, product_area, qp_url)
        executor.submit(record_steps, script)  # async non-blocking
```

**Non-fatal:** Recording failure still creates ticket normally — video just not attached.

---

## Script Generation Prompt Pattern

Claude receives: product area name, QP URL or "not available", destination product area URL, steps to reproduce (unstructured text).
Output: Self-contained Python using only `playwright.sync_api`, `os`, `time`, `re` — no external dependencies.

---

## Ticket Quality Audit Themes (from `audit_classifications.py`)

7 themes from Linear engineer comments on T2-triaged tickets:
- `missing_steps` — incomplete reproduction steps
- `wrong_product_area` — routed to wrong team
- `vague_description` — summary lacks context
- `missing_context` — insufficient background
- `duplicate_ticket` — existing issue duplicate
- `positive` — praise/fix confirmation
- `other` — miscellaneous

**Audit output:** `audit_ticket_quality_YYYYMMDD.csv` (columns: identifier, title, comment_author, comment_body, theme)

---

## Dependencies

- `playwright>=1.44.0` + `playwright install chromium`
- `anthropic>=0.25.0` (existing, reused for script generation)
- `SA_SESSION_PATH` env var (default: `~/.sa_session.json`)
- `ANTHROPIC_API_KEY` (existing, reused)

**Why:** Tickets without video evidence were harder for engineers to reproduce; auto-recording closes the evidence gap without requiring agents to manually operate a browser.
**How to apply:** The recording system is non-fatal — never block ticket creation waiting for video. Re-save session (`--save-session`) if recordings start failing auth. QP impersonation requires a valid `qp_link` in the conversation object.
