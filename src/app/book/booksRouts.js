import { requiresAuth } from '../shared/services/guards.js';


export default [
    {
        path: "/books/all",
        name: "booksAll",
        props: false,
        beforeEnter: requiresAuth,
        component: () => import( /* webpackChunkName: "showAllBooks" */ "./components/BooksShowAll.vue")
    },
    {
        path: "/books/user",
        name: "booksUser",
        props: false,
        beforeEnter: requiresAuth,
        component: () => import( /* webpackChunkName: "showUserBooks" */ "./components/BooksShowAll.vue")
    },
    {
        path: "/books/create",
        name: "bookCreate",
        props: true,
        beforeEnter: requiresAuth,
        component: () => import( /* webpackChunkName: "bookCreate" */ "./components/BookCreate.vue")
    },
    {
        path: "/books/details/:id",
        name: "bookDetails",
        props: true,
        beforeEnter: requiresAuth,
        component: () => import( /* webpackChunkName: "bookDetails" */ "./components/BookDetails.vue")
    },
    {
        path: '/books/edit/:id',
        name: "bookEdit",
        props: true,
        beforeEnter: requiresAuth,
        component: () => import( /* webpackChunkName: "bookEdit" */ "./components/BookCreate.vue")
    }
];