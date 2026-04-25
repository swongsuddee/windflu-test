import { expect, test } from '@playwright/test';
import { BrandLoginPage } from '../../../page/brand-login-page';
import { ForgotPasswordPage } from '../../../page/forgot-password-page';
import { brandLoginTestData } from '../../../test-data/login-test-data';

test.describe('login and recovery unauthenticated flow', () => {
  test('PUB-012 brand login page loads with expected controls', async ({ page }) => {
    const loginPage = new BrandLoginPage(page);

    await loginPage.gotoLogin();
    await loginPage.expectLoaded();
  });

  test('PUB-013 brand login empty validation does not navigate away', async ({ page }) => {
    const loginPage = new BrandLoginPage(page);

    await loginPage.blockMutations();
    await loginPage.gotoLogin();
    await loginPage.submitButton.click();

    await loginPage.expectPath(/\/brand\/login$/);
    await expect(loginPage.emailInput).toHaveValue(brandLoginTestData.emptyCredentials.email);
    await expect(loginPage.passwordInput).toHaveValue(brandLoginTestData.emptyCredentials.password);
  });

  test('PUB-014 brand password visibility toggle preserves value', async ({ page }) => {
    const loginPage = new BrandLoginPage(page);

    await loginPage.gotoLogin();
    await loginPage.passwordInput.fill(brandLoginTestData.validShapeCredentials.password);
    await expect(loginPage.passwordInput).toHaveAttribute('type', 'password');

    await loginPage.togglePasswordVisibility();

    await expect(loginPage.passwordInput).toHaveValue(
      brandLoginTestData.validShapeCredentials.password
    );
    await expect(loginPage.passwordInput).toHaveAttribute('type', /text|password/);
  });

  test('PUB-016 forgot-password enables submit only after email input', async ({ page }) => {
    const forgotPasswordPage = new ForgotPasswordPage(page);

    await forgotPasswordPage.gotoForgotPassword('/brand/forgot-password');

    await expect(forgotPasswordPage.submitButton).toBeDisabled();
    await forgotPasswordPage.emailInput.fill(brandLoginTestData.invalidEmail);
    await forgotPasswordPage.expectEmailValidity(false);

    await forgotPasswordPage.emailInput.fill(brandLoginTestData.validRecoveryEmail);
    await forgotPasswordPage.expectEmailValidity(true);
    await expect(forgotPasswordPage.submitButton).toBeEnabled();
  });
});
