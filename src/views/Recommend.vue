<template>
  <div class="scroll-wrapper" ref="recommend">
    <scroll ref="scroll" class="scroll" :data="recommendPlaylist">
      <div>
        <banner></banner>
        <recommend-list
          :data="recommendPlaylist"
          @selectList="selectList"
        ></recommend-list>
      </div>
    </scroll>
    <transition name="search">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import banner from '../components/recommend/banner.vue'
import RecommendList from '../components/recommend/recommend-list.vue'
import { getPlaylist } from '@/api/playlist'
import { mapActions } from 'vuex'
import { playlistMixin } from '@/utils/mixin'

export default {
  mixins: [playlistMixin],
  components: { banner, RecommendList },
  data() {
    return {
      recommendPlaylist: [],
    }
  },
  async created() {
    const { result } = await getPlaylist()
    this.recommendPlaylist = result
  },
  methods: {
    handlePlaylist(playlist) {
      const bottom = playlist.length > 0 ? '60px' : ''
      this.$refs.recommend.style.bottom = bottom
      this.$refs.scroll.refresh()
    },
    selectList(item) {
      this.$router.push(`/recommend/${item.id}`)
      this.setDisc(item)
    },
    ...mapActions(['setDisc']),
  },
}
</script>
<style lang='scss' scoped>
.scroll-wrapper {
  position: fixed;
  top: 82px;
  bottom: 0;
  width: 100%;
  .scroll {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
}
</style>
