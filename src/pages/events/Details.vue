<template>
<div class="relative min-h-screen">
	<!-- Loader -->
	<skeleton-page class="px-8 py-8" v-if="isFetching" />

	<!-- Content -->
	<template v-if="!isFetching && item">
		<!-- Page heading -->
		<header class="py-4">
			<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:flex xl:items-center xl:justify-between">
				<div class="flex-1 min-w-0">
					<div class="flex items-center">
						<!-- Back -->
						<span class="mr-6 bg-gray-300 hover:bg-gray-200 p-2 rounded-full cursor-pointer" @click="goBack()">
							<ArrowLeftIcon class="h-4 w-4 text-gray-600" aria-hidden="true" />
						</span>

						<!-- Name -->
						<div class="text-xl font-semibold text-gray-900 sm:truncate">
							{{ item.name }}
						</div>
					</div>
				</div>
			</div>
		</header>

		<!-- Main -->
		<main class="pb-16 mt-1">
			<div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
				<div class="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
					<h1 class="sr-only">Profile</h1>
					<!-- Main 3 column grid -->
					<div class="grid grid-cols-1 gap-4 items-start lg:grid-cols-3 lg:gap-8">
					<!-- Left column -->
					<div class="grid grid-cols-1 gap-4 lg:col-span-2">
						<!-- Welcome panel -->
						<section aria-labelledby="profile-overview-title">
						<div class="rounded-lg bg-white overflow-hidden shadow">
							<h2 class="sr-only" id="profile-overview-title">Profile Overview</h2>
							<div class="bg-white p-6">
								<div class="sm:flex sm:items-center sm:justify-between">
									<div class="sm:flex sm:space-x-5">
										<div class="flex-shrink-0">
											<img class="mx-auto h-20 w-20 rounded-lg" :src="user.imageUrl" alt="" />
										</div>
										<div class="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
											<p class="text-sm font-medium text-gray-600">Welcome back,</p>
											<p class="text-xl font-bold text-gray-900 sm:text-2xl">{{ user.name }}</p>
											<p class="text-sm font-medium text-gray-600">{{ user.role }}</p>
										</div>
									</div>
									<div class="mt-5 flex justify-center sm:mt-0">
										<a
											href="#"
											class="flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
											Edit
										</a>
									</div>
								</div>
							</div>
							<div class="border-t border-gray-200 bg-gray-50 grid grid-cols-1 divide-y divide-gray-200 sm:grid-cols-3 sm:divide-y-0 sm:divide-x">
								<div v-for="stat in stats" :key="stat.label" class="px-6 py-5 text-sm font-medium text-center">
									<span class="text-gray-900">{{ stat.value }}</span>
									{{ ' ' }}
									<span class="text-gray-600">{{ stat.label }}</span>
								</div>
							</div>
						</div>
						</section>

						<!-- Actions panel -->
						<section aria-labelledby="quick-links-title">
						<div class="rounded-lg bg-gray-200 overflow-hidden shadow divide-y divide-gray-200 sm:divide-y-0 sm:grid sm:grid-cols-2 sm:gap-px">
							<h2 class="sr-only" id="quick-links-title">Quick links</h2>
							<div v-for="(action, actionIdx) in actions" :key="action.name" :class="[actionIdx === 0 ? 'rounded-tl-lg rounded-tr-lg sm:rounded-tr-none' : '', actionIdx === 1 ? 'sm:rounded-tr-lg' : '', actionIdx === actions.length - 2 ? 'sm:rounded-bl-lg' : '', actionIdx === actions.length - 1 ? 'rounded-bl-lg rounded-br-lg sm:rounded-bl-none' : '', 'relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-cyan-500']">
							<div>
								<span :class="[action.iconBackground, action.iconForeground, 'rounded-lg inline-flex p-3 ring-4 ring-white']">
								<component :is="action.icon" class="h-6 w-6" aria-hidden="true" />
								</span>
							</div>
							<div class="mt-8">
								<h3 class="text-lg font-medium">
								<a :href="action.href" class="focus:outline-none">
									<!-- Extend touch target to entire panel -->
									<span class="absolute inset-0" aria-hidden="true" />
									{{ action.name }}
								</a>
								</h3>
								<p class="mt-2 text-sm text-gray-500">
								Doloribus dolores nostrum quia qui natus officia quod et dolorem. Sit repellendus qui ut at blanditiis et quo et molestiae.
								</p>
							</div>
							<span class="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400" aria-hidden="true">
								<svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
								<path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
								</svg>
							</span>
							</div>
						</div>
						</section>
					</div>

					<!-- Right column -->
					<div class="grid grid-cols-1 gap-4">
						<!-- Announcements -->
						<section aria-labelledby="announcements-title">
						<div class="rounded-lg bg-white overflow-hidden shadow">
							<div class="p-6">
							<h2 class="text-base font-medium text-gray-900" id="announcements-title">Announcements</h2>
							<div class="flow-root mt-6">
								<ul role="list" class="-my-5 divide-y divide-gray-200">
								<li v-for="announcement in announcements" :key="announcement.id" class="py-5">
									<div class="relative focus-within:ring-2 focus-within:ring-cyan-500">
									<h3 class="text-sm font-semibold text-gray-800">
										<a :href="announcement.href" class="hover:underline focus:outline-none">
										<!-- Extend touch target to entire panel -->
										<span class="absolute inset-0" aria-hidden="true" />
										{{ announcement.title }}
										</a>
									</h3>
									<p class="mt-1 text-sm text-gray-600 line-clamp-2">
										{{ announcement.preview }}
									</p>
									</div>
								</li>
								</ul>
							</div>
							<div class="mt-6">
								<a href="#" class="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
								View all
								</a>
							</div>
							</div>
						</div>
						</section>

						<!-- Recent Hires -->
						<section aria-labelledby="recent-hires-title">
						<div class="rounded-lg bg-white overflow-hidden shadow">
							<div class="p-6">
							<h2 class="text-base font-medium text-gray-900" id="recent-hires-title">Recent Hires</h2>
							<div class="flow-root mt-6">
								<ul role="list" class="-my-5 divide-y divide-gray-200">
								<li v-for="person in recentHires" :key="person.handle" class="py-4">
									<div class="flex items-center space-x-4">
									<div class="flex-shrink-0">
										<img class="h-8 w-8 rounded-full" :src="person.imageUrl" alt="" />
									</div>
									<div class="flex-1 min-w-0">
										<p class="text-sm font-medium text-gray-900 truncate">
										{{ person.name }}
										</p>
										<p class="text-sm text-gray-500 truncate">
										{{ '@' + person.handle }}
										</p>
									</div>
									<div>
										<a :href="person.href" class="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50">
										View
										</a>
									</div>
									</div>
								</li>
								</ul>
							</div>
							<div class="mt-6">
								<a href="#" class="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
								View all
								</a>
							</div>
							</div>
						</div>
						</section>
					</div>
					</div>
				</div>
			</div>
		</main>
	</template>
</div>

</template>

<script>
// API
import eventApi from '@/api/event';

// Components
import SkeletonPage from '@/components/loader/SkeletonPage.vue';

import {
	AcademicCapIcon,
	BadgeCheckIcon,
	CashIcon,
	ClockIcon,
	ReceiptRefundIcon,
	UsersIcon,
	ArrowLeftIcon,
} from '@heroicons/vue/outline'

const user = {
	name: 'Chelsea Hagon',
	email: 'chelseahagon@example.com',
	role: 'Human Resources Manager',
	imageUrl:
		'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
};
const stats = [
	{ label: 'Participants', value: 12 },
	{ label: 'Registered', value: 4 },
	{ label: 'Verified', value: 4 },
];
const actions = [
	{
		icon: UsersIcon,
		name: 'Participants',
		href: '#',
		iconForeground: 'text-teal-700',
		iconBackground: 'bg-teal-50',
	},
	{
		icon: BadgeCheckIcon,
		name: 'Interactive',
		href: '#',
		iconForeground: 'text-purple-700',
		iconBackground: 'bg-purple-50',
	},
	{
		icon: UsersIcon,
		name: 'Schedules',
		href: '#',
		iconForeground: 'text-sky-700',
		iconBackground: 'bg-sky-50',
	},
	{ 
		icon: CashIcon,
		name: 'Marketing',
		href: '#',
		iconForeground: 'text-yellow-700',
		iconBackground: 'bg-yellow-50'
	},
	{
		icon: ReceiptRefundIcon,
		name: 'Custom Site',
		href: '#',
		iconForeground: 'text-rose-700',
		iconBackground: 'bg-rose-50',
	},
	{
		icon: AcademicCapIcon,
		name: 'Announcements',
		href: '#',
		iconForeground: 'text-indigo-700',
		iconBackground: 'bg-indigo-50',
	},
];
const recentHires = [
	{
		name: 'Leonard Krasner',
		handle: 'leonardkrasner',
		imageUrl:
		'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
		href: '#',
	},
	{
		name: 'Floyd Miles',
		handle: 'floydmiles',
		imageUrl:
		'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
		href: '#',
	},
	{
		name: 'Emily Selman',
		handle: 'emilyselman',
		imageUrl:
		'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
		href: '#',
	},
	{
		name: 'Kristin Watson',
		handle: 'kristinwatson',
		imageUrl:
		'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
		href: '#',
	},
]
const announcements = [
	{
		id: 1,
		title: 'Office closed on July 2nd',
		href: '#',
		preview:
		'Cum qui rem deleniti. Suscipit in dolor veritatis sequi aut. Vero ut earum quis deleniti. Ut a sunt eum cum ut repudiandae possimus. Nihil ex tempora neque cum consectetur dolores.',
	},
	{
		id: 2,
		title: 'New password policy',
		href: '#',
		preview:
		'Alias inventore ut autem optio voluptas et repellendus. Facere totam quaerat quam quo laudantium cumque eaque excepturi vel. Accusamus maxime ipsam reprehenderit rerum id repellendus rerum. Culpa cum vel natus. Est sit autem mollitia.',
	},
	{
		id: 3,
		title: 'Office closed on July 2nd',
		href: '#',
		preview:
		'Tenetur libero voluptatem rerum occaecati qui est molestiae exercitationem. Voluptate quisquam iure assumenda consequatur ex et recusandae. Alias consectetur voluptatibus. Accusamus a ab dicta et. Consequatur quis dignissimos voluptatem nisi.',
	},
]

export default {
	components: {
		ArrowLeftIcon,
		AcademicCapIcon,
		BadgeCheckIcon,
		CashIcon,
		ClockIcon,
		ReceiptRefundIcon,
		UsersIcon,
		SkeletonPage,
	},
	data() {
		return {
			isFetching: false,
			item: null,
			user,
			stats,
			actions,
			recentHires,
			announcements,
		}
	},
	mounted() {
		this.fetch();
	},
	watch: {},
	computed: {
		slug() {
			return this.$route.params.slug;
		},
	},
	methods: {
		fetch() {
			this.isFetching = true;
			const params = {};
			const callback = (response) => {
				const data = response.data;
				this.item = data;
				console.log('this.item', this.item);
				this.isFetching = false;
			};
			const errorCallback = (error) => {
				const message = error.response.data.message;
				this.__showNotif('error', 'Error', message);
				this.isFetching = false;
			};
			eventApi.getBySlug(this.slug, callback, errorCallback);
		},
		goToIndex() {
			this.$router.push(`/events`);
		},
		goBack() {
			this.$router.go(-1);
		},
	},
}
</script>