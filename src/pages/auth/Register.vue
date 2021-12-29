<template>
<div class="min-h-screen bg-white flex">
	<div class="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
		<div class="mx-auto w-full max-w-sm lg:w-96">
			<div>
				<img class="h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow" />
				<h2 class="mt-6 text-3xl font-extrabold text-gray-900">Register</h2>
			</div>

			<div class="mt-8">

				<div class="mt-6">
					<form @submit.prevent="submit" class="space-y-6">
						<div>
							<label for="name" class="block text-sm font-medium text-gray-700">Name</label>
							<div class="mt-1">
								<t-input :type="`text`" :value="name" v-model="name" class="w-full" />
							</div>
						</div>
						<div>
							<label for="email" class="block text-sm font-medium text-gray-700">
							Email address
							</label>
							<div class="mt-1">
								<t-input :type="`email`" :value="email" v-model="email" class="w-full" />
								<span v-if="!isValidEmailAddress && email && email.length !== 0" class="text-red-500 text-xs">{{$t('Invalid Email Address')}}</span>
							</div>
						</div>
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
							<t-button :type="'submit'" :color="`purple-solid`" class="w-full" :is-loading="isSendingEmail" :is-disabled="isSendingEmail || !isFormValid">
								Sign in
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
		</div>
	</div>
	<div class="hidden lg:block relative w-0 flex-1">
		<img class="absolute inset-0 h-full w-full object-cover" src="https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80" alt="" />
	</div>
</div>
</template>

<script>

import authApi from '@/api/auth';
import TButton from '@/components/global/Button.vue';
import TInput from '@/components/form/Input.vue';
import { isValidEmail, checkPassword } from '@/libraries/helper';

export default {
	
	components: {
		TInput,
		TButton,
	},
	data() {
		return {
			email: null,
			isSendingEmail: false,
			name: null,
			password: null,
			confirm_password: null,
			warningError: '',
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
			this.isSendingEmail = true;
			const params = {
				name: this.name,
				email: this.email,
				password: this.password,
				confirm_password: this.confirm_password,
			};
			const callback = (response) => {
				const message = response.message;
				this.__showNotif('success', 'User', message);
				this.isSendingEmail = false;
				this.name = null;
				this.email = null;
				this.password = null;
				this.confirm_password = null;
			};
			const errorCallback = (error) => {
				const message = error.response.data.message;
					this.__showNotif('error', 'Error', message);
				this.isSendingEmail = false;
			};
			authApi.register(params, callback, errorCallback);
		},
	},
	computed: {
		isValidEmailAddress() {
			return isValidEmail(this.email);
		},
		isFormValid() {
			console.log(!this.name);
			return (
				this.isValidEmailAddress
				&& this.name
				&& this.email
				&& this.password === this.confirm_password
				&& this.warningError !== 'Weak' || this.warningError !== 'Too weak'
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
	}
}
</script>