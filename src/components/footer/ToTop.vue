<template>
  <!-- 使用注意：滚动的盒子必须有个固定的高度，且设有 overflow-y:scroll; 否则会出现scrollTop=0的情况 -->
  <div
    class="toTop"
    :class="isToTop ? 'showBtn' : isFirstLoad ? '' : 'hideBtn'"
    @click="toTop"
  >
    <i class="el-icon-top"></i>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isToTop: false,
      isFirstLoad: true,
      which: "",
    };
  },
  props: {
    whichToTop: {
      type: String,
      default: "",
    },
  },
  mounted() {
    //绑定滚动事件 法1
    // window.addEventListener('scroll',this.handleScroll,true)
    //法2
    if (this.whichToTop === "") {
      this.which = document;
      this.el = document.documentElement; //body
    } else {
      this.which = document.querySelector(this.whichToTop); //whichToTop
      this.el = this.which;
    }
    this.which.onscroll = (e) => {
      if (this.el.scrollTop >= 50 && this.isToTop) {
        this.isToTop = true;
        this.isFirstLoad ? (this.isFirstLoad = false) : "";
      } else if (this.el.scrollTop < 50 && !this.isToTop) {
        this.isToTop = false;
      }
    };
  },
  methods: {
    // handleScroll(e){ //法1 续
    //     e.target.scrollTop >30 ? (this.isToTop=true):(this.isToTop=false)
    // },
    // toTop(){
    //     // document.getElementById("app").scrollIntoView();
    //     let top=document.documentElement.scrollTop||document.body.scrollTop
    //     const turnToTop=setInterval(()=>{
    //         document.body.scrollTop=document.documentElement.scrollTop=top-=50
    //         if(top<=0){
    //             clearInterval(turnToTop)
    //         }
    //     },500)
    // }
    toTop() { //法2 续
      this.el.scrollTo({
        behavior: "smooth",
        top: 0,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.toTop {
  position: fixed;
  right: 50px;
  bottom: -50px;
  z-index: 100;
  cursor: pointer;
  padding: 10px;
  background: whitesmoke;
  border-radius: 50%;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
  &:hover:hover {
  box-shadow: 0 20px 25px -8px rgba(0, 0, 0, 0.1),
    0 10px 10px -8px rgba(0, 0, 0, 0.04);
}
  i {
    font-size: 16px;
    clear: #999;
  }
  &:hover {
    color: black;
  }
}
.showBtn {
  animation: showBtn 0.7s ease;
  animation-fill-mode: forwards;
}
.hideBtn {
  animation: hideBtn 0.3s ease-in;
  animation-fill-mode: forwards;
}

@keyframes showBtn {
  0% {
    bottom: -50px;
  }
  50% {
    bottom: 110px;
  }
  100% {
    bottom: 85px;
  }
}

@keyframes hideBtn {
  from {
    bottom: 85px;
  }
  to {
    bottom: -50px;
  }
}
</style>