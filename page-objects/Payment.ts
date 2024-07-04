import { Locator, Page, expect } from '@playwright/test';
import { PaymentDetails } from '../data/deliveryDetails';

export class PaymentPage {
	private page: Page;
	private discountCode: Locator;
	private discountInput: Locator;
	private activateDiscountButton: Locator;
	private totalValue: Locator;
	private discountedValue: Locator;
	private activatedMessage: Locator;

	private creditCardOwnserInput: Locator;
	private creditCardNumberInput: Locator;
	private creditCardValidUntilInput: Locator;
	private creditCardCvcInput: Locator;
	private payButton: Locator;

	constructor(page: Page) {
		this.page = page;
		this.discountCode = page
			.frameLocator('[data-qa="active-discount-container"]')
			.locator('[data-qa="discount-code"]');
		this.discountInput = this.page.getByPlaceholder('Discount code');
		this.activateDiscountButton = this.page.locator(
			'[data-qa="submit-discount-button"]'
		);
		this.totalValue = this.page.locator('[data-qa="total-value"]');
		this.discountedValue = this.page.locator(
			'[data-qa="total-with-discount-value"]'
		);
		this.activatedMessage = this.page.locator(
			'[data-qa="discount-active-message"]'
		);

		this.creditCardOwnserInput =
			this.page.getByPlaceholder('Credit card owner');
		this.creditCardNumberInput =
			this.page.getByPlaceholder('Credit card number');
		this.creditCardValidUntilInput = this.page.getByPlaceholder('Valid until');
		this.creditCardCvcInput = this.page.getByPlaceholder('Credit card CVC');
		this.payButton = this.page.locator('[data-qa="pay-button"]');
	}

	activateDiscount = async () => {
		await this.discountCode.waitFor();
		const code = await this.discountCode.innerText();

		//for laggy input
		await this.discountInput.waitFor();
		await this.discountInput.fill(code);

		await expect(this.discountInput).toHaveValue(code);

		// await this.discountInput.focus();
		// await this.page.keyboard.type(code, { delay: 1000 });
		// expect(await this.discountInput.inputValue()).toBe(code);

		expect(await this.discountedValue.isVisible()).toBe(false);
		expect(await this.activatedMessage.isVisible()).toBe(false);

		await this.activateDiscountButton.waitFor();
		await this.activateDiscountButton.click();

		await this.activatedMessage.waitFor();

		await this.discountedValue.waitFor();
		const discountTxt = await this.discountedValue.innerText();
		const discount = Number(discountTxt.replace('$', ''));

		await this.totalValue.waitFor();
		const totalTxt = await this.totalValue.innerText();
		const total = Number(totalTxt.replace('$', ''));

		expect(discount).toBeLessThan(total);
	};

	fillPaymentDetails = async (paymentDetails: PaymentDetails) => {
		await this.creditCardOwnserInput.waitFor();
		await this.creditCardOwnserInput.fill(paymentDetails.owner);

		await this.creditCardNumberInput.waitFor();
		await this.creditCardNumberInput.fill(paymentDetails.creditCard);

		await this.creditCardValidUntilInput.waitFor();
		await this.creditCardValidUntilInput.fill(paymentDetails.validUntil);

		await this.creditCardCvcInput.waitFor();
		await this.creditCardCvcInput.fill(paymentDetails.cvc);
	};

	completePayment = async () => {
		await this.payButton.waitFor();
		await this.payButton.click();

		await this.page.waitForURL(/\/thank-you/, { timeout: 3000 });
	};
}
