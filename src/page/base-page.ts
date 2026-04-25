import { expect, type Page } from '@playwright/test';

export class BasePage {
  constructor(protected readonly page: Page) {}

  async goto(path: string) {
    await this.page.goto(path);
    await expect(this.page.locator('body')).toBeVisible();
  }

  async blockMutations() {
    await this.page.route('**/*', async (route) => {
      const method = route.request().method();

      if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
        await route.abort();
        return;
      }

      await route.continue();
    });
  }

  async expectPath(pattern: RegExp) {
    await expect(this.page).toHaveURL(pattern);
  }

  body() {
    return this.page.locator('body');
  }
}
