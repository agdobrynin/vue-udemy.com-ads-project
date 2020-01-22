import Vue from "vue";
import Router from "vue-router"
import Home from "@/components/Home";

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
        path: "/registration",
        name: "registration",
        component: () => import(/* webpackChunkName: "registration" */ "@/components/Auth/Registration") ,
    },
    {
        path: "/newadv",
        name: "newAdv",
        component: () => import(/* webpackChunkName: "newAdv" */ "@/components/Ads/NewAd"),
    },
    {
        path: "/listads",
        name: "listAds",
        component: () => import(/* webpackChunkName: "listAds" */ "@/components/Ads/ListAds"),
    },
    {
        path: "/adv/:id",
        name: "oneAdv",
        component: () => import(/* webpackChunkName: "oneAdv" */ "@/components/Ads/OneAd"),
    },
    {
        path: "/orders",
        name: "orders",
        component: () => import(/* webpackChunkName: "orders" */ "@/components/User/Orders"),
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
