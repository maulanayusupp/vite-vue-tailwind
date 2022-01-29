<template>
<div class="relative min-h-screen">

	<!-- Page heading -->
	<header class="bg-gray-50 py-6">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:flex xl:items-center xl:justify-between">
			<div class="flex-1 min-w-0">
				<h1 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
					Templates
				</h1>
			</div>
			<div class="mt-5 flex xl:mt-0 xl:ml-4">
				<!-- Create -->
				<span class="">
					<t-button :color="`purple-solid`" class="">
						<PlusIcon class="-ml-1 mr-2 h-5 w-5 text-white" aria-hidden="true" />
						Create Template
					</t-button>
				</span>
			</div>
		</div>
	</header>

	<main class="pb-16">
		<div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
		</div>
	</main>
</div>
</template>

<script>
import { PlusIcon } from '@heroicons/vue/solid';
import TButton from '@/components/global/Button.vue';

export default {
	components: {
		PlusIcon,
		TButton,
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