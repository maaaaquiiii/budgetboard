import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { RegisterPage } from '../pages/RegisterPage.js';
import { DashboardPage } from '../pages/DashboardPage.js';
import { TransactionPage } from '../pages/TransactionPage.js';
import { incomeTransaction, expenseTransaction } from '../fixtures/testData.js';

// Each test file gets its own isolated user
test.beforeEach(async ({ page }) => {
    const registerPage = new RegisterPage(page);
    const user = {
        name: 'Tx Test User',
        email: `tx_${Date.now()}@budgetboard.com`,
        password: 'Password123',
    };
    await registerPage.goto();
    await registerPage.register(user.name, user.email, user.password);
    await expect(page).toHaveURL('/dashboard');
});

test('TC06 — create valid transaction appears in dashboard', async ({ page }) => {
    const dashboard = new DashboardPage(page);
    const txPage = new TransactionPage(page);

    await dashboard.clickAddTransaction();
    await txPage.fillTransaction(incomeTransaction);
    await txPage.submit();

    await expect(page).toHaveURL('/dashboard');
    await expect(dashboard.transactionTable).toBeVisible();
});

test('TC07 — create transaction with missing amount shows error', async ({ page }) => {
    const dashboard = new DashboardPage(page);
    const txPage = new TransactionPage(page);

    await dashboard.clickAddTransaction();
    // Submit without filling amount
    await txPage.submit();

    await expect(txPage.errorMessage).toBeVisible();
    const msg = await txPage.getErrorMessage();
    expect(msg).toContain('Amount must be greater than 0');
});

test('TC08 — delete transaction removes it from dashboard', async ({ page }) => {
    const dashboard = new DashboardPage(page);
    const txPage = new TransactionPage(page);

    // Create a transaction first
    await dashboard.clickAddTransaction();
    await txPage.fillTransaction(expenseTransaction);
    await txPage.submit();
    await expect(page).toHaveURL('/dashboard');

    // Get the first transaction's delete button and click it
    const deleteBtn = page.locator('[data-testid^="delete-btn-"]').first();
    const testId = await deleteBtn.getAttribute('data-testid');
    const id = testId.replace('delete-btn-', '');
    await deleteBtn.click();

    // Row should no longer exist
    await expect(page.getByTestId(`transaction-row-${id}`)).not.toBeVisible();
});

test('TC09 — new transaction appears immediately in dashboard table', async ({ page }) => {
    const dashboard = new DashboardPage(page);
    const txPage = new TransactionPage(page);

    await dashboard.clickAddTransaction();
    await txPage.fillTransaction({ ...incomeTransaction, description: 'Unique description E2E' });
    await txPage.submit();

    await expect(page).toHaveURL('/dashboard');
    await expect(page.getByText('Unique description E2E')).toBeVisible();
});

test('TC10 — empty dashboard shows empty state message', async ({ page }) => {
    const dashboard = new DashboardPage(page);
    await dashboard.goto();
    await expect(dashboard.emptyState).toBeVisible();
});