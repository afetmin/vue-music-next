<template>
  <transition name="search">
    <div class="add-song" v-show="showFlag" @click.stop>
      <div class="header">
        <h1 class="title">添加歌曲到列表</h1>
        <div class="close" @click="hide">
          <i class="iconfont icon-close"></i>
        </div>
      </div>
      <div class="search-box-wrapper">
        <search-box
          ref="searchBox"
          @query="onQueryChange"
          placeholder="搜索歌曲"
        ></search-box>
      </div>
      <div class="shortcut" v-show="!query">
        <switches
          :switches="switches"
          :currentIndex="currentIndex"
          @switch="switchItem"
        ></switches>
        <div class="list-wrapper">
          <scroll
            ref="songList"
            v-if="currentIndex === 0"
            class="list-scroll"
            :data="playHistory"
          >
            <div class="list-inner">
              <song-list :songs="playHistory" @select="selectSong"> </song-list>
            </div>
          </scroll>
          <scroll
            :refreshDelay="refreshDelay"
            ref="searchList"
            v-else-if="currentIndex === 1"
            class="list-scroll"
            :data="searchHistory"
          >
            <div class="list-inner">
              <search-list
                @delete="deleteSearchHistory"
                @select="addQuery"
                :searches="searchHistory"
              ></search-list>
            </div>
          </scroll>
        </div>
      </div>
      <div class="search-result" v-show="query">
        <suggest
          :query="query"
          :showSinger="showSinger"
          @select="selectSuggest"
          @listScroll="blurInput"
        ></suggest>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
import { Notify } from 'vant'
import SongList from 'common/song-list'
import Suggest from 'cpnts/search/suggest'
import { searchMixin } from '@/utils/mixin'
import { mapGetters, mapActions } from 'vuex'
import Song from '@/utils/song'

export default {
  mixins: [searchMixin],
  data() {
    return {
      showFlag: false,
      showSinger: false,
      currentIndex: 0,
      songs: [],
      switches: [
        {
          name: '最近播放',
        },
        {
          name: '搜索历史',
        },
      ],
    }
  },
  computed: {
    ...mapGetters(['playHistory']),
  },
  methods: {
    show() {
      this.showFlag = true
      setTimeout(() => {
        if (this.currentIndex === 0) {
          this.$refs.songList.refresh()
        } else {
          this.$refs.searchList.refresh()
        }
      }, 20)
    },
    hide() {
      this.showFlag = false
    },
    selectSong(song, index) {
      if (index !== 0) {
        this.insertSong(new Song(song))
        this.$refs.topTip.show()
      }
    },
    selectSuggest() {
      Notify({
        type:'success',
        message: '一首歌曲已添加到播放列表'
      })
      this.saveSearch()
    },
    switchItem(index) {
      this.currentIndex = index
    },
    ...mapActions(['insertSong']),
  },
  components: {
    SongList,
    Suggest,
  },
}
</script>

<style scoped lang="scss">
.add-song {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  z-index: 200;
  background: $color-background;
  .header {
    position: relative;
    height: 44px;
    text-align: center;
    .title {
      line-height: 44px;
      font-size: $font-size-large;
      color: $color-text;
    }
    .close {
      position: absolute;
      top: 0;
      right: 8px;
      .icon-close {
        display: block;
        padding: 12px;
        font-size: 20px;
        color: $color-theme;
      }
    }
  }
  .search-box-wrapper {
    margin: 20px;
  }
  .shortcut {
    .list-wrapper {
      position: absolute;
      top: 165px;
      bottom: 0;
      width: 100%;
      .list-scroll {
        height: 100%;
        overflow: hidden;
        .list-inner {
          padding: 20px 30px;
        }
      }
    }
  }
  .search-result {
    position: fixed;
    top: 124px;
    bottom: 0;
    width: 100%;
  }
  .tip-title {
    text-align: center;
    padding: 18px 0;
    font-size: 0;
    .icon-ok {
      font-size: $font-size-medium;
      color: $color-theme;
      margin-right: 4px;
    }
    .text {
      font-size: $font-size-medium;
      color: $color-text;
    }
  }
}
</style>