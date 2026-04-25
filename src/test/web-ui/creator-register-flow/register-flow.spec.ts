import { expect, test } from '@playwright/test';
import { CreatorRegisterPage } from '../../../page/creator-register-page';
import {
  createCreatorSocialProfileData,
  createValidCreatorRegisterAccountData,
} from '../../../test-data/register-test-data';

test.describe('creator registration unauthenticated flow', () => {
  test('PUB-032 creator registration page loads with expected account-step controls', async ({
    page,
  }) => {
    const registerPage = new CreatorRegisterPage(page);

    await registerPage.gotoRegister();
    await registerPage.acceptCookiesIfVisible();

    await registerPage.expectOnAccountStep();
  });

  test('PUB-033 account step blank validation blocks progression', async ({ page }) => {
    const registerPage = new CreatorRegisterPage(page);

    await registerPage.blockMutations();
    await registerPage.gotoRegister();
    await registerPage.acceptCookiesIfVisible();
    await registerPage.nextButton.click();

    await registerPage.expectOnAccountStep();
    await expect(registerPage.emailInput).toHaveValue('');
    await expect(registerPage.passwordInput).toHaveValue('');
    await expect(registerPage.confirmPasswordInput).toHaveValue('');
    await expect(page.getByText('อีเมลไม่ถูกต้อง')).toBeVisible();
    await expect(page.getByText('รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร')).toBeVisible();
    await expect(page.getByText('กรุณายืนยันรหัสผ่าน')).toBeVisible();
    await expect(page.getByText('กรุณายอมรับเงื่อนไขการใช้งาน')).toBeVisible();
  });

  test('PUB-034 agreement is required and legal links open successfully', async ({ page }) => {
    const registerPage = new CreatorRegisterPage(page);
    const accountData = createValidCreatorRegisterAccountData();

    await registerPage.gotoRegister();
    await registerPage.acceptCookiesIfVisible();
    await registerPage.fillAccountData(accountData);

    await expect(registerPage.emailInput).toHaveValue(accountData.email);
    await expect(registerPage.passwordInput).toHaveValue(accountData.password);
    await expect(registerPage.confirmPasswordInput).toHaveValue(accountData.confirmPassword);

    await registerPage.nextButton.click();

    await registerPage.expectOnAccountStep();
    await expect(page.getByText('กรุณายอมรับเงื่อนไขการใช้งาน')).toBeVisible();

    const termsPage = await registerPage.openLinkInNewPage(registerPage.termsLink);
    await expect(termsPage).toHaveURL(/\/policy\?tab=terms_and_conditions$/);
    await termsPage.close();

    const privacyPage = await registerPage.openLinkInNewPage(registerPage.privacyLink);
    await expect(privacyPage).toHaveURL(/\/policy\?tab=privacy_policy$/);
    await privacyPage.close();

    await registerPage.acceptAgreement();
    await registerPage.nextButton.click();

    await registerPage.expectOnSocialStep();
  });

  test('PUB-035 social step requires at least one linked account', async ({ page }) => {
    const registerPage = new CreatorRegisterPage(page);
    const accountData = createValidCreatorRegisterAccountData();

    await registerPage.blockMutations();
    await registerPage.gotoRegister();
    await registerPage.acceptCookiesIfVisible();
    await registerPage.continueToSocialStep(accountData);
    await registerPage.nextButton.click();

    await registerPage.expectOnSocialStep();
    await expect(registerPage.tiktokUsernameInput).toHaveValue('');
    await expect(registerPage.instagramUsernameInput).toHaveValue('');
    await expect(page.getByText('เชื่อมอย่างน้อย 1 บัญชี เพื่อเริ่มรับงาน')).toBeVisible();
  });

  test('PUB-036 one social username is enough to reach the personal step', async ({ page }) => {
    const registerPage = new CreatorRegisterPage(page);
    const accountData = createValidCreatorRegisterAccountData();
    const socialProfile = createCreatorSocialProfileData();

    await registerPage.gotoRegister();
    await registerPage.acceptCookiesIfVisible();
    await registerPage.continueToSocialStep(accountData);
    await registerPage.fillSocialProfile(socialProfile);
    await registerPage.nextButton.click();

    await registerPage.expectOnPersonalStep();
    await expect(registerPage.tiktokUsernameInput).not.toBeVisible();
  });

  test('PUB-037 personal step blank validation blocks registration', async ({ page }) => {
    const registerPage = new CreatorRegisterPage(page);
    const accountData = createValidCreatorRegisterAccountData();
    const socialProfile = createCreatorSocialProfileData();

    await registerPage.blockMutations();
    await registerPage.gotoRegister();
    await registerPage.acceptCookiesIfVisible();
    await registerPage.continueToPersonalStep(accountData, socialProfile);
    await registerPage.registerButton.click();

    await registerPage.expectOnPersonalStep();
    await expect(registerPage.firstNameInput).toHaveValue('');
    await expect(registerPage.lastNameInput).toHaveValue('');
    await expect(registerPage.displayNameInput).toHaveValue('');
    await expect(registerPage.phoneInput).toHaveValue('');
    await expect(page.getByText('กรุณากรอกชื่อจริง')).toBeVisible();
    await expect(page.getByText('กรุณากรอกนามสกุล')).toBeVisible();
    await expect(page.getByText('กรุณากรอกชื่อที่ใช้แสดง')).toBeVisible();
    await expect(page.getByText('กรุณากรอกเบอร์โทรศัพท์')).toBeVisible();
  });

  test('PUB-038 back navigation moves safely between account, social, and personal steps', async ({
    page,
  }) => {
    const registerPage = new CreatorRegisterPage(page);
    const accountData = createValidCreatorRegisterAccountData();
    const socialProfile = createCreatorSocialProfileData();

    await registerPage.gotoRegister();
    await registerPage.acceptCookiesIfVisible();
    await registerPage.continueToSocialStep(accountData);
    await registerPage.backButton.click();

    await registerPage.expectOnAccountStep();
    await expect(registerPage.emailInput).toHaveValue(accountData.email);

    await registerPage.nextButton.click();
    await registerPage.expectOnSocialStep();
    await registerPage.fillSocialProfile(socialProfile);
    await registerPage.nextButton.click();

    await registerPage.expectOnPersonalStep();
    await registerPage.backButton.click();

    await registerPage.expectOnSocialStep();
  });
});
