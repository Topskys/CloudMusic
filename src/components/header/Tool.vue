<template>
  <div class="tools r-flex">
    <i class="iconfont icon-pifu1"></i>
    <i class="iconfont icon-icon-test10"></i>
    <i class="iconfont icon-icon-test5"></i>
    <i
      :class="isFSIcon ? 'el-icon-bottom-left' : 'el-icon-full-screen'"
      @click="isScreenfull"
    ></i>
  </div>
</template>

<script>
import screenfull from "screenfull"; // npm install screenfull
export default {
  data() {
    return {
      isFSIcon: false,
    };
  },
  created() {
    // init
    screenfull.on("change", () => {
      console.log("全屏：", screenfull.isFullscreen);
      this.isFSIcon = screenfull.isFullscreen;
    });
  },
  methods: {
    isScreenfull() {
      //检测是否兼容浏览器
      // if (!screenfull.isEnabled) {
      //   this.$message({
      //     message: "该浏览器不支持全屏显示！",
      //     type: "warning",
      //   });
      //   return false;
      // }
      screenfull.toggle(); //full
      this.isFSIcon = !this.isFSIcon;
    },
  },
};
</script>

<style lang="scss" scoped>
.tools {

  align-items: center;
  i {
    color: #fbd9d9;
    font-size: 18px;
    padding: 5px;
    margin-left: 15px;
  }
}
</style>