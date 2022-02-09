import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';
import { ROUTE_LIST } from './routes';
// Routes
const routes = ROUTE_LIST;

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