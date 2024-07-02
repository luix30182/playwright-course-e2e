import { Locator, Page, expect } from '@playwright/test';

export class Checkout {
	private page: Page;
	private basketCards: Locator;
	private basketItemPrice: Locator;
	private basketItemRemoveButton: Locator;
	private continueToCheckoutButton: Locator;

	constructor(page: Page) {
		this.page = page;
		this.basketCards = this.page.locator('[data-qa="basket-card"]');
		this.basketItemPrice = this.page.locator('[data-qa="basket-item-price"]');
		this.basketItemRemoveButton = this.page.locator(
			'[data-qa="basket-card-remove-item"]'
		);
		this.continueToCheckoutButton = this.page.locator(
			'[data-qa="continue-to-checkout"]'
		);
	}

	removeCheapestProduct = async () => {
		await this.basketCards.first().waitFor();

		const removeItems = await this.basketCards.count();

		await this.basketItemPrice.first().waitFor();

		const allPrices = await this.basketItemPrice.allInnerTexts();
		const allPricesNumbers = allPrices.map(price =>
			Number(price.replace('$', ''))
		);

		const smallestPrice = Math.min(...allPricesNumbers);
		const smallestPriceIndex = allPricesNumbers.indexOf(smallestPrice);

		const removeButton = this.basketItemRemoveButton.nth(smallestPriceIndex);
		await removeButton.waitFor();
		await removeButton.click();

		await expect(this.basketCards).toHaveCount(removeItems - 1);
	};

	continueToCheckout = async () => {
		await this.continueToCheckoutButton.waitFor();
		await this.continueToCheckoutButton.click();
		await this.page.waitForURL(/\/login/, { timeout: 3000 });
	};
}
