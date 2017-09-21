export default {
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