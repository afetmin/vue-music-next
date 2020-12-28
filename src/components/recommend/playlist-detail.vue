<template>
  <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
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
    ...mapGetters(['playlist']),
    title() {
      return this.playlist.name
    },
    bgImage() {
      return this.playlist.picUrl || this.playlist.coverImgUrl
    },
  },
  created() {
    this._getDetail()
  },
  methods: {
    _getDetail() {
      getPlaylistDetail(this.playlist.id).then((res) => {
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
