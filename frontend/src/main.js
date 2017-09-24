import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import VueEcho from 'vue-echo';
import router from './routing/router';
import store from './store/index';

Vue.use(Vuetify);
Vue.use(VueRouter);
Vue.use(VueResource);

Vue.http.options.root = "http://localhost:8000/api/v1";
Vue.http.headers.common['Content-Type'] = 'application/json';
Vue.http.headers.common['X-Requested-With'] = 'XMLHttpRequest';

Vue.use(VueEcho, {
    key: '43e951ce3f846c232023',
    cluster: 'eu',
    broadcaster: 'pusher',
    encrypted: true,
    authEndpoint: Vue.http.options.root + '/broadcasting/auth',
    logToConsole: true,
    namespace: "App.Events",
    auth: {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
    },
});

new Vue({
    el: '#app',
    render: h => h(App),
    router,
    store,
    created() {
        store.dispatch('loadUser');
    },
});