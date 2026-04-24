#!/usr/bin/env python3
"""Gmail OAuth2 Setup — one-time script to obtain credentials for the AMM Guardian collector.

Steps:
1. Go to Google Cloud Console → APIs & Services → Credentials
2. Create OAuth 2.0 Client ID (Desktop app type)
3. Download the JSON and save it as amm-guardian/gmail_client_secret.json
4. Run: python3 amm-guardian/setup_gmail_auth.py
5. Complete the browser auth flow
6. The refresh token is printed and written to .env as GMAIL_REFRESH_TOKEN

Scope used: https://www.googleapis.com/auth/gmail.readonly
"""

import json
import os
import sys
import webbrowser
from http.server import BaseHTTPRequestHandler, HTTPServer
from pathlib import Path
from urllib.parse import parse_qs, urlencode, urlparse

import httpx
from dotenv import load_dotenv, set_key

ROOT = Path(__file__).parent
DOTENV_PATH = ROOT.parent / ".env"
CLIENT_SECRET_FILE = ROOT / "gmail_client_secret.json"

SCOPES = ["https://www.googleapis.com/auth/gmail.readonly"]
REDIRECT_URI = "http://localhost:8766/oauth2callback"

load_dotenv(DOTENV_PATH)


def load_client_secrets() -> dict:
    if not CLIENT_SECRET_FILE.exists():
        print(
            f"\nMissing: {CLIENT_SECRET_FILE}\n"
            "Steps:\n"
            "  1. Open https://console.cloud.google.com/apis/credentials\n"
            "  2. Create OAuth 2.0 Client ID → Desktop app\n"
            "  3. Download JSON → save as amm-guardian/gmail_client_secret.json\n"
            "  4. Re-run this script\n",
            file=sys.stderr,
        )
        sys.exit(1)

    raw = json.loads(CLIENT_SECRET_FILE.read_text())
    # File is either top-level or wrapped in 'installed'/'web'
    return raw.get("installed", raw.get("web", raw))


def build_auth_url(client_id: str) -> str:
    params = {
        "client_id": client_id,
        "redirect_uri": REDIRECT_URI,
        "response_type": "code",
        "scope": " ".join(SCOPES),
        "access_type": "offline",
        "prompt": "consent",
    }
    return "https://accounts.google.com/o/oauth2/v2/auth?" + urlencode(params)


class CallbackHandler(BaseHTTPRequestHandler):
    auth_code: str | None = None

    def do_GET(self):
        parsed = urlparse(self.path)
        if parsed.path == "/oauth2callback":
            qs = parse_qs(parsed.query)
            CallbackHandler.auth_code = qs.get("code", [None])[0]
            self.send_response(200)
            self.end_headers()
            self.wfile.write(b"<h2>Auth complete - you can close this tab.</h2>")
        else:
            self.send_response(404)
            self.end_headers()

    def log_message(self, *args):
        pass  # suppress HTTP log noise


def exchange_code(code: str, client_id: str, client_secret: str) -> dict:
    resp = httpx.post(
        "https://oauth2.googleapis.com/token",
        data={
            "code": code,
            "client_id": client_id,
            "client_secret": client_secret,
            "redirect_uri": REDIRECT_URI,
            "grant_type": "authorization_code",
        },
        timeout=30,
    )
    resp.raise_for_status()
    return resp.json()


def main():
    secrets = load_client_secrets()
    client_id = secrets["client_id"]
    client_secret = secrets["client_secret"]

    auth_url = build_auth_url(client_id)
    print(f"\nOpening browser for Gmail auth...\n{auth_url}\n")
    webbrowser.open(auth_url)

    print("Waiting for OAuth callback on http://localhost:8766 ...")
    server = HTTPServer(("localhost", 8766), CallbackHandler)
    server.handle_request()  # one request only

    code = CallbackHandler.auth_code
    if not code:
        print("No auth code received — aborting.", file=sys.stderr)
        sys.exit(1)

    tokens = exchange_code(code, client_id, client_secret)
    refresh_token = tokens.get("refresh_token")
    if not refresh_token:
        print(
            "No refresh_token in response. Make sure prompt=consent was sent "
            "and this is a fresh auth (revoke existing access first if needed).",
            file=sys.stderr,
        )
        print(f"Token response: {tokens}", file=sys.stderr)
        sys.exit(1)

    # Persist to .env
    set_key(str(DOTENV_PATH), "GMAIL_REFRESH_TOKEN", refresh_token)
    set_key(str(DOTENV_PATH), "GMAIL_CLIENT_ID", client_id)
    set_key(str(DOTENV_PATH), "GMAIL_CLIENT_SECRET", client_secret)

    print(f"\nSuccess! Tokens written to {DOTENV_PATH}")
    print(f"  GMAIL_REFRESH_TOKEN = {refresh_token[:20]}...")
    print("\nThe AMM Guardian Gmail collector will use these on next run.")


if __name__ == "__main__":
    main()
