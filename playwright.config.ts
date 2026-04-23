import { defineConfig, devices } from '@playwright/test';
import { devStorageStatePath } from './playwright/auth-storage';

const baseURL = 'https://www.windflu.com';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  globalSetup: './playwright/global-setup.ts',
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL,
    storageState: devStorageStatePath,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'web-ui',
      testDir: './tests/web-ui',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
    {
      name: 'api',
      testDir: './tests/api',
    },
  ],
});
