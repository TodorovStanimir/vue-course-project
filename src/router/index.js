import Vue from "vue";
import VueRouter from "vue-router";
import { requiresNotLogged, requiresAuth } from '../shared/services/guards';

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/profile/login"
  },
  {
    path: "/profile/login",
    name: "userLogin",
    props: true,
    beforeEnter: requiresNotLogged,
    // meta: { requiresNotLogged: true },
    component: () => import( /* webpackChunkName: "userLogin" */ "../components/core/UserLogin.vue"),
  },
  {
    path: "/profile/register",
    name: "userRegister",
    // props: true,
    beforeEnter: requiresNotLogged,
    // meta: { requiresNotLogged: true },
    component: () =>
      import( /* webpackChunkName: "userRegister" */ "../components/core/UserRegister.vue"),
  },
  {
    path: "/books",
    name: "books",
    // props: true,
    beforeEnter: requiresAuth,
    // meta: { requiresAuth: true },
    component: () =>
      import( /* webpackChunkName: "books" */ "../components/core/Books.vue"),
    children: [
      {
        path: "all",
        name: "books/all",
        props: false,
        component: () => import( /* webpackChunkName: "booksShowAll" */ "../components/core/BooksShowAll.vue")
      },
      {
        path: "create",
        name: "books/create",
        props: true,
        component: () => import( /* webpackChunkName: "bookCreate" */ "../components/core/BookCreate.vue")
      },
      {
        path: "details/:id",
        name: "bookDetails",
        props: true,
        component: () => import( /* webpackChunkName: "bookDetails" */ "../components/core/BookDetails.vue")
      },
      {
        path: 'edit/:id', name: "bookEdit",
        component: () => import( /* webpackChunkName: "bookCreate" */ "../components/core/BookCreate.vue")
      }
    ]
  },
  {
    path: "*",
    name: "notFound",
    // props: true,
    component: () =>
      import( /* webpackChunkName: "notFound" */ "../components/core/NotFound.vue"),
  }
];

const router = new VueRouter({
  mode: "history",
  // linkExactActiveClass: "vue-course-project",
  routes
});

export default router;
