<template>
  <div class="FSPlay r-flex">
    <div class='top r-flex' >
      <i class="el-icon-arrow-down"></i>
    <div class="turntable-lyrics">
      <div class="turntable">
        <div class="needle" :class="$store.state.isPlay ? 'needleRotate' : ''"
              ref="needle">
          <img src="@/assets/img/needle.png" alt="针头">
        </div>
        <div class="disc"
              :class="[ $store.state.isPlay ? '' : 'pause',
                    $store.state.isMusicLoad ? '' : 'discAnimation',
              ]"
              ref="disc"
            >
              <img src="@/assets/img/disc.png"  alt="轮盘" />
              <img
                src="@/assets/img/test.jpg"
                alt=""
                class="musicAvatar"
               
              />
              <!-- <img
                :src="getNowMusicMenu.al.picUrl"
                alt=""
                class="musicAvatar"/> -->
            </div>
      </div>
    </div>
    
      <div class="lyrics c-flex">
        <div class="title c-flex">
          <div class="name">{{getNowMusicMenu.name || getNowMusicMenu.al.name}}</div>
          <div class="album">{{getNowMusicMenu.alia[0] || getNowMusicMenu.al.name}}</div>
          <div class="singer">{{getNowMusicMenu.ar[0].name}}</div>
        </div>
        <div class='lyricScroll' style="width: 350px;height: 350px;overflow: auto;margin-top: 25px;transition: scrollTop 0.3s;"
              ref="lyricScroll">
              <ul ref="lyric">
                <li
                  v-for="(item, i) in lrcObject"
                  :key="i"
                  :style="{color: lyricIndex === i ? 'red' : 'black'}"
                  :ref="[lyricIndex === i ? 'lyricRef' : '']"
                >{{item.c}}</li>
              </ul>
        </div>
      </div> 
    </div>
    <!-- <SongComment/>
    <div class="pagination" v-if="comment.comments && comment.comments[0]">
      <el-pagination layout='prev,pager,next'
      :total='comment.total'
      :page-size="10"
      :current-page="currentCommentPage"
      @current-change='commPageChange'
      >
      </el-pagination>
    </div> -->
    <!-- <ToTop/> -->
  <!-- </div> -->
  </div>
</template>

<script>
// import SongComment from '@/components/list/SongComment'
// import ToTop from '@/components/title/ToTop'
// import LyricsScroll from '@/components/footer/LyricsScroll'

import { mapGetters } from "vuex";
import { getSongLyric, getSongLyricComment,getSongSimi } from "@/network/home";
export default {
  data(){
    return{

    }
  },
  components:{
    // SongComment,
    // ToTop,
    // LyricsScroll,
  },
  computed:{
    ...mapGetters([
      "getNowMusic",
      "getNowMusicMenu",
      "getDuration",
      "getIsPlay",
    ]),
  },
  created(){
    this.getSongLyric(this.getNowMusicMenu.id)
  }
}
</script>

<style>
.top{
  width: 100%;
  justify-content: center;
}


.top .el-icon-arrow-down{
  position: absolute;
  top: 15px;
  left: 35px;
  font-size: 21px !important;
}

.turntable {
  width: 220px;
  margin: 0 30px 0 -40px;
}

.discContainer {
  margin-top: 60px;
  width: 220px;
  position: relative;
}

.needle {
  position: relative;
  left: 50%;
  width: 88px;
  height: 72px;
  z-index: 10000;
  transition: all 1s;
  transform-origin: 5.3px 5.3px;
}

.needle img {
  width: 100%;
}

.needleRotate {
  transform-origin: 5.3px 5.3px;
  transform: rotate(22deg);
}

.disc {
  width: 220px;
  height: 220px;
  position: relative;
  top: -12px;
}

.disc img:nth-child(1) {
  width: 100%;
}

.disc .musicAvatar {
  position: absolute;
  top: 35px;
  left: 35px;
  width: 150px;
  z-index: -1;
}

/* 碟子设置旋转动画 */
.discAnimation {
  /* infinite动画无限循环 */
  animation: disc 25s linear infinite;
  /* 动画延迟一秒 */
  animation-delay: 0.8s;
}

@keyframes disc {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>