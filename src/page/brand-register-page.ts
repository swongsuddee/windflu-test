import { expect, type Page } from '@playwright/test';
import { BasePage } from './base-page';
import type { BrandProfileData, BrandRegisterAccountData } from '../test-data/register-test-data';

export class BrandRegisterPage extends BasePage {
  readonly acceptCookiesButton = this.page.getByRole('button', { name: 'ACCEPT' });
  readonly accountHeading = this.page.getByRole('heading', { name: 'ข้อมูลบัญชี' });
  readonly brandHeading = this.page.getByRole('heading', { name: 'ข้อมูลแบรนด์' });
  readonly contactNameInput = this.page.getByPlaceholder('ชื่อ-นามสกุล');
  readonly emailInput = this.page.getByPlaceholder('hello@company.com');
  readonly passwordInput = this.page.getByPlaceholder('อย่างน้อย 8 ตัวอักษร');
  readonly confirmPasswordInput = this.page.getByPlaceholder('กรอกรหัสผ่านอีกครั้ง');
  readonly phoneInput = this.page.getByPlaceholder('08X-XXX-XXXX');
  readonly nextButton = this.page.getByRole('button', { name: 'ถัดไป' });
  readonly companyNameInput = this.page.getByPlaceholder('เช่น Thai Tea Co.');
  readonly industryCombobox = this.page.getByRole('combobox').first();
  readonly privacyPolicyCard = this.page
    .getByText('Privacy Brand')
    .locator('xpath=ancestor::div[contains(@class,"rounded-2xl")][1]');
  readonly termsPolicyCard = this.page
    .getByText('Term & Con Brand')
    .locator('xpath=ancestor::div[contains(@class,"rounded-2xl")][1]');
  readonly agreementPolicyCard = this.page
    .getByText('Agreement Brand')
    .locator('xpath=ancestor::div[contains(@class,"rounded-2xl")][1]');
  readonly privacyPolicyButton = this.privacyPolicyCard.getByRole('button');
  readonly termsPolicyButton = this.termsPolicyCard.getByRole('button');
  readonly agreementPolicyButton = this.agreementPolicyCard.getByRole('button');
  readonly submitButton = this.page.getByRole('button', { name: 'สมัครสมาชิก' });
  readonly backButton = this.page.getByRole('button', { name: 'ย้อนกลับ' });
  readonly successHeading = this.page.getByText('สมัครสำเร็จแล้ว!');
  readonly loginButton = this.page.getByRole('button', { name: 'เข้าสู่ระบบ' });

  constructor(page: Page) {
    super(page);
  }

  async gotoRegister() {
    await this.goto('/brand/register');
  }

  async acceptCookiesIfVisible() {
    if (await this.acceptCookiesButton.isVisible().catch(() => false)) {
      await this.acceptCookiesButton.click();
    }
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

  async acceptAllVisiblePolicies() {
    await this.privacyPolicyButton.click();
    await this.termsPolicyButton.click();
    await this.agreementPolicyButton.click();
  }

  async submitRegistration() {
    await this.submitButton.click();
  }

  async submitSuccessfulRegistration(
    accountData: BrandRegisterAccountData,
    brandProfile: BrandProfileData
  ) {
    await this.continueToBrandStep(accountData);
    await this.fillBrandProfile(brandProfile);
    await this.acceptAllVisiblePolicies();
    await this.expectOnSuccessState();
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

  async expectOnSuccessState() {
    await this.expectPath(/\/brand\/register$/);
    await expect(this.successHeading).toBeVisible();
    await expect(
      this.page.getByText('ยินดีต้อนรับสู่ Windflu Brands — สร้างแคมเปญแรกได้เลย')
    ).toBeVisible();
    await expect(this.loginButton).toBeVisible();
  }
}
