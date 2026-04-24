# Discord Integration

Send messages to Discord channels via webhooks.

## Setup

1. Open your Discord server
2. Go to **Server Settings → Integrations → Webhooks**
3. Click **New Webhook**
4. Choose the target channel and copy the webhook URL
5. Add to your `.env`:

```
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/...
```

## Usage

```bash
source .env
bash integrations/discord/send-message.sh "$DISCORD_WEBHOOK_URL" "Your message here"
```

Or use the `/send-discord` command in Claude Code.

## Notes

- Discord webhooks return HTTP 204 on success (not 200)
- Message content supports Discord markdown: `**bold**`, `*italic*`, `` `code` ``
- Max message length: 2000 characters
- No authentication beyond the webhook URL itself
