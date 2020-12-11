<template>
  <van-swipe
    class="swipper-wrapper"
    :autoplay="3000"
    indicator-color="white"
    ref="swipe"
  >
    <van-swipe-item
      v-for="(item, index) in banners"
      :key="index"
      class="swipe-item"
    >
      <img v-lazy="item.pic" />
    </van-swipe-item>
  </van-swipe>
</template>

<script>
import { getBanner } from '@/api/banner'

export default {
  data() {
    return {
      banners: [],
    }
  },
  async created() {
    const { banners } = await getBanner()
    this.banners = banners
  },
  methods: {
    resize() {
      this.$refs.swipe.resize()
    },
  },
}
</script>
<style lang='scss' scoped>
.swipper-wrapper {
  .swipe-item {
    width: 100%;
    height: 147px;
    img {
      width: 100%;
      object-fit: cover;
    }
  }
}
</style>
