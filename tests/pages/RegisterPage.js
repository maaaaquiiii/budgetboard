export class RegisterPage {
    constructor(page) {
        this.page          = page;
        this.nameInput     = page.getByTestId('name-input');
        this.emailInput    = page.getByTestId('email-input');
        this.passwordInput = page.getByTestId('password-input');
        this.registerBtn   = page.getByTestId('register-btn');
        this.errorMessage  = page.getByTestId('error-message');
    }

    async goto() {
        await this.page.goto('/register');
    }

    async register(name, email, password) {
        await this.nameInput.fill(name);
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.registerBtn.click();
    }
}