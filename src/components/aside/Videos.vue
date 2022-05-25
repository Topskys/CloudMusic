<template>
  <div class="videos c-flex">
    <div class="bigTitle">
      <div class="r-flex tab">
        <!-- 参考来自netease-cloud-music的playVideo -->
        <span :class="{ active: isActive('/video/default') }" @click="ClickTo('/video')">视频</span>
        <span :class="{ active: isActive('/video/mv') }" @click="ClickTo('/mv')">MV</span>
      </div>
    </div>
    <!-- 视频 MV -->
    <!-- <router-view></router-view> -->
  </div>
</template>

<script>
import { RqtVideoLabels,RqtVideosGroups } from '@/network/videoMV'
export default {
  name:'videos',//不要和html中的标签一致，控制台否则报错
  data() {
    return {
      items:{},
      preIndex:0,
      firstId:'',
    }
  },
  computed:{
    isActive() {
      return function (path) {
        return this.$route.path.includes(path);
      };
    },
  },
  created() {
    this.getDefaultVideo(this.firstId)
  },
  mounted(){
    //获取视频标签
    RqtVideoLabels().then((res) => { 
      this.items=res.data
      // this.firstId=res.data.map(i =>{return {name:i.name}}) 
      this.firstId=res.data[0].id
    })
    
  },
  methods: {
    ClickTo(path) {
      this.$router.push({ name: path, query: { id: this.$route.query.id } });
    },
    // getDefaultVideo(){//获取刚进入视频页面默认的视频标签的视频
      // RqtVideosGroups(this.firstId).then((res)=>{
        // console.log(res.data)
        // this.currentVideos=res.data
      // })
      // document.getElementsByClassName('item')[0].classList.remove('active')
      // document.getElementsByClassName('item')[0].style.color='#999'
      //   document.getElementsByClassName('item')[0].style.background='none'
    // },

    //选中label的样式及发送请求
    // getLabelVideos(labelId,index){
      // if(this.preIndex !== '' && this.preIndex!==index){
      //   document.getElementsByClassName('item')[this.preIndex].classList.remove('active')
      //   // document.getElementsByClassName('item')[0].style.color='#999'
      //   // document.getElementsByClassName('item')[0].style.background='none'
      // }
      // this.preIndex=index
      // document.getElementsByClassName('item')[index].classList.add('active')
      // //请求标签视频
      // console.log(document.getElementsByClassName('item')[index])
    // }
  },
};
</script>

<style lang='scss' scoped>
.videos{
  width: 100%;
  .tab{
    margin: 10px 0;
    align-items: center;
    span{
      display: inline-block;
      margin: 0 20px;
      height: 25px;
      line-height: 25px;
      color: #373737;
      cursor: pointer;
    }
    .active{
      font-weight: 600;
      border-bottom: 3px solid #ec4141;
    }
  }
}

// .active {
//   border-bottom: 4px solid #ec4141;
// }

// .video {
//   .bigTitle{
//     ul{
//       padding:  0;
//       list-style: none;
//       li{
//         color: #373737;
//         padding: 0 20px;
//       }
//       .linkActive {
//         font-weight: 600;
//         font-size: 20px;
//         border-bottom: 2px solid #ec4141;
//       }
//     }
//   }
//   .labels{
//     ul{
//       width: 100%;
//       padding:  0;
//       margin-top: 0;
//       list-style: none;
//       overflow: auto;
//       li{
//         white-space: nowrap;
//         color: #999;
//         font-size: 13px;
//         padding: 2px 10px;
//         border-radius: 12px;
//         &:hover{
//           background: whitesmoke;
//         }
//         &:nth-child(1){
//           // color: #ec4141; 
//           // background: whitesmoke;
//           .active{
//       color: #ec4141; 
//       background: whitesmoke;
// }
//         }
//       }
//       .active{
//       color: #ec4141; 
//       background: whitesmoke;
// }
//     }
//   }
// }
//labels选中


//滚动条
::-webkit-scrollbar {
  width: 0px;//竖直
  height: 0px;//横
}
::-webkit-scrollbar-thumb {//颜色
  background-color: rgba(0, 0, 255, 0.1);
  // border-radius: 3px;
}
</style>