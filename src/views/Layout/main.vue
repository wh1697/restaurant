<template>
  <!-- 右侧模块所有内容 -->
  <div class="main-view">
    <!-- 左侧导航栏固定导入 -->
    <Nav></Nav>
    <div class="main-box">
      <!-- 头部面包屑固定导入 -->
      <Header></Header>
      <!-- 其实<router-view></router-view>里面包着的隐藏的内容就是我除了固定的左侧导航栏和头部面包屑 想要展示的内容  -->
      <!-- 这个项目我在Home组件里面写的然后放到了<router-view></router-view> 通过路由去显示配置出来  -->
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Header from "@/views/Layout/Header.vue";
import Nav from "@/views/Layout/Nav.vue";
export default {
  data() {
    return {
      cardArr: [
        {
          img: "../../assets/img/logo.png",
          name: "销售",
        },
      ],
    };
  },
  components: {
    Header,
    Nav,
  },
};
</script>

<style lang="less" scoped>
.main-view {
  height: 100%;
  // float: left;
  .main-box{
    float: left;
    width: calc(100vw - 318px);
  }
}
</style>
