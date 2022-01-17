<template>
	<div class="my-4 space-y-4">
		<!-- Select type -->
		<div>
			<label class="block text-sm font-medium text-gray-700">Select type</label>
			<t-select
				:options="types"
				:value="selectedType"
				:placeholder="`Please pick one`"
				v-model="selectedType">
			</t-select>
		</div>

		<template v-if="event && event.type">
			<!-- Wedding -->
			<wedding-form
				:event="event"
				v-if="selectedType === 'wedding'"
			/>

			<!-- Birthday -->
			<birthday-form
				:event="event"
				v-if="selectedType === 'birthday'"
			/>

			<!-- Exhibition -->
			<exhibition-form
				:event="event"
				v-if="selectedType === 'exhibition'"
			/>

			<div v-if="isFinalStep">
				<div class="mt-10 flex justify-between">
					<t-button class="min-w-130" :color="`gray`" @click="close">
						Cancel
					</t-button>
					<t-button class="min-w-130" :color="`purple-solid`" @click="submit">
						Submit
					</t-button>
				</div>
			</div>
		</template>

	</div>
</template>
<script>

import { EVENT_DEFAULT, EVENT_TYPES } from '@/databags/event';
import { Listbox, ListboxButton, ListboxOptions, ListboxOption, ListboxLabel } from '@headlessui/vue';
import { ChevronDownIcon, CheckIcon } from '@heroicons/vue/outline';

import WeddingForm from '@/components/events/forms/WeddingForm.vue';
import BirthdayForm from '@/components/events/forms/BirthdayForm.vue';
import ExhibitionForm from '@/components/events/forms/ExhibitionForm.vue';
import TSelect from '@/components/form/Select.vue';
import TButton from '@/components/global/Button.vue';

export default {
	components: {
		WeddingForm,
		BirthdayForm,
		ExhibitionForm,
		Listbox,
		ListboxButton,
		ListboxOptions,
		ListboxOption,
		ListboxLabel,
		TSelect,
		ChevronDownIcon,
		CheckIcon,
		TButton,
	},
	props: {
		item: {
			type: Object,
			default: () => null,
		},
		type: {
			type: String,
			default: () => '',
		}
	},
	data() {
		return {
			types: EVENT_TYPES,
			event: EVENT_DEFAULT,
			selectedType: '',
			isFinalStep: false,
		}
	},
	created() {},
	mounted() {
		if (this.type) this.selectedType = this.__duplicateVar(this.type);
	},
	beforeUnmount() {},
	methods: {
		close() {
			this.$emit('onClose');
		},
		setData() {
			if (this.item) this.event = this.__duplicateVar(this.item);
		},
		submit() {
			console.log('SUBMIT');
		},
	},
	computed: {},
	watch: {
		item() {
			this.setData();
		},
	},
}
</script>