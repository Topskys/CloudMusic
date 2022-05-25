.<template>
  <div class="rmdMV ">
    <ToBar title="推荐MV" path="/video/mv" />
    <div class="list">
      <MVItem v-for="(mv, index) in mvs" :key="index" :item="mv" />
    </div>
  </div>
</template>

<script>
import ToBar from "@/components/middle/title/ToBar";
import MVItem from "@/components/item/MVItem";
export default {
  name: "rmdMV",
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
    this.getRmdMV();
  },
  methods: {
    //获取推荐mv
    async getRmdMV() {
      const res = await this.$request({
        url: "/personalized/mv",
      });
      this.mvs = res.result;
    },
  },
};
</script>

<style lang='scss' scoped>
.list {
  overflow: hidden;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}
</style>