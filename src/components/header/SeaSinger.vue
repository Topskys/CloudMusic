<template>
  <div class="seaSinger">
      <div class="box r-flex" v-for="item,idx in singers" :key="idx"  @click='toSinger(item.id)'>
        <div class="l r-flex"><img :src="item.picUrl" alt=""><div class="txt">{{item.name}}</div></div>
        <div class="r"><i class="el-icon-user"></i> </div>
      </div>
  </div>
</template>

<script>
import {reqSearch} from '@/network/header'
export default {
  name:'seaSinger',
  data () {
    return {
      singers:[],
      currPage:1,
      type:100,
    }
  },
  created (){
    this.getSearch()
  },
  methods: {
    getSearch() {
      reqSearch(this.$route.params.keywords,this.currPage,this.type).then(res=>{//this.$route.params.keywords
        this.singers=res.result.artists
      })
    },
    toSinger(id){
      this.$router.push('/artist'+id)
    }
  },
}
</script>

<style lang='scss' scoped>
.seaSinger{
  
  .box{
    justify-content: space-between;
    align-items: center;
    border-radius:5px;
    cursor: pointer;
    &:nth-of-type(even){//odd 
      background:whitesmoke;
    }
    &:hover{
      background: whitesmoke;
    }
    .l{
      align-items: center;
      img{
        display: block;
        margin: 10px 0;
        width: 65px;
        height: 65px;
        border-radius: 5px;
        background-position: center ;
        background-size: cover;
        margin-right: 10px;
      }
      .txt{
        // font-size: 14px;
        color: #373737;
        white-space: nowrap;
      }
    }
    .r{
      i{
        font-size:12px;
        color: white;
        border-radius: 50%;
        padding: 5px;
        background:#ec4141;
      }
    }
  }
}
</style>