# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: auth.spec.js >> TC01 — login with valid credentials redirects to dashboard
- Location: specs/auth.spec.js:22:1

# Error details

```
Error: expect(page).toHaveURL(expected) failed

Expected: "http://localhost:5173/dashboard"
Received: "http://localhost:5173/login"
Timeout:  5000ms

Call log:
  - Expect "toHaveURL" with timeout 5000ms
    14 × unexpected value "http://localhost:5173/login"

```

```yaml
- heading "BudgetBoard" [level=1]
- paragraph: Sign in to your account
- paragraph: Invalid email or password
- text: Email
- textbox "you@example.com": auth_1781749668939@budgetboard.com
- text: Password
- textbox "••••••••": Password123
- button "Sign in"
- paragraph:
  - text: No account?
  - link "Register":
    - /url: /register
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import { LoginPage } from '../pages/LoginPage.js';
  3  | import { RegisterPage } from '../pages/RegisterPage.js';
  4  | import { testUser } from '../fixtures/testData.js';
  5  | 
  6  | // Register once and reuse credentials across auth tests
  7  | let registeredUser;
  8  | 
  9  | test.beforeAll(async ({ browser }) => {
  10 |     const page = await browser.newPage();
  11 |     const registerPage = new RegisterPage(page);
  12 |     registeredUser = {
  13 |         name: 'Auth Test User',
  14 |         email: `auth_${Date.now()}@budgetboard.com`,
  15 |         password: 'Password123',
  16 |     };
  17 |     await registerPage.goto();
  18 |     await registerPage.register(registeredUser.name, registeredUser.email, registeredUser.password);
  19 |     await page.close();
  20 | });
  21 | 
  22 | test('TC01 — login with valid credentials redirects to dashboard', async ({ page }) => {
  23 |     const loginPage = new LoginPage(page);
  24 |     await loginPage.goto();
  25 |     await loginPage.login(registeredUser.email, registeredUser.password);
> 26 |     await expect(page).toHaveURL('/dashboard');
     |                        ^ Error: expect(page).toHaveURL(expected) failed
  27 | });
  28 | 
  29 | test('TC02 — login with wrong password shows error message', async ({ page }) => {
  30 |     const loginPage = new LoginPage(page);
  31 |     await loginPage.goto();
  32 |     await loginPage.login(registeredUser.email, 'WrongPassword!');
  33 |     await expect(loginPage.errorMessage).toBeVisible();
  34 |     const msg = await loginPage.getErrorMessage();
  35 |     expect(msg).toContain('Invalid email or password');
  36 | });
  37 | 
  38 | test('TC03 — login with empty fields does not submit', async ({ page }) => {
  39 |     const loginPage = new LoginPage(page);
  40 |     await loginPage.goto();
  41 |     await loginPage.loginBtn.click();
  42 |     await expect(page).toHaveURL('/login');
  43 | });
  44 | 
  45 | test('TC04 — register with new email redirects to dashboard', async ({ page }) => {
  46 |     const registerPage = new RegisterPage(page);
  47 |     await registerPage.goto();
  48 |     await registerPage.register(testUser.name, testUser.email, testUser.password);
  49 |     await expect(page).toHaveURL('/dashboard');
  50 | });
  51 | 
  52 | test('TC05 — accessing dashboard without token redirects to login', async ({ page }) => {
  53 |     await page.goto('/dashboard');
  54 |     await expect(page).toHaveURL('/login');
  55 | });
```