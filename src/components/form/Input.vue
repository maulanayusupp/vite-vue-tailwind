<template>
	<input
		:class="theClass"
		:type="type"
		:name="name"
		:value="value"
		:placeholder="placeholder"
		:autocomplete="autocomplete"
		@input="onInput"
		@change="onChange"
	/>
</template>

<script>
export default {
	components: {
	},
	props: {
		type: {
			type: String,
			default: () => 'text',
		},
		value: {
			type: String,
			required: true,
		},
		placeholder: {
			type: String,
			default: () => '',
		},
		autocomplete: {
			type: String,
			default: () => 'off',
		},
	},
	data() {
		return {
		}
	},
	created() {},
	mounted() {},
	beforeUnmount() {},
	methods: {
		onInput(event) {
			// Can add validation here
			this.$emit('update:modelValue', event.target.value);
		},
		onChange(event) { // Supports .lazy
			// Can add validation here
			this.$emit('update:modelValue', event.target.value);
		},
	},
	computed: {
		name() {
			return this.value ? this.value.toLowerCase() : '';
		},
		theClass() {
			const myClass = `appearance-none block px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`;
			return myClass;
		},
	},
	watch: {},
}
</script>