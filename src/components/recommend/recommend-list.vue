<template>
  <div class="recommend">
    <h2 class="title">推荐歌单</h2>
    <ul class="list-wrapper">
      <li v-for="(item, index) in data" :key="index" class="item-wrapper">
        <div class="item" @click="selectList(item)">
          <div class="mask">
            <i class="iconfont icon-headphone"></i>
            <span class="mask-text">{{ item.playCount | formatNumber }}</span>
          </div>
          <img v-lazy="item.picUrl" />
        </div>
        <div class="name-wrapper">
          <span class="name">{{ item.name }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
    },
  },
  data() {
    return {}
  },

  methods: {
    selectList() {
      console.log('select')
    },
  },
}
</script>
<style lang='scss' scoped>
.recommend {
  .title {
    font-size: $font-size-medium;
    font-weight: bold;
    color: $color-text;
    height: 45px;
    line-height: 45px;
    padding-left: 10px;
  }
  .list-wrapper {
    position: relative;
    width: 100%;
    display: flex;
    flex-flow: wrap;
    justify-content: space-around;
    .item-wrapper {
      margin-top: 5px;
      flex: 1 1 30%;
      width: 30%;
      padding: 0 5px;
      .item {
        position: relative;
        .mask {
          position: absolute;
          top: 0;
          width: 100%;
          height: 22px;
          border-radius: 4px;
          text-align: right;
          box-sizing: border-box;
          padding: 2px 4px;
          font-size: $font-size-small-s;
          color: $color-text-l;
          background: linear-gradient(
            rgba(109, 109, 109, 0.5),
            rgba(255, 255, 255, 0.02)
          );
          .mask-text {
            display: inline-block;
            margin-left: 2px;
          }
        }
        img {
          width: 100%;
          border-radius: 4px;
        }
      }
      .name-wrapper {
        margin: 5px 0 15px 0;
        font-size: $font-size-small-x;
        @include text-ellipsis-multi(2);
      }
    }
  }
}
</style>
