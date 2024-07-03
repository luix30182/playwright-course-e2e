import { Locator, Page, expect } from '@playwright/test';
import { DeliveryDetails } from '../data/deliveryDetails';

export class DeliveryDetailsPage {
	private page: Page;
	private firstNameInput: Locator;
	private lastNameInput: Locator;
	private streetInput: Locator;
	private postCodeInput: Locator;
	private cityInput: Locator;
	private countryDropdown: Locator;
	private saveAddressButton: Locator;
	private savedAddresContainer: Locator;

	private savedFirstName: Locator;
	private savedLastName: Locator;
	private savedStreet: Locator;
	private savedPostCode: Locator;
	private savedCity: Locator;
	private savedCountry: Locator;

	constructor(page: Page) {
		this.page = page;
		this.firstNameInput = this.page.locator('[data-qa="delivery-first-name"]');
		this.lastNameInput = this.page.locator('[data-qa="delivery-last-name"]');
		this.streetInput = this.page.locator('[data-qa="delivery-address-street"]');
		this.postCodeInput = this.page.locator('[data-qa="delivery-postcode"]');
		this.cityInput = this.page.locator('[data-qa="delivery-city"]');
		this.countryDropdown = this.page.locator('[data-qa="country-dropdown"]');
		this.saveAddressButton = this.page.getByRole('button', {
			name: 'Save address for next time'
		});
		this.savedAddresContainer = this.page.locator(
			'[data-qa="saved-address-container"]'
		);

		this.savedFirstName = this.page.locator(
			'[data-qa="saved-address-firstName"]'
		);
		this.savedLastName = this.page.locator(
			'[data-qa="saved-address-lastName"]'
		);
		this.savedStreet = this.page.locator('[data-qa="saved-address-street"]');
		this.savedPostCode = this.page.locator(
			'[data-qa="saved-address-postcode"]'
		);
		this.savedCity = this.page.locator('[data-qa="saved-address-city"]');
		this.savedCountry = this.page.locator('[data-qa="saved-address-country"]');
	}

	fillDetails = async (deliveryDetails: DeliveryDetails) => {
		await this.firstNameInput.waitFor();
		await this.firstNameInput.fill(deliveryDetails.firstName);

		await this.lastNameInput.waitFor();
		await this.lastNameInput.fill(deliveryDetails.lastName);

		await this.streetInput.waitFor();
		await this.streetInput.fill(deliveryDetails.street);

		await this.postCodeInput.waitFor();
		await this.postCodeInput.fill(deliveryDetails.postCode);

		await this.cityInput.waitFor();
		await this.cityInput.fill(deliveryDetails.city);

		await this.countryDropdown.waitFor();
		await this.countryDropdown.selectOption(deliveryDetails.country);
	};

	saveDetails = async () => {
		const addressCountBefore = await this.savedAddresContainer.count();
		await this.saveAddressButton.waitFor();
		await this.saveAddressButton.click();
		await this.savedAddresContainer.waitFor();
		await expect(this.savedAddresContainer).toHaveCount(addressCountBefore + 1);

		await this.savedFirstName.first().waitFor();
		expect(await this.savedFirstName.first().innerText()).toBe(
			await this.firstNameInput.inputValue()
		);
		await this.savedLastName.first().waitFor();
		expect(await this.savedLastName.first().innerText()).toBe(
			await this.lastNameInput.inputValue()
		);
		await this.savedStreet.first().waitFor();
		expect(await this.savedStreet.first().innerText()).toBe(
			await this.streetInput.inputValue()
		);
		await this.savedPostCode.first().waitFor();
		expect(await this.savedPostCode.first().innerText()).toBe(
			await this.postCodeInput.inputValue()
		);
		await this.savedCity.first().waitFor();
		expect(await this.savedCity.first().innerText()).toBe(
			await this.cityInput.inputValue()
		);
		await this.savedCountry.first().waitFor();
		expect(await this.savedCountry.first().innerText()).toBe(
			await this.countryDropdown.inputValue()
		);
	};
}
