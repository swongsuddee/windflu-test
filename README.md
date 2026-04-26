# Windflu Playwright Tests

Minimal Playwright scaffold for web UI and API testing against `https://www.windflu.com`.

## Commands

- `npm test` runs the full Playwright suite.
- `npm run test:web` runs both web UI projects.
- `npm run test:web:unauthenticated` runs guest/public web UI coverage.
- `npm run test:web:authenticated` runs authenticated web UI coverage.
- `npm run test:api` runs API tests in `src/test/api`.
- `npm run report` opens the latest HTML report.

## Web UI Project Split

Playwright separates the web UI suite into:

- `web-ui-unauthenticated`: public/guest flows using
  `playwright/.auth/windflu-dev-storage.json`
- `web-ui-authenticated`: authenticated flows that depend on the setup project
  and reuse generated role storage states

Both web UI projects preserve `localStorage.isDev=true`.

## Authenticated Storage

The `global-setup` Playwright setup project can create reusable authenticated
storage states when safe test credentials are provided through environment
variables.

You can keep local test credentials in `.env`. `playwright.config.ts` loads
that file automatically for local runs.

Creator account:

```bash
WINDFLU_CREATOR_EMAIL="creator@example.com" \
WINDFLU_CREATOR_PASSWORD="..." \
npm run test:web:authenticated
```

Generated files are ignored by Git:

- `playwright/.auth/creator-storage.json`

Authenticated tests can reuse the saved state with:

```ts
import { test } from '@playwright/test';
import { creatorStorageStatePath } from '../../../playwright/auth-storage';

test.use({ storageState: creatorStorageStatePath });
```

The setup project reads credentials from environment variables only. Do not
store real login credentials in committed test-data files.

Do not commit credentials, cookies, OTPs, or generated authenticated storage
state files.

## To Do

1. Improve agent skill for test design.

## Unfinish Test Feature Implementation

- Brand create-campaign:
  `BRC-006` to `BRC-008` are still unfinished for budget, payment, and success
  flow coverage.
- Creator registration success design still needs refresh to match the current
  live implementation coverage.
- Legal-policy design/spec still needs full alignment with the latest stable
  content exploration.

## Git Branch Policy

Local branch policy for this repository:

- Direct commits to `main` are blocked.
- Working branches must use one of these prefixes:
  `feature/*`, `fix/*`, `test/*`, `chore/*`
- Changes should merge into `main` through a pull request.

This repository keeps the policy in `.githooks/pre-commit`.

To enable it in a local clone:

```bash
git config core.hooksPath .githooks
chmod +x .githooks/pre-commit
```
