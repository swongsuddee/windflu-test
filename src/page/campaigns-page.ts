import { expect, type Page } from '@playwright/test';
import { BasePage } from './base-page';

export class CampaignsPage extends BasePage {
  readonly heading = this.page.getByText('แคมเปญ').first();
  readonly searchInput = this.page.getByPlaceholder('Search campaigns...');
  readonly campaignTitle = this.page.getByText('Windflu To the Moon').first();
  readonly allPlatformButton = this.page.getByRole('button', { name: 'All' });
  readonly instagramButton = this.page.getByRole('button', { name: 'Instagram' });
  readonly tiktokButton = this.page.getByRole('button', { name: 'TikTok' });
  readonly acceptAllCookieButton = this.page.getByRole('button', { name: 'ACCEPT ALL' });
  readonly rejectCookieButton = this.page.getByRole('button', { name: 'REJECT' });
  readonly customizeCookieButton = this.page.getByRole('button', { name: 'CUSTOMIZE' });

  constructor(page: Page) {
    super(page);
  }

  async gotoCampaigns() {
    await this.goto('/creator/campaigns');
  }

  async dismissCookieBanner() {
    if (await this.acceptAllCookieButton.isVisible().catch(() => false)) {
      await this.acceptAllCookieButton.evaluate((button: HTMLElement) => button.click());
    }
  }

  category(name: string) {
    return this.page.getByText(name, { exact: true }).last();
  }

  campaignDetailLink() {
    return this.page.getByRole('link', { name: /Windflu To the Moon/ }).last();
  }

  async expectLoaded() {
    await expect(this.heading).toBeVisible();
    await expect(this.searchInput).toBeVisible();
    await expect(this.campaignTitle).toBeVisible();
    await expect(this.allPlatformButton).toBeVisible();
  }
}
