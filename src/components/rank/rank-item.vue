<template>
  <div class="rank-item" @click="selectItem(data)">
    <div class="img-wrapper">
      <img v-lazy="data.coverImgUrl" />
      <div class="mask">
        <span class="text">{{ data.updateFrequency }}</span>
      </div>
    </div>
    <ul class="song-list">
      <li v-for="(item, index) in data.tracks" :key="index" class="song-item">
        {{ index + 1 + '.  ' + item.first + '-' + item.second }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
    },
  },
  computed: {},
  methods: {
    selectItem(data) {
      this.$emit('selectItem',data)
    },
  },
}
</script>
<style lang='scss' scoped>
.rank-item {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  box-sizing: border-box;
  padding: 4px;
  border-bottom: 1px solid rgba($color: #333, $alpha: 0.1);
  .img-wrapper {
    position: relative;
    flex: 0 0 100px;
    width: 100px;
    height: 100px;
    margin: 4px;
    .mask {
      position: absolute;
      bottom: 0;
      width: 100%;
      border-radius: 3px;
      text-align: center;
      background: linear-gradient(
        rgba(255, 255, 255, 0.01),
        rgba(0, 0, 0, 0.2)
      );
      .text {
        font-size: $font-size-small-ss;
        color: $color-text-l;
      }
    }
    img {
      width: 100%;
      border-radius: 3px;
    }
  }
  .song-list {
    font-size: $font-size-small;
    color: $color-text-g;
    margin-left: 12px;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 100px;
    overflow: hidden;
    li {
      line-height: 30px; // 显示英文下半部分
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>
