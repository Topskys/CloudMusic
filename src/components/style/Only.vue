<template>
  <div class="only">
    <ToBar title="独家放送" path="/video/mv" />
    <div class="list">
      <MVItem v-for="(mv, index) in mvs" :key="index" :item="mv" />
    </div>
  </div>
</template>

<script>
import ToBar from "@/components/middle/title/ToBar";
import MVItem from "@/components/item/MVItem";

export default {
  name: "only",
  data() {
    return {
      mvs: [],
    };
  },
  components: {
    ToBar,
    MVItem,
  },
  created() {
    this.getOnly();
  },
  methods: {
    //获取独家放送
    async getOnly() {
      const res = await this.$request({
        url: "/personalized/privatecontent",
      });
      this.mvs = res.result;
    },
  },
};
</script>

<style lang="scss" scoped>
.only {
  margin: 30px 0;
  .list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    // justify-content:center;
  }
}
</style>