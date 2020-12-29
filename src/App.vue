<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <player></player>
  </div>
</template>
<script>
import MHeader from 'cpnts/common/m-header.vue'
import Tab from 'cpnts/common/tab.vue'
import Player from 'cpnts/player/player.vue'

export default {
  components: {
    MHeader,
    Tab,
    Player,
  },
}
</script>

<style lang="scss">
</style>
