<template>
<TransitionRoot as="template" :show="isShow">
	<Dialog as="div" class="fixed inset-0 overflow-hidden top-0 z-20" @close="close()">
		<div class="absolute inset-0 overflow-hidden">
			<TransitionChild as="template" enter="ease-in-out duration-500" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in-out duration-500" leave-from="opacity-100" leave-to="opacity-0">
				<DialogOverlay class="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
			</TransitionChild>

			<div class="fixed inset-y-0 right-0 pl-10 max-w-full flex sm:pl-16">
				<TransitionChild as="template" enter="transform transition ease-in-out duration-500 sm:duration-700" enter-from="translate-x-full" enter-to="translate-x-0" leave="transform transition ease-in-out duration-500 sm:duration-700" leave-from="translate-x-0" leave-to="translate-x-full">
					<div
						:class="`${widthClass}`"
						class="w-screen">
						<slot></slot>
					</div>
				</TransitionChild>
			</div>
		</div>
	</Dialog>
</TransitionRoot>
</template>

<script>
import { Dialog, DialogOverlay, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'

export default {
	components: {
		Dialog,
		DialogOverlay,
		DialogTitle,
		TransitionChild,
		TransitionRoot,
	},
	props: {
		isShow: {
			type: Boolean,
			default: () => false,
		},
		widthClass: {
			type: String,
			default: () => 'max-w-2xl'
		},
	},
	data() {
		return {
		}
	},
	methods: {
		close() {
			this.$emit('close');
		},
	},
}
</script>