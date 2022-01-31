<template>
	<draggable
		class="dropped-area"
		tag="div"
		:list="categories"
		:group="{ name: 'categories' }"
		item-key="id"
		@change="changeDragAndDrop"
		handle=".category-handler"
		filter=".has-child">
		<template #item="{ element }">
			<div
<<<<<<< HEAD
				class=""
=======
				class="pl-6"
>>>>>>> 3775ee6f1f4e34f8147215b8375cd7964e1048f4
				:class="[element.subCategories && element.subCategories.length > 0 ? 'has-child' : '']">
				<div class="flex justify-between list-draggable pl-3">
					<div class="flex">
						<div class="flex items-center">
							<MenuIcon
								class="category-handler pt-1 h-5 w-5 mr-5 text-gray-400 group-hover:text-gray-700 cursor-move"
								aria-hidden="true" 
								:class="{ 'text-light-gray': element.subCategories && element.subCategories.length > 0 }"
							/>
						</div>
						<div class="flex items-center">
							<div class="flex-shrink-0 h-10 w-10">
								<img class="h-10 w-10 rounded-full group-hover:opacity-75" :src="element.icon" alt="" v-if="element.icon" />
								<img class="h-10 w-10 rounded-full group-hover:opacity-75" :src="`https://images.unsplash.com/photo-1563982277846-1299eec465d3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80`" alt="" v-else />
							</div>
							<div class="ml-2">
<<<<<<< HEAD
								<div class="text-md font-medium text-gray-900">{{ element.name }}</div>
=======
								<div class="text-md font-medium text-gray-900">
									{{ element.name }}
								</div>
>>>>>>> 3775ee6f1f4e34f8147215b8375cd7964e1048f4
								<p class="flex items-center text-xs">{{ element.type }}</p>
							</div>
						</div>
						<p class="ml-6 flex items-center">{{ element.background_color }}</p>
					</div>
					<Menu as="div" class="ml-3 flex items-center relative justify-end pr-4">
						<div>
						<MenuButton class="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
							<DotsVerticalIcon class="h-5 w-5 text-gray-400 group-hover:text-gray-700" aria-hidden="true" />
						</MenuButton>
						</div>
						<transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
							<MenuItems class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
								<MenuItem v-slot="{ active }" @click="showEdit(element)">
									<a href="#" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">Edit</a>
								</MenuItem>
								<MenuItem v-slot="{ active }" @click="showRemove(element)">
									<a href="#" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-red-500']">Delete</a>
								</MenuItem>
							</MenuItems>
						</transition>
					</Menu>
				</div>

				<!-- nested - rekursif -->
				<nested
					v-if="!element.parent_id"
<<<<<<< HEAD
					class="pl-10"
=======
					class="pl-2"
>>>>>>> 3775ee6f1f4e34f8147215b8375cd7964e1048f4
					:categories="element.subCategories"
					@onUpdate="showEdit"
					@onRemove="showRemove"
				/>
			</div>
		</template>
	</draggable>
</template>
<script>
import { PlusIcon, DotsVerticalIcon, MenuIcon } from '@heroicons/vue/solid';
import TButton from '@/components/global/Button.vue';
// Components
import {
	Menu,
	MenuButton,
	MenuItem,
	MenuItems,
} from '@headlessui/vue'
import draggable from 'vuedraggable';
export default {
	name: "nested-draggable",
	props: {
	categories: {
		required: true,
		type: Array
	}
	},
	components: {
		MenuIcon,
		draggable,
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
		}
	},
	methods: {
		changeDragAndDrop(item) {
			this.$emit('onDragged', item);
		},
		showRemove(item) {
			this.$emit('onRemove', item);
		},
		showEdit(item) {
			this.$emit('onUpdate', item);
		},
	},
};
</script>
<style>
	.list-draggable{
		min-height: 60px;
		background-color: white;
		border-bottom: 1px solid #E5E7EB;
	}
</style>