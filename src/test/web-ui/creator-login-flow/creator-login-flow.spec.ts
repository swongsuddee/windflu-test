import { expect, test } from '@playwright/test';
import { CreatorLoginPage } from '../../../page/creator-login-page';
import { ForgotPasswordPage } from '../../../page/forgot-password-page';
import { creatorLoginTestData } from '../../../test-data/login-test-data';

test.describe('creator login and recovery unauthenticated flow', () => {
  test('PUB-039 creator login page loads with current entry controls', async ({ page }) => {
    const loginPage = new CreatorLoginPage(page);

    await loginPage.gotoLogin();
    await loginPage.expectEntryOptionsLoaded();
  });

  test('PUB-040 creator email login entry reveals credential controls', async ({ page }) => {
    const loginPage = new CreatorLoginPage(page);

    await loginPage.gotoLogin();
    await loginPage.chooseEmailLoginIfPresent();

    await loginPage.expectPath(/\/login$/);
    await loginPage.expectEmailLoginFormVisible();
  });

  test('PUB-041 creator empty email login validation does not navigate away', async ({ page }) => {
    const loginPage = new CreatorLoginPage(page);

    await loginPage.blockMutations();
    await loginPage.gotoLogin();
    await loginPage.chooseEmailLoginIfPresent();
    await loginPage.expectEmailLoginFormVisible();
    await loginPage.submitButton.click();

    await loginPage.expectPath(/\/login$/);
    await expect(loginPage.emailInput).toHaveValue(creatorLoginTestData.emptyCredentials.email);
    await expect(loginPage.passwordInput).toHaveValue(
      creatorLoginTestData.emptyCredentials.password
    );
  });

  test('PUB-042 creator forgot-password enables submit only after email input', async ({
    page,
  }) => {
    const forgotPasswordPage = new ForgotPasswordPage(page);

    await forgotPasswordPage.gotoForgotPassword('/forgot-password');

    await expect(forgotPasswordPage.submitButton).toBeDisabled();
    await forgotPasswordPage.emailInput.fill(creatorLoginTestData.invalidEmail);
    await forgotPasswordPage.expectEmailValidity(false);

    await forgotPasswordPage.emailInput.fill(creatorLoginTestData.validRecoveryEmail);
    await forgotPasswordPage.expectEmailValidity(true);
    await expect(forgotPasswordPage.submitButton).toBeEnabled();
  });
});
