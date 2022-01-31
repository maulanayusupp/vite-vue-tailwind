<template>
<div>
	<div class="flex-1 flex flex-col">
		<div class="relative h-32 sm:h-36 cursor-pointer" @click.stop="goToDetails(item)">
<<<<<<< HEAD
			<img class="absolute h-full w-full object-cover rounded-tl-lg rounded-tr-lg" :src="item.icon" alt="" v-if="item.icon">
			<img class="absolute h-full w-full object-cover rounded-tl-lg rounded-tr-lg" :src="`http://placeimg.com/640/480`" alt="" v-else>
=======
			<img class="absolute h-full w-full object-cover rounded-tl-lg rounded-tr-lg" :src="item.icon" alt="">
>>>>>>> 3775ee6f1f4e34f8147215b8375cd7964e1048f4

			<div class="absolute flex space-x-1 top-1 right-1">
				<badge :color="`green`" v-if="item.is_paid">Paid</badge>
				<badge :color="`${item.is_paid ? 'yellow' : ''}`">{{ `${item.is_paid ? 'Published' : 'Not published'}` }}</badge>
			</div>
		</div>

		<div class="p-3 md:p-5">
			<h3
				class="text-gray-900 text-sm md:text-lg font-medium truncate cursor-pointer"
				@click.stop="goToDetails(item)">
<<<<<<< HEAD
				{{ item.name || '-' }}
			</h3>
			<dl class="mt-1 flex-grow flex flex-col justify-between text-xs md:text-sm">
				<dt class="sr-only">{{ $t('Title') }}</dt>
				<dd class="text-gray-500 text-sm truncate">{{ item.information || '-' }}</dd>

				<dt class="sr-only">{{ $t('Status') }}</dt>
				<dd class="mt-3 truncate">
					<badge :color="`green`">{{ item.status || '-' }}</badge>
=======
				{{ item.name }}
			</h3>
			<dl class="mt-1 flex-grow flex flex-col justify-between text-xs md:text-sm">
				<dt class="sr-only">{{ $t('Title') }}</dt>
				<dd class="text-gray-500 text-sm truncate">{{ item.information }}</dd>

				<dt class="sr-only">{{ $t('Status') }}</dt>
				<dd class="mt-3 truncate">
					<badge :color="`green`">{{ item.status }}</badge>
>>>>>>> 3775ee6f1f4e34f8147215b8375cd7964e1048f4
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
				<div
					@click.stop="goToDetails(item)"
					class="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500 cursor-pointer">
					<EyeIcon class="w-5 h-5 text-gray-400" aria-hidden="true" />
					<span class="ml-3">{{ $t('View') }}</span>
				</div>
			</div>
			<div class="-ml-px w-0 flex-1 flex">
				<!-- Dropdown Actions -->
				<Menu as="div" class="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500">
					<div>
						<MenuButton
							class="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
							<DotsVerticalIcon class="h-5 w-5 text-gray-400 group-hover:text-gray-700" aria-hidden="true" />
							<span class="ml-3">{{ $t('More') }}</span>
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