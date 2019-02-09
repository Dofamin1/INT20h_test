import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import App from './App.vue';
import {VueMasonryPlugin} from 'vue-masonry';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.config.productionTip = false;


Vue.use(BootstrapVue);
Vue.use(VueMasonryPlugin);


new Vue({
  render: h => h(App),
}).$mount('#app');
