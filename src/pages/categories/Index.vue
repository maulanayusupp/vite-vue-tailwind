<template>
<div class="relative min-h-screen">

	<!-- Page heading -->
	<header class="py-4 mt-6">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:flex xl:items-center xl:justify-between">
			<div class="flex-1 min-w-0">
				<h1 class="text-2xl font-semibold text-gray-900 sm:truncate">
					Categories
				</h1>
			</div>
			<div class="mt-5 flex xl:mt-0 xl:ml-4">
				<!-- Create -->
				<span class="">
					<t-button :color="`purple-solid`" class="" @click="showCreate">
						<PlusIcon class="-ml-1 mr-2 h-5 w-5 text-white" aria-hidden="true" />
						Create Category
					</t-button>
				</span>
			</div>
		</div>
	</header>

	<main class="pb-16">
		<div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
			<!-- Filter -->
			<div class="flex justify-end mt-4 mb-4">
				<t-input :type="`text`" :value="keyword" v-model="keyword" :placeholder="`Search...`" />
			</div>
			<!-- <div class="px-4 sm:px-0">
				<div class="mb-4">
					<div class="sm:hidden">
						<label for="tabs" class="sr-only">Select a tab</label>
						<select
							v-model="selectedTab"
							id="tabs"
							name="tabs"
							class="mt-4 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md">
							<option v-for="tab in filterTabs" :key="tab.name" :value="tab.id">
								{{ tab.name }}
							</option>
						</select>
					</div>
					<div class="hidden sm:block">
						<div class="border-b border-gray-200">
							<div class="mt-2 -mb-px flex space-x-8" aria-label="Tabs">
								<div
									v-for="tab in filterTabs"
									:key="tab.name"
									:href="tab.href"
									:class="[tab.id === selectedTab ? 'border-purple-500 text-purple-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200', 'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm cursor-pointer']"
									@click="selectedTab = tab.id">
									{{ tab.name }}
									<span v-if="tab.count" :class="[tab.id === selectedTab ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-900', 'hidden ml-2 py-0.5 px-2.5 rounded-full text-xs font-medium md:inline-block']">{{ tab.count }}</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div> -->

			<!-- Empty Placeholder -->
			<empty-list
				:title="`No data available`"
				:sub-title="`There are no data available at the moment`"
				v-if="items.length === 0 && !isFetching"
			/>

			<!-- Loader -->
			<skeleton-page class="px-8" v-if="isFetching" />

			<!-- nested draggabble -->
			<nested
				:categories="items"
				@onUpdate="showEdit"
				@onRemove="showRemove"
				@onDragged="reOrder"
			/>

			<!-- Pagination -->
			<pagination
				:is-number-pages-enabled="true"
				:current-page="currentPage"
				:total-page="totalPage"
				@next="next"
				@previous="previous"
				@setPage="setPage"
				v-if="totalPage > 1"
			/>
		</div>
	</main>
</div>
<!-- Side Form -->
<side-form
	:is-show="isShowCreate"
	:item="selected"
	:categories="items"
	@onClose="closeCreate"
	@onCreate="onCreate"
	@onUpdate="onUpdate"
/>

<!-- Modal Remove -->
<t-modal
	:is-show="isShowRemove"
	@onClose="closeRemove">
	<div class="sm:flex sm:items-start">
		<div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
			<ExclamationIcon class="h-6 w-6 text-red-600" aria-hidden="true" />
		</div>
		<div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
			<div as="h3" class="text-lg leading-6 font-medium text-gray-900">
				Delete Announcement
			</div>
			<div class="mt-2">
				<p class="text-sm text-gray-500">
					Are you sure you want to delete this Announcement? This data will be permanently removed from our servers forever.
					<span class="text-red-500 text-xs mt-2 block">This action cannot be undone.</span>
				</p>
			</div>
		</div>
	</div>
	<div class="mt-5 sm:mt-4 sm:ml-10 sm:pl-4 sm:flex space-x-2">
		<t-button :color="`red-solid`" :is-loading="isDeleting" :is-disabled="isDeleting" @click="approveRemove">
			Yes, Please Remove
		</t-button>
		<t-button :color="`default`" :is-disabled="isDeleting" @click="closeRemove">
			Cancel
		</t-button>
	</div>
</t-modal>
</template>

<script>
// API
import categoryApi from '@/api/category';
import { delay } from '@/libraries/helper';

// Statics
import { TYPE_CATEGORIES } from '@/databags/category';

// Components
import {
	Listbox,
	ListboxButton,
	ListboxLabel,
	ListboxOption,
	ListboxOptions,
	Menu,
	MenuButton,
	MenuItem,
	MenuItems,
} from '@headlessui/vue'

import {
	ArrowNarrowLeftIcon,
	ArrowNarrowRightIcon,
	BriefcaseIcon,
	CalendarIcon,
	CheckCircleIcon,
	CheckIcon,
	ChevronDownIcon,
	ChevronRightIcon,
	CurrencyDollarIcon,
	LocationMarkerIcon,
	MailIcon,
	PlusIcon,
	SearchIcon,
	DotsVerticalIcon,
	ExclamationIcon,
} from '@heroicons/vue/solid'

import Pagination from '@/components/global/Pagination.vue';
import TButton from '@/components/global/Button.vue';
import TInput from '@/components/form/Input.vue';
import SkeletonPage from '@/components/loader/SkeletonPage.vue';
import Badge from '@/components/global/Badge.vue';
import EmptyList from '@/components/global/EmptyList.vue';
import TModal from '@/components/global/Modal.vue';
import SideForm from '@/components/categories/SideForm.vue';
import Nested from '@/components/categories/Nested.vue';

export default {
	components: {
		Listbox,
		ListboxButton,
		ListboxLabel,
		ListboxOption,
		ListboxOptions,
		Menu,
		MenuButton,
		MenuItem,
		MenuItems,
		ArrowNarrowLeftIcon,
		ArrowNarrowRightIcon,
		BriefcaseIcon,
		CalendarIcon,
		CheckCircleIcon,
		CheckIcon,
		ChevronDownIcon,
		ChevronRightIcon,
		CurrencyDollarIcon,
		LocationMarkerIcon,
		MailIcon,
		PlusIcon,
		SearchIcon,
		DotsVerticalIcon,
		ExclamationIcon,
		Pagination,
		TButton,
		SkeletonPage,
		TInput,
		EmptyList,
		Badge,
		TModal,
		SideForm,
		Nested,
	},
	data() {
		return {
			// filterTabs: TYPE_CATEGORIES,
			isFetching: false,
			currentPage: 1,
			totalPage: 1,
			orderBy: 'order',
			sortBy: 'asc',
			limit: 99,
			keyword: '',
			items: [],
			selectedTab: 'all',
			selected: null,
			isShowCreate: false,
			isShowRemove: false,
			isDeleting: false,
			isShowDetails: false,
			events: [],
			isFetchingEvent: false,
			drag: false,
			isToggling: false,
		}
	},
	created() {
		this.fetchList();
	},
	mounted() {
	},
	beforeUnmount() {},
	methods: {
		fetchList(isReset = false) {
			if (isReset) {
				this.currentPage = 1;
				this.items = [];
			}
			this.isFetching = true;
			const params = {
				order_by: this.orderBy,
				sort_by: this.sortBy,
				limit: this.limit,
				page: this.currentPage,
			};
			if (this.keyword) params.keyword = this.keyword;
			if (this.selectedTab !== 'all') params.type = this.selectedTab;
			const callback = (response) => {
				const data = response.data;
				this.totalPage = response.last_page;
				this.items = data;
				this.isFetching = false;
			};
			const errorCallback = (error) => {
				const message = error.response.data.message;
				this.__showNotif('error', 'Error', message);
				this.isFetching = false;
			};
			categoryApi.getList(params, callback, errorCallback);
		},
		setPage(page) {
			this.currentPage = page;
		},
		previous() {
			if (this.currentPage > 1) this.currentPage--;
		},
		next() {
			if (this.currentPage < this.totalPage) this.currentPage++;
		},
		clearSelected() {
			// Clear after
			setTimeout(() => {
				this.selected = null;
			}, 1000);
		},
		showCreate() {
			this.selected = null;
			this.isShowCreate = true;
		},
		closeCreate() {
			this.isShowCreate = false;
			this.clearSelected();
		},
		onCreate(item) {
			// insert child category
			if (item && item.parent_id) {
				const itemIndex = this.items.findIndex(curr => curr.id === item.parent_id);
				if (itemIndex !== -1) this.items[itemIndex].subCategories.push(item);
			} else {
			// insert parent category
				this.items.push(item);
			}
			this.closeCreate();
		},
		showEdit(item) {
			this.selected = this.__duplicateVar(item);
			this.isShowCreate = true;
		},
		closeEdit() {
			this.isShowCreate = false;
			this.clearSelected();
		},
		onUpdate(item) {

			// update child category
			if (item && item.parent_id) {
				const itemIndex = this.items.findIndex(curr => curr.id === item.parent_id);
				const itemSubIndex = this.items[itemIndex].subCategories.findIndex(curr => curr.id === item.id);
				if (itemIndex !== -1 && itemSubIndex !== -1) {
					Object.assign(this.items[itemIndex].subCategories[itemSubIndex], item);
				} else {
					const index = this.items.findIndex(curr => curr.id === item.id);
					if (index !== 1) this.items.splice(index, 1);
					this.items[itemIndex].subCategories.push(item);
				}
			} else {
			// update parent category
				const itemIndex = this.items.findIndex(curr => curr.id === item.id);
				if (itemIndex !== -1) Object.assign(this.items[itemIndex], item);
			}
			this.closeEdit();
		},
		showRemove(item) {
			this.selected = this.__duplicateVar(item);
			this.isShowRemove = true;
		},
		closeRemove() {
			this.isShowRemove = false;
			this.clearSelected();
		},
		approveRemove() {
			// If no selected
			if (!this.selected) return;
			const selectedId = this.selected.id;
			this.isDeleting = true;
			const callback = (response) => {
				this.onRemove(selectedId);
				this.closeRemove();
				this.isDeleting = false;
			};
			const errorCallback = (error) => {
				const message = error.response.data.message;
				this.__showNotif('error', 'Error', message);
				this.isDeleting = false;
			};
			categoryApi.delete(selectedId, callback, errorCallback);
		},
		onRemove(selectedId) {
			// delete child category
			if (this.selected && this.selected.parent_id) {
				const index = this.items.findIndex(curr => curr.id === this.selected.parent_id);
				const subIndex = this.items[index].subCategories.findIndex(curr => curr.id === this.selected.id);
				if (index !== -1) this.items[index].subCategories.splice(subIndex, 1);
			} else {
			// delete parent category
				const index = this.items.findIndex(curr => curr.id === selectedId);
				if (index !== -1) this.items.splice(index, 1);
			}
		},
		reOrder(item) {
			const toOutsideParentId = item && item.added && item.added.element.parent_id;
			const toOutsideId = item && item.added && item.added.element.id;
			const findIndex = this.items.findIndex(curr => curr.id === toOutsideId);
			if (toOutsideParentId) {
				this.items[findIndex].parent_id = null;
				this.items[findIndex]['subCategories'] = [];
			}
			for (let index = 0; index < this.items.length; index++) {
				const element = this.items[index];
				if (element.subCategories && element.subCategories.length) {
					for (let subIndex = 0; subIndex < element.subCategories.length; subIndex++) {
						const subElement = element.subCategories[subIndex];
						subElement.parent_id = element.id;
						delete subElement.subCategories;
					}
				}
			}

			const categories = this.items.map(function(row) {
				let subCategories = [];
				if (row.subCategories && row.subCategories.length) {
					for (let index = 0; index < row.subCategories.length; index++) {
						const element = { id : row.subCategories[index].id, parent_id : row.subCategories[index].parent_id };
						subCategories.push(element);
					}
				}
				return { id : row.id, parent_id : null, sub_categories : subCategories }
			})
			const params = {
				categories: JSON.stringify(categories),
			};
			categoryApi.reorder(params);
		},
	},
	computed: {},
	watch: {
		currentPage() {
			this.fetchList();
		},
		selectedTab() {
			this.fetchList(true);
		},
		keyword() {
			delay(() => {
				this.fetchList(true);
			}, 500);
		},
	},
}
</script>