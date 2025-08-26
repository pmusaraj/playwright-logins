import { test, expect } from '@playwright/test';

const loginPageUrl = process.env.SITE_URL ? `${process.env.SITE_URL}/login` : 'https://id.discourse.com/login';
const screenshotPrefix = loginPageUrl.replace(/^https?:\/\//, '').replace(/\/login$/, '');

test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== testInfo.expectedStatus) {
    const screenshotPath = `screenshots/screenshot-${screenshotPrefix}.png`;
    await page.screenshot({ path: screenshotPath, timeout: 5000 });
 }
});

test('Facebook Login', async ({ page }) => {
  await page.goto(loginPageUrl);

  await page.locator('.btn-social.facebook').click();

  await expect(page.locator('input[name="email"]')).toBeVisible();
  await expect(page.locator('input[type="password"]')).toBeVisible();

  // For debugging, only applies when running tests in headed mode
  // await page.pause();
});
