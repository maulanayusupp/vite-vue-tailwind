import { buildQuery } from '@/libraries/helper';
import client from '@/libraries/http-client';

const endpoint = '/v1/events';

export default {
	/*
	 * Get list
	*/
	getList(params, cb, errorCb) {
		const query = buildQuery(params);
		const url = `${endpoint}?${query}`;
		client.get(url)
			.then((response) => {
				cb(response.data);
			})
			.catch((e) => {
				errorCb(e);
			});
	},

	/*
	 * Get details
	*/
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

	/*
	 * Get details by slug
	*/
	getBySlug(slug, cb, errorCb) {
		const url = `${endpoint}/slug/${slug}`;
		client.get(url)
			.then((response) => {
				cb(response.data);
			})
			.catch((e) => {
				errorCb(e);
			});
	},

	/*
	 * Create
	*/
	create(params, cb, errorCb) {
		const url = endpoint;
		client.post(url, params)
			.then((response) => {
				cb(response.data);
			})
			.catch((e) => {
				errorCb(e);
			});
	},

	/*
	 * Update
	*/
	update(id, params, cb, errorCb) {
		const url = `${endpoint}/${id}`;
		client.put(url, params)
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

	// Delete
	deleteForever(id, cb, errorCb) {
		const url = `${endpoint}/permanent/${id}`;
		client.delete(url)
			.then((response) => {
				cb(response.data);
			})
			.catch((e) => {
				if (errorCb) errorCb(e);
			});
	},
};
