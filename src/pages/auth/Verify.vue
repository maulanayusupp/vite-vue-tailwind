<template>
<div class="min-h-screen bg-white flex">
	<div class="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
		<div class="mx-auto w-full max-w-sm lg:w-96">
			<div>
				<img class="h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow" />
				<h2 class="mt-6 text-3xl font-extrabold text-gray-900">Verify Account</h2>
			</div>

			<div class="mt-8">

				<div v-if="isVerifying" class="mt-6">
					Veriyfing account...
				</div>
				<div v-if="!isVerifying && !isError" class="mt-6">
					All set and ready to go,
					<router-link to="/login" class="font-medium text-indigo-600 hover:text-indigo-500">
						Back to Login
					</router-link>
				</div>
				<div v-if="!isVerifying && isError" class="mt-6">
					Your token is invalid / Expired,
					<router-link to="/login" class="font-medium text-indigo-600 hover:text-indigo-500">
						Back to Login
					</router-link>
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

export default {
	
	components: {
	},
	data() {
		return {
			email: null,
			isVerifying: false,
			isError: false,
		}
	},
	setup() {
		return {
		}
	},
	mounted() {
	},
	created() {
		this.verifying();
	},
	methods: {
		verifying() {
			this.isVerifying = true;
			this.isError = false;
			const callback = (response) => {
				const message = response.message;
				this.__showNotif('success', 'User', message);
				this.isVerifying = false;
				this.isError = false;
				this.doLogout();
			};
			const errorCallback = (error) => {
				const message = error.response.data.message;
				this.__showNotif('error', 'Error', message);
				this.isVerifying = false;
				this.isError = true;
				this.doLogout();
			};
			authApi.verify(this.token, callback, errorCallback);
		},
		doLogout() {
			console.log('DO LOGOUT');
			this.$store.dispatch('auth/clearAuth');
		},
	},
	computed: {
		isValidEmailAddress() {
			return isValidEmail(this.email);
		},
		isFormValid() {
			return (
				this.isValidEmailAddress
			);
		},
		token() {
			return localStorage.getItem('access_token');
		},
	},
}
</script>