import Vue from "vue";
import VueRouter from "vue-router";
// import Books from "../components/core/Books.vue"

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
    component: () => import( /* webpackChunkName: "userLogin" */ "../components/core/UserLogin.vue"),
  },
  {
    path: "/profile/register",
    name: "userRegister",
    // props: true,
    component: () =>
      import( /* webpackChunkName: "userRegister" */ "../components/core/UserRegister.vue"),
  },
  {
    path: "/books",
    name: "books",
    // props: true,
    meta: { requiresAuth: true },
    component: () =>
      import( /* webpackChunkName: "books" */ "../components/core/Books.vue"),
    children: [
      {
        path: "all", name: "books/all", component: () =>
          import( /* webpackChunkName: "booksShowAll" */ "../components/core/BooksShowAll.vue")
      },
      {
        path: "create", name: "books/create", component: () =>
          import( /* webpackChunkName: "bookCreate" */ "../components/core/BookCreate.vue")
      },
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

router.beforeEach((to, from, next) => {
  if (to.matched.some(rec => rec.meta.requiresAuth)) {
    if (!localStorage.getItem('username')) {
      next({ name: 'userLogin' })
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
