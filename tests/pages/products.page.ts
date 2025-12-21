import { Page, Locator } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;
  readonly productTitle: Locator;
  readonly cartBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productTitle = page.locator('.title');
    this.cartBadge = page.locator('.shopping_cart_badge');
  }

  async addProduct(productName: string) {
    await this.page
      .locator('.inventory_item')
      .filter({ hasText: productName })
      .locator('button')
      .click();
  }

  async getCartCount(): Promise<number> {
  if (await this.cartBadge.isVisible()) {
    return Number(await this.cartBadge.textContent());
  }
  return 0;
}

  async goToCart() {
    await this.page.locator('.shopping_cart_link').click();
  }
}
