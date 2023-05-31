<template>
  <div id="app">
    <!-- 前期配置第六步导入 登录组件 -->
    <!-- <Login></Login> -->
    <router-view></router-view>
  </div>
</template>

<script>
// 前期配置第六步导入 登录组件
// import Login from '@/Login.vue'

export default {
  // 前期配置第六步导入 登录组件
  components:{
    // Login
  }
};
</script>

<style lang="less" scoped>
#app{
  // 前期配置第七步给一个高度100%  结束 然后下一步去创建登录页面和登录后的页面
  height: 100%;
}

</style>
