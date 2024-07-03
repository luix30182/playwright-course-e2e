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
