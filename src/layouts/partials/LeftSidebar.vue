<template>
	<div class="hidden md:flex md:flex-shrink-0">
		<div class="flex flex-col w-64">
			<!-- Sidebar component, swap this element with another sidebar if you like -->
			<div class="flex flex-col flex-grow border-r border-gray-200 pt-5 pb-4 bg-white overflow-y-auto">
			<div class="flex items-center flex-shrink-0 px-4">
				<img class="h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-800-text.svg" alt="Workflow" />
			</div>
			<div class="mt-5 flex-grow flex flex-col">
				<nav class="flex-1 px-2 bg-white">
          <div class="space-y-1">
            <router-link
              v-for="item in MainMenuItems"
              :to="item.href"
              :key="item.name"
              :class="[isActive(item.href) ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900']"
              class="group flex items-center px-2 py-2 text-sm font-medium rounded-md">
                <component
                  :is="item.icon"
                  :class="[isActive(item.href) ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500']"
                  class="mr-3 flex-shrink-0 h-6 w-6"
                  aria-hidden="true"
                />
                {{ item.name }}
            </router-link>
          </div>

          <div class="mt-8">
            <h3 class="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider" id="projects-headline">
              Others
            </h3>
            <div class="mt-1 space-y-1" aria-labelledby="projects-headline">
              <router-link
                v-for="item in SecondaryMenuItems"
                :key="item.name"
                :to="item.href"
                :class="[isActive(item.href) ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900']"
                class="group flex items-center px-2 py-2 text-sm font-medium rounded-md">
                <span class="truncate">
                  {{ item.name }}
                </span>
              </router-link>
            </div>
          </div>
				</nav>
			</div>
			</div>
		</div>
    </div>
</template>

<script>
import { ref } from 'vue';
import MainMenuItems from "@/databags/main-menu.js";
import SecondaryMenuItems from "@/databags/secondary-menu.js";
export default {
  components: {
  },
  setup() {
    return {
    }
  },
  data(){
    return {
      MainMenuItems,
      SecondaryMenuItems,
    }
  },
  methods: {
    isActive(string) {
      let isActive = false;
      if (string === '/') isActive = this.$route.path === string;
      else if (string !== '/') isActive = window.location.href.indexOf(string) > -1;
      return isActive;
    },
  },
}
</script>