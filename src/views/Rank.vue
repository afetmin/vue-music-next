<template>
  <div class="scroll-wrapper">
    <scroll class="scroll" :data="toplist">
      <div>
        <ul class="rank-list">
          <li v-for="(item,index) in toplist" :key="index" class="rank-item">
            <rank-item :data="item"></rank-item>
          </li>
        </ul>
      </div>
    </scroll>
  </div>
</template>

<script>
import rankItem from '../components/rank/rank-item.vue'
import { getToplist } from '@/api/toplist'
export default {
  components: { rankItem },
  data() {
    return {
      toplist: []
    }
  },
  async created() {
    const { list } = await getToplist()
    this.toplist = this._normalizeToplist(list)
  },
  methods: {
    _normalizeToplist(list) {
      return list.filter((item) => {
        return item.tracks && item.tracks.length > 0
      })
    },
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
