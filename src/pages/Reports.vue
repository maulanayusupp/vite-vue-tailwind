<template>
<div class="max-w-7xl mx-auto py-8 px-4 sm:px-6 md:px-8">
    <div>
        <h1 class="text-2xl font-semibold text-gray-900">Reports</h1>
    </div>

    <!-- Stats -->
    <div>
        <dl class="mt-5 grid grid-cols-1 rounded-lg bg-white overflow-hidden shadow divide-y divide-gray-200 md:grid-cols-3 md:divide-y-0 md:divide-x">
        <div v-for="item in stats" :key="item.name" class="px-4 py-5 sm:p-6">
            <dt class="text-base font-normal text-gray-900">
            {{ item.name }}
            </dt>
            <dd class="mt-1 flex justify-between items-baseline md:block lg:flex">
            <div class="flex items-baseline text-2xl font-semibold text-indigo-600">
                {{ item.stat }}
                <span class="ml-2 text-sm font-medium text-gray-500"> from {{ item.previousStat }} </span>
            </div>

            <div :class="[item.changeType === 'increase' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800', 'inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium md:mt-2 lg:mt-0']">
                <ArrowSmUpIcon v-if="item.changeType === 'increase'" class="-ml-1 mr-0.5 flex-shrink-0 self-center h-5 w-5 text-green-500" aria-hidden="true" />
                <ArrowSmDownIcon v-else class="-ml-1 mr-0.5 flex-shrink-0 self-center h-5 w-5 text-red-500" aria-hidden="true" />
                <span class="sr-only"> {{ item.changeType === 'increase' ? 'Increased' : 'Decreased' }} by </span>
                {{ item.change }}
            </div>
            </dd>
        </div>
        </dl>
    </div>

    <!-- List -->
    <div class="mt-8">
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
                                Amount
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
                                <tr class="bg-white" v-for="(item, index) in 7" :key="index">
                                    <td class="max-w-0 w-full px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    <div class="flex">
                                    <a href="#" class="group inline-flex space-x-2 truncate text-sm">
                                    <!-- Heroicon name: solid/cash -->
                                    <svg class="flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                                    </svg>
                                    <p class="text-gray-500 truncate group-hover:text-gray-900">
                                        Payment to Molly Sanders
                                    </p>
                                    </a>
                                    </div>
                                    </td>
                                    <td class="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                                    <span class="text-gray-900 font-medium">$20,000 </span>
                                    USD
                                    </td>
                                    <td class="hidden px-6 py-4 whitespace-nowrap text-sm text-gray-500 md:block">
                                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 capitalize">
                                    success
                                    </span>
                                    </td>
                                    <td class="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                                    <time datetime="2020-07-11">July 11, 2020</time>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Pagination -->
                <nav class="border-t border-gray-200 px-4 flex items-center justify-between sm:px-0" aria-label="Pagination">
                    <div class="-mt-px w-0 flex-1 flex">
                        <a href="#" class="border-t-2 border-transparent pt-4 pr-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-200">
                        <ArrowNarrowLeftIcon class="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                        Previous
                        </a>
                    </div>
                    <div class="hidden md:-mt-px md:flex">
                        <a href="#" class="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium">
                        1
                        </a>
                        <!-- Current: "border-purple-500 text-purple-600", Default: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200" -->
                        <a href="#" class="border-purple-500 text-purple-600 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium" aria-current="page">
                        2
                        </a>
                        <a href="#" class="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium">
                        3
                        </a>
                        <a href="#" class="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium">
                        4
                        </a>
                        <a href="#" class="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium">
                        5
                        </a>
                        <a href="#" class="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium">
                        6
                        </a>
                    </div>
                    <div class="-mt-px w-0 flex-1 flex justify-end">
                        <a href="#" class="border-t-2 border-transparent pt-4 pl-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-200">
                        Next
                        <ArrowNarrowRightIcon class="ml-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                        </a>
                    </div>
                </nav>
            </div>
        </div>		
    </div>
</div>
</template>

<script>
import { ArrowSmDownIcon, ArrowSmUpIcon } from '@heroicons/vue/solid'

const stats = [
    { name: 'Total Subscribers', stat: '71,897', previousStat: '70,946', change: '12%', changeType: 'increase' },
    { name: 'Avg. Open Rate', stat: '58.16%', previousStat: '56.14%', change: '2.02%', changeType: 'increase' },
    { name: 'Avg. Click Rate', stat: '24.57%', previousStat: '28.62%', change: '4.05%', changeType: 'decrease' },
]

export default {
    components: {
        ArrowSmDownIcon,
        ArrowSmUpIcon,
    },
    setup() {
        return {
        stats,
        }
    },
}
</script>