<template>
  <div class="style">
      <Swiper/>
      <RmdSheet/>
      <!-- <HotPodcast/> -->
      <Only/>
      <RmdMV/>
      <NewSong/>
  </div>
</template>

<script>
import Swiper from '@/components/style/Swiper'
import RmdSheet from '@/components/style/RmdSheet'
import Only from '@/components/style/Only'
import RmdMV from '@/components/style/RmdMV'
import NewSong from '@/components/style/NewSong'
// import HotPodcast from '@/components/middle/style/HotPodcast'
export default {
  components:{
    Swiper,
    RmdSheet,
    Only,
    RmdMV,
    NewSong,
    // HotPodcast,
  }
}
</script>

<style lang="scss" scoped>
.style{
  overflow: hidden;
}
</style>