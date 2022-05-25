<template>
  <div class="latest c-flex">
    <div class='b-bar r-flex'>
      <span class="{ active: isActive('/latest/default') }" @click="ClickTo('/latest/default')">新歌速递</span>
      <span class="{ active: isActive('/latest/dish') }" @click="ClickTo('/latest/dish')">新碟上架</span>
    </div>
    <div class='s-bar r-flex'>
      <div class="l-b">
        <span v-for="(sb,i) in subBars " :key="i" class="{ active: isSBActive('/latest/default/id') }"  @click="getLabelSongs(sb.id)">{{sb.name}}</span>
      </div>
      <div class="r-b"></div>
    </div>
    <div class="ns-l">
      <table>
        <tr v-for="(s,idx) in songs " :key="idx" @click="selectRow(id)">
          <td style="text-align:center;width:30px;">{{idx}}</td>
          <td width='200px'>
            <div class="ns-img" style="width:56px;height:60px;position:relative;margin-right:10px;float:left;">
              <img src="" alt="" style="height:56px;border-radius:4px;">
              <i class="el-icon-video-play" style="fontSize:20px;color:#ec4141; position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);"></i>
            </div>
            <div class="song" style='line-height:66px;over-flow:hidden;fontSize:14px;color:#373737;'></div>
          </td>
          <td>
            <div class="des" style="line-height:66px;color:#999;fontSize:14px;width:200px;overflow:hidden;white-space:nowrap;text-overflow: ellipsis;"></div>
          </td>
          <td width='80px' style='line-height:66px;'>时间</td>
        </tr>
      </table>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      subBars:[{name:'全部',id:'1'},{name:'华语',id:'1'},{name:'欧美',id:'1'},{name:'韩国',id:'1'},{name:'日本',id:'1'},{name:'小语种',id:'1'},],
      songs:[],
    }
  },
  mounted() {
    
  },
  methods: {
    selectRow(id){}
  },
  computed:{
    isActive() {
      return function (path) {
        return this.$route.path.includes(path);
      };
    },
    isSBActive(){
      return function (path) {
        return this.$route.path.includes(path);
      };
    }
  }
}
</script>

<style lang='scss' scoped>
.latest{
  .b-bar{
    margin:0 auto;
    box-sizing: border-box;
    border:1px solid #999;
    font-size: 14px;
    border-radius:16px;
    align-items:center;
    span{
      display:inline-block;
      padding:5px 20px;
      border:1px solid #fff;
      border-radius:16px;
      box-sizing: border-box;
      
    }
    .b-active{
      color: white;
      background: #999;
    }
  }
  .s-bar{
    width: 100%;
    margin: 10px 0;
    .l-b{
      span{
      display:inline-block;
        color: #373737;
        font-size: 14px;
        padding: 2px 10px;
      }
    }
  }
  table{
    width: 100%;
    tr{
      cursor:pointer;
      &:nth-of-type(odd){//奇数行
      background: whitesmoke;
    }
    &:nth-of-type(even){//偶数行
      background: white;
    }
    &:hover{
      background: whitesmoke;
    }
    }
  }
}
  .bar{
    
    width: 100%;
    align-items: center;
    // span{
    //   padding: 10px 0px;
    //   border-radius:5px;
    // }
    // text-overflow: ellipsis;
  }

.active{
  color: #ec4141;
  background: whitesmoke;
}
.isSBActive{
  font-weight: 500;
}
</style>