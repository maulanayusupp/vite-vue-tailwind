<template>
<slide-over :is-show="isShow" :width-class="`max-w-lg`">
	<div class="h-full flex flex-col bg-white shadow-xl overflow-y-auto">
		<div class="flex-1">
			<!-- Header -->
			<div class="px-4 py-6 bg-gray-50 sm:px-6">
				<div class="flex items-start justify-between space-x-3">
					<div class="space-y-1">
						<div class="text-lg font-medium text-gray-900">Details</div>
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
			<div class="pb-1 sm:pb-6" v-if="item">
				<!-- Description -->
				<div class="px-4 pt-5 pb-5 sm:px-0 sm:pt-0">
					<dl class="space-y-8 px-4 sm:px-6 sm:space-y-6">
						<div v-if="item.title">
							<dt class="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
								Title
							</dt>
							<dd class="mt-1 text-sm text-gray-900 sm:col-span-2">
								<p>{{ item.title }}</p>
							</dd>
						</div>

						<div v-if="item.content">
							<dt class="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
								Content
							</dt>
							<dd class="mt-1 text-sm text-gray-900 sm:col-span-2" v-html="item.content">
							</dd>
						</div>

						<div v-if="item.type">
							<dt class="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
								Type
							</dt>
							<dd class="mt-1 text-sm text-gray-900 sm:col-span-2">
								{{ item.type }}
							</dd>
						</div>

						<div v-if="item.start_date">
							<dt class="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
								Start
							</dt>
							<dd class="mt-1 text-sm text-gray-900 sm:col-span-2">
								<time :datetime="__dateFormat(item.start_date)">{{ __dateFormat(item.start_date) }}</time>
							</dd>
						</div>

						<div v-if="item.end_date">
							<dt class="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
								End
							</dt>
							<dd class="mt-1 text-sm text-gray-900 sm:col-span-2">
								<time :datetime="__dateFormat(item.end_date)">{{ __dateFormat(item.end_date) }}</time>
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
	watch: {
		item() {
		},
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