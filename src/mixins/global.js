import moment from 'moment';

export const __duplicateVar = value => JSON.parse(JSON.stringify(value));

export default {
    computed: {
        __isShowLeftNavigation() {
            return this.$store.getters['navigation/isShowLeftNavigation'];
        },
    },
    methods: {
        __duplicateVar,
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
        __dateFormat(dateTime) {
            return moment(dateTime).format('Do MMMM YYYY');
        },
        __dateTimeFormat(dateTime) {
            return moment(dateTime).format('Do MMMM YYYY, hh:mm:ss');
        },
        __parseStringToArray(text) {
            const items = text && typeof text === 'string' ? JSON.parse(text) : [];
            return items;
        },
    },
    mounted() {
    }
}
