<template>
<div class="space-y-4">
	<!-- Name -->
	<div>
		<label for="icon" class="block text-sm font-medium text-gray-700">Name</label>
		<div class="mt-1">
			<t-input :type="`text`" :value="event.name" v-model="event.name" class="w-full" />
		</div>
	</div>

	<!-- Date -->
	<div>
		<label for="start_time" class="block text-sm font-medium text-gray-700">Select date</label>
		<div class="mt-1">
			<date-picker
				class="w-full-important"
				v-model:value="event.start_time"
				type="datetime"
				format="YYYY-MM-DD HH:mm:ss"
				value-type="YYYY-MM-DD HH:mm:ss">
			</date-picker>
		</div>
	</div>
</div>
</template>

<script>
import TInput from '@/components/form/Input.vue';
import DatePicker from 'vue-datepicker-next';
import 'vue-datepicker-next/index.css';

export default {
	components: {
		TInput,
		DatePicker,
	},
	props: {
		event: {
			type: Object,
			default: () => null,
		}
	},
	data() {
		return {
		}
	},
	created() {},
	mounted() {},
	beforeUnmount() {},
	methods: {},
	computed: {},
	watch: {},
}
</script>