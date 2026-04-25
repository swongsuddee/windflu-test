import { existsSync, readFileSync } from 'fs';
import { defineConfig, devices } from '@playwright/test';
import { devStorageStatePath } from './playwright/auth-storage';

function loadLocalEnvFile(path: string) {
  if (!existsSync(path)) {
    return;
  }

  const lines = readFileSync(path, 'utf8').split(/\r?\n/);

  for (const line of lines) {
    const trimmedLine = line.trim();

    if (!trimmedLine || trimmedLine.startsWith('#')) {
      continue;
    }

    const separatorIndex = trimmedLine.indexOf('=');
    if (separatorIndex === -1) {
      continue;
    }

    const key = trimmedLine.slice(0, separatorIndex).trim();
    const value = trimmedLine.slice(separatorIndex + 1).trim();

    if (!key || process.env[key]) {
      continue;
    }

    process.env[key] = value;
  }
}

loadLocalEnvFile('.env');

const baseURL = 'https://www.windflu.com';
const desktopChrome = devices['Desktop Chrome'];

export default defineConfig({
  testDir: './src/test',
  fullyParallel: true,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'global-setup',
      testDir: './src/test/web-ui/',
      testMatch: '*.setup.ts',
      use: {
        ...desktopChrome,
        storageState: devStorageStatePath,
      },
    },
    {
      name: 'web-ui-unauthenticated',
      testDir: './src/test/web-ui',
      testMatch: '*.spec.ts',
      testIgnore: ['**/authenticated-user/**/*.spec.ts'],
      use: {
        ...desktopChrome,
        storageState: devStorageStatePath,
      },
    },
    {
      name: 'web-ui-authenticated',
      testDir: './src/test/web-ui',
      testMatch: ['**/authenticated-user/**/*.spec.ts'],
      use: {
        ...desktopChrome,
        storageState: devStorageStatePath,
      },
      dependencies: ['global-setup'],
    },
    {
      name: 'api',
      testDir: './src/test/api',
      testMatch: '*.spec.ts',
    },
  ],
});
