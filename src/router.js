import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';

// Routes
const routes = [
  { name: 'Login', path: '/login', component: () => import('@/pages/auth/Login.vue'), meta: { title: 'Login', layout: 'auth' }, },
  { name: 'Logout', path: '/logout', component: () => import('@/pages/auth/Logout.vue'), meta: { title: 'Logout', layout: 'auth' }, },
  { name: 'ForgotPassword', path: '/forgot-password', component: () => import('@/pages/auth/ForgotPassword.vue'), meta: { title: 'Forgot Password', layout: 'auth' }, },
  { name: 'ResetPassword', path: '/password/reset', component: () => import('@/pages/auth/ResetPassword.vue'), meta: { title: 'Reset Password', layout: 'auth' }, },
  { name: 'Register', path: '/register', component: () => import('@/pages/auth/Register.vue'), meta: { title: 'Register', layout: 'auth' }, },
  { name: 'Resend Email', path: '/resend-email', component: () => import('@/pages/auth/ResendEmail.vue'), meta: { title: 'Resend Email', layout: 'auth' }, },
  { name: 'Verify', path: '/user/verify', component: () => import('@/pages/auth/Verify.vue'), meta: { title: 'Verify', layout: 'auth' }, },
  { name: 'Index', path: '/', component: () => import('@/pages/home/Index.vue'), meta: { title: 'Home', layout: 'main' }, },
  { name: 'Reports', path: '/reports', component: () => import('@/pages/report/Index.vue'), meta: { title: 'Reports', layout: 'main' }, },
  { name: 'Users', path: '/users', component: () => import('@/pages/users/Index.vue'), meta: { title: 'Users', layout: 'main' }, },
  { name: 'Teams', path: '/teams', component: () => import('@/pages/teams/Index.vue'), meta: { title: 'Teams', layout: 'main' }, },
  { name: 'Events', path: '/events', component: () => import('@/pages/events/Index.vue'), meta: { title: 'Events', layout: 'main' }, },
  { name: 'EventDetails', path: '/events/:slug', component: () => import('@/pages/events/Details.vue'), meta: { title: 'Event Details', layout: 'main' }, },
  { name: 'Templates', path: '/templates', component: () => import('@/pages/templates/Index.vue'), meta: { title: 'Templates', layout: 'main' }, },
  { name: 'Categories', path: '/categories', component: () => import('@/pages/categories/Index.vue'), meta: { title: 'Categories', layout: 'main' }, },
  { name: 'Announcements', path: '/announcements', component: () => import('@/pages/announcements/Index.vue'), meta: { title: 'Announcements', layout: 'main' }, },
  { name: 'Changelogs', path: '/changelogs', component: () => import('@/pages/changelogs/Index.vue'), meta: { title: 'Changelogs', layout: 'main' }, },
  { name: 'Feedbacks', path: '/feedbacks', component: () => import('@/pages/feedbacks/Index.vue'), meta: { title: 'Feedbacks', layout: 'main' }, },
  { name: 'Tags', path: '/tags', component: () => import('@/pages/tags/Index.vue'), meta: { title: 'Tags', layout: 'main' }, },
  { name: 'Settings', path: '/settings', component: () => import('@/pages/settings/Index.vue'), meta: { title: 'Settings', layout: 'main' }, },
  { name: 'NotFound', path: '/:path(.*)', component: () => import('@/pages/errors/NotFound.vue'), meta: { title: 'Not Found', layout: 'main' }, },
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

    console.log('router, tesdf');

    router.beforeEach(vueMiddleware({ store: _store }));
    return router;
  }
}