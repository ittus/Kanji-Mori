import Vue from 'vue'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import store from './store'

import '@mdi/font/css/materialdesignicons.css'
Vue.use(Buefy)

import App from './App.vue'
new Vue({
  el: '#app',
  render: h => h(App),
  store: store
})
