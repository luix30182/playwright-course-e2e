import { test } from '@playwright/test';
import { MyAccountPage } from '../page-objects/MyAccount';
import { getLoginToken } from '../api/login';
import { adminDetails } from '../data/userDetails';

test('My account using cookie injection', async ({ page }) => {
	const loginToken = await getLoginToken({
		userName: adminDetails.userName,
		password: adminDetails.password
	});
	const myAccount = new MyAccountPage(page);
	await myAccount.visit();

	await page.evaluate(
		([loginTokenInBrowser]) => {
			document.cookie = `token=${loginTokenInBrowser}`;
		},
		[loginToken]
	);

	await myAccount.visit();

	await myAccount.waitForPageHeading();
});

test('My account using cookie injection and mock request', async ({ page }) => {
	const loginToken = await getLoginToken({
		userName: adminDetails.userName,
		password: adminDetails.password
	});

	await page.route('**/api/**', async (route, request) => {
		await route.fulfill({
			status: 500,
			contentType: 'application/json',
			body: JSON.stringify({ message: 'PlAYWRIGHT ERROR MOCK' })
		});
	});

	const myAccount = new MyAccountPage(page);
	await myAccount.visit();

	await page.evaluate(
		([loginTokenInBrowser]) => {
			document.cookie = `token=${loginTokenInBrowser}`;
		},
		[loginToken]
	);

	await myAccount.visit();

	await myAccount.waitForErrorMessage();
});
