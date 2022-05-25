<template>
  <div class="chart c-flex">
    <div class="government c-flex">
      <div class="title">官方榜</div>
      <div class="g-chart r-flex" v-for="(item, index) in offs" :key="index">
        <div class="g-img">
          <img :src="item.coverImgUrl" :alt="item.name" />
          <span class='ut'>{{item.updateTime | filterDate}}更新</span>
        </div>
        <div class="g-list">
          <div
            class="list-item r-flex"
            v-for="(sub, i) in songs"
            :key="i"
            @click="playSong(sub.id)"
          >
            <div class="left">
              <span :class="i < 2 ? 'topThree' : ''"  
            >{{ i + 1 }}</span
              ><span>{{ sub.alia[0]=== undefined?'':'('+sub.alia[0]+')' }}</span><span>{{ sub.name }}</span>
            </div>
            <div class="right">{{sub.ar[0].name}}</div>
          </div>
          <div class="toLink" style="color:#999; font-size:14px;" @click="toSongs(item.id)">查看全部＞</div>
        </div>
      </div>
    </div>
      <div class="title" style="margin:20px 0;">全球榜</div>
    <div class="earth grid">
      <SongItem v-for="(global, idx) in globals" :key="idx" :item="global" />
    </div>
  </div>
</template>

<script>
import ToBar from "@/components/middle/title/ToBar";
import SongItem from "@/components/middle/item/SongItem";
import {  RqtChartsDetail,RqtSongListInfoDetail } from "@/network/middle/home";
import {RqtCharts,RqtSongUrl} from '@/network/song'
import { formatDate } from "@/util/uctil";
import { NOW_MUSICMENU, NOW_MUSIC } from "@/store/mutationType";

export default {
  name:'chart',
  data() {
    return {
      offs: [],
      offDetails:[],
      nums:1,
      songs:[],
      globals: [],
      ids:[],
    };
  },
  components: {
    ToBar,
    SongItem,
  },
  created() {
    //获取排行榜列表
    RqtCharts().then((res) => {
      this.offs = res.list.slice(0, 4);
      this.globals = res.list.slice(4); //获取第四个往后
      console.log(this.offs)
    });
    
  },
  methods: {
    getChartsDetail(id){//获取榜单歌曲信息
      RqtChartsDetail(id).then(res=>{///playlist/detail
        this.offDetails=res.privileges.splice(0,5)
        console.log("ods:",this.offDetails)
        this.offDetails.map(obj=>{
          this.ids.push(obj.id)
        })
      });
      this.ids.map(good=>{
        RqtSongListInfoDetail(good).then(res=>{
          res.songs[0].num=this.nums++
          this.songs.push(res.songs[0])
        })
      })
    },
    playSong(id){
      RqtSongUrl(id).then(res=>{
        this.$store.commit(NOW_MUSIC,res.data[0].url)
      })
      RqtSongListInfoDetail(id).then(res=>{//song/detail
        this.$store.commit(NOW_MUSICMENU,res.songs[0])
      })
    },
    selectRow(event) {
      //选中样式
      if (document.querySelector(".list-item")) {
        document.querySelector(".list-item").classList.remove("active-hover");
      }
      event.classList.add("active-hover");
    },
    
    toSongs(id) {
      //跳转歌单列表
      this.selectRow()
      if (!this.$store.state.isLogin) {
        this.$message.error("Checking after logan！");
        return;
      }
      // if (id.id) {
      //   id = id.id;
      // }
      this.$router.push("/songs"+id);
    },
  },
  filters:{
    filterDate:function (value) {
      let date = new Date(value);
      return formatDate(date, "MM月dd日");
    },
  },
  watch:{
    id(val){
      this.getChartsDetail(val)
    }
  }
};
</script>

<style lang='scss' scoped>
.grid {
  display: grid;
  grid-template-rows: repeat(auto, 1fr);
  grid-template-columns: repeat(5,1fr);
  gap: 20px;
}
.chart {
  width: 100%;
  .title {
    font-size: 20px;
    font-weight: 600;
  }
  .government {
    .g-chart {
      font-size: 14px;
      margin: 30px 0;
      justify-content: space-between;
      .g-img {
        width: 170px;
        height: 170px;
        position: relative;
        margin-right: 40px;
        img {
          width: 100%;
          height: 100%;
          border-radius: 5px;
          background-position: center;
          background-size: cover;
        }
        .ut {
          position: absolute;
          top: 70%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: white;
          font-size: 12px;
        }
      }
      .g-list {
        flex: 1;
        .list-item {
          padding: 10px;
          justify-content: space-between;
          .left {
            span {
              padding: 0 5px;
              &:nth-child(2) {
                color: #999;
              }
              &:nth-child(3) {
                color: #373737;
              }
            }
            .topThree {
              color: #ec4141;
            }
          }
          .right {
            color: #999;
          }
        }
      }
    }
  }
  .earth {
    width: 100%;
  }
}
.active-hover {
  background: whitesmoke;
}
</style>