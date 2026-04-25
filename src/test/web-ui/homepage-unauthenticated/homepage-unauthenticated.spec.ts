import { expect, test } from '@playwright/test';
import { HomePage } from '../../../page/home-page';

test.describe('homepage unauthenticated flow', () => {
  test('PUB-001 homepage loads successfully', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.gotoHome();
    await homePage.expectLoaded();
  });

  test('PUB-002 brand navigation routes unauthenticated users to brand login', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.gotoHome();
    await homePage.brandLink.click();
    await homePage.expectPath(/\/brand\/login$/);
  });

  test('PUB-030 campaigns navigation routes unauthenticated users to campaign discovery', async ({
    page,
  }) => {
    const homePage = new HomePage(page);

    await homePage.gotoHome();
    await homePage.campaignsLink.click();
    await homePage.expectPath(/\/creator\/campaigns$/);
  });

  test('PUB-031 Windflu logo remains a safe homepage return link', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.gotoHome();
    await expect(homePage.logoLink).toHaveAttribute('href', '/');
  });

  test('PUB-003 creator CTA routes unauthenticated users to creator login', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.gotoHome();
    await homePage.clipperCta.click();

    await homePage.expectPath(/\/login$/);
    await expect(page.getByText('เข้าสู่ระบบบัญชีของคุณ')).toBeVisible();
  });

  test('PUB-005 footer legal links route to policy pages', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.gotoHome();
    await homePage.privacyLink.click();
    await homePage.expectPath(/\/policy\?tab=privacy_policy$/);

    await homePage.gotoHome();
    await homePage.termsLink.click();
    await homePage.expectPath(/\/policy\?tab=terms_and_conditions$/);
  });
});
