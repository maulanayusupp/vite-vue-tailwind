import createPersistedState from "vuex-persistedstate";

export default {
	namespaced: true,
    plugins: [createPersistedState()],
    state: () => ({
        data: null,
        token: "",
    }),
    mutations: {
        setSessionData(state, data) {
            state.data = data;
        },
        setTokenData(state, data) {
            state.token = data;
        }
    },
    actions: {
        clearSession({ commit }) {
            commit("setSessionData", null);
            commit("setTokenData", "");
        },
        setSession({ commit }, data) {
            if (data.token) commit("setTokenData", data.token);
            if (data.user) commit("setSessionData", data.user);         
        },
        setToken({ commit }, data) {
            commit("setTokenData", data);
        },
        doLogout({ commit }) {
            commit("setSessionData", null);
            commit("setTokenData", "");
        },
        setData({ commit }, data) {
            commit("setSessionData", data);
        }
    },
    getters: {
        hasSession(state) {
            return state.token !== '';
        },
        getSessionToken(state) {
            return state.token;
        },
        hasCheckedIn(state) {
            if (!state.data) return false;
            return state.data.hasCheckedInV4 === true;
        },
        getUser(state) {
            return state.data;
        },
        getUserName(state) {
            if (!state.data) return null;
            return state.data.name;
        },
        getUserAvatar(state) {
            if (!state.data) return null;
            return state.data.profile_img_path;
        },
        getUserId(state) {
            if (!state.data) return null;
            return state.data.id;
        },
    },
};