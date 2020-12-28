<template>
  <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
</template>

<script type="text/ecmascript-6">
import MusicList from '@/components/common/music-list'
import { getSingerDetail } from '@/api/singer'
import { ERR_OK } from '@/api/config'
import { createSong } from '@/utils/song'
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['singer']),
    title() {
      return this.singer.name
    },
    bgImage() {
      return this.singer.avatar
    },
  },
  data() {
    return {
      songs: [],
    }
  },
  created() {
    this._getDetail()
  },
  mounted() {},
  methods: {
    _getDetail() {
      if (!this.singer.id) {
        this.$router.push('/singer')
        return
      }
      getSingerDetail(this.singer.id).then((res) => {
        if (res.code === ERR_OK) {
          this.songs = this._normalizeSongs(res.songs)
        }
      })
    },
    _normalizeSongs(songs) {
      let ret = []
      songs.forEach((song) => {
        ret.push(createSong(song))
      })
      return ret
    },
  },
  components: {
    MusicList,
  },
}
</script>

<style lang="scss" scoped></style>