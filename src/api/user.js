import client from '@/libraries/http-client';
import { buildQuery } from '@/libraries/helper';

const endpoint = '/v1/users';

export default {

	// Get Users
	fetchList(params, cb, errorCb) {
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

	// Create User
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

	// Update user
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

	// Get User Profile
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

	// Get User Profile
	getProfile(cb, errorCb) {
		const url = `${endpoint}/me`;
		client.get(url)
			.then((response) => {
				cb(response.data);
			})
			.catch((e) => {
				errorCb(e);
			});
	},

	// Update User Profile
	updateProfile(user, cb, errorCb) {
		client.put(endpoint, user)
			.then((response) => {
				cb(response.data);
			})
			.catch((e) => {
				if (errorCb) {
					errorCb(e);
				}
			});
	},

	// Bulk Delete
	bulkDelete(ids, cb, errorCb) {
		const params = {
			user_ids: JSON.stringify(ids),
			is_deleted: 1,
		};
		const url = `${endpoint}`;
		const responseHandler = (response) => {
			if (cb) {
				cb(response.data);
			}
		};
		const errorHandler = (e) => {
			if (errorCb) {
				errorCb(e);
			}
		};
		client.delete(url, { data: params })
			.then(responseHandler)
			.catch(errorHandler);
	},
};
