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
        __showNotif(type = 'info', title = '', message = '') {
            this.$notify({
                group: "app",
                type: type,
                title: title,
                text: message,
            });
        },
    },
    mounted() {
    }
}
