<template>
  <div class="single c-flex">
    <div class="count">找到{{ sglCount }}首单曲</div>
    <el-table
      :data="sglSongs"
      style="width: 100%"
      size="small"
      @row-click="playSong"
      highlight-current-row
      stripe
    >
      <el-table-column type="index" :index="indexMethod"> </el-table-column>
      <el-table-column prop="name" label="音乐标题"> </el-table-column>
      <el-table-column prop="ar[0].name" label="歌手"> </el-table-column>
      <el-table-column prop="al.name" label="专辑"> </el-table-column>
      <el-table-column prop="dt" label="时长" width="100"> </el-table-column>
      <!-- <el-table-column  label="热度"><el-progress :percentage="sglSongs[idxpop].pop"></el-progress></el-table-column> -->
    </el-table>
    <div class="pgt" v-show="sglCount > 30">
      <el-pagination
        
        :small="true"
        background
        layout="prev, pager, next"
        :total="sglCount"
        :page-size="30"
        :current-page="currPage"
        @current-change="currChange"
        @prev-click="prev"
        @next-click="next"
        
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { reqSearch } from "@/network/header";
import { resetMin } from "@/util/time";
import { RqtSongUrl, RqtSongDetail } from "@/network/song";
import { NOW_MUSICMENU, NOW_MUSIC, SET_COUNT } from "@/store/mutationType";
export default {
  data() {
    return {
      sglSongs: [],
      currPage: 1,
      sglCount: 0,
      nowkeywords: "",
    };
  },
  created() {
    this.getSeaSingle();
  },
  computed: {},
  methods: {
    getSeaSingle() {
      //搜索请求单曲

      if (this.$route.params.keywords !== this.nowkeywords)
        this.sglSongs = null;
      reqSearch(this.$route.params.keywords, this.currPage).then((res) => {
        this.sglSongs = res.result.songs;
        this.sglCount = res.result.songCount;
        this.sglSongs.forEach((element, idx) => {
          this.sglSongs[idx].dt = resetMin(element.dt);
        });
      });
      this.nowkeywords = this.$route.params.keywords;
    },

    indexMethod(index) {
      index = 1 + index + (this.currPage - 1) * 30;
      if (index < 10) return "0" + index;
      return index;
    },
    playSong(row) {
      if (row.id === null) return;
      this.getSongUrl(row.id);
      this.getSongInfo(row.id);
    },
    getSongUrl(sid) {
      RqtSongUrl(sid).then((res) => {
        this.$store.commit(NOW_MUSIC, res.data[0].url);
      });
    },
    getSongInfo(sid) {
      RqtSongDetail(sid).then((res) => {
        this.$store.commit(NOW_MUSICMENU, res.songs[0]);
      });
    },
    currChange(page) {
      console.log("current");
      this.currPage = page;
      this.sglSongs = null;
      this.getSeaSingle();
    },
    prev() {
      console.log("prev");
      this.currPage--;
      this.sglSongs = null;
      this.getSeaSingle();
    },
    next() {
      console.log("next");
      this.currPage++;
      this.sglSongs = null;
      this.getSeaSingle();
    },
  },
};
</script>

<style lang='scss' scoped>
.single {
  width: 100%;
  justify-content: center;
  position: relative;
  .count {
    color: grey;
    font-size: 12px;
  }
  .pgt {
    margin: 20px auto;
    .el-pagination {
      font-size: 12px;
      font-weight: 400;
    }
  }
}

.active {
  background-color: #ec4141;
}

.el-pagination {
  .is-background {
    .el-pager {
      li:not(.disabled) {
        .active {
          background-color: #ec4141 !important;
          color: white !important;
        }
      }
    }
  }
}
</style>