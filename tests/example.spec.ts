import { test, expect } from '@playwright/test';

const URL = 'https://playwright.dev/';

test('Homepage title and visual snapshot', async ({ page }) => {
  await page.goto(URL);
  await expect(page).toHaveTitle(/Playwright/);

  // Full-page Screenshot Vergleich
  expect(await page.screenshot({ fullPage: true })).toMatchSnapshot('homepage-full.png');
});

test('Navigate to Get Started and verify Installation heading', async ({ page }) => {
  await page.goto(URL);
  await page.getByRole('link', { name: 'Get started' }).click();
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();

  // Visual Snapshot der Installation-Seite
  expect(await page.screenshot()).toMatchSnapshot('installation-page.png');
});

test('Verify GitHub link href', async ({ page }) => {
  await page.goto(URL);
  const githubLink = page.getByRole('link', { name: 'GitHub' });
  await expect(githubLink).toHaveAttribute('href', 'https://github.com/microsoft/playwright');
});

test('Count number of links', async ({ page }) => {
  await page.goto(URL);
  const links = page.locator('a');
  await expect(links).toHaveCount(20); // Beispiel - kann je nach Seite variieren
});

test('Viewport responsiveness check', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 }); // iPhone 8
  await page.goto(URL);
  await expect(page).toHaveTitle(/Playwright/);

  // Visual Snapshot für Mobile Ansicht
  expect(await page.screenshot({ fullPage: true })).toMatchSnapshot('homepage-mobile.png');
});

test('Hover over Docs nav item', async ({ page }) => {
  await page.goto(URL);
  await page.hover('nav >> text=Docs');
  // Hier könntest du prüfen, ob ein Tooltip erscheint, wenn es einen gibt
});

test('Network request mocking example', async ({ page }) => {
  await page.route('**/api/**', async route => {
    await route.fulfill({
      status: 200,
      body: JSON.stringify({ mocked: true }),
      contentType: 'application/json',
    });
  });

  await page.goto(URL);
  // Optional: Irgendeine API-abhängige Komponente anklicken und Erwartung prüfen
});

test('Multiple pages in parallel', async ({ browser }) => {
  const context = await browser.newContext();
  const page1 = await context.newPage();
  const page2 = await context.newPage();

  await Promise.all([
    page1.goto('https://playwright.dev/'),
    page2.goto('https://example.com/')
  ]);

  await expect(page1).toHaveTitle(/Playwright/);
  await expect(page2).toHaveTitle(/Example Domain/);

  await context.close();
});

test('Form filling example (W3Schools)', async ({ page }) => {
  await page.goto('https://www.w3schools.com/html/html_forms.asp');
  await page.fill('input[name="firstname"]', 'John');
  await page.fill('input[name="lastname"]', 'Doe');

  // Screenshot des ausgefüllten Formulars
  expect(await page.screenshot()).toMatchSnapshot('form-filled.png');
});

test('Tab and Enter keyboard navigation', async ({ page }) => {
  await page.goto(URL);
  await page.keyboard.press('Tab');
  await page.keyboard.press('Enter');
  // Erwartung: Irgendeine Veränderung könnte geprüft werden
});
