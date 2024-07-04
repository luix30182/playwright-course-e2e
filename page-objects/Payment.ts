import { Locator, Page, expect } from '@playwright/test';

export class PaymentPage {
	private page: Page;
	private discountCode: Locator;
	private discountInput: Locator;
	private activateDiscountButton: Locator;
	private totalValue: Locator;
	private discountedValue: Locator;
	private activatedMessage: Locator;

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
}
