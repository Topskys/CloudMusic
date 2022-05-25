<template>
  <div class="comment ">
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
    <div class="commBox ">
        <div class="title">热门评论</div>
        <div v-for="(hotComm,i) in hotComments" :key="i" class="comm r-flex">
            <img :src="hotComm.user.avatarUrl" />
            <div class="txt c-flex">
                <div>
                    <span class="nickname">{{hotComm.user.nickname}}：</span><span class="describe">{{hotComm.content}}</span>
                </div>
                <div class="dt-do r-flex">
                    <span class="dt">{{hotComm.time | filterDate}}</span>
                    <div class="dos r-flex">
                        <span class="report">举报</span>|
                        <span><i class="el-icon-thumb"></i>{{hotComm.likedCount > 0 ?`${hotComm.likedCount}`:''}}</span>|
                        <span><i class="el-icon-share"></i></span>|
                        <span><i class="el-icon-chat-dot-round"></i></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="commBox c-flex">
        <span class="title">最新评论({{total}})</span>
        <div v-for="(comm,i) in comments" :key="i" class="comm r-flex">
            <img :src="comm.user.avatarUrl" />
            <div class="txt c-flex">
                <div>
                    <span class="nickname">{{comm.user.nickname}}：</span><span class="describe">{{comm.content}}</span>
                </div>
                <div class="dt-do r-flex">
                    <span class="dt">{{comm.time | filterDate}}</span>
                    <div class="dos r-flex">
                        <span class="report">举报</span>|
                        <span><i class="el-icon-thumb"></i>{{comm.likedCount > 0 ?`${comm.likedCount}`:''}}</span>|
                        <span><i class="el-icon-share"></i></span>|
                        <span><i class="el-icon-chat-dot-round"></i></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import {  getSongListComment } from "@/network/home";
import { formatDate } from "@/util/uctil";
export default {
  data() {
    return {
      input: "",
      id:0,
      hotComments:[],
      comments:[],
      total:0,
    };
  },
  methods:{
    //获取评论数据
      getSongListComment(id){
          getSongListComment(id).then(res => {
              this.hotComments = res.hotComments;
              // this.comments = [...res.hotComments,...res.comments];//展开合并
              this.comments = res.comments;
               this.total = res.total;
          })
      },
      //提交评论
      submit() {},
  },
  created(){
      this.getSongListComment(parseInt(this.$route.params.id));
  },
  filters: {
    filterDate: function (value) {
      let date = new Date(value);
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    },
  },
    
};
</script>

<style lang="scss" scoped>
::v-deep .el-textarea__inner {
      height: 75px;
    }
.input{
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
.commBox{
  margin: 10px 0 ;
    .comm{
        padding: 10px 0;
        border-bottom: 1px solid whitesmoke;
    }
    .title{
        display: block;
    }
    img{
        display: block;
        width: 46px;
        height: 46px;
        border-radius: 50%;
        margin-right: 5px;
    }
    .txt{
        flex:1;
        font-size: 12px;
        justify-content: space-between;
        .nickname{
            color: rgb(16, 105, 200);
            font-size: 12px;
        }
        .describe{
            font-size:12px;
        }
        .dt-do{
            justify-content: space-between;
            .dt{
                color: #999;
            }
            .dos{
                align-items: center;
                color: #999;
                font-size: 12x;
                letter-spacing: 10px;
                span{
                    cursor: pointer;
                }
                .report{
                    display: none;
                    &:hover{
                        display: block;
                    }
                }
            }
        }
    }
}
</style>