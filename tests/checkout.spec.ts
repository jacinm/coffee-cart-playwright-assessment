import { test } from '../fixtures/coffee.fixture';
import { testData } from '../data/test-data';

test.describe('Coffee Cart purchase flow', () => {
  test('customer can add products, handle promo, checkout and submit payment details', async ({
    coffeeMenu,
    paymentDetails
  }) => {
    // The application displays the promo after every third cart item.
    // Using three products makes the required promo handling deterministic.
    await coffeeMenu.addProduct(testData.products.primary);
    await coffeeMenu.addProduct(testData.products.second);
    await coffeeMenu.addProduct(testData.products.third);

    await coffeeMenu.handlePromo('skip');

    await coffeeMenu.checkout();

    await paymentDetails.expectVisible();
    await paymentDetails.submitPaymentDetails();

    await paymentDetails.expectPurchaseSuccess();
  });
});
