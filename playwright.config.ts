import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  use: {
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    baseURL: 'https://playwright.dev/',
  },
  expect: {
    timeout: 5000,
  },
  workers: 4, // Parallelität
});
