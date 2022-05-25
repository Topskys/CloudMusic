<template>
  <div class="swiper" >
    <el-carousel :interval="4000" type="card" height="222.22px" >
      <el-carousel-item v-for="(banner,index) in banners" :key="index">
        <!-- <img :src="banner.imageUrl" alt="" > -->
        <el-image  :src="banner.imageUrl" style="width: 600px; "></el-image>
        <!-- <el-tag
          :type="banner.typeTitle === '独家' ? 'danger' : 'primary'"
          effect="dark"
          style="position: absolute; bottom:5%;right:0;border-radius: 10px 0 0 10px;height:19px;line-height:19px;"
        >{{banner.typeTitle}}</el-tag> -->
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  data(){
    return{
      banners:[],
    }
  },
  created(){
    this.getSwiper()
  },
  methods: {
    async getSwiper(){
      const res=await this.$request({
        url: "/banner"
      })
      this.banners=res.banners
    }
  }
};
</script>

<style lang="scss" scoped>
::v-deep .el-carousel__item{
  border-radius: 10px;
}
::v-deep .el-image__inner{
  border-radius:10px;
}

.swiper{
  width: 100%;
}

</style>

