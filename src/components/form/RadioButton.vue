<template>
<!-- 
	USAGE
	<t-radio-button
		:label="`Public access`"
		:sub-label="`Everyone with the link will see this event`"
		:value="`public`"
		:name="'inputType'"
		:id="`public-selected`"
		:selected-value="event.type"
		v-model="event.type"
	/>
-->
<div class="relative flex items-start">
	<div class="absolute flex items-center h-5">
		<input
			:id="id"
			:name="name"
			aria-describedby="radio-input"
			type="radio"
			class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
			@change="toggle($event)"
			:checked="value === selectedValue"
		/>
	</div>
	<div class="pl-7 text-sm">
		<label :for="id" class="font-medium text-gray-700" v-if="label">{{ label }}</label>
		<p id="checkbox-description" class="text-gray-500" v-if="subLabel">{{ subLabel }}</p>
	</div>
</div>
</template>

<script>
export default {
	props: {
		id: {
			type: String,
			default: '',
		},
		name: {
			type: String,
			default: '',
		},
		value: {
			type: String,
			default: '',
		},
		selectedValue: {
			type: String,
			default: '',
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
	},
	methods: {
		toggle() {
			console.log('this.value', this.value);
			this.$emit('update:modelValue', this.value)
		},
	}
};
</script>