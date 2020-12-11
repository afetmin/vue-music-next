<template>
  <div class="tab">
    <router-link tag="div" class="tab-item" to="/recommend">
      <span>推荐</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/rank">
      <span>排行</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/singer">
      <span>歌手</span>
    </router-link>
  </div>
</template>

<script>
export default {}
</script>
<style lang='scss' scoped>
.tab {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 40px;
  background: $color-theme;
  color: $color-text-l;
  font-size: $font-size-medium;
  .tab-item {
    &.router-link-active {
      span {
        font-weight: bold;
        color: $color-text-l;
        padding-bottom: 2px;
        border-bottom: 2px solid $color-text-l;
      }
    }
  }
}
</style>
