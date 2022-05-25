<template>
  <div id="header" class="r-flex">
    <LeftHeader />
    <RightHeader />
  </div>
</template>

<script>
import LeftHeader from "@/components/header/LeftHeader";
import RightHeader from "@/components/header/RightHeader";

export default {
  name: "Header",
  components: {
    LeftHeader,
    RightHeader,
  },
};
</script>

<style lang="scss"  scoped>
#header {
  width: 100%;
  z-index: 100;
  min-width: 960px;
  height: 60px;
  padding:0 18px;
  box-sizing: border-box;
  justify-content: space-between;
  align-items: center;
  background: #ec4141; // background: #ff4e4e;
  border-bottom: 1px solid lightgrey;
}
</style>
