<template>
  <div class="lh r-flex">
    <div class="l logo">
      <a href="/discover">
        <img src="@/assets/img/logo.png" />
      </a>
    </div>
    <div class="r r-flex">
      <div class="arrow r-flex">
        <i class="el-icon-arrow-left" @click="$router.go(-1)"></i>
        <i class="el-icon-arrow-right" @click="$router.go(1)"></i>
      </div>
      <div class="sea-box">
        <input
          type="text"
          v-model="input"
          class="input"
          @keyup.enter="onSubmit"
        /><i class="el-icon-search"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'leftHeader',
  data() {
    return {
      input: "猜你喜欢",
    };
  },
  methods: {
    //   reload(){
    //     window.location.reload()//刷新//window.location.go(-1)//刷新上一页面
    //   },
    // backward() {
    //   window.history.go(-1); //  window.history.go(-1)//后退//.back(-1)//退后+刷新
    // },
    // forward() {
    //   this.$router.forward(); //  window.history.go(1)//前进//.forward//前进
    // },
    onSubmit(e) {
      if (e.keyCode == 13 && this.input) {
        this.toSearch();
      }
    },
    // 跳转至搜索结果
    toSearch() {
      this.$router.push({ name: "search", params: { keywords: this.input} });
    },
  },
};
</script>

<style lang="scss" scoped>
.lh {
  align-items: center;
  .logo {
    width: 125px;
    margin-right: 80px;
    img {
      width: 100%;
    }
  }
  .r {
    align-items: center;
    .arrow {
      color: #e37575;
      flex-wrap: nowrap;
      margin-right: 8px;
      i {
        font-size: 10px;
        margin: 4px;
        padding: 6px;
        border-radius: 50%;
        border: none;
        cursor: pointer;
        background: #d83b3b;
        &:hover {
          color: #fbd9d9;
        }
      }
    }
    .sea-box {
      position: relative;
      display: inline-block;
      .input {
        height: 12px;
        max-width: 120px;
        // width: 200px;
        padding: 10px 10px 10px 30px;
        appearance: none;
        border: none;
        border-radius: 20px;
        color: #f9d8d8; //#e66161 #f8cece
        font-size: 14px;
        background-color: #d83b3b;
        outline: 0;
      }
    }
  }
  .el-icon-search {
    color: #f9d8d8;
    font-size: 14px;
    position: absolute;
    left: 10px;
    top: 10px;
    z-index: 2;
  }
}
</style>