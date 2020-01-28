import firebase from "firebase";
import dtoOrder from "@/dto/dtoOrder";

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
        async fetchOrder({commit, getters}) {
            commit("setClearError");
            commit("setLoading", true);
            try {
                // TODO вынести в констату приложения имя БД
                const ordersPromise = await firebase.database().ref(`users/${getters.user.id}/orders`).once("value");
                const orders = await ordersPromise.val();
                const ordersResult = [];
                if (orders) {
                    Object.keys(orders).forEach( key => {
                        const {name, phone, advId, ownerId, done, date} = orders[key];
                        const order = new dtoOrder();
                        order.id = key;
                        order.name = name;
                        order.phone = phone;
                        order.advId = advId;
                        order.ownerId = ownerId;
                        order.done = done;
                        order.date = date || new Date().toISOString();
                        ordersResult.push(order);
                    });
                }
                commit("loadOrders", ordersResult);
            } catch (error) {
                commit("setError", error.message);
                throw error;
            } finally {
                commit("setLoading", false);
            }
        },
        async createOrder({commit}, dtoOrder) {
            commit("setClearError");
            try {
                // TODO вынести в констату приложения имя БД
                const database = await firebase.database().ref(`/users/${dtoOrder.ownerId}/orders`).push(dtoOrder);
                await database.push(dtoOrder);
            } catch (error) {
                commit("setError", error.message);
                throw error;
            }
        },
    },
    getters: {
        doneOrders: (state) => state.orders.filter( order => order.done === true),
        undoneOrders: (state) => state.orders.filter( order => order.done === false),
        orders: (state, getters) => getters.undoneOrders.concat(getters.doneOrders),
    },
}
