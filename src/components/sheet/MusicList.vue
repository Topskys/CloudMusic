<template>
  <div class="musicList">
    <div class="musicInfo r-flex">
      <div class="cover">
        <img :src="musicInfo.coverImgUrl" alt="smile" />
      </div>
      <div class="txt">
        <div class="title r-flex">
          <div class="titTag">歌单</div>
          <div class="titName">{{ musicInfo.name }}</div>
        </div>
        <div class="creator r-flex">
          <div class="avatar">
            <img
              :src="musicInfo.creator.avatarUrl"
              :alt="musicInfo.creator.nickname"
            />
          </div>
          <div class="info">
            <span class="name">{{ musicInfo.creator.nickname }}</span>
            <span class="setTime"
              >{{ musicInfo.createTime | showDate }}创建</span
            >
          </div>
        </div>
        <div class="btns r-flex">
          <div class="btn plays" @click="plays()">
            <span class="el-icon-video-play"></span><span>播放全部</span>
          </div>
          <div class="btn" @click="collect">
            <span class="el-icon-star-off"></span
            ><span>收藏({{ musicInfo.subscribedCount }})</span>
          </div>
          <div class="btn">
            <span class="el-icon-thumb"></span
            ><span>分享({{ musicInfo.shareCount }})</span>
          </div>
          <div class="btn">
            <span class="el-icon-download"></span><span>下载全部</span>
          </div>
        </div>
        <div class="tags">
          <span>标签：</span>
          <span class="tag" v-for="(tag, idx) in musicInfo.tags" :key="idx">{{
            musicInfo.tags.length === idx + 1 ? tag : tag + " / "
          }}</span>
        </div>
        <div class="count">
          <span>歌曲：{{ musicInfo.trackCount }}</span
          ><span>播放：{{ (musicInfo.playCount / 10000).toFixed(0) }}万</span>
        </div>
        <div class="intro">
          简介：
          {{
            musicInfo.description ? musicInfo.description.slice(0) : "暂无简介"
          }}
        </div>
      </div>
    </div>

    <div class="menu ">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="歌曲列表" name="first">
          <SongTable :load="load" :numbers="count"></SongTable>
        </el-tab-pane>
        <el-tab-pane :label="gettalk" name="second">
          <Comment />
        </el-tab-pane>
        <el-tab-pane label="收藏者" name="third">
          <SongCollect />
        </el-tab-pane>
      </el-tabs>
      <div class="find">
        <el-input
          v-model="input"
          placeholder="请输入内容"
          size="mini"
          suffix-icon="el-icon-search"
        ></el-input>
      </div>
    </div>
  </div>
</template>

<script>
import SongTable from "@/components/list/SongTable";
import SongCollect from "@/components/list/SongCollect";
import Comment from "@/components/comment/Comment";

import { formatDate } from "@/util/uctil";

export default {
  name: "songList",
  props: {},
  data() {
    return {
      musicInfo: {},
      activeName: "first",
      input: "",
      load: false,
      count:0,
    };
  },
  components: {
    SongTable,
    SongCollect,
    Comment,
  },
  created() {
    this.getMusicInfo();
  },
  methods: {
    //获取歌单详细信息
    async getMusicInfo() {
      var timestamp = Date.parse(new Date());
      const res = await this.$request({
        url: `/playlist/detail?id=${this.$route.params.id}&${timestamp}`,
      });
      this.musicInfo = res.playlist;
      this.count = this.musicInfo.trackCount;
    },

    //播放全部
    plays() {
      this.$store.commit("changePlayId", this.musicInfo.tracks[0].id);
      this.$store.commit("changePlayList", {
        playList: this.musicInfo.tracks,
        sheetId: this.musicInfo.id,
      });
    },

    //收藏歌单
    collect() {},


    //获取歌单评论
    






    //添加监听滚动条滚动事件
    listenerFunction(e) {
      window.addEventListener("scroll", this.handleScroll, true);
    },
    //判断到达一定高度时触发刷新 因为有时数据过多加载较慢 可能加载不完
    handleScroll() {
      let top = this.$refs.table.scrollTop;
      if (top > 700) {
        this.load = true;
      }
    },

  },


  mounted() {
    // console.log("进入");
    //进入添加
    document.addEventListener("scroll", this.handleScroll, true);
  },
  beforeDestroy() {
    // console.log("离开了");
    //离开清除 不然耗性能
    document.removeEventListener("scroll", this.handleScroll, true);
  },



  computed: {
    //获取评论数
    gettalk() {
      return `评论(${this.musicInfo.commentCount})`;
    },
    getnums() {
      return this.musicInfo.trackCount;
    },
  },
  filters: {
    //日期过滤
    showDate: function (value) {
      let date = new Date(value);
      return formatDate(date, "yyyy-MM-dd");
    },
  },

  watch: {
    // 利用watch方法检测路由变化：
    $route: function (to, from) {
      // 拿到目标参数 to.params.id 去再次请求数据接口
      console.log(to.params.id);
      this.id = parseInt(to.params.id);
      this.getMusicInfo(this.id);
    },
  },
};
</script>

<style lang="scss" scoped>
.musicList {
  .musicInfo {
    margin-bottom: 50px;
    .cover {
      width: 205.733px;
      height: 205.733px;
      margin-right: 20px;
      img {
        display: block;
        width: 100%;
        height: 100%;
        border-radius: 10px;
      }
    }
    .txt {
      flex: 1;
      .title {
        margin-bottom: 10px;
        align-items: center;
        .titTag {
          padding: 0 5px;
          margin-right: 5px;
          font-size: 14px;
          border: 1px solid #ff4e4e;
          border-radius: 5px;
        }
        .titName {
          font-size: 23px;
          font-weight: 600;
        }
      }
      .creator {
        align-items: center;
        img {
          width: 30px;
          height: 30px;
          display: block;
          margin-right: 10px;
          border-radius: 50%;
        }
        .name {
          color: blue;
          font-size: 14px;
          display: inline-block;
          margin-right: 10px;
        }
        .setTime {
          color: #888;
          font-size: 14px;
          display: inline-block;
        }
      }
      .btns {
        margin: 20px 0;
        align-items: center;
        .btn {
          cursor: pointer;
          font-size: 14px;
          padding: 5px 10px;
          margin-right: 10px;
          border-radius: 14px;
          border: 1px solid #ccc;
          background-color: whitesmoke;
          span {
            display: inline-block;
            &:first-child {
              margin-right: 5px;
            }
          }
          &:first-child {
            color: #fff;
            background-color: red;
          }
        }
      }
      .tags {
        font-size: 14px;
        .tag {
          color: blue;
          font-size: 14px;
          display: inline-block;
        }
      }
      .count {
        margin: 10px 0;
        span {
          display: inline-block;
          font-size: 14px;
          &:first-child {
            margin-right: 30px;
          }
        }
      }
      .intro {
        width: 500px;
        font-size: 14px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
  .menu {
    position: relative;
    width: 100%;
    margin-top: 20px;
    .find {
      position: absolute;
      top: 0px;
      right: 0;
      width: 180px;
      height: 40px;
    }
  }
}

::v-deep .el-tabs__item.is-active {
  color: black;
  font-weight: 600;
}
::v-deep .el-tabs__active-bar {
  background-color: #ec4141;
  height: 3px;
}
::v-deep .el-tabs__nav-wrap::after {
  content: "";
  height: 0;
}
::v-deep .el-input__inner {
  border-radius: 16px;
  border: none;
  outline: 0;
  height: 26px;
  background-color: whitesmoke;
}
::v-deep .el-input__icon {
  color: black;
  z-index: 2;
}
</style>