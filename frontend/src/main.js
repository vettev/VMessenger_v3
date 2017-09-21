import Vue from 'vue'
import App from './App.vue'
import VuePusher from 'vue-pusher';
import Vuetify from 'vuetify'
import VueRouter from 'vue-router';
import router from './routing/router';
import store from './store/index';
import VueResource from 'vue-resource';
import pusher from 'pusher-js';

Vue.use(Vuetify);
Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(VuePusher, {
    api_key: 'a1967b216298382ddcbf',
    options: {
        cluster: 'eu',
        encrypted: true,
    }
})

Vue.http.options.root = "http://localhost:8000/api/v1";
Vue.http.headers.common['Content-Type'] = 'application/json';
Vue.http.headers.common['X-Requested-With'] = 'XMLHttpRequest';

new Vue({
    el: '#app',
    render: h => h(App),
    router,
    store,
    created() {
        store.dispatch('loadUser');
    }
});