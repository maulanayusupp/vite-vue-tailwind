import { buildQuery } from '@/libraries/helper';
import client from '@/libraries/http-client';

const endpoint = '/api/files';

export default {
	/*
		Get list
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
		Get details
	*/
	getDetails(id, cb, errorCb) {
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
		Create
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
		Update
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

	/*
		Bulk delete
	*/
	bulkDelete(ids, cb, errorCb) {
		const params = {
			file_ids: JSON.stringify(ids),
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
