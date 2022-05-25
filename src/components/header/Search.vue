<template>
  <div class="search">
      <div class="top-bar">
        <div class="title">
        <span
          v-for="(link, idx) in links"
          :key="idx"
          :class="actIdx==idx? 'active' : ''"
          @click="linkTo(link.path,idx)"
          >{{ link.title }}</span
        >
      </div>
      <!-- <div class="found">
        找到<span>首单曲</span><span>位歌手</span><span>张专辑</span><span>个视频</span>
      </div> -->
      </div>
     <routerView></routerView>
  </div>
</template>

<script>
export default {
  name: "search",
  data() {
    return {
      links: [
        { title: "单曲", path: `/search/default/${this.$route.params.keywords}` },
        { title: "歌手", path: `/search/seasinger/${this.$route.params.keywords}` },
        { title: "专辑", path: `/search/seaablum/${this.$route.params.keywords}` },
        { title: "视频", path: `/search/seavideo/${this.$route.params.keywords}` },
      ],
      count: 12,
      actIdx:0,
    };
  },
  created() {
    console.log(this.$route.params.keywords,this.$route.path);
    this.links.forEach((item, idx) => {
      if (decodeURI(this.$route.path).search(item.path) != -1) {
        this.actIdx = idx;
      }
    });
  },
  methods: {
    linkTo(path,idx){
      if(this.actIdx==idx||this.$route.path==path) return 
      this.actIdx=idx
      return this.$router.push(path)
    }
  },
};
</script>

<style lang='scss' scoped>
.search {
  
    .title {
      margin-bottom: 20px;
      align-items: center;
      span {
        display: inline-block;
        padding-bottom: 2px;
        margin: 0 10px;
        color: #373737;
        font-size: 15px;
        &:nth-child(1) {
          padding-left: 0;
          margin-left: 0;
        }
        cursor: pointer;
      }
      .count {
        color: #999;
        font-size: 12px;
      }
    }
  }
.active {
        font-weight: 600;
        border-bottom: 3px solid #ec4141;
      }
</style>

