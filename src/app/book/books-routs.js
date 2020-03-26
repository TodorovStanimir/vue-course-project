import { requiresAuth } from '../shared/services/guards.js';


export default [
    {
        path: "/books/all",
        name: "books/all",
        props: false,
        beforeEnter: requiresAuth,
        component: () => import( /* webpackChunkName: "booksShowAll" */ "./components/BooksShowAll.vue")
    },
    {
        path: "/books/create",
        name: "books/create",
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
        beforeEnter: requiresAuth,
        component: () => import( /* webpackChunkName: "bookCreate" */ "./components/BookCreate.vue")
    }
];