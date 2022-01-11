<template>
<slide-over :is-show="isShow" :width-class="`max-w-3xl`">
	<div class="h-full flex flex-col bg-white shadow-xl overflow-y-auto">
		<div class="flex-1">
			<!-- Header -->
			<div class="px-4 py-6 bg-gray-50 sm:px-6">
				<div class="flex items-start justify-between space-x-3">
					<div class="space-y-1">
						<div class="text-lg font-medium text-gray-900">
							{{ isEdit ? 'Update Announcement' : 'Create Announcement' }}
						</div>
					</div>
					<div class="h-7 flex items-center">
						<button type="button" class="text-gray-400 hover:text-gray-500" @click="close()">
							<span class="sr-only">Close panel</span>
							<XIcon class="h-6 w-6" aria-hidden="true" />
						</button>
					</div>
				</div>
			</div>

			<!-- Body -->
			<div class="px-4 py-6">
				<form @submit.prevent="submit" class="space-y-3">
					<div>
						<label for="announcement" class="block text-sm font-medium text-gray-700">Announcement</label>
						<div class="mt-1">
							<t-input :type="`text`" :value="announcement.title" v-model="announcement.title" class="w-full" />
						</div>
					</div>
					
					<div>
						<label for="event_id" class="block text-sm font-medium text-gray-700">Event</label>
							<div class="mt-1">
								<VueMultiselect
									v-model="announcement.event_id"
									:options="events"
									:multiple="false"
									:close-on-select="true"
									placeholder="Select an option"
									label="name"
									track-by="id">
								</VueMultiselect>
							</div>
					</div>

					<div>
						<label for="type" class="block text-sm font-medium text-gray-700">Type</label>
							<div class="mt-1">
								<VueMultiselect
									v-model="announcement.type"
									:options="typeAnnouncementOptions"
									:multiple="false"
									:close-on-select="true"
									placeholder="Select an option"
									label="name"
									track-by="id">
								</VueMultiselect>
							</div>
					</div>

					<div>
						<label for="content" class="block text-sm font-medium text-gray-700">Content</label>
						<div class="mt-1">
							<!-- <t-textarea :type="`text`" :value="announcement.content" v-model="announcement.content" class="w-full" /> -->
							<tiptap v-model="announcement.content" />
						</div>
					</div>

					<div class="sm:col-span-2">
						<div class="space-x-3 grid grid-cols-2">
							<div>
								<label for="start_time" class="block text-sm font-medium text-gray-700">Start</label>
								<div class="mt-1">
									<date-picker
										class="w-full-important"
										v-model:value="announcement.start_date"
										type="datetime"
										format="YYYY-MM-DD HH:mm:ss"
										value-type="YYYY-MM-DD HH:mm:ss">
									</date-picker>
								</div>
							</div>
							<div>
								<label for="end_date" class="block text-sm font-medium text-gray-700">End</label>
								<div class="mt-1">
									<date-picker
										class="w-full-important"
										v-model:value="announcement.end_date"
										type="datetime"
										format="YYYY-MM-DD HH:mm:ss"
										value-type="YYYY-MM-DD HH:mm:ss">
									</date-picker>
								</div>
							</div>
						</div>
					</div>


					<div>
						<t-checkbox
							:label="`Published`"
							:sub-label="``"
							:value="announcement.is_published"
							v-model="announcement.is_published"
						/>
					</div>
				</form>
			</div>
		</div>

		<!-- Action buttons -->
		<div class="flex-shrink-0 px-4 border-t border-gray-200 py-5 sm:px-6">
			<div class="space-x-3 flex justify-end">
				<t-button :color="`purple-solid`" :is-loading="isSaving" :is-disabled="isSaving || !isFormValid" @click="submit">
					{{ isEdit ? 'Update Announcement' : 'Create Announcement' }}
				</t-button>
				<t-button :color="`default`" :is-disabled="isSaving" @click="close">
					Cancel
				</t-button>
			</div>
		</div>
	</div>
</slide-over>
</template>

<script>
import { ANNOUNCEMENT_DEFAULT, TYPE_ANNOUNCEMENTS } from '@/databags/announcement';
import announcementApi from '@/api/announcement';
import VueMultiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.css';

import { XIcon } from '@heroicons/vue/outline';
import { DotsVerticalIcon } from '@heroicons/vue/solid';
import SlideOver from '@/components/global/SlideOver.vue';
import TButton from '@/components/global/Button.vue';
import TInput from '@/components/form/Input.vue';
import TTextarea from '@/components/form/Textarea.vue';
import TCheckbox from '@/components/form/Checkbox.vue';
import Tiptap from '@/components/form/Tiptap.vue';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';

import DatePicker from 'vue-datepicker-next';
import 'vue-datepicker-next/index.css';

export default {
	components: {
		DotsVerticalIcon,
		XIcon,
		SlideOver,
		Menu,
		MenuButton,
		MenuItem,
		MenuItems,
		TButton,
		TInput,
		VueMultiselect,
		TCheckbox,
		TTextarea,
		DatePicker,
		Tiptap,
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
		events: {
			type: Array,
			default: () => [],
		}
	},
	data() {
		return {
			isSaving: false,
			announcement: this.__duplicateVar(ANNOUNCEMENT_DEFAULT),
			typeAnnouncements: this.__duplicateVar(TYPE_ANNOUNCEMENTS),
		}
	},
	mounted() {
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
		typeAnnouncementValues() {
			return this.announcement.type ? this.announcement.type.id : 'announcement';
		},
		eventValues() {
			return this.announcement.event_id ? this.announcement.event_id.id : null;
		},
		params() {
			const params = {
				title: this.announcement.title,
				event_id: this.eventValues,
				content: this.announcement.content,
				type: this.typeAnnouncementValues,
				file_path: null,
				timezone: 'Asia/Jakarta',
				end_date: this.announcement.end_date,
				start_date: this.announcement.start_date,
				is_published: this.announcement.is_published,
			};
			return params;
		},

		isFormValid() {
			return (
				this.announcement.title
				&& this.announcement.start_date
				&& this.announcement.end_date
				&& this.announcement.type
			);
		},
		typeAnnouncementOptions() {
			const items = this.typeAnnouncements.filter(curr => curr.id !== 'all');
			return items;
		},
	},
	created() {},
	methods: {
		close() {
			this.$emit('onClose');
		},
		setData() {
			if (this.item) {
				this.announcement = this.__duplicateVar(this.item);
<<<<<<< HEAD
=======
				if (this.announcement.start_date) this.announcement.start_date = this.__dateTimeFormatISO(this.announcement.start_date);
				if (this.announcement.end_date) this.announcement.end_date = this.__dateTimeFormatISO(this.announcement.end_date);
>>>>>>> c673ba5 (Update libraries and other functionalities)

				// Type
				const type = this.typeAnnouncements.find(curr => curr.id === this.announcement.type);
				this.announcement.type = type;

				// Event Id
				const eventId = this.events.find(curr => curr.id === this.announcement.event_id);
				this.announcement.event_id = eventId;
			}
		},
		resetForm() {
			this.announcement = this.__duplicateVar(ANNOUNCEMENT_DEFAULT);
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
				this.__showNotif('success', 'Announcement', message);
			};
			const errorCallback = (error) => {
				const message = error.response.data.message;
				this.__showNotif('error', 'Error', message);
				this.isSaving = false;
			};
			announcementApi.update(this.announcement.id, params, callback, errorCallback);
		},
		save() {
			this.isSaving = true;
			const callback = (response) => {
				const item = response.data;
				this.$emit('onCreate', item);
				this.isSaving = false;

				const message = response.message;
				this.__showNotif('success', 'Announcement', message);
			};
			const errorCallback = (error) => {
				const message = error.response.data.message;
				this.__showNotif('error', 'Error', message);
				this.isSaving = false;
			};
			announcementApi.create(this.params, callback, errorCallback);
		},
	},
}
</script>