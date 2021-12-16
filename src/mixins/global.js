import moment from 'moment';

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
        __dateTimeFormat(dateTime) {
            return moment(dateTime).format('MMMM Do YYYY, h:mm:ss');
        },
        __parseStringToArray(text) {
            const items = text && typeof text === 'string' ? JSON.parse(text) : [];
            return items;
        },
    },
    mounted() {
    }
}
