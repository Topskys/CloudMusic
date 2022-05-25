<template>
  <div class="discover">
    <TopBar class="topBar"/>
    <transition :name="transitionName">
      <keep-alive exclude="">
        <router-view></router-view>
      </keep-alive>
    </transition>
    <ToTop/>
  </div>
</template>

<script>
import TopBar from "@/components/middle/title/TopBar";
import ToTop from "@/components/footer/ToTop";
export default {
  name: "Home",
  components: {
    TopBar,
    ToTop,
  },
  data() {
    return {
      transitionName: "",
    };
  },
   watch: {
    //使用watch 监听$router的变化
    $route(to, from) {
      //如果to索引大于from索引,判断为前进状态,反之则为后退状态
      if (to.meta.index > from.meta.index) {
        //设置动画名称
        this.transitionName = "slide-left";
      } 
      if(to.meta.index < from.meta.index){
        this.transitionName = "slide-right";
      }
      // if (to.meta.index = from.meta.index) {
      //   //设置动画名称
      //   this.transitionName = "slide-com";
      //   }
      // } else {
      //   this.transitionName = "slide-back";
      // }
    },
  },
};
</script>
<style  scoped>
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 255, 0.1);
  border-radius: 3px;
}
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 500ms;
  position: absolute;
}
.slide-right-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
</style>
