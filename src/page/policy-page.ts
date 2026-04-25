import { expect, type Page } from '@playwright/test';
import { BasePage } from './base-page';

export class PolicyPage extends BasePage {
  readonly privacyTab = this.page.getByRole('button', { name: 'ความเป็นส่วนตัว' });
  readonly termsTab = this.page.getByRole('button', { name: 'ข้อกำหนดและเงื่อนไข' });
  readonly bodyText = this.page.locator('body');

  constructor(page: Page) {
    super(page);
  }

  async gotoPrivacy() {
    await this.goto('/policy?tab=privacy_policy');
  }

  async expectPrivacyRoute() {
    await this.expectPath(/\/policy\?tab=privacy_policy$/);
    await expect(this.privacyTab).toBeVisible();
    await expect(this.termsTab).toBeVisible();
  }

  async expectTermsRoute() {
    await this.expectPath(/\/policy\?tab=terms_and_conditions$/);
    await expect(this.privacyTab).toBeVisible();
    await expect(this.termsTab).toBeVisible();
  }
}
