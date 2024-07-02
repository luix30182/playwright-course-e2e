import { Locator, Page, expect } from '@playwright/test';
import { Navigation } from './Navigation';

export class ProductsPage {
	private page: Page;
	private addButtons: Locator;
	private sortDropdown: Locator;
	private productTile: Locator;

	constructor(page: Page) {
		this.page = page;
		this.addButtons = this.page.locator('[data-qa="product-button"]');
		this.sortDropdown = this.page.locator('[data-qa="sort-dropdown"]');
		this.productTile = this.page.locator('[data-qa="product-title"]');
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

	sortByCheapest = async () => {
		await this.sortDropdown.waitFor();
		await this.productTile.first().waitFor();

		const titlesBeforeSort = await this.productTile.allInnerTexts();

		await this.sortDropdown.selectOption('price-asc');

		const titlesAfterSort = await this.productTile.allInnerTexts();

		expect(titlesAfterSort).not.toEqual(titlesBeforeSort);
	};
}
