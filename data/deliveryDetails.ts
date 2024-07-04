export interface DeliveryDetails {
	firstName: string;
	lastName: string;
	street: string;
	postCode: string;
	city: string;
	country: string;
}

export const deliveryDetails: DeliveryDetails = {
	firstName: 'Luffy',
	lastName: 'Monkey D',
	street: 'street 234',
	postCode: '151515',
	city: 'Monterrey',
	country: 'Mexico'
};

export interface PaymentDetails {
	creditCard: string;
	cvc: string;
	validUntil: string;
	owner: string;
}

export const paymentDetails: PaymentDetails = {
	creditCard: '1234567890111213',
	cvc: '123',
	validUntil: '15/25',
	owner: 'Luffy MonkeyD'
};
