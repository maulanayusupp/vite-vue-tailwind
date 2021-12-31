<template>
<div class="relative min-h-screen">

	<!-- Page heading -->
	<header class="bg-gray-50 py-6">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:flex xl:items-center xl:justify-between">
			<div class="flex-1 min-w-0">
				<h1 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
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
			<!-- List - Table -->
			<div class="flex flex-col" v-if="!isFetching && items.length > 0">
				<div class="-my-2 sm:-mx-6 lg:-mx-8">
					<div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
						<div class="shadow border-b border-gray-200 sm:rounded-lg">
						<table class="min-w-full divide-y divide-gray-200">
							<thead class="bg-gray-50">
							<tr>
								<th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Name
								</th>
								<th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
									Type
								</th>
								<th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
									Background Color
								</th>
								<th scope="col" class="relative px-6 py-3">
									<span class="sr-only">Edit</span>
								</th>
							</tr>
							</thead>
							<!-- parent category -->
							<draggable 
								v-model="items"
								tag="tbody"
								group="categories"
								@start="drag=true"
								@end="drag=false"
								item-key="id"
								class="bg-white divide-y divide-gray-200"
								@change="reOrder"
							>
								<template #item="{element}">
									<tr class="pointer" @click.stop="togglingParent(element)">
										<td class="px-6 py-4 whitespace-nowrap hidden sm:table-cell">
											<div class="flex items-center">
												<div class="flex-shrink-0 h-8 w-8">
													<img class="h-8 w-8 rounded-full group-hover:opacity-75" :src="element.icon" alt="" v-if="element.icon" />
													<img class="h-8 w-8 rounded-full group-hover:opacity-75" :src="`https://images.unsplash.com/photo-1563982277846-1299eec465d3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80`" alt="" v-else />
												</div>
												<div class="ml-2">
													<div class="text-sm font-medium text-gray-900">
														{{ element.name }}
													</div>
												</div>
											</div>
											<!-- sub category name -->
											<template v-if="element && element.subCategories && element.subCategories.length > 0">
												<sub-categories :subCategories="element.subCategories" :id="element.id" :toggling="isToggling" :field="'name'"></sub-categories>
											</template>
										</td>
										<td class="px-6 py-4 whitespace-nowrap hidden sm:table-cell">
											<p class="text-xs text-gray-500 pb-2">
												{{ element.type }}
											</p>
											<!-- sub category type -->
											<template v-if="element && element.subCategories && element.subCategories.length > 0">
												<sub-categories :subCategories="element.subCategories" :id="element.id" :toggling="isToggling" :field="'type'"></sub-categories>
											</template>
										</td>
										<td class="px-6 py-4 whitespace-nowrap hidden sm:table-cell">
											<p class="text-xs text-gray-500 pb-2">
												{{ element.background_color }}
											</p>
											<!-- sub category -->
											<template v-if="element && element.subCategories && element.subCategories.length > 0">
												<template v-if="element && element.subCategories && element.subCategories.length > 0">
												<sub-categories :subCategories="element.subCategories" :id="element.id" :toggling="isToggling" :field="'background_color'"></sub-categories>
											</template>
											</template>
										</td>
										<td class="px-6 py-4 pt-4 whitespace-nowrap text-sm font-medium">
											<!-- Dropdown Actions -->
											<Menu as="div" class="ml-3 relative flex justify-end">
												<div>
												<MenuButton class="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
													<DotsVerticalIcon class="h-5 w-5 text-gray-400 group-hover:text-gray-700" aria-hidden="true" />
												</MenuButton>
												</div>
												<transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
													<MenuItems class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
														<MenuItem v-slot="{ active }" @click="showEdit(element)">
															<a href="#" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">Edit</a>
														</MenuItem>
														<MenuItem v-slot="{ active }" @click="showRemove(element)">
															<a href="#" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-red-500']">Delete</a>
														</MenuItem>
													</MenuItems>
												</transition>
											</Menu>
											<!-- sub category -->
											<template v-if="element && element.subCategories && element.subCategories.length > 0">
												<sub-categories :subCategories="element.subCategories" :id="element.id" :toggling="isToggling" :field="'action'" @onUpdate="showEdit" @onRemove="showRemove"></sub-categories>
											</template>
										</td>
									</tr>
								</template>
							</draggable>
						</table>
						</div>
					</div>
				</div>
			</div>

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
import SubCategories from '@/components/categories/SubCategories.vue';
import draggable from 'vuedraggable';

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
		draggable,
		SubCategories,
	},
	data() {
		return {
			// filterTabs: TYPE_CATEGORIES,
			isFetching: false,
			currentPage: 1,
			totalPage: 1,
			orderBy: 'order',
			sortBy: 'asc',
			limit: 10,
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
	created() {},
	mounted() {
		this.fetchList();
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
				// set opened for new parent category
				for (let index = 0; index < this.items.length; index++) {
					const element = this.items[index];
					const status = localStorage.getItem(`category_${element.id}`);
					if (!status && !element.parent_id) {
						localStorage.setItem(`category_${element.id}`, 'opened');
					}
				}
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
				localStorage.setItem(`category_${item.id}`, 'opened');
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
			const itemIndex = this.items.findIndex(curr => curr.id === item.id);

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
				localStorage.removeItem(`category_${selectedId}`);
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
			const index = this.items.findIndex(curr => curr.id === selectedId);

			// delete child category
			if (this.selected && this.selected.parent_id) {
				const index = this.items.findIndex(curr => curr.id === this.selected.parent_id.id);
				const subIndex = this.items[index].subCategories.findIndex(curr => curr.id === this.selected.id);
				if (index !== -1) this.items[index].subCategories.splice(subIndex, 1);
			} else {
			// delete parent category
				if (index !== 1) this.items.splice(index, 1);
			}
		},
		reOrder() {
			const categories = this.items.map(function(row) {
				return { id : row.id, sub_categories : row.subCategories }
			})
			const params = {
				categories: JSON.stringify(categories),
			};
			categoryApi.reorder(params);
		},
		togglingParent(item) {
			const status = localStorage.getItem(`category_${item.id}`);
			if (status === 'opened') {
				localStorage.setItem(`category_${item.id}`, 'closed');
			} else {
				localStorage.setItem(`category_${item.id}`, 'opened');
			}
			this.isToggling = !this.isToggling;
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