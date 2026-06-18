export class TransactionPage {
    constructor(page) {
        this.page            = page;
        this.amountInput     = page.getByTestId('amount-input');
        this.typeSelect      = page.getByTestId('type-select');
        this.categorySelect  = page.getByTestId('category-select');
        this.descriptionInput = page.getByTestId('description-input');
        this.dateInput       = page.getByTestId('date-input');
        this.submitBtn       = page.getByTestId('submit-btn');
        this.errorMessage    = page.getByTestId('error-message');
    }

    async goto() {
        await this.page.goto('/transactions/new');
    }

    async fillTransaction({ amount, type, category, description }) {
        if (amount)      await this.amountInput.fill(amount);
        if (type)        await this.typeSelect.selectOption(type);
        if (category)    await this.categorySelect.selectOption(category);
        if (description) await this.descriptionInput.fill(description);
    }

    async submit() {
        await this.submitBtn.click();
    }

    async getErrorMessage() {
        return this.errorMessage.textContent();
    }
}