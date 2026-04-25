import { expect, test } from '@playwright/test';
import { CreatorRegisterPage } from '../../../page/creator-register-page';
import {
  createCreatorPersonalProfileData,
  createCreatorSocialProfileData,
  createValidCreatorRegisterAccountData,
} from '../../../test-data/register-test-data';
import { appendRegisterSuccessAccount } from '../../../util-services/register-success-account-log.service';

test.describe('creator registration success flow', () => {
  test('REG-VAL-001 valid creator registration reaches success state and exposes dashboard CTA', async ({
    page,
  }, testInfo) => {
    const registerPage = new CreatorRegisterPage(page);
    const accountData = createValidCreatorRegisterAccountData();
    const socialProfile = createCreatorSocialProfileData();
    const personalProfile = createCreatorPersonalProfileData();

    await registerPage.gotoRegister();
    await registerPage.acceptCookiesIfVisible();
    await registerPage.submitSuccessfulRegistration(accountData, socialProfile, personalProfile);

    await appendRegisterSuccessAccount({
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 19),
      flow: 'REG-VAL-001',
      contactName: personalProfile.displayName,
      email: accountData.email,
      role: 'Creator',
      status: 'Created',
      password: accountData.password,
      notes: `Recorded from ${testInfo.title}`,
    });

    await registerPage.successDashboardButton.click();
    await expect(page).toHaveURL(/\/login\?next=%2Fcreator%2Fdashboard$/);
    await expect(page.getByText('เข้าสู่ระบบบัญชีของคุณ')).toBeVisible();
  });
});
