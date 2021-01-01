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
  setPlayingState({ commit }, flag) {
    return commit(types.SET_PLAYING_STATE, flag)
  },
  setCurrentIndex({ commit }, index) {
    return commit(types.SET_CURRENT_INDEX, index)
  },
  setPlayMode({ commit }, mode) {
    return commit(types.SET_PLAY_MODE, mode)
  },
  setPlaylist({ commit }, list) {
    return commit(types.SET_PLAYLIST, list)
  },
  selectPlay({ commit, state }, { list, index }) {
    commit(types.SET_SEQUENCE_LIST, list)
    // 随机播放时点击列表找到点击song的位置然后改变当前播放song
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
  },
  insertSong({ commit, state }, song) {
    let playlist = state.playlist.slice()
    let sequenceList = state.sequenceList.slice()
    let currentIndex = state.currentIndex
    // 记录当前歌曲
    let currentSong = playlist[currentIndex]
    // 查找当前列表中是否有带插入的歌曲，并返回银锁
    let fpIndex = findIndex(playlist, song)
    // 因为是插入歌曲，所以索引+1
    currentIndex++
    // 插入歌曲
    playlist.splice(currentIndex, 0, song)
    // 如果已经包含这首歌
    if (fpIndex > -1) {
      // 如果当前插入的序号大于列列表中的序号
      if (currentIndex > fpIndex) {
        // 删掉
        playlist.splice(fpIndex, 1)
        // 因为删除后数组前移，所以 Index--
        currentIndex--
      } else {
        playlist.splice(fpIndex + 1, 1)
      }
    }

    let currentSIndex = findIndex(sequenceList, currentSong) + 1
    let fsIndex = findIndex(sequenceList, song)

    sequenceList.splice(currentSIndex, 0, song)
    if (fsIndex > -1) {
      if (currentSIndex > fsIndex) {
        sequenceList.splice(fpIndex, 1)
      } else {
        sequenceList.splice(fpIndex + 1, 1)
      }
    }
    commit(types.SET_PLAYLIST, playlist)
    commit(types.SET_SEQUENCE_LIST, sequenceList)
    commit(types.SET_CURRENT_INDEX, currentIndex)
    commit(types.SET_FULL_SCREEN, true)
    commit(types.SET_PLAYING_STATE, true)
  },
  deleteSong({ commit, state }, song) {
    let playlist = state.playlist.slice()
    let sequenceList = state.sequenceList.slice()
    let currentIndex = state.currentIndex
    let pIndex = findIndex(playlist, song)
    playlist.splice(pIndex, 1)
    let sIndex = findIndex(sequenceList, song)
    sequenceList.splice(sIndex, 1)

    if (currentIndex > pIndex || currentIndex === playlist.length) {
      currentIndex--
    }

    commit(types.SET_PLAYLIST, playlist)
    commit(types.SET_SEQUENCE_LIST, sequenceList)
    commit(types.SET_CURRENT_INDEX, currentIndex)

    const playingState = playlist.length > 0
    // 如果歌曲删除完毕，那么 播放停止
    commit(types.SET_PLAYING_STATE, playingState)
  },
  saveSearchHistory({ commit }, query) {
    commit(types.SET_SEARCH_HISTORY, saveSearch(query))
  },
  deleteSearchHistory({ commit }, query) {
    commit(types.SET_SEARCH_HISTORY, deleteSearch(query))
  },
  clearSearchHistory({ commit }) {
    commit(types.SET_SEARCH_HISTORY, clearSearch())
  },
  deleteSongList({ commit }) {
    commit(types.SET_PLAYLIST, [])
    commit(types.SET_SEQUENCE_LIST, [])
    commit(types.SET_CURRENT_INDEX, -1)
    commit(types.SET_PLAYING_STATE, false)
  },
  savePlayHistory({ commit }, song) {
    commit(types.SET_PLAY_HISTORY, savePlay(song))
  },
  saveFavoriteList({ commit }, song) {
    commit(types.SET_FAVORITE_LIST, saveFavorite(song))
  },
  deleteFavoriteList({ commit }, song) {
    commit(types.SET_FAVORITE_LIST, deleteFavorite(song))
  }
}
export default actions