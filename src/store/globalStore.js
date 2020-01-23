export default {
    state: {
        loading: false,
        error: null,
    },
    mutations: {
        setLoading: (state, payload) => state.loading =payload,
        setError: (state, payload) => state.error = payload,
        setClearError: (state) => state.error = null,
    },
    actions: {
        actionLoading: ({commit}, payload) => commit("setLoading", payload),
        actionError: ({commit}, payload) => commit("setError", payload),
        actionClearError: ({commit}) => commit("setError"),
    },
    getters: {
        loading: (state) => state.loading,
        error: (state) => state.error,
    },
}
