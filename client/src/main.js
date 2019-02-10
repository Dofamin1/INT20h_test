import Vue from 'vue';
import Vuex from 'vuex';
import BootstrapVue from 'bootstrap-vue';
import { VueMasonryPlugin } from 'vue-masonry';
import App from './App.vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import store from './vuex/store.js';

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(VueMasonryPlugin);

new Vue({
  store,
  render: h => h(App),
}).$mount('#app');
