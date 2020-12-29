<template>
  <div class="music-list">
    <div class="header">
      <div class="back" @click="back">
        <i class="iconfont icon-left"></i>
      </div>
      <span class="title">{{ title }}</span>
    </div>
    <div class="bg-image" :style="bgStyle" ref="bgImage">
      <div class="play-wrapper">
        <div
          class="play"
          ref="playBtn"
          v-show="songs.length > 0"
          @click="random"
        >
          <i class="iconfont icon-play"></i>
          <span class="text">随机播放全部</span>
        </div>
      </div>
      <div class="filter" ref="filter"></div>
    </div>
    <div class="bg-layer" ref="layer"></div>
    <scroll
      :data="songs"
      @scroll="scroll"
      :listen-scroll="listenScroll"
      :probe-type="probeType"
      class="list"
      ref="list"
    >
      <div class="song-list-wrapper">
        <song-list :songs="songs" @select="selectItem"></song-list>
      </div>
    </scroll>
    <div v-show="!songs.length" class="loading-wrapper">
      <van-loading color="#d44439"></van-loading>
    </div>
  </div>
</template>

<script>
import SongList from '@/components/common/song-list'
import { prefixStyle } from '@/utils/dom'
import { mapActions } from 'vuex'
const RESERVED_HEIGHT = 40
const transform = prefixStyle('transform')
const backdrop = prefixStyle('backdrop-filter')
export default {
  components: {
    SongList,
  },
  props: {
    title: {
      type: String,
      default: '歌曲',
    },
    bgImage: {
      type: String,
    },
    songs: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      scrollY: 0,
    }
  },
  computed: {
    bgStyle() {
      return `background-image:url(${this.bgImage})`
    },
  },
  created() {
    this.probeType = 3
    this.listenScroll = true
  },
  mounted() {
    this.imageHeight = this.$refs.bgImage.clientHeight
    this.minTransalteY = -this.imageHeight + RESERVED_HEIGHT
    this.$refs.list.$el.style.top = `${this.imageHeight}px`
  },
  methods: {
    handlePlaylist(playlist) {
      const bottom = playlist.length > 0 ? '60px' : ''
      this.$refs.list.$el.style.bottom = bottom
      this.$refs.list.refresh()
    },
    scroll(pos) {
      this.scrollY = pos.y
    },
    back() {
      this.$router.back()
    },
    selectItem(item, index) {
      this.selectPlay({
        list: this.songs,
        index,
      })
    },
    random() {
      this.randomPlay({
        list: this.songs,
      })
    },
    ...mapActions(['selectPlay', 'randomPlay']),
  },
  watch: {
    scrollY(newVal) {
      let translateY = Math.max(this.minTransalteY, newVal)
      let scale = 1
      let zIndex = 0
      let blur = 0
      const percent = Math.abs(newVal / this.imageHeight)
      if (newVal > 0) {
        scale = 1 + percent
        zIndex = 10
      } else {
        blur = Math.min(20, percent * 20)
      }
      this.$refs.layer.style[transform] = `translate3d(0,${translateY}px,0)`
      this.$refs.filter.style[backdrop] = `blur(${blur}px)`
      if (newVal < this.minTransalteY) {
        zIndex = 10
        this.$refs.bgImage.style.paddingTop = 0
        this.$refs.bgImage.style.height = `${RESERVED_HEIGHT}px`
        this.$refs.playBtn.style.display = 'none'
      } else {
        this.$refs.bgImage.style.paddingTop = '75%'
        this.$refs.bgImage.style.height = 0
        this.$refs.playBtn.style.display = ''
      }
      this.$refs.bgImage.style[transform] = `scale(${scale})`
      this.$refs.bgImage.style.zIndex = zIndex
    },
  },
}
</script>
<style lang='scss' scoped>
.music-list {
  position: fixed;
  z-index: 100;
  top: 0;
  bottom: 0;
  width: 100%;
  background: $color-theme-l;
  .header {
    position: fixed;
    top: 0;
    z-index: 101;
    width: 100%;
    display: flex;
    height: 40px;
    align-items: center;
    color: $color-text-l;
    .back {
      margin: 0 10px;
    }
    .title {
      @include no-wrap();
    }
  }
  .bg-image {
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 75%;
    transform-origin: top;
    background-size: cover;
    .play-wrapper {
      position: absolute;
      bottom: 20px;
      z-index: 50;
      width: 100%;
      .play {
        box-sizing: border-box;
        width: 135px;
        padding: 7px 0;
        margin: 0 auto;
        text-align: center;
        border: 1px solid $color-theme;
        color: $color-theme;
        border-radius: 100px;
        font-size: 0;
        .icon-play {
          display: inline-block;
          vertical-align: middle;
          margin-right: 6px;
          font-size: $font-size-medium-x;
        }
        .text {
          display: inline-block;
          letter-spacing: 1px;
          font-weight: 500;
          vertical-align: middle;
          font-size: $font-size-medium;
        }
      }
    }
    .filter {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: black;
      opacity: 0.2;
    }
  }
  .bg-layer {
    position: relative;
    height: 100%;
    background: $color-background;
  }
  .list {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    background: $color-background;
  }
  .loading-wrapper {
    position: absolute;
    text-align: center;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
