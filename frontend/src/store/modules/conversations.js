import Vue from 'vue';

const state = {
    conversations: [],
};

const getters = {
    conversations(state) {
        return state.conversations;
    },
    conversationsCount(state) {
        return state.conversations.length;
    },
    conversationExists: (state, getters) => (recipientId) => {
        return state.conversations[0].user.id === recipientId;
    },
};

const mutations = {
    closeConversation: (state, id) => {
        function findConversation(element) {
            return (element.id === id)
        }
        let index = state.conversations.findIndex(findConversation);
        state.conversations.splice(index, 1);
    },
    addConversation: (state, payload) => {
        state.conversations.push(payload);
    },
    clearConversations: (state) => {
        state.conversations = [];
    },
};

const actions = {
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
};

export default {
    state,
    getters,
    mutations,
    actions
}