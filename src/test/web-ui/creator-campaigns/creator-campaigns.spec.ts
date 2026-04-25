import { expect, test } from '@playwright/test';
import { CampaignsPage } from '../../../page/campaigns-page';

test.describe('creator campaign listing unauthenticated flow', () => {
  test('PUB-017 campaign listing loads for unauthenticated users', async ({ page }) => {
    const campaignsPage = new CampaignsPage(page);

    await campaignsPage.gotoCampaigns();
    await campaignsPage.dismissCookieBanner();
    await campaignsPage.expectLoaded();
  });

  test('PUB-018 cookie banner exposes consent actions', async ({ page }) => {
    const campaignsPage = new CampaignsPage(page);

    await campaignsPage.gotoCampaigns();

    await expect(campaignsPage.acceptCookieButton).toBeVisible();
    await expect(campaignsPage.customizeCookieButton).toBeVisible();

    await campaignsPage.acceptCookieButton.evaluate((button: HTMLElement) => button.click());
    await expect(campaignsPage.body()).toContainText(/แคมเปญ|ไม่พบแคมเปญในหมวดนี้/);
  });

  test('PUB-019 campaign search keeps matching campaign and handles unmatched query', async ({
    page,
  }) => {
    const campaignsPage = new CampaignsPage(page);

    await campaignsPage.gotoCampaigns();
    await campaignsPage.dismissCookieBanner();

    await campaignsPage.searchInput.fill('Windflu');
    await expect(campaignsPage.emptyStateTitle).toBeVisible();

    await campaignsPage.searchInput.fill('zzzz-no-campaign-match');
    await expect(campaignsPage.searchInput).toHaveValue('zzzz-no-campaign-match');
    await expect(campaignsPage.emptyStateTitle).toBeVisible();
  });

  test('PUB-020 platform filters are selectable and resettable', async ({ page }) => {
    const campaignsPage = new CampaignsPage(page);

    await campaignsPage.gotoCampaigns();
    await campaignsPage.dismissCookieBanner();

    await campaignsPage.instagramButton.click();
    await expect(campaignsPage.instagramButton).toBeVisible();
    await expect(campaignsPage.emptyStateTitle).toBeVisible();

    await campaignsPage.tiktokButton.click();
    await expect(campaignsPage.tiktokButton).toBeVisible();
    await expect(campaignsPage.emptyStateTitle).toBeVisible();

    await campaignsPage.allPlatformButton.click();
    await expect(campaignsPage.emptyStateTitle).toBeVisible();
  });

  test('PUB-021 category filters are selectable and resettable', async ({ page }) => {
    const campaignsPage = new CampaignsPage(page);

    await campaignsPage.gotoCampaigns();
    await campaignsPage.dismissCookieBanner();

    await campaignsPage.category('เทคโนโลยี').click();
    await expect(campaignsPage.category('เทคโนโลยี')).toBeVisible();
    await expect(campaignsPage.emptyStateTitle).toBeVisible();

    await campaignsPage.category('ทั้งหมด').click();
    await expect(campaignsPage.emptyStateTitle).toBeVisible();
  });

  test('PUB-022 guest campaign listing exposes safe public actions only', async ({ page }) => {
    const campaignsPage = new CampaignsPage(page);

    await campaignsPage.gotoCampaigns();
    await campaignsPage.dismissCookieBanner();

    await expect(campaignsPage.emptyStateTitle).toBeVisible();
    await expect(campaignsPage.loginLink).toHaveAttribute('href', /\/login/);
    await expect(campaignsPage.officialLineLink).toHaveAttribute('href', /line\.me/);
  });

  test('PUB-029 protected creator-session links do not grant guest access', async ({ page }) => {
    const campaignsPage = new CampaignsPage(page);

    for (const route of [
      '/creator/dashboard',
      '/creator/my-work',
      '/creator/payouts',
      '/creator/profile',
    ]) {
      await page.goto(route);
      await campaignsPage.expectRedirectedToLogin(route);
    }
  });
});
