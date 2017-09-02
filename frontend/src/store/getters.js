export default {
    alerts(state) {
        return state.alerts;
    },
    alertsByType: (state, getters) => (type) => {
        return state.alerts.filter(alert => alert.type === type)
    },
    isUserLogged(state) {
        return (state.user !== null && state.token !== null);
    },
    isLoading(state) {
        return state.loading;
    }
}