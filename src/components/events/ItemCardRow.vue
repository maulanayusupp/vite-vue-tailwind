<template>
<div class="flex items-center justify-between w-full px-4 py-4">
	<div class="min-w-0 flex-1 flex items-center">
		<div class="flex-shrink-0 cursor-pointer" @click.stop="goToDetails(item)">
			<img class="h-24 w-24 rounded-lg object-cover" :src="item.icon" alt="" v-if="item.icon" />
			<img class="h-24 w-24 rounded-lg object-cover" :src="`http://placeimg.com/640/480`" alt="" v-else />
		</div>
		<div class="min-w-0 flex-1 px-4 md:grid md:grid-cols-1 md:gap-4">
			<div>
				<p class="font-medium text-gray-600 truncate mb-3 cursor-pointer" @click.stop="goToDetails(item)">{{ item.name || '-' }}</p>
				<div class="flex items-center space-x-1">
					<badge :color="`green`" v-if="item.is_paid">Paid</badge>
					<badge :color="`${item.is_paid ? 'yellow' : ''}`">{{ `${item.is_paid ? 'Published' : 'Not published'}` }}</badge>
				</div>
				<dd class="mt-1 truncate">
					<badge :color="``" class="truncate capitalize">{{ item.type }}</badge>
				</dd>
			</div>
		</div>
	</div>
	<div>
		<!-- More -->
		<div class="flex p-3">
			<!-- Dropdown Actions -->
			<Menu as="div" class="relative flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500">
				<div>
					<MenuButton
						class="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
						<DotsVerticalIcon class="h-6 w-6 text-gray-400 group-hover:text-gray-700" aria-hidden="true" />
					</MenuButton>
				</div>
				<transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
					<MenuItems class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10 text-right">
						<MenuItem v-slot="{ active }" @click="showEdit(item)">
							<div :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">Edit</div>
						</MenuItem>
						<MenuItem v-slot="{ active }" @click.stop="goToDetails(item)">
							<div :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">View</div>
						</MenuItem>
						<MenuItem v-slot="{ active }" @click="showRemove(item)">
							<div :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-red-500']">Delete</div>
						</MenuItem>
					</MenuItems>
				</transition>
			</Menu>
		</div>
	</div>
</div>
</template>

<script>

// Components
import { EyeIcon, DotsVerticalIcon } from '@heroicons/vue/solid';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';
import Badge from '@/components/global/Badge.vue';

export default {
	components: {
		EyeIcon,
		DotsVerticalIcon,
		Menu,
		MenuButton,
		MenuItem,
		MenuItems,
		Badge,
	},
	props: {
		item: {
			type: Object,
			default: () => null,
		},
	},
	data() {
		return {
		}
	},
	mounted() {},
	watch: {},
	methods: {
		goToDetails(item) {
			this.$router.push(`/events/${item.slug}`);
		},
		showRemove(item) {
			this.$emit('showRemove', item)
		},
		showEdit(item) {
			this.$emit('showEdit', item)
		},
	},
}
</script>