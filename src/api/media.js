import { buildQuery } from '@/libraries/helper';
import client from '@/libraries/http-client';

const endpoint = '/api/medias';

export default {

	/*
	 * Upload
	*/
	upload(params, cb, errorCb) {
		const url = endpoint;
		client.post(url, params)
			.then((response) => {
				cb(response.data);
			})
			.catch((e) => {
				errorCb(e);
			});
	},
};
