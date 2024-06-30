import { Locator, Page, expect } from '@playwright/test';
import { Navigation } from './Navigation';

export class ProductsPage {
	private page: Page;
	private addButtons: Locator;

	constructor(page: Page) {
		this.page = page;
		this.addButtons = this.page.locator('[data-qa="product-button"]');
	}

	visit = async () => {
		await this.page.goto('/');
	};

	addProductToBasket = async (index: number) => {
		const navigation = new Navigation(this.page);

		const addButton = this.addButtons.nth(index);
		await addButton.waitFor();
		await expect(addButton).toHaveText('Add to Basket');
		const basketCountBefore = await navigation.getBasketCount();
		await addButton.click();
		const basketCountAfter = await navigation.getBasketCount();
		await expect(addButton).toHaveText('Remove from Basket');

		expect(basketCountAfter).toBeGreaterThan(basketCountBefore);
	};
}
