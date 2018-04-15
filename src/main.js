import Vue from 'vue'
import Buefy from 'buefy'
import Vuex from 'vuex'
import 'buefy/lib/buefy.css'
import store from './store'

Vue.use(Vuex)
Vue.use(Buefy)

import App from './App.vue'
new Vue({
  el: '#app',
  render: h => h(App),
  store: store
})
