import { test as setup, type Page } from '@playwright/test';
import { existsSync } from 'fs';
import { mkdir } from 'node:fs/promises';
import { dirname } from 'node:path';
import { CreatorLoginPage } from '../../page/creator-login-page';
import { creatorStorageStatePath, devStorageStatePath } from '../../../playwright/auth-storage';
import { getCreatorLoginCredentials } from '../../test-data/login-test-data';

type AuthSetupResult = 'created' | 'reused' | 'missing_credentials';

async function ensureStorageDirectory(storageStatePath: string) {
  await mkdir(dirname(storageStatePath), { recursive: true });
}

async function expectAuthenticated(page: Page, loginPath: string) {
  await page
    .waitForURL((url) => url.pathname !== loginPath, {
      timeout: 10_000,
    })
    .catch(() => {});

  if (new URL(page.url()).pathname === loginPath) {
    throw new Error(`Authentication did not leave ${loginPath}; check the configured credentials.`);
  }
}

async function saveCreatorStorageState(page: Page, baseURL: string, storageStatePath: string) {
  const credentials = getCreatorLoginCredentials();

  if (!credentials) {
    return existsSync(storageStatePath) ? 'reused' : 'missing_credentials';
  }

  const creatorLoginPage = new CreatorLoginPage(page);

  await creatorLoginPage.gotoLogin();
  await creatorLoginPage.expectLoaded();
  await creatorLoginPage.loginWithEmail(credentials.email, credentials.password);

  await expectAuthenticated(page, '/login');
  await ensureStorageDirectory(storageStatePath);
  await page.context().storageState({ path: storageStatePath });

  if (!existsSync(storageStatePath)) {
    throw new Error(`Creator storage state was not written to ${storageStatePath}.`);
  }

  return 'created' satisfies AuthSetupResult;
}

setup('create authenticated storage states from dev base state', async ({ browser, baseURL }) => {
  const resolvedBaseURL = baseURL ?? 'https://www.windflu.com';

  const creatorContext = await browser.newContext({ storageState: devStorageStatePath });
  const creatorPage = await creatorContext.newPage();
  let creatorResult: AuthSetupResult;

  try {
    creatorResult = await saveCreatorStorageState(
      creatorPage,
      resolvedBaseURL,
      creatorStorageStatePath
    );
  } finally {
    await creatorContext.close();
  }

  console.info(
    [`creator storage: ${creatorResult}`, `creator path: ${creatorStorageStatePath}`].join('\n')
  );
});
