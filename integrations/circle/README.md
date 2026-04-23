# Circle Community Integration

Post updates and reports to Circle community spaces.

## Setup

1. Go to your Circle community → Settings → API
2. Generate an API key
3. Find your Community ID (in the URL or API settings)
4. Add both to your `.env` file:

```
CIRCLE_API_KEY=your_api_key_here
CIRCLE_COMMUNITY_ID=your_community_id
```

## Usage

### List Available Spaces

```bash
source .env
curl -s -H "Authorization: Bearer $CIRCLE_API_KEY" \
  "https://app.circle.so/api/v1/spaces?community_id=$CIRCLE_COMMUNITY_ID" | python3 -m json.tool
```

### Post to a Space

```bash
source .env
bash integrations/circle/post-to-space.sh \
  "$CIRCLE_API_KEY" \
  "$CIRCLE_COMMUNITY_ID" \
  "<space_id>" \
  "Post Title" \
  "Post body in markdown"
```

### From Claude Code

Use the `/send-circle` command — it handles space selection, formatting, and posting.

## Notes

- Circle API uses Bearer token authentication
- Posts support markdown formatting in the body
- Community ID and API key are secrets — never commit them
- API docs: https://api.circle.so/docs
