## ✨ Weitere wichtige Themen für dein README:

- **Full Page Screenshots**: ganze Seite aufnehmen, nicht nur den sichtbaren Bereich
- **Element Screenshots**: gezielt einzelne Komponenten abfotografieren
- **Soft Assertions**: mehrere Fehler gleichzeitig sammeln (nicht bei erstem Fehler abbrechen)
- **Videoaufnahmen**: Testdurchläufe automatisch aufzeichnen (sehr praktisch für Debugging)
- **Retries bei Fehlern**: Tests automatisch neu versuchen (für z.B. flaky Tests)
- **Parallelisierung und Sharding**: schnellere Tests in CI/CD
- **Flakes aufdecken**: Playwright hat Mechanismen, um instabile Tests aufzuspüren
- **Visuelle Regressionsbeispiele (inkl. Bild-Diff)**

---

Ich aktualisiere dein README jetzt mit **diesen Extras**, inklusive **Beispiel für ein Screenshot-Diff**, damit es perfekt ist für die Präsentation im Büro. 📄

Hier die erweiterte Version:

---

```markdown
# 📸 Playwright Tests für UI & Funktionalität

Dieses Projekt verwendet **[Playwright](https://playwright.dev/)**, um Webanwendungen automatisch und umfassend zu testen:
- **Funktionalität** (Navigation, Links, Formulare, APIs)
- **Layout & visuelle Regression** (Pixelgenaue Screenshotvergleiche)
- **Responsiveness** (verschiedene Bildschirmgrößen testen)
- **Performance und Stabilität** (Retries, Flake Detection)

---

## 🚀 Schnellstart

```bash
# Installation
npm install

# Tests lokal ausführen
npx playwright test

# Test-Report öffnen
npx playwright show-report
```

---

## 🧪 Was wird getestet?

| Kategorie | Beispiel |
|:-----------|:---------|
| Navigation | Klicken auf Buttons und Links, Überprüfen von Zielseiten |
| Inhalt | Überprüfen von Texten, Überschriften, Attributen |
| Layout/Screenshot | Pixel-zu-Pixel Vergleich von UI-Elementen |
| Responsiveness | Simulieren von Viewports (Smartphones, Tablets, Desktops) |
| Interaktionen | Formulare ausfüllen, Hover-Effekte, Tastaturnavigation |
| Netzwerk | API-Request Mocking und Response-Validation |
| Stabilität | Wiederholungen bei flüchtigen Fehlern, Flake-Detection |

---

## 📸 Visual Testing (Screenshot Vergleich)

### Beispiel-Test:

```ts
test('Formular ausgefüllt - visuelle Überprüfung', async ({ page }) => {
  await page.goto('http://localhost:5173');
  await page.fill('input[name="email"]', 'test@example.com');
  await page.fill('input[name="password"]', '123456');
  await page.click('button[type="submit"]');

  // Screenshot erstellen und vergleichen
  expect(await page.screenshot()).toMatchSnapshot('form-filled.png');
});
```

---

### 📷 Unterschiedliche Arten von Screenshots

| Typ | Beispiel |
|:----|:---------|
| Ganzer Bildschirm | `await page.screenshot({ fullPage: true });` |
| Bestimmtes Element | `await page.locator('header').screenshot();` |

---

### 📸 Beispiel für ein Screenshot-Diff

Wenn ein Screenshot-Test fehlschlägt, erzeugt Playwright automatisch:
- **Expected** (erwartetes Bild)
- **Actual** (aktuelles Ergebnis)
- **Diff** (markiert Unterschiede)

**Beispiel:**

| Expected | Actual | Diff |
|:--------:|:------:|:----:|
| ![expected](./tests/snapshots/form-filled-expected.png) | ![actual](./test-results/form-filled-actual.png) | ![diff](./test-results/form-filled-diff.png) |

👀 Dadurch siehst du **sofort**, welche Layout-Änderung den Test gebrochen hat.

---

### 📸 Layout bewusst geändert?

Wenn sich das Design bewusst geändert hat:

```bash
npx playwright test --update-snapshots
```

→ Dadurch akzeptierst du den neuen Screenshot als neue Referenz.

---

## 📱 Responsive Testing

Playwright ermöglicht es, verschiedene Geräte- und Bildschirmgrößen zu simulieren:

### Beispiel-Test:

```ts
test('Mobile Navigation sichtbar', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 }); // iPhone 8 Größe
  await page.goto('http://localhost:5173');
  
  const menuButton = page.locator('button.menu-toggle');
  await expect(menuButton).toBeVisible();
});
```

---

## 🎥 Videoaufnahmen & Artefakte

Alle Testläufe können automatisch aufgenommen werden:

```ts
// playwright.config.ts
use: {
  video: 'on',
  screenshot: 'only-on-failure'
}
```

- **Videoaufzeichnung** zeigt genau, was schiefgelaufen ist.
- **Screenshots bei Fehlern** sparen Zeit beim Debugging.

---

## 🔄 Soft Assertions

Anstatt beim ersten Fehler abzubrechen, können mehrere Asserts gesammelt werden:

```ts
test('Mehrere Checks', async ({ expect, page }) => {
  await page.goto('http://localhost:5173');

  await expect.soft(page.locator('h1')).toHaveText('Willkommen');
  await expect.soft(page.locator('footer')).toBeVisible();
  await expect.soft(page.locator('nav')).toHaveAttribute('role', 'navigation');
});
```

→ Am Ende zeigt Playwright **alle** Fehler gesammelt an.

---

## ⚡ Stabilität: Retries & Flake Detection

### Retries aktivieren:

```ts
// playwright.config.ts
retries: 2
```

→ Test wird bei Fehlern bis zu 2x erneut ausgeführt, bevor er endgültig fehlschlägt.

### Flake Detection:

Playwright erkennt, ob ein Test manchmal fluktuiert ("flaky") → super nützlich für Stabilitätsprüfungen!

---

## ⚙️ Automatisierung in Bitbucket Pipelines

### Beispiel `.bitbucket-pipelines.yml`:

```yaml
image: mcr.microsoft.com/playwright:v1.45.0-focal

pipelines:
  default:
    - step:
        name: Run Playwright Tests
        caches:
          - node
        script:
          - npm ci
          - npx playwright install --with-deps
          - npx playwright test
        artifacts:
          - playwright-report/**
```

### Ablauf:

- Node Modules cachen
- Abhängigkeiten installieren
- Browser installieren
- Tests ausführen
- Reports und Screenshots als **Artifacts** speichern

---

## 📚 Nützliche Playwright Befehle

| Befehl | Beschreibung |
|:----|:----|
| `npx playwright test` | Alle Tests ausführen |
| `npx playwright test example.spec.ts` | Nur eine Datei testen |
| `npx playwright test --grep "Viewport"` | Tests anhand Namen filtern |
| `npx playwright test --update-snapshots` | Snapshots aktualisieren |
| `npx playwright show-report` | Testreport lokal im Browser öffnen |
| `npx playwright codegen https://example.com` | Test-Skript automatisch aufzeichnen (Recorder) |

---

## 💬 Warum Playwright?

- Testet auf **Chromium**, **Firefox**, **WebKit**
- Volle Unterstützung für **Headless** und **Headed Mode**
- Automatische Video- und Screenshotaufzeichnung
- **Schnelle Parallelisierung** möglich
- Perfekt integrierbar in **CI/CD Pipelines**
- Unterstützt **Mocking**, **Interception** und **Network Assertions**

---

# 🚀 Let's catch bugs before users do!
