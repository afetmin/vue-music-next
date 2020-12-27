import * as types from './mutation-types'

const actions = {
  setSinger({ commit }, singer) {
    return commit(types.SET_SINGER, singer)
  }
}
export default actions