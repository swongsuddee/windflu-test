import { expect, type Page } from '@playwright/test';
import { BasePage } from './base-page';

export const campaignPath = '/creator/campaigns/69e61d06a282a107c2d34ff0';

export class CampaignDetailPage extends BasePage {
  readonly notFoundTitle = this.page.getByText('ไม่พบแคมเปญ');
  readonly notFoundDescription = this.page.getByText('แคมเปญนี้อาจถูกลบหรือไม่มีอยู่จริง');
  readonly backToCampaignsLink = this.page.getByRole('link', { name: 'กลับไปหน้าแคมเปญ' });
  readonly dashboardLink = this.page.locator('a[href="/creator/dashboard"]').first();
  readonly myWorkLink = this.page.locator('a[href="/creator/my-work"]').first();
  readonly payoutsLink = this.page.locator('a[href="/creator/payouts"]').first();
  readonly profileLink = this.page.locator('a[href="/creator/profile"]').first();
  readonly loginLink = this.page.locator('a[href^="/login"]').first();

  constructor(page: Page) {
    super(page);
  }

  async gotoCampaignDetail() {
    await this.goto(campaignPath);
  }

  async dismissCookieBanner() {
    const accept = this.page.getByRole('button', { name: 'ACCEPT' });

    if (await accept.isVisible().catch(() => false)) {
      await accept.evaluate((button: HTMLElement) => button.click());
    }
  }

  async expectHeaderLoaded() {
    await expect(this.page).toHaveTitle(/Windflu Campaign/);
    await expect(this.notFoundTitle).toBeVisible();
    await expect(this.notFoundDescription).toBeVisible();
  }

  async expectRedirectedToLogin(nextPath: string) {
    await expect(this.page).toHaveURL(new RegExp(`/login\\?next=${encodeURIComponent(nextPath)}$`));
    await expect(this.page).toHaveTitle(/Windflu/);
  }
}
