import { test, expect } from '../fixtures/coffee.fixture';
import { testData } from '../data/test-data';

test.describe('Coffee Cart special features', () => {
  test('double-clicking the coffee title translates it to Chinese', async ({
    coffeeMenu
  }) => {
    await coffeeMenu.translateTitle(testData.products.primary);

    await coffeeMenu.expectTranslatedTitle(
      testData.translations.Espresso
    );
  });

  test('right-clicking a coffee opens the add-to-cart dialog', async ({
    coffeeMenu
  }) => {
    await coffeeMenu.openAddToCartDialog(testData.products.primary);

    await expect(coffeeMenu.addToCartDialog).toContainText(
      `Add ${testData.products.primary} to the cart?`
    );

    await coffeeMenu.confirmAddToCartDialog();
  });

  test('a promo popup appears after every third cart item', async ({
    coffeeMenu
  }) => {
    await coffeeMenu.addProduct(testData.products.primary);
    await coffeeMenu.addProduct(testData.products.second);
    await coffeeMenu.addProduct(testData.products.third);

    await coffeeMenu.expectPromoVisible();
    await coffeeMenu.handlePromo('skip');
  });
});
