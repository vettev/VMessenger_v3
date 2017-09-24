export default {
    enableLoading: (state) => {
        state.loading = true;
    },
    disableLoading: (state) => {
        state.loading = false;
    },
    enableLittleLoading: (state) => {
        state.littleLoading = true;
    },
    disableLittleLoading: (state) => {
        state.littleLoading = false;
    },
    enableDialog: (state) => {
        state.dialog = true;
    },
    disableDialog: (state) => {
        state.dialog = false;
    }
}
