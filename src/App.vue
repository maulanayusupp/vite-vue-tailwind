<template>
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
    setup() {
    },
}
</script>