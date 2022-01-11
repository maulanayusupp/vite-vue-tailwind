import { createApp } from 'vue';
import '@/tailwind.css';
import App from '@/App.vue';
const app = createApp(App);

// Store
import store from "@/store/index";
app.use(store);

// Routes
import routes from '@/router.js';
const router = routes.createRouter(store);
app.use(router);

// Add global mixin
import globalMixin from '@/mixins/global.js';
app.mixin(globalMixin);

// I18n
import i18n from "@/libraries/i18n.js";
app.use(i18n);

// Notifications
import Notifications from '@kyvg/vue3-notification';
import velocity from 'velocity-animate';
app.use(Notifications, { velocity });

// Fontawesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBold, faUnderline, faItalic, faImage, faAlignCenter, faAlignLeft, faAlignRight, faAlignJustify, faHighlighter, faStrikethrough } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
library.add(faBold, faUnderline, faItalic, faImage, faAlignCenter, faAlignLeft, faAlignRight, faAlignJustify, faHighlighter, faStrikethrough);
app.component('font-awesome-icon', FontAwesomeIcon);


// Mount
app.mount('#app');
