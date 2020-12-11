<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script>
import MHeader from '@/components/common/m-header.vue'
import Tab from '@/components/common/tab.vue'

export default {
  components: {
    MHeader,
    Tab,
  },
}
</script>

<style lang="scss">
</style>
