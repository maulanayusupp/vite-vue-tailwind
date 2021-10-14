<template>
<div class="max-w-7xl mx-auto py-8 px-4 sm:px-6 md:px-8">
	<!-- Header -->
	<div>
        <h1 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
			Events
		</h1>
    </div>

	<!-- Actions -->
	<div class="mb-10">
		<div class="mt-6 flex justify-end">
			<button type="button" class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" @click="showCreate">
				<PlusIcon class="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
				New Event
			</button>
		</div>
	</div>

	<ul role="list" class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
		<li v-for="person in people" :key="person.email" class="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200">
		<div class="flex-1 flex flex-col p-8">
			<img class="w-32 h-32 flex-shrink-0 mx-auto rounded-full" :src="person.imageUrl" alt="" />
			<h3 class="mt-6 text-gray-900 text-sm font-medium">{{ person.name }}</h3>
			<dl class="mt-1 flex-grow flex flex-col justify-between">
			<dt class="sr-only">Title</dt>
			<dd class="text-gray-500 text-sm">{{ person.title }}</dd>
			<dt class="sr-only">Role</dt>
			<dd class="mt-3">
				<span class="px-2 py-1 text-green-800 text-xs font-medium bg-green-100 rounded-full">{{ person.role }}</span>
			</dd>
			</dl>
		</div>
		<div>
			<div class="-mt-px flex divide-x divide-gray-200">
			<div class="w-0 flex-1 flex">
				<a :href="`mailto:${person.email}`" class="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500">
				<MailIcon class="w-5 h-5 text-gray-400" aria-hidden="true" />
				<span class="ml-3">Email</span>
				</a>
			</div>
			<div class="-ml-px w-0 flex-1 flex">
				<a :href="`tel:${person.telephone}`" class="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500">
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
</template>

<script>
import { PlusIcon, MailIcon, PhoneIcon } from '@heroicons/vue/solid';
import EventCreator from '@/components/events/EventCreator.vue';

const people = [
	{
		name: 'Lindsay Walton',
		handle: 'lindsaywalton',
		email: 'lindsaywalton@example.com',
		role: 'Front-end Developer',
		imageId: '1517841905240-472988babdf9',
		imageUrl:
		'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
	},
	{
		name: 'Courtney Henry',
		handle: 'courtneyhenry',
		email: 'courtneyhenry@example.com',
		role: 'Designer',
		imageId: '1438761681033-6461ffad8d80',
		imageUrl:
		'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
	},
	{
		name: 'Tom Cook',
		handle: 'tomcook',
		email: 'tomcook@example.com',
		role: 'Director, Product Development',
		imageId: '1472099645785-5658abf4ff4e',
		imageUrl:
		'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
	},
	{
		name: 'Whitney Francis',
		handle: 'whitneyfrancis',
		email: 'whitneyfrancis@example.com',
		role: 'Copywriter',
		imageId: '1517365830460-955ce3ccd263',
		imageUrl:
		'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
	},
	{
		name: 'Leonard Krasner',
		handle: 'leonardkrasner',
		email: 'leonardkrasner@example.com',
		role: 'Senior Designer',
		imageId: '1519345182560-3f2917c472ef',
		imageUrl:
		'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
	},
	{
		name: 'Floyd Miles',
		handle: 'floydmiles',
		email: 'floydmiles@example.com',
		role: 'Principal Designer',
		imageId: '1463453091185-61582044d556',
		imageUrl:
		'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
	},
]

export default {
	components: {
		PlusIcon,
		MailIcon,
		PhoneIcon,
		EventCreator,
	},
	data() {
		return {
			people,
			isShowCreate: false,
		}
	},
	methods: {
		showCreate() {
			this.isShowCreate = true;
		},
		closeCreate() {
			this.isShowCreate = false;
		},
	},
}
</script>