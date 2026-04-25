import { expect, test } from '@playwright/test';
import { HomePage } from '../../../page/home-page';

test.describe('homepage brand lead unauthenticated flow', () => {
  test('PUB-004 brand growth CTA scrolls to brand lead form', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.gotoHome();
    await homePage.brandGrowthCta.click();

    await expect(homePage.leadSectionTitle).toBeInViewport();
    await expect(homePage.leadNameInput).toBeVisible();
  });

  test('PUB-006 brand lead form fields render', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.gotoHome();
    await homePage.gotoLeadForm();

    await expect(homePage.leadNameInput).toBeVisible();
    await expect(homePage.leadEmailInput).toBeVisible();
    await expect(homePage.budgetSelect).toContainText('ต่ำกว่า 50,000 บาท');
    await expect(homePage.categorySelect).toContainText('ทั้งหมด');
    await expect(homePage.categorySelect).toContainText('อาหาร');
    await expect(homePage.categorySelect).toContainText('เกม');
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
    await homePage.categorySelect.selectOption({ label: 'เกม' });

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

  test('PUB-010 category dropdown options are selectable', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.gotoHome();

    await expect(homePage.categorySelect).toContainText('ทั้งหมด');
    await expect(homePage.categorySelect).toContainText('อาหาร');
    await expect(homePage.categorySelect).toContainText('เกม');
    await expect(homePage.categorySelect).toContainText('ท่องเที่ยว');

    await homePage.categorySelect.selectOption({ label: 'เกม' });
    await expect(homePage.categorySelect).toHaveValue('game');
  });

  test('PUB-011 valid brand lead form can reach submit-ready state', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.gotoHome();
    await homePage.fillValidLeadForm();

    await expect(homePage.leadSubmitButton).toBeEnabled();
  });
});
