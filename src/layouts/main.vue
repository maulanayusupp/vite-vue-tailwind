<template>
	<div class="h-screen flex overflow-hidden bg-gray-100" id="main-view">
		<!-- Left navigation drawer -->
		<left-navigation-drawer />

		<!-- Static sidebar for desktop -->
		<!-- <left-sidebar /> -->

		<!-- Body -->
		<div class="flex flex-col w-0 flex-1 overflow-hidden">
			<!-- Top navigation -->
			<!-- <top-navigation /> -->
			<top-navigation-new />

			<main
				ref="mainView"
				class="flex-1 relative overflow-y-auto focus:outline-none">
				<div>
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
import TopNavigationNew from '@/layouts/partials/TopNavigationNew.vue';

export default {
	components: {
		LeftNavigationDrawer,
		LeftSidebar,
		TopNavigation,
		TopNavigationNew,
	},
	setup() {
	},
	watch: {
		$route (to, from) {
			this.scrollDown();
		},
	},
	methods: {
		scrollDown() {
            const objDiv = this.$refs.mainView;
			// Scroll top div
            objDiv.scrollTop = 0;

			// Scroll bottom of div
            // objDiv.scrollTop = objDiv.scrollHeight;
        },
	},
}
</script>