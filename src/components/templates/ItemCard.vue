<template>
<div>
	<div class="flex-1 flex flex-col">
		<div class="relative h-36 sm:h-48 cursor-pointer" @click.stop="goToDetails(item)">
			<img class="absolute h-full w-full object-cover rounded-tl-lg rounded-tr-lg" :src="`https://random.imagecdn.app/640/480`">
		</div>

		<div class="p-2">
			<div
				class="text-gray-900 text-sm md:text-lg font-medium truncate cursor-pointer"
				@click.stop="goToDetails(item)">
				{{ item.name || '-' }}
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
			this.$router.push(`/templates/${item.slug}`);
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