import Vue from "vue"
import Vuex from "vuex"
import adsStore from "@/store/ads";
import user from "@/store/user";
import globalStore from "@/store/globalStore";
import orders from "@/store/orders";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        globalStore,
        adsStore,
        user,
        orders,
    },
})
