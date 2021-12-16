<template>
<div class="relative min-h-screen" id="page-user">

	<!-- Page heading -->
	<header class="bg-gray-50 py-6">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:flex xl:items-center xl:justify-between">
			<div class="flex-1 min-w-0">
				<h1 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
					Users
				</h1>
				<!-- <div class="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-8">
					<div class="mt-2 flex items-center text-sm text-gray-500">
					<BriefcaseIcon class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
						Full-time
					</div>
					<div class="mt-2 flex items-center text-sm text-gray-500">
					<LocationMarkerIcon class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
						Remote
					</div>
					<div class="mt-2 flex items-center text-sm text-gray-500">
					<CurrencyDollarIcon class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
						$120k &ndash; $140k
					</div>
					<div class="mt-2 flex items-center text-sm text-gray-500">
					<CalendarIcon class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
						Closing on January 9, 2020
					</div>
				</div> -->
			</div>
			<div class="mt-5 flex xl:mt-0 xl:ml-4">
				<!-- Dropdown Button Box -->
				<span class="sm:ml-3 relative z-0">
					<Listbox as="div" v-model="selected">
						<ListboxLabel class="sr-only">
							Change published status
						</ListboxLabel>
						<div class="relative">
							<div class="inline-flex shadow-sm rounded-md divide-x divide-purple-600">
							<div class="relative z-0 inline-flex shadow-sm rounded-md divide-x divide-purple-600">
								<div class="relative inline-flex items-center bg-purple-500 py-2 pl-3 pr-4 border border-transparent rounded-l-md shadow-sm text-white">
								<CheckIcon class="h-5 w-5" aria-hidden="true" />
								<p class="ml-2.5 text-sm font-medium">{{ selected.name }}</p>
								</div>
								<ListboxButton class="relative inline-flex items-center bg-purple-500 p-2 rounded-l-none rounded-r-md text-sm font-medium text-white hover:bg-purple-600 focus:outline-none focus:z-10 focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-purple-500">
								<span class="sr-only">Change published status</span>
								<ChevronDownIcon class="h-5 w-5 text-white" aria-hidden="true" />
								</ListboxButton>
							</div>
							</div>

							<transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
							<ListboxOptions class="origin-top-right absolute left-0 mt-2 -mr-1 w-72 rounded-md shadow-lg overflow-hidden bg-white divide-y divide-gray-200 ring-1 ring-black ring-opacity-5 focus:outline-none sm:left-auto sm:right-0">
								<ListboxOption as="template" v-for="option in publishingOptions" :key="option.name" :value="option" v-slot="{ active, selected }">
								<li :class="[active ? 'text-white bg-purple-500' : 'text-gray-900', 'cursor-default select-none relative p-4 text-sm']">
									<div class="flex flex-col">
									<div class="flex justify-between">
										<p :class="selected ? 'font-semibold' : 'font-normal'">
										{{ option.name }}
										</p>
										<span v-if="selected" :class="active ? 'text-white' : 'text-purple-500'">
										<CheckIcon class="h-5 w-5" aria-hidden="true" />
										</span>
									</div>
									<p :class="[active ? 'text-purple-200' : 'text-gray-500', 'mt-2']">
										{{ option.description }}
									</p>
									</div>
								</li>
								</ListboxOption>
							</ListboxOptions>
							</transition>
						</div>
					</Listbox>
				</span>

				<!-- Dropdown Button -->
				<Menu as="span" class="ml-3 relative">
					<MenuButton class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
						More
						<ChevronDownIcon class="-mr-1 ml-2 h-5 w-5 text-gray-500" aria-hidden="true" />
					</MenuButton>

					<transition enter-active-class="transition ease-out duration-200" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
						<MenuItems class="origin-top-right absolute right-0 mt-2 -mr-1 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
							<MenuItem v-slot="{ active }">
								<a href="#" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">Edit</a>
							</MenuItem>
							<MenuItem v-slot="{ active }">
								<a href="#" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">View</a>
							</MenuItem>
						</MenuItems>
					</transition>
				</Menu>

				<!-- Create -->
				<span class="hidden sm:block">
					<t-button :color="`purple-solid`" class="ml-3">
						<PlusIcon class="-ml-1 mr-2 h-5 w-5 text-white" aria-hidden="true" />
						Create User
					</t-button>
				</span>
			</div>
		</div>
	</header>

	<main class="pb-16">
		<div class="max-w-7xl mx-auto sm:px-6 lg:px-8">

			<div class="px-4 sm:px-0">
				<!-- Filter -->
				<div class="flex justify-end mt-4">
					<t-input :type="`text`" :value="keyword" v-model="keyword" :placeholder="`Search...`" />
				</div>

				<!-- Tabs -->
				<div class="mb-4">
					<div class="sm:hidden">
						<label for="tabs" class="sr-only">Select a tab</label>
						<!-- Use an "onChange" listener to redirect the user to the selected tab URL. -->
						<select id="tabs" name="tabs" class="mt-4 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md">
							<option v-for="tab in tabs" :key="tab.name" :selected="tab.current">{{ tab.name }}</option>
						</select>
					</div>
					<div class="hidden sm:block">
						<div class="border-b border-gray-200">
							<div class="mt-2 -mb-px flex space-x-8" aria-label="Tabs">
								<div
									v-for="tab in tabs"
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
			</div>

			<empty-list
				:title="`No data available`"
				:sub-title="`There are no data available at the moment`"
				v-if="items.length === 0"
			/>

			<!-- Loader -->
			<skeleton-page class="p-8" v-if="isFetching" />

			<!-- List Table -->
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
								<th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Status
								</th>
								<th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Role
								</th>
								<th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Created
								</th>
								<th scope="col" class="relative px-6 py-3">
									<span class="sr-only">Edit</span>
								</th>
							</tr>
							</thead>
							<tbody class="bg-white divide-y divide-gray-200">
							<tr v-for="item in items" :key="item.email">
								<td class="px-6 py-4 whitespace-nowrap">
									<div class="flex items-center">
										<div class="flex-shrink-0 h-12 w-12">
											<!-- <img class="h-12 w-12 rounded-full group-hover:opacity-75" :src="item.imageUrl" alt="" /> -->
											<img class="h-12 w-12 rounded-full group-hover:opacity-75" :src="`https://images.unsplash.com/photo-1563982277846-1299eec465d3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80`" alt="" />
										</div>
										<div class="ml-4">
										<div class="text-sm font-medium text-gray-900">
											{{ item.name }}
										</div>
										<div class="text-sm text-gray-500 flex">
											<MailIcon class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
											{{ item.email }}
										</div>
										</div>
									</div>
								</td>
								<td class="px-6 py-4 whitespace-nowrap">
									<p class="mt-2 flex items-center text-xs text-gray-500">
										<CheckCircleIcon class="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400" aria-hidden="true" v-if="item.isVerified" />
										{{ item.isVerified ? 'Verified' : 'Not verified' }}
									</p>
								</td>
								<td class="px-6 py-4 whitespace-nowrap">
									<badge class="block" v-for="(item, index) in __parseStringToArray(item.roles)" :key="index">
										{{ item }}
									</badge>
								</td>
								<td class="px-6 py-4 whitespace-nowrap">
									<p class="text-xs text-gray-900">
										<time :datetime="item.createdAt">{{ __dateTimeFormat(item.createdAt) }}</time>
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
												<MenuItem v-slot="{ active }">
													<a href="#" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">Edit</a>
												</MenuItem>
												<MenuItem v-slot="{ active }">
													<a href="#" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">View</a>
												</MenuItem>
												<MenuItem v-slot="{ active }">
													<a href="#" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">Delete</a>
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
</template>

<script>
import { ref } from 'vue';
import {
	Disclosure,
	DisclosureButton,
	DisclosurePanel,
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
} from '@heroicons/vue/solid'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/vue/outline';

import Pagination from '@/components/global/Pagination.vue';
import TButton from '@/components/global/Button.vue';
import TInput from '@/components/form/Input.vue';

const tabs = [
	{ id: 'all', name: 'All', href: '#', current: false },
	{ id: 'client', name: 'Client', href: '#', current: false },
	{ id: 'admin', name: 'Admin', href: '#', current: false },
]

const publishingOptions = [
	{ id: 'published', name: 'Published', description: 'This job posting can be viewed by anyone who has the link.', current: true },
	{ id: 'draft', name: 'Draft', description: 'This job posting will no longer be publicly accessible.', current: false },
];
// API
import userApi from '@/api/user';
import { delay } from '@/libraries/helper';

// Components
import SkeletonPage from '@/components/loader/SkeletonPage.vue';
import SkeletonBox from '@/components/loader/SkeletonBox.vue';
import SkeletonLine from '@/components/loader/SkeletonLine.vue';

import Badge from '@/components/global/Badge.vue';
import EmptyList from '@/components/global/EmptyList.vue';

export default {
	components: {
		Disclosure,
		DisclosureButton,
		DisclosurePanel,
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
		BellIcon,
		BriefcaseIcon,
		CalendarIcon,
		CheckCircleIcon,
		CheckIcon,
		ChevronDownIcon,
		ChevronRightIcon,
		CurrencyDollarIcon,
		LocationMarkerIcon,
		MailIcon,
		MenuIcon,
		PlusIcon,
		SearchIcon,
		XIcon,
		DotsVerticalIcon,
		Pagination,
		TButton,
		SkeletonPage,
		SkeletonBox,
		SkeletonLine,
		TInput,
		EmptyList,
		Badge,
	},
	setup() {
		const selected = ref(publishingOptions[0])
		return {
			tabs,
			publishingOptions,
			selected,
		}
	},
	data() {
		return {
			isFetching: false,
			currentPage: 1,
			totalPage: 10,
			orderBy: 'createdAt',
			sortBy: 'desc',
			limit: 10,
			keyword: '',
			items: [],
			selectedTab: 'all',
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
				orderBy: this.orderBy,
				sortBy: this.sortBy,
				limit: this.limit,
				page: this.currentPage,
			};
			if (this.keyword) params.keyword = this.keyword;
			if (this.selectedTab !== 'all') params.role = this.selectedTab;
			const callback = (response) => {
				const data = response.data;
				this.totalPage = response.lastPage;
				this.items = data;
				this.isFetching = false;
			};
			const errorCallback = (error) => {
				const message = error.response.data.message;
				this.__showNotif('error', 'Error', message);
				this.isFetching = false;
			};
			userApi.fetchList(params, callback, errorCallback);
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
		scrollToMyEl(id) {	
			setTimeout(() => {
				const container = document.getElementById(`${id}`);
				console.log(container);
				container.scrollTop = container.scrollHeight;
			}, 2000);
		},
	}
}
</script>