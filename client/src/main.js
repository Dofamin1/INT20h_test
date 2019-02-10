import Vue from 'vue';
import Vuex from 'vuex';
import BootstrapVue from 'bootstrap-vue';
import { VueMasonryPlugin } from 'vue-masonry';
import VueImg from 'v-img';
import App from './App.vue';
import store from './vuex/store.js';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.config.productionTip = false;

Vue.use(VueImg);
Vue.use(BootstrapVue);
Vue.use(VueMasonryPlugin);

new Vue({
  store,
  render: h => h(App),
}).$mount('#app');
