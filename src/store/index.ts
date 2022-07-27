import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    showMenu: true
  },
  getters: {
  },
  mutations: {
    setShowMenu(state, showMenu) {
      state.showMenu = showMenu
    }
  },
  actions: {
    toggleMenu({ commit, state }) {
      commit('setShowMenu', !state.showMenu)
    }
  },
  modules: {
  }
})
