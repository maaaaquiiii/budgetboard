import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { RegisterPage } from '../pages/RegisterPage.js';
import { testUser } from '../fixtures/testData.js';

// Register once and reuse credentials across auth tests
let registeredUser;

test.beforeAll(async ({ browser }) => {
    const page = await browser.newPage();
    const registerPage = new RegisterPage(page);
    registeredUser = {
        name: 'Auth Test User',
        email: `auth_${Date.now()}@budgetboard.com`,
        password: 'Password123',
    };
    await registerPage.goto();
    await registerPage.register(registeredUser.name, registeredUser.email, registeredUser.password);
    await page.close();
});

test('TC01 — login with valid credentials redirects to dashboard', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(registeredUser.email, registeredUser.password);
    await expect(page).toHaveURL('/dashboard');
});

test('TC02 — login with wrong password shows error message', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(registeredUser.email, 'WrongPassword!');
    await expect(loginPage.errorMessage).toBeVisible();
    const msg = await loginPage.getErrorMessage();
    expect(msg).toContain('Invalid email or password');
});

test('TC03 — login with empty fields does not submit', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.loginBtn.click();
    await expect(page).toHaveURL('/login');
});

test('TC04 — register with new email redirects to dashboard', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    await registerPage.goto();
    await registerPage.register(testUser.name, testUser.email, testUser.password);
    await expect(page).toHaveURL('/dashboard');
});

test('TC05 — accessing dashboard without token redirects to login', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page).toHaveURL('/login');
});