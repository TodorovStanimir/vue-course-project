import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Vue from 'vue';
import App from './app/App.vue';
import router from "./app/router.js";
import store from '../src/app/store.js';
import filters from '../src/app/shared/services/filters';
import './app/shared/services/languages';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  filters,
  render: h => h(App),
}).$mount('#app')
