#!/usr/bin/env bash
# Post a message to a Circle community space
# Usage: bash post-to-space.sh <api_key> <community_id> <space_id> <title> <body>
#
# Example:
#   source .env
#   bash integrations/circle/post-to-space.sh "$CIRCLE_API_KEY" "$CIRCLE_COMMUNITY_ID" "12345" "My Post" "Post body here"

set -e

API_KEY="${1:?Usage: post-to-space.sh <api_key> <community_id> <space_id> <title> <body>}"
COMMUNITY_ID="${2:?Usage: post-to-space.sh <api_key> <community_id> <space_id> <title> <body>}"
SPACE_ID="${3:?Usage: post-to-space.sh <api_key> <community_id> <space_id> <title> <body>}"
TITLE="${4:?Usage: post-to-space.sh <api_key> <community_id> <space_id> <title> <body>}"
BODY="${5:?Usage: post-to-space.sh <api_key> <community_id> <space_id> <title> <body>}"

# Escape special JSON characters
ESCAPED_TITLE=$(echo "$TITLE" | sed 's/\\/\\\\/g; s/"/\\"/g')
ESCAPED_BODY=$(echo "$BODY" | sed 's/\\/\\\\/g; s/"/\\"/g; s/\n/\\n/g')

RESPONSE=$(curl -s -X POST "https://app.circle.so/api/v1/posts" \
  -H "Authorization: Bearer $API_KEY" \
  -H "Content-Type: application/json" \
  -d "{
    \"community_id\": \"$COMMUNITY_ID\",
    \"space_id\": \"$SPACE_ID\",
    \"name\": \"$ESCAPED_TITLE\",
    \"body\": \"$ESCAPED_BODY\"
  }")

# Check for error
if echo "$RESPONSE" | grep -q '"error"'; then
  echo "Error posting to Circle:" >&2
  echo "$RESPONSE" >&2
  exit 1
else
  POST_URL=$(echo "$RESPONSE" | grep -o '"url":"[^"]*"' | head -1 | cut -d'"' -f4)
  echo "Post created successfully"
  if [ -n "$POST_URL" ]; then
    echo "URL: $POST_URL"
  fi
fi
