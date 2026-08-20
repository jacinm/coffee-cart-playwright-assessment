import { expect, Locator, Page } from '@playwright/test';

export type PromoAction = 'accept' | 'skip';

export class CoffeeMenuPage {
  readonly page: Page;
  readonly checkoutButton: Locator;
  readonly promo: Locator;
  readonly addToCartDialog: Locator;

  constructor(page: Page) {
    this.page = page;

    this.checkoutButton = this.page.getByRole('button', {
      name: 'Proceed to checkout'
    });

    this.promo = this.page.locator('.promo');

    this.addToCartDialog = this.page.locator(
      'dialog[data-cy="add-to-cart-modal"]'
    );
  }

  private coffeeCup(name: string): Locator {
    return this.page.getByLabel(name, { exact: true });
  }

  private coffeeTitle(name: string): Locator {
    return this.page.locator('h4').filter({
      hasText: new RegExp(`^${escapeRegExp(name)}\\s*\\$`)
    });
  }

  async goto(): Promise<void> {
    await this.page.goto('/');

    await expect(this.checkoutButton).toBeVisible();
    await expect(this.coffeeCup('Espresso')).toBeVisible();
  }

  async addProduct(name: string): Promise<void> {
    const coffee = this.coffeeCup(name);

    await expect(coffee).toBeVisible();
    await coffee.click();
  }

  async checkout(): Promise<void> {
    await expect(this.checkoutButton).toBeEnabled();
    await this.checkoutButton.click();
  }

  async expectPromoVisible(): Promise<void> {
    await expect(this.promo).toBeVisible();
  }

  async handlePromo(action: PromoAction): Promise<void> {
    await this.expectPromoVisible();

    const button =
      action === 'accept'
        ? this.promo.getByRole('button', {
            name: 'Yes, of course!'
          })
        : this.promo.getByRole('button', {
            name: "Nah, I'll skip."
          });

    await button.click();

    await expect(this.promo).toBeHidden();
  }

  async translateTitle(name: string): Promise<void> {
    const title = this.coffeeTitle(name);

    await expect(title).toBeVisible();
    await title.dblclick();
  }

  async expectTranslatedTitle(
    translation: string
  ): Promise<void> {
    const translatedTitle = this.page
      .locator('h4')
      .filter({
        hasText: new RegExp(
          `^${escapeRegExp(translation)}\\s*\\$`
        )
      });

    await expect(translatedTitle).toBeVisible();
  }

  async openAddToCartDialog(
    name: string
  ): Promise<void> {
    const coffee = this.coffeeCup(name);

    await expect(coffee).toBeVisible();

    await coffee.click({
      button: 'right'
    });

    await expect(this.addToCartDialog).toBeVisible();
  }

  async confirmAddToCartDialog(): Promise<void> {
    await this.addToCartDialog
      .getByRole('button', {
        name: 'Yes',
        exact: true
      })
      .click();

    await expect(this.addToCartDialog).toBeHidden();
  }
}

function escapeRegExp(value: string): string {
  return value.replace(
    /[.*+?^${}()|[\]\\]/g,
    '\\$&'
  );
}
