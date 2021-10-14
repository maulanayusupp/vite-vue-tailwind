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

// Add global mixin
import globalMixin from './mixins/global.js';
app.mixin(globalMixin);

app.use(router);
app.mount('#app');
