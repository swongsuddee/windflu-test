# Authenticated Exploration Note

Date: 2026-04-23

## Status

Real authenticated exploration is currently blocked in this workspace because the
role-specific Playwright storage states are missing.

Observed files in `playwright/.auth/`:

- Present: `windflu-dev-storage.json` (guest; `localStorage.isDev=true`)
- Missing: `windflu-creator-storage.json`
- Missing: `windflu-brand-storage.json`

## What Is Needed

Generate role-specific storage states using Playwright global setup by providing
safe test credentials through environment variables:

- `WINDFLU_CREATOR_EMAIL`, `WINDFLU_CREATOR_PASSWORD`
- `WINDFLU_BRAND_EMAIL`, `WINDFLU_BRAND_PASSWORD`

The generated files are ignored by Git and must not be committed.

## How To Generate

Example commands:

```bash
WINDFLU_CREATOR_EMAIL="..." WINDFLU_CREATOR_PASSWORD="..." npm run test:web
WINDFLU_BRAND_EMAIL="..." WINDFLU_BRAND_PASSWORD="..." npm run test:web
```

After generation, authenticated exploration should be re-run using:

- Creator: `playwright/.auth/windflu-creator-storage.json`
- Brand: `playwright/.auth/windflu-brand-storage.json`
