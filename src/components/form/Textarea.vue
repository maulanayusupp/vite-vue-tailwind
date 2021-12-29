<template>
	<textarea
		:rows="rows"
		:class="theClass"
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
		value: {
			type: String,
			default: () => '',
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
		rows: {
			type: String,
			default: () => '3',
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
			const myClass = `block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 rounded-md`;
			return myClass;
		},
	},
	watch: {},
}
</script>