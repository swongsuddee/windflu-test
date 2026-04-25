import { expect, type Page } from '@playwright/test';
import { BasePage } from './base-page';

export class HomePage extends BasePage {
  readonly brandLink = this.page.getByRole('link', { name: 'สำหรับแบรนด์' });
  readonly campaignsLink = this.page.getByRole('link', { name: 'Campaigns' });
  readonly logoLink = this.page.getByRole('link', { name: 'Windflu' }).first();
  readonly clipperCta = this.page.getByRole('button', { name: 'สมัครเป็น Clipper' });
  readonly brandGrowthCta = this.page.getByRole('button', { name: 'สำหรับแบรนด์ที่อยากไวรัล' });
  readonly footer = this.page.getByRole('contentinfo');
  readonly privacyLink = this.footer.getByRole('link', { name: 'นโยบายความเป็นส่วนตัว' });
  readonly termsLink = this.footer.getByRole('link', { name: 'ข้อกำหนดและเงื่อนไข' });
  readonly leadSectionTitle = this.page.getByText('เริ่มต้นแคมเปญของคุณวันนี้');
  readonly leadNameInput = this.page.getByPlaceholder('กรอกชื่อของคุณ');
  readonly leadEmailInput = this.page.getByPlaceholder('name@company.com');
  readonly leadDetailsInput = this.page.getByPlaceholder(
    'บอกเราเพิ่มเติมเกี่ยวกับเป้าหมายของคุณ...'
  );
  readonly leadSubmitButton = this.page.getByRole('button', { name: 'ส่งข้อมูลเพื่อเริ่มงาน' });
  readonly budgetSelect = this.page.locator('select').first();
  readonly categorySelect = this.page.locator('select').nth(1);

  constructor(page: Page) {
    super(page);
  }

  async gotoHome() {
    await this.goto('/');
  }

  async expectLoaded() {
    await expect(this.page).toHaveTitle(/Windflu/);
    await expect(this.page.getByText('เปลี่ยนยอดวิว')).toBeVisible();
    await expect(this.page.getByText('เป็นรายได้จริง')).toBeVisible();
    await expect(this.brandLink).toBeVisible();
    await expect(this.campaignsLink).toBeVisible();
  }

  async gotoLeadForm() {
    await this.leadSectionTitle.scrollIntoViewIfNeeded();
  }

  async fillValidLeadForm() {
    await this.leadNameInput.fill('QA Brand');
    await this.leadEmailInput.fill('qa@example.com');
    await this.budgetSelect.selectOption({ label: '50,000 – 200,000 บาท' });
    await this.categorySelect.selectOption({ label: 'เกม' });
    await this.leadDetailsInput.fill('Automation pre-submit check');
  }
}
