<template>
<div class="relative min-h-screen">

	<!-- Page heading -->
	<header class="py-4 mt-6">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:flex xl:items-center xl:justify-between">
			<div class="flex-1 min-w-0">
				<h1 class="text-2xl font-semibold text-gray-900 sm:truncate">
					Templates
				</h1>
			</div>
			<div class="mt-5 flex xl:mt-0 xl:ml-4">
				<!-- Create -->
				<!-- <span class="">
					<t-button :color="`purple-solid`" class="">
						<PlusIcon class="-ml-1 mr-2 h-5 w-5 text-white" aria-hidden="true" />
						Create Template
					</t-button>
				</span> -->
			</div>
		</div>
	</header>

	<main class="pb-16">
		<div class="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-40">
			<!-- List -->
			<ul
				role="list"
				class="grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4 md:p-0"
				v-if="!isFetching && items.length > 0">
				<li
					v-for="(item, index) in items"
					:key="index"
					class="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200">
					
					<!-- Item Card -->
					<item-card
						:item="item"
					/>
				</li>
			</ul>
		</div>
	</main>
</div>
</template>

<script>
import { PlusIcon } from '@heroicons/vue/solid';
import TButton from '@/components/global/Button.vue';
import { EXAMPLE_TEMPLATES } from '@/databags/template';
import ItemCard from '@/components/templates/ItemCard.vue';

export default {
	components: {
		PlusIcon,
		TButton,
		ItemCard,
	},
	data() {
		return {
			isFetching: false,
			items: this.__duplicateVar(EXAMPLE_TEMPLATES),
		}
	},
	created() {},
	mounted() {
	},
	beforeUnmount() {},
	methods: {},
	computed: {},
	watch: {},
}
</script>