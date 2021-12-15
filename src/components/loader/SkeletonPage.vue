<template>
	<div class="w-full space-y-4">
		<skeleton-box v-for="(item, index) in 5" :key="index" />
	</div>
</template>

<script>
import SkeletonBox from '@/components/loader/SkeletonBox.vue';
export default {
	components: {
		SkeletonBox,
	},
	data() {
		return {
		}
	},
	created() {},
	mounted() {},
	beforeUnmount() {},
	methods: {},
	computed: {},
	watch: {},
}
</script>