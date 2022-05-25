<template>
  <div class="seaVideo">
    <div class="videos grid">
      <VideoItem class="vi" v-for="(item, idx) in videos" :key="idx" :videos="item" />
    </div>
  </div>
</template>

<script>
import VideoItem from "@/components/item/VideoItem"
import {reqSearch} from '@/network/header'
import {resetMin} from '@/util/time'
export default {
  name:'seaVideo',
  data(){
    return{
      videos:[],
      currPage:1,
      type:1014,
    }
  },
  components:{
    VideoItem,
  },
  created(){
    this.getSearch()
  },
  methods:{
    getSearch(){
      reqSearch(this.$route.params.keywords,this.currPage,this.type).then(res=>{//this.$route.params.keywords
        this.videos=res.result.videos
        this.videos.forEach((item, index)=>{
          this.videos[index].durationms=resetMin(item.durationms)
        })
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.seaVideo{ 
  width: 100%;
  .videos{
    display:grid;
    justify-content: center;
    grid-template-columns: repeat(auto-fill, 245px);
    gap: 20px;
  }
}
</style>