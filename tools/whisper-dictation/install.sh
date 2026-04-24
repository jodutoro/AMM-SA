#!/bin/bash
set -e

echo "Installing dependencies..."
pip install mlx-whisper sounddevice soundfile pyperclip pynput numpy

echo ""
echo "Done. First run will download the model (~800MB), subsequent runs are instant."
echo ""
echo "Run with: python3 dictate.py"
echo ""
echo "IMPORTANT — grant two macOS permissions when prompted:"
echo "  1. Microphone (for recording)"
echo "  2. Accessibility (for keyboard listener + paste)"
echo "     System Settings → Privacy & Security → Accessibility → add Terminal (or iTerm)"
