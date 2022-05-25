<template>
  <div class="title r-flex">
      <div class="item" v-for="item,idx in items" :key="idx" :class="$route.path.includes(item.path)" @click="select(item.path)">{{item.name}}</div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            
        }
    },
    methods: {
        select(path){
            if(this.currPath===path) return
            this.$emit("select", path)
        }
    },
}
</script>

<style lang='scss' scoped>
.title{
    .item{
        margin: 10px ;
        &:first-child{
            margin-left: 0px;
        }
    }
}
</style>