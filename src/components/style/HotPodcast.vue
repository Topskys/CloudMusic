<template>
  <div class="hotPodcast">
    <ToBar title="热门播客" path="/hotPodcast"/>
    <div class="pdt">
      <ul class="grid">
        <router-link
          v-for="link in links"
          :key="link"
          :to="{ exclusive }"
          custom
          v-slot="{ navigate, isActive }"
        >
          <li
            @click="navigate"
            :class="isActive ? 'TopskyActive' : ''"
            class="r-flex"
          >
            <img :src="link.imgUrl" />
            <div class="txt c-flex">
              <div class="name" >{{link.name}}</div>
              <div class="type color">{{link.type}}</div>
              <div class="describe r-flex color">
                <span class="text">{{link.text}}</span>
                <span class="el-icon-caret-right"></span>
                {{link.views}}万
                <span class="el-icon-time"></span>
                {{link.time}}
              </div>
            </div>
          </li>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
import ToBar from '@/components/middle/title/ToBar'
export default {
  data() {
    return {
      links: [
        {
          to: "/1",
          imgUrl: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          name: "罗翔：如何对抗平庸的生活",
          type:'个人提升',
          text:'罗翔教授情感学习',
          views:'16',
          time:'03:37',
        },
      ],
    };
  },
  components:{
    ToBar,
  },
  mounted() {
    
  },
};
</script>

<style lang="scss" scoped>
.hotPodcast {
  width: 100%;
  // color:#373737;
  .describe{
    align-items: center;
    span{
        font-size: 14px;
        padding: 0 4px;
      }
  }
}
.grid {
  display: grid;
  grid-template-rows: repeat(3, auto);
  grid-template-columns: repeat(2, auto);
  gap: 20px;
  .txt{
    justify-content: space-evenly;//平分
  }
}
.color{
  font-size: 14px;
  color: #999;
}
ul {
  list-style: none;
  margin: 0;
  padding: 0 0 1em 0;
  li {
    img {
      width: 100px;
      height: 100px;
      border-radius: 4px;
      background-position: center;
      background-size: cover;
      margin-right: 10px;
    }
  }
}
</style>