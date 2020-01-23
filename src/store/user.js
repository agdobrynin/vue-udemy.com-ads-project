import User from "@/dto/user";
import firebase from "firebase";

export default {
    state: {
        user: null,
    },
    mutations: {
        setUser: (state, payload) => state.user = payload,
    },
    actions: {
        async actionRegisterUser({commit}, {email, password}) {
            commit("setClearError");
            commit("setLoading", true);
            try {
                const responseUser = await firebase.auth().createUserWithEmailAndPassword(email, password);
                commit("setUser", new User(responseUser.uid));
            } catch (error) {
                commit("setError", error.message);
                throw error;
            } finally {
                commit("setLoading", false);
            }
        },
        async actionLoginUser({commit}, {email, password}) {
            commit("setClearError");
            commit("setLoading", true);
            try {
                const responseUser = await firebase.auth().signInWithEmailAndPassword(email, password);
                commit("setUser", new User(responseUser.uid));
            } catch (error) {
                commit("setError", error.message);
                throw error;
            } finally {
                commit("setLoading", false);
            }
        },
    },
    getters: {
        user: (state) => state.user,
    },
}
