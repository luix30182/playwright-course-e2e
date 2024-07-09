import { Locator, Page } from '@playwright/test';

export class MyAccountPage {
	private page: Page;
	private pageHeading: Locator;

	constructor(page: Page) {
		this.page = page;
		this.pageHeading = this.page.getByRole('heading', { name: 'My account' });
	}

	visit = async () => {
		await this.page.goto('/my-account');
	};

	waitForPageHeading = async () => {
		await this.pageHeading.waitFor();
	};
}
