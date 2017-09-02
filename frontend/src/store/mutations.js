export default {
    addAlert: (state, payload) => {
        payload.id = state.alerts.length;
        payload.show = true;
        state.alerts.push(payload);
    },
    removeAlert: (state, id) => {
        state.alerts.splice(id);
    },
    setLoading: (state, payload) => {
        state.loading = payload;
    },
    setUser: (state, payload) => {
      state.user = payload.user;
    },
    setToken: (state, payload) => {
        localStorage.setItem("token", payload);
        state.token = payload;
    }
}