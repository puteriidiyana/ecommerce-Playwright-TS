import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { users } from '../data/users';

test.describe('Products API Mocking', () => {

  test('@regression @api-mock Show empty state when products API returns empty list', async ({ page }) => {
    const login = new LoginPage(page);

    await page.route('**/*inventory*', async route => {
        await route.fulfill({
            status: 200,
            body: JSON.stringify([])
        });
        });

        await login.goto();
        await login.login(users.valid.username, users.valid.password);


    await expect(page.locator('.inventory_list')).toBeVisible();

  });

});
