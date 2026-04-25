import { test } from '@playwright/test';
import { AuthenticatedDashboardPage } from '../../../page/authenticated-dashboard-page';
import { installCommonBrowserApiMocks } from '../util-services/browser-api-mock-service';
import { resolveAuthStorageState } from '../util-services/auth-storage-state-service';

const creatorStorageState = resolveAuthStorageState('creator');

test.describe('authenticated dashboard route access', () => {
  test.describe('creator dashboard', () => {
    test.use(creatorStorageState ? { storageState: creatorStorageState } : {});

    test('AUT-001 creator dashboard opens with authenticated storage state', async ({ page }) => {
      test.skip(!creatorStorageState, 'Creator authenticated storage state is required.');

      const dashboardPage = new AuthenticatedDashboardPage(page);

      await installCommonBrowserApiMocks(page);
      await dashboardPage.gotoDashboard('/creator/dashboard');
      await dashboardPage.expectAuthenticatedDashboardRoute(
        /\/creator\/dashboard$/,
        /\/login(?:\?|$)/
      );
    });
  });
});
