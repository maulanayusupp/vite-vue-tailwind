<template>
<div class="relative min-h-screen">

	<!-- Page heading -->
<<<<<<< HEAD
	<header class="py-4 mt-6">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:flex xl:items-center xl:justify-between">
			<div class="flex-1 min-w-0">
				<h1 class="text-2xl font-semibold text-gray-900 sm:truncate">
=======
	<header class="bg-gray-50 py-6">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:flex xl:items-center xl:justify-between">
			<div class="flex-1 min-w-0">
				<h1 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
>>>>>>> 3775ee6f1f4e34f8147215b8375cd7964e1048f4
					Feedbacks
				</h1>
			</div>
			<div class="mt-5 flex xl:mt-0 xl:ml-4">
				<!-- Create -->
				<span class="">
					<t-button :color="`purple-solid`" class="" @click="showCreate">
						<PlusIcon class="-ml-1 mr-2 h-5 w-5 text-white" aria-hidden="true" />
						Create Feedback
					</t-button>
				</span>
			</div>
		</div>
	</header>

	<main class="pb-16">
		<div class="max-w-7xl mx-auto sm:px-6 lg:px-8">

			<div class="px-4 sm:px-0">
				<!-- Filter -->
				<div class="flex justify-end mt-4 mb-4">
					<t-input :type="`text`" :value="keyword" v-model="keyword" :placeholder="`Search...`" />
				</div>
			</div>

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
									Title
								</th>
								<th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
									Created
								</th>
								<th scope="col" class="relative px-6 py-3" width="5%">
									<span class="sr-only">Edit</span>
								</th>
							</tr>
							</thead>
							<tbody class="bg-white divide-y divide-gray-200">
							<tr v-for="item in items" :key="item.id">
								<td class="px-6 py-4 whitespace-nowrap">
									<div class="flex items-center">
										<div class="">
											<div class="text-sm font-medium text-gray-900">
												{{ item.title }}
											</div>
										</div>
									</div>
								</td>
								<td class="px-6 py-4 whitespace-nowrap hidden sm:table-cell">
									<p class="text-xs text-gray-500" v-if="item.created_at">
										<time :datetime="item.created_at">{{ __dateTimeFormat(item.created_at) }}</time>
									</p>
								</td>
								<td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
									<!-- Dropdown Actions -->
									<Menu as="div" class="ml-3 relative">
										<div>
										<MenuButton class="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
											<DotsVerticalIcon class="h-5 w-5 text-gray-400 group-hover:text-gray-700" aria-hidden="true" />
										</MenuButton>
										</div>
										<transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
											<MenuItems class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
												<MenuItem v-slot="{ active }" @click="showEdit(item)">
													<a href="#" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">Edit</a>
												</MenuItem>
												<MenuItem v-slot="{ active }" @click="showDetails(item)">
													<a href="#" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">View</a>
												</MenuItem>
												<MenuItem v-slot="{ active }" @click="showRemove(item)">
													<a href="#" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-red-500']">Delete</a>
												</MenuItem>
											</MenuItems>
										</transition>
									</Menu>
								</td>
							</tr>
							</tbody>
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
	@onClose="closeCreate"
	@onCreate="onCreate"
	@onUpdate="onUpdate"
/>

<!-- Side Details -->
<side-details
	:is-show="isShowDetails"
	:item="selected"
	@onClose="closeDetails"
	@showEdit="showEdit"
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
				Delete feedback
			</div>
			<div class="mt-2">
				<p class="text-sm text-gray-500">
					Are you sure you want to delete this feedback? This data will be permanently removed from our servers forever.
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
import feedbackApi from '@/api/feedback';
import { delay } from '@/libraries/helper';

// Components
import {
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
import SideForm from '@/components/feedbacks/SideForm.vue';
import SideDetails from '@/components/feedbacks/SideDetails.vue';

export default {
	components: {
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
		SideDetails,
	},
	setup() {
		return {
			
		}
	},
	data() {
		return {
			isFetching: false,
			currentPage: 1,
			totalPage: 1,
			orderBy: 'created_at',
			sortBy: 'desc',
			limit: 10,
			keyword: '',
			items: [],
			selectedType: 'all',
			selected: null,
			isShowCreate: false,
			isShowRemove: false,
			isDeleting: false,
			isShowDetails: false,
		}
	},
	mounted() {
		this.fetchList();
	},
	watch: {
		currentPage() {
			this.fetchList();
		},
		selectedType() {
			this.fetchList(true);
		},
		keyword() {
			delay(() => {
				this.fetchList(true);
			}, 500);
		},
	},
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
			if (this.selectedType !== 'all') params.type = this.selectedType;
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
			feedbackApi.getList(params, callback, errorCallback);
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
			if (this.sortBy === 'desc') this.items.unshift(item);
			else if (this.sortBy === 'asc') this.items.push(item);
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
			if (itemIndex !== -1) Object.assign(this.items[itemIndex], item);
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
			feedbackApi.delete(selectedId, callback, errorCallback);
		},
		onRemove(selectedId) {
			const index = this.items.findIndex(curr => curr.id === selectedId);
			if (index !== -1) this.items.splice(index, 1);
		},
		showDetails(item) {
			this.selected = this.__duplicateVar(item);
			this.isShowDetails = true;
		},
		closeDetails() {
			this.isShowDetails = false;
			this.clearSelected();
		},
	}
}
</script>