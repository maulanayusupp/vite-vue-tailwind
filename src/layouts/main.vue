<template>
	<div class="h-screen flex overflow-hidden bg-gray-100">
		<!-- Left navigation drawer -->
		<left-navigation-drawer />

		<!-- Static sidebar for desktop -->
		<left-sidebar />

		<!-- Body -->
		<div class="flex flex-col w-0 flex-1 overflow-hidden">
			<!-- Top navigation -->
			<top-navigation />

			<main class="flex-1 relative overflow-y-auto focus:outline-none">
				<div class="py-6 max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
					<router-view v-slot="{ Component }">
						<!-- <transition name="slide"> -->
						<component :is="Component" />
						<!-- </transition> -->
					</router-view>
				</div>
			</main>
		</div>
	</div>
</template>

<script>
import LeftNavigationDrawer from '@/layouts/partials/LeftNavigationDrawer.vue';
import LeftSidebar from '@/layouts/partials/LeftSidebar.vue';
import TopNavigation from '@/layouts/partials/TopNavigation.vue';

export default {
	components: {
		LeftNavigationDrawer,
		LeftSidebar,
		TopNavigation,
	},
	setup() {
	},
}
</script>