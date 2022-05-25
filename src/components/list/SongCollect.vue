<template>
  <div class="r-flex collect">
    <div
      class="collector r-flex"
      v-for="(collector, index) in collectors"
      :key="index"
    >
      <img :src="collector.avatarUrl" alt="collector" />
      <div>
        <span>{{ collector.nickname }}</span
        ><i :class="gender[index]"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { getSongListCollect } from "@/network/home";
export default {
  data() {
    return {
      collectors: [],
      id: 0,
      gender: [],
    };
  },
  methods: {
    //获取歌单收藏者信息
    getSongListCollect(id) {
      getSongListCollect(id).then((res) => {
        //判断性别
        res.subscribers.forEach((sex) => {
          if (sex.gender === 0) {
            this.gender.push(""); //往数组末尾添加数据
          }
          if (sex.gender === 1) {
            this.gender.push("el-icon-male skyblue");
          }
          if (sex.gender === 2) {
            this.gender.push("el-icon-female pink");
          }
        });
        //console.log("sex:", this.gender);
        // console.log(res.subscribers);
        this.collectors = res.subscribers;
      });
    },
  },
  created() {
    this.id = parseInt(this.$route.params.id);
    this.getSongListCollect(this.id);
  },
};
</script>

<style lang="scss" scoped>
.r-flex {
  display: flex;
  flex-direction: row;
}
.collect {
  flex-wrap: wrap; //应许换行
  .collector {
    width: 300px;
    height: 100px;
    margin: 10px;
    align-items: center;
    overflow: hidden;
    color: #373737;
    font-size: 13px;

    img {
      border-radius: 50%;
      width: 90px;
      height: 90px;
      margin-right: 10px;
    }
    i {
      margin: 5px;
    }
  }
}
.skyblue {
  color: #0c73c2;
}
.pink {
  color: #ef5b9c;
}
</style>