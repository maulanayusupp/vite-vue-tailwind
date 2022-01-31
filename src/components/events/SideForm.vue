<template>
<slide-over :is-show="isShow">
	<form class="h-full flex flex-col bg-white shadow-xl overflow-y-auto">
		<div class="flex-1">

			<!-- Header -->
			<div class="px-4 py-6 bg-gray-50 sm:px-6">
				<div class="flex items-start justify-between space-x-3">
					<div class="space-y-1">
						<div class="text-lg font-medium text-gray-900">New Event</div>
						<p class="text-sm text-gray-500">
							Get started by filling in the information below to create your new event.
						</p>
					</div>
					<div class="h-7 flex items-center">
						<button type="button" class="text-gray-400 hover:text-gray-500" @click="close()">
							<span class="sr-only">Close panel</span>
							<XIcon class="h-6 w-6" aria-hidden="true" />
						</button>
					</div>
				</div>
			</div>

			<!-- Divider container -->
			<div class="py-6 space-y-6 sm:py-0 sm:space-y-0 sm:divide-y sm:divide-gray-100">
				<!-- Name -->
				<div class="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
					<div>
						<label for="event-name" class="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2">Name</label>
					</div>
					<div class="sm:col-span-2">
						<t-input :type="`text`" :value="event.name" v-model="event.name" class="w-full" />
					</div>
				</div>

				<!-- Description -->
				<div class="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
					<div>
						<label for="event-description" class="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2">Description</label>
					</div>
					<div class="sm:col-span-2">
						<t-textarea :type="`text`" :value="event.description" v-model="event.description" class="w-full" />
					</div>
				</div>

				<!-- Information -->
				<div class="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
					<div>
						<label for="event-information" class="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2">Information</label>
					</div>
					<div class="sm:col-span-2">
						<t-textarea :type="`text`" :value="event.information" v-model="event.information" class="w-full" />
					</div>
				</div>

				<!-- Geo Location -->
				<div class="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
					<div>
						<label for="event-geo-location" class="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2">Geo Location</label>
					</div>
					<div class="sm:col-span-2">
						<div class="space-x-3 grid grid-cols-2">
							<div>
								<label for="latitude" class="block text-sm font-medium text-gray-700">Latitude</label>
								<div class="mt-1">
									<t-input :type="`number`" :value="event.latitude" v-model="event.latitude" class="w-full" />
								</div>
							</div>
							<div>
								<label for="longitude" class="block text-sm font-medium text-gray-700">Longitude</label>
								<div class="mt-1">
									<t-input :type="`number`" :value="event.longitude" v-model="event.longitude" class="w-full" />
								</div>
							</div>
						</div>
					</div>
				</div>

				<!-- Location -->
				<div class="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
					<div>
						<label for="event-location" class="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2">Location / Place name</label>
					</div>
					<div class="sm:col-span-2">
						<t-input :type="`text`" :value="event.location" v-model="event.location" class="w-full" />
					</div>
				</div>

				<!-- Date -->
				<div class="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
					<div>
						<label for="event-date" class="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2">Date</label>
					</div>
					<div class="sm:col-span-2">
						<div class="space-x-3 grid grid-cols-2">
							<div>
								<label for="start_time" class="block text-sm font-medium text-gray-700">Start</label>
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
							<div>
								<label for="end_time" class="block text-sm font-medium text-gray-700">End</label>
								<div class="mt-1">
									<date-picker
										class="w-full-important"
										v-model:value="event.end_time"
										type="datetime"
										format="YYYY-MM-DD HH:mm:ss"
										value-type="YYYY-MM-DD HH:mm:ss">
									</date-picker>
								</div>
							</div>
						</div>
					</div>
				</div>

				<!-- Status -->
				<div class="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
					<div>
						<label class="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2">Status</label>
					</div>
					<div class="sm:col-span-2">
						<t-input :type="`text`" :value="event.status" v-model="event.status" class="w-full" />
					</div>
				</div>

				<!-- Privacy -->
				<fieldset>
					<div class="space-y-2 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:px-6 sm:py-5">
						<div>
							<legend class="text-sm font-medium text-gray-900">Privacy</legend>
						</div>
						<div class="space-y-5 sm:col-span-2">
							<div class="space-y-5 sm:mt-0">
								<t-radio-button
									:label="`Public access`"
									:sub-label="`Everyone with the link will see this event`"
									:value="`public`"
									:name="'inputType'"
									:id="`public-selected`"
									:selected-value="event.type"
									v-model="event.type"
								/>
								<t-radio-button
									:label="`Private`"
									:sub-label="`Only invited users can access this event`"
									:value="`private`"
									:name="'inputType'"
									:id="`private-selected`"
									:selected-value="event.type"
									v-model="event.type"
								/>
							</div>
<<<<<<< HEAD
=======
							<hr class="border-gray-200" />
							<div class="flex flex-col space-between space-y-4 sm:flex-row sm:items-center sm:space-between sm:space-y-0">
								<div class="flex-1">
									<a href="#" class="group flex items-center text-sm text-indigo-600 hover:text-indigo-900 font-medium space-x-2.5">
										<LinkIcon class="h-5 w-5 text-indigo-500 group-hover:text-indigo-900" aria-hidden="true" />
										<span>
										Copy link
										</span>
									</a>
								</div>
								<div>
									<a href="#" class="group flex items-center text-sm text-gray-500 hover:text-gray-900 space-x-2.5">
										<QuestionMarkCircleIcon class="h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
										<span>
										Learn more about sharing
										</span>
									</a>
								</div>
							</div>
>>>>>>> 3775ee6f1f4e34f8147215b8375cd7964e1048f4
						</div>
					</div>
				</fieldset>

				<!-- Paid -->
				<div class="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
					<div>
						<label for="event-date" class="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2">Paid</label>
					</div>
					<div class="sm:col-span-2 flex items-center">
						<div>
							<t-checkbox
								:label="`Paid`"
								:sub-label="`This is paid event`"
								:value="!!event.is_paid"
								v-model="event.is_paid"
							/>
						</div>
					</div>
				</div>

				<!-- Published -->
				<div class="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
					<div>
						<label for="event-date" class="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2">Published</label>
					</div>
					<div class="sm:col-span-2 flex items-center">
						<div>
							<t-checkbox
								:label="`Published`"
								:sub-label="`Publish this event`"
								:value="!!event.is_published"
								v-model="event.is_published"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Action buttons -->
		<div class="flex-shrink-0 px-4 border-t border-gray-200 py-5 sm:px-6">
			<div class="space-x-3 flex justify-end">
				<t-button :color="`purple-solid`" :is-loading="isSaving" :is-disabled="isSaving" @click="submit">
					{{ isEdit ? 'Update Event' : 'Create Event' }}
				</t-button>
				<t-button :color="`default`" :is-disabled="isSaving" @click="close">
					Cancel
				</t-button>
			</div>
		</div>
	</form>
</slide-over>

</template>

<script>
import { ref } from "vue";
import { EVENT_DEFAULT } from '@/databags/event';
import eventApi from '@/api/event';

import { XIcon } from '@heroicons/vue/outline';
import { LinkIcon, PlusSmIcon, QuestionMarkCircleIcon } from '@heroicons/vue/solid';
import SlideOver from '@/components/global/SlideOver.vue';
import TButton from '@/components/global/Button.vue';
import TInput from '@/components/form/Input.vue';
import TTextarea from '@/components/form/Textarea.vue';
import TCheckbox from '@/components/form/Checkbox.vue';
import TRadioButton from '@/components/form/RadioButton.vue';
import DatePicker from 'vue-datepicker-next';
import 'vue-datepicker-next/index.css';

export default {
	components: {
		LinkIcon,
		PlusSmIcon,
		QuestionMarkCircleIcon,
		XIcon,
		SlideOver,
		TButton,
		TInput,
		TCheckbox,
		TTextarea,
		TRadioButton,
		DatePicker,
	},
	props: {
		isShow: {
			type: Boolean,
			default: () => false,
		},
		item: {
			type: Object,
			default: () => null,
		},
	},
	data() {
		return {
			event: this.__duplicateVar(EVENT_DEFAULT),
			isSaving: false,
		}
	},
	setup() {
		const dateNow = ref(new Date());
		return {
			dateNow,
		};
	},
	watch: {
		isShow() {
			if (!this.isShow) {
				this.resetForm();
			}
		},
		item() {
			this.setData();
		},
	},
	computed: {
		isEdit() {
			return this.item && this.item.id;
		},
		params() {
			const params = this.__duplicateVar(this.event);
			params.settings = typeof this.event.settings !== 'string' ? JSON.stringify(this.event.settings) : JSON.stringify({});
			params.custom_attendees = typeof this.event.custom_attendees !== 'string' ? JSON.stringify(this.event.custom_attendees) : JSON.stringify([]);
			return params;
		}
	},
	methods: {
		close() {
			this.$emit('onClose');
		},
		setData() {
			if (this.item) {
				this.event = this.__duplicateVar(this.item);
			}
		},
		resetForm() {
			this.event = this.__duplicateVar(EVENT_DEFAULT);
		},
		submit() {
			if (this.isEdit) this.update();
			else this.save();
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
			};
			const errorCallback = (error) => {
				const message = error.response.data.message;
				this.__showNotif('error', 'Error', message);
				this.isSaving = false;
			};
			eventApi.create(this.params, callback, errorCallback);
		},
	},
}
</script>