#!/usr/bin/env bash
# Send an email via Resend API
# Usage: bash send-email.sh <api_key> <from> <to> <subject> <html_body>

set -e

API_KEY="${1:?Usage: send-email.sh <api_key> <from> <to> <subject> <html_body>}"
FROM="${2:?Usage: send-email.sh <api_key> <from> <to> <subject> <html_body>}"
TO="${3:?Usage: send-email.sh <api_key> <from> <to> <subject> <html_body>}"
SUBJECT="${4:?Usage: send-email.sh <api_key> <from> <to> <subject> <html_body>}"
HTML_BODY="${5:?Usage: send-email.sh <api_key> <from> <to> <subject> <html_body>}"

# Escape special JSON characters
ESCAPED_SUBJECT=$(echo "$SUBJECT" | sed 's/\\/\\\\/g; s/"/\\"/g')
ESCAPED_BODY=$(echo "$HTML_BODY" | sed 's/\\/\\\\/g; s/"/\\"/g; s/\n/\\n/g')

RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "https://api.resend.com/emails" \
  -H "Authorization: Bearer $API_KEY" \
  -H "Content-Type: application/json" \
  -d "{
    \"from\": \"$FROM\",
    \"to\": [\"$TO\"],
    \"subject\": \"$ESCAPED_SUBJECT\",
    \"html\": \"$ESCAPED_BODY\"
  }")

HTTP_CODE=$(echo "$RESPONSE" | tail -1)
BODY=$(echo "$RESPONSE" | sed '$d')

if [ "$HTTP_CODE" = "200" ]; then
  EMAIL_ID=$(echo "$BODY" | grep -o '"id":"[^"]*"' | head -1 | cut -d'"' -f4)
  echo "Email sent successfully"
  if [ -n "$EMAIL_ID" ]; then
    echo "ID: $EMAIL_ID"
  fi
else
  echo "Failed to send email (HTTP $HTTP_CODE)" >&2
  echo "$BODY" >&2
  exit 1
fi
