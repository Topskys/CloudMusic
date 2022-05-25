<template>
  <div class="TopBar">
    <div class="bar-item r-flex">
      <span
        class="tabs"
        v-for="(tab, idx) in tabs"
        :key="idx"
        @click="selectTab(tab.name)"
        :class="$route.path.includes(tab.name) ? 'active' : ''"
        >{{ tab.label }}</span
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabs: [
        { label: "个性推荐", name: "/discover/style" },
        { label: "专属订制", name: "/discover/exclusive" },
        { label: "歌单", name: "/discover/sheet" },
        { label: "排行榜", name: "/discover/chart" },
        { label: "歌手", name: "/discover/singer" },
        { label: "最新音乐", name: "/discover/latest" },
      ],
    };
  },
  methods: {
    selectTab(path){
      if(this.$route.path===path) return
      this.$router.replace(path)
    }
  },
};
</script>

<style lang="scss" scoped>
.TopBar {
  width: 100%;
  .bar-item {
    justify-content: center;
    align-items: center;
    .tabs{
      display: inline-block;
      padding: 2px 0;
      margin: 0px 10px  20px 10px;//上右下左
    }
  }
}
.active {
  font-weight: 600;
  border-bottom: 3px solid #ec4141;
}
</style>
