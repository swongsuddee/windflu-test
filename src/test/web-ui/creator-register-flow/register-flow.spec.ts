import { expect, test } from '@playwright/test';
import { BrandRegisterPage } from '../../../page/brand-register-page';
import {
  brandRegisterPasswordReference,
  createBrandRegisterAccountData,
  createValidBrandProfileData,
  createValidBrandRegisterAccountData,
} from '../../../test-data/register-test-data';
import { appendRegisterSuccessAccount } from '../util-services/register-success-account-log-service';

test.describe('brand registration unauthenticated flow', () => {
  test('PUB-015 brand registration step 1 blocks incomplete or mismatched data', async ({
    page,
  }) => {
    const registerPage = new BrandRegisterPage(page);

    await registerPage.gotoRegister();

    await registerPage.nextButton.click();
    await registerPage.expectStillOnStepOne();

    const accountData = createBrandRegisterAccountData();
    expect(accountData.contactName).toMatch(/^jojoetest/);

    await registerPage.fillMismatchedAccountData(accountData);
    await registerPage.nextButton.click();

    await registerPage.expectStillOnStepOne();
    await expect(registerPage.contactNameInput).toHaveValue(accountData.contactName);
    await expect(registerPage.confirmPasswordInput).toHaveValue(accountData.confirmPassword);
  });

  test('REG-VAL-001 brand registration valid flow creates an account', async ({
    page,
  }, testInfo) => {
    test.fail(
      true,
      'Known live blocker: visible policy acceptance does not complete registration on the public site.'
    );

    const registerPage = new BrandRegisterPage(page);
    const accountData = createValidBrandRegisterAccountData();
    const brandProfile = createValidBrandProfileData();

    await registerPage.gotoRegister();
    await registerPage.continueToBrandStep(accountData);
    await registerPage.fillBrandProfile(brandProfile);
    await registerPage.acceptVisiblePolicy();

    await expect(registerPage.submitButton).toBeEnabled();
    await registerPage.submitRegistration();

    const bodyText = await registerPage.body().innerText();

    await expect(page).not.toHaveURL(/\/brand\/register$/);
    await expect(bodyText).not.toContain('too many requests');
    await expect(bodyText).not.toContain(
      'accept_privacy_policy_version, accept_terms_and_conditions_version, and accept_clipper_agreement_version are required'
    );

    await appendRegisterSuccessAccount({
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 19),
      flow: 'REG-VAL-001',
      contactName: accountData.contactName,
      email: accountData.email,
      role: 'Brand',
      status: 'Created',
      passwordReference: brandRegisterPasswordReference,
      notes: `Recorded from ${testInfo.title}`,
    });
  });
});
