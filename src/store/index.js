import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const initState = {
  isLoadingSetting: false
}
const actions = {}
const getters = {}

export default new Vuex.Store({
  state: initState,
  actions,
  getters
})
