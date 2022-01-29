<template>
<div class="relative min-h-screen">
	<!-- Page heading -->
	<header class="py-4 mt-6">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:flex xl:items-center xl:justify-between">
			<div class="flex-1 min-w-0">
				<h1 class="text-2xl font-semibold text-gray-900 sm:truncate">
					Events
				</h1>
			</div>
			<div class="mt-5 flex xl:mt-0 xl:ml-4">
				<!-- Create -->
				<span class="space-x-2">
					<t-button :color="`purple-solid`" @click="showCreator">
						<PlusIcon class="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
						Event Creator
					</t-button>
					<t-button :color="`purple-solid`" @click="showCreate">
						<PlusIcon class="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
						New Event
					</t-button>
				</span>
			</div>
		</div>
	</header>

	<main class="pb-16">
		<div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
			<div class="px-4 sm:px-0 mb-6">
				<!-- Filter -->
				<div class="flex justify-end mt-4">
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

			<!-- List -->
			<ul
				role="list"
				class="grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4 md:p-0"
				v-if="!isFetching && items.length > 0">
				<li
					v-for="item in items"
					:key="item.email"
					class="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200">
					
					<!-- Item Card -->
					<item-card
						:item="item"
						@showEdit="showEdit"
						@showRemove="showRemove"
					/>
				</li>
			</ul>

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

<!-- Event Creator -->
<side-form
	:is-show="isShowCreate"
	:item="selected"
	@onClose="closeCreate"
	@onCreate="onCreate"
	@onUpdate="onUpdate"
/>

<!-- Modal Remove -->
<t-modal
	:is-show="isShowRemove"
	@onClose="closeRemove">

	<!-- Body -->
	<div class="sm:flex sm:items-start">
		<div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
			<ExclamationIcon class="h-6 w-6 text-red-600" aria-hidden="true" />
		</div>
		<div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
			<div as="h3" class="text-lg leading-6 font-medium text-gray-900">
				Delete Event
			</div>
			<div class="mt-2">
				<p class="text-sm text-gray-500">
					Are you sure you want to delete this event? This data will be permanently removed from our servers forever.
					<span class="text-red-500 text-xs mt-2 block">This action cannot be undone.</span>
				</p>
			</div>
		</div>
	</div>
	
	<!-- Footer -->
	<div class="mt-5 sm:mt-4 sm:ml-10 sm:pl-4 sm:flex space-x-2">
		<t-button :color="`red-solid`" @click="approveRemove">
			Yes, Please Remove
		</t-button>
		<t-button :color="`default`" @click="closeRemove">
			Cancel
		</t-button>
	</div>
</t-modal>

<!-- Modal - Creator -->
<t-modal
	:max-width-class="`max-w-lg`"
	:is-show="isShowCreator"
	@onClose="closeCreator">
	<div class="sm:flex sm:items-start">
		<div class="mt-3 sm:mt-0 sm:ml-4 sm:text-left w-full">
			<div class="flex justify-between items-center">
				<div as="h3" class="text-lg leading-6 font-medium text-gray-900">
					Create Event
				</div>
				<div>
					<XCircleIcon class="w-6 h-6 text-gray-400 cursor-pointer" aria-hidden="true" @click="closeCreator" />
				</div>
			</div>

			<div class="mt-2">
				<event-creator
					:item="selected"
					@onClose="closeCreator"
				/>
			</div>
		</div>
	</div>
</t-modal>
</template>

<script>
// API
import eventApi from '@/api/event';
import { delay } from '@/libraries/helper';

// Components
import { PlusIcon, EyeIcon, DotsVerticalIcon, XIcon, ExclamationIcon } from '@heroicons/vue/solid';
import { XCircleIcon } from '@heroicons/vue/outline';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';

import SideForm from '@/components/events/SideForm.vue';
import TInput from '@/components/form/Input.vue';
import TButton from '@/components/global/Button.vue';
import TModal from '@/components/global/Modal.vue';
import EmptyList from '@/components/global/EmptyList.vue';
import Pagination from '@/components/global/Pagination.vue';
import SkeletonPage from '@/components/loader/SkeletonPage.vue';
import Badge from '@/components/global/Badge.vue';
import EventCreator from '@/components/events/EventCreator.vue';
import ItemCard from '@/components/events/ItemCard.vue';

export default {
	components: {
		PlusIcon,
		EyeIcon,
		DotsVerticalIcon,
		XIcon,
		ExclamationIcon,
		XCircleIcon,
		Menu,
		MenuButton,
		MenuItem,
		MenuItems,
		SideForm,
		TInput,
		TButton,
		TModal,
		EmptyList,
		Pagination,
		SkeletonPage,
		Badge,
		EventCreator,
		ItemCard,
	},
	data() {
		return {
			isFetching: false,
			currentPage: 1,
			totalPage: 1,
			orderBy: 'created_at',
			sortBy: 'desc',
			limit: 8,
			keyword: '',
			items: [],
			selectedTab: 'all',
			isShowCreate: false,
			isShowRemove: false,
			selected: null,
			isShowCreator: false,
		}
	},
	mounted() {
		this.fetchList();
	},
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
			eventApi.getList(params, callback, errorCallback);
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
		goToDetails(item) {
			this.$router.push(`/events/${item.slug}`);
		},
		clearSelected() {
			// Clear after
			setTimeout(() => {
				this.selected = null;
			}, 1000);
		},
		showCreate() {
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
		showRemove(item) {
			this.selected = this.__duplicateVar(item);
			this.isShowRemove = true;
		},
		closeRemove() {
			this.isShowRemove = false;
			this.clearSelected();
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
			eventApi.deleteForever(selectedId, callback, errorCallback);
		},
		onRemove(selectedId) {
			const index = this.items.findIndex(curr => curr.id === selectedId);
			if (index !== -1) this.items.splice(index, 1);


			if (this.items.length === 4) this.fetchList();
		},
		showCreator() {
			this.isShowCreator = true;
		},
		closeCreator() {
			this.isShowCreator = false;
		},
	},
}
</script>