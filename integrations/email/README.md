# Email Integration (Resend)

Send emails via the [Resend](https://resend.com) API. Simple REST API, no SMTP config needed. Free tier: 100 emails/day.

## Setup

1. Sign up at [resend.com](https://resend.com)
2. Go to **API Keys** and create a new key
3. (Optional) Verify your sender domain under **Domains**
4. Add to your `.env`:

```
RESEND_API_KEY=your_resend_api_key_here
EMAIL_FROM=reports@yourdomain.com
```

**Note:** For testing without a verified domain, use `onboarding@resend.dev` as the from address.

## Usage

```bash
source .env
bash integrations/email/send-email.sh "$RESEND_API_KEY" "$EMAIL_FROM" "client@example.com" "Monthly Report" "<h1>Report</h1><p>Details here</p>"
```

Or use the `/send-email` command in Claude Code.

## Notes

- Resend returns HTTP 200 with a JSON `{ "id": "..." }` on success
- HTML body is supported — use it for formatted reports
- Free tier: 100 emails/day, 3000/month
- Must verify sender domain for production use (or use `onboarding@resend.dev` for testing)
