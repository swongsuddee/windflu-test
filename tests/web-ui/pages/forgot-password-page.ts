import { expect, type Page } from '@playwright/test';
import { BasePage } from './base-page';

export class ForgotPasswordPage extends BasePage {
  readonly emailInput = this.page.getByPlaceholder('อีเมลบริษัท');
  readonly submitButton = this.page.getByRole('button', { name: 'ส่งอีเมลเปลี่ยนรหัสผ่าน' });

  constructor(page: Page) {
    super(page);
  }

  async gotoForgotPassword() {
    await this.goto('/brand/forgot-password');
  }

  async expectEmailValidity(valid: boolean) {
    if (valid) {
      await expect(this.emailInput).toHaveJSProperty('validity.valid', true);
      return;
    }

    await expect(this.emailInput).not.toHaveJSProperty('validity.valid', true);
  }
}
