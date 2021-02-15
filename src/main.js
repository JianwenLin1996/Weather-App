import Vue from 'vue';
// import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm';
import VueResource from 'vue-resource';
import App from './App.vue';

import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap-vue/dist/bootstrap-vue.css';

// Vue.use(BootstrapVue);
Vue.use(VueResource);

new Vue({
  el: '#app',
  render: h => h(App)
})
