export default {
    computed: {
        __isShowLeftNavigation() {
            return this.$store.getters['navigation/isShowLeftNavigation'];
        },
    },
    methods: {
        __showLeftNavigation() {
            this.$store.dispatch("navigation/setShowLeftNavigation", !this.__isShowLeftNavigation);
        },
    },
    mounted() {
    }
}
