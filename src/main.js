import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import Vue from 'vue'
import App from './App.vue'
import moment from 'moment'
import router from "./router";

Vue.config.productionTip = false;
Vue.filter('formatDate', function(value){
  if (value) {
    return moment(value).format('dddd DD-MMMM-YYYY');
  }
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
