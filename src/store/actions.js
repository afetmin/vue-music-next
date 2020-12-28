import * as types from './mutation-types'

const actions = {
  setSinger({ commit }, singer) {
    return commit(types.SET_SINGER, singer)
  },
  setPlaylist({ commit }, list) {
    return commit(types.SET_PLAYLIST, list)
  }
}
export default actions