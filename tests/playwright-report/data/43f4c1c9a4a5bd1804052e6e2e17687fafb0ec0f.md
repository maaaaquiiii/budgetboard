# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: transactions.spec.js >> TC10 — empty dashboard shows empty state message
- Location: specs/transactions.spec.js:78:1

# Error details

```
Error: expect(page).toHaveURL(expected) failed

Expected: "http://localhost:5173/dashboard"
Received: "http://localhost:5173/register"
Timeout:  5000ms

Call log:
  - Expect "toHaveURL" with timeout 5000ms
    14 × unexpected value "http://localhost:5173/register"

```

```yaml
- heading "Create account" [level=1]
- paragraph: Start tracking your finances
- paragraph: Registration failed. Email may already be in use.
- text: Name
- textbox "Your name": Tx Test User
- text: Email
- textbox "you@example.com": tx_1781749714595@budgetboard.com
- text: Password
- textbox "Min. 8 characters": Password123
- button "Create account"
- paragraph:
  - text: Already have an account?
  - link "Sign in":
    - /url: /login
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import { LoginPage } from '../pages/LoginPage.js';
  3  | import { RegisterPage } from '../pages/RegisterPage.js';
  4  | import { DashboardPage } from '../pages/DashboardPage.js';
  5  | import { TransactionPage } from '../pages/TransactionPage.js';
  6  | import { incomeTransaction, expenseTransaction } from '../fixtures/testData.js';
  7  | 
  8  | // Each test file gets its own isolated user
  9  | test.beforeEach(async ({ page }) => {
  10 |     const registerPage = new RegisterPage(page);
  11 |     const user = {
  12 |         name: 'Tx Test User',
  13 |         email: `tx_${Date.now()}@budgetboard.com`,
  14 |         password: 'Password123',
  15 |     };
  16 |     await registerPage.goto();
  17 |     await registerPage.register(user.name, user.email, user.password);
> 18 |     await expect(page).toHaveURL('/dashboard');
     |                        ^ Error: expect(page).toHaveURL(expected) failed
  19 | });
  20 | 
  21 | test('TC06 — create valid transaction appears in dashboard', async ({ page }) => {
  22 |     const dashboard = new DashboardPage(page);
  23 |     const txPage = new TransactionPage(page);
  24 | 
  25 |     await dashboard.clickAddTransaction();
  26 |     await txPage.fillTransaction(incomeTransaction);
  27 |     await txPage.submit();
  28 | 
  29 |     await expect(page).toHaveURL('/dashboard');
  30 |     await expect(dashboard.transactionTable).toBeVisible();
  31 | });
  32 | 
  33 | test('TC07 — create transaction with missing amount shows error', async ({ page }) => {
  34 |     const dashboard = new DashboardPage(page);
  35 |     const txPage = new TransactionPage(page);
  36 | 
  37 |     await dashboard.clickAddTransaction();
  38 |     // Submit without filling amount
  39 |     await txPage.submit();
  40 | 
  41 |     await expect(txPage.errorMessage).toBeVisible();
  42 |     const msg = await txPage.getErrorMessage();
  43 |     expect(msg).toContain('Amount must be greater than 0');
  44 | });
  45 | 
  46 | test('TC08 — delete transaction removes it from dashboard', async ({ page }) => {
  47 |     const dashboard = new DashboardPage(page);
  48 |     const txPage = new TransactionPage(page);
  49 | 
  50 |     // Create a transaction first
  51 |     await dashboard.clickAddTransaction();
  52 |     await txPage.fillTransaction(expenseTransaction);
  53 |     await txPage.submit();
  54 |     await expect(page).toHaveURL('/dashboard');
  55 | 
  56 |     // Get the first transaction's delete button and click it
  57 |     const deleteBtn = page.locator('[data-testid^="delete-btn-"]').first();
  58 |     const testId = await deleteBtn.getAttribute('data-testid');
  59 |     const id = testId.replace('delete-btn-', '');
  60 |     await deleteBtn.click();
  61 | 
  62 |     // Row should no longer exist
  63 |     await expect(page.getByTestId(`transaction-row-${id}`)).not.toBeVisible();
  64 | });
  65 | 
  66 | test('TC09 — new transaction appears immediately in dashboard table', async ({ page }) => {
  67 |     const dashboard = new DashboardPage(page);
  68 |     const txPage = new TransactionPage(page);
  69 | 
  70 |     await dashboard.clickAddTransaction();
  71 |     await txPage.fillTransaction({ ...incomeTransaction, description: 'Unique description E2E' });
  72 |     await txPage.submit();
  73 | 
  74 |     await expect(page).toHaveURL('/dashboard');
  75 |     await expect(page.getByText('Unique description E2E')).toBeVisible();
  76 | });
  77 | 
  78 | test('TC10 — empty dashboard shows empty state message', async ({ page }) => {
  79 |     const dashboard = new DashboardPage(page);
  80 |     await dashboard.goto();
  81 |     await expect(dashboard.emptyState).toBeVisible();
  82 | });
```