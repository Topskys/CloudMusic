<template>
  <div class="table">
    <el-table stripe :data="tableData" style="width: 100%" @row-click="play">
      <el-table-column type="index" :index="indexMethod" width="80" label="热门50首"> </el-table-column>
      <el-table-column  width="80"><i class="el-icon-star-off" ></i></el-table-column>
      <el-table-column prop="name" ></el-table-column>
      <el-table-column prop="dt" width="200"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "eltable",
  props: {
    tableData: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      id:$route.params.id,
    };
  },
  methods: {
    indexMethod(index) {
      return index * 1+1;
    },
    play(sid){
        this.$emit("toPlay", sid)
    }
  },
  created() {
      console.log(this.tableData);
  },
  
};
</script>

<style lang='scss' scoped>

</style>