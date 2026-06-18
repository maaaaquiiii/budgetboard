export class DashboardPage {
    constructor(page) {
        this.page             = page;
        this.addTransactionBtn = page.getByTestId('add-transaction-btn');
        this.transactionTable  = page.getByTestId('transaction-table');
        this.emptyState        = page.getByTestId('empty-state');
        this.summaryCard       = page.getByTestId('summary-card');
        this.totalIncome       = page.getByTestId('total-income');
        this.totalExpenses     = page.getByTestId('total-expenses');
        this.balance           = page.getByTestId('balance');
        this.pagination        = page.getByTestId('pagination');
        this.nextPageBtn       = page.getByTestId('next-page-btn');
    }

    async goto() {
        await this.page.goto('/dashboard');
    }

    async clickAddTransaction() {
        await this.addTransactionBtn.click();
    }

    async deleteTransaction(id) {
        await this.page.getByTestId(`delete-btn-${id}`).click();
    }

    async getBalance() {
        return this.balance.textContent();
    }

    async getTransactionRow(id) {
        return this.page.getByTestId(`transaction-row-${id}`);
    }
}