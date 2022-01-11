<template>
	<header>
		<Popover class="relative bg-white">
			<!-- Desktop -->
			<div
				class="flex justify-between items-center max-w-7xl mx-auto px-4 py-4 sm:px-6 md:justify-start md:space-x-10 lg:px-8">
				<div class="flex justify-start lg:w-0 lg:flex-1">
					<a href="#" class="hidden md:block">
						<span class="sr-only">Workflow</span>
						<img class="h-8 w-auto sm:h-10" src="https://tailwindui.com/img/logos/workflow-mark-purple-600-to-indigo-600.svg" alt="" />
					</a>
					<button type="button" class="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden" @click="__showLeftNavigation">
						<span class="sr-only">Open sidebar</span>
						<MenuAlt2Icon class="h-6 w-6" aria-hidden="true" />
					</button>
				</div>

				<!-- Mobile - Toggle -->
				<!-- <div class="-mr-2 -my-2 md:hidden">
					<PopoverButton class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
						<span class="sr-only">Open menu</span>
						<MenuIcon class="h-6 w-6" aria-hidden="true" />
					</PopoverButton>
				</div> -->

				<PopoverGroup as="nav" class="hidden md:flex space-x-10">
					<Popover class="relative" v-slot="{ open }">
						<PopoverButton
							:class="[open ? 'text-gray-900' : 'text-gray-500', 'group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500']">
							<span>Solutions</span>
							<ChevronDownIcon 
								:class="[open ? 'text-gray-600' : 'text-gray-400', 'ml-2 h-5 w-5 group-hover:text-gray-500']"
								aria-hidden="true" />
						</PopoverButton>

						<transition
							enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0 translate-y-1" enter-to-class="opacity-100 translate-y-0" leave-active-class="transition ease-in duration-150" leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 translate-y-1">
							<PopoverPanel
								v-slot="{ close }"
								class="absolute z-10 -ml-4 mt-3 transform w-screen max-w-md lg:max-w-2xl lg:ml-0 lg:left-1/2 lg:-translate-x-1/2">
								<div class="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
									<div class="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8 lg:grid-cols-2">
										<router-link
											v-for="item in mainMenuItems"
											:key="item.name"
											:to="item.href" class="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50"
											@click="closeMenu(close)">
											<div class="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-gradient-to-r from-purple-600 to-indigo-600 text-white sm:h-12 sm:w-12">
												<component :is="item.icon" class="h-6 w-6" aria-hidden="true" />
											</div>
											<div class="ml-4">
												<p class="text-base font-medium text-gray-900">{{ item.name }}</p>
												<p class="mt-1 text-sm text-gray-500">{{ item.description }}</p>
											</div>
										</router-link>
									</div>
								</div>
							</PopoverPanel>
						</transition>
					</Popover>

					<a href="#" class="text-base font-medium text-gray-500 hover:text-gray-900">
						Pricing
					</a>
					<a href="#" class="text-base font-medium text-gray-500 hover:text-gray-900">
						Partners
					</a>
					<a href="#" class="text-base font-medium text-gray-500 hover:text-gray-900">
						Company
					</a>
				</PopoverGroup>
				<div class="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
					<!-- Profile dropdown -->
					<Menu as="div" class="ml-3 relative z-10">
						<div>
						<MenuButton class="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
							<span class="sr-only">Open user menu</span>
							<img class="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
						</MenuButton>
						</div>
						<transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
						<MenuItems class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
							<MenuItem v-for="item in userMenus" :key="item.name" v-slot="{ active }">
								<router-link :to="item.href" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">{{ item.name }}</router-link>
							</MenuItem>
						</MenuItems>
						</transition>
					</Menu>
				</div>
			</div>
			
			<!-- Mobile -->
			<!-- <transition enter-active-class="duration-200 ease-out" enter-from-class="opacity-0 scale-95" enter-to-class="opacity-100 scale-100" leave-active-class="duration-100 ease-in" leave-from-class="opacity-100 scale-100" leave-to-class="opacity-0 scale-95">
				<PopoverPanel
					focus
					class="absolute z-30 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
					<div class="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
						<div class="pt-5 pb-6 px-5">
							<div class="flex items-center justify-between">
								<div>
									<img class="h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-purple-600-to-indigo-600.svg" alt="Workflow" />
								</div>
								<div class="-mr-2">
									<PopoverButton class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
										<span class="sr-only">Close menu</span>
										<XIcon class="h-6 w-6" aria-hidden="true" />
									</PopoverButton>
								</div>
							</div>
							<div class="mt-6">
								<nav class="grid grid-cols-1 gap-7">
									<a v-for="item in solutions" :key="item.name" :href="item.href" class="-m-3 p-3 flex items-center rounded-lg hover:bg-gray-50">
										<div class="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
											<component :is="item.icon" class="h-6 w-6" aria-hidden="true" />
										</div>
										<div class="ml-4 text-base font-medium text-gray-900">
											{{ item.name }}
										</div>
									</a>
									<a v-for="item in solutions" :key="item.name" :href="item.href" class="-m-3 p-3 flex items-center rounded-lg hover:bg-gray-50">
										<div class="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
											<component :is="item.icon" class="h-6 w-6" aria-hidden="true" />
										</div>
										<div class="ml-4 text-base font-medium text-gray-900">
											{{ item.name }}
										</div>
									</a>
									<a v-for="item in solutions" :key="item.name" :href="item.href" class="-m-3 p-3 flex items-center rounded-lg hover:bg-gray-50">
										<div class="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
											<component :is="item.icon" class="h-6 w-6" aria-hidden="true" />
										</div>
										<div class="ml-4 text-base font-medium text-gray-900">
											{{ item.name }}
										</div>
									</a>
								</nav>
							</div>
						</div>
						<div class="py-6 px-5">
							<div class="grid grid-cols-2 gap-4">
								<a href="#" class="text-base font-medium text-gray-900 hover:text-gray-700">Pricing</a>
								<a href="#" class="text-base font-medium text-gray-900 hover:text-gray-700">Partners</a>
								<a href="#" class="text-base font-medium text-gray-900 hover:text-gray-700">Company</a>
							</div>
							<div class="mt-6">
								<a href="#" class="w-full flex items-center justify-center bg-gradient-to-r from-purple-600 to-indigo-600 bg-origin-border px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white hover:from-purple-700 hover:to-indigo-700">
									Sign up
								</a>
								<p class="mt-6 text-center text-base font-medium text-gray-500">
									Existing customer?
									<a href="#" class="text-gray-900">
									Sign in
									</a>
								</p>
							</div>
						</div>
					</div>
				</PopoverPanel>
			</transition> -->
		</Popover>
    </header>
</template>

<script>
import mainMenuItems from "@/databags/main-menu.js";

import { Popover, PopoverButton, PopoverGroup, PopoverPanel } from '@headlessui/vue';
import {
	MenuIcon,
	XIcon,
	MenuAlt2Icon,
} from '@heroicons/vue/outline';
import { ChevronDownIcon } from '@heroicons/vue/solid';

import {
	Menu,
	MenuButton,
	MenuItem,
	MenuItems,
} from '@headlessui/vue';

const userMenus = [
	{ name: 'Your Profile', href: '/profile' },
	{ name: 'Settings', href: '/settings' },
	{ name: 'Sign out', href: '/logout' },
]

export default {
	components: {
		Popover,
		PopoverButton,
		PopoverGroup,
		PopoverPanel,
		ChevronDownIcon,
		MenuIcon,
		XIcon,
		MenuAlt2Icon,
		Menu,
		MenuButton,
		MenuItem,
		MenuItems,
	},
	data() {
		return {
			mainMenuItems,
			userMenus,
		}
	},
	setup() {
		return {
			closeMenu: async (close) => {
				close()
			},
		}
    },
}
</script>