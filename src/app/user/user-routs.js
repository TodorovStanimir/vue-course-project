import { requiresNotLogged, requiresAuth } from '../shared/services/guards.js';

export default [
    {
        path: "/profile/login",
        name: "userLogin",
        props: true,
        beforeEnter: requiresNotLogged,
        component: () => import( /* webpackChunkName: "userLogin" */ "./components/UserLogin.vue"),
    },
    {
        path: "/profile/register",
        name: "userRegister",
        beforeEnter: requiresNotLogged,
        component: () =>
            import( /* webpackChunkName: "userRegister" */ "./components/UserRegister.vue"),
    },
    {
        path: "/profile/profile",
        name: "userProfile",
        beforeEnter: requiresAuth,
        component: () =>
            import( /* webpackChunkName: "userProfile" */ "./components/UserProfile.vue"),
    },
];