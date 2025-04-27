# 📸 Playwright Tests für UI & Funktionalität

Dieses Projekt verwendet **[Playwright](https://playwright.dev/)**, um Webanwendungen automatisch zu testen:
- **Funktionalität** (z.B. Navigation, Links, Formulare)
- **Layout & visuelle Regression** (Vergleich von Screenshots)
- **Responsiveness** (Ansicht auf verschiedenen Bildschirmgrößen)

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
| Layout/Screenshot | Vollautomatischer Pixel-zu-Pixel Vergleich von Screenshots |
| Responsiveness | Simulieren von verschiedenen Viewports (Handy, Tablet, Desktop) |
| Interaktionen | Formulare ausfüllen, Maus-Hover, Tastatur-Navigation |
| Netzwerk | Mocking und Abfangen von API-Requests |

---

## 📸 Visual Testing (Screenshot Vergleich)

Mit Playwright kannst du Screenshots deiner Website erstellen und diese automatisch mit gespeicherten Snapshots vergleichen.

**Beispiel:**

```ts
// Screenshot erstellen und mit gespeichertem vergleichen
expect(await page.screenshot()).toMatchSnapshot('form-filled.png');
```

✅ Wenn die Screenshots identisch sind → Test bestanden.  
❌ Wenn Unterschiede existieren → Playwright zeigt ein **Diff-Bild**, wo genau sich etwas verändert hat.

---

### 🔥 Vorteile von Screenshot-Tests

- Perfekt um ungewollte **Layout-Änderungen** früh zu entdecken.
- Ideal für CI/CD Pipelines (z.B. Bitbucket).
- Spart händisches Abklicken von UI-Änderungen.

---

### 📸 Wenn ein Layout bewusst geändert wurde

Wenn du **bewusst** das Design geändert hast, musst du die Snapshots aktualisieren:

```bash
npx playwright test --update-snapshots
```

---

## ⚙️ Automatisierung in Bitbucket Pipelines

### 1. Playwright installieren

Im Projekt muss Playwright + Browser-Dependencies installiert sein:

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
          - playwright-report/** # Test-Report speichern
```

**Erklärung:**
- Nutzt ein offizielles Playwright-Docker-Image
- Installiert Abhängigkeiten
- Führt Tests aus
- Speichert Reports als **Artifacts** (optional: für Download und Review)

---

## 📚 Nützliche Playwright Befehle

| Befehl | Beschreibung |
|:----|:----|
| `npx playwright test` | Alle Tests ausführen |
| `npx playwright test example.spec.ts` | Bestimmte Datei testen |
| `npx playwright test --grep "Viewport"` | Tests mit Namen filtern |
| `npx playwright test --update-snapshots` | Snapshots neu erstellen |
| `npx playwright codegen https://example.com` | Testskripte automatisch aufzeichnen |

---

## 💬 Warum Playwright?

- Multi-Browser Support (Chromium, Firefox, WebKit)
- Integrierte Video- und Screenshot-Aufzeichnung
- Starke Netzwerk- und API-Testmöglichkeiten
- Parallelisierung out-of-the-box
- Super für moderne CI/CD Workflows

---

# 🚀 Let's catch bugs before users do!
```

---
