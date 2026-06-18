import { test, expect } from '@playwright/test';
import { RegisterPage } from '../pages/RegisterPage.js';
import { DashboardPage } from '../pages/DashboardPage.js';
import { TransactionPage } from '../pages/TransactionPage.js';

test.beforeEach(async ({ page }) => {
    const registerPage = new RegisterPage(page);
    const user = {
        name: 'Summary Test User',
        email: `sum_${Date.now()}@budgetboard.com`,
        password: 'Password123',
    };
    await registerPage.goto();
    await registerPage.register(user.name, user.email, user.password);
});

test('TC11 — balance increases after adding income', async ({ page }) => {
    const dashboard = new DashboardPage(page);
    const txPage = new TransactionPage(page);

    const balanceBefore = await dashboard.getBalance();

    await dashboard.clickAddTransaction();
    await txPage.fillTransaction({ amount: '1000', type: 'INCOME', category: 'SALARY', description: 'Test income' });
    await txPage.submit();

    await expect(page).toHaveURL('/dashboard');
    const balanceAfter = await dashboard.getBalance();
    expect(balanceAfter).not.toBe(balanceBefore);
    await expect(dashboard.totalIncome).toContainText('1,000');
});

test('TC12 — balance decreases after adding expense', async ({ page }) => {
    const dashboard = new DashboardPage(page);
    const txPage = new TransactionPage(page);

    // Add income first so balance is positive
    await dashboard.clickAddTransaction();
    await txPage.fillTransaction({ amount: '500', type: 'INCOME', category: 'SALARY', description: 'Base income' });
    await txPage.submit();

    await expect(page).toHaveURL('/dashboard');
    const balanceBefore = await dashboard.getBalance();

    // Add expense
    await dashboard.clickAddTransaction();
    await txPage.fillTransaction({ amount: '100', type: 'EXPENSE', category: 'FOOD', description: 'Test expense' });
    await txPage.submit();

    await expect(page).toHaveURL('/dashboard');
    const balanceAfter = await dashboard.getBalance();
    expect(balanceAfter).not.toBe(balanceBefore);
    await expect(dashboard.totalExpenses).toContainText('100');
});