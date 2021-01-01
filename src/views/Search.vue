<template>
  <transition name="search">
    <div class="search" ref="searchWrapper">
      <div class="search-box-wrapper">
        <i class="iconfont icon-left" @click="back"></i>
        <search-box @query="onQueryChange" ref="searchBox"></search-box>
      </div>
      <scroll
        class="search-scroll-wrapper"
        ref="scroll"
        :pullup="pullup"
        @scrollToEnd="searchMore"
        :beforeScroll="beforeScroll"
        @beforeScroll="listenScroll"
      >
        <div ref="search">
          <div class="search-hots" v-show="!query">
            <p class="title">热门搜索</p>
            <span
              class="search-hots-item"
              v-for="item in hots"
              :key="item.id"
              @click="addQuery(item.first)"
            >
              {{ item.first }}
            </span>
          </div>
          <div class="shortcut-wrapper" v-show="!query">
            <div class="search-history" v-show="searchHistory.length > 0">
              <h1 class="title">
                <span class="text">搜索历史</span>
                <span class="clear" @click="showConfirm">
                  <i class="iconfont icon-icon27"></i>
                </span>
              </h1>
              <search-list
                @select="addQuery"
                @delete="deleteSearchHistory"
                :searches="searchHistory"
              ></search-list>
            </div>
          </div>
          <div class="search-result">
            <suggest
              @select="saveSearch"
              @refresh="refresh"
              :query="query"
              ref="suggest"
            ></suggest>
          </div>
        </div>
      </scroll>
      <transition name="search">
        <router-view></router-view>
      </transition>
    </div>
  </transition>
</template>

<script>
import { Dialog } from 'vant'
import Suggest from 'cpnts//search/suggest'
import { searchMixin, playlistMixin } from '@/utils/mixin'
import { getSearchHot } from '@/api/search'

export default {
  mixins: [searchMixin, playlistMixin],
  data() {
    return {
      pullup: true,
      hots: [],
      beforeScroll: true,
    }
  },
  created() {
    this._getSearchHot()
  },
  methods: {
    back() {
      this.$router.back()
      this.$refs.searchBox.clear()
    },
    showConfirm() {
      Dialog.confirm({
        title: '清空',
        message: '清空历史记录?',
      })
        .then(() => {
          this.clearSearchHistory()
        })
        .catch(() => {})
    },
    _getSearchHot() {
      getSearchHot().then((res) => {
        this.hots = res.result.hots
      })
    },
    onQueryChange(query) {
      this.query = query
    },
    addQuery(query) {
      this.$refs.searchBox.setQuery(query)
    },
    saveSearch() {
      this.saveSearchHistory(this.query)
    },
    searchMore() {
      this.$refs.suggest.searchMore()
    },
    // 滑动时手机键盘收起
    listenScroll() {
      this.$refs.searchBox.blur()
    },
    refresh() {
      setTimeout(() => {
        this.$refs.scroll.refresh()
      }, 20)
    },
    handlePlaylist(playlist) {
      const bottom = playlist.length > 0 ? '60px' : ''
      this.$refs.searchWrapper.style.bottom = bottom
      this.refresh()
    },
  },
  components: {
    Suggest,
  },
}
</script>

<style lang="scss" scoped>
.search {
  position: fixed;
  z-index: 100;
  width: 100%;
  top: 0;
  bottom: 0;
  background: $color-background;
  .search-box-wrapper {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: 50px;
    background: $color-theme;
    .iconfont {
      padding: 3px 10px;
      font-size: 25px;
      color: #fff;
    }
  }
  .search-scroll-wrapper {
    height: 100%;
    overflow: hidden;
    .search-hots {
      margin: 0 20px;
      .title {
        padding: 15px 5px 0 5px;
        height: 30px;
        line-height: 30px;
        font-size: $font-size-medium;
        color: $color-text-g;
      }
      span {
        display: inline-block;
        padding: 3px 5px;
        margin: 4px 4px;
        border: 0.8px solid $color-text-ggg;
        border-radius: 5px;
        line-height: 20px;
        color: $color-text;
        font-size: $font-size-medium;
      }
    }
    .shortcut-wrapper {
      position: relative;
      margin: 0 auto;
      .shortcut {
        height: 100%;
        overflow: hidden;
        .hot-key {
          margin: 0 20px 20px 20px;
          .title {
            margin-bottom: 20px;
            font-size: $font-size-medium;
            color: $color-text;
          }
          .item {
            display: inline-block;
            padding: 5px 10px;
            margin: 0 20px 10px 0;
            border-radius: 6px;
            background: $color-highlight-background;
            font-size: $font-size-medium;
            color: $color-text;
          }
        }
      }
      .search-history {
        position: relative;
        margin: 10px 25px;
        .title {
          display: flex;
          align-items: center;
          height: 30px;
          font-size: $font-size-medium;
          color: $color-text-g;
          .text {
            // font-size: 13px;
            flex: 1;
          }
          .clear {
            @include extend-click();
            .icon-clear {
              font-size: $font-size-medium;
              color: $color-text;
            }
          }
        }
      }
    }
    .search-result {
      position: relative;
      width: 100%;
      top: 10px;
      bottom: 0;
    }
  }
}
.router-view {
  z-index: 1000;
}
</style>
