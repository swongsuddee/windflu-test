import { existsSync } from 'fs';
import { mkdir } from 'node:fs/promises';
import { dirname } from 'node:path';
import type { Page } from '@playwright/test';

type LoginCredentials = {
  email: string;
  password: string;
};

export type AuthSetupResult = 'created' | 'reused' | 'missing_credentials';

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

type SaveAuthenticatedStorageStateArgs = {
  credentials?: LoginCredentials;
  loginPath: string;
  page: Page;
  performLogin: (credentials: LoginCredentials) => Promise<void>;
  storageStatePath: string;
};

export async function saveAuthenticatedStorageState({
  credentials,
  loginPath,
  page,
  performLogin,
  storageStatePath,
}: SaveAuthenticatedStorageStateArgs): Promise<AuthSetupResult> {
  if (!credentials) {
    return existsSync(storageStatePath) ? 'reused' : 'missing_credentials';
  }

  await performLogin(credentials);
  await expectAuthenticated(page, loginPath);
  await ensureStorageDirectory(storageStatePath);
  await page.context().storageState({ path: storageStatePath });

  if (!existsSync(storageStatePath)) {
    throw new Error(`Storage state was not written to ${storageStatePath}.`);
  }

  return 'created';
}
