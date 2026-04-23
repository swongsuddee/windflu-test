# Windflu Playwright Tests

Minimal Playwright scaffold for web UI and API testing against `https://www.windflu.com`.

## Commands

- `npm test` runs the full Playwright suite.
- `npm run test:web` runs web UI tests in `tests/web-ui`.
- `npm run test:api` runs API tests in `tests/api`.
- `npm run report` opens the latest HTML report.

## Authenticated Storage

Playwright global setup can create reusable authenticated storage states when
safe test credentials are provided through environment variables.

Creator account:

```bash
WINDFLU_CREATOR_EMAIL="creator@example.com" \
WINDFLU_CREATOR_PASSWORD="..." \
npm run test:web
```

Brand account:

```bash
WINDFLU_BRAND_EMAIL="brand@example.com" \
WINDFLU_BRAND_PASSWORD="..." \
npm run test:web
```

Generated files are ignored by Git:

- `playwright/.auth/windflu-creator-storage.json`
- `playwright/.auth/windflu-brand-storage.json`

Authenticated tests can reuse the saved state with:

```ts
import { test } from '@playwright/test';
import { creatorStorageStatePath } from '../../playwright/auth-storage';

test.use({ storageState: creatorStorageStatePath });
```

Do not commit credentials, cookies, OTPs, or generated authenticated storage
state files.
