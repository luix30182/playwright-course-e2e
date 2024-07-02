import { Locator, Page } from '@playwright/test';

export class RegisterPage {
	private page: Page;
	private emailInput: Locator;
	private passwordInput: Locator;
	private registerButton: Locator;

	constructor(page: Page) {
		this.page = page;
		this.emailInput = this.page.getByPlaceholder('e-mail');
		this.passwordInput = this.page.getByPlaceholder('password');
		this.registerButton = this.page.getByRole('button', { name: 'Register' });
	}

	signupAsNewUser = async (email: string, password: string) => {
		await this.emailInput.waitFor();
		await this.emailInput.fill(email);

		await this.passwordInput.waitFor();
		await this.passwordInput.fill(password);

		await this.registerButton.waitFor();
		await this.registerButton.click();
	};
}
