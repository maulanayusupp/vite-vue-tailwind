<template>
	<header>
		<Popover class="relative bg-white">
			<!-- Desktop -->
			<div
				class="flex justify-between items-center max-w-7xl mx-auto px-4 py-4 sm:px-6 md:justify-start md:space-x-10 lg:px-8">

				<!-- Left -->
				<div class="flex justify-start lg:w-0 lg:flex-1">
					<!-- Desktop -->
					<router-link to="/" class="hidden md:block">
						<span class="sr-only">Workflow</span>
						<img class="h-8 w-auto sm:h-10" src="https://tailwindui.com/img/logos/workflow-mark-purple-600-to-indigo-600.svg" alt="" />
					</router-link>

					<!-- Mobile -->
					<button type="button" class="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden" @click="__showLeftNavigation">
						<span class="sr-only">Open sidebar</span>
						<MenuAlt2Icon class="h-6 w-6" aria-hidden="true" />
					</button>
				</div>

				<!-- Center -->
				<PopoverGroup as="nav" class="hidden md:flex space-x-10">
					<template v-for="(parent, index) in mainMenuItems" :key="index">
						<router-link
							v-if="parent.childrens.length === 0"
							:to="parent.href"
							class="text-base font-medium text-gray-500 hover:text-gray-900"
							:class="[isActive(parent.href) ? 'text-black border-b-2 border-gray-500' : '']">
							{{ parent.name }}
						</router-link>
						<Popover
							v-else
							class="relative"
							v-slot="{ open }">
							<PopoverButton
								:class="[open ? 'text-gray-900' : 'text-gray-500', 'group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500']">
								<span>{{ parent.name }}</span>
								<ChevronDownIcon 
									v-if="!open"
									:class="[open ? 'text-gray-600' : 'text-gray-400', 'ml-2 h-5 w-5 group-hover:text-gray-500']"
									aria-hidden="true" />
								<ChevronUpIcon
									v-else
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
												v-for="item in parent.childrens"
												:key="item.name"
												:to="item.href" class="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50"
												:class="[isActive(item.href) ? 'bg-gray-100' : '']"
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
					</template>
				</PopoverGroup>
				
				<!-- Right -->
				<div class="flex items-center justify-end flex-1 lg:w-0">
					<!-- Bell Notifications -->
					<Popover
						class="relative"
						v-slot="{ open }">
						<PopoverButton
							:class="[open ? 'text-gray-900' : 'text-gray-500', 'group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500']">
							<button
								type="button"
								class="flex-shrink-0 bg-white rounded-full p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700">
								<span class="sr-only">View notifications</span>
								<BellIcon class="h-6 w-6" aria-hidden="true" />
							</button>
						</PopoverButton>

						<transition
							enter-active-class="transition ease-out duration-200"
							enter-from-class="opacity-0 translate-y-1"
							enter-to-class="opacity-100 translate-y-0"
							leave-active-class="transition ease-in duration-150"
							leave-from-class="opacity-100 translate-y-0"
							leave-to-class="opacity-0 translate-y-1">
							<PopoverPanel
								v-slot="{ close }"
								class="absolute z-10 -ml-4 mt-3 transform w-screen max-w-sm md:max-w-md right-0">
								<div class="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
									<div
										class="relative bg-white divide-y divide-dashed max-h-80 overflow-y-auto">
										<div
											v-for="(item, index) in 20"
											:key="index"
											@click="closeMenu(close)"
											class="flex-1 p-4 cursor-pointer hover:bg-gray-50">
											<div class="flex items-start">
												<div class="flex-shrink-0 pt-0.5">
													<img class="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80" alt="" />
												</div>
												<div class="ml-3 w-0 flex-1">
													<p class="text-sm font-medium text-gray-900">
													Emilia Gates
													</p>
													<p class="mt-1 text-sm text-gray-500">
													Sure! 8:30pm works great!
													</p>
												</div>
											</div>
										</div>
									</div>
									<div class="bg-gray-50 grid grid-cols-2">
										<div class="w-full cursor-pointer" @click="closeMenu(close)">
											<div class="rounded-md text-center px-4 py-4 text-sm md:text-base text-gray-900 hover:bg-gray-100">
												<span>View all notifications</span>
											</div>
										</div>
										<div class="w-full cursor-pointer" @click="closeMenu(close)">
											<div class="rounded-md text-center px-4 py-4 text-sm md:text-base text-gray-900 hover:bg-gray-100">
												<span>Clear all</span>
											</div>
										</div>
									</div>
								</div>
							</PopoverPanel>
						</transition>
					</Popover>

					<!-- Profile dropdown -->
					<Menu as="div" class="ml-3 relative z-10">
						<div>
						<MenuButton
							class="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
							<span class="sr-only">Open user menu</span>
							<img
								class="h-8 w-8 rounded-full"
								src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
								alt=""/>
							<ChevronDownIcon :class="['ml-2 h-5 w-5 text-gray-500']" aria-hidden="true" />
						</MenuButton>
						</div>
						<transition
							enter-active-class="transition ease-out duration-100"
							enter-from-class="transform opacity-0 scale-95"
							enter-to-class="transform opacity-100 scale-100"
							leave-active-class="transition ease-in duration-75"
							leave-from-class="transform opacity-100 scale-100"
							leave-to-class="transform opacity-0 scale-95">
							<MenuItems
								class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
								<MenuItem
									v-for="item in userMenus"
									:key="item.name" v-slot="{ active }">
									<router-link
										:to="item.href"
										:class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">
										{{ item.name }}
									</router-link>
								</MenuItem>
							</MenuItems>
						</transition>
					</Menu>
				</div>
			</div>	
		</Popover>
    </header>
</template>

<script>
import mainMenuItems from "@/databags/main-menu.js";
import { USER_MENUS } from "@/databags/user";

import { Popover, PopoverButton, PopoverGroup, PopoverPanel } from '@headlessui/vue';
import {
	MenuIcon,
	XIcon,
	MenuAlt2Icon, BellIcon,
} from '@heroicons/vue/outline';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/vue/solid';

import {
	Menu,
	MenuButton,
	MenuItem,
	MenuItems,
} from '@headlessui/vue';

export default {
	components: {
		Popover,
		PopoverButton,
		PopoverGroup,
		PopoverPanel,
		ChevronDownIcon,
		ChevronUpIcon,
		MenuIcon,
		XIcon,
		MenuAlt2Icon,
		BellIcon,
		Menu,
		MenuButton,
		MenuItem,
		MenuItems,
	},
	data() {
		return {
			mainMenuItems,
			userMenus: USER_MENUS,
		}
	},
	setup() {
		return {
			closeMenu: async (close) => {
				close()
			},
		}
    },
	methods: {
		isActive(string) {
			let isActive = false;
			if (string === '/') isActive = this.$route.path === string;
			else if (string !== '/') isActive = window.location.href.indexOf(string) > -1;
			return isActive;
		},
	},
}
</script>