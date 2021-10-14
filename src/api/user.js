import client from '@/libraries/http-client';
import { buildQuery } from '@/libraries/helper';

const endpoint = '/api/users';

export default {
	// Auth
	auth(creds, cb, errorCb) {
		client.post('/auth', creds)
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

	// direct login to backend, without auth0
	login(creds) {
		return client.post('/api/auth/login', creds);
	},

	// check user before login
	checkLogin(creds) {
		return client.post('/api/auth/login/check', creds);
	},

	// logout and clear token in database
	logout(creds) {
		return client.post('/api/auth/logout', creds);
	},

	// Send sms verification code
	sendSMSVerificationCode(params) {
		return client.post('/api/auth/verifications/send_verification_code', params);
	},

	// Send sms verification code
	checkVerificationCode(params) {
		return client.post('/api/auth/verifications/login_with_verify_code', params);
	},

	// Reset Password
	resetPassword(email, cb, errorCb) {
		const params = {
			email,
		};
		const url = `${endpoint}/password/reset`;
		client.post(url, params)
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

	// Set Password
	setPassword(params, cb, errorCb) {
		const url = `${endpoint}/password/reset/create`;
		client.post(url, params)
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

	// Validate Reset Password Code
	validateResetPasswordCode(params, cb, errorCb) {
		const url = `${endpoint}/password/reset/validate`;
		client.post(url, params)
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

	// Check Username
	checkUsername(username, cb, errorCb) {
		const params = {
			username,
		};
		const url = `${endpoint}/check_username`;
		client.post(url, params)
			.then((response) => {
				cb(response.data);
			})
			.catch((e) => {
				if (errorCb) {
					errorCb(e);
				}
			});
	},

	// Change Password
	changePassword(currentPassword, newPassword, cb, errorCb) {
		const params = {
			current_password: currentPassword,
			new_password: newPassword,
		};
		const url = `${endpoint}/password`;
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

	// Update Username
	updateUsername(username, cb, errorCb) {
		const params = {
			username,
		};
		const url = `${endpoint}/username`;
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

	// Get Users
	getUsers(params, cb, errorCb) {
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

	// Search Users
	search(params, cb, errorCb) {
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
		const query = buildQuery(params);
		const url = `${endpoint}/search?${query}`;
		client.get(url)
			.then(responseHandler)
			.catch(errorHandler);
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

	// Update user
	updateUser(params, cb, errorCb) {
		const url = `${endpoint}/${params.id}`;
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

	// Update user password
	updateUserPassword(params, cb, errorCb) {
		const url = `${endpoint}/${params.id}/password`;
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

	// Generate link auto login
	generateLinkLogin(params, cb, errorCb) {
		const url = '/api/auth/login/generate_link';
		client.post(url, params)
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

	// Generate link auto login
	verifyLoginCode(params, cb, errorCb) {
		const url = '/api/auth/login/auto';
		client.post(url, params)
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

	// Convert Role
	convertRole(params, cb, errorCb) {
		const url = `${endpoint}/convert_role`;
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

	// Get Inactive
	getInactiveList(params, cb, errorCb) {
		const responseHandler = (response) => {
			if (cb) cb(response.data);
		};
		const errorHandler = (e) => {
			if (errorCb) errorCb(e);
		};
		const query = buildQuery(params);
		const url = `${endpoint}/inactive?${query}`;
		client.get(url)
			.then(responseHandler)
			.catch(errorHandler);
	},

	// Get Inactive
	getInactiveStatistic(params, cb, errorCb) {
		const responseHandler = (response) => {
			if (cb) cb(response.data);
		};
		const errorHandler = (e) => {
			if (errorCb) errorCb(e);
		};
		const query = buildQuery(params);
		const url = `${endpoint}/inactive/statistic?${query}`;
		client.get(url)
			.then(responseHandler)
			.catch(errorHandler);
	},
};
