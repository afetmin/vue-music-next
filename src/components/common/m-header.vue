<template>
  <div class="header">
    <h1 class="title">MUSIC</h1>
    <router-link to="/user" class="me" tag="div">
      <i class="iconfont icon-favoriteslist"></i>
    </router-link>
    <router-link to="/search" class="search" tag="div">
      <i class="iconfont icon-search"></i>
    </router-link>
  </div>
</template>

<script>
export default {}
</script>
<style lang='scss' scoped>
.header {
  width: 100%;
  height: 42px;
  background: $color-theme;
  color: $color-text-l;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 0 14px;
  .me {
    order: 0;
    .iconfont {
      font-size: 26px;
    }
  }
  .title {
    order: 1;
    font-weight: bold;
    letter-spacing: 3px;
  }
  .search {
    order: 2;
    .iconfont {
      font-size: $font-size-large-x;
    }
  }
}
</style>
