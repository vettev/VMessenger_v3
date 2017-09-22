import Vuex from 'vuex';
import Vue from 'vue';
import getters from './getters';
import mutations from './mutations';
import alerts from './modules/alerts';
import auth from './modules/auth';
import contacts from './modules/contacts';
import conversations from './modules/conversations';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        loading: false,
        littleLoading: false,
        dialog: false,
        pusher: null,
        channel: null
    },
    getters,
    mutations,
    modules: {
        alerts,
        auth,
        contacts,
        conversations
    }
});

export default store;