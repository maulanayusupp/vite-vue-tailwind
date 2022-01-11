<template>
<slide-over :is-show="isShow" :width-class="`max-w-lg`">
	<div class="h-full flex flex-col bg-white shadow-xl overflow-y-auto">
		<div class="flex-1">
			<!-- Header -->
			<div class="px-4 py-6 bg-gray-50 sm:px-6">
				<div class="flex items-start justify-between space-x-3">
					<div class="space-y-1">
						<div class="text-lg font-medium text-gray-900">
							{{ isEdit ? 'Update Changelog' : 'Create Changelog' }}
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
					<!-- Title -->
					<div>
						<label class="block text-sm font-medium text-gray-700">Title</label>
						<div class="mt-1">
							<t-input :type="`text`" :value="changelog.title" v-model="changelog.title" class="w-full" />
						</div>
					</div>

					<!-- Content -->
					<div>
						<label for="content" class="block text-sm font-medium text-gray-700">Content</label>
						<div class="mt-1">
							<!-- <t-textarea :type="`text`" :value="changelog.content" v-model="changelog.content" class="w-full" /> -->
							<tiptap v-model="changelog.content" />
						</div>
					</div>

					<!-- Types -->
					<div>
						<label for="type" class="block text-sm font-medium text-gray-700">Type</label>
						<div class="mt-1">
							<VueMultiselect
								v-model="changelog.type"
								:options="typeOptions"
								:multiple="false"
								:close-on-select="true"
								placeholder="Select an option"
								label="name"
								track-by="id">
							</VueMultiselect>
						</div>
					</div>

					<!-- Start - End -->
					<div class="sm:col-span-2">
						<div class="space-x-3 grid grid-cols-2">
							<div>
								<label for="start_time" class="block text-sm font-medium text-gray-700">Start</label>
								<div class="mt-1">
									<date-picker
										class="w-full-important"
										v-model:value="changelog.start_date"
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
										v-model:value="changelog.end_date"
										type="datetime"
										format="YYYY-MM-DD HH:mm:ss"
										value-type="YYYY-MM-DD HH:mm:ss">
									</date-picker>
								</div>
							</div>
						</div>
					</div>

					<!-- Is Published -->
					<div>
						<t-checkbox
							:label="`Published`"
							:sub-label="``"
							:value="!!changelog.is_published"
							v-model="changelog.is_published"
						/>
					</div>
				</form>
			</div>
		</div>

		<!-- Action buttons -->
		<div class="flex-shrink-0 px-4 border-t border-gray-200 py-5 sm:px-6">
			<div class="space-x-3 flex justify-end">
				<t-button :color="`purple-solid`" :is-loading="isSaving" :is-disabled="isSaving || !isFormValid" @click="submit">
					{{ isEdit ? 'Update Changelog' : 'Create Changelog' }}
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
import { CHANGELOG_DEFAULT, TYPE_CHANGELOGS } from '@/databags/changelog';
import changelogApi from '@/api/changelog';
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
			changelog: this.__duplicateVar(CHANGELOG_DEFAULT),
			typeChangelogs: this.__duplicateVar(TYPE_CHANGELOGS),
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
		typeValue() {
			return this.changelog.type ? this.changelog.type.id : null;
		},
		eventValues() {
			return this.changelog.event_id ? this.changelog.event_id.id : null;
		},
		params() {
			const params = {
				title: this.changelog.title,
				content: this.changelog.content,
				type: this.typeValue,
				start_date: this.changelog.start_date,
				end_date: this.changelog.end_date,
				is_published: this.changelog.is_published,
			};
			return params;
		},

		isFormValid() {
			return (
				this.changelog.title
				&& this.changelog.content
				&& this.changelog.type
				// && this.changelog.start_date
				// && this.changelog.end_date
			);
		},
		typeOptions() {
			const items = this.typeChangelogs.filter(curr => curr.id !== 'all');
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
				this.changelog = this.__duplicateVar(this.item);
				if (this.changelog.start_date) this.changelog.start_date = this.__dateTimeFormatISO(this.changelog.start_date);
				if (this.changelog.end_date) this.changelog.end_date = this.__dateTimeFormatISO(this.changelog.end_date);

				// Type
				const type = this.typeChangelogs.find(curr => curr.id === this.changelog.type);
				this.changelog.type = type;
			}
		},
		resetForm() {
			this.changelog = this.__duplicateVar(CHANGELOG_DEFAULT);
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
				this.__showNotif('success', 'Changelog', message);
			};
			const errorCallback = (error) => {
				const message = error.response.data.message;
				this.__showNotif('error', 'Error', message);
				this.isSaving = false;
			};
			changelogApi.update(this.changelog.id, params, callback, errorCallback);
		},
		save() {
			this.isSaving = true;
			const callback = (response) => {
				const item = response.data;
				this.$emit('onCreate', item);
				this.isSaving = false;

				const message = response.message;
				this.__showNotif('success', 'Changelog', message);
			};
			const errorCallback = (error) => {
				const message = error.response.data.message;
				this.__showNotif('error', 'Error', message);
				this.isSaving = false;
			};
			changelogApi.create(this.params, callback, errorCallback);
		},
	},
}
</script>