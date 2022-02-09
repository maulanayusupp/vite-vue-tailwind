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
				@update="update"
				@save="save"
				v-if="selectedType === 'wedding'"
			/>

			<!-- Birthday -->
			<birthday-form
				:event="event"
				@update="update"
				@save="save"
				v-if="selectedType === 'birthday'"
			/>

			<!-- Exhibition -->
			<exhibition-form
				:event="event"
				@update="update"
				@save="save"
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

import eventApi from '@/api/event';
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
		update() {
			const params = this.params;
			this.isSaving = true;
			const callback = (response) => {
				const item = response.data;
				this.$emit('onUpdate', item);
				this.isSaving = false;

				const message = response.message;
				this.__showNotif('success', 'Event', message);

				this.close();
			};
			const errorCallback = (error) => {
				const message = error.response.data.message;
				this.__showNotif('error', 'Error', message);
				this.isSaving = false;
			};
			eventApi.update(this.event.id, params, callback, errorCallback);
		},
		save() {
			const params = this.params;
			this.isSaving = true;
			const callback = (response) => {
				const item = response.data;
				this.$emit('onCreate', item);
				this.isSaving = false;

				const message = response.message;
				this.__showNotif('success', 'Event', message);

				this.close();
				this.goToDetails(item);

			};
			const errorCallback = (error) => {
				const message = error.response.data.message;
				this.__showNotif('error', 'Error', message);
				this.isSaving = false;
			};
			eventApi.create(params, callback, errorCallback);
		},
		goToDetails(item) {
			this.$router.push(`/events/${item.slug}`);
		},
	},
	computed: {
		params() {
			const params = this.__duplicateVar(this.event);
			params.settings = typeof this.event.settings !== 'string' ? JSON.stringify(this.event.settings) : JSON.stringify({});
			params.custom_attendees = typeof this.event.custom_attendees !== 'string' ? JSON.stringify(this.event.custom_attendees) : JSON.stringify([]);
			return params;
		},
	},
	watch: {
		item() {
			this.setData();
		},
	},
}
</script>