import createPersistedState from "vuex-persistedstate";
import client from '@/libraries/http-client';
const TOKEN_KEY = 'access_token';

export default {
	namespaced: true,
    plugins: [createPersistedState()],
    state: () => ({
        user: null,
        token: "",
        expiresAt: null,
    }),
    mutations: {
        setUser(state, user) {
            state.user = user;
        },
        setToken(state, token) {
            state.token = token;

            // Put access token to client header
            localStorage.setItem(TOKEN_KEY, token);
			client.defaults.headers.Authorization = `Bearer ${token}`;
        },
        setExpiresAt(state, expiresAt) {
            state.expiresAt = expiresAt;
        },
    },
    actions: {
        clearAuth({ commit }) {
            commit("setUser", null);
            commit("setToken", "");
            localStorage.removeItem(TOKEN_KEY);
        },
        setSession({ commit }, data) {
            if (data.token) commit("setToken", data.token);
            if (data.user) commit("setUser", data.user);         
            if (data.expires_at) commit("setExpiresAt", data.expires_at);         
        },
        setToken({ commit }, token) {
            commit("setToken", token);
        },
        setExpiresAt({ commit }, expires_at) {
            commit("setExpiresAt", expires_at);
        },
        setData({ commit }, user) {
            commit("setUser", user);
        }
    },
    getters: {
        hasSession(state) {
            return state.token !== '';
        },
        getToken(state) {
            return state.token;
        },
        getUser(state) {
            return state.data;
        },
    },
};