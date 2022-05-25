<template>
  <div class="middle">
    <el-container class="container" >
      <el-aside width='200px'>
        <AsideBar class="asideBar"/>
      </el-aside>
      <el-main  v-loading="false">
        <transition :name="transitionName">
          <keep-alive exclude="Artist">
            <router-view class="router"></router-view>
          </keep-alive>
        </transition>
      </el-main>
      <!-- <div class="core" v-loading="false">
        <transition :name="transitionName">
          <keep-alive exclude="">
            <router-view></router-view>
          </keep-alive>
        </transition>
      </div> -->
    </el-container>
  </div>
</template>

<script>
import AsideBar from "@/components/aside/AsideBar";
export default {
  data() {
    return {
      transitionName: "",
      asideHgt:'',
    };
  },
  components: {
    AsideBar,
  },

  mounted() {
    this.$nextTick(()=>{ // 页面渲染完成后的回调
        //this.asideHgt=document.querySelector('.Middle').offsetHeight+'px'
        //console.log(this.asideHgt)
        
        //  console.log(this.$refs.middle.$el.offsetHeight+'px')
        // console.log(document.querySelector('.Footer').offsetHeight+'px')
        // console.log(document.body.clientHeight)
    })
  },
  watch: {
    //使用watch 监听$router的变化
    $route(to, from) {
      //如果to索引大于from索引,判断为前进状态,反之则为后退状态
      // console.log(to.meta.index,from.meta.index);
      if (from.meta.index == 0 && to.meta.index > from.meta.index) {
        //设置动画名称
        this.transitionName = "slide-left";
        return;
      }
      if (to.meta.index == 0 && to.meta.index < from.meta.index) {
        this.transitionName = "slide-right";
      }
      if (to.meta.index > 1 && to.meta.index > from.meta.index) {
        //设置动画名称
        this.transitionName = "slide-com";
      }
      if (to.meta.index > 1 && to.meta.index < from.meta.index) {
        //设置动画名称
        this.transitionName = "slide-back";
      }
      // } else {
      //   this.transitionName = "slide-back";
      // }
    },
  },
};
</script>

<style lang="scss" scoped>

.middle {
  .container {
    height: calc(100vh - 135px);
  }
}
.el-aside{
  box-sizing: border-box;
  border-right: 1px solid lightgrey;
}
/* 滚动条样式 */
::-webkit-scrollbar {
  width: 4px;//y
  height: 4px;//x
}
::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 255, 0.1);
  border-radius: 3px;
}


</style>

<style>
/* 全局模式 动画效果 */
.slide-right-enter-active,
.slide-right-leave-active,
.slide-com-enter-active,
.slide-com-leave-active,
.slide-back-enter-active,
.slide-back-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 500ms;
  position: absolute;
}
.slide-right-enter {
  opacity: 0;
  transform: translate3d(-100%, 100%, 0);
}
.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 100%, 0);
}
.slide-left-enter {
  opacity: 0;
  transform: translate3d(-100%, 100%, 0);
}
.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 100%, 0);
}
.slide-com-enter {
  opacity: 0;
  transform: translate3d(0, -100%, 0);
}
.slide-com-leave-active {
  opacity: 0;
  transform: translate3d(0, 100%, 0);
}
.slide-back-enter {
  opacity: 0;
  transform: translate3d(0, 100%, 0);
}
.slide-back-leave-active {
  opacity: 0;
  transform: translate3d(0, -100%, 0);
}
</style>