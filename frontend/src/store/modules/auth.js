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
        state.commit('loadChannel', payload.user.id);
    },
    loadUser: (state) => {
        let token = localStorage.getItem('token');
        if(token !== null && state.getters.isUserLogged === false) {
            state.commit('enableLoading');
            Vue.http.get('user?token=' + token).then(
                response => {
                    state.dispatch('setUser', { 
                        user: response.body.user,
                        token: response.body.token, 
                        contacts: response.body.contacts 
                    });
                    state.dispatch('setToken', token);
                    state.commit('disableLoading');
                },
                () => {
                    localStorage.removeItem('token');
                    state.commit('disableLoading');
                }
            );
        }
    },
    login: (state, payload) => {
        state.commit('enableLittleLoading');
        state.commit('clearAlerts');
        Vue.http.post('login', {email: payload.email, password: payload.password}).then(
            response => {
                state.dispatch('setUser', { 
                        user: response.body.user,
                        token: response.body.token, 
                        contacts: response.body.contacts 
                    });
                state.dispatch('addAlert', {content: 'Login successful', type: "success"});
                state.commit('disableLittleLoading');
            },
            error => {
                state.dispatch('addAlerts', error.body)
                state.commit('disableLittleLoading');
            }
        );
    },
    register: (state, payload) => {
        state.commit('enableLittleLoading');
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
                state.commit('disableLittleLoading');
                router.push('/');
            },
            error => {
                state.dispatch('addAlerts', error.body)
                state.commit('disableLittleLoading');
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