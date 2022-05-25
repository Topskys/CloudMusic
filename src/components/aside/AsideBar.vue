<template>
  <div class="asideBar c-flex">
    <!-- <el-menu
        :default-active="indexActive"
        :default-openeds="openActive"
        :router="true"
        @select="handleSelect"
        class="el-menu-demo"
        active-text-color="#ec4141"
      >
        <el-menu-item v-for="tab in tabs" :key="tab.title" :index="tab.index">{{
          tab.title
        }}</el-menu-item>
        <el-submenu index="myMusic">
          <template slot="title">我的音乐</template>
          <el-menu-item
            v-for="sub in subs"
            :key="sub.title"
            :index="sub.index"
            >{{ sub.title }}</el-menu-item
          >
        </el-submenu>
        <el-submenu index="establish">
          <template slot="title">
            <span>创建的歌单</span> <i class="el-icon-add"></i>
          </template>
          <el-menu-item
            :index="'3-' + index"
            v-for="(item, index) in UserSongs"
            :key="item.id"
            class="song-list"
            @click="toUESongs(item.id)"
          >
            <i
              :class="[index === 0 ? 'el-icon-star-on' : 'el-icon-s-data']"
            ></i>
            {{ item.name }}
          </el-menu-item>
        </el-submenu>
      </el-menu> -->

    <!-- <div>
      <ul>
        <router-link
          v-for="tab in tabs"
          :key="tab.title"
          :to="tab.index"
          custom
          v-slot="{ navigate, isActive }"
        >
          <li @click="navigate" :class="isActive ? 'tabActive' : ''" class="fontSize">
            {{ tab.title }}
          </li>
        </router-link>
        <li style="font-size: 14px; color: #999999">我的音乐</li>
        <router-link
          v-for="sub in subs"
          :key="sub.title"
          :to="sub.index"
          custom
          v-slot="{ navigate, isActive }"
        >
          <li
            @click="navigate"
            :class="isActive ? 'subActive' : ''"
            
          >
            {{ sub.title }}
          </li>
        </router-link>
      </ul>
    </div> -->
    <div class="aside-item " v-for="(tab,idx) in tabs" :key="idx"  @click="selectTab(tab.index)" :class="$route.path.includes(tab.index)?'active':''"><i v-show="tab.icon" :class="tab.icon"></i>{{tab.title}}</div>
  </div>
</template>

<script>
import { getUserAnchor } from "@/network/login.js";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      tabs: [
        { title: "发现音乐", index: "/discover", icon:"" },
        // { title: "播客", index: "/podcast", icon:"" },
        { title: "视频", index: "/video", icon:"" },
        { title: "朋友", index: "/friend", icon:"" },
        { title: "直播", index: "/live", icon:"" },
        // { title: "私人FM", index: "/privateFM", icon:"" },

        { title: "本地下载", index: "/local", icon:"el-icon-download" },
        { title: "最近播放", index: "/recent", icon:"el-icon-time" },
        // { title: "我的音乐云盘", index: "/myCloudROM", icon:"el-icon-cloudy" },
        // { title: "我的播客", index: "/myPodcast", icon:"el-icon-mic" },
        { title: "我的收藏", index: "/myCollect", icon:"el-icon-star-off" },
      ],
      // subs: [
      //   { title: "本地下载", index: "/local" },
      //   { title: "最近播放", index: "/recent" },
      //   { title: "我的音乐云盘", index: "/myCloudROM" },
      //   { title: "我的播客", index: "/myPodcast" },
      //   { title: "我的收藏", index: "/myCollect" },
      // ],
      // indexActive: "/discover/style",
      // openActive: "myMusic",
      // currentUserInfo:
      //   // window.localStorage.getItem("currentUserInfo") === "null"? null: JSON.parse(window.localStorage.getItem("currentUserInfo")),
      //   window.localStorage.getItem("currentUserInfo") === "null"
      //     ? null
      //     : JSON.parse(
      //         JSON.stringify(window.localStorage.getItem("currentUserInfo"))
      //       ),
    };
  },
  created() {
    if (this.currentUserInfo) {
      getUserAnchor(this.currentUserInfo.userId);
    }
  },
  computed: {
    ...mapGetters(["UserSongs"]),
  },
  methods: {
    selectTab(path){
      if(this.$route.path===path) return
      this.$router.replace(path)
    },





    // toMyCollect(id) {
    //   this.$router.push("/myCollect" + id);
    // },
    // getUserAnchor(uid){
    //   getUserAnchor(uid).then(res => {
    //     console.log(res);
    //   })
    // },
    // togSongs(id) {
    //   console.log(id);
    //   this.$router.push("/songs" + id);
    // },
    // handleSelect(key, keyPath) {
    //   console.log(key, keyPath);
    //   // :router='true'之后可以由路由器操作，也可以不开启router用下面方式跳转
    //   // this.$router.push(key)
    //   // console.log(this.$router.push('/'+key))
    // },
  },
};
</script>

<style lang="scss" scoped>
.asiderBar{
  box-sizing: border-box;
  z-index: 100;
}
.el-menu{
  border: none;
  // width: 200px;
  font-size: 16px;
}
.el-menu-item,
.el-submenu .el-menu-item {
  
  height: 40px;
  line-height: 40px;
}
.el-menu-item:focus{
  // font-weight: 600;
  border-radius:4px;
  outline: 0;
  background-color: #f6f6f7;
}
.el-menu-item:hover {
  outline: 0;
  background-color: #f6f6f7;

}
.song-list {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 12px;
}

// ::-webkit-scrollbar {
//   width: 4px;
// }
// ::-webkit-scrollbar-thumb {
//   background-color: rgba(0, 0, 255, 0.1);
//   border-radius: 3px;
// }


.asideBar{
  width: 175px;
  margin: 10px;
  // background: red;
  .aside-item{
    // width: inherit;
    height: 40px;
    line-height: 40px;
    border-radius: 5px;
    padding-left: 10px;
    i{
      font-size: 17px;
      margin-right: 5px;
    }
    &:hover{
      background:whitesmoke;
    }
  }
  .active{
    font-weight: 600;
    background:whitesmoke;
  }
}



</style>


<style lang="scss" scoped>

// ul {
//   // width: 200px;
//   display: flex;
//   // flex: 1;
//   flex-direction: column;
//   box-sizing: border-box;
//   list-style-type: disc;
//   margin-block-start: 1em;
//   margin-block-end: 1em;
//   margin-inline-start: 0px;
//   margin-inline-end: 0px;
//   padding-inline-start: 10px;
//   li {
//     //flex: 1;
//     //text-align: center;
//     color: #333333;
//     margin-right: 5px;
//     padding: 0 8px;
//     height: 37px;
//     line-height: 37px;
//     list-style: none;
//     border-radius: 4px;
//     &:hover {
//       background-color: #f6f6f7;
//     }
//   }
// }
// .tabActive {
//   //color: red;
//   //border-bottom: 2px solid red;
//   outline: 0;
//   font-weight: 600;
//   background-color: #f6f6f7;
// }
// .subActive {
//   //color: red;
//   //border-bottom: 2px solid red;
//   outline: 0;
//   background-color: #f6f6f7;
// }
// .fontSize {
//   //font-weight:345;
//   font-size: 18px;
// }

// ::-webkit-scrollbar {
//   width: 8px;
// }
// ::-webkit-scrollbar-thumb {
//   background-color: rgba(0, 0, 255, 0.1);
//   border-radius: 3px;
// }
</style>


