import { test } from '@playwright/test';
import { PolicyPage } from '../../../page/policy-page';

test.describe('legal policy unauthenticated flow', () => {
  test('PUB-028 policy tabs route safely without locking content details', async ({ page }) => {
    const policyPage = new PolicyPage(page);

    await policyPage.gotoPrivacy();
    await policyPage.expectPrivacyRoute();

    await policyPage.termsTab.click();
    await policyPage.expectTermsRoute();
  });
});
