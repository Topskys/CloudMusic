<template>
  <div class="rmd">
    <ToBar title="推荐歌单" path="/discover/sheet" :isShow="sheetLength>0? true:false " />
    <div class="grid">
      <SheetItem
        v-for="(sheet, index) in rmdSheets"
        :key="index"
        :item="sheet"
      />
    </div>
  </div>
</template>

<script>
import ToBar from "@/components/middle/title/ToBar";
import SongItem from "@/components/middle/item/SongItem";
import SheetItem from "@/components/item/SheetItem"
export default {
  data() {
    return {
      rmdSheets: [],
      sheetLength:0,
    };
  },
  components: {
    ToBar,
    SongItem,
    SheetItem,
  },
  mounted() {
    this.getRmdSheet()
  },
  methods: {
    //获取推荐歌单
    async getRmdSheet() {
      const res = await this.$request({
        url: "/top/playlist?limit=10",///personalized?limit=10
      });
      this.sheetLength=10;
      this.rmdSheets=res.playlists
    },
  },
};
</script>

<style lang="scss" scoped>
.rmd {
  width: 100%;
  margin: 16px 0;
  .grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(2);
    gap: 20px;
  }
}
</style>