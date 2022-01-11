<template>
<div class="relative min-h-screen">
	<!-- Loader -->
	<skeleton-page class="px-8 py-8" v-if="isFetching" />

	<!-- Content -->
	<template v-if="!isFetching && item">
		<!-- Page heading -->
		<header class="bg-gray-50 py-6">
			<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:flex xl:items-center xl:justify-between">
				<div class="flex-1 min-w-0">
					<div class="flex items-center">
						<!-- Back -->
						<span class="mr-4 bg-gray-300 hover:bg-gray-200 p-1 rounded-full cursor-pointer" @click="goToIndex()">
							<ArrowLeftIcon class="h-6 w-6 text-gray-600" aria-hidden="true" />
						</span>

						<!-- Name -->
						<h1 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
							{{ item.name }}
						</h1>
					</div>
				</div>
			</div>
		</header>

		<!-- Main -->
		<main class="pb-16">
			<div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
				
			</div>
		</main>
	</template>
</div>

</template>

<script>
// API
import eventApi from '@/api/event';

// Components
import { ArrowLeftIcon } from '@heroicons/vue/outline';
import SkeletonPage from '@/components/loader/SkeletonPage.vue';

export default {
	components: {
		ArrowLeftIcon,
		SkeletonPage,
	},
	data() {
		return {
			isFetching: false,
			item: null,
		}
	},
	mounted() {
		this.fetch();
	},
	watch: {},
	computed: {
		slug() {
			return this.$route.params.slug;
		},
	},
	methods: {
		fetch() {
			this.isFetching = true;
			const params = {};
			const callback = (response) => {
				const data = response.data;
				this.item = data;
				console.log('this.item', this.item);
				this.isFetching = false;
			};
			const errorCallback = (error) => {
				const message = error.response.data.message;
				this.__showNotif('error', 'Error', message);
				this.isFetching = false;
			};
			eventApi.getBySlug(this.slug, callback, errorCallback);
		},
		goToIndex() {
			this.$router.push(`/events`);
		},
	},
}
</script>