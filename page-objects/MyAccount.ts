import { Locator, Page } from '@playwright/test';

export class MyAccountPage {
	private page: Page;
	private pageHeading: Locator;
	private errorMessage: Locator;

	constructor(page: Page) {
		this.page = page;
		this.pageHeading = this.page.getByRole('heading', { name: 'My account' });
		this.errorMessage = this.page.locator('[data-qa="error-message"]');
	}

	visit = async () => {
		await this.page.goto('/my-account');
	};

	waitForPageHeading = async () => {
		await this.pageHeading.waitFor();
	};

	waitForErrorMessage = async () => {
		await this.errorMessage.waitFor();
	};
}
