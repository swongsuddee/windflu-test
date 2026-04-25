import { expect, type Page } from '@playwright/test';
import { BasePage } from './base-page';

export class AuthenticatedDashboardPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async gotoDashboard(routePath: string) {
    await this.goto(routePath);
  }

  async expectAuthenticatedDashboardRoute(expectedRoute: RegExp, blockedLoginRoute: RegExp) {
    await this.expectPath(expectedRoute);
    await expect(this.page).not.toHaveURL(blockedLoginRoute);
    await expect(this.body()).toBeVisible();
  }
}
