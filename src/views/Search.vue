<template>
  <transition name="fade-slide-left">
    <div class="search">
      <div class="search-header">
        <div class="back" @click="back">
          <i class="iconfont icon-back"></i>
        </div>
        <div class="search-input">
          <input placeholder="搜索歌曲、歌手" v-model.trim="searchText" />
          <i class="iconfont icon-close" v-show="searchText" @click="clear"></i>
        </div>
        <div class="search-btn" @click="search">
          <i class="iconfont icon-search"></i>
        </div>
      </div>
      <div class="search-content-wrapper">
        <scroll class="scroll" ref="scroll">
          <div>
            <div class="search-hots">
              <h2 class="title">热门搜索</h2>
              <span
                class="search-hots-item"
                v-for="(item, index) in hots"
                :key="index"
              >
                {{ item.first }}</span
              >
            </div>
            <search-history
              :searches="searches"
              @clear="clearSearch"
              @deleteOne="deleteOne"
            ></search-history>
          </div>
        </scroll>
      </div>
    </div>
  </transition>
</template>

<script>
import { getSuggest } from '@/api/suggest'
import { getSearchHot } from '@/api/searchhot'
import searchHistory from '../components/search/search-history.vue'
import { setSession, getSession } from '@/utils/session'
export default {
  components: { searchHistory },
  data() {
    return {
      searchText: '',
      hots: [],
      searches: [],
    }
  },
  async created() {
    const { result } = await getSearchHot()
    this.hots = result.hots
    this.getSearches()
  },
  methods: {
    deleteOne(item) {
      this.searches = this.searches.filter((key) => {
        return key !== item
      })
    },
    clearSearch() {
      this.searches = []
    },
    search() {
      this.searches.push(this.searchText)
      this.searches = [...new Set(this.searches)]
      setSession('search', JSON.stringify(this.searches))
      // getSuggest(this.searchText).then((res) => {
      //   console.log(res)
      // })
    },
    getSearches() {
      if (getSession('search')) {
        this.searches = JSON.parse(getSession('search'))
      }
      this.searches = []
    },
    clear() {
      this.searchText = ''
    },
    back() {
      this.$router.back()
      this.clear()
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
    padding: 0 12px;
    font-size: 24px;
    .back {
      @include extend-click;
    }
    .search-input {
      box-sizing: initial;
      position: relative;
      input {
        font-size: $font-size-medium;
        padding: 5px 15px;
        border: none;
        outline: none;
        border-radius: 13px;
        color: $color-theme-d;
        transition: all 0.2s linear;
        width: 150px;
        &:focus {
          width: 250px;
        }
      }
      .icon-close {
        position: absolute;
        right: 0;
        top: 5px;
        color: $color-text;
      }
    }
    .search-btn {
      @include extend-click;
    }
  }
  .search-content-wrapper {
    overflow: hidden;
    height: 100%;
    .scroll {
      margin: 10px;
      .search-hots {
        .title {
          padding: 10px 0;
          height: 20px;
          line-height: 20px;
          font-size: $font-size-small-x;
          color: $color-text-g;
        }
        .search-hots-item {
          display: inline-block;
          padding: 3px 5px;
          margin: 4px;
          border: 0.8px solid $color-text-ggg;
          border-radius: 4px;
          line-height: 20px;
          color: $color-text;
          font-size: $font-size-medium;
        }
      }
    }
  }
}
</style>
