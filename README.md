# FedEx UI Automation for Locations and Rates & Ship Flows

## Overview

This project automates the FedEx web user interface for Locations and Rates & Ship flows using Playwright and TypeScript. It provides  end-to-end tests for shipping and location search features, following the Page Object Model for maintainability and scalability.

## Tech Stack

- **Playwright Test** 
- **TypeScript**  
- **Page Object Model** 

## Prerequisites

- Node.js >= 16  
- npm  

## Setup

1. **Clone & install**
    ```bash
    git clone <repo-url>
    cd <repo>
    npm install
    npx playwright install
    ```

## NPM Scripts

```json
"test": "playwright test",
"test:qa": "cross-env TEST_ENV=dev playwright test",
"test:staging": "cross-env TEST_ENV=staging playwright test",
"test:chromium": "playwright test --project=chromium",
"test:webkit": "playwright test --project=webkit-1600x900",
"test:mobile-safari": "playwright test --project=iPhone-15"
```

## Usage Examples

- `npm run test:chromium tests/locations`  
  Runs only the Locations tests using the Chromium browser.

- `npm run test:chromium tests/rateAndShip`  
  Runs only the Rate & Ship tests using the Chromium browser.

- `npx playwright test --project=iPhone-15`  
  Runs all tests using the Galaxy Note 4 mobile emulation.

- `npm run test`  
  Runs all Playwright tests using the default configuration and all defined browsers/projects.

**Recommended:**  
To run Locations or Rate & Ship tests separately and with a single browser (Chromium), use:
```bash
npm run test:chromium tests/locations
npm run test:chromium tests/rateAndShip
```

## Test Reports

Playwright automatically generates HTML and JSON reports for your test runs, as configured in `playwright.config.ts`.  
- **Success:** After a successful run, open the HTML report with:
    ```bash
    npx playwright show-report
    ```
    This displays a summary of all passing tests, including screenshots and execution traces if enabled.
- **Failure:** For failing tests, the report highlights errors, stack traces, and attaches screenshots, video and traces for debugging.  

## Test Data Usage

Test data for tests is stored in the `test-data` folder.  

## Type Handling in Models

All types and interfaces used for test data and page objects are defined in the `models` folder.  
- TypeScript interfaces (e.g., `ShipmentData`, `LocationsDetails`) 

## Environment Setup

**Note:(Not available- Proposal)** Currently, access is limited to the development environment; staging, production, and QA environments are not available to the user.

for test envs use: baseURL: baseURLs[env],

The npm scripts include environment variables (e.g., `TEST_ENV=dev`, `TEST_ENV=staging`) as a proposal for future scalability.  

If environment access becomes available, you can run tests against a specific environment by setting the `TEST_ENV` variable in your script or command. For example:

```bash
# Run tests against the QA environment (Not available)
npm run test:qa

# Or set the environment variable manually (Not available)
TEST_ENV=staging npx playwright test
```

The tests and configuration can use `process.env.TEST_ENV` to load environment-specific URLs, credentials, or data.

## Authors

- Octavio Restrepo  
  [octavio.restrepo@endava.com](mailto:octavio.restrepo@endava.com)

## Project Documentation

- documents folder