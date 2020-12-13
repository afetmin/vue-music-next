<template>
  <transition name="fade-slide-left">
    <div class="search">
      <div class="search-header">
        <div class="back">
          <i class="iconfont icon-back"></i>
        </div>
        <div class="search-input">
          <input type="text" />
        </div>
        <div class="search-btn" @click="search">
          <i class="iconfont icon-search"></i>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  methods: {
    search() {
      console.log('yes')
    },
  },
}
</script>
<style lang='scss' scoped>
.search {
  position: fixed;
  z-index: 100;
  width: 100%;
  top: 0;
  bottom: 0;
  background: $color-background;
  .search-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 42px;
    background: $color-theme;
    color: $color-theme-l;
    box-sizing: border-box;
    padding: 0 14px;
    font-size: 24px;
    .back {
      @include extend-click;
    }
    .search-input {
      box-sizing: initial;
      input {
        font-size: $font-size-large;
        padding: 2px 12px;
        border: none;
        outline: none;
        border-radius: 13px;
        color: $color-theme-d;
      }
    }
    .search-btn {
      @include extend-click;
    }
  }
}
</style>
