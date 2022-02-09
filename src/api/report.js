import client from '@/libraries/http-client';
import { buildQuery } from '@/libraries/helper';

const endpoint = '/v1/reports';

export default {
	// Get statistic
	getStatistic(params, cb, errorCb) {
		const responseHandler = (response) => {
			if (cb) cb(response.data);
		};
		const errorHandler = (e) => {
			if (errorCb) errorCb(e);
		};
		const query = buildQuery(params);
		const url = `${endpoint}/statistic?${query}`;
		client.get(url)
			.then(responseHandler)
			.catch(errorHandler);
	},
};
