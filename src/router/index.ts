import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/ducks",
      name: "ducks",
      component: () => import("../views/DucksView.vue"),
    },
    {
      path: "/auth",
      name: "auth",
      component: () => import("../views/admin/AuthView.vue"),
    },
    {
      path: "/cart",
      name: "cart",
      component: () => import("../views/pond/PondView.vue"),
    },
    {
      path: "/orders",
      name: "orders",
      component: () => import("../views/orders/OrdersView.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/ducks/:id",
      name: "duck-details",
      component: () => import("../views/DuckDetailsView.vue"),
    },
    {
      path: "/admin",
      name: "admin",
      component: () => import("../views/admin/AdminView.vue"),
      meta: { requiresAuth: true },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("lsToken");
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  if (requiresAuth && !isAuthenticated) {
    next("/auth");
  } else {
    next();
  }
});

export default router;
