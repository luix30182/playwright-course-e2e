import { Locator, Page } from '@playwright/test';

export class Navigation {
	private page: Page;
	private basketCounter: Locator;
	private checkoutLink: Locator;

	constructor(page: Page) {
		this.page = page;
		this.basketCounter = this.page.locator('[data-qa="header-basket-count"]');
		this.checkoutLink = this.page.getByRole('link', { name: 'Checkout' });
	}

	getBasketCount = async () => {
		await this.basketCounter.waitFor();
		const text = await this.basketCounter.innerText();
		return parseInt(text, 10);
	};

	goToCheckout = async () => {
		await this.checkoutLink.waitFor();
		await this.checkoutLink.click();
		await this.page.waitForURL('/basket');
	};
}
