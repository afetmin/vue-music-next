const music = {
  singer: state => state.singer,
  playlist: state => state.playlist,
  playing: state => state.playing,
  fullScreen: state => state.fullScreen,
  sequenceList: state => state.sequenceList,
  mode: state => state.mode,
  currentIndex: state => state.currentIndex,
  disc: state => state.disc,
  topList: state => state.topList,
  searchHistory: state => state.searchHistory,
  playHistory: state => state.playHistory,
  favoriteList: state => state.favoriteList,
  currentSong: (state) => {
    return state.playlist[state.currentIndex] || {}
  }
}
export default music
