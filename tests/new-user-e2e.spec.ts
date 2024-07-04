import { test } from '@playwright/test';
import { v4 as uuidV4 } from 'uuid';
import { ProductsPage } from '../page-objects/ProductsPage';
import { Navigation } from '../page-objects/Navigation';
import { Checkout } from '../page-objects/Checkout';
import { LoginPage } from '../page-objects/Login';
import { RegisterPage } from '../page-objects/Register';
import { DeliveryDetailsPage } from '../page-objects/DeliveryDetails';
import { deliveryDetails } from '../data/deliveryDetails';
import { PaymentPage } from '../page-objects/Payment';

test.only('New user e2e', async ({ page }) => {
	const productPage = new ProductsPage(page);
	await productPage.visit();

	await productPage.sortByCheapest();

	await productPage.addProductToBasket(0);
	await productPage.addProductToBasket(1);
	await productPage.addProductToBasket(2);

	const navigation = new Navigation(page);

	await navigation.goToCheckout();

	const checkout = new Checkout(page);
	await checkout.removeCheapestProduct();

	await checkout.continueToCheckout();

	const login = new LoginPage(page);
	await login.moveToSignup();

	const register = new RegisterPage(page);
	const email = `${uuidV4()}@test.com`;
	const password = uuidV4();
	await register.signupAsNewUser(email, password);

	const delivery = new DeliveryDetailsPage(page);
	await delivery.fillDetails(deliveryDetails);
	await delivery.saveDetails();
	await delivery.continueToPayment();

	const payment = new PaymentPage(page);
	await payment.activateDiscount();
});
