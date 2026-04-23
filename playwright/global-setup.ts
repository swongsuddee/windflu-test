import { chromium, type Page } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
import { dirname } from 'node:path';
import { brandStorageStatePath, creatorStorageStatePath } from './auth-storage';

type AuthRole = 'creator' | 'brand';

type AuthAccount = {
  email: string;
  password: string;
};

const baseURL = process.env.WINDFLU_BASE_URL ?? 'https://www.windflu.com';

function accountFromEnv(role: AuthRole): AuthAccount | undefined {
  const prefix = role === 'creator' ? 'WINDFLU_CREATOR' : 'WINDFLU_BRAND';
  const email = process.env[`${prefix}_EMAIL`];
  const password = process.env[`${prefix}_PASSWORD`];

  if (!email || !password) {
    return undefined;
  }

  return { email, password };
}

async function ensureStorageDirectory(storageStatePath: string) {
  await mkdir(dirname(storageStatePath), { recursive: true });
}

async function fillFirstVisible(page: Page, selector: string, value: string) {
  const field = page.locator(selector).first();

  await field.waitFor({ state: 'visible' });
  await field.fill(value);
}

async function expectAuthenticated(page: Page, loginPath: string) {
  await page.waitForLoadState('networkidle').catch(() => {});

  const currentURL = new URL(page.url());
  if (currentURL.pathname === loginPath) {
    throw new Error(`Authentication did not leave ${loginPath}; check the configured credentials.`);
  }
}

async function loginCreator(page: Page, account: AuthAccount) {
  await page.goto(new URL('/login', baseURL).toString());

  const emailLoginButton = page.getByRole('button', {
    name: /อีเมล|email/i,
  });

  if (await emailLoginButton.isVisible().catch(() => false)) {
    await emailLoginButton.click();
  }

  await fillFirstVisible(page, 'input[type="email"]', account.email);
  await fillFirstVisible(page, 'input[type="password"]', account.password);

  await page.getByRole('button', { name: /เข้าสู่ระบบ|login/i }).click();
  await expectAuthenticated(page, '/login');
}

async function loginBrand(page: Page, account: AuthAccount) {
  await page.goto(new URL('/brand/login', baseURL).toString());

  await page.getByPlaceholder('อีเมลบริษัท').fill(account.email);
  await page.getByPlaceholder('รหัสผ่าน').fill(account.password);
  await page.getByRole('button', { name: 'เข้าสู่ระบบ' }).click();

  await expectAuthenticated(page, '/brand/login');
}

async function saveAuthenticatedStorage(
  role: AuthRole,
  account: AuthAccount,
  storageStatePath: string
) {
  await ensureStorageDirectory(storageStatePath);

  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    if (role === 'creator') {
      await loginCreator(page, account);
    } else {
      await loginBrand(page, account);
    }

    await page.context().storageState({ path: storageStatePath });
  } finally {
    await browser.close();
  }
}

export default async function globalSetup() {
  const creatorAccount = accountFromEnv('creator');
  const brandAccount = accountFromEnv('brand');

  if (creatorAccount) {
    await saveAuthenticatedStorage('creator', creatorAccount, creatorStorageStatePath);
  }

  if (brandAccount) {
    await saveAuthenticatedStorage('brand', brandAccount, brandStorageStatePath);
  }
}
