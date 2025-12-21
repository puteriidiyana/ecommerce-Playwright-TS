import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { ProductsPage } from '../pages/products.page';
import { CartPage } from '../pages/cart.page';
import { users } from '../data/users';

test.describe('@regression E-Commerce Cart Flow', () => {

    test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login(users.valid.username, users.valid.password);
  });

  test('@smoke User can add items to cart', async ({ page }) => {
    const products = new ProductsPage(page);

    await products.addProduct('Sauce Labs Backpack');
    await products.addProduct('Sauce Labs Bike Light');

    await expect(await products.getCartCount()).toBe(2);
  });

  test('User can remove item from cart', async ({ page }) => {
    const products = new ProductsPage(page);
    const cart = new CartPage(page);

    await products.addProduct('Sauce Labs Backpack');
    await products.addProduct('Sauce Labs Bike Light');

    await products.goToCart();
    await cart.removeItem('Sauce Labs Bike Light');

    await expect(await cart.getCartItemsCount()).toBe(1);
  });

});