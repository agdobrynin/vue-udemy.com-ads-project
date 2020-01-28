import firebase from "firebase";

export default {
    state: {
        orders: [],
    },
    mutations: {
        loadOrders(state, payload) {
            state.orders = payload;
        },
    },
    actions: {
        // async fetchOrder({commit}) {
        //     // TODO вынести в констату приложения имя БД
        //     const database = firebase.database().ref(`users/${dtoOrder.ownerId}/orders`);
        // },
        async createOrder({commit}, dtoOrder) {
            commit("setClearError");
            try {
                // TODO вынести в констату приложения имя БД
                const database = firebase.database().ref(`/users/${dtoOrder.ownerId}/orders`).push(dtoOrder);
                await database.push(dtoOrder);
            } catch (error) {
                commit("setError", error.message);
                throw error;
            }
        },
    },
    getters: {
        orders: (state) => state.orders,
    },
}
