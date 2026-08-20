import { test as base, expect } from '@playwright/test';
import { CoffeeMenuPage } from '../pages/CoffeeMenuPage';
import { PaymentDetailsPage } from '../pages/PaymentDetailsPage';

type CoffeeCartFixtures = {
  coffeeMenu: CoffeeMenuPage;
  paymentDetails: PaymentDetailsPage;
};

export const test = base.extend<CoffeeCartFixtures>({
  coffeeMenu: async ({ page, context }, use) => {
    const coffeeMenu = new CoffeeMenuPage(page);

    // Setup: every test starts from a clean browser context and menu page.
    await coffeeMenu.goto();

    await use(coffeeMenu);

    // Teardown/state hygiene. Playwright already creates isolated contexts per
    // test; explicit cleanup also protects future reuse of this fixture.
    await context.clearCookies();
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
  },

  paymentDetails: async ({ page }, use) => {
    await use(new PaymentDetailsPage(page));
  }
});

export { expect };
