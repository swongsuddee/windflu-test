import { expect, type Page } from '@playwright/test';
import { BasePage } from './base-page';
import type { BrandProfileData, BrandRegisterAccountData } from '../test-data/register-test-data';

export class BrandRegisterPage extends BasePage {
  readonly accountHeading = this.page.getByRole('heading', { name: 'ข้อมูลบัญชี' });
  readonly brandHeading = this.page.getByRole('heading', { name: 'ข้อมูลแบรนด์' });
  readonly contactNameInput = this.page.getByPlaceholder('ชื่อ-นามสกุล');
  readonly emailInput = this.page.getByPlaceholder('hello@company.com');
  readonly passwordInput = this.page.getByPlaceholder('อย่างน้อย 8 ตัวอักษร');
  readonly confirmPasswordInput = this.page.getByPlaceholder('กรอกรหัสผ่านอีกครั้ง');
  readonly phoneInput = this.page.getByPlaceholder('08X-XXX-XXXX');
  readonly nextButton = this.page.getByRole('button', { name: 'ถัดไป' });
  readonly companyNameInput = this.page.getByPlaceholder('เช่น Thai Tea Co.');
  readonly industryCombobox = this.page.getByRole('combobox');
  readonly readMoreButton = this.page.getByRole('button', { name: 'อ่านเพิ่มเติม →' });
  readonly acceptPolicyButton = this.page.getByRole('button', {
    name: 'ยอมรับข้อตกลงนี้',
  });
  readonly submitButton = this.page.getByRole('button', { name: 'สมัครสมาชิก' });
  readonly backButton = this.page.getByRole('button', { name: 'ย้อนกลับ' });

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

  async fillAccountData(accountData: BrandRegisterAccountData) {
    await this.contactNameInput.fill(accountData.contactName);
    await this.emailInput.fill(accountData.email);
    await this.passwordInput.fill(accountData.password);
    await this.confirmPasswordInput.fill(accountData.confirmPassword);
    await this.phoneInput.fill(accountData.phone);
  }

  async continueToBrandStep(accountData: BrandRegisterAccountData) {
    await this.fillAccountData(accountData);
    await this.nextButton.click();
    await this.expectOnBrandStep();
  }

  async fillBrandProfile(brandProfile: BrandProfileData) {
    await this.companyNameInput.fill(brandProfile.companyName);
    await this.industryCombobox.click();
    await this.page.getByRole('option', { name: brandProfile.industry }).click();
  }

  async acceptVisiblePolicy() {
    await this.readMoreButton.click();
    await expect(this.acceptPolicyButton).toBeVisible();
    await this.acceptPolicyButton.click();
  }

  async submitRegistration() {
    await this.submitButton.click();
  }

  async expectStillOnStepOne() {
    await this.expectPath(/\/brand\/register$/);
    await expect(this.accountHeading).toBeVisible();
  }

  async expectOnBrandStep() {
    await this.expectPath(/\/brand\/register$/);
    await expect(this.brandHeading).toBeVisible();
    await expect(this.companyNameInput).toBeVisible();
  }
}
