# FedEx Global Web Test Plan

_Focused on US Site with Scalability for International Expansion_

---

## 1. Test Objectives

- Validate core functionality of the US site ([fedex.com/en-us/](https://www.fedex.com/en-us/)), including:
  - Location search and map interactions
  - Rate calculation and shipping workflows
- Ensure the automation framework can extend to international versions with minimal changes
- Verify multi-language and multi-currency support

---

## 2. Test Scope

### In Scope

| Feature              | US Validation                | Scalability Consideration                       |
|----------------------|-----------------------------|------------------------------------------------|
| Location Search      | ZIP code, city, state       | Support international postal formats           |
| Interactive Map      | Marker display, pin clicks  | Localized map tiles and labels                 |
| Rate Calculator      | USD pricing, weight in lbs  | Dynamic currency switching                     |
| Address Autocomplete | US street addresses         | Global address formats (e.g., Carrera in Colombia) |
| Error Messaging      | English-only validation     | Multi-language error text detection            |

### Out of Scope

- Performance and load testing

---

## 3. Test Approach

### Test Types

| Type           | Tool       | Coverage                                    |
|----------------|------------|---------------------------------------------|
| UI Functional  | Playwright | Core user journeys (search, rates, maps)    |
| API Validation | Playwright | Mock responses for rates/locations          |
| Cross-Browser  | Playwright | Chrome, Firefox, Safari                     |
| Mobile Emulation | Playwright | iPhone 15, iPad Pro                        |

---

## 4. Test Environment

| Component           | Details                                      |
|---------------------|----------------------------------------------|
| Application URL     | [https://www.fedex.com/en-us/](https://www.fedex.com/en-us/) |
| Supported Browsers  | Chrome (primary), Firefox, Safari            |
| Devices             | Desktop, iPhone-15 (emulated), Tablet (simulated) |

---

## 5. Artifacts & Metrics

### 5.1 Traceability

| Tool         | Usage                                 |
|--------------|---------------------------------------|
| Zephyr Scale | Test cases tagged by region/language  |
| Jira         | Defects linked to locale (e.g., es_MX)|

### 5.2 Key Metrics

| Metric               | US Target | Global Target         |
|----------------------|-----------|----------------------|
| Localization coverage| N/A       | ≥80% per region      |
| Selector stability   | 99%       | 95% (translated)     |
| Currency accuracy    | 100%      | 100%                 |

- **Automation Coverage (%):** Critical paths automated
- **Flakiness Rate (<5%):** Unstable tests
- **Execution Time:** Optimized for CI speed
- **Defect Escape Rate:** Post-release bugs

#### Mobile Testing

- **Framework:** Appium (TypeScript)
- **Devices:** BrowserStack / Sauce Labs (iOS & Android)
- **Integration:** Same CI pipeline (parallel jobs)

---

## 6. Maintenance Plan

- **Monthly:** Update region configs for new FedEx locations
- **Quarterly:** Review localized selectors with regional teams
- **Ad-hoc:** Add new markets in ≤2 days (using base framework)

**Example Expansion to Japan:**
- Add `ja_JP` config with yen support
- Extend address autocomplete for Japanese format
- Run smoke tests → merge

---

## 7. Roles and Responsibilities

| Role               | Responsibilities                                 |
|--------------------|--------------------------------------------------|
| QA Lead            | Define test strategy, planning, oversight        |
| QA Engineer        | Execute test cases, report bugs, perform validations |
| Automation Engineer| Design and maintain Playwright test scripts      |

---

## 8. Bug Management

- Bugs logged with detailed repro steps and expected vs. actual outcomes
- Regular triage meetings to prioritize and assign bugs

---

## 9. Exit Criteria

Testing is considered complete when:

- ≥90% test cases pass with no critical issues
- All P0 and P1 defects are resolved
- Final test reports and documentation are completed

---

## 10. Test Schedule

| Phase                    | Date (YYYY/MM/DD) |
|--------------------------|------------------|
| Test Planning & Review   | [Enter Date]     |
| Test Case Preparation    | [Enter Date]     |
| Test Execution (Manual/Auto) | [Enter Date] |
| Bug Reporting & Retesting| [Enter Date]     |
| Final Report & Sign-off  | [Enter Date]     |

---