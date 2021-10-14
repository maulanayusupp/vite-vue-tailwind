<template>
<div class="h-screen flex overflow-hidden bg-gray-100">
	<main class="flex-1 relative overflow-y-auto focus:outline-none">
		<div>
			<router-view v-slot="{ Component }">
				<!-- <transition name="slide"> -->
				<component :is="Component" />
				<!-- </transition> -->
			</router-view>
		</div>
	</main>
</div>
</template>

<script>

export default {
	components: {
	},
	setup() {
	},
}
</script>