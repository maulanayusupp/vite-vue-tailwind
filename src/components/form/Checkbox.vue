<template>
<!-- 
	USAGE
	<checkbox
		:label="`Turn on settings`"
		:sub-label="`If this enabled the settings will on`"
		:value="isToggleValue"
		v-model="isToggleValue"
	/>
-->
<div class="relative flex items-start">
	<div class="flex items-center h-5">
		<input
			id="comments"
			aria-describedby="comments-description" 
			ame="comments"
			type="checkbox"
			class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
			@change="toggle"
		/>
	</div>
	<div class="ml-3 text-sm">
		<label for="comments" class="font-medium text-gray-700" v-if="label">{{ label }}</label>
		<p id="comments-description" class="text-gray-500" v-if="subLabel">{{ subLabel }}</p>
	</div>
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
		subLabel: {
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