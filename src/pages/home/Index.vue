<template>
<div class="max-w-7xl mx-auto py-8 px-4 sm:px-6 md:px-8">
<<<<<<< HEAD
    <!-- Header -->
    <div class="flex justify-between pt-2 pb-4">
        <div class="text-2xl font-semibold mb-2">Hello</div>
        <div>
            <t-button :type="'button'" :color="`purple-solid`" class="mb-2" @click="showCreator">
                <PlusIcon class="h-6 w-6 text-white mr-3" aria-hidden="true" /> Create a event
            </t-button>
        </div>
    </div>

    <!-- Recent events -->
    <recent />

    <div class="grid grid-cols-2 gap-6 my-8">
        <!-- recent one -->
        <div class="">
            <div class="bg-white min-h-[201px] px-10 shadow-sm text-left rounded-lg border border-[#9C9C9C]-400">
                <p class="mt-5 flex font-light items-center text-sm text-gray-400">
                    <CheckCircleIcon class="flex-shrink-0 ml-[-20px] mr-2 h-6 w-6 text-gray-400" aria-hidden="true" />
                    Your last event from 
                </p>
                <div class="align-middle inline-block mt-4 mb-6 ml-2">
                    <!-- last projects -->
                    <div class="sm:flex">
                        <div class="mb-4 flex-shrink-0 sm:mb-0 sm:mr-4 h-12">
                            <div class="flex-shrink-0">
								<!-- <img class="h-10 w-10 group-hover:opacity-75" :src="element.icon" alt="" v-if="element.icon" /> -->
								<img class="h-12 group-hover:opacity-75" :src="`https://images.unsplash.com/photo-1563982277846-1299eec465d3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80`" alt="" />
							</div>
                        </div>
                        <div>
                            <p class="mb-2 font-semibold text-sm">
                                First premiere launching product
                            </p>
                            <p class="mt-1 mb-2 text-sm">
                                The best awarding in the world
                            </p>
                        </div>
                    </div>
                    <div class="mt-4">
                        <t-button :type="'submit'" :color="`purple-solid`" class="w-28 mr-3">
                            Open
                        </t-button>
                        <t-button :type="'submit'" :color="`default-solid`" class="w-28 mr-3">
                            Duplicate
                        </t-button>
                        <t-button :type="'submit'" :color="`default-solid`" class="w-28">
                            Highlights
                        </t-button>
                    </div>
                </div>
            </div>
        </div>

        <!-- credit -->
        <div class="">
            <div class="bg-white min-h-[201px] px-10 shadow-sm text-left rounded-lg border border-[#9C9C9C]-400">
                <p class="mt-5 flex font-light items-center text-sm text-gray-400">
                    <CheckCircleIcon class="flex-shrink-0 ml-[-20px] mr-2 h-6 w-6 text-gray-400" aria-hidden="true" />
                    My Plan
                </p>
                <div class="align-middle inline-block mt-4 mb-6 ml-3">
                    <div class="font-semibold text-2xl mb-4">Exclusive Pro Premiere</div>
                    <div class="text-gray-400 text-sm">Active till 20 Dec 2022</div>
                    <div class="text-sm"><router-link to="/" class="text-blue-600"> Upgrade account </router-link></div>
                </div>
            </div>
        </div>

        <!-- your last project -->
        <div class="">
            <div class="bg-white min-h-[201px] px-10 shadow-sm text-left rounded-lg border border-[#9C9C9C]-400">
                <div class="flex justify-between">
                    <p class="mt-5 flex font-light items-center text-sm text-gray-400">
                        <CheckCircleIcon class="flex-shrink-0 ml-[-20px] mr-2 h-6 w-6 text-gray-400" aria-hidden="true" />
                        Your latest project
                    </p>
                    <p class="mt-5 flex font-light items-center text-sm text-gray-400">
                        See all
                    </p>
                </div>
                <div class="align-middle inline-block mt-4 mb-6 ml-3">
                    <div class="text-sm"><router-link to="/" class="text-blue-600"> My Awesome Project </router-link></div>
                </div>
            </div>
        </div>

        <!-- latest highlights -->
        <div class="">
            <div class="bg-white min-h-[201px] px-10 shadow-sm text-left rounded-lg border border-[#9C9C9C]-400">
                <p class="mt-5 flex font-light items-center text-sm text-gray-400">
                    <CheckCircleIcon class="flex-shrink-0 ml-[-20px] mr-2 h-6 w-6 text-gray-400" aria-hidden="true" />
                    Best highlights
                </p>
                <div class="align-middle inline-block mt-4 mb-6 ml-3">
                    <div class="text-sm"><router-link to="/" class="text-blue-600"> My Awesome Project </router-link></div>
                </div>
            </div>
        </div>
    </div>
    
    <!-- need help -->
    <div class="mb-6">
        <div class="flex items-center justify-between mb-3 mt-4">
            <div class="flex">
                <div class="text-lg pt-1 font-semibold mb-4">Need help with it?</div>
                <div class="text-sm pt-2 ml-3 text-gray-400 font-light"> or anything that can speed up your task completion </div>
            </div>
            <t-button :type="'button'" :color="`purple-solid`">
                Get Support
            </t-button>
        </div>
        <div class="pb-0">
            <div class="bg-white min-h-20 mb-5 px-10 shadow-sm text-left rounded-lg border border-[#9C9C9C]-400">
                <div class="align-middle inline-block mt-6 mb-6 w-full">
                    <div class="text-lg pt-1 font-semibold mb-2">Quickstart</div>
                    <div class="grid grid-cols-2 md:grid-cols-3">
                        <div class="mb-4">
                            <div class="space-y-2">
                                <div class="text-sm"><router-link to="/"> Etiam sit amet lectus ut justo </router-link></div>
                                <div class="text-sm"><router-link to="/"> Curabitur a lacus pulvinar  </router-link></div>
                                <div class="text-sm"><router-link to="/"> Mauris tempor lectus egestas </router-link></div>
                            </div>
                        </div>
                        <div class="mb-4">
                            <div class="space-y-2">
                                <div class="text-sm"><router-link to="/"> Mauris tempor lectus egestas </router-link></div>
                                <div class="text-sm"><router-link to="/"> Curabitur a lacus pulvinar  </router-link></div>
                                <div class="text-sm"><router-link to="/"> Etiam sit amet lectus ut justo </router-link></div>
                            </div>
                        </div>
                        <div class="mb-4">
                            <div class="space-y-2">
                                <div class="text-sm"><router-link to="/"> Etiam sit amet lectus ut justo </router-link></div>
                                <div class="text-sm"><router-link to="/"> Mauris tempor lectus egestas </router-link></div>
                                <div class="text-sm"><router-link to="/"> Curabitur a lacus pulvinar  </router-link></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Modal - Creator -->
<t-modal
	:max-width-class="`max-w-lg`"
	:is-show="isShowCreator"
	@onClose="closeCreator">
	<div class="sm:flex sm:items-start">
		<div class="mt-3 sm:mt-0 sm:ml-4 sm:text-left w-full">
			<div class="flex justify-between items-center">
				<div as="h3" class="text-lg leading-6 font-medium text-gray-900">
					Create Event
				</div>
				<div>
					<XCircleIcon class="w-6 h-6 text-gray-400 cursor-pointer" aria-hidden="true" @click="closeCreator" />
				</div>
			</div>

			<div class="mt-2">
				<event-creator
					:item="selected"
					@onClose="closeCreator"
				/>
			</div>
		</div>
	</div>
</t-modal>
</template>

<script>
import { ArrowSmDownIcon, ArrowSmUpIcon, CheckCircleIcon, PlusIcon, XCircleIcon } from '@heroicons/vue/solid';
import EmptyList from '@/components/global/EmptyList.vue';
import Recent from '@/components/events/Recent.vue';
import TButton from '@/components/global/Button.vue';
import TModal from '@/components/global/Modal.vue';
import EventCreator from '@/components/events/EventCreator.vue';
=======

    <!-- Recent events -->
    <recent />
</div>
</template>

<script>
import { ArrowSmDownIcon, ArrowSmUpIcon } from '@heroicons/vue/solid'
import EmptyList from '@/components/global/EmptyList.vue';
import Recent from '@/components/events/Recent.vue';
>>>>>>> 3775ee6f1f4e34f8147215b8375cd7964e1048f4

export default {
    components: {
        ArrowSmDownIcon,
        ArrowSmUpIcon,
<<<<<<< HEAD
        CheckCircleIcon,
        PlusIcon,
        XCircleIcon,
        EmptyList,
        Recent,
        TButton,
        TModal,
        EventCreator,
    },
    data() {
        return {
            isShowCreator: false,
=======
        EmptyList,
        Recent,
    },
    data() {
        return {
            isFetching: false,
>>>>>>> 3775ee6f1f4e34f8147215b8375cd7964e1048f4
        }
    },
    mounted() {
    },
<<<<<<< HEAD
    methods: {
        showCreator() {
			this.isShowCreator = true;
		},
		closeCreator() {
			this.isShowCreator = false;
		},
    },
=======
>>>>>>> 3775ee6f1f4e34f8147215b8375cd7964e1048f4
}
</script>