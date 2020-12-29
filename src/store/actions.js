import * as types from './mutation-types'
import { playMode } from '@/utils/config'
import { shuffle } from '@/utils/common'
import { saveSearch, clearSearch, deleteSearch, savePlay, saveFavorite, deleteFavorite } from '@/utils/cache'

function findIndex(list, song) {
  return list.findIndex((item) => {
    return item.id === song.id
  })
}

const actions = {
  setSinger({ commit }, singer) {
    return commit(types.SET_SINGER, singer)
  },
  setDisc({ commit }, disc) {
    return commit(types.SET_DISC, disc)
  },
  setFullScreen({ commit }, flag) {
    return commit(types.SET_FULL_SCREEN, flag)
  },
  setPlayingState({ commit },flag) {
    return commit(types.SET_PLAYING_STATE, flag)
  },
  selectPlay({ commit, state }, { list, index }) {
    commit(types.SET_SEQUENCE_LIST, list)
    if (state.mode === playMode.random) {
      let randomList = shuffle(list)
      commit(types.SET_PLAYLIST, randomList)
      index = findIndex(randomList, list[index])
    } else {
      commit(types.SET_PLAYLIST, list)
    }
    commit(types.SET_CURRENT_INDEX, index)
    commit(types.SET_FULL_SCREEN, true)
    commit(types.SET_PLAYING_STATE, true)
  },
  randomPlay({ commit }, { list }) {
    commit(types.SET_PLAY_MODE, playMode.random)
    commit(types.SET_SEQUENCE_LIST, list)
    let randomList = shuffle(list)
    commit(types.SET_PLAYLIST, randomList)
    commit(types.SET_CURRENT_INDEX, 0)
    commit(types.SET_FULL_SCREEN, true)
    commit(types.SET_PLAYING_STATE, true)
  }
}
export default actions