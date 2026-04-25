import { expect, type Page } from '@playwright/test';
import { BasePage } from './base-page';

export class CreatorLoginPage extends BasePage {
  readonly googleLoginButton = this.page.getByRole('button', {
    name: /Google/i,
  });
  readonly emailLoginButton = this.page.getByRole('button', {
    name: /อีเมล|email/i,
  });
  readonly emailInput = this.page.locator('input[type="email"]').first();
  readonly passwordInput = this.page.locator('input[type="password"]').first();
  readonly submitButton = this.page.getByRole('button', {
    name: /เข้าสู่ระบบ|login/i,
  });
  readonly registerLink = this.page.getByRole('link', { name: 'สมัครสมาชิก' });
  readonly forgotPasswordLink = this.page.getByRole('link', { name: 'ลืมรหัสผ่าน?' });

  constructor(page: Page) {
    super(page);
  }

  async gotoLogin() {
    await this.goto('/login');
  }

  async expectLoaded() {
    await expect(this.page.locator('body')).toBeVisible();

    const hasEmailEntryButton = await this.emailLoginButton.isVisible().catch(() => false);
    if (hasEmailEntryButton) {
      await this.expectEntryOptionsLoaded();
      return;
    }

    await this.expectEmailLoginFormVisible();
  }

  async expectEntryOptionsLoaded() {
    await expect(this.googleLoginButton).toBeVisible();
    await expect(this.emailLoginButton).toBeVisible();
    await expect(this.registerLink).toBeVisible();
  }

  async expectEmailLoginFormVisible() {
    await expect(this.emailInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.submitButton).toBeVisible();
    await expect(this.registerLink).toBeVisible();
    await expect(this.forgotPasswordLink).toBeVisible();
  }

  async chooseEmailLoginIfPresent() {
    if (await this.emailLoginButton.isVisible().catch(() => false)) {
      await this.emailLoginButton.click();
    }
  }

  async loginWithEmail(email: string, password: string) {
    await this.chooseEmailLoginIfPresent();
    await this.expectEmailLoginFormVisible();
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}
