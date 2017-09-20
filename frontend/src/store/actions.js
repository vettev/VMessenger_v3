import Vue from 'vue';
import router from '../routing/router';

export default {
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
    addConversation: (state, payload) => {
        if(state.getters.conversationsCount > 0) {
            if (state.getters.conversationExists(payload.id)) {
                return null;
            }
            else {
                state.commit('clearConversations');
            }
        }
        state.commit('setLittleLoading', true);
        Vue.http.post('conversation', { recipient_id: payload.id }).then(
            response => {
                let conversation = response.body.conversation;
                conversation.user = payload
                state.commit('addConversation', conversation);
                state.commit('setLittleLoading', false);
            },
            error => {
               console.log(error);
                state.commit('setLittleLoading', false);
            }
        )
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
            state.dispatch('setLoading', true);
            Vue.http.get('user?token=' + token).then(
                response => {
                    state.commit('setUser', response.body.user);
                    state.dispatch('setToken', token);
                    state.dispatch('setLoading', false);
                },
                () => {
                    localStorage.removeItem('token');
                    state.dispatch('setLoading', false);
                }
            );
        }
    },
    login: (state, payload) => {
        state.dispatch('setLittleLoading', true);
        state.dispatch('clearAlerts');
        Vue.http.post('login', {email: payload.email, password: payload.password}).then(
            response => {
                state.dispatch('setUser', { user: response.body.user, token: response.body.token});
                state.dispatch('addAlert', {content: 'Login successful', type: "success"});
                state.dispatch('setLittleLoading', false);
            },
            error => {
                state.dispatch('addAlerts', error.body)
                state.dispatch('setLittleLoading', false);
            }
        );
    },
    register: (state, payload) => {
        state.dispatch('setLittleLoading', true);
        state.dispatch('clearAlerts');
        Vue.http.post('register', {
            email: payload.email,
            name: payload.name,
            password: payload.password,
            re_password: payload.re_password
        }).then(
            response => {
                state.dispatch('setUser', { user: response.body.user, token: response.body.token});
                state.dispatch('addAlert', {content: response.body.message, type: "success"});
                state.dispatch('setLittleLoading', false);
                router.push('/');
            },
            error => {
                state.dispatch('addAlerts', error.body)
                state.dispatch('setLittleLoading', false);
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
    setLoading: ({commit}, payload) => {
        commit('setLoading', payload);
    },
    setLittleLoading: ({commit}, payload) => {
        commit('setLittleLoading', payload);
    },
    setDialog: ({commit}, payload) => {
        commit('setDialog', payload);
    }
}