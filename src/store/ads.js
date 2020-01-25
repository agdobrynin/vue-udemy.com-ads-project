// eslint-disable-next-line no-unused-vars
import firebase from "firebase";
import dtoAdv from "@/dto/dtoAdv";
import Vue from "vue";

export default {
    state: {
        ads: [
        ]
    },
    mutations: {
        setAdv(state, dtoAdv) {
            state.ads.push(dtoAdv);
        },
        updateAdv(state, dtoAdv) {
            const adsIndex = state.ads.findIndex((adv => adv.id === dtoAdv.id));
            state.ads[adsIndex] = dtoAdv;
            Vue.set(state, "ads", [...state.ads]);
        }
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
                const database = firebase.database().ref("ads");
                const newAdv = await database.push(dtoADV);
                dtoADV.id = newAdv.key;
                // TODO вынести в констату приложения имя Хранилища картинок
                const imageStorageResult = await firebase.storage().ref(`ads/${dtoADV.id}`)
                    .put(imageBlob, {contentType: imageBlob.type});
                dtoADV.image = await imageStorageResult.ref.getDownloadURL();
                await database.child(dtoADV.id).update({image: dtoADV.image});
                commit("setAdv", dtoADV);
            } catch (error) {
                commit("setError", error.message);
                throw error;
            } finally {
                commit("setLoading", false);
            }
        },
        async updateAdv({ commit }, newAdvWithImageBlob) {
            commit("setClearError");
            commit("setLoading", true);
            const {dtoADV, imageBlob } = newAdvWithImageBlob;
            try {
                // TODO вынести в констату приложения имя БД
                const database = firebase.database().ref("ads");
                await database.child(dtoADV.id).update(dtoADV);
                // TODO вынести в констату приложения имя Хранилища картинок
                if (imageBlob) {
                    await firebase.storage().ref(`ads/${dtoADV.id}`)
                        .put(imageBlob, {contentType: imageBlob.type});
                }
                commit("updateAdv", dtoADV);
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
