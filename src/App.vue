<template>
  <div id="app">
    <Header />
    <Middle />
    <Footer />
  </div>
</template>

<script>

import Header from '@/views/Header'
import Middle from '@/views/Middle'
import Footer from '@/views/Footer'

export default {
  name: 'app',
  components:{
    Header,
    Middle,
    Footer,
  },
}
</script>

<style lang="scss" >
#app {
  width: 100%;
  min-width: 960px;
  height: 100vh;
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10+ and Edge */
  user-select: none; /* Standard syntax */
  font-family:"Microsoft YaHei","微软雅黑",Arial,sans-serif;
  /* 引入图标css库 */
	//@import url("https://cdn.bootcdn.net/ajax/libs/font-awesome/5.15.4/css/all.css");

  $wy-red:#ff4e4e;
  $wy-888:#888;
  $wy-blue:#ccc;
}
</style>
