import { expect, Locator, Page } from '@playwright/test';
import { testData } from '../data/test-data';

export class PaymentDetailsPage {
  private readonly page: Page;
  private readonly paymentForm: Locator;
  private readonly nameInput: Locator;
  private readonly emailInput: Locator;
  private readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.paymentForm = this.page.getByRole('form', {
      name: 'Payment form'
    });

    this.nameInput = this.paymentForm.getByLabel('Name', {
      exact: true
    });

    this.emailInput = this.paymentForm.getByLabel('Email', {
      exact: true
    });

    this.submitButton = this.paymentForm.getByRole('button', {
      name: 'Submit',
      exact: true
    });
  }

  async expectVisible(): Promise<void> {
    await expect(
      this.page.getByRole('heading', {
        name: 'Payment details',
        exact: true
      })
    ).toBeVisible();

    await expect(this.paymentForm).toBeVisible();
  }

  async submitPaymentDetails(
    customer = testData.customer
  ): Promise<void> {
    await this.nameInput.fill(customer.name);
    await this.emailInput.fill(customer.email);
    await this.submitButton.click();
  }

  async expectPurchaseSuccess(): Promise<void> {
    await expect(
      this.page.getByText(testData.messages.purchaseSuccess, {
        exact: true
      })
    ).toBeVisible();
  }
}
