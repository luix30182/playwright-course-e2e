import * as nodeFetch from 'node-fetch';
import { User } from '../data/userDetails';

interface LoginResponse {
	token: string;
}

export const getLoginToken = async ({
	userName,
	password
}: User): Promise<string> => {
	const response = await nodeFetch('http://localhost:2221/api/login', {
		method: 'POST',
		body: JSON.stringify({ userName, password })
	});

	if (response.status !== 200) {
		throw new Error('Login error');
	}

	const body = await response.json();
	return body.token;
};
