<template>
  <div class="sheet">
    <div class="HQ">
      <img :src="hq.coverImgUrl" class="bgImg" />
      <div class="hq-des r-flex">
        <div class="l"><img :src="hq.coverImgUrl" /></div>
        <div class="r c-flex">
          <div class="t-txt"><i class="el-icon-star-off"></i>精品歌单</div>
          <div class="m-txt">{{ hq.name }}</div>
          <div class="b-txt">{{ hq.copywriter }}</div>
        </div>
      </div>
    </div>
    <div class="sort r-flex">
      <div class="s-all" @click='selectAll'>全部歌单<i class="el-icon-arrow-right"></i></div>
      <div class="s-tag">
        <span
          class="tag-item"
          v-for="(ht, idx) in hotTags"
          :key="idx"
          @click="selectTag(idx)"
          >{{ ht.name }}</span
        >
      </div>
    </div>
    <div class="sheets grid">
      <ListBox v-for="(item, idx) in sheets" :key="idx" :item="item" />
    </div>
  </div>
</template>

<script>
import {
  RqtHQCover,
  RqtHotTags,
  RqtSheets,
  RqtAllSortTags,
} from "@/network/song";
import ListBox from "@/components/list/ListBox";
import $ from "jquery";
export default {
  data() {
    return {
      hq: {},
      hotTags: [],
      allTags: {},
      sheets: [],
      currTag: {},
      allTag:{},
      currPage: 1,
      currSheet: {},
      beIdx: null,
    };
  },
  components: {
    ListBox,
  },
  mounted() {
    RqtHQCover().then((res) => {
      this.hq = res.playlists[0];
    });
    this.getHotTags();
  },
  methods: {
    getHotTags() {
      RqtHotTags().then((res) => {
        this.currTag = res.tags[0];
        this.hotTags = res.tags;
      });
    },
    getSheets() {
      this.sheets = []
      RqtSheets(this.currTag.name, this.currPage).then((res) => {
        this.sheets = res.playlists;
      });
    },
    getAllSTags() {
      RqtAllSortTags().then((res) => {
        this.allTags = res.sub;
      });
    },
    selectAll() {
      //$(".tag-item")[this.beIdx].classList.remove("t-active");
      //this.currTag=this.allTag
      this.currPage = 1;
      //this.getSheets();
    },
    selectTag(idx) {
      console.log("st：", idx);
      if (this.beIdx !== null)
        $(".tag-item")[this.beIdx].classList.remove("t-active");
      this.beIdx = idx;
      $(".tag-item")[idx].classList.add("t-active");
      this.currTag = this.hotTags[idx];
      this.currPage = 1;
      this.getSheets();
    },
    preNextPage(page) {
      this.currPage = page;
      this.getSheets();
    },
    //页面跳转
  },
  created() {
    this.getSheets();
  },
};
</script>

<style lang='scss' scoped>
.HQ {
  width: 100%;
  height: 170px;
  cursor: pointer;
  border-radius: 10px;
  position: relative;
  overflow: hidden;
  .bgImg {
    width: 100%;
    z-index: -1;
    border-radius: 10px;
    transform: translateY(-80px);
    filter: blur(30px) brightness(70%);
    background-position:center;
    // background-size:cover;
  }
  .hq-des {
    position: absolute;
    top: 15px;
    left: 15px;
    width: 100%;
    align-items: center;
    .l {
      width: 140px;
      height: 140px;
      margin-right: 10px;
      img {
        width: 100%;
        // background-position: center;
        // background-size: cover;
        border-radius: 10px;
      }
    }
    .r {
      .t-txt {
        i {
          margin-right: 5px;
        }
        width: 110px;
        padding: 5px;
        text-align: center;
        font-size: 14px;
        color: goldenrod;
        margin-bottom: 20px;
        white-space: nowrap;
        border-radius: 16px;
        box-sizing: border-box;
        border: 1px solid goldenrod;
      }
      .m-txt {
        color: #fff;
        font-size: 16px;
        font-weight: 500;
        white-space: nowrap;
      }
      .b-txt {
        color: #999;
        font-size: 14px;
        margin: 10px;
        white-space: nowrap;
      }
    }
  }
  .sheets {
    width: 100%;
  }
}
.grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  // grid-template-rows: repeat(4,1fr);
  gap: 20px;
}

.sort {
  margin: 25px 0;
  justify-content: space-between;
  align-items: center;
  .s-all {
    padding: 2px 10px;
    font-size: 14px;
    border-radius: 16px;
    border: 1px solid #999;
    color: #373737;
    cursor: pointer;
  }
  .s-tag {
    .tag-item {
      display: inline-block;
      color: #999;
      font-size: 12px;
      margin: 2px 10px;
      border-radius: 5px;
      cursor: pointer;
    }
    .t-active {
      color: #ec4141;
      background: whitesmoke;
    }
  }
}
</style>