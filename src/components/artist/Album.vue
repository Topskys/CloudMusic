<template>
  <div class="album">
    <!-- <div class="a-box r-flex" v-for="item,idx in items" :key="idx">
      <div class="left-img">
        <img :src="item.picUrl+'?param=200y200'" alt="" />
      </div>
      <div class="right">
         <p style="fontSize:18px;fontWeight:500px;">{{item.name}}</p>
        <Table :tableData="g"/>
      </div>
    </div> -->
  </div>
</template>

<script>
// import Table from '@/components/middle/list/Table'
// import { reqArtAlbum } from "@/network/middle/artist";
export default {
  name: "album",
  props: {
    // id: {
    //   type: String,
    //   default: "",
    // },
  },
  data() {
    return {
    //   albums: [],
    //   currPage:1,
    };
  },
  components:{
    //   Table,
  },
  mounted() {
    // this.getArtAlbum()
  },
  methods:{
    //   getArtAlbum(){
    //         reqArtAlbum(this.$route.params.id,this.currPage).then((res) => {//this.$route.params.id//1143033
    //             this.albums.push(...res.hotAlbums);
    //             // console.log(this.albums)映射出ids
    //         });
    //   },
       
  }
};
</script>

<style lang='scss' scoped>
.album {
    .a-box{
        .left-img{
            img{
                width: 100%;
                height: 100%;
            }
            margin-right:40px;
        }
    }
}
</style>