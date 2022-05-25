<template>
  <div class="sheetItem" @click="toPlay(item.id)">
    <div class="item">
      <img :src="item.picUrl" alt="200" />
      <div class="r-t">
        <span class="el-icon-caret-right" v-show="item.playCount"></span
        ><span v-show="item.playCount">{{
          item.playCount >9999
            ? (item.playCount / 10000).toFixed(0) + "万"
            : item.playCount
        }}</span>
      </div>
    </div>
    <div class="text">{{ item.name }}</div>
    <div class="creator" v-show="item.artistName">{{ item.artistName}}</div>
  </div>
</template>

<script>
export default {
  name: "sheetItem",
  // 接收父组件传值
  props: {
    item: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    //前往歌单的歌曲列表
    toPlay(id) {
      if (!id) return;
      this.$router.push("/vmdetail/" + id);
      console.log("/vmdetail/" + id);
    },
  },
};
</script>

<style lang="scss" scoped>
//code 格式化：Shift + Alt + F
.sheetItem {
  cursor: pointer;
  border-radius: 10px;
  .item {
    position: relative;
    img {
      display: block;
      width: 100%;
      // height: 100%;
      max-height: 140px;
      border-radius: 10px;
    }
    .r-t {
      position: absolute;
      top: 0;
      right: 0;
      span {
        color: #fff;
        font-size: 12px;
        padding: 2px 5px;
        display: inline-block;
      }
    }
  }
  .text {
    width: 100%;
    max-height: 40px;
    font-size: 14px;
    margin-top: 10px ;
    overflow: hidden;
  }
  .creator{
      width: 100%;
      height: 21px;
      color: #888;
      font-size: 14px;
      overflow: hidden;
    margin: 5px 0 ;

  }
}
</style>