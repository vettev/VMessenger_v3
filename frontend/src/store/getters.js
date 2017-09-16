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
    }
}