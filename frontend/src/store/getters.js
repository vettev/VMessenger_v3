export default {
    alerts(state) {
        return state.alerts;
    },
    alertsByType: (state, getters) => (type) => {
        return state.alerts.filter(alert => alert.type === type)
    },
    user(state) {
        return state.user;
    },
    contacts(state) {
        if(state.user)
            return state.user.contacts;
        else
            return [];
    },
    conversations(state) {
        return state.conversations;
    },
    conversationsCount(state) {
        return state.conversations.length;
    },
    conversationExists: (state, getters) => (recipientId) => {
        return state.conversations[0].user.id == recipientId;
    },
    token(state) {
      return state.token;
    },
    isUserLogged(state) {
        if(state.user !== undefined && state.user !== null && state.token !== null  && state.token !== undefined)
            return true;
        else
            return false;
    },
    isLittleLoadingActive(state) {
        return state.littleLoading;
    },
    isLoadingActive(state) {
        return state.loading;
    },
    isDialogOpen(state) {
        return state.dialog;
    }
}