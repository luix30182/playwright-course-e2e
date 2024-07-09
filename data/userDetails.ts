export interface User {
	userName: string;
	password: string;
}

export const adminDetails: User = {
	userName: 'admin',
	password: process.env.ADMIN_PASSWORD ?? ''
};
