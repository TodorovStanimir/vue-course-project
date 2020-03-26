import Vue from "vue";
import VueRouter from "vue-router";
import { userRoutes } from './user';
import { booksRoutes } from './book';


Vue.use(VueRouter);

const appRoutes = [
  {
    path: "/",
    redirect: "/profile/login"
  },
  {
    path: "*",
    name: "notFound",
    // props: true,
    component: () =>
      import( /* webpackChunkName: "notFound" */ "../app/core/components/NotFound.vue"),
  }
];

const routes = [...appRoutes, ...userRoutes, ...booksRoutes];

const router = new VueRouter({
  mode: "history",
  // linkExactActiveClass: "vue-course-project",
  routes
});

export default router;
