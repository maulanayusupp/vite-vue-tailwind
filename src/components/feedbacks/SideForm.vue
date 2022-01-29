<template>
<slide-over :is-show="isShow" :width-class="`max-w-lg`">
	<div class="h-full flex flex-col bg-white shadow-xl overflow-y-auto">
		<div class="flex-1">
			<!-- Header -->
			<div class="px-4 py-6 bg-gray-50 sm:px-6">
				<div class="flex items-start justify-between space-x-3">
					<div class="space-y-1">
						<div class="text-lg font-medium text-gray-900">
							{{ isEdit ? 'Update Feedback' : 'Create Feedback' }}
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
							<t-input :type="`text`" :value="feedback.title" v-model="feedback.title" class="w-full" />
						</div>
					</div>

					<!-- description -->
					<div>
						<label for="Description" class="block text-sm font-medium text-gray-700">description</label>
						<div class="mt-1">
							<!-- <t-textarea :type="`text`" :value="feedback.description" v-model="feedback.description" class="w-full" /> -->
							<tiptap v-model="feedback.description" />
						</div>
					</div>

					<!-- Types -->
					<div>
						<label for="type" class="block text-sm font-medium text-gray-700">Type</label>
						<div class="mt-1">
							<VueMultiselect
								v-model="feedback.type"
								:options="typeOptions"
								:multiple="false"
								:close-on-select="true"
								placeholder="Select an option"
								label="name"
								track-by="id">
							</VueMultiselect>
						</div>
					</div>

					<!-- Mood Level -->
					<div>
						<label for="type" class="block text-sm font-medium text-gray-700">Mood Level</label>
						<div class="mt-1">
							<VueMultiselect
								v-model="feedback.mood_level"
								:options="typeOptions"
								:multiple="false"
								:close-on-select="true"
								placeholder="Select an option"
								label="name"
								track-by="id">
							</VueMultiselect>
						</div>
					</div>

				</form>
			</div>
		</div>

		<!-- Action buttons -->
		<div class="flex-shrink-0 px-4 border-t border-gray-200 py-5 sm:px-6">
			<div class="space-x-3 flex justify-end">
				<t-button :color="`purple-solid`" :is-loading="isSaving" :is-disabled="isSaving || !isFormValid" @click="submit">
					{{ isEdit ? 'Update Feedback' : 'Create Feedback' }}
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
import { FEEDBACK_DEFAULT, TYPE_FEEDBACKS } from '@/databags/feedback';
import feedbackApi from '@/api/feedback';
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
			feedback: this.__duplicateVar(FEEDBACK_DEFAULT),
			feedbackTypes: this.__duplicateVar(TYPE_FEEDBACKS),
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
			return this.feedback.type ? this.feedback.type.id : null;
		},
		moodLevelValue() {
			return this.feedback.mood_level ? this.feedback.mood_level.id : null;
		},
		params() {
			const params = {
				title: this.feedback.title,
				description: this.feedback.description,
				type: this.typeValue,
				mood_level: this.moodLevelValue,
			};
			return params;
		},

		isFormValid() {
			return (
				this.feedback.title
				&& this.feedback.description
			);
		},
		typeOptions() {
			const items = this.feedbackTypes.filter(curr => curr.id !== 'all');
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
				this.feedback = this.__duplicateVar(this.item);

				// Type
				const type = this.feedbackTypes.find(curr => curr.id === this.feedback.type);
				this.feedback.type = type;

				// Type
				const moodLevel = this.feedbackTypes.find(curr => curr.id === this.feedback.mood_level);
				this.feedback.mood_level = moodLevel;
			}
		},
		resetForm() {
			this.feedback = this.__duplicateVar(FEEDBACK_DEFAULT);
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
				this.__showNotif('success', 'Feedback', message);
			};
			const errorCallback = (error) => {
				const message = error.response.data.message;
				this.__showNotif('error', 'Error', message);
				this.isSaving = false;
			};
			feedbackApi.update(this.feedback.id, params, callback, errorCallback);
		},
		save() {
			this.isSaving = true;
			const callback = (response) => {
				const item = response.data;
				this.$emit('onCreate', item);
				this.isSaving = false;

				const message = response.message;
				this.__showNotif('success', 'Feedback', message);
			};
			const errorCallback = (error) => {
				const message = error.response.data.message;
				this.__showNotif('error', 'Error', message);
				this.isSaving = false;
			};
			feedbackApi.create(this.params, callback, errorCallback);
		},
	},
}
</script>