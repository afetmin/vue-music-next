<template>
  <div>
    <scroll ref="scroll" class="scroll-wrapper">
      <div>
        <banner></banner>
        <recommend-list></recommend-list>
      </div>
    </scroll>
  </div>
</template>

<script>
import banner from '../components/recommend/banner.vue'
import RecommendList from '../components/recommend/recommend-list.vue'
export default {
  components: { banner, RecommendList },
  data() {
    return {}
  },
  created() {},
  mounted() {},
  methods: {},
}
</script>
<style lang='scss' scoped>
.scroll-wrapper {
  position: absolute;
  top: 82px;
  bottom: 0;
  width: 100%;
}
</style>
