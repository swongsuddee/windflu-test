import { expect, test } from '@playwright/test';
import { CampaignDetailPage } from '../../../page/campaign-detail-page';

test.describe('campaign detail unauthenticated flow', () => {
  test('PUB-023 campaign detail page loads expected campaign header', async ({ page }) => {
    const campaignDetailPage = new CampaignDetailPage(page);

    await campaignDetailPage.gotoCampaignDetail();
    await campaignDetailPage.dismissCookieBanner();
    await campaignDetailPage.expectHeaderLoaded();
  });

  test('PUB-024 campaign detail tabs switch safely', async ({ page }) => {
    const campaignDetailPage = new CampaignDetailPage(page);

    await campaignDetailPage.gotoCampaignDetail();
    await campaignDetailPage.dismissCookieBanner();

    await campaignDetailPage.overviewTab.click();
    await expect(page.getByText('รายละเอียดแคมเปญ')).toBeVisible();

    await campaignDetailPage.leaderboardTab.click();
    await expect(campaignDetailPage.leaderboardTab).toBeVisible();

    await campaignDetailPage.analyticsTab.click();
    await expect(campaignDetailPage.analyticsTab).toBeVisible();
  });

  test('PUB-025 revenue calculator presets show expected values', async ({ page }) => {
    const campaignDetailPage = new CampaignDetailPage(page);

    await campaignDetailPage.gotoCampaignDetail();
    await campaignDetailPage.dismissCookieBanner();

    await expect(page.getByRole('button', { name: /10K\s+฿160/ })).toBeVisible();
    await expect(page.getByRole('button', { name: /100K\s+฿1\.6K/ })).toBeVisible();
    await expect(page.getByRole('button', { name: /500K\s+฿8\.0K/ })).toBeVisible();
    await expect(page.getByRole('button', { name: /1M\s+฿16\.0K/ })).toBeVisible();
  });

  test('PUB-026 revenue calculator manual input handles valid and invalid values', async ({
    page,
  }) => {
    const campaignDetailPage = new CampaignDetailPage(page);

    await campaignDetailPage.gotoCampaignDetail();
    await campaignDetailPage.dismissCookieBanner();

    await campaignDetailPage.viewsInput.fill('25000');
    await expect(page.getByText('฿400')).toBeVisible();

    await campaignDetailPage.viewsInput.fill('0');
    await expect(campaignDetailPage.viewsInput).toHaveValue('0');
    await expect(campaignDetailPage.body()).toContainText('ใส่จำนวนวิวเพื่อดูรายได้');

    await campaignDetailPage.viewsInput.fill('-1');
    await expect(campaignDetailPage.viewsInput).not.toHaveValue('-1');
  });

  test('PUB-027 campaign support and protected actions are available for unauthenticated users', async ({
    page,
  }) => {
    const campaignDetailPage = new CampaignDetailPage(page);

    await campaignDetailPage.gotoCampaignDetail();
    await campaignDetailPage.dismissCookieBanner();

    await expect(campaignDetailPage.googleDriveLink).toHaveAttribute('href', /drive\.google\.com/);
    await expect(campaignDetailPage.submitClipButton).toBeVisible();
    await expect(campaignDetailPage.shareButton).toBeVisible();
  });
});
