<template>
	<select
		:class="theClass"
		:name="name"
		:value="value"
		@input="onInput"
		@change="onChange">
		<option value="" disabled selected>{{ placeholder }}</option>
		<option
			:value="item.id"
			v-for="(item, index) in options"
			:key="index">
			{{ item.name }}
		</option>
		
	</select>
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
			default: () => 'Please select',
		},
		options: {
			type: Array,
			default: () => [],
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
			return this.value && typeof this.value === 'string' ? this.value.toLowerCase() : '';
		},
		theClass() {
			const myClass = `mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md`;
			return myClass;
		},
	},
	watch: {},
}
</script>