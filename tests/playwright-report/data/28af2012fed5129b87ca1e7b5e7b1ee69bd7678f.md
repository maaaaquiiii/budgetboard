# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: summary.spec.js >> TC11 — balance increases after adding income
- Location: specs/summary.spec.js:17:1

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.textContent: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByTestId('balance')

```

# Page snapshot

```yaml
- generic [ref=e4]:
  - heading "Create account" [level=1] [ref=e5]
  - paragraph [ref=e6]: Start tracking your finances
  - paragraph [ref=e7]: Registration failed. Email may already be in use.
  - generic [ref=e8]:
    - generic [ref=e9]: Name
    - textbox "Your name" [ref=e10]: Summary Test User
    - generic [ref=e11]: Email
    - textbox "you@example.com" [ref=e12]: sum_1781749668925@budgetboard.com
    - generic [ref=e13]: Password
    - textbox "Min. 8 characters" [ref=e14]: Password123
    - button "Create account" [ref=e15] [cursor=pointer]
  - paragraph [ref=e16]:
    - text: Already have an account?
    - link "Sign in" [ref=e17] [cursor=pointer]:
      - /url: /login
```

# Test source

```ts
  1  | export class DashboardPage {
  2  |     constructor(page) {
  3  |         this.page             = page;
  4  |         this.addTransactionBtn = page.getByTestId('add-transaction-btn');
  5  |         this.transactionTable  = page.getByTestId('transaction-table');
  6  |         this.emptyState        = page.getByTestId('empty-state');
  7  |         this.summaryCard       = page.getByTestId('summary-card');
  8  |         this.totalIncome       = page.getByTestId('total-income');
  9  |         this.totalExpenses     = page.getByTestId('total-expenses');
  10 |         this.balance           = page.getByTestId('balance');
  11 |         this.pagination        = page.getByTestId('pagination');
  12 |         this.nextPageBtn       = page.getByTestId('next-page-btn');
  13 |     }
  14 | 
  15 |     async goto() {
  16 |         await this.page.goto('/dashboard');
  17 |     }
  18 | 
  19 |     async clickAddTransaction() {
  20 |         await this.addTransactionBtn.click();
  21 |     }
  22 | 
  23 |     async deleteTransaction(id) {
  24 |         await this.page.getByTestId(`delete-btn-${id}`).click();
  25 |     }
  26 | 
  27 |     async getBalance() {
> 28 |         return this.balance.textContent();
     |                             ^ Error: locator.textContent: Test timeout of 30000ms exceeded.
  29 |     }
  30 | 
  31 |     async getTransactionRow(id) {
  32 |         return this.page.getByTestId(`transaction-row-${id}`);
  33 |     }
  34 | }
```