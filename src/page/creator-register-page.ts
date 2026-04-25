import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './base-page';
import type {
  CreatorRegisterAccountData,
  CreatorPersonalProfileData,
  CreatorSocialProfileData,
} from '../test-data/register-test-data';

export class CreatorRegisterPage extends BasePage {
  readonly registerHeading = this.page.getByRole('heading', { name: 'สมัครสมาชิก' });
  readonly emailInput = this.page.getByPlaceholder('อีเมล');
  readonly passwordInput = this.page.getByPlaceholder('รหัสผ่าน (อย่างน้อย 6 ตัว)');
  readonly confirmPasswordInput = this.page.getByPlaceholder('ยืนยันรหัสผ่าน');
  readonly nextButton = this.page.getByRole('button', { name: 'ถัดไป' });
  readonly backButton = this.page.getByRole('button', { name: 'ย้อนกลับ' });
  readonly registerButton = this.page.getByRole('button', { name: 'ลงทะเบียน' });
  readonly acceptCookiesButton = this.page.getByRole('button', { name: 'ACCEPT' });
  readonly termsLink = this.page.getByRole('link', { name: 'เงื่อนไขการใช้งาน' });
  readonly privacyLink = this.page.getByRole('link', { name: 'นโยบายความเป็นส่วนตัว' }).first();
  readonly agreementButton = this.termsLink
    .locator('xpath=ancestor::div[contains(@class,"flex items-start")][1]')
    .locator('button');
  readonly socialPlatformCombobox = this.page.getByRole('combobox').first();
  readonly tiktokUsernameInput = this.page.getByPlaceholder('TikTok Username (@username)');
  readonly instagramUsernameInput = this.page.getByPlaceholder('Instagram Username (@username)');
  readonly firstNameInput = this.page.getByPlaceholder('ชื่อจริง');
  readonly lastNameInput = this.page.getByPlaceholder('นามสกุล');
  readonly displayNameInput = this.page.getByPlaceholder('ชื่อที่ใช้แสดง (Display Name)');
  readonly phoneInput = this.page.getByPlaceholder('เบอร์โทรศัพท์');
  readonly countryCombobox = this.page.getByRole('combobox').filter({ hasText: 'Thailand' });
  readonly successHeading = this.page.getByText('สมัครเรียบร้อยแล้ว!');
  readonly successDashboardButton = this.page.getByRole('button', { name: 'ไปยัง Dashboard' });

  constructor(page: Page) {
    super(page);
  }

  async gotoRegister() {
    await this.goto('/register');
  }

  async acceptCookiesIfVisible() {
    if (await this.acceptCookiesButton.isVisible().catch(() => false)) {
      await this.acceptCookiesButton.click();
    }
  }

  async fillAccountData(accountData: CreatorRegisterAccountData) {
    await this.emailInput.fill(accountData.email);
    await this.passwordInput.fill(accountData.password);
    await this.confirmPasswordInput.fill(accountData.confirmPassword);
  }

  async acceptAgreement() {
    await this.agreementButton.click();
  }

  async fillSocialProfile(profile: CreatorSocialProfileData) {
    if (profile.tiktokUsername) {
      await this.tiktokUsernameInput.fill(profile.tiktokUsername);
    }

    if (profile.instagramUsername) {
      await this.instagramUsernameInput.fill(profile.instagramUsername);
    }
  }

  async fillPersonalProfile(profile: CreatorPersonalProfileData) {
    await this.firstNameInput.fill(profile.firstName);
    await this.lastNameInput.fill(profile.lastName);
    await this.displayNameInput.fill(profile.displayName);
    await this.phoneInput.fill(profile.phone);
  }

  async continueToSocialStep(accountData: CreatorRegisterAccountData) {
    await this.fillAccountData(accountData);
    await this.acceptAgreement();
    await this.nextButton.click();
    await this.expectOnSocialStep();
  }

  async continueToPersonalStep(
    accountData: CreatorRegisterAccountData,
    socialProfile: CreatorSocialProfileData
  ) {
    await this.continueToSocialStep(accountData);
    await this.fillSocialProfile(socialProfile);
    await this.nextButton.click();
    await this.expectOnPersonalStep();
  }

  async submitSuccessfulRegistration(
    accountData: CreatorRegisterAccountData,
    socialProfile: CreatorSocialProfileData,
    personalProfile: CreatorPersonalProfileData
  ) {
    await this.continueToPersonalStep(accountData, socialProfile);
    await this.fillPersonalProfile(personalProfile);
    await this.registerButton.click();
    await this.expectOnSuccessState();
  }

  async openLinkInNewPage(link: Locator) {
    const popupPromise = this.page.context().waitForEvent('page');
    await link.click();
    const popup = await popupPromise;
    await popup.waitForLoadState('domcontentloaded');
    await expect(popup.locator('body')).toBeVisible();

    return popup;
  }

  async expectOnAccountStep() {
    await this.expectPath(/\/register$/);
    await expect(this.registerHeading).toBeVisible();
    await expect(this.emailInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.confirmPasswordInput).toBeVisible();
    await expect(this.termsLink).toBeVisible();
    await expect(this.privacyLink).toBeVisible();
    await expect(this.nextButton).toBeVisible();
  }

  async expectOnSocialStep() {
    await this.expectPath(/\/register$/);
    await expect(this.registerHeading).toBeVisible();
    await expect(this.socialPlatformCombobox).toBeVisible();
    await expect(this.tiktokUsernameInput).toBeVisible();
    await expect(this.instagramUsernameInput).toBeVisible();
    await expect(this.backButton).toBeVisible();
    await expect(this.nextButton).toBeVisible();
  }

  async expectOnPersonalStep() {
    await this.expectPath(/\/register$/);
    await expect(this.registerHeading).toBeVisible();
    await expect(this.firstNameInput).toBeVisible();
    await expect(this.lastNameInput).toBeVisible();
    await expect(this.displayNameInput).toBeVisible();
    await expect(this.phoneInput).toBeVisible();
    await expect(this.countryCombobox).toBeVisible();
    await expect(this.backButton).toBeVisible();
    await expect(this.registerButton).toBeVisible();
  }

  async expectOnSuccessState() {
    await this.expectPath(/\/register$/);
    await expect(this.successHeading).toBeVisible();
    await expect(
      this.page.getByText('ยินดีต้อนรับเข้าสู่ Windflu เตรียมตัวรับงานแรกของคุณได้เลย')
    ).toBeVisible();
    await expect(this.successDashboardButton).toBeVisible();
  }
}
