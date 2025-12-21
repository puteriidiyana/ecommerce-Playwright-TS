import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { ProductsPage } from '../pages/products.page';
import { users } from '../data/users';

test.describe('@smoke @regression E-Commerce Login Flow', () => {

  test('User can login with valid credentials', async ({ page }) => {
    const login = new LoginPage(page);
    const products = new ProductsPage(page);

    await login.goto();
    await login.login(users.valid.username, users.valid.password);

    // Assertion: user redirected to products page
    await expect(page).toHaveURL(/inventory/);

    // Assertion: products page loaded
    await expect(products.productTitle).toBeVisible();

    // Assertion: cart badge not visible initially
    await expect(products.cartBadge).toBeHidden();
  });

  test('User cannot login with invalid credentials', async ({ page }) => {
    const login = new LoginPage(page);

    await login.goto();
    await login.login('invalid_user', 'wrong_password');

    // Assertion: error message displayed
    await expect(login.errorMessage).toBeVisible();
    await expect(login.errorMessage).toContainText(
      'Username and password do not match'
    );

    // Assertion: still on login page
    await expect(page).toHaveURL(/saucedemo/);
  });

  test('User sees validation error when login fields are empty', async ({ page }) => {
    const login = new LoginPage(page);

    await login.goto();
    await login.submitLogin();

    // Assertion: empty field validation
    await expect(login.errorMessage).toBeVisible();
    await expect(login.errorMessage).toContainText(
      'Username is required'
    );
  });

});
