<template>
  <div class="player" v-if="playlist.length > 0">
    <transition
      name="normal"
      @enter="enter"
      @after-enter="afterEnter"
      @leave="leave"
      @after-leave="afterLeave"
    >
      <div class="normal-player" v-show="fullScreen">
        <div class="background">
          <img width="100%" height="100%" :src="currentSong.image" />
        </div>
        <div class="top">
          <div class="back" @click="back">
            <i class="iconfont icon-down"></i>
          </div>
          <h1 class="title" v-html="currentSong.name"></h1>
          <h2 class="subtitle" v-html="currentSong.singer"></h2>
          <div class="needle">
            <img
              class="play-bar-support"
              src="@/assets/imgs/play-bar-support.png"
            />
            <img
              :class="{ playing }"
              class="play-bar"
              src="@/assets/imgs/play-bar.png"
            />
          </div>
        </div>
        <div class="middle">
          <div class="middle-l" ref="middleL">
            <div class="cd-wrapper" ref="cdWrapper">
              <div class="cd" :class="cdCls">
                <img class="image" :src="currentSong.image" />
              </div>
            </div>
            <div class="playing-lyric-wrapper">
              <div class="playing-lyric"></div>
            </div>
          </div>
        </div>
        <div class="bottom">
          <div class="operators">
            <div class="icon i-left">
              <i class="iconfont icon-23_shunxubofang"></i>
            </div>
            <div class="icon i-left" @click="prev">
              <i class="iconfont icon-previous"></i>
            </div>
            <div @click="togglePlaying" class="icon i-center">
              <i class="iconfont" :class="playIcon"></i>
            </div>
            <div class="icon i-right" @click="next">
              <i class="iconfont icon-next1"></i>
            </div>
            <div class="icon i-right">
              <i class="iconfont icon-like2"></i>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="mini">
      <div class="mini-player" v-show="!fullScreen" @click="open">
        <div class="icon">
          <img width="40" height="40" :src="currentSong.image" :class="cdCls" />
        </div>
        <div class="text">
          <h2 class="name" v-html="currentSong.name"></h2>
          <p class="desc"></p>
        </div>
        <div class="control" @click.stop="togglePlaying">
          <progress-circle :radius="radius" :percent="percent">
            <i class="iconfont" :class="miniIcon"></i>
          </progress-circle>
        </div>
        <div class="musiclist">
          <i class="iconfont icon-musiclist"></i>
        </div>
      </div>
    </transition>
    <audio ref="audio"></audio>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import animations from 'create-keyframe-animation'
import { prefixStyle } from '@/utils/dom'
import { getSongUrl, getLyric } from '@/api/song'
// import { getSong, getLyric } from '@/api/song'
// import { playMode } from '@/utils/config'
// import { shuffle } from '@/utils/common'

const transform = prefixStyle('transform')
const transitionDuration = prefixStyle('transitionDuration')

export default {
  data() {
    return {
      songUrl: '',
      songReady: false,
      currentTime: 0,
      duration: 0,
      percent: 0,
      radius: 32,
      currentLyric: null,
      currentLineNum: 0,
      currentShow: 'cd',
      playingLyric: '',
      noLyric: false,
    }
  },
  computed: {
    ...mapGetters(['fullScreen', 'playlist', 'currentSong', 'playing']),
    playIcon() {
      return this.playing ? 'icon-Pause' : 'icon-play'
    },
    cdCls() {
      return this.playing ? 'play' : 'play pause'
    },
    miniIcon() {
      return this.playing ? 'icon-Pause1' : 'icon-triangle'
    },
  },
  watch: {
    currentSong: {
      handler(newVal, oldVal) {
        if (!newVal.id) {
          return
        }
        if (oldVal && newVal.id === oldVal.id) {
          return
        }
        this._getSong(newVal.id)
      },
      immediate: true,
    },
    playing(newVal) {
      this.$nextTick(() => {
        newVal ? this.play() : this.pause()
      })
    },
  },
  methods: {
    prev() {},
    next() {},
    pause() {
      this.$refs.audio && this.$refs.audio.pause()
    },
    play() {
      this.$refs.audio && this.$refs.audio.play()
    },
    togglePlaying() {
      this.setPlayingState(!this.playing)
    },
    back() {
      this.setFullScreen(false)
    },
    open() {
      this.setFullScreen(true)
    },
    enter(el, done) {
      const { x, y, scale } = this._getPosAndScale()
      let animation = {
        0: {
          transform: `translate3d(${x}px,${y}px,0) scale(${scale})`,
        },
        60: {
          transform: `translate3d(0,0,0) scale(1.1)`,
        },
        100: {
          transform: `translate3d(0,0,0) scale(1)`,
        },
      }
      animations.registerAnimation({
        name: 'move',
        animation,
        presets: {
          duration: 400,
          easing: 'linear',
        },
      })
      animations.runAnimation(this.$refs.cdWrapper, 'move', done)
    },
    afterEnter() {
      animations.unregisterAnimation('move')
      this.$refs.cdWrapper.style.animation = ''
    },
    leave(el, done) {
      this.$refs.cdWrapper.style.transition = 'all 0.4s'
      const { x, y, scale } = this._getPosAndScale()
      this.$refs.cdWrapper.style[
        transform
      ] = `translate3d(${x}px,${y}px,0) scale(${scale})`
      this.$refs.cdWrapper.addEventListener('transitionend', done)
    },
    afterLeave() {
      this.$refs.cdWrapper.style.transition = ''
      this.$refs.cdWrapper.style[transform] = ''
    },
    _getPosAndScale() {
      const targetWidth = 40
      const paddingLeft = 40
      const paddingBottom = 30
      const paddingTop = 80
      const width = window.innerWidth * 0.8
      const scale = targetWidth / width
      const x = -(window.innerWidth / 2 - paddingLeft)
      const y = window.innerHeight - paddingTop - width / 2 - paddingBottom
      return {
        x,
        y,
        scale,
      }
    },
    _getSong(id) {
      getSongUrl(id).then((res) => {
        this.songUrl = res.data[0].url
        this.$refs.audio.src = this.songUrl
        this.setPlayingState(true)
        this.play()
      })
    },
    ...mapActions(['setFullScreen', 'setPlayingState']),
  },
}
</script>
<style lang='scss' scoped>
.player {
  .normal-player {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 150;
    background: $color-text-g;
    .background {
      position: absolute;
      left: -50%;
      top: -50%;
      width: 300%;
      height: 300%;
      z-index: -1;
      opacity: 0.6;
      filter: blur(30px);
    }
    .top {
      position: relative;
      // margin-bottom: 25px;
      .back {
        position: absolute;
        top: 0;
        left: 6px;
        z-index: 50;
        .iconfont {
          display: block;
          padding: 7px;
          font-size: 30px;
          color: $color-theme-l;
        }
      }
      .title {
        width: 70%;
        margin: 0 auto;
        padding-top: 10px;
        line-height: 20px;
        text-align: center;
        @include no-wrap();
        font-size: $font-size-large;
        font-weight: bold;
        color: $color-text-l;
      }
      .subtitle {
        width: 70%;
        margin: 0 auto;
        line-height: 20px;
        text-align: center;
        @include no-wrap();
        font-size: $font-size-small-x;
        color: $color-text-l;
      }
      .needle {
        position: relative;
        display: flex;
        justify-content: center;
        z-index: 100;
        .play-bar-support {
          position: absolute;
          width: 20px;
          height: 20px;
        }
        .play-bar {
          position: absolute;
          left: 50%;
          top: 17px;
          transform-origin: 0 0;
          width: 80px;
          height: 126px;
          transform: rotate(-25deg);
          transition: all 0.3s;
          &.playing {
            transform: translateX(-3px) rotate(1deg);
          }
        }
      }
    }
    .middle {
      display: flex;
      align-items: center;
      position: fixed;
      width: 100%;
      top: 80px;
      bottom: 170px;
      white-space: nowrap;
      font-size: 0;
      .middle-l {
        display: inline-block;
        vertical-align: top;
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 80%;
        .cd-wrapper {
          position: absolute;
          left: 10%;
          top: 0;
          width: 80%;
          height: 100%;
          .cd {
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            border: 10px solid rgba(255, 255, 255, 0.1);
            border-radius: 50%;
            &.play {
              animation: rotate 20s linear infinite;
            }
            &.pause {
              animation-play-state: paused;
            }
            .image {
              position: absolute;
              left: 50%;
              top: 50%;
              transform: translate(-50%, -50%);
              width: 70%;
              height: 70%;
              border-radius: 50%;
              border: 40px solid rgba(0, 0, 0, 0.9);
            }
          }
        }
        .playing-lyric-wrapper {
          width: 80%;
          margin: 30px auto 0 auto;
          overflow: hidden;
          text-align: center;
          .playing-lyric {
            height: 20px;
            line-height: 20px;
            font-size: $font-size-medium;
            color: $color-text-l;
          }
        }
      }
    }
    .bottom {
      position: absolute;
      bottom: 50px;
      width: 100%;
      .operators {
        display: flex;
        align-items: center;
        .icon {
          flex: 1;
          color: $color-theme-l;
          &.disable {
            color: $color-theme;
          }
          i {
            font-size: 30px;
          }
          .mode {
            font-size: 25px;
          }
          &.i-left {
            text-align: right;
          }
          &.i-center {
            padding: 0 20px;
            text-align: center;
            i {
              font-size: 40px;
            }
          }
          &.i-right {
            text-align: left;
          }
          .icon-like {
            color: $color-theme-l;
          }
        }
      }
    }
    &.normal-enter-active,
    &.normal-leave-active {
      transition: all 0.4s;
      .top,
      .bottom {
        transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32);
      }
    }
    &.normal-enter,
    &.normal-leave-to {
      opacity: 0;
      .top {
        transform: translate3d(0, -100px, 0);
      }
      .bottom {
        transform: translate3d(0, 100px, 0);
      }
    }
  }
  .mini-player {
    display: flex;
    align-items: center;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 180;
    width: 100%;
    height: 60px;
    background: #fff;
    box-shadow: 0 -1px 3px rgba(0, 0, 0, 0.1);
    &.mini-enter-active,
    &.mini-leave-active {
      transition: all, 0.4s;
    }
    &.mini-enter,
    &.mini-leave-to {
      opacity: 0;
    }
    .icon {
      flex: 0 0 40px;
      width: 40px;
      padding: 0 10px 0 20px;
      img {
        border-radius: 50%;
        &.play {
          animation: rotate 10s linear infinite;
        }
        &.pause {
          animation-play-state: paused;
        }
      }
    }
    .text {
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex: 1;
      overflow: hidden;
      .name {
        margin-bottom: 2px;
        line-height: 14px;
        @include no-wrap();
        font-size: $font-size-medium;
        color: $color-text;
      }
      .desc {
        @include no-wrap();
        font-size: $font-size-small;
        color: $color-text;
      }
    }
    .control {
      position: relative;
      flex: 0 0 30px;
      width: 30px;
      padding: 0 10px;
      .iconfont {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-45%, -50%);
        font-size: 20px;
      }
    }
    .musiclist {
      font-size: 40px;
    }
  }
}
</style>
