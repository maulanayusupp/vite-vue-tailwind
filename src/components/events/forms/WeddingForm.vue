<template>
<div class="space-y-4">
	<!-- Bride -->
	<div v-if="step === 1">
		<label for="icon" class="block text-sm font-medium text-gray-700">Bride name</label>
		<div class="mt-1">
			<t-input :type="`text`" :value="event.name" v-model="event.name" class="w-full" />
		</div>
	</div>

	<!-- Bride -->
	<div v-if="step === 2">
		<label for="icon" class="block text-sm font-medium text-gray-700">Groom name</label>
		<div class="mt-1">
			<t-input :type="`text`" :value="event.groom_name" v-model="event.groom_name" class="w-full" />
		</div>
	</div>

	<!-- Date -->
	<div v-if="step === 3">
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

	<div class="mt-10 flex justify-between">
		<div>
			<t-button class="min-w-130" :color="`gray`" @click="previous" v-if="!isFirstStep">
				Previous
			</t-button>
		</div>
		<div v-if="isLastStep">
			<t-button class="min-w-130" :color="`purple-solid`" @click="submit">
				Submit
			</t-button>
		</div>
		<div v-else>
			<t-button class="min-w-130" :color="`purple-solid`" @click="next">
				Next
			</t-button>
		</div>
	</div>
</div>
</template>

<script>
import TInput from '@/components/form/Input.vue';
import TButton from '@/components/global/Button.vue';
import DatePicker from 'vue-datepicker-next';
import 'vue-datepicker-next/index.css';

export default {
	components: {
		TInput,
		TButton,
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
			step: 1,
			totalStep: 3,
		}
	},
	created() {},
	mounted() {},
	beforeUnmount() {},
	methods: {
		previous() {
			if (this.step > 1) this.step--;
		},
		next() {
			if (this.step < this.totalStep) this.step++;
		},
		resetForm() {
			this.event = this.__duplicateVar(EVENT_DEFAULT);
		},
		submit() {
			if (this.isEdit) this.$emit('update');
			else this.$emit('save');
		},
	},
	computed: {
		isFirstStep() {
			return this.step === 1;
		},
		isLastStep() {
			return this.step === this.totalStep;
		},
		isEdit() {
			return this.event && this.event.id;
		},
	},
	watch: {},
}
</script>