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
    // Проверяем, аутентифицирован ли пользователь
    if (!store.accessCheck) {
      // Если не аутентифицирован, перенаправляем на страницу входа
      next("/");
    } else {
      // Если аутентифицирован, переходим на запрашиваемую страницу
      next();
    }
  } else {
    // Если страница не требует аутентификации, переходим на неё
    next();
  }
});

export default router;
