<template>
<!-- 
USAGE
<toggle
	:label="`Turn on settings`"
	:value="isToggleValue"
	v-model="isToggleValue"
/>
-->
<div class="flex">
	<div
		class="w-14 h-8 flex items-center bg-gray-300 rounded-full p-1 duration-300 cursor-pointer"
		:class="{ 'bg-green-500': value }"
		:aria-checked="value.toString()"
		@click="toggle()">
		<div
			class="bg-white w-6 h-6 rounded-full shadow-md transform duration-300"
			:class="{ 'translate-x-6': value }">
		</div>
	</div>
	<label class="ml-2 relative top-1" v-if="label">{{ label }}</label>
</div>
</template>

<script>
export default {
	props: {
		value: {
			type: Boolean,
			default: false,
		},
		label: {
			type: String,
			default: '',
		},
	},
	mounted() {
		console.log(this.value);
	},
	methods: {
		toggle() {
			this.$emit('update:modelValue', !this.value)
		},
	}
};
</script>