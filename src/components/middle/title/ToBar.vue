<template>
  <div class="title" v-if="isShow">
    <!-- <router-link :to="path" class="link " >
      <span >{{ title }}</span> <i class="iconfont icon-you"></i>
    </router-link> -->
    <div class="txt" ><span @click="toPage(path)">{{ title }}</span> <i class="iconfont icon-you"></i></div>
  </div>
</template>

<script>
export default {
  //接受父组件参数
  props: {
    isShow: {
      type: Boolean,
      default: true,
    },
    title: {
      type: String,
      default: "title",
    },
    path: {
      type: String,
      default: "/",
    },
  },
  methods: {
    //页面跳转
    toPage(path) {
      this.$router.push(path);
    }
  },
};
</script>

<style lang="scss" scoped>
.title {
  width: 100%;
  margin: 15px 0;
  // .link{
  //   text-decoration: none;
  //   span{
  //     font-size: 20px;
  //     font-weight: 600;
  //   }
  // }
  .txt{
    color:black;
    font-size: 20px;
    font-weight: 600;
    text-decoration:none;
  }
}
</style>