import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  // Define your routes here
  // Each route is an object with properties like path, component, etc.
  {
    path: "/",
    name: "Home",
    component: () => import('./pages/Generation.vue')
  },

  {
    path: "/results",
    name: "Result",
    component: () => import('./pages/ResultPage.vue')
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
