<template>
    <keep-alive>
        <component :is="layout">
            <slot />
        </component>
    </keep-alive>
</template>

<script>
import { ref, watch, markRaw } from 'vue';
import { useRoute } from 'vue-router';

export default {
    setup() {
        const route  = useRoute();
        const layout = ref();

        const getLayout = async (layoutName) => {
            const c = await import(`../layouts/${layoutName}.vue`);
            return c.default;
        };

        watch( () => route.meta, async (meta) => {
            try {
                layout.value = markRaw(await getLayout(meta.layout));
            } catch (e) {
                layout.value = markRaw(await getLayout('main'));
            }
        });

        return { layout };
    },
    mounted() {
    }

};
</script>