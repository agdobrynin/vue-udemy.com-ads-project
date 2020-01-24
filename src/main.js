import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import store from "./store";
import firebase from "firebase";
import dtoUser from "@/dto/dtoUser";
import "@/filters";

Vue.config.productionTip = false;

new Vue({
    vuetify,
    router,
    store,
    render: h => h(App),
    created() {
        firebase.initializeApp(
            {
                apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
                authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
                databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
                projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
                storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
                messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGE_SENDER_ID,
                appId: process.env.VUE_APP_FIREBASE_APP_ID,
            }
        );
        firebase.auth().onAuthStateChanged(user => {
            const uid = user ? user.uid : null;
            this.$store.dispatch("user", new dtoUser(uid));
        });

        this.$store.dispatch("fetchAds");

    },
}).$mount("#app");
