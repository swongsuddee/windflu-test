import { expect, test } from '@playwright/test';
import { CampaignDetailPage } from '../../../page/campaign-detail-page';

test.describe('campaign detail unauthenticated flow', () => {
  test('PUB-023 campaign detail route loads unavailable-state messaging safely', async ({
    page,
  }) => {
    const campaignDetailPage = new CampaignDetailPage(page);

    await campaignDetailPage.gotoCampaignDetail();
    await campaignDetailPage.dismissCookieBanner();
    await campaignDetailPage.expectHeaderLoaded();
  });

  test('PUB-024 unavailable campaign detail provides a safe return path', async ({ page }) => {
    const campaignDetailPage = new CampaignDetailPage(page);

    await campaignDetailPage.gotoCampaignDetail();
    await campaignDetailPage.dismissCookieBanner();

    await campaignDetailPage.backToCampaignsLink.click();
    await expect(page).toHaveURL(/\/creator\/campaigns$/);
    await expect(page.getByText('แคมเปญ').first()).toBeVisible();
  });

  test('PUB-025 unavailable campaign detail does not expose stale interactive controls', async ({
    page,
  }) => {
    const campaignDetailPage = new CampaignDetailPage(page);

    await campaignDetailPage.gotoCampaignDetail();
    await campaignDetailPage.dismissCookieBanner();

    await expect(page.getByRole('button', { name: 'ส่ง Clip Campaign' })).toHaveCount(0);
    await expect(page.locator('input[placeholder="0"]').first()).toHaveCount(0);
    await expect(page.getByText('Overview', { exact: true })).toHaveCount(0);
  });

  test('PUB-026 unavailable campaign detail keeps guest login entry visible', async ({ page }) => {
    const campaignDetailPage = new CampaignDetailPage(page);

    await campaignDetailPage.gotoCampaignDetail();
    await campaignDetailPage.dismissCookieBanner();

    await expect(campaignDetailPage.loginLink).toHaveAttribute('href', /\/login/);
    await expect(campaignDetailPage.notFoundTitle).toBeVisible();
  });

  test('PUB-027 protected creator-session routes remain auth-gated from campaign detail context', async ({
    page,
  }) => {
    const campaignDetailPage = new CampaignDetailPage(page);

    for (const route of [
      '/creator/dashboard',
      '/creator/my-work',
      '/creator/payouts',
      '/creator/profile',
    ]) {
      await page.goto(route);
      await campaignDetailPage.expectRedirectedToLogin(route);
    }
  });
});
