# FedEx Automation Test Strategy

## 1. Introduction

This Strategy proposal outlines a scalable automation approach for the FedEx US website that can be extended across regions and languages with minimal rework.

**Key Challenges:**
- Geolocation popups (e.g., US vs. Colombia selector)
- Multi-language support (e.g., Spanish, French)

```typescript
// Multilingual selector example
get locationPin(): Locator {
  return this.page.locator(`[data-testid="map-pin"]:has-text("${this.translate('Location')}")`);
}
```

---

## 2. Regional Support Strategy

### 2.1 Config per Region

```json
{
  "region": "fr_FR",
  "baseURL": "https://www.fedex.com/fr-fr/",
  "currency": "EUR",
  "postalCodeRegex": "^\\d{5}$"
}
```

- Extend test data (e.g., 75008 Paris vs. 10001 NYC)
- Translate validation/error messages (e.g., “Aucun résultat” in French)

### 2.2 Dynamic Geolocation Setup

```typescript
test.beforeEach(async ({ page }) => {
  await page.context().setGeolocation({
    latitude: regionConfig.lat,
    longitude: regionConfig.lng,
  });
});
```

- Ensures correct FedEx center markers and regional behaviors

---

## 3. Testing Scope by Region

### 3.1 United States (Baseline)
- ZIP search (e.g., 90210 → Beverly Hills)
- Rate calculation in USD
- English error handling

### 3.2 Europe (France, Germany)
- Postal code validation (e.g., 75008 for Paris)
- Metric units (kg)
- GDPR-compliant cookie banners

### 3.3 Latin America (Colombia, Mexico)
- Address formats (e.g., Calle 71 #27-57)
- COP / MXN currency assertions
- Spanish UI validation

---

## 4. Test Execution Strategy

| Pipeline      | Trigger           | Purpose                       |
|---------------|-------------------|-------------------------------|
| US-Regression | Nightly           | Validate core US features     |
| EU-Smoke      | On Merge to Main  | Validate FR/DE flows          |
| LATAM-Adhoc   | Manual            | Test new LATAM deployments    |

**Tech Stack:**
- Playwright workers: 3 regions in parallel
- Reports: Allure, tagged by region

---

## 5. Test Data Strategy

### 5.1 Data Types

| Type      | Source                | Example                    |
|-----------|-----------------------|----------------------------|
| Valid     | Anonymized prod-like  | PII-free shipments         |
| Invalid   | Synthetic             | Malformed tracking IDs     |
| Boundary  | Requirements Docs     | Max weight (150 lbs)       |
| Localized | Regional SMEs         | Japanese ZIP (〒 format)   |

### 5.2 Management

- Versioned by region: `test-data/us/shipments.json`
- Refreshed quarterly (aligned with pricing changes)

---

## 6. Environment Strategy

### 6.1 Environments

| Env      | Purpose                  | FedEx Configuration           |
|----------|--------------------------|-------------------------------|
| DEV      | Component testing        | Mock APIs only                |
| STAGE    | Integration testing      | Partial production connectivity|
| PRE-PROD | UAT / Performance        | Full production parity        |

## 7. Mobile Testing Strategy

- **Tool:** Appium + TypeScript
- **Devices:** Emulators + real iOS/Android devices

**Focus Areas:**
- Touch interactions (e.g., map pinch/zoom)
- Cross-device compatibility
- UI layout responsiveness

---

## 8. Risk Management

| Risk                    | Mitigation Strategy                |
|-------------------------|------------------------------------|
| Currency rounding issues| Use strict decimal validation      |
| Local legal changes     | Schedule quarterly compliance checks|
| Third-party API outages | Fallback mocks + retry logic       |

---

## 9. Reporting

- **Daily:** Jenkins dashboards (CI/CD runs)
- **Weekly:** Defect trend analysis via JIRA filters
- **Reports:** Consolidated by region using Allure

---

## 10. Continuous Improvement

### 10.1 Feedback Loops

- Sprint retrospectives focused on test gaps
- Root cause analysis for escaped defects (e.g., Pareto method)

### 10.2 Training & Growth

- 2 ISTQB certifications/year
- Quarterly Playwright workshops
- Biweekly peer reviews of test design

---