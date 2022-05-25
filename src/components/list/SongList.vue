<template>
  <div class="songList c-flex" ref="table">
    <div class="top r-flex">
      <div class="img">
        <img :src="songList.coverImgUrl" alt="404" />
      </div>
      <div class="top-txt">
        <ul>
          <li>
            <div class="topic r-flex">
              <span class="tol">歌单</span>
              <span class="name">{{ songList.name }}</span>
            </div>
          </li>
          <li>
            <div class="time">
              <a href="#">
                <img :src="creators.avatarUrl" alt="404" />
              </a>
              <a href="#" class="source">{{ creators.nickname }}</a>
              <span class="time-t"
                >{{ songList.createTime | showDate }}创建</span
              >
            </div>
          </li>
          <li>
            <div class="btn">
              <el-button
                size="mini"
                type="primary"
                icon="el-icon-video-play"
                @click="playAll(songList.id)"
              >
                播放全部
                <button class="btn-a" @click.stop="subscripe(songList.id)">
                  +
                </button>
              </el-button>
              <el-button
                size="small"
                icon="el-icon-star-off"
                @click="subscripe(songList.id)"
                >收藏({{ songList.subscribedCount }})</el-button
              >
              <el-button size="small" icon="el-icon-thumb"
                >分享({{ songList.shareCount }})</el-button
              >
              <el-button size="small" icon="el-icon-download"
                >下载全部</el-button
              >
            </div>
          </li>
          <li>
            <div class="tag">
              <span>标签:</span>
              <a href="#" v-for="(item, index) in songList.tags" :key="index">{{
                index + 1 === songList.tags.length ? item : item + " / "
              }}</a>
            </div>
          </li>
          <li>
            <div class="r-flex playnum">
              <span class="num">歌曲：{{ songList.trackCount }}</span>
              <span class="plays"
                >播放：{{ (songList.playCount / 10000).toFixed(0) }}万</span
              >
            </div>
          </li>
          <li>
            <div class="brief">
              <span style="marginright: 8px">简介:</span>
              <span style="lineheight: 1.5">{{
                (songList.description + "").substr(0, 30) + "..."
              }}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div class="menu down">
      <el-tabs v-model="activeName" @tab-click="handleClick" >
        <el-tab-pane label="歌曲列表" name="first">
          <SongTable :load="load" :numbers="count"></SongTable>
        </el-tab-pane>
        <el-tab-pane :label="gettalk" name="second">
          <Comment/>
          <!-- <SongComment></SongComment> -->
        </el-tab-pane>
        <el-tab-pane label="收藏者" name="third">
          <SongCollect></SongCollect>
        </el-tab-pane>
      </el-tabs>
      <div class="find" >
        <el-input v-model="input" placeholder="请输入内容"  size="mini" suffix-icon="el-icon-search" ></el-input>
      </div>
    </div>
  </div>
</template>

<script>
import SongTable from "@/components/list/SongTable";
import SongCollect from "@/components/list/SongCollect";
// import SongComment from "@/components/middle/list/SongComment";
import Comment from '@/components/comment/Comment'
import { formatDate } from "@/util/uctil";
import { getSongListInfo } from "@/network/home";
import { MUSIC_LISTIDS } from "@/store/mutationType";
export default {
  name: "SongList",
  components: {
    SongTable,
    SongCollect,
    // SongComment,
    Comment,
  },
  data() {
    return {
      id: 0,
      ids: [],
      songList: {},
      creators: {},
      activeName: "first",
      input: "",
      load: false,
      count: 0,
    };
  },
  methods: {
    //播放全部
    playAll(id) {
      // console.log(id);
      // console.log(this.ids);
      //修改vuex的歌单id数据
      this.$store.commit(MUSIC_LISTIDS, this.ids);
      // this.getSongListInfoSongs(id);
    },
    //列表切换
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    //获取歌单数据
    getSongListInfo(id) {
      getSongListInfo(id).then((res) => {
        this.songList = res.playlist;
        this.creators = res.playlist.creator;
        //遍历数组把得到歌曲id放到一个数据里面
        this.songList.trackIds.forEach((item) => {
          this.ids.push(item.id);
          this.count = this.songList.trackCount;
        });
        // console.log(this.songList);
        // this.currentSongList = { ...res};
      });
    },
    // 收藏 暂无
    subscripe(id) {
      console.log(id);
    },
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
      return `评论(${this.songList.commentCount})`;
    },
    getnums() {
      return this.songList.trackCount;
    },
  },
  created() {
    this.id = parseInt(this.$route.params.id);
    this.getSongListInfo(this.id);
    // console.log("生效了");
    // this.listenerFunction();
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
      this.getSongListInfo(this.id);
    },
  },
};
</script>

<style lang="scss" scoped>

ul {
  padding: 0;
  margin: 0;
  li {
    list-style: none;
  }
}
.songList {
  max-height: inherit;//控制songlist本身滑动条
  overflow: auto;
  .top {
    margin-bottom: 1em;
    .top-txt {
      flex: 1; //r-felx 占掉剩余的空间
      .topic {
        align-items: center;
        .tol {
          border: 1px solid red;
          border-radius: 4px;
          color: red;
          font-size: 13px;
          padding: 2px;
          margin-right: 15px;
        }
        .name {
          font-size: 23px;
          font-weight: 10px;
        }
      }
      .time {
        margin-top: 15px;
        .time-t {
          font-size: 13px;
          color: #333;
        }
        
          img {
            border-radius: 50%;
            width: 28px;
            margin-right: 8px;
            vertical-align: middle;
          }
          a{
            text-decoration: none;
            color: #0c73c2;
          }
        
      }
      .btn {
        margin-top: 15px;
        .btn-a {
          background: #ec4141;//#409eff
          cursor: pointer;
          border: none;
          color: #fff;
        }
        ::v-deep .el-button--primary{
          background-color:#ec4141;
          border: 1px solid #ec4141;
          border-radius: 16px;
        }
        ::v-deep .el-button--mini, .el-button--small{
          border: 1px solid #ddd;
          border-radius: 16px;
        }
      }
      .tag {
        margin-top: 15px;
        font-size: 13px;
        span {
          margin-right: 8px;
        }
        a {
          color: #0c73c2;
        }
      }
      .playnum {
        font-size: 13px;
        margin-top: 8px;
        .num {
          border-right: 1px solid #ccc;
          padding-right: 15px;
        }
        .plays {
          padding-left: 15px;
        }
      }
      .brief {
        font-size: 13px;
        margin-top: 8px;
      }
    }
  }
}
.menu {
  position: relative;
  width:100%;
  margin-top:20px;
}
.find {
  position: absolute;
  top: 0px;
  right: 0;
  width:180px;
  height:40px;
}
a{
  text-decoration: none;
}
.source {
  color: rgba(0, 0, 255, 0.7);
  margin-right: 8px;
}
.source:hover {
  color: blue;
}

.img {
  // width: 20%;
  width:205.733px;
  margin-right: 20px;
}
.img img {
  width: 100%;
  border-radius: 4px;
}
::v-deep .el-tabs__item.is-active{
  color: black;
  font-weight: 600;
}
::v-deep .el-tabs__active-bar{
  background-color: #ec4141;
  height: 3px;
}
::v-deep .el-tabs__nav-wrap::after {
  content:'';
  height:0;
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