<template>
  <div class="artist c-flex">
    <div class="art-box r-flex" v-for="(art, i) in artists" :key="i">
      <div class="art-img">
        <img :src="art.picUrl" :alt="art.name" />
      </div>
      <div class="song" style="width:30%;overflow:hidden;white-space: nowrap;color:#373737;"></div>
      <div class="name">{{ art.name }}</div>
      <div class="num" style="color:#999;fontSize:12px;"></div>
      <div class="whoSet" style="color:#999;fontSize:12px;">by</div>
      <div class="playCount" style="color:#999;fontSize:14px;"><i class="el-icon-video-play"></i>万</div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang='scss' scoped>
.artist {
  width: 100%;
  .art-box {
    width: 100%;
    cursor: pointer;
    align-items: center;
    border-radius: 5px;
    overflow: hidden;
    white-space: nowrap;
    &:hover {
      background: whitesmoke;
    }
    .art-img {
      width: 56px;
      height: 56px;
      margin-right: 10px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 5px;
        background-position: center;
        background-size: cover;
      }
    }
    .name {
      color: #373737;
    }
  }
}
</style>