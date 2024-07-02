import { Locator, Page } from '@playwright/test';

export class LoginPage {
	private page: Page;
	private moveToSignupButton: Locator;

	constructor(page: Page) {
		this.page = page;
		this.moveToSignupButton = this.page.locator(
			'[data-qa="go-to-signup-button"]'
		);
	}

	moveToSignup = async () => {
		await this.moveToSignupButton.waitFor();
		await this.moveToSignupButton.click();

		this.page.waitForURL(/\/signup/, { timeout: 3000 });
	};
}
