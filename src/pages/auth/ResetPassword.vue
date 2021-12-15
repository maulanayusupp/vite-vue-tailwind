<template>
<div class="min-h-screen bg-white flex">
	<div class="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
		<div class="mx-auto w-full max-w-sm lg:w-96">
			<div>
				<img class="h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow" />
				<h2 class="mt-6 text-3xl font-extrabold text-gray-900">Reset Password</h2>
			</div>

			<div class="mt-8">

				<div class="mt-6">
					<form action="#" method="POST" class="space-y-6">
						<div>
							<label for="email" class="block text-sm font-medium text-gray-700">
							Email address
							</label>
							<div class="mt-1">
								<t-input :type="`email`" :value="email" v-model="email" />
							</div>
						</div>

						<div>
							<button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
							Reset Password
							</button>
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

import TInput from '@/components/form/Input.vue';

export default {
	components: {
		TInput,
	},
	data() {
		return {
			email: null,
		}
	},
	setup() {
		return {
		}
	},
	mounted() {
	},
	methods: {
	},
}
</script>