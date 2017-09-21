export default {
    addAlert: (state, payload) => {
        payload.id = state.alerts.length;
        payload.show = true;
        state.alerts.push(payload);
    },
    addContact: (state, payload) => {
        state.user.contacts.push(payload);
    },
    closeConversation: (state, id) => {
        function findConversation(element) {
            return (element.id === id)
        }
        let index = state.conversations.findIndex(findConversation);
        state.conversations.splice(index, 1);
    },
    removeAlert: (state, id) => {
        function findAlert(element) {
            return (element.id === id)
        }
        let index = state.alerts.findIndex(findAlert);
        state.alerts.splice(index, 1);
    },
    clearAlerts: (state) => {
        state.alerts = [];
    },
    addConversation: (state, payload) => {
        state.conversations.push(payload);
    },
    clearConversations: (state) => {
        state.conversations = [];
    },
    setUser: (state, payload) => {
      state.user = payload;
    },
    setToken: (state, payload) => {
        localStorage.setItem("token", payload);
        state.token = payload;
    },
    setLoading: (state, payload) => {
        state.loading = payload;
    },
    setLittleLoading: (state, payload) => {
        state.littleLoading = payload;
    },
    setDialog: (state, payload) => {
        state.dialog = payload;
    }
}