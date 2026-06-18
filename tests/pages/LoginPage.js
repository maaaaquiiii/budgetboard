export class LoginPage {
    constructor(page) {
        this.page = page;
        this.emailInput    = page.getByTestId('email-input');
        this.passwordInput = page.getByTestId('password-input');
        this.loginBtn      = page.getByTestId('login-btn');
        this.errorMessage  = page.getByTestId('error-message');
        this.registerLink  = page.getByTestId('register-link');
    }

    async goto() {
        await this.page.goto('/login');
    }

    async login(email, password) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginBtn.click();
    }

    async getErrorMessage() {
        return this.errorMessage.textContent();
    }
}