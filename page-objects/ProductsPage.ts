import { Locator, Page, expect } from '@playwright/test';

export class ProductsPage {
	page: Page;
	addButtons: Locator;

	constructor(page: Page) {
		this.page = page;
		this.addButtons = this.page.locator('[data-qa="product-button"]');
	}

	visit = async () => {
		await this.page.goto('/');
	};

	addProductToBasket = async (index: number) => {
		const addButton = this.addButtons.nth(index);
		await addButton.waitFor();
		await expect(addButton).toHaveText('Add to Basket');
		await addButton.click();
		await expect(addButton).toHaveText('Remove from Basket');
	};
}
