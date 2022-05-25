<template>
  <div class="listBox ">
    <div class="item c-flex"  @click="toSongs(item.id)">
      <div class="l-img">
        <img :src="item.coverImgUrl||item.picUrl" />
        <div class="r-top"><i class="el-icon-caret-right"></i>{{ (item.playCount / 10000).toFixed(0) }}万</div>
      </div>
      <div class="des c-flex">
        <div class="intro">{{item.name}}</div>
        <div class="name" v-show='false'></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    item:{
      type: Object,
      default() {
        return {};
      },
    }
  },
  methods: {
    toSongs(id){
      this.$router.push('/songs'+id)
    }
  },
};
</script>

<style lang='scss' scoped>
.listBox {
  
  cursor: pointer;
  .l-img {
    width: auto;
    position: relative;
    img {
      width: 100%;
      height: 100%;
      border-radius: 5px;
      background-position: center;
      background-size: cover;
    }
    .r-top {
      position: absolute;
      top: 2px;
      right: 5px;
      border-top-right-radius: 5px;
      color: white;
      font-size: 14px;
    }
  }
  .des {
    margin-top: 5px;
    .intro {
      color: #373737;
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .name {
      color: #999;
      font-size: 14px;
    }
  }
}
</style>