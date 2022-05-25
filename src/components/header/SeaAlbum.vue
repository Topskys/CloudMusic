<template>
  <div class="seaAlbum c-flex">
    <!-- <div class="count">找到{{count}}张专辑</div> -->
    <div class="box r-flex" v-for="(item, idx) in albums" :key="idx" @click='toAlbtDetail(item.id)'>
      <div class="l r-flex">
        <img :src="item.picUrl" alt="" />
        <div class="txt">{{ item.name }}</div>
      </div>
      <div class="r">{{ item.artist.name }}</div>
    </div>
  </div>
</template>

<script>
import {reqSearch} from '@/network/header'
export default {
  name: 'searchAlbum',
  data() {
    return{
      // count: 0,
      albums:[],
      currPage:1,
      type:10,
    }
  },created() {
    this.getSearch()
  },
  methods: {
    getSearch(){
      reqSearch(this.$route.params.keywords,this.currPage,this.type).then(res => {
        this.albums=res.result.albums
      });
    },
    toAlbtDetail(id){
      this.$router.push('/albums/'+id)
    }
  },
}
</script>

<style lang="scss" scoped>
.seaAlbum {
  .box {
    align-items: center;
    border-radius: 5px;
    cursor: pointer;
    &:nth-of-type(even) {
      //odd
      background: whitesmoke;
    }
    &:hover {
      background: whitesmoke;
    }
    .l {
      width: 50%;
      align-items: center;
      img {
        display: block;
        margin: 10px 0;
        width: 65px;
        height: 65px;
        border-radius: 5px;
        background-position: center;
        background-size: cover;
        margin-right: 10px;
      }
      .txt {
        // font-size: 14px;
        color: #373737;
        width:calc(100% - 100px);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    .r {
      width: 50%;
      i {
        font-size: 12px;
        color: white;
        border-radius: 50%;
        padding: 5px;
        background: #ec4141;
      }
    }
  }
}
</style>