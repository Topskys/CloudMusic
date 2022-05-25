<template>
  <div class="footer r-flex">
    <div class="left r-flex">
      <div class="avatar">
        <img :src="getNowMusicMenu.al.picUrl" />
        <i
          :class="isFSPlay ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"
          @click="fullScreenPlay"
        ></i>
      </div>
      <div class="describe c-flex">
        <div class="song r-flex">
          <div class="name">
            {{ getNowMusicMenu.name || getNowMusicMenu.al.name }}
          </div>
          <div class="like">
            <i :class="isLike ? 'el-icon-star-on' : 'el-icon-star-off'"></i>
          </div>
        </div>
        <div class="singer">{{ getNowMusicMenu.ar[0].name }}</div>
      </div>
    </div>

    <div class="center c-flex">
      <audio :src="getNowMusic" autoplay class="playMusicAudio" ref="audio"></audio>
      <div class="btns">
        <i class="iconfont icon-shangyiqu1" @click="preMusic"></i>
        <i
          :class="isplay ? 'iconfont icon-zanting7' : 'iconfont icon-bofang3'"
          @click="playMusic"
        ></i>
        <i class="iconfont icon-xiayiqu" @click="nextMusic"></i>
      </div>
      <div class="slider r-flex">
        <span class="currentTime">{{ musicDuration | showTime }}</span>
        <el-slider
          v-model="musicDuration"
          :max="totalDuration"
          @change="musicDurationChange"
          :show-tooltip="false"
          :disabled="musicDuration === 0"
          class="song-progress"
        ></el-slider>
        <span class="overTime">{{ getTime }}</span>
      </div>
    </div>

    <div class="right r-flex">
      <div class="sound">
        <i class="iconfont icon-laba1"></i>
        <el-slider
          v-model="sound"
          vertical
          :show-tooltip="false"
          height="100px"
          class="sound-slider"
          @input="changeSound"
        >
        </el-slider>
      </div>
      <div class="list-icon"><i class="iconfont icon-liebiao1"></i></div>
    </div>

    <!-- <el-drawer :visible.sync="drawer" :with-header="false" width="300">
      <div class="drawerHeader">总{{ musicList.length }}首</div>
      <el-table
        :data="musicList"
        stripe
        style="width: 100%"
        :show-header="false"
        @row-dblclick="clickRow"
        highlight-current-row
        lazy
      >
        <el-table-column prop="name" width="150px"> </el-table-column>
        <el-table-column prop="ar[0].name" width="80px"> </el-table-column>
        <el-table-column prop="dt" width="70px"> </el-table-column>
      </el-table>
    </el-drawer> -->
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import LiterTable from "@/components/list/LiterTable";
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
  components: {
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
      sound: 100, //音量
      value: 100,
      debace: true, //简单防抖
      // 展示右边的歌单对话框
      showRightDialog: false,
      //
      isFSPlay: false,
      isLike: false,
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
    fullScreenPlay() {
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
    changeSound() {
      let audio = this.$refs.audio;
      audio.volume = this.sound / 100;
    },
    musicDurationChange() {
      let audio = this.$refs.audio;
      //audio.currentTime = this.musicDuration;
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
.footer {
  width: 100%;
  height: 75px;
  padding: 0px 18px;
  z-index: 100;
  box-sizing: border-box;
  border-top: 1px solid #ddd;
  background-color: white;
  justify-content: space-between;
  align-items: center;
  .left {
    width: 200px;
    overflow: hidden;
    align-items: center;
    .avatar {
      width: 46px;
      height: 46px;
      position: relative;
      margin-right: 10px;
      img {
        display: block;
        width: 100%;
        height: 100%;
        border-radius: 5px;
      }
      i {
        display: none;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
      &:hover {
        i {
          display: block;
          cursor: pointer;
        }
      }
    }
    .describe {
      width: 144px;
      justify-content: space-around;
      .song {
        .name {
          font-size: 14px;
          max-width: 118px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        i {
          flex: 1;
          font-size: 16px;
          margin-left: 10px;
        }
      }
      .singer {
        color: #aaa;
        font-size: 14px;
      }
    }
  }
  .center {
    align-items: center;
    .btns {
      // height: 14px;
      margin-top: 5px;
      i {
        display: inline-block;
        color: black;
        font-size: 20px;
        margin: 0px 15px;
        cursor: pointer;
        &:nth-child(2) {
          font-size: 24px;
          z-index: 100;
        }
      }
    }
    .slider {
      height: 14px;
      margin-top: 10px;
      overflow: hidden;
      align-items: center;
      span {
        display: block;
        color: #aaa;
        font-size: 12px;
        margin: 0 10px;
        text-align: center;
      }
      .song-progress {
        width: 300px;
      }
    }
  }
  .right {
    width: 200px;
    justify-content: flex-end;
    align-items: center;
    .list-icon {
      margin-left: 20px;
      cursor: pointer;
    }
    .sound {
      position: relative;
      i {
        cursor: pointer;
      }
      &:hover {
        .sound-slider {
          display: block;
        }
      }
      .sound-slider {
        ::v-deep .el-slider__button {
          width: 10px !important;
          height: 10px !important;
          border: #ccc !important; //!important 提高指定样式规则的应用优先权（优先级）
          background-color: #ff4e4e;
        }
        ::v-deep .el-slider__runway {
          height: 100px !important;
        }
        ::v-deep .el-slider__bar {
          // height: 4px !important;
          background-color: #ff4e4e !important;
        }

        display: none;
        // transform: rotate(-90deg);
        position: absolute;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
      }
    }
  }
}
::v-deep {
  //修改elementUI固有样式
  .el-slider__button {
    width: 10px !important;
    height: 10px !important;
    border: #ccc !important; //!important 提高指定样式规则的应用优先权（优先级）
    &:hover {
      background-color: #ff4e4e;
    }
  }

  .el-slider__runway {
    height: 4px !important;
  }
  .el-slider__bar {
    height: 4px;
    background-color: #ff4e4e !important;
  }
}

::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 255, 0.1);
  border-radius: 3px;
}
.footer {
  .el-dialog {
    position: absolute;
    right: 100px;
    bottom: 80px;
    max-height: 600px;
    overflow: auto;
    color: #888;
  }
}
// .slider {
//   .el-slider__bar {
//     background-image: linear-gradient(to left, #a1c4fd 0%, #c2e9fb 100%);
//   }
// }
</style>