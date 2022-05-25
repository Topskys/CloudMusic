<template>
  <div class="singInfo r-flex">
    <div class="singImg">
      <img src="@/assets/girl.jpg" />
      <i
        :class="isFSSing ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"
        @click="FSPlay"
      ></i>
    </div>
    <div class="describe c-flex">
      <div class="sing">
        <span>{{ song }}</span>
        <i :class="isLike ? 'el-icon-star-on' : 'el-icon-star-off'"></i>
      </div>
      <div class="singer">
        {{ singer }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    singImg: {
      type: String,
      default: "@/assets/girl.jpg",
    },
    song: {
      type: String,
      default: "可是你",
    },
    isLike: {
      type: Boolean,
      default: false,
    },
    singer: {
      type: String,
      default: "Topsky",
    },
  },
  data() {
    return {
      isFSPlay: true,
      isFSSing: true,
    };
  },
  methods: {
    FSPlay() {
      this.isFSPlay = !isFSPlay;
    },
  },
};
</script>

<style lang="scss" scoped>
.singInfo {
  margin-left: 18px;
  .singImg {
    width: 50px;
    height: 50px;
    position: relative;
    padding-right: 10px;

    img {
      width: 100%;
      height: 100%;
      border-radius: 4px;
    }
    i {
      //   display: none;
      position: absolute;
      bottom: 15px;
      left: 15px;
      &:hover {
        display: block;
        color: white;
        cursor: pointer;
      }
    }
  }
  .describe {
    justify-content: space-evenly;
    // align-items: center;
    .sing {
      span {
        margin-right: 5px;
      }
    }
    .singer {
      color: grey;
      font-size: 14px;
    }
  }
}
</style>