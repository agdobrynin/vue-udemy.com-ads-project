// eslint-disable-next-line no-unused-vars
import firebase from "firebase";
import dtoAdv from "@/dto/dtoAdv";

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
                        const {title, desc, promo, image, userId, date} = ads[key];
                        const newAdv = new dtoAdv();
                        newAdv.id = key;
                        newAdv.title = title;
                        newAdv.desc = desc;
                        newAdv.promo = promo;
                        newAdv.image = image;
                        newAdv.userId = userId;
                        newAdv.date = date;
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
        async newAdv({ commit }, newAdvWithImageBlob) {
            commit("setClearError");
            commit("setLoading", true);
            const dtoADV = newAdvWithImageBlob.dtoADV;
            const imageBlob = newAdvWithImageBlob.imageBlob;
            try {
                // TODO вынести в констату приложения имя БД
                const newAdv = await firebase.database().ref("ads").push(dtoADV);
                dtoADV.id = newAdv.key;
                // TODO вынести в констату приложения имя Хранилища картинок
                const imageStorageResult = await firebase.storage().ref(`ads/${dtoADV.id}`)
                    .put(imageBlob, {contentType: imageBlob.type});
                dtoADV.image = await imageStorageResult.ref.getDownloadURL();
                commit("setAdv", dtoADV);
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
        adsOwnerList: (state) => userId => state.ads.filter( adv =>  adv.userId === userId),
        advById: (state) =>  adId => state.ads.find( adv => adv.id === adId),
    },
}
