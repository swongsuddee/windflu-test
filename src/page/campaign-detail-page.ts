import { expect, type Page } from '@playwright/test';
import { BasePage } from './base-page';

export const campaignPath = '/creator/campaigns/69e61d06a282a107c2d34ff0';

export class CampaignDetailPage extends BasePage {
  readonly heading = this.page.getByRole('heading', { name: 'Windflu To the Moon' });
  readonly overviewTab = this.page.getByText('Overview', { exact: true });
  readonly leaderboardTab = this.page.getByText('Leaderboard', { exact: true });
  readonly analyticsTab = this.page.getByText('Analytics', { exact: true });
  readonly viewsInput = this.page.locator('input[placeholder="0"]').first();
  readonly googleDriveLink = this.page.getByRole('link', { name: /Google Drive/ });
  readonly submitClipButton = this.page.getByRole('button', { name: 'ส่ง Clip Campaign' }).first();
  readonly shareButton = this.page.getByRole('button', { name: 'แชร์แคมเปญ' });

  constructor(page: Page) {
    super(page);
  }

  async gotoCampaignDetail() {
    await this.goto(campaignPath);
  }

  async dismissCookieBanner() {
    const acceptAll = this.page.getByRole('button', { name: 'ACCEPT ALL' });

    if (await acceptAll.isVisible().catch(() => false)) {
      await acceptAll.evaluate((button: HTMLElement) => button.click());
    }
  }

  async expectHeaderLoaded() {
    await expect(this.page).toHaveTitle(/Windflu To the Moon/);
    await expect(this.heading).toBeVisible();
    await expect(this.page.getByText('฿16', { exact: true }).first()).toBeVisible();
    await expect(this.page.getByText('0/100')).toBeVisible();
    await expect(this.page.getByText('30 พ.ค. 69')).toBeVisible();
  }
}
