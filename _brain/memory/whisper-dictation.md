---
name: whisper-dictation
description: Local push-to-talk voice-to-text tool using MLX Whisper on Apple Silicon
type: project
---

Push-to-talk dictation tool at `tools/whisper-dictation/dictate.py`. Hold **Right Option** → speak → release → text is pasted into the active app via clipboard.

**Stack:** MLX Whisper (Apple Silicon, runs fully offline), sounddevice, pynput, pyperclip.

**Model:** `mlx-community/whisper-small-mlx` (~300ms latency). Switch options in `MODEL` constant:
- `whisper-tiny-mlx` → ~150ms, less accurate
- `whisper-small-mlx` → ~300ms, good balance (current default)
- `whisper-large-v3-turbo` → ~1-2s, most accurate

**Run:**
```bash
cd tools/whisper-dictation && source venv/bin/activate && python3 dictate.py
```

**Why:** Low-latency local dictation without cloud dependency. Warmed up at startup, no temp file I/O, sleeps cut to 50+100ms.

**macOS permissions required:** Microphone + Accessibility (System Settings → Privacy & Security → Accessibility → add Terminal/iTerm).
