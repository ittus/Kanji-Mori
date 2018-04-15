import Vuex from 'vuex'
import Vue from 'vue'
import storage from '../utils/storage'
import * as Constants from '../utils/constants'
import simpleKanjiList from '../data/ikanji.js'

Vue.use(Vuex)

const initState = {
  isLoadingSetting: false,
  settings: null,
  wordList: []
}

const mutations = {
  setSettingsInfo(state, payload) {
    console.log('setSettings', payload)
    state.settings = payload
    state.wordList = simpleKanjiList.filter(wordInfo => {
      return payload[Constants.KANJI_512_KEY].includes(wordInfo.lesson)
    })
  }
}
const actions = {
  getSettings({ state, commit, dispatch }) {
    state.isLoadingSetting = true
    storage.get(Constants.SETTINGS_KEY, (res) => {
      console.log('Get settings', res)
      if (!res || !res.isInit) {
        dispatch('resetSettings')
      } else {
        commit('setSettingsInfo', res)
        state.isLoadingSetting = false
      }
    })
  },
  resetSettings({ state, commit }) {
    console.log('resetSettings')
    state.isLoadingSetting = true
    storage.set({[Constants.SETTINGS_KEY]: Constants.DEFAULT_SETTINGS}, () => {
      commit('setSettingsInfo', Constants.DEFAULT_SETTINGS)
      state.isLoadingSetting = false
    })
  }
}
const getters = {}

export default new Vuex.Store({
  state: initState,
  actions,
  mutations,
  getters
})
