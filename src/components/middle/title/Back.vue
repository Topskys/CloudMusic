<template>
  <div class="back" @click='$router.go(-1)'>
      <span class="el-icon-arrow-left"></span><span class='title'>{{title}}</span>
  </div>
</template>

<script>
export default {
    name:"back",
    props:{
        title:{
            type:String,
            default:'返回',
        },
    }
}
</script>

<style lang='scss' scoped>
.back{
    span{
        display:inline-block;
        color:#373737;
        font-size:16px;
        font-weight:600;
        cursor: pointer;
    }
}
</style>