<template>
  <scroll
    ref="scroll"
    class="listview"
    :data="data"
    :probeType="probeType"
    :listenScroll="listenScroll"
    @scroll="scroll"
  >
    <ul>
      <li
        v-for="group in data"
        class="list-group"
        :key="group.id"
        ref="listGroup"
      >
        <h2 class="list-group-title">{{ group.title }}</h2>
        <ul>
          <li
            @click="selectItem(item)"
            v-for="item in group.items"
            class="list-group-item"
            :key="item.id"
          >
            <img v-lazy="item.avatar" class="avatar" />
            <span class="name">{{ item.name }}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div
      class="list-shortcut"
      @touchstart="onShortcutStart"
      @touchmove.stop.prevent="onShortcutMove"
    >
      <ul>
        <li
          v-for="(item, index) in shortcutList"
          class="item"
          :data-index="index"
          :key="item.id"
          :class="{ current: currentIndex === index }"
        >
          {{ item }}
        </li>
      </ul>
    </div>
    <div class="list-fixed" ref="fixed" v-show="fixedTitle">
      <div class="fixed-title">{{ fixedTitle }}</div>
    </div>
  </scroll>
</template>

<script>
import { getDataAttr } from '@/utils/dom'

const TITLE_HEIGHT = 20
export default {
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      currentIndex: 0,
      scrollY: -1,
      diff: -1, // 顶部title的偏移
    }
  },
  computed: {
    shortcutList() {
      return this.data.map((group) => {
        return group.title.slice(0, 1)
      })
    },
    fixedTitle() {
      if (this.scrollY > 0) {
        return '' // 往下滑动不变
      }
      return this.data[this.currentIndex]
        ? this.data[this.currentIndex].title
        : ''
    },
  },
  watch: {
    data: {
      handler() {
        this.$nextTick(() => {
          this._calculateHeight()
        })
      },
      // immediate: true,
    },
    scrollY(newY) {
      const listHeight = this.listHeight
      if (newY > 0) {
        this.currentIndex = 0 // 往下滑一直是第一个
        return
      }
      for (let i = 0; i < listHeight.length - 1; i++) {
        const height1 = listHeight[i]
        const height2 = listHeight[i + 1]
        // 往上滑Y是负值，落在区间时改变currentIndex,将偏移量变成第二高度减去滑动值
        if (-newY >= height1 && -newY < height2) {
          this.currentIndex = i
          this.diff = height2 + newY
          return
        }
      }
      this.currentIndex = listHeight.length - 2
    },
    diff(newVal) {
      const fixedTop =
        newVal > 0 && newVal < TITLE_HEIGHT ? newVal - TITLE_HEIGHT : 0
      // 这个判断可以使下一个title顶到上一个title时才运行后面的代码，不必每次都要操作dom
      if (this.fixedTop === fixedTop) {
        return
      }
      this.fixedTop = fixedTop
      this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`
    },
  },
  created() {
    this.touch = {}
    this.listenScroll = true
    this.listHeight = []
    this.probeType = 3
  },
  // mounted() {
  //   this.setScrollWrapperHeight()
  //   this.$refs.scroll.refresh()
  // },
  // updated() {
  //   this.$refs.scroll.refresh()
  // },
  methods: {
    selectItem(singer) {
      this.$emit('select', singer)
    },
    scroll(pos) {
      this.scrollY = pos.y
    },
    onShortcutStart(e) {
      const anchorIndex = getDataAttr(e.target, 'index')
      const firstTouch = e.touches[0]
      this.touch.y1 = firstTouch.pageY
      this.touch.anchorIndex = anchorIndex
      this._scrollTo(anchorIndex)
    },
    onShortcutMove(e) {
      const ANCHOR_HEIGHT = e.target.clientHeight
      const firshTouch = e.touches[0]
      this.touch.y2 = firshTouch.pageY
      const delta = ((this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT) | 0
      const anchorIndex = parseInt(this.touch.anchorIndex) + delta
      this._scrollTo(anchorIndex)
    },
    refresh() {
      this.$refs.scroll.refresh()
    },
    _scrollTo(index) {
      this.$refs.scroll.scrollToElement(this.$refs.listGroup[index], 0)
    },
    _calculateHeight() {
      this.listHeight = []
      const list = this.$refs.listGroup
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < list.length; i++) {
        const item = list[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
    },
  },
}
</script>
<style lang='scss' scoped>
.listview {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: $color-background;
  .list-group {
    .list-group-title {
      height: 20px;
      line-height: 20px;
      padding-left: 12px;
      font-size: $font-size-small;
      color: $color-text-l;
      background: $color-title-d;
    }
    .list-group-item {
      display: flex;
      align-items: center;
      padding: 5px 0;
      margin: 0 5px;
      border-bottom: 1px solid rgb(228, 228, 228);
      &:last-child {
        border: none;
      }
      .avatar {
        width: 50px;
        height: 50px;
        border-radius: 3px;
      }
      .name {
        margin-left: 20px;
        color: $color-text;
        font-size: $font-size-medium;
      }
    }
  }
  .list-shortcut {
    position: absolute;
    z-index: 30;
    right: 3px;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    padding: 20px 0;
    text-align: center;
    font-family: Helvetica;
    .item {
      padding: 4px;
      line-height: 1;
      color: $color-text-g;
      font-size: $font-size-small;
      font-weight: bold;
      &.current {
        color: $color-theme;
      }
    }
  }
  .list-fixed {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    .fixed-title {
      height: 20px;
      line-height: 20px;
      padding-left: 12px;
      font-size: $font-size-small;
      color: $color-text-l;
      background: $color-title-d;
    }
  }
  .loading-container {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
