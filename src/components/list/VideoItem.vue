<template>
  <div class="vi">
      <div class="item c-flex"  @click="toPlay(item.id)">
      <div class="l-img">
        <img :src="item.imgurl||item.coverImgUrl||item.picUrl+'?param=200y130'" />
        <div class="r-top"><i class="el-icon-caret-right"></i>{{ (item.playCount / 10000).toFixed(0) }}万</div>
        <span class="time">{{item.duration| showTime}}</span>
      </div>
      <div class="des c-flex">
        <div class="intro">{{item.name}}</div>
        <!-- <div class="name" v-show='false'></div> -->
      </div>
    </div>
  </div>
</template>

<script>
import { timeFormat } from "@/util/uctil";
export default {
    name:'videoItem',
    props:{
        item:{
            type:Object,
            default(){
                return {}
            }
        },
    },
    methods:{
        toPlay(id){
            this.$router.push('/vmdetail'+id)
        }
    },
    filters: {
    showTime(value) {
      return timeFormat(value);
    },
  },
}
</script>

<style lang="scss" scoped>
.vi{
    cursor: pointer;
    // width:200px;
  .l-img {
    position: relative;
    // width: 200px;
    height: 130px;
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
    .time{
        position:absolute;
        bottom:5px;
        right:5px;
        color:white;
        font-size:12px;
        border-bottom-right-radius: 5px;
    }
  }
  .des {
      width: 100%;
    margin-top: 5px;
    .intro {
      color: #373737;
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space:nowrap;
    }
    .name {
      color: #999;
      font-size: 14px;
    }
  }
}
</style>