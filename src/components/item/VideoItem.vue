<template>
  <div class="videoItem">
    <div class="v-img" @click="toPlay(videos.vid)">
      <!-- <img src="@/assets/img/test.jpg"  /> -->
      <img :src="videos.coverUrl" alt="" />
      <div class="icon">
        <i class="el-icon-caret-right"></i
        >{{
          videos.playTime > 10000
            ? (videos.playTime / 10000).toFixed(0) + "万"
            : videos.playTime
        }}
      </div>
      <div class="time">{{ videos.durationms}}</div>
    </div>
    <div class="des c-flex">
      <div class="intro">
        <span class="mv">MV</span
        ><span class="txt">{{ videos.title.slice(0, 10) }}</span>
      </div>
      <div class="artists">{{ videos.creator[0].userName }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "videoItem",
  props: {
    videos: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    toPlay(vid) {
      this.$router.push("/vmdetail/" + vid);
    },
  },
};
</script>

<style lang="scss" scoped>
.videoItem {
  cursor: pointer;
  .v-img {
    position: relative;
    border-radius: 5px;
    // min-width: 240px;
    // min-height: 140px;
      height: 157.13px;

    img {
      // max-width: 279.33px;
      // max-height: 157.13px;
      width: 100%;
      height: 100%;
      border-radius: 5px;
      // background-position: center;
      // background-size: cover;
    }
    .icon {
      position: absolute;
      top: 2px;
      right: 5px;
      color: white;
      font-size: 12px;
    }
    .time {
      position: absolute;
      bottom: 5px;
      right: 5px;
      color: white;
      font-size: 12px;
    }
    .icon-play {
      display: none;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: white; //#ec4141
      font-size: 30px;
      cursor: pointer;
    }
    &:hover {
      .icon-play {
        display: block;
        z-index: 100;
      }
    }
  }
  .des {
    margin-top: 10px;
    .intro {
      .mv {
        color: #ec4141;
        font-size: 10px;
        box-sizing: border-box;
        border: 1px solid #ec4141;
        border-radius: 3px;
        margin-right: 5px;
      }
      .txt {
        color: #373737;
        font-size: 14px;
              width: 90%;

        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
    .artists {
      margin-top: 5px;
      width: 90%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      color: #999;
      font-size: 14px;
    }
  }
}
</style>