<template>
	<span 
		:class="theClass"
		class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium">
		<slot></slot>
	</span>
</template>

<script>
export default {
	components: {
	},
	props: {
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
		theClass() {
			let btnClass = `bg-gray-100 text-gray-800`;
			switch (this.color) {
				case 'red': btnClass = `bg-red-100 text-red-800`; break;
				case 'yellow': btnClass = `bg-yellow-100 text-yellow-800`; break;
				case 'green': btnClass = `bg-green-100 text-green-800`; break;
				case 'blue': btnClass = `bg-blue-100 text-blue-800`; break;
				case 'indigo': btnClass = `bg-indigo-100 text-indigo-800`; break;
				case 'purple': btnClass = `bg-purple-100 text-purple-800`; break;
				case 'pink': btnClass = `bg-pink-100 text-pink-800`; break;
			}
			const theClass = `${btnClass} ${this.customClass}`;
			return theClass;
		},
	},
	watch: {},
}
</script>