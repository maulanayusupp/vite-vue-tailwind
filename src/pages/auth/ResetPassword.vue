<template>
<div class="min-h-screen bg-white flex">
	<div class="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
		<div div class="mx-auto w-full max-w-sm lg:w-96">
			<div>
				<img class="h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow" />
				<h2 class="mt-6 text-3xl font-extrabold text-gray-900">Reset Password</h2>
			</div>

			<div v-if="token && !isError" class="mt-8">

				<div class="mt-6">
					<form @submit.prevent="submit" class="space-y-6">
						<div>
							<div class="flex justify-between">
								<div for="password" class="block text-sm font-medium text-gray-700">Password</div>
								<div class="text-sm"
									:class="{'very-weak': warningError === 'Too Weak',
										'weak': warningError === 'Weak',
										'strong': warningError === 'Strong' || warningError === 'Medium',
									}">
									{{warningError}}
								</div>
							</div>
							<div class="mt-1">
								<t-input :type="`password`" :value="password" v-model="password" class="w-full" />
							</div>
							<span class="text-red-500 text-xs" v-if="warningError === 'Weak' && password">Please enter a password of at least 8 characters, and use a combination of uppercase and lowercase letters, and numbers</span>
						</div>
						<div>
							<label for="confirm_password" class="block text-sm font-medium text-gray-700">Confirm Password</label>
							<div class="mt-1">
								<t-input :type="`password`" :value="confirm_password" v-model="confirm_password" class="w-full" />
							</div>
							<label class="text-red-500 text-xs" v-if="confirm_password && confirm_password !== password">Password do not match</label>
						</div>

						<div>
							<t-button :type="'submit'" :color="`purple-solid`" class="w-full" :is-loading="isSaving" :is-disabled="!isFormValid || isSaving">
								Reset Email
							</t-button>
						</div>

						<div class="flex items-center justify-start">
							<div class="text-sm">
								<router-link to="/login" class="font-medium text-indigo-600 hover:text-indigo-500">
									Back to login
								</router-link>
							</div>
						</div>
					</form>
				</div>
			</div>
			<div v-if="!token || isError">
				Your token is invalid / Expired,
				<router-link to="/login" class="font-medium text-indigo-600 hover:text-indigo-500">
					Back to Login
				</router-link>
			</div>
		</div>
	</div>
	<div class="hidden lg:block relative w-0 flex-1">
		<img class="absolute inset-0 h-full w-full object-cover" src="https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80" alt="" />
	</div>
</div>
</template>

<script>

import authApi from '@/api/auth';
import TInput from '@/components/form/Input.vue';
import TButton from '@/components/global/Button.vue';
import { checkPassword  } from '@/libraries/helper';

export default {
	
	components: {
		TInput,
		TButton,
	},
	data() {
		return {
			password: null,
			confirm_password: null,
			isSaving: false,
			warningError: '',
			isError: false,
		}
	},
	setup() {
		return {
		}
	},
	mounted() {
	},
	methods: {
		submit() {
			this.isSaving = true;
			this.isError = false;

			const params = {
				email: this.email,
				token: this.token,
				new_password: this.password,
				confirm_password: this.password,
			};
			const callback = (response) => {
				const message = response.message;
				this.__showNotif('success', 'User', message);
				this.$router.push('/');
				this.isSaving = false;
				this.isError = false;
				this.doLogout();
			};
			const errorCallback = (error) => {
				const message = error.response.data.message;
				this.__showNotif('error', 'Error', message);
				this.isSaving = false;
				this.isError = true;
				this.doLogout();
			};
			authApi.reset(params, callback, errorCallback);
		},
		doLogout() {
			console.log('DO LOGOUT');
			this.$store.dispatch('auth/clearAuth');
		},
	},
	computed: {
		token() {
			return localStorage.getItem('access_token');
		},
		email() {
			const { email } = this.$route.query ? this.$route.query : '';
			return email;
		},
		isFormValid() {
			return (
				this.password === this.confirm_password
				&& this.warningError !== 'Weak'
				&& this.warningError !== 'Too weak'
				&& this.password
			);
		},
	},
	watch: {
		password() {
			if (this.password) {
				const result = checkPassword(this.password);
				if (result === 0) this.warningError = 'Too Weak';
				if (result === 1) this.warningError = 'Weak';
				if (result === 2) this.warningError = 'Medium';
				if (result === 3) this.warningError = 'Strong';
			}
			if (!this.password) this.warningError = '';
		},
	},
	beforeUnmount() {
		this.doLogout();
	},
}
</script>