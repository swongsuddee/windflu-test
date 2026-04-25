import { test as setup } from '@playwright/test';
import { BrandLoginPage } from '../../page/brand-login-page';
import { brandStorageStatePath, devStorageStatePath } from '../../../playwright/auth-storage';
import { getBrandLoginCredentials } from '../../test-data/login-test-data';
import {
  saveAuthenticatedStorageState,
  type AuthSetupResult,
} from '../../util-services/auth-login-setup.service';

setup('create brand authenticated storage states from dev base state', async ({ browser }) => {
  const brandContext = await browser.newContext({ storageState: devStorageStatePath });
  const brandPage = await brandContext.newPage();
  let brandResult: AuthSetupResult;

  try {
    const brandLoginPage = new BrandLoginPage(brandPage);

    brandResult = await saveAuthenticatedStorageState({
      credentials: getBrandLoginCredentials(),
      loginPath: '/brand/login',
      page: brandPage,
      performLogin: async (credentials) => {
        await brandLoginPage.gotoLogin();
        await brandLoginPage.expectLoaded();
        await brandLoginPage.login(credentials.email, credentials.password);
      },
      storageStatePath: brandStorageStatePath,
    });
  } finally {
    await brandContext.close();
  }

  console.info(
    [`brand storage: ${brandResult}`, `brand path: ${brandStorageStatePath}`].join('\n')
  );
});
