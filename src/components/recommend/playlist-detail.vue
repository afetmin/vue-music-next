<template>
  <transition name="search">
    <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
  </transition>
</template>

<script>
import { getPlaylistDetail } from '@/api/playlist'
import { mapGetters } from 'vuex'
import MusicList from '@/components/common/music-list.vue'
import { createSong } from '@/utils/song'
export default {
  data() {
    return {
      songs: [],
    }
  },
  components: {
    MusicList,
  },
  computed: {
    ...mapGetters(['disc']),
    title() {
      return this.disc.name
    },
    bgImage() {
      return this.disc.picUrl || this.disc.coverImgUrl
    },
  },
  created() {
    this._getDetail()
  },
  methods: {
    _getDetail() {
      if (!this.disc.id) {
        this.$router.push('/recommend')
        return
      }
      // fix: 刷新的时候没有传入disc导致页面加载不出
      getPlaylistDetail(this.disc.id || this.$route.params.id).then((res) => {
        this.songs = this._normalizeSongs(res.playlist.tracks)
      })
    },
    _normalizeSongs(list) {
      let ret = []
      list.forEach((song) => {
        ret.push(createSong(song))
      })
      return ret
    },
  },
}
</script>
<style lang='scss' scoped>
</style>
