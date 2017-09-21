import Vue from 'vue';

const state = {
    contacts: [],
};

const getters = {
    contacts(state) {
        return state.contacts;
    },
    hasUserInContacts: (state) => (userId) => {
        function findUser(element) {
            return element.user.id === userId;
        }

        return state.contacts.find(findUser) != undefined;
    }
};

const mutations = {
    addContact: (state, payload) => {
        state.contacts.push(payload);
    },
    loadContacts: (state, payload) => {
        state.contacts = payload;
    },
    removeContact: (state, payload) => {
        function findContact(element) {
            return element.id === payload;
        }

        let index = state.contacts.findIndex(findContact);
        state.contacts.splice(index, 1);
    }
};

const actions = {
    addContact: (state, payload) => {
        state.commit('setLittleLoading', true);
        Vue.http.post('contact', { "user_id": payload }).then(
            response => {
                state.commit('addContact', response.body.contact);
                state.dispatch('addAlert', {content: response.body.message, type: "success"});
                state.commit('setLittleLoading', false);
            },
            error => {
                state.dispatch('addAlerts', error.body);
                state.commit('setLittleLoading', false);
            }
        );
    },
    removeContact: (state, payload) => {
        Vue.http.delete('contact/' + payload).then(
            response => {
                state.commit('removeContact', payload);
                state.dispatch('addAlert', {type: "info", content: response.body.message});
            },
            error => {
                state.dispatch('addAlert', {type: "error", content: 'Error. Cannot handle request.'});
            }
        );
    }
};

export default {
    state,
    getters,
    mutations,
    actions
}