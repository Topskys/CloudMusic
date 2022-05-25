<template>
  <div class="mv grid">
      <VideoItem v-for="item,idx in mvs" :key="idx" :item="item"  />
  </div>
</template>

<script>
import VideoItem from "@/components/list/VideoItem";
import {reqArtMV}from '@/network/middle/artist'
export default {
    name:'mv',
    props:{
        id:{
            type:Number,
            default:null,
        }
    },
    data(){
        return {
            mvs:[],
        }
    },
    components:{
        VideoItem,
    },
    mounted(){
        reqArtMV(6452).then(res=>{this.mvs=res.mvs})
    }
}
</script>

<style lang='scss' scoped>
.mv{
    width:100%;
    display:grid;
    grid-template-columns: repeat(auto-fill,200px);
    gap: 20px;
}
</style>