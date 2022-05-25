<template>
  <div class="sheetItem" @click="toSheetList(item.id)">
    <div class="item">
      <img :src="item.coverImgUrl || item.picUrl" alt="200" />
      <div class="r-t">
        <span class="el-icon-headset"></span
        ><span>{{
          item.playCount >9999
            ? (item.playCount / 10000).toFixed(0) + "万"
            : item.playCount
        }}</span>
      </div>
    </div>
    <div class="text">{{ item.name }}</div>
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
    toSheetList(id) {
      this.$router.push("/sheet/" + id);
      console.log("/sheet/" + id);
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
      height: 100%;
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
    margin: 10px 0;
    overflow: hidden;
  }
}
</style>