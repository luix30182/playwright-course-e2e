import { test } from '@playwright/test';
import { ProductsPage } from '../page-objects/ProductsPage';
import { Navigation } from '../page-objects/Navigation';
import { Checkout } from '../page-objects/Checkout';

test.only('New user e2e', async ({ page }) => {
	const productPage = new ProductsPage(page);
	await productPage.visit();

	await productPage.addProductToBasket(0);
	await productPage.addProductToBasket(1);
	await productPage.addProductToBasket(2);

	const navigation = new Navigation(page);

	await navigation.goToCheckout();

	const checkout = new Checkout(page);
	await checkout.removeCheapestProduct();
});
