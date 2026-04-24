# Slack Integration

Send messages to Slack channels using Incoming Webhooks.

## Setup

1. Go to [Slack Incoming Webhooks](https://api.slack.com/messaging/webhooks)
2. Create a new webhook for your workspace and channel
3. Copy the webhook URL
4. Add it to your `.env` file:

```
SLACK_WEBHOOK_URL=your_slack_webhook_url_here
```

## Usage

### From the command line

```bash
source .env
bash integrations/slack/send-message.sh "$SLACK_WEBHOOK_URL" "Your message here"
```

### From Claude Code

Use the `/send-slack` command — it handles formatting and sending.

## Message Formatting

Slack uses [mrkdwn](https://api.slack.com/reference/surfaces/formatting) syntax:

| Format | Syntax |
|--------|--------|
| Bold | `*bold*` |
| Italic | `_italic_` |
| Link | `<https://example.com\|Link text>` |
| Code | `` `code` `` |
| List | `- item` or `• item` |

## Notes

- Webhook URLs are secrets — never commit them to version control
- Each webhook is tied to a specific channel
- Rate limit: 1 message per second per webhook
