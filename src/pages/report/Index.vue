<template>
<div class="relative min-h-screen">
    <!-- Page heading -->
	<header class="py-4 mt-6">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:flex xl:items-center xl:justify-between">
			<div class="flex-1 min-w-0">
				<h1 class="text-2xl font-semibold text-gray-900 sm:truncate">
					Reports
				</h1>
			</div>
		</div>
	</header>

    <div class="text-center mx-auto max-w-0" v-if="isFetching">
		<circle-loader />
	</div>

    <main class="pb-16" v-if="!isFetching">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="space-y-8">

                <!-- Stats -->
                <div>

                    <dl class="mt-5 grid grid-cols-2 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        <!-- Total User -->
                        <div
                            class="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden">
                            <dt>
                                <div class="absolute bg-indigo-500 rounded-md p-3 h-6 w-6">
                                </div>
                                <p class="ml-16 text-sm font-medium text-gray-500 truncate">Total User</p>
                            </dt>
                            <dd class="ml-16 flex items-baseline sm:pb-5">
                                <p class="text-2xl font-semibold text-gray-900">{{ statistics.total_user }}</p>
                                <p>
                                    <ArrowSmUpIcon class="self-center flex-shrink-0 h-5 w-5 text-green-500" aria-hidden="true" />
                                </p>
                                <div class="absolute bottom-0 inset-x-0 bg-gray-50 px-4 py-4 sm:px-6 text-right">
                                    <div class="text-sm">
                                        <router-link
                                            to="/users"
                                            class="font-medium text-indigo-600 hover:text-indigo-500">
                                            View all<span class="sr-only"> Total User stats</span>
                                        </router-link>
                                    </div>
                                </div>
                            </dd>
                        </div>

                        <!-- Total Event -->
                        <div
                            class="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden">
                            <dt>
                                <div class="absolute bg-indigo-500 rounded-md p-3 h-6 w-6">
                                </div>
                                <p class="ml-16 text-sm font-medium text-gray-500 truncate">Total Event</p>
                            </dt>
                            <dd class="ml-16 flex items-baseline sm:pb-5">
                                <p class="text-2xl font-semibold text-gray-900">{{ statistics.total_event }}</p>
                                <p>
                                    <ArrowSmUpIcon class="self-center flex-shrink-0 h-5 w-5 text-green-500" aria-hidden="true" />
                                </p>
                                <div class="absolute bottom-0 inset-x-0 bg-gray-50 px-4 py-4 sm:px-6 text-right">
                                    <div class="text-sm">
                                        <router-link
                                            to="/events"
                                            class="font-medium text-indigo-600 hover:text-indigo-500">
                                            View all<span class="sr-only"> Total User stats</span>
                                        </router-link>
                                    </div>
                                </div>
                            </dd>
                        </div>

                        <!-- Total Category -->
                        <div
                            class="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden">
                            <dt>
                                <div class="absolute bg-indigo-500 rounded-md p-3 h-6 w-6">
                                </div>
                                <p class="ml-16 text-sm font-medium text-gray-500 truncate">Total Category</p>
                            </dt>
                            <dd class="ml-16 flex items-baseline sm:pb-5">
                                <p class="text-2xl font-semibold text-gray-900">{{ statistics.total_category }}</p>
                                <p>
                                    <ArrowSmUpIcon class="self-center flex-shrink-0 h-5 w-5 text-green-500" aria-hidden="true" />
                                </p>
                                <div class="absolute bottom-0 inset-x-0 bg-gray-50 px-4 py-4 sm:px-6 text-right">
                                    <div class="text-sm">
                                        <router-link
                                            to="/categories"
                                            class="font-medium text-indigo-600 hover:text-indigo-500">
                                            View all<span class="sr-only"> Total User stats</span>
                                        </router-link>
                                    </div>
                                </div>
                            </dd>
                        </div>

                        <!-- Total Tag -->
                        <div
                            class="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden">
                            <dt>
                                <div class="absolute bg-indigo-500 rounded-md p-3 h-6 w-6">
                                </div>
                                <p class="ml-16 text-sm font-medium text-gray-500 truncate">Total Tag</p>
                            </dt>
                            <dd class="ml-16 flex items-baseline sm:pb-5">
                                <p class="text-2xl font-semibold text-gray-900">{{ statistics.total_tag }}</p>
                                <p>
                                    <ArrowSmUpIcon class="self-center flex-shrink-0 h-5 w-5 text-green-500" aria-hidden="true" />
                                </p>
                                <div class="absolute bottom-0 inset-x-0 bg-gray-50 px-4 py-4 sm:px-6 text-right">
                                    <div class="text-sm">
                                        <router-link
                                            to="/tags"
                                            class="font-medium text-indigo-600 hover:text-indigo-500">
                                            View all<span class="sr-only"> Total User stats</span>
                                        </router-link>
                                    </div>
                                </div>
                            </dd>
                        </div>

                        <!-- Total Group -->
                        <div
                            class="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden">
                            <dt>
                                <div class="absolute bg-indigo-500 rounded-md p-3 h-6 w-6">
                                </div>
                                <p class="ml-16 text-sm font-medium text-gray-500 truncate">Total Group</p>
                            </dt>
                            <dd class="ml-16 flex items-baseline sm:pb-5">
                                <p class="text-2xl font-semibold text-gray-900">{{ statistics.total_group }}</p>
                                <p>
                                    <ArrowSmUpIcon class="self-center flex-shrink-0 h-5 w-5 text-green-500" aria-hidden="true" />
                                </p>
                                <div class="absolute bottom-0 inset-x-0 bg-gray-50 px-4 py-4 sm:px-6 text-right">
                                    <div class="text-sm">
                                        <router-link
                                            to="/groups"
                                            class="font-medium text-indigo-600 hover:text-indigo-500">
                                            View all<span class="sr-only"> Total User stats</span>
                                        </router-link>
                                    </div>
                                </div>
                            </dd>
                        </div>

                        <!-- Total Contact -->
                        <div
                            class="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden">
                            <dt>
                                <div class="absolute bg-indigo-500 rounded-md p-3 h-6 w-6">
                                </div>
                                <p class="ml-16 text-sm font-medium text-gray-500 truncate">Total Contact</p>
                            </dt>
                            <dd class="ml-16 flex items-baseline sm:pb-5">
                                <p class="text-2xl font-semibold text-gray-900">{{ statistics.total_contact }}</p>
                                <p>
                                    <ArrowSmUpIcon class="self-center flex-shrink-0 h-5 w-5 text-green-500" aria-hidden="true" />
                                </p>
                                <div class="absolute bottom-0 inset-x-0 bg-gray-50 px-4 py-4 sm:px-6 text-right">
                                    <div class="text-sm">
                                        <router-link
                                            to="/contacts"
                                            class="font-medium text-indigo-600 hover:text-indigo-500">
                                            View all<span class="sr-only"> Total User stats</span>
                                        </router-link>
                                    </div>
                                </div>
                            </dd>
                        </div>

                        <!-- Total Feedback -->
                        <div
                            class="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden">
                            <dt>
                                <div class="absolute bg-indigo-500 rounded-md p-3 h-6 w-6">
                                </div>
                                <p class="ml-16 text-sm font-medium text-gray-500 truncate">Total Feedback</p>
                            </dt>
                            <dd class="ml-16 flex items-baseline sm:pb-5">
                                <p class="text-2xl font-semibold text-gray-900">{{ statistics.total_feedback }}</p>
                                <p>
                                    <ArrowSmUpIcon class="self-center flex-shrink-0 h-5 w-5 text-green-500" aria-hidden="true" />
                                </p>
                                <div class="absolute bottom-0 inset-x-0 bg-gray-50 px-4 py-4 sm:px-6 text-right">
                                    <div class="text-sm">
                                        <router-link
                                            to="/feedbacks"
                                            class="font-medium text-indigo-600 hover:text-indigo-500">
                                            View all<span class="sr-only"> Total User stats</span>
                                        </router-link>
                                    </div>
                                </div>
                            </dd>
                        </div>
                        
                        <!-- Total Subscription -->
                        <div
                            class="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden">
                            <dt>
                                <div class="absolute bg-indigo-500 rounded-md p-3 h-6 w-6">
                                </div>
                                <p class="ml-16 text-sm font-medium text-gray-500 truncate">Total Subscription</p>
                            </dt>
                            <dd class="ml-16 flex items-baseline sm:pb-5">
                                <p class="text-2xl font-semibold text-gray-900">{{ statistics.total_subscription }}</p>
                                <p>
                                    <ArrowSmUpIcon class="self-center flex-shrink-0 h-5 w-5 text-green-500" aria-hidden="true" />
                                </p>
                                <div class="absolute bottom-0 inset-x-0 bg-gray-50 px-4 py-4 sm:px-6 text-right">
                                    <div class="text-sm">
                                        <router-link
                                            to="/users"
                                            class="font-medium text-indigo-600 hover:text-indigo-500">
                                            View all<span class="sr-only"> Total User stats</span>
                                        </router-link>
                                    </div>
                                </div>
                            </dd>
                        </div>

                    </dl>
                </div>
            </div>

            <!-- List -->
            <div class="mt-8">
                <h3 class="text-lg leading-6 font-medium text-gray-900">Last subscriptions in last 7 days</h3>
                <div class="block">
                    <div class="mx-auto">
                        <div class="flex flex-col mt-2">
                            <div class="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg">
                                <!-- Table -->
                                <table class="min-w-full divide-y divide-gray-200">
                                    <thead>
                                    <tr>
                                        <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Transaction
                                        </th>
                                        <th class="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Price
                                        </th>
                                        <th class="hidden px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider md:block">
                                            Status
                                        </th>
                                        <th class="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Date
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody class="bg-white divide-y divide-gray-200">
                                        <tr class="bg-white" v-for="(item, index) in 5" :key="index">
                                            <td class="max-w-0 w-full px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                <div class="flex">
                                                <a href="#" class="group inline-flex space-x-2 truncate text-sm">
                                                    <!-- Heroicon name: solid/cash -->
                                                    <svg class="flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                        <path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                                                    </svg>
                                                    <p class="text-gray-500 truncate group-hover:text-gray-900">
                                                        Subscribe to Premium Package {{ index+1 }} month{{ index > 0 ? 's' : '' }}
                                                    </p>
                                                </a>
                                                </div>
                                            </td>
                                            <td class="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                                                <span class="text-gray-900 font-medium">$20,000 </span> USD
                                            </td>
                                            <td class="hidden px-6 py-4 whitespace-nowrap text-sm text-gray-500 md:block">
                                                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 capitalize">
                                                success
                                                </span>
                                            </td>
                                            <td class="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                                                <time datetime="2020-07-11">January 11, 2022</time>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>
                </div>		
            </div>
        </div>
    </main>
</div>
</template>

<script>
import reportApi from '@/api/report';
import { ArrowSmDownIcon, ArrowSmUpIcon } from '@heroicons/vue/solid'
import CircleLoader from '@/components/loader/CircleLoader.vue';

const stats = [
    { name: 'Total Subscribers', stat: '71,897', previousStat: '70,946', change: '12%', changeType: 'increase' },
    { name: 'Avg. Open Rate', stat: '58.16%', previousStat: '56.14%', change: '2.02%', changeType: 'increase' },
    { name: 'Avg. Click Rate', stat: '24.57%', previousStat: '28.62%', change: '4.05%', changeType: 'decrease' },
]

export default {
    components: {
        ArrowSmDownIcon,
        ArrowSmUpIcon,
        CircleLoader,
    },
    data() {
        return {
            isFetching: false,
            stats,
            statistics: {},
        }
    },
    mounted() {
        this.fetchStat();
    },
    methods: {
		fetchStat() {
			this.isFetching = true;
			const params = {};
			const callback = (response) => {
				this.statistics = response;
				this.isFetching = false;
			};
			const errorCallback = (error) => {
				const message = error.response.data.message;
				this.__showNotif('error', 'Error', message);
				this.isFetching = false;
			};
			reportApi.getStatistic(params, callback, errorCallback);
		},
	}
}
</script>