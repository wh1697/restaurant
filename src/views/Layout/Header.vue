<template>
  <!-- 右侧模块上面的头部 -->
  <div class="header">
    <!-- 头部也叫面包屑使用前可以使用Element ui 的响应式布局包裹 -->
    <el-row>
      <!-- 面包屑 -->
      <!-- el-row 里面 给:gutter="" 代表下面的每一个元素都设置了一个padding -->
      <!-- :span="12" 代表给分割为多少列 规定是一共给分割了24  -->
      <el-col class="title">
        <!-- separator="/"  是一个分隔符 -->
        <!-- path: '/'  要跳转的地址 -->
        <el-breadcrumb separator="/" class="titles">
          <!-- <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item> -->
          <el-breadcrumb-item v-for="item in routerArr" :key="item.name" :to="{ path: item.path }">{{ item.name
          }}</el-breadcrumb-item>
          <!-- <el-breadcrumb-item>活动列表</el-breadcrumb-item>
          <el-breadcrumb-item>活动详情</el-breadcrumb-item> -->
        </el-breadcrumb>
      </el-col>

      <!-- 右侧下拉框 -->

      <el-col class="down">
        <!-- 退出账号 要在el-dropdown 绑定command -->
        <el-dropdown @command="quit">
          <span class="el-dropdown-link">
            你好欢迎你<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="1">个人中心</el-dropdown-item>
            <el-dropdown-item command="2">退出账号</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        <!-- 头像 -->
        <el-avatar :size="40" src="https://empty" @error="errorHandler" class="pic">
          <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
        </el-avatar>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
  //控制面包屑停留在哪一页 第四步
  data() {
    return {
      routerArr: []
    }
  },


  //控制面包屑停留在哪一页 第二步
  // created() {
  //   this.catchBread();
  // },
 watch:{
    '$route':function(){
      this.catchBread()
    }
 },
  methods: {
    ...mapMutations(['chartData']),
    //控制面包屑停留在哪一页 第三步
    catchBread() {
      // 控制面包屑停留在哪一页 第五步
      let arr = [{ name: '首页', path: '/index' }]
      console.log(this.$route.matched.length,this.$route.matched);

      this.$route.matched.forEach((item) => {
        // 控制面包屑停留在哪一页 第六步(这块之前写错了导致面包屑不出来)
        if (item.meta && item.meta.name) {
          arr.push({ name: item.meta.name, path: item.path })
        }

      });

      this.routerArr = arr;
      console.log(this.routerArr,'routerArr');
    },
    errorHandler() {
      return true;
    },

    quit(num) {
      console.log('aa', num);
      sessionStorage.removeItem('user_info')
      if (num == 2) {
        this.chartData()
        
        this.$router.push({path:"/login"});
      } else {
        this.$router.push({path:"/Account/TurnPassword"}); 
        // this.$router.push("/home"); // 这里有问题啊
      }
    }
  },
};
</script>

<style lang="less" scoped>
.header {
  // background-color: red;
  border: 1px solid #000;


  .title {
    width: 500px;
    height: 50px;
    float: left;
    // background-color: yellow;

    .titles {
      font-size: 15px;
      line-height: 50px;
    }
  }

  .down {
    width: 300px;
    height: 50px;
    // background-color: pink;
    float: right;

    .pic {
      margin-left: 20px;
      margin-top: 5px;
    }
  }
}
</style>
