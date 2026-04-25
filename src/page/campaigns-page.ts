import { expect, type Page } from '@playwright/test';
import { BasePage } from './base-page';

export class CampaignsPage extends BasePage {
  readonly heading = this.page.getByText('แคมเปญ').first();
  readonly searchInput = this.page.getByPlaceholder('Search campaigns...');
  readonly emptyStateTitle = this.page.getByText('ไม่พบแคมเปญในหมวดนี้');
  readonly emptyStateDescription = this.page.getByText(
    'ลองเปลี่ยนหมวดหมู่ หรือกลับมาเช็คใหม่ภายหลังนะ'
  );
  readonly allPlatformButton = this.page.getByRole('button', { name: 'All' });
  readonly instagramButton = this.page.getByRole('button', { name: 'Instagram' });
  readonly tiktokButton = this.page.getByRole('button', { name: 'TikTok' });
  readonly acceptCookieButton = this.page.getByRole('button', { name: 'ACCEPT' });
  readonly customizeCookieButton = this.page.getByRole('button', { name: 'Customize Settings' });
  readonly dashboardLink = this.page.locator('a[href="/creator/dashboard"]').first();
  readonly myWorkLink = this.page.locator('a[href="/creator/my-work"]').first();
  readonly payoutsLink = this.page.locator('a[href="/creator/payouts"]').first();
  readonly profileLink = this.page.locator('a[href="/creator/profile"]').first();
  readonly loginLink = this.page.locator('a[href^="/login"]').first();
  readonly officialLineLink = this.page.locator('a[href*="line.me"]').first();

  constructor(page: Page) {
    super(page);
  }

  async gotoCampaigns() {
    await this.goto('/creator/campaigns');
  }

  async dismissCookieBanner() {
    if (await this.acceptCookieButton.isVisible().catch(() => false)) {
      await this.acceptCookieButton.evaluate((button: HTMLElement) => button.click());
    }
  }

  category(name: string) {
    return this.page.getByText(name, { exact: true }).last();
  }

  async expectLoaded() {
    await expect(this.heading).toBeVisible();
    await expect(this.searchInput).toBeVisible();
    await expect(this.allPlatformButton).toBeVisible();
    await expect(this.emptyStateTitle).toBeVisible();
  }

  async expectRedirectedToLogin(nextPath: string) {
    await expect(this.page).toHaveURL(new RegExp(`/login\\?next=${encodeURIComponent(nextPath)}$`));
    await expect(this.page).toHaveTitle(/Windflu/);
  }
}
