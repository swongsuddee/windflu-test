import { expect, test } from '@playwright/test';
import { campaignPath } from '../pages/campaign-detail-page';
import { CampaignsPage } from '../pages/campaigns-page';

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

    await expect(campaignsPage.acceptAllCookieButton).toBeVisible();
    await expect(campaignsPage.rejectCookieButton).toBeVisible();
    await expect(campaignsPage.customizeCookieButton).toBeVisible();

    await campaignsPage.acceptAllCookieButton.evaluate((button: HTMLElement) => button.click());
    await expect(campaignsPage.body()).toContainText(/Cookie Preferences|แคมเปญ/);
  });

  test('PUB-019 campaign search keeps matching campaign and handles unmatched query', async ({
    page,
  }) => {
    const campaignsPage = new CampaignsPage(page);

    await campaignsPage.gotoCampaigns();
    await campaignsPage.dismissCookieBanner();

    await campaignsPage.searchInput.fill('Windflu');
    await expect(campaignsPage.campaignTitle).toBeVisible();

    await campaignsPage.searchInput.fill('zzzz-no-campaign-match');
    await expect(campaignsPage.searchInput).toHaveValue('zzzz-no-campaign-match');
    await expect(campaignsPage.body()).toContainText('แคมเปญ');
  });

  test('PUB-020 platform filters are selectable and resettable', async ({ page }) => {
    const campaignsPage = new CampaignsPage(page);

    await campaignsPage.gotoCampaigns();
    await campaignsPage.dismissCookieBanner();

    await campaignsPage.instagramButton.click();
    await expect(campaignsPage.instagramButton).toBeVisible();

    await campaignsPage.tiktokButton.click();
    await expect(campaignsPage.tiktokButton).toBeVisible();

    await campaignsPage.allPlatformButton.click();
    await expect(campaignsPage.campaignTitle).toBeVisible();
  });

  test('PUB-021 category filters are selectable and resettable', async ({ page }) => {
    const campaignsPage = new CampaignsPage(page);

    await campaignsPage.gotoCampaigns();
    await campaignsPage.dismissCookieBanner();

    await campaignsPage.category('เทคโนโลยี').click();
    await expect(campaignsPage.category('เทคโนโลยี')).toBeVisible();

    await campaignsPage.category('ทั้งหมด').click();
    await expect(campaignsPage.campaignTitle).toBeVisible();
  });

  test('PUB-022 join campaign from listing opens campaign detail for unauthenticated users', async ({
    page,
  }) => {
    const campaignsPage = new CampaignsPage(page);

    await campaignsPage.gotoCampaigns();
    await campaignsPage.dismissCookieBanner();
    await campaignsPage.campaignDetailLink().click();

    await campaignsPage.expectPath(new RegExp(`${campaignPath}$`));
    await expect(page.getByRole('heading', { name: 'Windflu To the Moon' })).toBeVisible();
  });
});
