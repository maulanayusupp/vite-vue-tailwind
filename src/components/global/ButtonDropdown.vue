<template>
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
</template>

<script>
import { ChevronDownIcon } from '@heroicons/vue/solid'

import {
	Menu,
	MenuButton,
	MenuItem,
	MenuItems,
} from '@headlessui/vue'

export default {
	components: {
		Menu,
		MenuButton,
		MenuItem,
		MenuItems,
		ChevronDownIcon,
	},
	data() {
		return {
		}
	},
	created() {},
	mounted() {},
	beforeUnmount() {},
	methods: {},
	computed: {},
	watch: {},
}
</script>