<template>
<!-- Notification refresh for new content -->
	<div
		aria-live="assertive"
		class="fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:items-start"
	>
		<div class="w-full flex flex-col items-center space-y-4 sm:items-start fixed bottom-0 m-6 left-0">
			<!-- Notification panel, dynamically insert this into the live region when it needs to be displayed -->
			<transition
				enterActiveClass="transform ease-out duration-300 transition"
				enterFromClass="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
				enterToClass="translate-y-0 opacity-100 sm:translate-x-0"
				leaveActiveClass="transition ease-in duration-100"
				leaveFromClass="opacity-100"
				leaveToClass="opacity-0"
			>
				<div
					v-if="__needRefresh"
					class="max-w-[26em] w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden"
				>
					<div class="p-4">
						<div class="flex items-start">
							<div class="flex-shrink-0">
								<RefreshIcon
									class="h-6 w-6 text-gray-400"
									aria-hidden="true"
								/>
							</div>
							<div class="ml-3 w-0 flex-1 pt-0.5">
								<p class="text-sm font-medium text-gray-900">
									Updates available
								</p>
								<p class="mt-1 text-sm text-gray-500">
									Updates available and has been downloaded <br>
									Click refresh to load the new version of Bannerbite
								</p>
								<div class="mt-3 flex space-x-7">
									<button
										type="button"
										class="px-3 py-2 bg-white rounded-md text-sm font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
										@click="__updateServiceWorker()"
									>
										Refresh
									</button>
									<button
										type="button"
										class="px-3 py-2 bg-white rounded-md text-sm font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
										@click="__closePromptUpdateSW()"
									>
										Dismiss
									</button>
								</div>
							</div>
							<div class="ml-4 flex-shrink-0 flex">
								<button
									class="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
									@click="__closePromptUpdateSW()"
								>
									<span class="sr-only">Close</span>
									<XIcon
										class="h-5 w-5"
										aria-hidden="true"
									/>
								</button>
							</div>
						</div>
					</div>
				</div>
			</transition>
		</div>
	</div>
</template>

<script>

import { RefreshIcon, XIcon } from '@heroicons/vue/outline';

export default {
	components: {
		RefreshIcon,
		XIcon,
	},
	props: {
	},
	data() {
		return {
		}
	},
	created() {},
	mounted() {},
	beforeUnmount() {},
	methods: {},
	computed: {},
	watch: {},
}
</script>
