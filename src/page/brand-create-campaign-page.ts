import path from 'node:path';
import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './base-page';

type BrandCreateCampaignData = {
  title: string;
  detail: string;
  imagePath: string;
};

export class BrandCreateCampaignPage extends BasePage {
  readonly acceptCookiesButton = this.page.getByRole('button', { name: 'ACCEPT' });
  readonly titleInput = this.page.locator('input[name="title"]');
  readonly detailEditor = this.page.locator('[contenteditable="true"]').first();
  readonly categorySelect = this.page.locator('select').first();
  readonly platformGrid = this.page.locator('#_r_6_-form-item');
  readonly platformButtons = this.platformGrid.locator('button');
  readonly imageInput = this.page.locator('input[type="file"]').first();
  readonly requirementsInput = this.page.locator('input[name="requirements"]');
  readonly attachmentLinkInput = this.page.getByPlaceholder('https://myshop.com/brief.pdf');
  readonly shippingCheckbox = this.page.locator('input[type="checkbox"]').first();
  readonly nextButton = this.page.getByRole('button', { name: 'ถัดไป' });
  readonly wizardHeading = this.page.getByText('สร้างแคมเปญใหม่');
  readonly stepOneButton = this.page.getByRole('button', {
    name: /ขั้นตอนที่ 1|ข้อมูลแคมเปญ/i,
  });
  readonly stepTwoButton = this.page.getByRole('button', {
    name: /2ระยะเวลา|ระยะเวลา/i,
  });
  readonly stepThreeButton = this.page.getByRole('button', {
    name: /3งบประมาณ|งบประมาณ/i,
  });
  readonly stepOneHeading = this.page.getByText('ข้อมูลหลักของแคมเปญ');
  readonly checklistHeading = this.page.getByText('CHECKLIST');
  readonly checklistFilledText = this.page.getByText(/กรอกแล้ว/);
  readonly previewTitle = this.page.getByRole('heading', { name: 'ชื่อแคมเปญ' });
  readonly imageAdjustText = this.page.getByText('ปรับแต่งรูปภาพ');
  readonly imageCropSaveButton = this.page.getByRole('button', { name: 'บันทึก' });
  readonly imageCropCancelButton = this.page.getByRole('button', { name: 'ยกเลิก' });
  readonly shellCreateCampaignLink = this.page.getByRole('link', { name: 'สร้างแคมเปญ' });
  readonly shellCampaignsLink = this.page.getByRole('link', { name: 'แคมเปญ', exact: true });
  readonly shellDashboardLink = this.page.getByRole('link', { name: 'ภาพรวม', exact: true });
  readonly shellPendingPaymentsLink = this.page.getByRole('link', {
    name: 'ค้างชำระ',
    exact: true,
  });
  readonly shellPaymentsHistoryLink = this.page.getByRole('link', {
    name: 'ประวัติการจ่ายเงิน',
    exact: true,
  });
  readonly shellProfileLink = this.page.getByRole('link', { name: 'โปรไฟล์', exact: true });
  readonly stepTwoHeading = this.page.getByText('กำหนดช่วงเวลา');
  readonly datePhaseHelperText = this.page.getByText('กำหนดวันที่แคมเปญเริ่มต้นและสิ้นสุด');
  readonly dateRangeFieldLabel = this.page.getByText('ระยะเวลาแคมเปญ').first();
  readonly datePickerButton = this.dateRangeFieldLabel.locator(
    'xpath=following::button[@type="button"][1]'
  );
  readonly dateValidationText = this.page.getByText('กรุณาเลือกวันเริ่มแคมเปญ');
  readonly backButton = this.page.getByRole('button', { name: 'ย้อนกลับ' });
  readonly visibleCalendarDay = this.page.locator('button[data-day]').first();
  readonly phaseThreeBudgetHeading = this.page.getByText('กำหนดงบประมาณ');
  readonly phaseThreeHelperText = this.page.getByText('ระบุ CPM และงบรวมของแคมเปญ');

  constructor(page: Page) {
    super(page);
  }

  async gotoCreateCampaign() {
    await this.goto('/brand/create-campaign');
  }

  async acceptCookiesIfVisible() {
    if (await this.acceptCookiesButton.isVisible().catch(() => false)) {
      await this.acceptCookiesButton.click();
    }
  }

  async expectOnCreateCampaignRoute() {
    await this.expectPath(/\/brand\/create-campaign$/);
    await expect(this.wizardHeading).toBeVisible();
  }

  async expectShellNavigationVisible() {
    await expect(this.shellCreateCampaignLink).toBeVisible();
    await expect(this.shellCampaignsLink).toBeVisible();
    await expect(this.shellDashboardLink).toBeVisible();
    await expect(this.shellPendingPaymentsLink).toBeVisible();
    await expect(this.shellPaymentsHistoryLink).toBeVisible();
    await expect(this.shellProfileLink).toBeVisible();
  }

  async expectStepOneSurfaceVisible() {
    await expect(this.stepOneHeading).toBeVisible();
    await expect(this.titleInput).toBeVisible();
    await expect(this.detailEditor).toBeVisible();
    await expect(this.categorySelect).toBeVisible();
    await expect(this.platformGrid).toBeVisible();
    await expect(this.imageInput).toBeAttached();
    await expect(this.requirementsInput).toBeVisible();
    await expect(this.attachmentLinkInput).toBeVisible();
    await expect(this.shippingCheckbox).toBeAttached();
    await expect(this.checklistHeading).toBeVisible();
  }

  async fillCampaignTitle(title: string) {
    await this.titleInput.fill(title);
  }

  async fillCampaignDetail(detail: string) {
    await this.detailEditor.click();
    await this.detailEditor.fill(detail);
  }

  async uploadCampaignImage(imagePath: string) {
    await this.imageInput.setInputFiles(path.resolve(imagePath));
  }

  async saveImageAdjustment() {
    const uploadResponse = this.page.waitForResponse(
      'https://api.windflu.com/api/v1/campaigns/images'
    );

    await this.imageCropSaveButton.click();
    await uploadResponse;
  }

  async fillStableStepOneData(campaign: BrandCreateCampaignData) {
    await this.fillCampaignTitle(campaign.title);
    await this.fillCampaignDetail(campaign.detail);
    await this.uploadCampaignImage(campaign.imagePath);
  }

  async selectFirstCategory() {
    await this.categorySelect.selectOption({ index: 1 });
  }

  async selectFirstPlatform() {
    await this.platformButtons.first().click();
  }

  async completeStableStepOne(campaign: BrandCreateCampaignData) {
    await this.fillStableStepOneData(campaign);
    await this.saveImageAdjustment();
    await this.selectFirstCategory();
    await this.selectFirstPlatform();
  }

  async clickNextConservatively() {
    await this.nextButton.click({ timeout: 3000 }).catch(async () => {
      await this.page.evaluate(() => {
        const nextButton = Array.from(document.querySelectorAll('button')).find((button) =>
          button.textContent?.includes('ถัดไป')
        );

        nextButton?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });
    });
  }

  async expectChecklistProgressAtLeastTwoOfSix() {
    await expect(this.checklistFilledText).toContainText('2/6');
  }

  async expectChecklistProgressAtLeastThreeOfSix() {
    await expect(this.checklistFilledText).toContainText('3/6');
  }

  async goToDatePhaseWithStableStepOne(campaign: BrandCreateCampaignData) {
    await this.completeStableStepOne(campaign);
    await this.clickNextConservatively();
    await expect(this.stepTwoHeading).toBeVisible();
  }

  async expectDatePhaseVisible() {
    await expect(this.stepTwoHeading).toBeVisible();
    await expect(this.datePhaseHelperText).toBeVisible();
    await expect(this.dateRangeFieldLabel).toBeVisible();
    await expect(this.datePickerButton).toBeVisible();
    await expect(this.backButton).toBeVisible();
  }

  async openDatePicker() {
    await this.datePickerButton.click();
  }

  async expectCalendarVisible() {
    await expect(this.visibleCalendarDay).toBeVisible();
  }

  calendarDay(dayLabel: string) {
    return this.page.locator(`button[data-day="${dayLabel}"]`);
  }

  async selectCampaignDateRange(startDay: string, endDay: string) {
    await this.page.waitForFunction(
      (day) => !!document.querySelector(`button[data-day="${day}"]`),
      startDay
    );
    await this.page.evaluate((day) => {
      const button = document.querySelector<HTMLButtonElement>(`button[data-day="${day}"]`);
      button?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    }, startDay);
    await expect(this.calendarDay(startDay)).toHaveAttribute('data-selected-single', 'true');

    await this.page.waitForTimeout(600);

    await this.page.waitForFunction(
      (day) => !!document.querySelector(`button[data-day="${day}"]`),
      endDay
    );
    await this.page.evaluate((day) => {
      const button = document.querySelector<HTMLButtonElement>(`button[data-day="${day}"]`);
      button?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    }, endDay);
    await expect(this.calendarDay(endDay)).toHaveAttribute('data-range-end', 'true');
  }

  async expectOnBudgetPhase() {
    await expect(this.phaseThreeBudgetHeading).toBeVisible();
    await expect(this.phaseThreeHelperText).toBeVisible();
  }

  checklistItem(name: string): Locator {
    return this.page.getByText(name).first();
  }
}
