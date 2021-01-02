<template>
  <transition name="list-fade">
    <div class="playlist" v-show="showFlag" @click="hide">
      <div class="list-wrapper" @click.stop>
        <div class="list-header">
          <h1 class="title">
            <i class="iconfont" :class="iconMode" @click="changeMode"></i>
            <span class="text"
              >{{ modeText }} (<span class="count">{{ playlist.length }}</span
              >)
            </span>
            <span class="clear" @click="showConfirm">
              <i class="iconfont icon-icon27"></i>
            </span>
          </h1>
        </div>
        <scroll
          ref="listContent"
          class="list-content"
          :data="sequenceList"
          :refreshDelay="refreshDelay"
        >
          <transition-group name="list" tag="ul">
            <li
              class="item"
              ref="listItem"
              @click="selectItem(item, index)"
              v-for="(item, index) in sequenceList"
              :key="item.id"
            >
              <i class="current iconfont" :class="getCurrentIcon(item)"></i>
              <span class="text">{{ item.name }}</span>
              <span @click.stop="toggleFavorite(item)" class="like">
                <i class="iconfont" :class="getFavoriteIcon(item)"></i>
              </span>
              <span class="delete" @click.stop="deletOne(item)">
                <i class="iconfont icon-close"></i>
              </span>
            </li>
          </transition-group>
        </scroll>
        <div @click="hide" class="list-close">
          <span>关闭</span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { Dialog } from 'vant'
import { mapActions } from 'vuex'
import { playMode } from '@/utils/config'
import { shuffle } from '@/utils/common'
import { playerMixin } from '@/utils/mixin'
export default {
  mixins: [playerMixin],
  data() {
    return {
      showFlag: false,
      refreshDelay: 100,
    }
  },
  computed: {
    modeText() {
      return this.mode === playMode.sequence
        ? '顺序播放'
        : this.mode === playMode.random
        ? '随机播放'
        : '单曲循环'
    },
    iconMode() {
      if (this.mode === playMode.sequence) {
        return 'icon-23_shunxubofang'
      } else if (this.mode === playMode.loop) {
        return 'icon-Loop'
      } else {
        return 'icon-random'
      }
    },
  },
  methods: {
    showConfirm() {
      Dialog.confirm({
        title: '清空',
        message: '清空播放列表?',
      })
        .then(() => {
          this.deleteSongList()
          this.$emit('stopMusic')
        })
        .catch(() => {})
    },
    getCurrentIcon(item) {
      if (this.currentSong.id === item.id) {
        return 'icon-right'
      }
      return ''
    },
    selectItem(item, index) {
      if (this.mode === playMode.random) {
        // 找到需要播放的歌曲在播放顺序里面的索引
        index = this.playlist.findIndex((song) => {
          return song.id === item.id
        })
      }
      // if (!this.playing) {
      //   this.setPlayingState(true)
      // }
      this.setCurrentIndex(index)
    },
    changeMode() {
      const mode = (this.mode + 1) % 3
      this.setPlayMode(mode)
      let list = null
      if (mode === playMode.random) {
        list = shuffle(this.sequenceList)
      } else {
        list = this.sequenceList
      }
      this.resetCurrentIndex(list)
      this.setPlaylist(list)
    },
    resetCurrentIndex(list) {
      let index = list.findIndex((item) => {
        // 返回 index
        return item.id === this.currentSong.id
      })
      console.log('index', index)
      this.setCurrentIndex(index)
    },
    deletOne(item) {
      this.deleteSong(item)
      if (!this.playlist.length) {
        this.hide()
        this.$emit('stopMusic')
      }
    },
    show() {
      this.showFlag = true
      setTimeout(() => {
        this.$refs.listContent.refresh()
        this.scrollToCurrent(this.currentSong)
      }, 20)
    },
    hide() {
      this.showFlag = false
    },
    scrollToCurrent(current) {
      const index = this.sequenceList.findIndex((song) => {
        return current.id === song.id
      })
      this.$refs.listContent.scrollToElement(this.$refs.listItem[index], 300)
    },
    ...mapActions(['deleteSong', 'deleteSongList']),
  },
}
</script>

<style lang="scss" scoped>
.playlist {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 200;
  background-color: rgba(0, 0, 0, 0.3);
  &.list-fade-enter-active,
  &.list-fade-leave-active {
    transition: opacity 0.3s;
    .list-wrapper {
      transition: all 0.3s;
    }
  }
  &.list-fade-enter,
  &.list-fade-leave-to {
    opacity: 0;
    .list-wrapper {
      transform: translate3d(0, 100%, 0);
    }
  }
  .list-wrapper {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    border-radius: 5px;
    background-color: $color-background;
    .list-header {
      position: relative;
      padding: 20px 20px 10px 20px;
      .title {
        display: flex;
        align-items: center;
        .iconfont {
          margin-right: 5px;
          font-size: $font-size-large-x;
          color: $color-text-g;
        }
        .text {
          flex: 1;
          font-size: $font-size-medium;
          color: $color-text;
          .count {
            position: relative;
            top: 1px;
          }
        }
        .clear {
          margin-left: 5px;
          @include extend-click();
          .iconfont {
            font-size: $font-size-large;
            color: $color-text-g;
          }
        }
      }
    }
    .list-content {
      max-height: 240px;
      overflow: hidden;
      .item {
        display: flex;
        align-items: center;
        height: 40px;
        padding: 0 20px 0 20px;
        overflow: hidden;
        &.list-enter-active,
        &.list-leave-active {
          transition: all 0.1s;
        }
        &.list-enter,
        &.list-leave-to {
          height: 0;
        }
        .iconfont {
          color: $color-theme;
          margin-right: 5px;
        }
        .text {
          flex: 1;
          @include no-wrap();
          line-height: 20px;
          font-size: $font-size-medium;
          color: $color-text;
        }
        .delete {
          @include extend-click();
          font-size: $font-size-large;
          color: $color-theme;
        }
      }
    }
    .list-close {
      text-align: center;
      line-height: 50px;
      background: $color-background;
      font-size: $font-size-medium-x;
      color: $color-text;
    }
  }
}
</style>
