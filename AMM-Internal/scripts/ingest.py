#!/usr/bin/env python3
"""
ingest.py — Claude-powered transcript → data.json pipeline

Usage:
    python3 scripts/ingest.py              # process new files only
    python3 scripts/ingest.py --dry-run   # show what would change, write nothing
    python3 scripts/ingest.py --force     # reprocess all files
"""

import argparse
import json
import os
import sys
from pathlib import Path

# Load .env from repo root before importing anthropic
from dotenv import load_dotenv

REPO_ROOT = Path("/Users/eillacs/Desktop/Agentic/AMM-Internal")
ENV_PATH = Path("/Users/eillacs/Desktop/Agentic/.env")
load_dotenv(dotenv_path=ENV_PATH)

import anthropic

TRANSCRIPTS_DIR = REPO_ROOT / "transcripts"
DATA_JSON_PATH = REPO_ROOT / "dashboard" / "data.json"
MANIFEST_PATH = REPO_ROOT / "scripts" / "ingest_manifest.json"
MAX_CHARS = 80_000
MODEL = "claude-haiku-4-5-20251001"

TRANSCRIPT_EXTENSIONS = {".txt", ".md", ".vtt"}


def load_manifest() -> list[str]:
    if MANIFEST_PATH.exists():
        with open(MANIFEST_PATH) as f:
            data = json.load(f)
        return data.get("processed", [])
    return []


def save_manifest(processed: list[str]) -> None:
    with open(MANIFEST_PATH, "w") as f:
        json.dump({"processed": processed}, f, indent=2)


def load_data_json() -> dict:
    if not DATA_JSON_PATH.exists():
        return {"members": [], "platformGaps": [], "actionItems": []}
    with open(DATA_JSON_PATH) as f:
        return json.load(f)


def save_data_json(data: dict) -> None:
    with open(DATA_JSON_PATH, "w") as f:
        json.dump(data, f, indent=2)


def scan_transcripts() -> list[Path]:
    files = []
    for ext in TRANSCRIPT_EXTENSIONS:
        files.extend(TRANSCRIPTS_DIR.rglob(f"*{ext}"))
    return sorted(files)


def read_file(path: Path) -> str:
    try:
        content = path.read_text(encoding="utf-8", errors="replace")
    except Exception as e:
        print(f"  [warn] Could not read {path}: {e}")
        return ""
    if len(content) > MAX_CHARS:
        content = content[:MAX_CHARS] + "\n[truncated]"
    return content


def build_extraction_prompt(data: dict, filename: str, content: str) -> str:
    member_names = [m["name"] for m in data.get("members", [])]
    gap_titles = [g["title"] for g in data.get("platformGaps", [])]

    return f"""You are analyzing an AMM (Agentic Marketing Mastermind) session transcript or note file.

Current members: {json.dumps(member_names)}
Current platform gaps (titles only): {json.dumps(gap_titles)}

File: {filename}
---
{content}
---

Extract any new or updated information. Return ONLY valid JSON with this structure (omit any key if nothing was found):

{{
  "member_updates": [
    {{
      "name": "exact member name from list above, or new name if genuinely new",
      "status_note": "brief update on what they built or accomplished, or null"
    }}
  ],
  "new_platform_gaps": [
    {{
      "title": "short gap title",
      "description": "what the gap is and who hit it",
      "membersAffected": ["name"]
    }}
  ],
  "new_action_items": [
    {{
      "text": "action item text",
      "owner": "person responsible or null"
    }}
  ]
}}"""


def call_claude(client: anthropic.Anthropic, prompt: str) -> dict | None:
    try:
        message = client.messages.create(
            model=MODEL,
            max_tokens=2048,
            messages=[{"role": "user", "content": prompt}],
        )
        raw = message.content[0].text.strip()

        # Strip markdown code fences if present
        if raw.startswith("```"):
            lines = raw.splitlines()
            # Drop first line (```json or ```) and last line (```)
            inner_lines = []
            in_block = False
            for line in lines:
                if line.startswith("```") and not in_block:
                    in_block = True
                    continue
                if line.startswith("```") and in_block:
                    break
                if in_block:
                    inner_lines.append(line)
            raw = "\n".join(inner_lines)

        return json.loads(raw)
    except json.JSONDecodeError as e:
        print(f"  [warn] Claude returned invalid JSON: {e}")
        return None
    except anthropic.APIError as e:
        print(f"  [warn] Claude API error: {e}")
        return None


def count_updates(extracted: dict) -> int:
    total = 0
    total += len(extracted.get("member_updates", []))
    total += len(extracted.get("new_platform_gaps", []))
    total += len(extracted.get("new_action_items", []))
    return total


def merge_extracted(data: dict, extracted: dict, source_filename: str) -> int:
    """Merge extracted data into the data dict in-place. Returns count of changes applied."""
    changes = 0

    # --- member_updates ---
    for update in extracted.get("member_updates", []):
        name = update.get("name", "").strip()
        status_note = update.get("status_note")
        if not name or not status_note:
            continue

        # Case-insensitive match
        matched = None
        for member in data.get("members", []):
            if member["name"].lower() == name.lower():
                matched = member
                break

        if matched is not None:
            matched["statusNote"] = status_note
            changes += 1
        # If no match, skip unknown names silently (only add if genuinely new — left as-is per spec)

    # --- new_platform_gaps ---
    existing_gap_titles_lower = {
        g["title"].lower() for g in data.get("platformGaps", [])
    }
    for gap in extracted.get("new_platform_gaps", []):
        title = gap.get("title", "").strip()
        if not title:
            continue
        if title.lower() in existing_gap_titles_lower:
            continue

        # Assign next gap ID
        n = len(data.get("platformGaps", [])) + 1
        new_gap = {
            "id": f"gap-{n}",
            "title": title,
            "description": gap.get("description", ""),
            "membersAffected": gap.get("membersAffected", []),
            "effort": "medium",
            "arrEstimate": "TBD",
            "source": source_filename,
        }
        data.setdefault("platformGaps", []).append(new_gap)
        existing_gap_titles_lower.add(title.lower())
        changes += 1

    # --- new_action_items ---
    existing_items_lower = {
        ai["text"].lower() for ai in data.get("actionItems", [])
    }
    for item in extracted.get("new_action_items", []):
        text = item.get("text", "").strip()
        if not text:
            continue
        # Exact match (case-insensitive)
        text_lower = text.lower()
        already_exists = text_lower in existing_items_lower
        if already_exists:
            continue

        new_item = {
            "text": text,
            "owner": item.get("owner"),
            "source": source_filename,
        }
        data.setdefault("actionItems", []).append(new_item)
        existing_items_lower.add(text_lower)
        changes += 1

    return changes


def main():
    parser = argparse.ArgumentParser(description="Ingest AMM transcripts into data.json")
    parser.add_argument("--dry-run", action="store_true", help="Print what would change, write nothing")
    parser.add_argument("--force", action="store_true", help="Reprocess all files, ignore manifest")
    args = parser.parse_args()

    api_key = os.environ.get("ANTHROPIC_API_KEY")
    if not api_key:
        print("[error] ANTHROPIC_API_KEY not found in environment or .env")
        sys.exit(1)

    client = anthropic.Anthropic(api_key=api_key)

    all_files = scan_transcripts()
    processed = load_manifest()
    processed_set = set(processed)

    if args.force:
        new_files = all_files
    else:
        new_files = [f for f in all_files if str(f.resolve()) not in processed_set]

    print(f"[ingest] {len(new_files)} new file(s) to process")

    if not new_files:
        print("Nothing to do.")
        return

    data = load_data_json()
    newly_processed = []
    total_changes = 0

    for file_path in new_files:
        rel = file_path.relative_to(REPO_ROOT)
        content = read_file(file_path)
        if not content:
            print(f"  [skip] {rel} (empty or unreadable)")
            continue

        prompt = build_extraction_prompt(data, file_path.name, content)
        extracted = call_claude(client, prompt)

        if extracted is None:
            print(f"  [warn] {rel} ... skipped (Claude returned bad JSON) — will not retry")
            newly_processed.append(str(file_path.resolve()))
            continue

        num_raw = count_updates(extracted)

        if args.dry_run:
            if num_raw == 0:
                print(f"  (dry-run) {rel} ... no new data")
            else:
                print(f"  (dry-run) {rel} ... would merge ({num_raw} raw extractions)")
                # Show a preview of what would be merged
                for u in extracted.get("member_updates", []):
                    print(f"    member_update: {u.get('name')} → {str(u.get('status_note', ''))[:80]}")
                for g in extracted.get("new_platform_gaps", []):
                    print(f"    new_gap: {g.get('title')}")
                for ai in extracted.get("new_action_items", []):
                    print(f"    new_action_item: {str(ai.get('text', ''))[:80]}")
        else:
            changes = merge_extracted(data, extracted, file_path.name)
            total_changes += changes
            if changes == 0:
                print(f"  {rel} ... no new data")
            else:
                print(f"  {rel} ... merged ({changes} updates)")
            newly_processed.append(str(file_path.resolve()))

    if args.dry_run:
        print("[dry-run] No files written.")
    else:
        if newly_processed or total_changes > 0:
            save_data_json(data)
            updated_manifest = list(processed_set | set(newly_processed))
            save_manifest(updated_manifest)
            print(f"✅ Done. data.json updated ({total_changes} change(s)).")
        else:
            print("Done. No changes.")


if __name__ == "__main__":
    main()
