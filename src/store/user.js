import User from "@/dto/user";
import firebase from "firebase";

export default {
    state: {
        user: new User(null),
    },
    mutations: {
        user: (state, payload) => state.user = payload,
    },
    actions: {
        async actionRegisterUser({commit}, {email, password}) {
            commit("setClearError");
            commit("setLoading", true);
            try {
                await firebase.auth().createUserWithEmailAndPassword(email, password);
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
                await firebase.auth().signInWithEmailAndPassword(email, password);
            } catch (error) {
                commit("setError", error.message);
                throw error;
            } finally {
                commit("setLoading", false);
            }
        },
        user ({commit}, dtoUser) {
            commit("user", dtoUser);
        },
        async actionUserLogout ({commit}) {
            commit("setClearError");
            commit("setLoading", true);
            try {
                await firebase.auth().signOut();
                commit("user", new User());
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
        isUserLogin: (state) => state.user.id !== null,
    },
}
