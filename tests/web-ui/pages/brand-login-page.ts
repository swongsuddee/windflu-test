import { expect, type Page } from '@playwright/test';
import { BasePage } from './base-page';

export class BrandLoginPage extends BasePage {
  readonly portalText = this.page.getByText('Brand Portal');
  readonly emailInput = this.page.getByPlaceholder('อีเมลบริษัท');
  readonly passwordInput = this.page.locator('input[name="password"]');
  readonly submitButton = this.page.getByRole('button', { name: 'เข้าสู่ระบบ' });
  readonly registerLink = this.page.getByRole('link', { name: 'สมัครฟรี' });
  readonly forgotPasswordLink = this.page.getByRole('link', { name: 'ลืมรหัสผ่าน?' });

  constructor(page: Page) {
    super(page);
  }

  async gotoLogin() {
    await this.goto('/brand/login');
  }

  async expectLoaded() {
    await expect(this.portalText).toBeVisible();
    await expect(this.emailInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.submitButton).toBeVisible();
    await expect(this.registerLink).toBeVisible();
    await expect(this.forgotPasswordLink).toBeVisible();
  }

  async togglePasswordVisibility() {
    await this.passwordInput.locator('xpath=following-sibling::button[1]').click();
  }
}
