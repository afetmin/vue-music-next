<template>
  <div class="scroll-wrapper">
    <scroll class="scroll" :data="toplist">
      <div>
        <ul class="rank-list">
          <li v-for="(item, index) in toplist" :key="index" class="rank-item">
            <rank-item :data="item" @selectItem="selectItem"></rank-item>
          </li>
        </ul>
      </div>
    </scroll>
    <transition name="fade-slide-left">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import rankItem from '../components/rank/rank-item.vue'
import { getToplist } from '@/api/toplist'
import { mapActions } from 'vuex'
export default {
  components: { rankItem },
  data() {
    return {
      toplist: [],
    }
  },
  async created() {
    const { list } = await getToplist()
    this.toplist = this._normalizeToplist(list)
  },
  methods: {
    selectItem(item) {
      this.$router.push(`/rank/${item.id}`)
      this.setPlaylist(item)
    },
    _normalizeToplist(list) {
      return list.filter((item) => {
        return item.tracks && item.tracks.length > 0
      })
    },
    ...mapActions(['setPlaylist']),
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
