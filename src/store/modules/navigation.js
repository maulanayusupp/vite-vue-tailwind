// import createPersistedState from "vuex-persistedstate";

export default {
	namespaced: true,
    // plugins: [createPersistedState()],
    state: () => ({
        isShowLeftNavigation: false,
    }),
    mutations: {
        setShowLeftNavigation(state, isShow) {
            state.isShowLeftNavigation = isShow;
        },
    },
    actions: {
        setShowLeftNavigation({ commit }, isShow) {
            commit("setShowLeftNavigation", isShow);
        },
    },
    getters: {
        isShowLeftNavigation(state) {
            return state.isShowLeftNavigation;
        },
    },
};