<template>
<slide-over :is-show="isShow" :width-class="`max-w-lg`">
	<div class="h-full flex flex-col bg-white shadow-xl overflow-y-auto">
		<div class="flex-1">
			<!-- Header -->
			<div class="px-4 py-6 bg-gray-50 sm:px-6">
				<div class="flex items-start justify-between space-x-3">
					<div class="space-y-1">
						<div class="text-lg font-medium text-gray-900">
							{{ isEdit ? 'Update Category' : 'Create Category' }}
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
						<label for="category" class="block text-sm font-medium text-gray-700">Category</label>
						<div class="mt-1">
							<t-input :type="`text`" :value="category.name" v-model="category.name" class="w-full" />
						</div>
					</div>

					<div>
						<label for="parent_id" class="block text-sm font-medium text-gray-700">Parent Category</label>
							<div class="mt-1">
								<VueMultiselect
									v-model="category.parent_id"
									:options="filteredCategories"
									:multiple="false"
									:close-on-select="true"
									placeholder="Select an option"
									label="name"
									track-by="id">
								</VueMultiselect>
							</div>
					</div>

					<!-- <div>
						<label for="type" class="block text-sm font-medium text-gray-700">Type</label>
							<div class="mt-1">
								<VueMultiselect
									v-model="category.type"
									:options="typeCategories"
									:multiple="false"
									:close-on-select="true"
									placeholder="Select an option"
									label="name"
									track-by="id">
								</VueMultiselect>
							</div>
					</div> -->

					<div>
						<label for="icon" class="block text-sm font-medium text-gray-700">Icon</label>
						<div class="mt-1">
							<t-input :type="`text`" :value="category.icon" v-model="category.icon" class="w-full" />
						</div>
					</div>

					<div>
						<label for="background_color" class="block text-sm font-medium text-gray-700">Bckground Color</label>
						<div class="mt-1">
							<t-input :type="`text`" :value="category.background_color" v-model="category.background_color" class="w-full" />
						</div>
					</div>

					<div>
						<label for="description" class="block text-sm font-medium text-gray-700">Description</label>
						<div class="mt-1">
							<t-input :type="`text`" :value="category.description" v-model="category.description" class="w-full" />
						</div>
					</div>

				</form>
			</div>
		</div>

		<!-- Action buttons -->
		<div class="flex-shrink-0 px-4 border-t border-gray-200 py-5 sm:px-6">
			<div class="space-x-3 flex justify-end">
				<t-button :color="`purple-solid`" :is-loading="isSaving" :is-disabled="isSaving || !isFormValid" @click="submit">
					{{ isEdit ? 'Update Category' : 'Create Category' }}
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
import { CATEGORY_DEFAULT, TYPE_CATEGORIES } from '@/databags/category';
import categoryApi from '@/api/category';
import VueMultiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.css';

import { XIcon } from '@heroicons/vue/outline';
import { DotsVerticalIcon } from '@heroicons/vue/solid';
import SlideOver from '@/components/global/SlideOver.vue';
import TButton from '@/components/global/Button.vue';
import TInput from '@/components/form/Input.vue';
import TTextarea from '@/components/form/Textarea.vue';
import TCheckbox from '@/components/form/Checkbox.vue';
import {
	Menu,
	MenuButton,
	MenuItem,
	MenuItems,
} from '@headlessui/vue';

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
		categories: {
			type: Array,
			default: () => [],
		}
	},
	data() {
		return {
			isSaving: false,
			category: this.__duplicateVar(CATEGORY_DEFAULT),
			typeCategories: this.__duplicateVar(TYPE_CATEGORIES),
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
		typeCategoryValues() {
			return this.category.type ? this.category.type.id : 'clothing';
		},
		parentValues() {
			return this.category.parent_id ? this.category.parent_id.id : null;
		},
		params() {
			const params = {
				name: this.category.name,
				type: this.typeCategoryValues,
				parent_id: this.parentValues,
				icon: this.category.icon,
				background_color: this.category.background_color,
				description: this.category.description || 'Description Category',
			};
			return params;
		},

		isFormValid() {
			return (
				this.category.name !== ''
				// && this.category.background_color
				// && this.category.icon
				
			);
		},
		filteredCategories() {
			return this.categories.filter(item => item.id !== this.category.id);
		},
	},
	created() {},
	methods: {
		close() {
			this.$emit('onClose');
		},
		setData() {
			if (this.item) {
				this.category = this.__duplicateVar(this.item);

				// Type
				const type = this.typeCategories.find(curr => curr.id === this.category.type);
				this.category.type = type || this.typeCategories[0];

				// parent Id
				const parent = this.categories.find(curr => curr.id === this.category.parent_id);
				this.category.parent_id = parent;
			}
		},
		resetForm() {
			this.category = this.__duplicateVar(CATEGORY_DEFAULT);
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
				this.__showNotif('success', 'Category', message);
			};
			const errorCallback = (error) => {
				const message = error.response.data.message;
				this.__showNotif('error', 'Error', message);
				this.isSaving = false;
			};
			categoryApi.update(this.category.id, params, callback, errorCallback);
		},
		save() {
			this.isSaving = true;
			const callback = (response) => {
				const item = response.data;
				this.$emit('onCreate', item);
				this.isSaving = false;

				const message = response.message;
				this.__showNotif('success', 'Category', message);
			};
			const errorCallback = (error) => {
				const message = error.response.data.message;
				this.__showNotif('error', 'Error', message);
				this.isSaving = false;
			};
			categoryApi.create(this.params, callback, errorCallback);
		},
	},
}
</script>