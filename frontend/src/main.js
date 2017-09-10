import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router';
import router from './routing/router';
import store from './store/index';
import VueResource from 'vue-resource';

Vue.use(Vuetify);
Vue.use(VueRouter);
Vue.use(VueResource);

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