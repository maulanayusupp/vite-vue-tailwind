<template>
<div class="relative min-h-screen">
	<!-- Page heading -->
	<header class="bg-gray-50 py-6">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:flex xl:items-center xl:justify-between">
			<div class="flex-1 min-w-0">
				<h1 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
					Events
				</h1>
			</div>
			<div class="mt-5 flex xl:mt-0 xl:ml-4">
				<!-- Create -->
				<span class="">
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
					<div class="flex-1 flex flex-col">
						<div class="relative h-32 sm:h-36 cursor-pointer" @click.stop="goToDetails(item)">
							<img class="absolute h-full w-full object-cover rounded-tl-lg rounded-tr-lg" :src="item.icon" alt="">

							<div class="absolute flex space-x-1 top-1 right-1">
								<badge :color="`green`" v-if="item.is_paid">Paid</badge>
								<badge :color="`${item.is_paid ? 'yellow' : ''}`">{{ `${item.is_paid ? 'Published' : 'Not published'}` }}</badge>
							</div>
						</div>

						<div class="p-3 md:p-5">
							<h3
								class="text-gray-900 text-sm md:text-lg font-medium truncate cursor-pointer"
								@click.stop="goToDetails(item)">
								{{ item.name }}
							</h3>
							<dl class="mt-1 flex-grow flex flex-col justify-between text-xs md:text-sm">
								<dt class="sr-only">{{ $t('Title') }}</dt>
								<dd class="text-gray-500 text-sm truncate">{{ item.information }}</dd>

								<dt class="sr-only">{{ $t('Status') }}</dt>
								<dd class="mt-3 truncate">
									<badge :color="`green`">{{ item.status }}</badge>
									<div class="mt-2">
										<badge :color="``" class="truncate capitalize">{{ item.type }}</badge>
									</div>
								</dd>
							</dl>
						</div>
					</div>
					<div>
						<!-- Actions -->
						<div class="-mt-px flex divide-x divide-gray-200">
							<div class="w-0 flex-1 flex">
								<a
									@click="goToDetails(item)"
									:href="`#`" class="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500">
									<EyeIcon class="w-5 h-5 text-gray-400" aria-hidden="true" />
									<span class="ml-3">{{ $t('View') }}</span>
								</a>
							</div>
							<div class="-ml-px w-0 flex-1 flex">
								<!-- Dropdown Actions -->
								<Menu as="div" class="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500">
									<div>
									<MenuButton class="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
										<DotsVerticalIcon class="h-5 w-5 text-gray-400 group-hover:text-gray-700" aria-hidden="true" />
										<span class="ml-3">{{ $t('More') }}</span>
									</MenuButton>
									</div>
									<transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
										<MenuItems class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10 text-right">
											<MenuItem v-slot="{ active }" @click="showEdit(item)">
												<a href="#" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">Edit</a>
											</MenuItem>
											<MenuItem v-slot="{ active }" @click="goToDetails(item)">
												<a href="#" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">View</a>
											</MenuItem>
											<MenuItem v-slot="{ active }" @click="showRemove(item)">
												<a href="#" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-red-500']">Delete</a>
											</MenuItem>
										</MenuItems>
									</transition>
								</Menu>

								<!-- <button class="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500">
									<DotsVerticalIcon class="w-5 h-5 text-gray-400" aria-hidden="true" />
									<span class="ml-3">{{ $t('More') }}</span>
								</button> -->
							</div>
						</div>
					</div>
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
</template>

<script>
// API
import eventApi from '@/api/event';
import { delay } from '@/libraries/helper';

// Components
import { PlusIcon, EyeIcon, DotsVerticalIcon, XIcon, ExclamationIcon } from '@heroicons/vue/solid';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';

import SideForm from '@/components/events/SideForm.vue';
import TInput from '@/components/form/Input.vue';
import TButton from '@/components/global/Button.vue';
import TModal from '@/components/global/Modal.vue';
import EmptyList from '@/components/global/EmptyList.vue';
import Pagination from '@/components/global/Pagination.vue';
import SkeletonPage from '@/components/loader/SkeletonPage.vue';
import Badge from '@/components/global/Badge.vue';

export default {
	components: {
		PlusIcon,
		EyeIcon,
		DotsVerticalIcon,
		XIcon,
		ExclamationIcon,
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
			eventApi.delete(selectedId, callback, errorCallback);
		},
		onRemove(selectedId) {
			const index = this.items.findIndex(curr => curr.id === selectedId);
			if (index !== -1) this.items.splice(index, 1);


			if (this.items.length === 4) this.fetchList();
		},
	},
}
</script>