import { expect, type Page } from '@playwright/test';
import { BasePage } from './base-page';

export class CreatorLoginPage extends BasePage {
  readonly emailLoginButton = this.page.getByRole('button', {
    name: /อีเมล|email/i,
  });
  readonly emailInput = this.page.locator('input[type="email"]').first();
  readonly passwordInput = this.page.locator('input[type="password"]').first();
  readonly submitButton = this.page.getByRole('button', {
    name: /เข้าสู่ระบบ|login/i,
  });

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
      return;
    }

    await expect(this.emailInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.submitButton).toBeVisible();
  }

  async chooseEmailLoginIfPresent() {
    if (await this.emailLoginButton.isVisible().catch(() => false)) {
      await this.emailLoginButton.click();
    }
  }

  async loginWithEmail(email: string, password: string) {
    await this.chooseEmailLoginIfPresent();
    await this.emailInput.waitFor({ state: 'visible' });
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}
