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
        async fetchAds({ commit }) {
            commit("setClearError");
            commit("setLoading", true);
            try {
                // TODO вынести в констату приложения имя БД
                const adsPromise = await firebase.database().ref("ads").once("value");
                const ads = adsPromise.val();
                if (ads) {
                    Object.keys(ads).forEach( key => {
                        const newAdv = new Ad();
                        newAdv.id = key;
                        newAdv.title = ads[key].title;
                        newAdv.desc = ads[key].desc;
                        newAdv.promo = ads[key].promo;
                        newAdv.image = ads[key].image;
                        newAdv.userId = ads[key].userId;
                        newAdv.date = ads[key].date;
                        // eslint-disable-next-line no-console
                        console.log(newAdv.dateLocateString());
                        commit("setAdv", newAdv);
                    });
                }
            } catch (error) {
                commit("setError", error.message);
                throw error;
            } finally {
                commit("setLoading", false);
            }
        },
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
