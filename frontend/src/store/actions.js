import Vue from 'vue';

export default {
    addAlert: ({commit}, payload) => {
        commit('addAlert', payload);
        /*setTimeout(() => {
            commit('removeAlert', payload.id)
        }, 5000);*/
    },
    setUser: ({commit}, payload) => {
        commit('setUser', payload.user);
        commit('setToken', payload.token);
    },
    loadUser: (state) => {
        state.commit('setLoading', true);
        let token = localStorage.getItem('token');
        if(token !== null && state.getters.isUserLogged === false) {
            Vue.http.get('user?token=' + token).then(
                response => {
                    state.commit('setUser', response.body.user);
                    state.commit('setToken', token);
                    state.commit('setLoading', false);
                },
                () => {
                    localStorage.removeItem('token');
                    state.commit('setLoading', false);
                }
            );
        }
    }
}