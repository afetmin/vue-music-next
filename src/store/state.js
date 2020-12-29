import { playMode } from '@/utils/config'
import { loadSearch, loadPlay, loadFavorite } from '@/utils/cache'
const music = {
  singer: {}, // 歌手信息
  disc: {}, // 歌单信息
  playing: false, // 播放
  fullScreen: false, // 全屏
  playlist: [], // 播放列表
  sequenceList: [], // 顺序列表
  mode: playMode.sequence,  // 播放模式
  currentIndex: -1, // 当前播放索引
  topList: {},
  searchHistory: loadSearch(),
  playHistory: loadPlay(),
  favoriteList: loadFavorite()
}
export default music