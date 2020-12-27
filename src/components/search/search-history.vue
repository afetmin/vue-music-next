<template>
  <div class="search-list" v-if="searches.length">
    <div class="title">
      <span>搜索历史</span>
      <span class="clear" @click.stop="clear()">
        <i class="iconfont icon-icon27"></i>
      </span>
    </div>
    <transition-group name="list" tag="ul">
      <li
        :key="item"
        class="search-item"
        @click="selectItem(item)"
        v-for="item in searches"
      >
        <span class="text">{{ item }}</span>
        <span class="icon" @click.stop="deleteOne(item)">
          <i class="iconfont icon-close"></i>
        </span>
      </li>
    </transition-group>
  </div>
</template>

<script type="text/ecmascript-6">
import { Dialog } from 'vant'
import { clearSession } from '@/utils/session'
export default {
  props: {
    searches: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {}
  },
  created() {},
  methods: {
    clear() {
      Dialog.confirm({
        title: '清空历史记录?',
      })
        .then(() => {
          clearSession()
          this.$emit('clear')
        })
        .catch(() => {})
    },
    selectItem(item) {
      this.$emit('select', item)
    },
    deleteOne(item) {
      this.$emit('deleteOne', item)
    },
  },
}
</script>

<style scoped lang="scss">
.search-list {
  .title {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    height: 20px;
    line-height: 20px;
    font-size: $font-size-medium;
    color: $color-text-g;
    .clear {
      @include extend-click();
    }
  }
  .search-item {
    display: flex;
    align-items: center;
    height: 35px;
    overflow: hidden;
    font-size: 14px;
    .text {
      flex: 1;
      color: $color-text;
    }
    .icon {
      @include extend-click();
      .icon-close {
        font-size: $font-size-medium-x;
        color: $color-text;
      }
    }
  }
}
</style>
