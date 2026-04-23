import { expect, test } from '@playwright/test';
import { BrandRegisterPage } from '../pages/brand-register-page';
import { createBrandRegisterAccountData } from '../test-data/register-test-data';

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
});
