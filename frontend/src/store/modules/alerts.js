const state = {
    alerts: [],
};

const getters = {
    alerts(state) {
        return state.alerts;
    },
    alertsByType: (state, getters) => (type) => {
        return state.alerts.filter(alert => alert.type === type)
    },
};

const mutations = {
    addAlert: (state, payload) => {
        payload.id = state.alerts.length;
        payload.show = true;
        state.alerts.push(payload);
    },
    clearAlerts: (state) => {
        state.alerts = [];
    },
    removeAlert: (state, id) => {
        function findAlert(element) {
            return (element.id === id)
        }
        let index = state.alerts.findIndex(findAlert);
        state.alerts.splice(index, 1);
    },
};

const actions = {
    addAlert: ({commit}, payload) => {
        commit('addAlert', payload);
        setTimeout(() => {
         commit('removeAlert', payload.id)
         }, 5000);
    },
    addAlerts: (state, payload) => {
        for(let singularError in payload) {
            let errors = payload[singularError];
            if(Array.isArray(errors)) {
                for(let i = 0; i < errors.length; i++) {
                    state.dispatch('addAlert', {content: errors[i], type: "error"});
                }
            } else {
                state.dispatch('addAlert', {content: errors, type: "error"});
            }
        }
    },
};

export default {
    state,
    getters,
    mutations,
    actions
}