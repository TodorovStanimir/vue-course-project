import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/profile/login"
  },
  {
    path: "/profile/login",
    name: "userLogin",
    // props: true,
    component: () =>
      import(
        /* webpackChunkName: "userLogin" */ "../components/core/UserLogin.vue"
      ),
  },
  {
    path: "/profile/register",
    name: "userRegister",
    // props: true,
    component: () =>
      import(
        /* webpackChunkName: "userRegister" */ "../components/core/UserRegister.vue"
      ),
  },
  {
    path: "*",
    name: "notFound",
    // props: true,
    component: () =>
      import(
        /* webpackChunkName: "notFound" */ "../components/core/NotFound.vue"
      ),
  }
];

const router = new VueRouter({
  mode: "history",
  // linkExactActiveClass: "vue-course-project",
  routes
});

export default router;
