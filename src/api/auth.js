import client from '@/libraries/http-client';
import { buildQuery } from '@/libraries/helper';

const endpoint = '/api/users';

export default {
	// Login
	login(creds, cb, errorCb) {
		client.post('/auth/login', creds)
			.then((response) => {
				if (cb) {
					cb(response.data);
				}
			})
			.catch((e) => {
				if (errorCb) {
					errorCb(e);
				}
			});
	},
	// Reset Password
	forgot(emailUser, cb, errorCb) {
		const params = {
			email: emailUser,
		};
		client.post('/auth/password/forgot', params)
			.then((response) => {
				if (cb) {
					cb(response.data);
				}
			})
			.catch((e) => {
				if (errorCb) {
					errorCb(e);
				}
			});
	},
	// Reset Password
	reset(params, cb, errorCb) {
		client.post('/auth/password/reset', params)
			.then((response) => {
				if (cb) {
					cb(response.data);
				}
			})
			.catch((e) => {
				if (errorCb) {
					errorCb(e);
				}
			});
	},
	// Register
	register(params, cb, errorCb) {
		client.post('/auth/register', params)
			.then((response) => {
				if (cb) {
					cb(response.data);
				}
			})
			.catch((e) => {
				if (errorCb) {
					errorCb(e);
				}
			});
	},

	// Verify
	verify(tokenUser, cb, errorCb) {
		const params = {
			token: tokenUser,
		};
		client.post('/auth/verification', params)
			.then((response) => {
				if (cb) {
					cb(response.data);
				}
			})
			.catch((e) => {
				if (errorCb) {
					errorCb(e);
				}
			});
	},
	// resend verif email
	resend(emailUser, cb, errorCb) {
		const params = {
			email: emailUser,
		};
		client.post('/auth/resendToken', params)
			.then((response) => {
				if (cb) {
					cb(response.data);
				}
			})
			.catch((e) => {
				if (errorCb) {
					errorCb(e);
				}
			});
	},
};
