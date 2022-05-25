<template>
  <div class="rh r-flex">
    <div class="avatar r-flex">
      <img :src="avatar" />
      <div class="username" @click="isQrLogin">{{ username }}</div>
      <div
        class="el-icon-arrow-down"
        style="font-size: 12px; color: #fbd9d9; margin: 0 10px 0 5px"
        @click="logout"
      ></div>
      <i class="iconfont icon-pifu1"></i>
      <i class="el-icon-message"></i>
      <i class="iconfont icon-icon-test5"></i>
    </div>
    <div class="scan c-flex" v-show="isQr">
      <i class="el-icon-close"  @click="closeQr"></i>
      <img :src="qrUrl" alt="" />
      <span>{{ text }}</span>
    </div>
  </div>
</template>

<script>
import {
  reqLoginState,
  reqKey,
  reqQrUrl,
  reqQrState,
  reqLogout,
} from "@/network/user";
export default {
  name:'rightHeader',
  data() {
    return {
      avatar:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      username: "未登录",
      isQr: false,
      key: "",
      qrUrl: "",
      code: null,
      currUser: window.localStorage.getItem("currUser")
        ? JSON.parse(window.localStorage.getItem("currUser"))
        : "",
      text: "请使用网易云音乐APP扫码登录",
    };
  },
  created() {
    this.getLoginState();
  },
  methods: {
    isQrLogin() {
      this.isQr = true;
      if(this.currUser.profile) return this.isQr= false
      this.login();
    },
    closeQr(){
      this.isQr = false;
    },
    async getLoginState() {
      const res = await reqLoginState();
      window.localStorage.setItem(
        "currUser",
        JSON.stringify(res.data, null, 2)
      );
      //console.log("info:", JSON.stringify(res.data, null, 2));
      this.currUser = JSON.parse(window.localStorage.getItem("currUser"));
      if (this.currUser.profile==null) return;
      this.avatar = this.currUser.profile.avatarUrl;
      this.username = this.currUser.profile.nickname;
    },
    async login() {
      let timer;
      this.getLoginState();
      await reqKey().then((res) => {
        if (res.code !== 200) return;
        this.key = res.data.unikey;
      });
      await reqQrUrl(this.key).then((res) => {
        if (res.code !== 200) return;
        this.qrUrl = res.data.qrimg;
      });

      timer = setInterval(async () => {
        await reqQrState(this.key).then((res) => {
          this.code = res.code;
        });
        if (this.code === 800) {
          alert("二维码已过期,请重新获取");
          clearInterval(timer);
        }
        if (this.code === 803) {
          this.text = "登录成功";
          clearInterval(timer);
          alert("授权登录成功");
          await this.getLoginState();
          this.isQr=false;
        }
      }, 3000);
    },
    async logout() {
      await reqLogout().then((res) => {
        if (res.code === 200) alert("退出成功");
        this.currUser = null;
        window.localStorage.setItem("currUser", null); 
        location.reload();
      });
     
    },
  },
};
</script>

<style lang='scss' scoped>
.rh {
  align-items: center;
  .avatar {
    color: #fbd9d9;
    align-items: center;
    img {
      display: block;
      margin: 5px;
      width: 30px;
      height: 30px;
      cursor: pointer;
      border-radius: 50%;
      background-position: center;
      background-size: cover;
    }
    .username {
      color: #fbd9d9;
      font-size: 12px;
      cursor: pointer;
    }
    i {
      display: block;
      color: #fbd9d9;
      margin: 0 10px;
      cursor: pointer;
      &:last-child{
        margin-right: 0;
      }
    }
  }
  .scan {
    border-radius: 5px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    align-items: center;
    background: white;
    z-index: 5;
    box-shadow: 0px 0px 100px #999;
    .el-icon-close{
      position: absolute;
      top: 10px;
      right:10px;
    }
    img {
      width: 150px;
      height: 150px;
      margin: 80px 60px 20px; //上左右下
    }
    span {
      color: #999;
      margin-bottom: 60px;
    }
  }
}
</style>