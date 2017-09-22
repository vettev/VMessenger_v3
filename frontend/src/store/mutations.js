import Pusher from 'pusher-js';
import Vue from 'vue';

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
    disableLittleLoading: (state) =>{
        state.littleLoading = false;
    },
    enableDialog: (state) => {
        state.dialog = true;
    },
    disableDialog: (state) => {
        state.dialog = false;
    },
    loadPusher: (state, payload) => {
        Pusher.logToConsole = true;

        state.pusher = new Pusher('43e951ce3f846c232023', {
            cluster: 'eu',
            authEndpoint: Vue.http.options.root + '/pusher/auth',
            encrypted: true
        });
    },
    loadChannel: (state, payload) => {
        state.channel = state.pusher.subscribe('private-' + payload);
    }
}