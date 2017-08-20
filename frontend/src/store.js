import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        alerts: [
        ],
        user: null
    },
    getters: {
        getAlerts(state) {
            return state.alerts;
        },
        getAlertsByType: (state, getters) => (type) => {
            return state.alerts.filter(alert => alert.type === type)
        },
    },
    mutations: {
        addAlert: (state, payload) => {
            payload.id = state.alerts.length;
            state.alerts.push(payload);
        },
        removeAlert: (state, id) => {
            state.alerts.splice(id);
        }
    },
    actions: {
        addAlert: ({commit}, payload) => {
            commit('addAlert', payload);
            setTimeout(() => {
                commit('removeAlert', payload.id)
            }, 5000);
        }
    }
});

export default store;