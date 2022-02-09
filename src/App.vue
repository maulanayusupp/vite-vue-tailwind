<template>
    <span class="hidden">{{ $i18n.locale }}</span>
    <Layout>
        <router-view />
    </Layout>

    <!-- Notifications -->
    <notifications
        group="app"
        :ignoreDuplicates="true"
        position="top right"
        :max="3"
        :duration="5000"
        >
        <!-- <template #body="props">
            <div class="vue-notification">
                <p class="title">{{ props.item.title }}</p>
                <button class="close" @click="close">
                    <i class="fa fa-fw fa-close"></i>
                </button>
                <div v-html="props.item.text" />
            </div>
        </template> -->
    </notifications>

    <!-- Popup software update -->
    <popup-software-update />
</template>

<script>
import Layout from '@/layouts/index.vue';
import PopupSoftwareUpdate from '@/layouts/partials/PopupSoftwareUpdate.vue';

export default {
    components: {
        Layout,
        PopupSoftwareUpdate,
    },
    setup() {},
    data () {
        return {
        }
    },
    mounted() {
        // Test change language
        setTimeout(() => {
            this.$i18n.locale = 'en';
        }, 4000);

        console.log('VITE_API_URL', import.meta.env.VITE_API_URL);
    },
}
</script>

<style lang="scss">
	@import '@/assets/scss/main.scss';
</style>