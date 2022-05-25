<template>
  <div class="singer c-flex">
    <div class="sort c-flex">
      <TagBar :tagBars="areas" @selected="selectArea" />
      <TagBar :tagBars="types" title="分类" @selected="selectType" />
      <TagBar :tagBars="initials" title="帅选" @selected="selectInitial" />
    </div>
    <div class="singer-psr grid">
      <div class="poster c-flex" v-for="(a, idx) in artists" :key="idx" @click="toArtDetail(a.id)">
        <div class="s-img">
          <img :src="a.picUrl + '?param=400y400'" :alt="a.name" />
        </div>
        <div class="s-name">{{ a.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import TagBar from "@/components/middle/title/TagBar";
import { reqArtists } from "@/network/middle/artist";
export default {
  name: "Singer",
  data() {
    return {
      artists: [],
      areas: [
        { name: "全部", value: -1 },
        { name: "华语", value: 7 },
        { name: "欧美", value: 96 },
        { name: "日本", value: 8 },
        { name: "韩国", value: 16 },
        { name: "其他", value: 0 },
      ],
      types: [
        { name: "全部", value: -1 },
        { name: "男歌手", value: 1 },
        { name: "女歌手", value: 2 },
        { name: "乐队组合", value: 3 },
      ],
      initials: [
        { name: "热门", value: -1 },
        { name: "A", value: "a" },
        { name: "B", value: "b" },
        { name: "C", value: "c" },
        { name: "D", value: "d" },
        { name: "E", value: "e" },
        { name: "F", value: "f" },
        { name: "G", value: "g" },
        { name: "H", value: "h" },
        { name: "I", value: "i" },
        { name: "J", value: "j" },
        { name: "K", value: "k" },
        { name: "L", value: "l" },
        { name: "M", value: "m" },
        { name: "N", value: "n" },
        { name: "O", value: "o" },
        { name: "P", value: "p" },
        { name: "Q", value: "q" },
        { name: "R", value: "r" },
        { name: "S", value: "s" },
        { name: "T", value: "t" },
        { name: "U", value: "u" },
        { name: "V", value: "v" },
        { name: "W", value: "w" },
        { name: "X", value: "x" },
        { name: "Y", value: "y" },
        { name: "Z", value: "z" },
        { name: "#", value: "0" },
      ],
      area: -1,
      type: -1,
      initial: -1,
      currPage:1,
    };
  },
  components: {
    TagBar,
  },
  mounted() {
    this.getSingers();
  },
  methods: {
    getSingers() {//area,type,initial,currPage
      reqArtists(this.area,this.type,this.initial,this.currPage).then((res) => {
        this.artists.push(...res.artists); 
      });
    },
    selectArea(title, value) {
      console.log("area:",value)
      this.area=value
      this.artists=[]//清空
      this.getSingers()
    },
    selectType(title, value) {
      this.type=value
      this.artists=[]//清空
      this.getSingers()
      console.log("type:",value)

    },
    selectInitial(title, value) {
      this.initial=value
      this.artists=[]//清空
      console.log("initial:",value)
      this.getSingers()
    },
    toArtDetail(id){
      this.$router.replace('/artist'+id)
    },
    load(){}
  },
  computed: {},
};
</script>

<style lang='scss' scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
}
.singer {
  width: 100%;
  .singer-psr {
    width: 100%;
    margin: 10px 0;
    .poster {
      overflow: hidden;
      .s-img {
        width: 100%;
        // margin-bottom: 20px;
        img {
          width: 100%;
          height: 100%;
          border-radius: 8px;
        }
      }
      .s-name {
        color: #373737;
        margin-top: 10px;
      }
    }
  }
}
</style>