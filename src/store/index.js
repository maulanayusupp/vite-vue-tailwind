
import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import SecureLS from "secure-ls";

import Application from '@/store/modules/application';
import Auth from '@/store/modules/auth';
import Navigation from '@/store/modules/navigation';

const ls = new SecureLS({ isCompression: false });
const store = createStore({
    state: {
		version: 1
    },
    modules: {
		"app": Application,
		"auth": Auth,
		"navigation": Navigation,
    },
    plugins:[
		createPersistedState({ 
			key: 'my-app-bro',
			paths: ['auth'],
			storage: {
				getItem: key => ls.get(key),
				setItem: (key, value) => ls.set(key, value),
				removeItem: key => ls.remove(key)
			},
		})
    ]    
})

export default store;