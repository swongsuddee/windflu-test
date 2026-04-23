import { expect, type Page } from '@playwright/test';
import { BasePage } from './base-page';
import type { BrandRegisterAccountData } from '../test-data/register-test-data';

export class BrandRegisterPage extends BasePage {
  readonly heading = this.page.getByRole('heading', { name: 'ข้อมูลบัญชี' });
  readonly contactNameInput = this.page.getByPlaceholder('ชื่อ-นามสกุล');
  readonly emailInput = this.page.getByPlaceholder('hello@company.com');
  readonly passwordInput = this.page.getByPlaceholder('อย่างน้อย 8 ตัวอักษร');
  readonly confirmPasswordInput = this.page.getByPlaceholder('กรอกรหัสผ่านอีกครั้ง');
  readonly phoneInput = this.page.getByPlaceholder('08X-XXX-XXXX');
  readonly nextButton = this.page.getByRole('button', { name: 'ถัดไป' });

  constructor(page: Page) {
    super(page);
  }

  async gotoRegister() {
    await this.goto('/brand/register');
  }

  async fillMismatchedAccountData(accountData: BrandRegisterAccountData) {
    await this.contactNameInput.fill(accountData.contactName);
    await this.emailInput.fill(accountData.email);
    await this.passwordInput.fill(accountData.password);
    await this.confirmPasswordInput.fill(accountData.confirmPassword);
    await this.phoneInput.fill(accountData.phone);
  }

  async expectStillOnStepOne() {
    await this.expectPath(/\/brand\/register$/);
    await expect(this.heading).toBeVisible();
  }
}
