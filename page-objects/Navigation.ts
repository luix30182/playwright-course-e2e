import { Locator, Page } from '@playwright/test';
import { isDesktopViewPort } from '../utils/responsive';

export class Navigation {
	private page: Page;
	private basketCounter: Locator;
	private checkoutLink: Locator;
	private mobileBurguerButton: Locator;

	constructor(page: Page) {
		this.page = page;
		this.basketCounter = this.page.locator('[data-qa="header-basket-count"]');
		this.checkoutLink = this.page.getByRole('link', { name: 'Checkout' });
		this.mobileBurguerButton = this.page.locator('[data-qa="burger-button"]');
	}

	getBasketCount = async () => {
		await this.basketCounter.waitFor();
		const text = await this.basketCounter.innerText();
		return parseInt(text, 10);
	};

	goToCheckout = async () => {
		if (!isDesktopViewPort(this.page)) {
			await this.mobileBurguerButton.waitFor();
			await this.mobileBurguerButton.click();
		}

		await this.checkoutLink.waitFor();
		await this.checkoutLink.click();
		await this.page.waitForURL('/basket');
	};
}
