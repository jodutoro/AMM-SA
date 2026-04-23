# Plans

This folder is where you store execution plans for each client, organized by month.

## Structure

```
plans/
├── examples/          ← filled-in examples to learn from
│   ├── example-seo-onboarding.yaml
│   ├── example-monthly-seo.yaml
│   └── example-gbp-optimization.yaml
└── clients/           ← your live client plans (create this yourself)
    ├── acme-roofing/
    │   ├── 2026-04-seo-onboarding.yaml
    │   └── 2026-05-monthly-seo.yaml
    └── coastal-dental/
        └── 2026-04-gbp-optimization.yaml
```

## How It Works

1. Find the right template in `workflows/`
2. Copy it into `plans/clients/{client-slug}/`
3. Rename it: `{YYYY-MM}-{workflow-name}.yaml`
4. Fill in the client info, IDs, and config fields
5. Open Claude Code and run the matching slash command — it will use your plan

## Naming Convention

| Workflow | Template | Slash Command |
|----------|----------|---------------|
| New client SEO setup | `seo-onboarding.yaml` | `/run-seo` |
| Monthly SEO cycle | `monthly-seo.yaml` | `/run-seo` |
| GBP first-time optimization | `gbp-optimization.yaml` | `/run-gbp` |
| GBP monthly maintenance | `gbp-monthly.yaml` | `/run-gbp` |
| PPC campaign launch | `ppc-launch.yaml` | `/run-ppc` |
| Authority building | `authority-building.yaml` | `/run-pr` |
| LLM visibility audit | `llm-visibility.yaml` | `/run-visibility` |

## Tips

- IDs fill in as steps complete — start with just the client info and config
- Keep one file per workflow per month — don't reuse files across months
- The `results:` field at the bottom is where Claude logs what actually happened
