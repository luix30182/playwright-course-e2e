import { Locator, Page } from '@playwright/test';

export class DeliveryDetailsPage {
	private page: Page;
	private firstNameInput: Locator;
	private lastNameInput: Locator;
	private streetInput: Locator;
	private postCodeInput: Locator;
	private cityInput: Locator;
	private countryDropdown: Locator;

	constructor(page: Page) {
		this.page = page;
		this.firstNameInput = this.page.locator('[data-qa="delivery-first-name"]');
		this.lastNameInput = this.page.locator('[data-qa="delivery-last-name"]');
		this.streetInput = this.page.locator('[data-qa="delivery-address-street"]');
		this.postCodeInput = this.page.locator('[data-qa="delivery-postcode"]');
		this.cityInput = this.page.locator('[data-qa="delivery-city"]');
		this.countryDropdown = this.page.locator('[data-qa="country-dropdown"]');
	}

	fillDetails = async () => {
		await this.firstNameInput.waitFor();
		await this.firstNameInput.fill('Luffy');

		await this.lastNameInput.waitFor();
		await this.lastNameInput.fill('Monkey D');

		await this.streetInput.waitFor();
		await this.streetInput.fill('some island');

		await this.postCodeInput.waitFor();
		await this.postCodeInput.fill('007');

		await this.cityInput.waitFor();
		await this.cityInput.fill('east blue');

		await this.countryDropdown.waitFor();
		await this.countryDropdown.selectOption('Mexico');

		await this.page.pause();
	};
}
