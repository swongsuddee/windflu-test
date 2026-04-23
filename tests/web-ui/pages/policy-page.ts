import { expect, type Page } from '@playwright/test';
import { BasePage } from './base-page';

export class PolicyPage extends BasePage {
  readonly privacyContent = this.page.getByText('Privacy Policy');
  readonly termsContent = this.page.getByText('Term and Conditions');
  readonly termsTab = this.page.getByRole('button', { name: 'ข้อกำหนดและเงื่อนไข' });

  constructor(page: Page) {
    super(page);
  }

  async gotoPrivacy() {
    await this.goto('/policy?tab=privacy_policy');
  }

  async expectPrivacy() {
    await expect(this.privacyContent).toBeVisible();
  }

  async expectTerms() {
    await expect(this.termsContent).toBeVisible();
  }
}
