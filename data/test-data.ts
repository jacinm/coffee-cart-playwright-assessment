export const testData = {
  customer: {
    name: 'QA Automation',
    email: 'qa.automation@example.com'
  },

  products: {
    primary: 'Espresso',
    second: 'Espresso Macchiato',
    third: 'Cappuccino'
  },

  translations: {
    Espresso: '特浓咖啡'
  },

  messages: {
    purchaseSuccess:
      'Thanks for your purchase. Please check your email for payment.'
  }
} as const;
