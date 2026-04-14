---
name: Jonathan Work Schedule
description: Jonathan's rotating shift schedule — morning (5AM-3PM) vs noon (10AM-7PM), alternating weeks, Bogota timezone
type: user
---

Jonathan (JD) works a **rotating bi-weekly shift** at SearchAtlas:

| Week type | Shift hours (Bogota, UTC-5) |
|-----------|---------------------------|
| Morning   | 5:00 AM – 3:00 PM         |
| Noon      | 10:00 AM – 7:00 PM        |

- Shifts alternate every week (Mon–Fri)
- Timezone: **America/Bogota (UTC-5)** — no DST
- Reference anchor: **2026-03-30 is a confirmed morning week** (ISO week 13, odd)
- Parity rule: elapsed full weeks from 2026-03-30 Monday — even = morning, odd = noon

## Cron timing implications
- Morning week EOD report: fires at **15:05 Bogota = 20:05 UTC** (Mon–Fri)
- Noon week EOD report: fires at **19:05 Bogota = 00:05 UTC next day** (Tue–Sat)
- Morning brief morning week: cron fires at **10:00 UTC** (5AM Bogota)
- Morning brief noon week: cron fires at **15:00 UTC** (10AM Bogota)

## SHIFT_WEEK env var
`SHIFT_WEEK` in `/Users/eillacs/Desktop/Agentic/.env` must be updated every Sunday:
- `SHIFT_WEEK=morning` — morning week
- `SHIFT_WEEK=noon` — noon week

The EOD cron script `eod_cron.sh` reads this to gate which cron entry fires.
