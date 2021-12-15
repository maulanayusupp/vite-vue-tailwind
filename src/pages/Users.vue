<template>
<div class="relative min-h-screen bg-white">

	<!-- Page heading -->
	<header class="bg-gray-50 py-6">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:flex xl:items-center xl:justify-between">
			<div class="flex-1 min-w-0">
				<h1 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
					Users
				</h1>
				<div class="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-8">
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
				</div>
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
					<t-button :color="`purple`" class="ml-3">
						<PlusIcon class="-ml-1 mr-2 h-5 w-5 text-gray-400" aria-hidden="true" />
						Create User
					</t-button>
				</span>
			</div>
		</div>
	</header>

	<main class="pt-1 pb-16">
	<div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
		<div class="px-4 sm:px-0">
			<!-- Tabs -->
			<div class="sm:hidden">
				<label for="tabs" class="sr-only">Select a tab</label>
				<!-- Use an "onChange" listener to redirect the user to the selected tab URL. -->
				<select id="tabs" name="tabs" class="mt-4 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md">
				<option v-for="tab in tabs" :key="tab.name" :selected="tab.current">{{ tab.name }}</option>
				</select>
			</div>
			<div class="hidden sm:block">
				<div class="border-b border-gray-200">
				<nav class="mt-2 -mb-px flex space-x-8" aria-label="Tabs">
					<a v-for="tab in tabs" :key="tab.name" :href="tab.href" :class="[tab.current ? 'border-purple-500 text-purple-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200', 'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm']">
					{{ tab.name }}
					<span v-if="tab.count" :class="[tab.current ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-900', 'hidden ml-2 py-0.5 px-2.5 rounded-full text-xs font-medium md:inline-block']">{{ tab.count }}</span>
					</a>
				</nav>
				</div>
			</div>
		</div>

		<!-- Stacked list -->
		<ul role="list" class="mt-5 border-t border-gray-200 divide-y divide-gray-200 sm:mt-0 sm:border-t-0">
			<li v-for="candidate in items" :key="candidate.email">
				<a href="#" class="group block">
				<div class="flex items-center py-5 px-4 sm:py-6 sm:px-0">
					<div class="min-w-0 flex-1 flex items-center">
					<div class="flex-shrink-0">
						<img class="h-12 w-12 rounded-full group-hover:opacity-75" :src="candidate.imageUrl" alt="" />
					</div>
					<div class="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
						<div>
						<p class="text-sm font-medium text-purple-600 truncate">{{ candidate.name }}</p>
						<p class="mt-2 flex items-center text-sm text-gray-500">
							<MailIcon class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
							<span class="truncate">{{ candidate.email }}</span>
						</p>
						</div>
						<div class="hidden md:block">
						<div>
							<p class="text-sm text-gray-900">
							Applied on
							{{ ' ' }}
							<time :datetime="candidate.appliedDatetime">{{ candidate.applied }}</time>
							</p>
							<p class="mt-2 flex items-center text-sm text-gray-500">
							<CheckCircleIcon class="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400" aria-hidden="true" />
							{{ candidate.status }}
							</p>
						</div>
						</div>
					</div>
					</div>
					<div>
						<!-- Profile dropdown -->
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
					</div>
				</div>
				</a>
			</li>
		</ul>

		<!-- Pagination -->
		<pagination
			:is-number-pages-enabled="true"
			:current-page="currentPage"
			:total-page="totalPages"
			@next="next"
			@previous="previous"
			@setPage="setPage"
			v-if="totalPages > 1"
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

const navigation = [
	{ name: 'Dashboard', href: '#', current: true },
	{ name: 'Jobs', href: '#', current: false },
	{ name: 'Applicants', href: '#', current: false },
	{ name: 'Company', href: '#', current: false },
]
const userNavigation = [
	{ name: 'Your Profile', href: '#' },
	{ name: 'Settings', href: '#' },
	{ name: 'Sign out', href: '#' },
]
const tabs = [
	{ id: 'all', name: 'All', href: '#', current: false },
	{ id: 'client', name: 'Client', href: '#', current: false },
	{ id: 'admin', name: 'Admin', href: '#', current: false },

]

const publishingOptions = [
	{ id: 'published', name: 'Published', description: 'This job posting can be viewed by anyone who has the link.', current: true },
	{ id: 'draft', name: 'Draft', description: 'This job posting will no longer be publicly accessible.', current: false },
];

import UserItems from "@/databags/user.js";


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
	},
	setup() {
		const selected = ref(publishingOptions[0])
		return {
			navigation,
			userNavigation,
			tabs,
			items: UserItems,
			publishingOptions,
			selected,
		}
	},
	data() {
		return {
			currentPage: 1,
			totalPages: 10,
		}
	},
	computed: {

	},
	methods: {
		setPage(page) {
			this.currentPage = page;
		},
		previous() {
			if (this.currentPage > 1) this.currentPage--;
		},
		next() {
			if (this.currentPage < this.totalPages) this.currentPage++;
		},
	}
}
</script>