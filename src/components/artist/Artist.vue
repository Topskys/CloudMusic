<template>
  <div class="artist">
    <div class="poster r-flex">
      <img :src="artist.picUrl + '?param=190y200'" />
      <div class="describe c-flex">
        <div class="name">{{ artist.name }}</div>
        <div class="alias" v-if="artist.alias">
          {{ artist.alias[0] }}
        </div>
        <div class="btn">
          <span class="addCollect"><i class="el-icon-plus"></i>收藏</span>
          <span class="index"><i class="el-icon-user"></i>个人主页</span>
        </div>
        <div class="nums">
          <span>单曲数量:{{ artist.musicSize }}</span
          ><span>专辑数:{{ artist.albumSize }}</span
          ><span>MV数:{{ artist.mvSize }}</span>
        </div>
      </div>
    </div>

    <div class="title">
      <span
        v-for="(link, idx) in links"
        :key="idx"
        :class="currPath === link.path ? 'active' : ''"
        @click="select(link.path)"
        >{{ link.name }}</span
      >
    </div>

    <!-- 专辑 -->
    <div class="album" v-show="isShowAlbum">
      <div class="albTopSongs50 r-flex">
        <div class="top-l">
          <img
            :src="require('@/assets/img/topSongs50.png')"
            alt=""
            style="width: 150px; height: 160px; margin-right: 40px"
          />
        </div>
        <div class="top-r">
          <!-- <div style="fontSize:18px;fontWeight:600px;">热门50首</div> -->
          <Table :tableData="hotSongs.slice(0, showNum)" @toPlay="play" />
          <p
            style="font-size: 12px; color: #999"
            @click="showAll"
            v-if="hotSongs.length > 10 && showNum === 10 ? true : false"
          >
            查看全部>
          </p>
        </div>
      </div>
    </div>
    <!-- <div class="item r-flex" v-for="item,idx in albums" :key="idx">
      <div class="left-img">
        <img :src="item.picUrl+'?param=200y200'" alt="" />
      </div>
      <div class="right">
         <p style="fontSize:18px;fontWeight:500px;">{{item.name}}</p>
        <Table :tableData="albums.slice(0,showNum)" @toPlay="play"/>
        <p style="fontSize:12px;color:#999;" @click="showAll" v-show="hotSongs.length>10&&showNum===10?true:false">查看全部></p>
      </div>
    </div> -->
  </div>
</template>

<script>
import Table from "@/components/list/Table";

import { reqArtInfo } from "@/network/middle/artist";
export default {
  name: "artist",
  data() {
    return {
      links: [
        { name: "专辑", path: "album" },
        { name: "MV", path: "mv" },
        { name: "歌手详情", path: "detail" },
        { name: "相似歌手", path: "simi" },
      ],
      artist: {},
      hotSongs: [],
      showNum: 10,
      currPath: "album",
      id: "",
      isShowAlbum: true,
    };
  },
  components: {
    Table,
  },
  mounted() {
    this.getArtInfo();
  },
  methods: {
    getArtInfo() {
      this.id = this.$route.params.id
      if (!this.id) return; //12631485
      reqArtInfo(this.id).then((res) => {
        //this.$route.params.id
        this.artist = res.artist;
        this.hotSongs = res.hotSongs;
      });
    },
    select(path) {
      if (this.currPath === path) return;
      this.currPath = path;
    },
    // setShowNum(){
    //   this.showNum=10
    // },
    showAll() {
      if (this.hotSongs.length > 10)
        return (this.showNum = this.hotSongs.length);
      // this.showNum=50
    },
    play(sid) {},
  },
};
</script>

<style lang='scss' scoped>
.artist {
  .poster {
    width: 100%;
    margin-bottom: 20px;
    img {
      border-radius: 10px;
      margin-right: 30px;
    }
    .describe {
      .name {
        font-size: 24px;
        font-weight: 600;
        margin-bottom: 10px;
      }
      .alias {
        color: #373737;
        font-size: 14px;
      }
      .btn {
        margin: 15px 0px;
        span {
          cursor: pointer;
          margin-right: 10px;
          padding: 5px 10px;
          border: 1px solid lightgrey;
          border-radius: 15px;
          box-shadow: grey;
          color: #373737;
          font-size: 14px;
          i {
            margin-right: 5px;
          }
        }
      }
      .nums {
        display: inline-block;
        color: #373737;
        font-size: 14px;
        margin-top: 10px;
        span {
          margin-right: 20px;
        }
      }
    }
  }
  .title {
    span {
      display: inline-block;
      margin: 10px;
      padding: 2px;
      cursor: pointer;
      &:first-child {
        margin-left: 0px;
      }
    }
    .active {
      font-weight: 600;
      border-bottom: 3px solid #ec4141;
    }
  }
  .albTopSongs50 {
    margin: 10px 0;
    .top-l {
      img {
        border-radius: 5px;
      }
    }
    .top-r {
      flex: 1;
    }
  }
  .item {
    .left-img {
      img {
        width: 100%;
        height: 100%;
      }
      margin-right: 40px;
    }
  }
}
</style>