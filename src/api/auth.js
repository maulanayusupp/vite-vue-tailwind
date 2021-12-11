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
};
