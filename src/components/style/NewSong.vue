<template>
  <div class="newSong">
    <ToBar title="最新音乐" path="/discover/latest" />
    <div class="grid">
      <div class="song-box r-flex" v-for="(item, index) in songs" :key="index" @click="toPlaySong(item.id)">
        <div class="img-box">
          <img :src="item.picUrl" v-if='item.picUrl'/>
          <img src="@/assets/img/test.jpg" v-else/>
          <i class="el-icon-video-play"></i>
        </div>
        <div class="des-box c-flex">
          <div class="top">{{item.song.name}}</div>
          <div class="down r-flex">
            <span class="sq" v-show="item.alg">SQ</span>
            <span class="sq" v-show="item.song.mvid" @click='toPlayMV(item.song.mvid)'>MV</span>
            <span class="artists" @click='artistsLink(item.song.artists[0].name)'>{{item.song.artists[0].name}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ToBar from "@/components/middle/title/ToBar";
import { RqtNewSong, } from "@/network/middle/home";
import {RqtSongUrl,RqtSongDetail} from '@/network/song'
import {NOW_MUSICMENU, NOW_MUSIC} from '@/store/mutationType'
export default {
  data() {
    return {
      songs: {},
    };
  },
  components: {
    ToBar,
  },
  mounted() {
    RqtNewSong().then((res) => {
      this.songs = res.result;
    });
  },
  methods: {

      toPlaySong(sid){
          RqtSongUrl(sid).then(res=>{
              this.$store.commit(NOW_MUSIC,res.data[0].url)
          })
          RqtSongDetail(sid).then(res=>{
              this.$store.commit(NOW_MUSICMENU,res.songs[0])
          })
      },
      toPlayMV(mvid){
           RqtSongUrl(mvid).then(res=>{
              this.$store.commit(NOW_MUSIC,res.data[0].url)
          })
          RqtSongDetail(mvid).then(res=>{
              this.$store.commit(NOW_MUSICDETAIL,res.songs[0])
          })
      },
      artistsLink(name){//
        //   search()
      },
  },
};
</script>

<style lang="scss" scoped>
.grid {
  display: grid;
  grid-template-rows: repeat(4, 1fr);
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.newSong {
  width: 100%;
  color: #373737;
  margin: 1em 0;
  .song-box {
    width: 260px;
    border-radius: 5px;
    &:hover{
        background: whitesmoke;
    }
    .img-box {
      width: 46px;
      height: 46px;
      cursor: pointer;
      margin-right: 10px;
      position: relative;
      img {
        width: 100%;
        height: 100%;
        border-radius: 5px;
        background-position: center;
        background-size: cover;
        
      }
      i {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: #ec4141;
        font-size: 20px;
        
      }
      &:hover{
          i{
            color: white;
          }
        }
    }
    .des-box {
        width: 80%;
        justify-content: space-evenly;
        font-size: 14px;
      .top {
        width: 100%;
        height: 20px;
        line-height: 20px;
        color: #373737;
        white-space: nowrap; //文字不换行
        overflow: hidden;
        text-overflow: ellipsis; //...
      }
      .down {
        width: 100%;
        height: 20px;
        // line-height: 20px;
        color: #999;
        white-space: nowrap; //文字不换行
        overflow: hidden;
        text-overflow: ellipsis; //...
        align-items: center;
        .sq {
            font-size: 12px;
          color: #ec4141;
          padding: 0 2px;
          margin-right:5px;
          border: 1px solid #ec4141;
          border-radius: 2px;
        }
        .artists{
            cursor: pointer;
        }
      }
    }
  }
}
</style>