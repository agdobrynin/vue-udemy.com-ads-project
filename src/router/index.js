import Vue from "vue";
import Router from "vue-router"
import Home from "@/components/Home";

Vue.use(Router);
const routes = [
    {
        path: "",
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
        path: "/newad",
        name: "newAd",
        component: () => import(/* webpackChunkName: "newadv" */ "@/components/Ads/NewAd"),
    },
    {
        path: "/listads",
        name: "listAds",
        component: () => import(/* webpackChunkName: "listads" */ "@/components/Ads/ListAds"),
    },
];
export default new Router({
    routes,
    mode: "history",
});
