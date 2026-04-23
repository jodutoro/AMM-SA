#!/usr/bin/env bash
# Send a message to Discord via Webhook
# Usage: bash send-message.sh <webhook_url> <message>

set -e

WEBHOOK_URL="${1:?Usage: send-message.sh <webhook_url> <message>}"
MESSAGE="${2:?Usage: send-message.sh <webhook_url> <message>}"

# Escape special JSON characters
ESCAPED_MESSAGE=$(echo "$MESSAGE" | sed 's/\\/\\\\/g; s/"/\\"/g; s/\n/\\n/g')

RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$WEBHOOK_URL" \
  -H "Content-Type: application/json" \
  -d "{\"content\": \"$ESCAPED_MESSAGE\"}")

if [ "$RESPONSE" = "204" ] || [ "$RESPONSE" = "200" ]; then
  echo "Message sent successfully"
else
  echo "Failed to send message (HTTP $RESPONSE)" >&2
  exit 1
fi
