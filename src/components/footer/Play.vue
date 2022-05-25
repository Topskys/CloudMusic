<template>
  <div class="play c-flex">
      <div class="icons r-flex">
        <i class="el-icon-caret-left" @click="preMusic"></i>
        <i :class="isplay?'el-icon-video-play':'el-icon-video-pause'" @click="playMusic"></i>
        <i class="el-icon-caret-right" @click="nextMusic"></i>
        <!-- <i class="iconfont icon-xiayiqu1"></i>
        <i class="iconfont icon-liebiao4"></i> -->
      </div>
      <div class="slider r-flex">
        <span class="currentTime">{{musicDuration | showTime}}</span>
        <el-slider
          v-model="musicDuration"
          :max="totalDuration"
          @change="musicDurationChange"
          :show-tooltip="false"
          :disabled="isUrl"
          class="s"
        ></el-slider>
        <span class="overTime">{{getTime}}</span>
      </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import  LiterTable from '@/components/middle/list/LiterTable'
import { timeFormat, songTimeFormat } from "@/util/uctil";
import {
  NOW_MUSICMENU,
  NOW_MUSIC,
  ADD_COUNT,
  SUB_COUNT,
  CLEAR_COUNT,
  SET_DURATION,
  SET_PLAY,
} from "@/store/mutationType";
import { getMusicUrl, getMusicMenu } from "@/network/home";
export default {
  name: "BottomBar",
  components:{
    LiterTable,
  },
  computed: {
    ...mapGetters([
      "getNowMusic",
      "getNowMusicMenu",
      "getMusicListIds",
      "getMusicCount",
      "getDuration",
    ]),
    getTime() {
      return timeFormat(this.getNowMusicMenu.dt);
    },
  },
  data() {
    return {
      isplay: false, //播放状态
      musicDuration: 0, //音乐当前播放时间
      totalDuration: 100, //总时长 默认先给个100
      isUrl: true, //设置无歌曲时进度条不可拖动
      value: 100, //音量
      debace: true, //简单防抖
      // 展示右边的歌单对话框
      showRightDialog: false,
    };
  },
  mounted() {
    //先执行一次给播放器设置 timeupdate 实时观察
    this.musicDurationChange();
    // setTimeout(res => {
    //   console.log(this.getDuration);
    // },5000)
  },
  methods: {
    //显示右下角歌单
    showRightList() {
      this.showRightDialog = true;
    },
    //跳转到单曲播放页面 retuen false 是取消默认事件 也可以用 .native
    togSingel() {
      if (!this.getNowMusicMenu.id) return false;
      this.$router.push("/singel");
      return false;
    },
    // 下一首音乐
    nextMusic() {
      //判断播放歌单是否有歌
      if (this.getMusicListIds.length === 0) return false;
      // vuex中的数量增加
      this.$store.commit(ADD_COUNT);
      //获取地址和信息
      this.getMusicUrl(this.getMusicListIds[this.getMusicCount]);
      this.getMusicMenu(this.getMusicListIds[this.getMusicCount]);
      return false;
    },
    preMusic() {
      if (this.getMusicListIds.length === 0) return;
      this.$store.commit(SUB_COUNT);
      this.getMusicUrl(this.getMusicListIds[this.getMusicCount]);
      this.getMusicMenu(this.getMusicListIds[this.getMusicCount]);
      return false;
    },
    getMusicUrl(id) {
      getMusicUrl(id).then((res) => {
        this.$store.commit(NOW_MUSIC, res.data[0].url);
      });
    },
    getMusicMenu(id) {
      getMusicMenu(id).then((res) => {
        this.$store.commit(NOW_MUSICMENU, res.songs[0]);
      });
    },
    volumeChange() {
      let audio = this.$refs.audio;
      audio.volume = this.value / 100;
    },
    musicDurationChange() {
      let audio = this.$refs.audio;
      audio.currentTime = this.musicDuration;
      // this.$store.commit(SET_DURATION,audio.currentTime);
      // audio.currentTime = this.getDuration;
      audio.addEventListener("timeupdate", () => {
        //获取歌曲的总长度 example: 257s
        this.totalDuration = audio.duration;
        //获取歌曲时间
        this.musicDuration = audio.currentTime;
        this.$store.commit(SET_DURATION, audio.currentTime);
        // 当前歌曲播放完毕自动播放下一首
        if (audio.currentTime >= audio.duration) {
          if (this.getMusicListIds.length > 0) {
            if (this.debace) {
              this.debace = false;
              this.nextMusic();
              setTimeout((res) => {
                this.debace = true;
              }, 500);
            }
          }
          this.isplay = false;
          this.$store.commit(SET_PLAY, this.isplay);
        }
      });
      // if (this.isplay) return;
      this.isplay = true;
      this.$store.commit(SET_PLAY, this.isplay);
    },
    playMusic() {
      if (this.getNowMusic !== "") {
        if (!this.$refs.audio.paused) {
          this.$refs.audio.pause();
        } else {
          this.$refs.audio.play();
        }
        this.isplay = !this.isplay;
        this.$store.commit(SET_PLAY, this.isplay);
      }
      return false;
    },
  },
  filters: {
    showTime(value) {
      return songTimeFormat(value);
    },
  },
  watch: {
    getNowMusic() {
      this.isplay = true;
      this.$store.commit(SET_PLAY, this.isplay);
      this.isUrl = false;
    },
    getMusicListIds() {
      this.$store.commit(CLEAR_COUNT);
      this.getMusicUrl(this.getMusicListIds[this.getMusicCount]);
      this.getMusicMenu(this.getMusicListIds[this.getMusicCount]);
    },
  },
};
</script>


<style lang="scss" scoped>
.play{
    justify-content: space-evenly;
    align-items: center;
    .icons{
        i{
            font-size:22px;
            margin: 5px 20px;
            cursor: pointer;
        }
    }
    .slider{
        width: 400px;
        height: 30px;
        justify-content:space-between;
        align-items: center;
        span{
            padding: 0 10px;
            font-size: 12px;
            color: #666666;
        }
    }
}
.s{
    width: 100%;
}
</style>