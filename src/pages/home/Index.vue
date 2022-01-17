<template>
<div class="max-w-7xl mx-auto py-8 px-4 sm:px-6 md:px-8">

    <!-- Recent events -->
    <recent />
</div>
</template>

<script>
import { ArrowSmDownIcon, ArrowSmUpIcon } from '@heroicons/vue/solid'
import EmptyList from '@/components/global/EmptyList.vue';
import Recent from '@/components/events/Recent.vue';

export default {
    components: {
        ArrowSmDownIcon,
        ArrowSmUpIcon,
        EmptyList,
        Recent,
    },
    data() {
        return {
            isFetching: false,
        }
    },
    mounted() {
    },
}
</script>