import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';

// Routes
const routes = [
  { name: 'Login', path: '/login', component: () => import('@/pages/auth/Login.vue'), meta: { title: 'Login', layout: 'auth' }, },
  { name: 'Logout', path: '/logout', component: () => import('@/pages/auth/Logout.vue'), meta: { title: 'Logout', layout: 'auth' }, },
  { name: 'ResetPassword', path: '/reset-password', component: () => import('@/pages/auth/ResetPassword.vue'), meta: { title: 'Reset Password', layout: 'auth' }, },
  { name: 'Index', path: '/', component: () => import('@/pages/Home.vue'), meta: { title: 'Home', layout: 'main' }, },
  { name: 'Reports', path: '/reports', component: () => import('@/pages/Reports.vue'), meta: { title: 'Reports', layout: 'main' }, },
  { name: 'Users', path: '/users', component: () => import('@/pages/Users.vue'), meta: { title: 'Users', layout: 'main' }, },
  { name: 'Teams', path: '/teams', component: () => import('@/pages/Teams.vue'), meta: { title: 'Teams', layout: 'main' }, },
  { name: 'Events', path: '/events', component: () => import('@/pages/Events.vue'), meta: { title: 'Events', layout: 'main' }, },
  { name: 'Settings', path: '/settings', component: () => import('@/pages/Settings.vue'), meta: { title: 'Settings', layout: 'main' }, },
  { name: 'NotFound', path: '/:path(.*)', component: () => import('@/pages/NotFound.vue'), meta: { title: 'Not Found', layout: 'main' }, },
];

// Middleware here
import vueMiddleware from "@grafikri/vue-middleware";
import authMiddleware from '@/middleware/auth.js';
const middleware = [authMiddleware];

// Apply middleware.
for (var r in routes) {
  routes[r].meta.middleware = middleware;
}

// @todo: move this somewhere else
let mode = 'spa';
const history = (mode == 'spa') ? createWebHistory() : createWebHashHistory();

export default {
  createRouter(_store) {
    let router = createRouter({
      history: history,
      linkActiveClass: "active",
      linkExactActiveClass: "exact-active",
      scrollBehavior() {
        return { x: 0, y: 0 }
      },
      routes
    });

    router.beforeEach(vueMiddleware({ store: _store }));
    return router;
  }
}