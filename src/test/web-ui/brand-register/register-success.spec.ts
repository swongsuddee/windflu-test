import { expect, test } from '@playwright/test';
import { BrandRegisterPage } from '../../../page/brand-register-page';
import {
  createValidBrandProfileData,
  createValidBrandRegisterAccountData,
} from '../../../test-data/register-test-data';
import { appendRegisterSuccessAccount } from '../../../util-services/register-success-account-log.service';

test.describe('brand registration success flow', () => {
  test('REG-VAL-001 valid brand registration reaches success state and exposes login CTA', async ({
    page,
  }, testInfo) => {
    const registerPage = new BrandRegisterPage(page);
    const accountData = createValidBrandRegisterAccountData();
    const brandProfile = createValidBrandProfileData();

    await registerPage.gotoRegister();
    await registerPage.acceptCookiesIfVisible();
    await registerPage.submitSuccessfulRegistration(accountData, brandProfile);

    await appendRegisterSuccessAccount({
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 19),
      flow: 'REG-VAL-001',
      contactName: accountData.contactName,
      email: accountData.email,
      role: 'Brand',
      status: 'Created',
      password: accountData.password,
      notes: `Recorded from ${testInfo.title}`,
    });

    await registerPage.loginButton.click();
    await expect(page).toHaveURL(/\/brand\/login$/);
    await expect(page.getByRole('heading', { name: 'ยินดีต้อนรับ' })).toBeVisible();
    await expect(page.getByPlaceholder('อีเมลบริษัท')).toBeVisible();
  });
});
