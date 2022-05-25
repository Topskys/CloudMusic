<template>
  <div class="VMVDetail r-flex">
    <div class="v-detail">
      <Back title="视频详情" />
      <div class="video" ref="v">
        <video
          controls
          autoplay
          muted
          loop
          style="width: 100%; margin: 20px 0"
          id="myvideo"
          :src="vUrl"
          @play="palyVideo"
        ></video>
      </div>
      <div class="v-intro">
        <div class="creator r-flex">
          <div class="avatar r-flex">
            <img :src="vdetail.creator.avatarUrl" alt="not" />
            <div class="name">{{ vdetail.creator.nickname }}</div>
          </div>
          <div class="follow" v-show="!vdetail.creator.followed">
            <span class="el-icon-plus"></span>关注
          </div>
        </div>
        <div class="title">{{ vdetail.title }}</div>

        <div class="pbh-plays">
          <span>发布：{{ vdetail.publishTime | filterDate }}</span
          ><span>播放：{{ (vdetail.playTime / 10000).toFixed(2) }}万次</span>
        </div>
        <div class="tags">
          <span v-for="(tag, idx) in vdetail.videoGroup" :key="idx">{{
            tag.name
          }}</span>
        </div>
        <div class="describe">{{ vdetail.description.slice(0, 50) }}</div>
        <div class="btns r-flex">
          <div class="l">
            <div class="btn">
              <span class="el-icon-star-off"></span
              ><span>赞({{ vdetail.praisedCount }})</span>
            </div>
            <div class="btn">
              <span class="el-icon-plus"></span
              ><span>收藏({{ vdetail.subscribeCount }})</span>
            </div>
            <div class="btn">
              <span class="el-icon-share"></span
              ><span>分享({{ vdetail.shareCount }})</span>
            </div>
            <div class="btn">
              <span class="el-icon-download"></span
              ><span><a :href="vUrl" download="" />下载</span>
            </div>
          </div>
          <div class="r">
            <a href="">举报</a>
          </div>
        </div>
      </div>
      <!-- <div class="comment" v-if="hotComments">
        <div class="title">评论({{vdetail.commentCount}})</div>
        <div class="input">
          <el-input
            type="textarea"
            placeholder="请留下你的评论"
            v-model="input"
            maxlength="140"
            show-word-limit
            resize="none"
          ></el-input>
        </div>
        <div class="icon-btn r-flex">
          <div class="icon"><span>@</span><span>#</span></div>
          <button class="btn" @click="submit">评论</button>
        </div>
        <div class="commBox c-flex">
          <span class="title">热门评论</span>
          <div v-for="(hotComm, i) in hotComments" :key="i" class="comm r-flex">
            <img :src="hotComm.user.avatarUrl" />
            <div class="txt c-flex">
              <div>
                <span class="nickname">{{ hotComm.user.nickname }}：</span
                ><span class="describe">{{ hotComm.content }}</span>
              </div>
              <div class="dt-do r-flex">
                <span class="dt">{{ hotComm.time | filterDate }}</span>
                <div class="dos r-flex">
                  <span class="report">举报</span>|
                  <span
                    ><i class="el-icon-thumb"></i
                    >{{
                      hotComm.likedCount > 0 ? `${hotComm.likedCount}` : ""
                    }}</span
                  >| <span><i class="el-icon-share"></i></span>|
                  <span><i class="el-icon-chat-dot-round"></i></span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="commBox c-flex">
          <span class="title">最新评论({{ total }})</span>
          <div v-for="(comm, i) in comments" :key="i" class="comm r-flex">
            <img :src="comm.user.avatarUrl" />
            <div class="txt c-flex">
              <div>
                <span class="nickname">{{ comm.user.nickname }}：</span
                ><span class="describe">{{ comm.content }}</span>
              </div>
              <div class="dt-do r-flex">
                <span class="dt">{{ comm.time | filterDate }}</span>
                <div class="dos r-flex">
                  <span class="report">举报</span>|
                  <span
                    ><i class="el-icon-thumb"></i
                    >{{ comm.likedCount > 0 ? `${comm.likedCount}` : "" }}</span
                  >| <span><i class="el-icon-share"></i></span>|
                  <span><i class="el-icon-chat-dot-round"></i></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> -->
    </div>
    <div class="similar ">
        <div class="s-title">相关推荐</div>

      <div class='grid'>
        <div class="item r-flex" v-for="(rv, index) in relatedVideo" :key="index" @click="toPlay(rv.vid )">
        <div class="s-img">
          <img :src="rv.coverUrl" v-show="rv.coverUrl" />
          <div class="right-top">
            <i class="el-icon-caret-right "></i>
            {{
              rv.playTime > 10000
                ? (rv.playTime / 10000).toFixed(0) + "万"
                : rv.playTime
            }}
          </div>
          <div class="right-bottom time">{{rv.durationms}}</div>
        </div>
        <div class="describe c-flex">
          <div class="des-top">{{rv.title.slice(0,15)}}</div>
          <div class="des-down">by {{rv.creator[0].userName}}</div>
        </div>
      </div>
        </div>
      
    </div>
  </div>
</template>

<script>
import { getSongListComment } from "@/network/home";
import { formatDate } from "@/util/uctil";
import {resetMin} from '@/util/time'
import Back from "@/components/middle/title/Back";
import {
  reqVideoUrl,
  reqVideoDetail,
  reqVideoDetailInfo,
  reqRelatedVideo,
} from "@/network/videoMV";

export default {
  name: "videomvdetail",
  data() {
    return {
      vid: "",
      vUrl: {},
      vdetail: {},
      vdetailinfo: {},
      relatedVideo: [],
      input: "",
      id: 0,
      hotComments: [],
      comments: [],
      total: 0,
    };
  },
  components: {
    Back,
  },
  created() {
    this.vid = this.$route.params.id;
    this.getVideoUrl(this.vid);
    this.getVideoDetail();
    // this.getVideoDetailInfo();
    // this.getSongListComment()
    this.getRelatedVideo();
    
  },
  methods: {




    async getVideoUrl(vid){
      const res = await this.$request({
        url:`/video/url?id=${vid}`
      })
      this.vUrl = res.urls[0].url;
    },

    async getVideoDetail() {
      await reqVideoDetail(this.vid).then((res) => {
        this.vdetail = res.data;
        console.log("vd", res);
      });
    },
    // getVideoDetailInfo() {
    //   reqVideoDetailInfo(this.vid).then((res) => {
    //     // this.vdetailinfo = res.data;
    //     console.log("vdi:", res);
    //   });
    // },
    async getRelatedVideo() {
      await reqRelatedVideo(this.vid).then((res) => {
        this.relatedVideo = res.data;
        this.relatedVideo.forEach((item,idx)=>{
          this.relatedVideo[idx].durationms=resetMin(item.durationms) 
        })
      });
    },
    //改变播放状态
    palyVideo(){
      this.$store.commit('changePlay', false)
    },
    //提交评论
    submit() {},
    async getSongListComment() {
      await getSongListComment(this.vid).then((res) => {
        console.log(res);
        this.hotComments = res.hotComments;
        this.comments = res.comments;
        this.total = res.total;
      });
    },
    toPlay(vid){
      if(!vid) return
      this.$router.push("/vmdtail/"+vid)
    }
  },
  filters: {
    filterDate: function (value) {
      let date = new Date(value);
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    },
  },
  watch: {
    // 利用watch方法检测路由变化：
    $route: function (to, from) {
      // 拿到目标参数 to.params.id 去再次请求数据接口
      //console.log(to.params.id);
      this.vid = parseInt(to.params.id);
      getVideoUrl(this.vid)
    },
  },
};
</script>

<style lang='scss' scoped>
.VMVDetail {
  width: 100%;
  .v-detail {
    width: 65%;
    margin-right:30px;
    .v-intro {
      .title {
        margin:20px 0;
        color: #373737;
        font-size: 18px;
        font-weight: 600;
        width: inherit;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .creator {
        justify-content: space-between;
        align-items: center;
        // margin: 10px 0;
        .avatar {
          align-items: center;

          img {
            display: block;
            width: 46px;
            height: 46px;
            border-radius: 50%;
            margin-right: 10px;
          }
          .name {
            color: #373737;
            font-size: 14px;
          }
        }
        .follow {
          color: #ec4141;
          font-size: 14px;
          padding: 5px 10px;
          border-radius: 16px;
          background: whitesmoke;
          span {
            margin-right: 5px;
          }
        }
      }
      .pbh-plays {
        span {
          display: inline-block;
          color: #999;
          font-size: 12px;
          &:first-child {
            margin-right: 20px;
          }
        }
      }
      .tags {
        overflow: hidden;
        span {
          display: inline-block;
          color: #373737;
          font-size: 12px;
          padding: 2px 5px;
          margin: 10px 5px;
          border-radius: 12px;
          background: whitesmoke;
          &:first-child {
            margin-left: 0px;
          }
        }
      }
      .describe {
        margin: 10px 0;
        color: #373737;
        font-size: 12px;
        width: inherit;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .btns {
        margin: 30px 0;
        justify-content: space-between;
        align-items: center;
        .l {
          .btn {
            display: inline-block;
            color: #373737;
            font-size: 14px;
            margin-right: 10px;
            border-radius: 16px;
            border: 1px solid lightgrey;
            padding: 5px 15px;
            span {
              &:first-child {
                margin-right: 5px;
              }
            }
          }
        }
        .r {
          a {
            color: #999;
            font-size: 12px;
          }
        }
      }
    }
  }
}
.similar {
  // max-width:300px;
  width: calc(100% - 65% - 30px);
  // min-width: 200px;
  .s-title{
    font-weight: 600;
    color: #373737;
    font-size: 16px;
  }
  .item {
    // width: 100%;
    min-width: 90px;
      max-height:100px;
    .s-img {
      width:160px;
      border-radius: 4px;
      margin-right: 10px;
      overflow: hidden;
      position: relative;
      min-width: 90px;
      max-height:100px;
      img {
        height: 100%;
        border-radius: 4px;
      }
      .right-top {
        position: absolute;
        top: 2px;
        right: 5px;
        color: white;
        font-size: 12px;
        i {
          font-size: 14px;
          color: white;
        }
      }
      .right-bottom {
        position: absolute;
        bottom: 2px;
        right: 5px;
        color: white;
        font-size: 12px;
      }
    }
    .describe {
      flex:1;
        // width:calc(100% - 220px);

      justify-content: space-around;
      overflow: hidden;
      .des-top {
        width: inherit;
        color: #373737;
        font-size: 12px;
        //overflow: hidden;
        // white-space: nowrap;
        //text-overflow: ellipsis;
        
      }
      .des-down {
        width: inherit;
        font-size: 12px;
        color: #888;
        //overflow: hidden;
        // white-space: nowrap;
        //text-overflow: ellipsis;
        
      }
    }
  }
}
.grid {
  display: grid;
  grid-template-rows: repeat(6, 1fr);
  gap: 20px;
  margin-top: 20px;
}


.input {
  margin: 10px 0;
}
.icon-btn {
  margin-bottom: 10px;
  justify-content: space-between;
  color: #999;
  font-size: 18px;
  .icon {
    letter-spacing: 10px;
    span {
      &:hover {
        color: black;
      }
    }
  }
  button {
    border: 1px solid lightgrey;
    border-radius: 20px;
    padding: 5px 10px;
    background: #fff;
    &:hover {
      background: #f6f6f7;
    }
  }
}
.commBox {
  margin: 10px 0;
  .comm {
    padding: 10px 0;
    border-bottom: 1px solid whitesmoke;
  }
  .title {
    display: block;
  }
  img {
    display: block;
    width: 46px;
    height: 46px;
    border-radius: 50%;
    margin-right: 5px;
  }
  .txt {
    flex: 1;
    font-size: 12px;
    justify-content: space-between;
    .nickname {
      color: skyblue;
      font-size: 12px;
    }
    .describe {
      font-size: 12px;
    }
    .dt-do {
      justify-content: space-between;
      .dt {
        color: #999;
      }
      .dos {
        align-items: center;
        color: #999;
        font-size: 12x;
        letter-spacing: 10px;
        span {
          cursor: pointer;
        }
        .report {
          display: none;
          &:hover {
            display: block;
          }
        }
      }
    }
  }
}
</style>