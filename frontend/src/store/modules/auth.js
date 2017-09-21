import Vue from 'vue';
import router from '../../routing/router';

const state = {
    user: null,
    token: null,
};

const getters = {
    user(state) {
        return state.user;
    },
    isUserLogged(state) {
        if(state.user !== undefined && state.user !== null && state.token !== null  && state.token !== undefined)
            return true;
        else
            return false;
    },
    token(state) {
      return state.token;
    },
};

const mutations = {
    setUser: (state, payload) => {
      state.user = payload;
    },
    setToken: (state, payload) => {
        localStorage.setItem("token", payload);
        state.token = payload;
    },
};

const actions = {
    setUser: (state, payload) => {
        state.dispatch('setToken', payload.token);
        state.commit('loadContacts', payload.contacts);
        state.commit('setUser', payload.user);
    },
    loadUser: (state) => {
        let token = localStorage.getItem('token');
        if(token !== null && state.getters.isUserLogged === false) {
            state.commit('setLoading', true);
            Vue.http.get('user?token=' + token).then(
                response => {
                    state.dispatch('setUser', { 
                        user: response.body.user,
                        token: response.body.token, 
                        contacts: response.body.contacts 
                    });
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
    login: (state, payload) => {
        state.commit('setLittleLoading', true);
        state.commit('clearAlerts');
        Vue.http.post('login', {email: payload.email, password: payload.password}).then(
            response => {
                state.dispatch('setUser', { 
                        user: response.body.user,
                        token: response.body.token, 
                        contacts: response.body.contacts 
                    });
                state.dispatch('addAlert', {content: 'Login successful', type: "success"});
                state.commit('setLittleLoading', false);
            },
            error => {
                state.dispatch('addAlerts', error.body)
                state.commit('setLittleLoading', false);
            }
        );
    },
    register: (state, payload) => {
        state.commit('setLittleLoading', true);
        state.commit('clearAlerts');
        Vue.http.post('register', {
            email: payload.email,
            name: payload.name,
            password: payload.password,
            re_password: payload.re_password
        }).then(
            response => {
                state.dispatch('setUser', { user: response.body.user, token: response.body.token, contacts: []});
                state.dispatch('addAlert', {content: response.body.message, type: "success"});
                state.commit('setLittleLoading', false);
                router.push('/');
            },
            error => {
                state.dispatch('addAlerts', error.body)
                state.commit('setLittleLoading', false);
            }
        );
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
};

export default {
    state,
    getters,
    mutations,
    actions
}