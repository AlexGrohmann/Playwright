import { test, expect } from "@playwright/test";

// 🌐 Navigation Test
test("Navigation: Klick auf Button navigiert zur Zielseite", async ({
  page,
}) => {
  await page.goto("http://localhost:5173");
  await page.click("text=Zur Anmeldung"); // Beispiel-Button
  await expect(page).toHaveURL(/.*login/);
});

// 📝 Inhalt Test
test("Inhalt: Überschrift korrekt angezeigt", async ({ page }) => {
  await page.goto("http://localhost:5173");
  const heading = page.locator("h1");
  await expect(heading).toHaveText("Willkommen auf unserer Seite!");
});

// 🖼️ Layout/Screenshot Vergleich Test
test("Layout: Pixelgenauer Screenshot Vergleich", async ({ page }) => {
  await page.goto("http://localhost:5173");
  await expect(await page.screenshot()).toMatchSnapshot("homepage-layout.png");
});

// 📱 Responsiveness Test
test("Responsiveness: Menü-Button auf Mobile sichtbar", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 }); // iPhone 8 Größe
  await page.goto("http://localhost:5173");
  const mobileMenuButton = page.locator("button.menu-toggle");
  await expect(mobileMenuButton).toBeVisible();
});

// 🎯 Interaktion Test
test("Interaktion: Formular erfolgreich absenden", async ({ page }) => {
  await page.goto("http://localhost:5173/contact");
  await page.fill('input[name="name"]', "Max Mustermann");
  await page.fill('input[name="email"]', "max@example.com");
  await page.click('button[type="submit"]');
  await expect(page.locator(".success-message")).toBeVisible();
});

// 🌐 Netzwerk (API Mocking) Test
test("Netzwerk: API-Request mocken und Antwort validieren", async ({
  page,
}) => {
  await page.route("**/api/user", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ id: 1, name: "Mock User" }),
    });
  });

  await page.goto("http://localhost:5173/profile");
  const username = page.locator(".username");
  await expect(username).toHaveText("Mock User");
});

// 🔁 Stabilität: Retry-Test (konzipiert für instabile Elemente)
test("Stabilität: Element wird nach Reload sichtbar", async ({ page }) => {
  await page.goto("http://localhost:5173");
  await page.reload(); // absichtlicher Reload
  const delayedElement = page.locator("#delayed-element");
  await expect(delayedElement).toBeVisible();
});

// 🔄 Soft Assertions Test
test("Soft Assertions: Mehrere Inhalte parallel prüfen", async ({ page }) => {
  await page.goto("http://localhost:5173");

  await expect.soft(page.locator("header")).toBeVisible();
  await expect.soft(page.locator("footer")).toBeVisible();
  await expect.soft(page.locator("nav")).toHaveAttribute("role", "navigation");
});

// 🎥 Videoaufzeichnung Konfiguration
// In playwright.config.ts:
// use: {
//   video: 'on',
//   screenshot: 'only-on-failure'
// }
// Videos der fehlgeschlagenen Tests werden dann gespeichert.

// 📸 Ganzer Bildschirm Screenshot
test("Screenshot: Ganze Seite aufnehmen", async ({ page }) => {
  await page.goto("http://localhost:5173");
  await page.screenshot({ path: "fullpage.png", fullPage: true });
});

// 📸 Screenshot eines bestimmten Elements
test("Screenshot: Einzelnes Element aufnehmen", async ({ page }) => {
  await page.goto("http://localhost:5173");
  const heroSection = page.locator(".hero");
  await heroSection.screenshot({ path: "hero-section.png" });
});
