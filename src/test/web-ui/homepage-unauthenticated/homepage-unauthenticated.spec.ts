import { expect, test } from '@playwright/test';
import { HomePage } from '../../../page/home-page';

test.describe('homepage unauthenticated flow', () => {
  test('PUB-001 homepage loads successfully', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.gotoHome();
    await homePage.expectLoaded();
  });

  test('PUB-002 primary navigation routes to public pages', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.gotoHome();
    await homePage.brandLink.click();
    await homePage.expectPath(/\/brand\/login$/);

    await homePage.gotoHome();
    await homePage.campaignsLink.click();
    await homePage.expectPath(/\/creator\/campaigns$/);

    await expect(homePage.logoLink).toHaveAttribute('href', '/');
  });

  test('PUB-003 creator CTA routes unauthenticated users to creator login', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.gotoHome();
    await homePage.clipperCta.click();

    await homePage.expectPath(/\/login$/);
    await expect(page.getByText('เข้าสู่ระบบบัญชีของคุณ')).toBeVisible();
  });

  test('PUB-004 brand growth CTA scrolls to brand lead form', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.gotoHome();
    await homePage.brandGrowthCta.click();

    await expect(homePage.leadSectionTitle).toBeInViewport();
    await expect(homePage.leadNameInput).toBeVisible();
  });

  test('PUB-005 footer legal links route to policy pages', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.gotoHome();
    await homePage.privacyLink.click();
    await homePage.expectPath(/\/policy\?tab=privacy_policy$/);
    await expect(page.getByText('Privacy Policy')).toBeVisible();

    await homePage.gotoHome();
    await homePage.termsLink.click();
    await homePage.expectPath(/\/policy\?tab=terms_and_conditions$/);
    await expect(page.getByText('Term and Conditions')).toBeVisible();
  });

  test('PUB-006 brand lead form fields render', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.gotoHome();
    await homePage.gotoLeadForm();

    await expect(homePage.leadNameInput).toBeVisible();
    await expect(homePage.leadEmailInput).toBeVisible();
    await expect(homePage.budgetSelect).toContainText('ต่ำกว่า 50,000 บาท');
    await expect(homePage.campaignTypeSelect).toContainText('มิวสิควิดีโอ / เพลง');
    await expect(homePage.leadDetailsInput).toBeVisible();
    await expect(homePage.leadSubmitButton).toBeVisible();
  });

  test('PUB-007 empty brand lead form is not submitted to backend during validation check', async ({
    page,
  }) => {
    const homePage = new HomePage(page);

    await homePage.blockMutations();
    await homePage.gotoHome();

    await homePage.leadSubmitButton.scrollIntoViewIfNeeded();
    await homePage.leadSubmitButton.click();

    await homePage.expectPath(/\/$/);
    await expect(homePage.leadNameInput).toHaveValue('');
  });

  test('PUB-008 malformed work email fails browser validity', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.blockMutations();
    await homePage.gotoHome();

    await homePage.leadNameInput.fill('QA Brand');
    await homePage.leadEmailInput.fill('brand');
    await homePage.budgetSelect.selectOption({ label: '50,000 – 200,000 บาท' });
    await homePage.campaignTypeSelect.selectOption({ label: 'เกม / แอปพลิเคชัน' });

    await expect(homePage.leadEmailInput).not.toHaveJSProperty('validity.valid', true);
    await homePage.leadSubmitButton.click();
    await homePage.expectPath(/\/$/);
  });

  test('PUB-009 budget dropdown options are selectable', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.gotoHome();

    await expect(homePage.budgetSelect).toContainText('ต่ำกว่า 50,000 บาท');
    await expect(homePage.budgetSelect).toContainText('50,000 – 200,000 บาท');
    await expect(homePage.budgetSelect).toContainText('200,000 – 1,000,000 บาท');
    await expect(homePage.budgetSelect).toContainText('มากกว่า 1,000,000 บาท');

    await homePage.budgetSelect.selectOption({ label: '50,000 – 200,000 บาท' });
    await expect(homePage.budgetSelect).toHaveValue('50k_200k');
  });

  test('PUB-010 campaign type dropdown options are selectable', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.gotoHome();

    await expect(homePage.campaignTypeSelect).toContainText('มิวสิควิดีโอ / เพลง');
    await expect(homePage.campaignTypeSelect).toContainText('เกม / แอปพลิเคชัน');
    await expect(homePage.campaignTypeSelect).toContainText('ภาพยนตร์ / ซีรีส์');
    await expect(homePage.campaignTypeSelect).toContainText('พอดแคสต์ / รายการ');

    await homePage.campaignTypeSelect.selectOption({ label: 'เกม / แอปพลิเคชัน' });
    await expect(homePage.campaignTypeSelect).toHaveValue('game');
  });

  test('PUB-011 valid brand lead form can reach submit-ready state', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.gotoHome();
    await homePage.fillValidLeadForm();

    await expect(homePage.leadSubmitButton).toBeEnabled();
  });
});
