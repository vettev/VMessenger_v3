import Vue from 'vue';

export default {
    addAlert: ({commit}, payload) => {
        commit('addAlert', payload);
        /*setTimeout(() => {
            commit('removeAlert', payload.id)
        }, 5000);*/
    },
    clearAlerts: ({commit}) => {
        commit('clearAlerts');
    },
    setUser: (state, payload) => {
        state.commit('setUser', payload.user);
        state.dispatch('setToken', payload.token);
    },
    loadUser: (state) => {
        let token = localStorage.getItem('token');
        if(token !== null && state.getters.isUserLogged === false) {
            state.commit('setLoading', true);
            Vue.http.get('user?token=' + token).then(
                response => {
                    state.commit('setUser', response.body.user);
                    state.dispatch('setToken', token);
                    state.commit('setLoading', false);
                },
                () => {
                    localStorage.removeItem('token');
                    state.commit('setLoading', false);
                }
            );
        }
    },
    logout: (state) => {
        state.commit('setUser', null);
        state.dispatch('setToken', null);
        localStorage.removeItem('token');
    },
    setToken: ({commit}, payload) => {
        commit('setToken', payload);
        Vue.http.headers.common['Authorization'] = 'Bearer ' + payload;
    },
    setLoading: ({commit}, payload) => {
        commit('setLoading', payload);
    }
}