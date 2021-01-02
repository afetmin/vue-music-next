<template>
  <div class="search-box">
    <input :placeholder="placeholder" v-model="query" type="text" class="box" ref="query">
    <i v-show="query" class="iconfont icon-close" @click="clear"></i>
  </div>
</template>

<script>
import {debounce} from '@/utils/common'

export default {
  name: 'search-box',
  props: {
    placeholder: {
      type: String,
      default: '搜索歌曲、歌手'
    }
  },
  data () {
    return {
      query: '',
      clickInfo: '搜索'
    }
  },
  created () {
    this.$watch('query', debounce((newQuery) => {
      this.$emit('query', newQuery)
    }, 300))
  },
  methods: {
    clear () {
      this.query = ''
    },
    setQuery (query) {
      this.query = query
    },
    blur() {
      this.$refs.query.blur()
    }
  }
}
</script>

<style scoped lang="scss">

.search-box {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  margin: 0 30px 0 0;
  width: 100%;
  height: 25px;
  border-bottom: 1px solid rgb(235, 235, 235);
  .icon-search {
    font-size: 24px;
    color: $color-text-g;
  }
  .box {
    flex: 1;
    line-height: 25px;
    background: $color-theme;
    color: #fff;
    font-size: $font-size-medium;
    border: none;
    outline: medium;
    border-bottom: 1px solid  rgba(255, 255, 255, 0.6);
    &::placeholder {
      color: rgba(255, 255, 255, 0.6);
    }
  }
  .iconfont {
    position: absolute;
    right: 15px;
    font-size: $font-size-large-x;
    color: rgba(255, 255, 255, 0.8);
    border: none;
  }
}
</style>
