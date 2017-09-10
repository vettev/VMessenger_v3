import Vuex from 'vuex';
import Vue from 'vue';
import getters from './getters';
import mutations from './mutations';
import actions from './actions';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        alerts: [],
        user: null,
        token: null,
        loading: false
    },
    getters,
    mutations,
    actions
});

export default store;