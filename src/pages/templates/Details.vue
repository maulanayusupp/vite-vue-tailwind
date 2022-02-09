<template>
<div class="relative min-h-screen">

	<!-- Page heading -->
	<header class="py-4">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:flex xl:items-center xl:justify-between">
			<div class="flex-1 min-w-0">
				<div class="flex items-center">
					<!-- Back -->
					<span class="mr-6 bg-gray-300 hover:bg-gray-200 p-2 rounded-full cursor-pointer" @click="goBack()">
						<ArrowLeftIcon class="h-4 w-4 text-gray-600" aria-hidden="true" />
					</span>

					<!-- Name -->
					<div class="text-xl font-semibold text-gray-900 sm:truncate">
						{{ selected.name }}
					</div>
				</div>
			</div>
		</div>
	</header>

	<main class="pb-16">
		<div class="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-40">
			<template-customer v-if="slug === 'customer'" />
			<template-saas v-if="slug === 'saas'" />
			<template-management v-if="slug === 'management'" />
		</div>
	</main>
</div>
</template>

<script>

import { ArrowLeftIcon } from '@heroicons/vue/outline';
import { PlusIcon } from '@heroicons/vue/solid';
import TButton from '@/components/global/Button.vue';
import TemplateCustomer from '@/components/templates/examples/customer/Index.vue';
import TemplateSaas from '@/components/templates/examples/saas/Index.vue';
import TemplateManagement from '@/components/templates/examples/management/Index.vue';
import { EXAMPLE_TEMPLATES } from '@/databags/template';

export default {
	components: {
		TemplateCustomer,
		TemplateSaas,
		TemplateManagement,
		PlusIcon,
		TButton,
		ArrowLeftIcon,
	},
	data() {
		return {
		}
	},
	created() {},
	mounted() {},
	beforeUnmount() {},
	methods: {
		goToIndex() {
			this.$router.push(`/events`);
		},
		goBack() {
			this.$router.go(-1);
		},
	},
	computed: {
		slug() {
			return this.$route.params.slug;
		},
		selected() {
			return EXAMPLE_TEMPLATES.find(template => template.slug === this.slug);
		},
	},
	watch: {},
}
</script>