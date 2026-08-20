# Coffee Cart Playwright Assessment

## Overview

This repository contains a foundational Playwright + TypeScript framework for:

https://coffee-cart.app/

It automates the required flow:

**Add Product → Handle Promo Popup → Checkout → Submit Payment Details → Verify Success**

It also includes automated tests for all three requested bonus features.

## Architecture

```text
coffee-cart-playwright/
├── .github/
│   └── workflows/
│       └── playwright.yml
├── data/
│   └── test-data.ts
├── fixtures/
│   └── coffee.fixture.ts
├── pages/
│   ├── CoffeeMenuPage.ts
│   └── PaymentDetailsPage.ts
├── tests/
│   ├── checkout.spec.ts
│   └── bonus.spec.ts
├── .env.example
├── .gitignore
├── package.json
├── playwright.config.ts
├── README.md
└── tsconfig.json
```

## Framework Design

### Page Object Model

Application interactions and locators are encapsulated in Page Objects:

- `CoffeeMenuPage`
- `PaymentDetailsPage`

Test specifications stay focused on business behavior instead of implementation details.

### Fixtures

`fixtures/coffee.fixture.ts` provides reusable Page Objects, common setup, and cleanup.

Playwright's isolated browser context keeps tests independent. Explicit cookie and storage cleanup is also included in fixture teardown for future framework reuse.

### Test Data Isolation

Customer data, product names, translations, and expected messages are stored in:

```text
data/test-data.ts
```

This keeps data changes separate from test logic.

### Synchronization

The framework contains no:

```text
sleep()
waitForTimeout()
```

or arbitrary timing delays.

Synchronization uses Playwright actionability checks, auto-waiting, locators, and web-first assertions.

## Locator Strategy

Locators were selected from the target application's actual markup/source.

Examples:

- Coffee cups expose exact `aria-label` values such as `Espresso`.
- Checkout exposes `aria-label="Proceed to checkout"` and `data-test="checkout"`.
- Payment form exposes `aria-label="Payment form"`.
- Name and Email inputs have associated labels.
- Promo popup exposes exact action buttons.
- Add-to-cart context dialog exposes `data-cy="add-to-cart-modal"`.

Accessible locators are preferred where available, with application test attributes used where they provide a stable boundary.

## Required Flow

The main test intentionally adds three products because the Coffee Cart application displays its promotion after every third cart item.

The flow therefore exercises all required steps deterministically:

1. Add products.
2. Promo appears.
3. Skip promo.
4. Proceed to checkout.
5. Enter Name and Email in the Payment Details form.
6. Submit.
7. Verify the purchase success message.

## Bonus Coverage

`tests/bonus.spec.ts` covers:

1. Double-click coffee title → Chinese translation.
2. Right-click coffee cup → add-to-cart dialog.
3. Promo popup → every third cart item.

## Installation

```bash
npm install
npx playwright install --with-deps chromium
```

## Run All Tests

```bash
npm test
```

## Run Required Checkout Test

```bash
npm run test:smoke
```

## Run Bonus Tests

```bash
npm run test:bonus
```

## Run Headed

```bash
npm run test:headed
```

## View Report

```bash
npm run test:report
```

## CI

`.github/workflows/playwright.yml` demonstrates execution in GitHub Actions.

The workflow:

1. Checks out the repository.
2. Installs Node.js.
3. Installs dependencies.
4. Installs Chromium.
5. Runs TypeScript type checking.
6. Executes Playwright tests.
7. Uploads HTML reports.
8. Uploads failure artifacts.

The target environment is provided through `BASE_URL`, allowing the same framework to run against another environment without modifying test code.
