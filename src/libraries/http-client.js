import axios from 'axios';

const url = process.env.VUE_APP_API_URL;
const token = localStorage.getItem('access_token');

const globalResponseHandler = response => response;

const globalErrorHandler = (error) => {
	const { status } = error.response;
	const isTokenExpired = status === 401;
	const isUnauthorized = status === 403;
	if (isTokenExpired) {
		localStorage.removeItem('access_token');
		localStorage.removeItem('id_token');
		localStorage.removeItem('expires_at');

		const originalRequest = error.config;
		delete originalRequest.headers.Authorization;
		window.location.href = '/login';
	} else if (isUnauthorized) {
		window.location.href = '/events';
	}
	return Promise.reject(error);
};

const client = axios.create({
	baseURL: url,
	headers: {
		Authorization: `Bearer ${token}`,
	},
});

// Add a response interceptor
client.interceptors.response.use(globalResponseHandler, globalErrorHandler);

export default client;
