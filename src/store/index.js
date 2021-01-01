import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import createLogger from 'vuex/dist/logger'

const isProd = process.env.NOD_ENV === 'production'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  strict: !isProd,
  plugins: isProd ? [] : [createLogger()]
})
