<template>
<slide-over :is-show="isShow" :width-class="`max-w-lg`">
	<div class="h-full flex flex-col bg-white shadow-xl overflow-y-auto">
		<div class="flex-1">
			<!-- Header -->
			<div class="px-4 py-6 bg-gray-50 sm:px-6">
				<div class="flex items-start justify-between space-x-3">
					<div class="space-y-1">
						<div class="text-lg font-medium text-gray-900">
							{{ isEdit ? 'Update Contact' : 'Create Contact' }}
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
						<label for="name" class="block text-sm font-medium text-gray-700">Name</label>
						<div class="mt-1">
							<t-input :type="`text`" :value="contact.name" v-model="contact.name" class="w-full" />
						</div>
					</div>

					<div>
						<label for="job_title" class="block text-sm font-medium text-gray-700">Job Title</label>
						<div class="mt-1">
							<t-input :type="`text`" :value="contact.job_title" v-model="contact.job_title" class="w-full" />
						</div>
					</div>

					<div>
						<label for="phone_number" class="block text-sm font-medium text-gray-700">Phone Number</label>
						<div class="mt-1">
							<t-input :type="`text`" :value="contact.phone_number" v-model="contact.phone_number" class="w-full" />
						</div>
					</div>

					<div>
						<label for="email" class="block text-sm font-medium text-gray-700">Email</label>
						<div class="mt-1">
							<t-input :type="`email`" :value="contact.email" v-model="contact.email" class="w-full" />
						</div>
					</div>
					
					<div>
						<label for="website_url" class="block text-sm font-medium text-gray-700">Website URL</label>
						<div class="mt-1">
							<t-input :type="`website_url`" :value="contact.website_url" v-model="contact.website_url" class="w-full" />
						</div>
					</div>
					
					<div>
						<label for="description" class="block text-sm font-medium text-gray-700">Description</label>
						<div class="mt-1">
							<t-textarea :type="`text`" :value="contact.description" v-model="contact.description" class="w-full" />
						</div>
					</div>
				</form>
			</div>
		</div>

		<!-- Action buttons -->
		<div class="flex-shrink-0 px-4 border-t border-gray-200 py-5 sm:px-6">
			<div class="space-x-3 flex justify-end">
				<t-button :color="`purple-solid`" :is-loading="isSaving" :is-disabled="isSaving || !isFormValid" @click="submit">
					{{ isEdit ? 'Update Contact' : 'Create Contact' }}
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
import { CONTACT_DEFAULT } from '@/databags/contact';
import contactApi from '@/api/contact';

import VueMultiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.css';

import { XIcon } from '@heroicons/vue/outline';
import { DotsVerticalIcon } from '@heroicons/vue/solid';
import SlideOver from '@/components/global/SlideOver.vue';
import TButton from '@/components/global/Button.vue';
import TInput from '@/components/form/Input.vue';
import TCheckbox from '@/components/form/Checkbox.vue';
import TTextarea from '@/components/form/Textarea.vue';

export default {
	components: {
		DotsVerticalIcon,
		XIcon,
		SlideOver,
		TButton,
		TInput,
		VueMultiselect,
		TCheckbox,
		TTextarea,
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
			isSaving: false,
			contact: this.__duplicateVar(CONTACT_DEFAULT),
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
		params() {
			const params = {
				group_id: this.contact.group_id,
				name: this.contact.name,
				job_title: this.contact.job_title,
				phone_number: this.contact.phone_number,
				email: this.contact.email,
				website_url: this.contact.website_url,
				description: this.contact.description,
				avatar: this.contact.avatar,
				type: this.contact.type,
			};
			return params;
		},
		isFormValid() {
			return (
				this.contact.name
			);
		},
	},
	methods: {
		close() {
			this.$emit('onClose');
			this.resetForm();
		},
		setData() {
			if (this.item) {
				this.contact = this.__duplicateVar(this.item);
			}
		},
		resetForm() {
			this.contact = this.__duplicateVar(CONTACT_DEFAULT);
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
				this.__showNotif('success', 'Contact', message);
			};
			const errorCallback = (error) => {
				const message = error.response.data.message;
				this.__showNotif('error', 'Error', message);
				this.isSaving = false;
			};
			contactApi.update(this.contact.id, params, callback, errorCallback);
		},
		save() {
			const params = this.params;
			this.isSaving = true;
			const callback = (response) => {
				const item = response.data;
				this.$emit('onCreate', item);
				this.isSaving = false;

				const message = response.message;
				this.__showNotif('success', 'Contact', message);
			};
			const errorCallback = (error) => {
				const message = error.response.data.message;
				this.__showNotif('error', 'Error', message);
				this.isSaving = false;
			};
			contactApi.create(params, callback, errorCallback);
		},
	},
}
</script>