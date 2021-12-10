<template>
    <span class="hidden">{{ $i18n.locale }}</span>
    <Layout>
        <router-view />
    </Layout>
</template>

<script>
import Layout from '@/layouts/index.vue';

export default {
    components: {
        Layout,
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