import Vue from "vue";
import Router from "vue-router"
import Home from "@/components/Home";
import AuthGuard from "./auth-guard";

Vue.use(Router);
const routes = [
    {
        path: "/",
        name: "home",
        component: Home,
    },
    {
        path: "/login",
        name: "login",
        component: () => import(/* webpackChunkName: "login" */ "@/components/Auth/Login"),
    },
    {
        path: "/logout",
        name: "logout",
        component: () => import(/* webpackChunkName: "logout" */ "@/components/Auth/Logout"),
    },
    {
        path: "/registration",
        name: "registration",
        component: () => import(/* webpackChunkName: "registration" */ "@/components/Auth/Registration"),
    },
    {
        path: "/newadv",
        meta: {title: "Добавить объявление"},
        name: "newAdv",
        component: () => import(/* webpackChunkName: "newAdv" */ "@/components/Ads/NewAd"),
        beforeEnter: AuthGuard,
    },
    {
        path: "/listads",
        title: "Список моих объявлений",
        name: "listAds",
        component: () => import(/* webpackChunkName: "listAds" */ "@/components/Ads/ListAds"),
        beforeEnter: AuthGuard,
    },
    {
        path: "/adv/:id",
        name: "oneAdv",
        props: true,
        component: () => import(/* webpackChunkName: "oneAdv" */ "@/components/Ads/OneAd"),
    },
    {
        path: "/orders",
        title: "Заказы на покупку",
        name: "orders",
        component: () => import(/* webpackChunkName: "orders" */ "@/components/User/Orders"),
        beforeEnter: AuthGuard,
    },
    // Page not found
    {
        path: '*',
        name: 'pageNotFound',
        component: () => import(/* webpackChunkName: "pageNotFount" */ "@/components/PageNotFound"),
    },
];
export default new Router({
    routes,
    mode: "history",
});
