import Vue from "vue";
import Router from "vue-router"
import Home from "@/components/Home";
import Login from "@/components/Auth/Login";
import Registration from "@/components/Auth/Registration";
import NewAd from "@/components/Ads/NewAd";
import ListAds from "@/components/Ads/ListAds";


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
        component: Login,
    },
    {
        path: "/registration",
        name: "registration",
        component: Registration,
    },
    {
        path: "/newad",
        name: "newad",
        component: NewAd,
    },
    {
        path: "/listads",
        name: "listads",
        component: ListAds,
    },
];
export default new Router({
    routes,
    mode: "history",
});
