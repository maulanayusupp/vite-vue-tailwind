<template>
<div class="max-w-7xl mx-auto py-8 px-4 sm:px-6 md:px-8">
    <div class="space-y-8">
        <!-- Stats -->
        <div>
            <h3 class="text-lg leading-6 font-medium text-gray-900">
            Last 30 days
            </h3>
            <dl class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
            <div v-for="item in stats" :key="item.name" class="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
                <dt class="text-sm font-medium text-gray-500 truncate">
                {{ item.name }}
                </dt>
                <dd class="mt-1 text-3xl font-semibold text-gray-900">
                {{ item.stat }}
                </dd>
            </div>
            </dl>
        </div>

        <!-- Stats -->
        <div>
            <h3 class="text-lg leading-6 font-medium text-gray-900">
            Last 30 days
            </h3>

            <dl class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <div v-for="item in stats" :key="item.id" class="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden">
                <dt>
                <div class="absolute bg-indigo-500 rounded-md p-3">
                    <component :is="item.icon" class="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <p class="ml-16 text-sm font-medium text-gray-500 truncate">{{ item.name }}</p>
                </dt>
                <dd class="ml-16 pb-6 flex items-baseline sm:pb-7">
                <p class="text-2xl font-semibold text-gray-900">
                    {{ item.stat }}
                </p>
                <p :class="[item.changeType === 'increase' ? 'text-green-600' : 'text-red-600', 'ml-2 flex items-baseline text-sm font-semibold']">
                    <ArrowSmUpIcon v-if="item.changeType === 'increase'" class="self-center flex-shrink-0 h-5 w-5 text-green-500" aria-hidden="true" />
                    <ArrowSmDownIcon v-else class="self-center flex-shrink-0 h-5 w-5 text-red-500" aria-hidden="true" />
                    <span class="sr-only"> {{ item.changeType === 'increase' ? 'Increased' : 'Decreased' }} by </span>
                    {{ item.change }}
                </p>
                <div class="absolute bottom-0 inset-x-0 bg-gray-50 px-4 py-4 sm:px-6">
                    <div class="text-sm">
                    <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">
                        View all<span class="sr-only"> {{ item.name }} stats</span></a
                    >
                    </div>
                </div>
                </dd>
            </div>
            </dl>
        </div>

        <!-- Stats -->
        <div>
            <h3 class="text-lg leading-6 font-medium text-gray-900">
            Last 30 days
            </h3>
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
    mounted() {
    },
}
</script>