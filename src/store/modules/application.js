// import createPersistedState from "vuex-persistedstate";

export default {
	namespaced: true,
    // plugins: [createPersistedState()]
    state: () => ({
        onlineUsers: {},
    }),
    mutations: {
        setOnlineUsers(state, items) {
            state.onlineUsers = items;
        },
    },
    actions: {
        clearOnlineUsers({ commit }) {
            commit("setOnlineListManually", {});
        },
    },
    getters: {
        getOnlineUsers(state) {
            return state.onlineUsers;
        }
    },
};