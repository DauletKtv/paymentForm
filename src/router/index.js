import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { createPinia } from "pinia";
import { usePaymentStore } from "../stores/payment";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: "/about",
      name: "about",
      meta: {
        requiresAuth: true,
      },
      component: () => import("../views/AboutView.vue"),
    },
  ],
});

router.beforeEach((to, from, next) => {
  const store = usePaymentStore();

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.accessCheck) {
      next("/");
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
