<template>
  <div class="tagBar ">
      <span class="title">{{title}}：</span>
      <span class="item" v-for="(item,idx) in tagBars" :key="idx" :class="idx===actIdx?'active':''" @click="selects(title,item.value,idx)" >{{item.name}}</span>  
  </div>
</template>

<script>
export default {
name:'TagBar',
data() {
  return {
    actIdx:0,
  }
},
props:{
  title:{
    type:String,
    default:'语种',
  },
  tagBars:{
    type:Array,
    default(){
      return [];
    },
  },
},
methods: {
  selects(title,value,idx){
    if(idx===this.actIdx) return
    this.$emit("selected", this.title,value)//子传父，事件触发及参数传输//参数不需要加[]
    this.actIdx=idx
    //console.log(title,value)
  },
},
}
</script>

<style lang='scss' scoped>
.tagBar{
  // align-items: center;
  .title{
    display: inline-block;
    color: #373737;
    font-size: 12px;
  }
  .item{
    display: inline-block;
    cursor: pointer;
    color: #373737;
    font-size: 12px;
    // text-align: center;
    // height: 30px;
    // line-height: 30px;
    margin: 10px ;
    padding: 2px 10px;
    border-radius: 8px;
  }
  .active{
    color: #ec4141;
    background: whitesmoke;
  }
}
</style>