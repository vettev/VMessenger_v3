import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router';
import router from './routing/router';
import store from './store';

Vue.use(Vuetify);
Vue.use(VueRouter);

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
});
