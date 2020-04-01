import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import Vue from 'vue'
import App from './app/App.vue'
import router from "./app/router.js"
import VueBus from 'vue-bus'
import store from '../src/app/store.js'
import filters from '../src/app/shared/services/filters'

Vue.config.productionTip = false;

Vue.use(VueBus);

new Vue({
  router,
  store,
  filters,
  render: h => h(App),
}).$mount('#app')
