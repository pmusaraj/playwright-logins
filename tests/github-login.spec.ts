import { test, expect } from '@playwright/test';

const loginPageUrl = process.env.SITE_URL ? `${process.env.SITE_URL}/login` : 'https://id.discourse.com/login';
const screenshotPrefix = loginPageUrl.replace(/^https?:\/\//, '').replace(/\/login$/, '');

test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== testInfo.expectedStatus) {
    const screenshotPath = `screenshots/github/screenshot-${screenshotPrefix}.png`;
    await page.screenshot({ path: screenshotPath, timeout: 5000 });
 }
});

test('GitHub Login', async ({ page }) => {
  await page.goto(loginPageUrl);

  if (page.url().includes(loginPageUrl)) {
    // Click the button if it is not the only login method (if it is, page redirects)
    await page.locator('.btn-social.github').click();
  }

  await expect(page.locator('input[name="login"]')).toBeVisible();
  await expect(page.locator('input[type="submit"]').first()).toBeVisible();

  // For debugging, only applies when running tests in headed mode
  // await page.pause();
});
