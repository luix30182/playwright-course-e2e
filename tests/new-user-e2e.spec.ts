import { test } from '@playwright/test';
import { ProductsPage } from '../page-objects/ProductsPage';

test.only('New user e2e', async ({ page }) => {
	const productPage = new ProductsPage(page);
	await productPage.visit();

	await productPage.addProductToBasket(0);
	await productPage.addProductToBasket(1);
	await productPage.addProductToBasket(2);
});
