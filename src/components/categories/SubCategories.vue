<template>
<div v-if="opened === 'opened' && field !== 'action'">
	<tr v-for="elementSub in subCategories" :key="elementSub.id">
		<td class="px-6 py-2 pl-0 whitespace-nowrap hidden sm:table-cell">
			<p class="text-xs text-gray-500">
				<span v-if="field === 'name'">&#8226;</span> <span>{{ resutlField(elementSub) }}</span>
			</p>
		</td>
	</tr>
</div>
<div v-if="opened === 'opened' && field === 'action'">
	<tr
		class="flex justify-end"
		v-for="elementSub in subCategories" :key="elementSub.id">
		<td class="py-2 pl-0 mt-2 whitespace-nowrap hidden sm:table-cell">
			<Menu as="div" class="ml-3 relative flex justify-end">
				<div>
				<MenuButton class="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
					<DotsVerticalIcon class="h-5 w-5 text-gray-400 group-hover:text-gray-700" aria-hidden="true" />
				</MenuButton>
				</div>
				<transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
					<MenuItems class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
						<MenuItem v-slot="{ active }" @click.stop="showEdit(elementSub)">
							<a href="#" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">Edit</a>
						</MenuItem>
						<MenuItem v-slot="{ active }" @click.stop="showRemove(elementSub)">
							<a href="#" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-red-500']">Delete</a>
						</MenuItem>
					</MenuItems>
				</transition>
			</Menu>
		</td>
	</tr>
</div>
</template>

<script>
import { PlusIcon, DotsVerticalIcon } from '@heroicons/vue/solid';
import TButton from '@/components/global/Button.vue';
// Components
import {
	Menu,
	MenuButton,
	MenuItem,
	MenuItems,
} from '@headlessui/vue'

export default {
	components: {
		PlusIcon,
		TButton,
		DotsVerticalIcon,
		Menu,
		MenuButton,
		MenuItem,
		MenuItems,
	},
	data() {
		return {
			opened: '',
		}
	},
	props: {
		toggling: {
			type: Boolean,
			default: () => false,
		},
		subCategories: {
			type: Array,
			default: () => [],
		},
		id: {
			type: Number,
			default: () => null,
		},
		field: {
			type: String,
			default: () => null,
		},
	},
	created() {
		this.opened = localStorage.getItem(`category_${this.id}`);
	},
	mounted() {},
	beforeUnmount() {},
	methods: {
		resutlField(elementSub) {
			if (this.field === 'name') return elementSub.name;
			if (this.field === 'type') return elementSub.type;
			if (this.field === 'icon') return elementSub.icon;
			if (this.field === 'background_color') return elementSub.background_color;
			if (this.field === 'description') return elementSub.description;
		},
		showRemove(item) {
			this.$emit('onRemove', item);
		},
		showEdit(item) {
			this.$emit('onUpdate', item);
		},
	},
	computed: {

	},
	watch: {
		toggling() {
			this.opened = localStorage.getItem(`category_${this.id}`);
		},
	},
}
</script>