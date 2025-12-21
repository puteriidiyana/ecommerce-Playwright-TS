import { Page, Locator } from '@playwright/test';

export class CartPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async removeItem(productName: string) {
    await this.page
      .locator('.cart_item')
      .filter({ hasText: productName })
      .locator('button')
      .click();
  }

  async getCartItemsCount(): Promise<number> {
    return await this.page.locator('.cart_item').count();
  }
}
