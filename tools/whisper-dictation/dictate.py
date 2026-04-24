#!/usr/bin/env python3
"""Push-to-talk dictation — hold Right Option → speak → release → types into active app."""

import threading
import time

import numpy as np
import pyperclip
import sounddevice as sd
import mlx_whisper
from pynput import keyboard
from pynput.keyboard import Controller, Key

SAMPLE_RATE = 16000

# Speed vs accuracy tradeoff:
#   tiny  → ~150ms, least accurate
#   small → ~300ms, good for dictation  ← default
#   large-v3-turbo → ~1-2s, most accurate
MODEL = "mlx-community/whisper-small-mlx"

_recording = False
_frames = []
_lock = threading.Lock()
_kb = Controller()


def _warmup():
    silence = np.zeros(SAMPLE_RATE, dtype=np.float32)
    mlx_whisper.transcribe(silence, path_or_hf_repo=MODEL)
    print("Ready — hold Right Option to speak")


def _transcribe_and_type():
    with _lock:
        frames = list(_frames)

    if len(frames) < 3:
        return

    audio = np.concatenate(frames).flatten().astype(np.float32)
    result = mlx_whisper.transcribe(audio, path_or_hf_repo=MODEL)
    text = result["text"].strip()

    if not text:
        return

    print(f"→ {text}")

    prev = pyperclip.paste()
    pyperclip.copy(text)
    time.sleep(0.05)
    _kb.press(Key.cmd)
    _kb.press("v")
    _kb.release("v")
    _kb.release(Key.cmd)
    time.sleep(0.1)
    pyperclip.copy(prev)


def on_press(key):
    global _recording, _frames
    if key == Key.alt_r and not _recording:
        with _lock:
            _recording = True
            _frames = []
        print("🎙")


def on_release(key):
    global _recording
    if key == Key.alt_r and _recording:
        with _lock:
            _recording = False
        threading.Thread(target=_transcribe_and_type, daemon=True).start()


def _audio_callback(indata, frames, t, status):
    if _recording:
        _frames.append(indata.copy())


if __name__ == "__main__":
    print(f"Warming up {MODEL}...")
    threading.Thread(target=_warmup, daemon=False).start()

    with sd.InputStream(samplerate=SAMPLE_RATE, channels=1, callback=_audio_callback):
        with keyboard.Listener(on_press=on_press, on_release=on_release) as listener:
            listener.join()
