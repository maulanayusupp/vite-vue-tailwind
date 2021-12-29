<template>
<slide-over :is-show="isShow" :width-class="`max-w-lg`">
	<div class="h-full flex flex-col bg-white shadow-xl overflow-y-auto">
		<div class="flex-1">
			<!-- Header -->
			<div class="px-4 py-6 bg-gray-50 sm:px-6">
				<div class="flex items-start justify-between space-x-3">
					<div class="space-y-1">
						<div class="text-lg font-medium text-gray-900">Profile</div>
					</div>
					<div class="h-7 flex items-center">
						<button type="button" class="text-gray-400 hover:text-gray-500" @click="close()">
							<span class="sr-only">Close panel</span>
							<XIcon class="h-6 w-6" aria-hidden="true" />
						</button>
					</div>
				</div>
			</div>

			<!-- Body -->
			<div class="pb-1 sm:pb-6" v-if="item.profile">
				<!-- Body -->
				<div class="mb-6">
					<div class="relative h-40 sm:h-56" v-if="item.profile.picture">
						<img class="absolute h-full w-full object-cover" :src="item.profile.picture" alt="" />
					</div>
					<div class="mt-6 px-4 sm:mt-8 sm:flex sm:items-end sm:px-6">
						<div class="sm:flex-1">
							<div>
								<div class="flex items-center">
									<h3 class="font-bold text-xl text-gray-900 sm:text-2xl">{{ item.name }}</h3>
									<span class="ml-2.5 bg-green-400 flex-shrink-0 inline-block h-2 w-2 rounded-full">
									<span class="sr-only">Online</span>
									</span>
								</div>
								<p class="text-sm text-gray-500">@{{ item.username }}</p>
							</div>
							<div class="mt-5 flex flex-wrap space-y-3 sm:space-y-0 sm:space-x-3">
								<button type="button" class="flex-shrink-0 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:flex-1">
									Message
								</button>
								<button type="button" class="flex-1 w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
									Call
								</button>
								<span class="ml-3 inline-flex sm:ml-0">
									<Menu as="div" class="relative inline-block text-left">
										<MenuButton class="inline-flex items-center p-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-400 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
											<span class="sr-only">Open options menu</span>
											<DotsVerticalIcon class="h-5 w-5" aria-hidden="true" />
										</MenuButton>
										<transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
											<MenuItems class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
												<div class="py-1">
													<MenuItem v-slot="{ active }" @click="showEdit(item)">
														<a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">
															Edit Profile
														</a>
													</MenuItem>
												</div>
											</MenuItems>
										</transition>
									</Menu>
								</span>
							</div>
						</div>
					</div>
				</div>

				<!-- Description -->
				<div class="px-4 pt-5 pb-5 sm:px-0 sm:pt-0">
					<dl class="space-y-8 px-4 sm:px-6 sm:space-y-6">
						<div v-if="item.profile.biography">
							<dt class="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
								Bio
							</dt>
							<dd class="mt-1 text-sm text-gray-900 sm:col-span-2">
								<p>{{ item.profile.biography }}</p>
							</dd>
						</div>
						
						<div v-if="item.profile.address">
							<dt class="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
								Address
							</dt>
							<dd class="mt-1 text-sm text-gray-900 sm:col-span-2">
								<p>{{ item.profile.address }}</p>
							</dd>
						</div>

						<div v-if="item.profile.gender">
							<dt class="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
								Gender
							</dt>
							<dd class="mt-1 text-sm text-gray-900 sm:col-span-2">
								{{ item.profile.gender }}
							</dd>
						</div>

						<div v-if="item.profile.job_title">
							<dt class="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
								Job Title
							</dt>
							<dd class="mt-1 text-sm text-gray-900 sm:col-span-2">
								{{ item.profile.job_title }}
							</dd>
						</div>

						<div v-if="item.profile.birt_date">
							<dt class="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
								Birthdate
							</dt>
							<dd class="mt-1 text-sm text-gray-900 sm:col-span-2">
								<time :datetime="__dateFormat(item.profile.birt_date)">{{ __dateFormat(item.profile.birt_date) }}</time>
							</dd>
						</div>
					</dl>
				</div>
			</div>
		</div>

		<!-- Action buttons -->
		<div class="flex-shrink-0 px-4 border-t border-gray-200 py-5 sm:px-6">
			<div class="space-x-3 flex justify-end">
				<button type="button" class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" @click="close()">
					Close
				</button>
			</div>
		</div>
	</div>
</slide-over>
</template>

<script>
import { XIcon } from '@heroicons/vue/outline'
import { DotsVerticalIcon } from '@heroicons/vue/solid'
import SlideOver from '@/components/global/SlideOver.vue';

import {
	Menu,
	MenuButton,
	MenuItem,
	MenuItems,
} from '@headlessui/vue';

export default {
	components: {
		DotsVerticalIcon,
		XIcon,
		SlideOver,
		Menu,
		MenuButton,
		MenuItem,
		MenuItems,
	},
	props: {
		isShow: {
			type: Boolean,
			default: () => false,
		},
		item: {
			type: Object,
			default: () => null,
		},
	},
	data() {
		return {
		}
	},
	methods: {
		close() {
			this.$emit('onClose');
		},
		showEdit() {
			this.close();
			setTimeout(() => {
				this.$emit('showEdit', this.item);
			}, 1000);
		},
	},
}
</script>