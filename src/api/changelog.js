import client from '@/libraries/http-client';
import { buildQuery } from '@/libraries/helper';

const endpoint = '/v1/categories';

export default {
	// Get List
	getList(params, cb, errorCb) {
		const responseHandler = (response) => {
			if (cb) cb(response.data);
		};
		const errorHandler = (e) => {
			if (errorCb) errorCb(e);
		};
		const query = buildQuery(params);
		const url = `${endpoint}?${query}`;
		client.get(url)
			.then(responseHandler)
			.catch(errorHandler);
	},

	// Create
	create(params, cb, errorCb) {
		const responseHandler = (response) => {
			if (cb) cb(response.data);
		};
		const errorHandler = (e) => {
			if (errorCb) errorCb(e);
		};
		const url = `${endpoint}`;
		client.post(url, params)
			.then(responseHandler)
			.catch(errorHandler);
	},

	// Update
	update(id, params, cb, errorCb) {
		const url = `${endpoint}/${id}`;
		client.put(url, params)
			.then((response) => {
				cb(response.data);
			})
			.catch((e) => {
				if (errorCb) {
					errorCb(e);
				}
			});
	},

	// Get details
	get(id, cb, errorCb) {
		const url = `${endpoint}/${id}`;
		client.get(url)
			.then((response) => {
				cb(response.data);
			})
			.catch((e) => {
				errorCb(e);
			});
	},

	// Delete
	delete(id, cb, errorCb) {
		const url = `${endpoint}/${id}`;
		client.delete(url)
			.then((response) => {
				cb(response.data);
			})
			.catch((e) => {
				if (errorCb) errorCb(e);
			});
	},
};
