<template>
	<button
		class="inline-flex items-center justify-center px-4 py-2 border rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2"
		:type="type"
		:class="btnClass"
		:disabled="isDisabled">
		<svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" v-if="isLoading">
			<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
			<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
		</svg>
		<slot></slot>
	</button>
</template>

<script>
export default {
	components: {
	},
	props: {
		type: {
			type: String,
			default: () => 'button',
		},
		isDisabled: {
			type: Boolean,
			default: () => false,
		},
		isLoading: {
			type: Boolean,
			default: () => false,
		},
		color: {
			type: String,
			default: () => '',
		},
		customClass: {
			type: String,
			default: () => 'default',
		},
	},
	data() {
		return {
		}
	},
	created() {},
	mounted() {},
	beforeUnmount() {},
	methods: {},
	computed: {
		btnClass() {
			let btnClass = `focus:ring-offset-gray-50 focus:ring-purple-500 border-gray-300 text-gray-700 bg-white hover:bg-gray-50`;
			switch (this.color) {
				case 'purple-solid':
					btnClass = `focus:ring-indigo-500 text-white bg-indigo-600 hover:bg-indigo-700`;
					break;
				case 'red-solid':
					btnClass = `focus:ring-red-500 text-white bg-red-600 hover:bg-red-700`;
					break;
			}
			const theClass = `${btnClass} ${this.customClass}`;
			return theClass;
		},
	},
	watch: {},
}
</script>