// eslint-disable-next-line no-unused-vars
import firebase from "firebase";
import Ad from "@/dto/adv";

export default {
    state: {
        ads: [
        ]
    },
    mutations: {
        setAdv(state, payload) {
            state.ads.push(payload);
        },
    },
    actions: {
        async actionNewAdv({ commit, getters }, payload) {
            payload.id = parseInt('' + Math.random() * 10000);
            commit("setClearError");
            commit("setLoading", true);
            try {
                const Adv = new Ad();
                Adv.title = payload.title;
                Adv.desc = payload.desc;
                Adv.promo = payload.promo;
                Adv.image = payload.image;
                Adv.userId = getters.user.id || null;
                // TODO вынести в констату приложения имя БД
                const newAdv = await firebase.database().ref("ads").push(Adv);
                Adv.id = newAdv.key;
                commit("setAdv", Adv);
            } catch (error) {
                commit("setError", error.message);
                throw error;
            } finally {
                commit("setLoading", false);
            }
        },
    },
    getters: {
        adsAll: (state) => state.ads,
        adsPromo: (state) => state.ads.filter( adv => adv.promo ),
        adsOwner: (state) => userId => state.ads.filter( adv =>  adv.userId === userId),
        advById: (state) =>  adId => state.ads.find( adv => adv.id === adId),
    },
}
