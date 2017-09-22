export default {
    isLittleLoadingActive(state) {
        return state.littleLoading;
    },
    isLoadingActive(state) {
        return state.loading;
    },
    isDialogOpen(state) {
        return state.dialog;
    },
    pusher(state) {
        return state.pusher;
    },
    channel(state) {
        return state.channel;
    }
}