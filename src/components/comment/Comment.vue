<template>
  <div class="comment">
    <div class="inputComm">
      <el-input
        v-model="inputComm"
        placeholder="留下你的评论"
        type="textarea"
        maxlength="140"
        show-word-limit
        resize="none"
      ></el-input>
      <div class="btn">
        <el-button round size="mini" @click="submitComm">评论</el-button>
      </div>
    </div>
    <div class="hotComment">
      <div class="commTitle">热门评论</div>
      <div
        class="commList r-flex"
        v-for="(item1, idx1) in hotComms"
        :key="idx1"
      >
        <div class="avatar">
          <img :src="item1.user.avatarUrl + '?param=66y60'" alt="" />
        </div>
        <div class="comm-text c-flex">
          <div class="content">
            <span class="comm-user">{{ item1.user.nickname }}：</span
            ><span>{{ item1.content }}</span>
          </div>
          <div class="reply" v-show="item1.beReplied">
            <div
              class="replies"
              v-for="item2 in item1.beReplied"
              :key="item2.user.userId"
            >
              <span class="comm-user">@{{ item2.user.nickname }}：</span
              ><span class="replyContent">{{ item2.content }}</span>
            </div>
          </div>
          <div class="date-btns r-flex">
            <div class="date">{{ item1.time | filterDate }}</div>
            <div class="btns">
              <span class="report">举报 |</span>
              <span
                ><i class="el-icon-thumb"></i
                >{{ item1.likedCount > 0 ? `${item1.likedCount}` : "" }}</span
              >| <span><i class="el-icon-share"></i></span>|
              <span><i class="el-icon-chat-dot-round"></i></span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="newComment">
      <div class="commTitle">最新评论({{ total }})</div>
      <div
        class="commList r-flex"
        v-for="item3,idx3 in comments"
        :key="idx3-1"
      >
        <div class="avatar">
          <img :src="item3.user.avatarUrl + '?param=66y66'" alt="" />
        </div>
        <div class="comm-text c-flex">
          <div class="content">
            <span class="comm-user">{{ item3.user.nickname }}：</span
            ><span>{{ item3.content }}</span>
          </div>
          <div class="reply" v-show="item3.beReplied">
            <div
              class="replies"
              v-for="(item4, idx4) in item3.beReplied"
              :key="idx4+1"
            >
              <span class="comm-user">@{{ item4.user.nickname }}：</span
              ><span class="replyContent">{{ item4.content }}</span>
            </div>
          </div>
          <div class="date-btns r-flex">
            <div class="date">{{ item3.time | filterDate }}</div>
            <div class="btns">
              <span class="report">举报 |</span>
              <span
                ><i class="el-icon-thumb"></i
                >{{ item3.likedCount > 0 ? `${item3.likedCount}` : "" }}</span
              >| <span><i class="el-icon-share"></i></span>|
              <span><i class="el-icon-chat-dot-round"></i></span>
            </div>
          </div>
        </div>
      </div>
      <div class="more" ><button>获取更多</button></div>
    </div>
  </div>
</template>

<script>
import { dateTimeFormat } from "@/util/time";
import { getSheetComment } from "@/network/index";
import { formatDate } from "@/util/uctil";

export default {
  name: "comment",
  data() {
    return {
      inputComm: "",
      comments: [],
      hotComms: [],
      total: 0,
      currPage:1,
    };
  },
  created() {
    this.getComment();
  },
  methods: {

    //获取评论
    async getComment() {
      // let res= await this.$request({
      //   url:`/comment/playlist?id=${this.$route.params.id}`,
      // })
      let res = await getSheetComment(this.$route.params.id,this.currPage)

      if(res.code !== 200){
        this.$message.error("获取评论失败！"); 
        return;
      }
      this.hotComms = res.hotComments;
      this.comments = res.comments;
      this.total = res.total;
    },



    //提交评论
    async submitComm() {
      if (!inputComm) {
        this.$message.warning("评论不能为空！");
        return;
      }
    },



  },

  //局部过滤器，格式化时间
  filters: {
    filterDate: function (value) {
      let date = new Date(value);
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    },
  },
};
</script>

<style lang='scss' scoped>
.comment {
  .inputComm {
    ::v-deep .el-textarea__inner {
      height: 75px;
    }
    .btn {
      text-align: right;
      margin: 10px 0;
    }
  }
  .commTitle {
    margin: 10px 0;
    font-size: 14px;
    font-weight: 600;
  }
  .commList {
    padding: 10px 0;
    border-bottom: 1px solid whitesmoke;
    .avatar {
    //   width: 56px;
    //   height: 56px;
      margin-right: 10px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 10px;
      }
    }
    .comm-text {
      width: 100%;
      font-size: 12px;
      justify-content: space-around;
      .comm-user {
        color: rgb(15, 78, 103);
      }
      .reply {
        font-size: 12px;
        .replies {
          padding: 2px 10px;
          margin: 0 10px;
          border-radius: 10px;
          background-color: whitesmoke;
          .replyContent {
            color: #999;
          }
        }
      }
      .date-btns {
        color: #999;
        font-size: 12px;
        justify-content: space-between;
        align-items: center;
        .btns {
          .report {
            color: #999;
            font-size: 12px;
            display: none;
          }
          span {
            color: #999;
            font-size: 12px;
            margin: 0 5px;
            display: inline-block;
          }
        }
      }
    }
    &:hover {
      .report {
        display: inline-block !important;
      }
    }
    
  }
  .more{
        margin: 10px auto;
        text-align: center;
        button{
            color:#999;
            font-size: 14px;
            border:1px solid lightgrey;
            border-radius:14px;
            background-color:white;
        }
    }
}

</style>