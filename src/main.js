import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import Vue from 'vue'
import App from './app/App.vue'
import router from "./app/router.js"
import VueBus from 'vue-bus'
import store from '../src/app/store.js'

Vue.config.productionTip = false;

Vue.use(VueBus);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
