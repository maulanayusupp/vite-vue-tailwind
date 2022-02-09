<template>
<slide-over :is-show="isShow" :width-class="`max-w-lg`">
	<div class="h-full flex flex-col bg-white shadow-xl overflow-y-auto">
		<div class="flex-1">
			<!-- Header -->
			<div class="px-4 py-6 bg-gray-50 sm:px-6">
				<div class="flex items-start justify-between space-x-3">
					<div class="space-y-1">
						<div class="text-lg font-medium text-gray-900">
							{{ isEdit ? 'Update Group' : 'Create Group' }}
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
							<t-input :type="`text`" :value="group.name" v-model="group.name" class="w-full" />
						</div>
					</div>
				</form>
			</div>
		</div>

		<!-- Action buttons -->
		<div class="flex-shrink-0 px-4 border-t border-gray-200 py-5 sm:px-6">
			<div class="space-x-3 flex justify-end">
				<t-button :color="`purple-solid`" :is-loading="isSaving" :is-disabled="isSaving || !isFormValid" @click="submit">
					{{ isEdit ? 'Update Group' : 'Create Group' }}
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
import { GROUP_DEFAULT } from '@/databags/group';
import groupApi from '@/api/group';

import VueMultiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.css';

import { XIcon } from '@heroicons/vue/outline';
import { DotsVerticalIcon } from '@heroicons/vue/solid';
import SlideOver from '@/components/global/SlideOver.vue';
import TButton from '@/components/global/Button.vue';
import TInput from '@/components/form/Input.vue';
import TCheckbox from '@/components/form/Checkbox.vue';

export default {
	components: {
		DotsVerticalIcon,
		XIcon,
		SlideOver,
		TButton,
		TInput,
		VueMultiselect,
		TCheckbox,
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
			group: this.__duplicateVar(GROUP_DEFAULT),
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
				name: this.group.name,
			};
			return params;
		},
		isFormValid() {
			return (
				this.group.name
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
				this.group = this.__duplicateVar(this.item);
			}
		},
		resetForm() {
			this.group = this.__duplicateVar(GROUP_DEFAULT);
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
				this.__showNotif('success', 'Group', message);
			};
			const errorCallback = (error) => {
				const message = error.response.data.message;
				this.__showNotif('error', 'Error', message);
				this.isSaving = false;
			};
			groupApi.update(this.group.id, params, callback, errorCallback);
		},
		save() {
			const params = this.params;
			this.isSaving = true;
			const callback = (response) => {
				const item = response.data;
				this.$emit('onCreate', item);
				this.isSaving = false;

				const message = response.message;
				this.__showNotif('success', 'Group', message);
			};
			const errorCallback = (error) => {
				const message = error.response.data.message;
				this.__showNotif('error', 'Error', message);
				this.isSaving = false;
			};
			groupApi.create(this.params, callback, errorCallback);
		},
	},
}
</script>