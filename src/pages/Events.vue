<template>
<div class="max-w-7xl mx-auto py-8 px-4 sm:px-6 md:px-8">
	<!-- Header -->
	<div>
        <h1 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate mb-2">
			Events
		</h1>
    </div>

	<!-- Actions -->
	<div class="mb-10">
		<div class="mt-6 flex justify-end space-x-2">
			<t-button :color="`red-solid`" @click="showRemove">
				<XIcon class="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
				Remove Event
			</t-button>
			<t-button :color="`purple-solid`" @click="showCreate">
				<PlusIcon class="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
				New Event
			</t-button>
		</div>
	</div>


	<!-- Empty -->
	<div class="py-16" v-if="items.length === 0">
		<div class="mx-auto lg:items-center lg:justify-between text-center">
			<h2 class="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-2xl">
				<span class="block">Ready to dive in?</span>
				<span class="block text-indigo-600">Start your event today.</span>
			</h2>
		</div>
	</div>

	<!-- List -->
	<ul role="list" class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
		<li v-for="item in items" :key="item.email" class="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200">
		<div class="flex-1 flex flex-col p-8">
			<img class="w-32 h-32 flex-shrink-0 mx-auto rounded-full" :src="item.imageUrl" alt="" />
			<h3 class="mt-6 text-gray-900 text-sm font-medium">{{ item.name }}</h3>
			<dl class="mt-1 flex-grow flex flex-col justify-between">
			<dt class="sr-only">Title</dt>
			<dd class="text-gray-500 text-sm">{{ item.title }}</dd>
			<dt class="sr-only">Role</dt>
			<dd class="mt-3">
				<span class="px-2 py-1 text-green-800 text-xs font-medium bg-green-100 rounded-full">{{ item.role }}</span>
			</dd>
			</dl>
		</div>
		<div>
			<div class="-mt-px flex divide-x divide-gray-200">
			<div class="w-0 flex-1 flex">
				<a :href="`mailto:${item.email}`" class="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500">
				<MailIcon class="w-5 h-5 text-gray-400" aria-hidden="true" />
				<span class="ml-3">Email</span>
				</a>
			</div>
			<div class="-ml-px w-0 flex-1 flex">
				<a :href="`tel:${item.telephone}`" class="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500">
				<PhoneIcon class="w-5 h-5 text-gray-400" aria-hidden="true" />
				<span class="ml-3">Call</span>
				</a>
			</div>
			</div>
		</div>
		</li>
	</ul>
</div>

<!-- Event Creator -->
<event-creator
	:is-show="isShowCreate"
	@close="closeCreate"
/>

<!-- Modal Remove -->
<t-modal
	:is-show="isShowRemove"
	@close="closeRemove">
	<div class="sm:flex sm:items-start">
		<div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
			<ExclamationIcon class="h-6 w-6 text-red-600" aria-hidden="true" />
		</div>
		<div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
			<div as="h3" class="text-lg leading-6 font-medium text-gray-900">
				Delete Event
			</div>
			<div class="mt-2">
			<p class="text-sm text-gray-500">
				Are you sure you want to delete this event? This data will be permanently removed from our servers forever. This action cannot be undone.
			</p>
			</div>
		</div>
	</div>
	<div class="mt-5 sm:mt-4 sm:ml-10 sm:pl-4 sm:flex space-x-2">
		<t-button :color="`red-solid`" @click="closeRemove">
			Yes, Please Remove
		</t-button>
		<t-button :color="`default`" @click="closeRemove">
			Cancel
		</t-button>
	</div>
</t-modal>
</template>

<script>
import { PlusIcon, MailIcon, PhoneIcon, XIcon, ExclamationIcon } from '@heroicons/vue/solid';
import EventCreator from '@/components/events/EventCreator.vue';
import TButton from '@/components/global/Button.vue';
import TModal from '@/components/global/Modal.vue';

export default {
	components: {
		PlusIcon,
		MailIcon,
		PhoneIcon,
		XIcon,
		ExclamationIcon,
		EventCreator,
		TButton,
		TModal,
	},
	data() {
		return {
			items: [],
			isShowCreate: false,
			isShowRemove: false,
		}
	},
	watch: {},
	methods: {
		showCreate() {
			this.isShowCreate = true;
		},
		closeCreate() {
			this.isShowCreate = false;
		},
		showRemove() {
			this.isShowRemove = true;
		},
		closeRemove() {
			this.isShowRemove = false;
		},
	},
}
</script>