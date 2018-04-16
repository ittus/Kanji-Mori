import Vuex from 'vuex'
import Vue from 'vue'
import storage from '../utils/storage'
import * as Constants from '../utils/constants'
import simpleKanjiList from '../data/ikanji.js'

Vue.use(Vuex)

let initState = {
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
  },
  changeLoadingState(state, isLoading) {
    state.isLoadingSetting = isLoading
  }
}
const actions = {
  getSettings({ commit, dispatch }) {
    commit('changeLoadingState', true)
    storage.get(Constants.SETTINGS_KEY, (res) => {
      console.log('Get settings', res)
      if (!res || !res[Constants.SETTINGS_KEY]) {
        dispatch('resetSettings')
      } else {
        commit('setSettingsInfo', res[Constants.SETTINGS_KEY])
        commit('changeLoadingState', false)
      }
    })
  },
  resetSettings({ state, commit }) {
    console.log('resetSettings')
    commit('changeLoadingState', true)
    storage.set({[Constants.SETTINGS_KEY]: Constants.DEFAULT_SETTINGS}, () => {
      commit('setSettingsInfo', Constants.DEFAULT_SETTINGS)
      commit('changeLoadingState', false)
    })
  },
  saveSettings({ state, commit }, payload) {
    console.log('saveSettings', payload)
    storage.set({[Constants.SETTINGS_KEY]: payload}, () => {
      commit('setSettingsInfo', payload)
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
