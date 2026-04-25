import { test as setup } from '@playwright/test';
import { CreatorLoginPage } from '../../page/creator-login-page';
import { creatorStorageStatePath, devStorageStatePath } from '../../../playwright/auth-storage';
import { getCreatorLoginCredentials } from '../../test-data/login-test-data';
import {
  saveAuthenticatedStorageState,
  type AuthSetupResult,
} from '../../util-services/auth-login-setup.service';

setup('create creator authenticated storage states from dev base state', async ({ browser }) => {
  const creatorContext = await browser.newContext({ storageState: devStorageStatePath });
  const creatorPage = await creatorContext.newPage();
  let creatorResult: AuthSetupResult;

  try {
    const creatorLoginPage = new CreatorLoginPage(creatorPage);

    creatorResult = await saveAuthenticatedStorageState({
      credentials: getCreatorLoginCredentials(),
      loginPath: '/login',
      page: creatorPage,
      performLogin: async (credentials) => {
        await creatorLoginPage.gotoLogin();
        await creatorLoginPage.expectLoaded();
        await creatorLoginPage.loginWithEmail(credentials.email, credentials.password);
      },
      storageStatePath: creatorStorageStatePath,
    });
  } finally {
    await creatorContext.close();
  }

  console.info(
    [`creator storage: ${creatorResult}`, `creator path: ${creatorStorageStatePath}`].join('\n')
  );
});
