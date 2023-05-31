<template>
  <!-- 左侧导航栏 -->
  <div class="nav">
    <!-- 嵌套子路由第二步在<el-menu 里面加上router -->
    <el-menu router background-color="#001529" default-active="2" class="el-menu-vertical-demo" @open="handleOpen"
      @close="handleClose" v-for="(item, index) in menus" :key="index + 'A'">
      <!-- <template  > -->
      <!-- 没有子路由 -->
      <!-- 之前是多个子菜单，通过路由权限 之后变为一个子菜单 -->
      <template v-if="item.children && item.children.length === 1">
        <!-- 有权限控制的 -->
        <!-- <el-submenu :index="index + 'A'" v-if="item.meta && item.meta.role">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">{{ item.meta.name }}</span>
          </template>
          <el-menu-item :index="item.children[0].path">{{
            item.children[0].meta.name
          }}</el-menu-item>
        </el-submenu> -->
        <!-- 无权限控制  -->
        <el-menu-item :index="item.path">
          <i class="el-icon-menu"></i>
          <span slot="title">{{ item.children[0].meta.name }} </span>
        </el-menu-item>
      </template>

      <!-- 有子路由 -->
      <template v-else>
        <el-submenu :index="index + 'A'">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">{{ item.meta.name }}</span>
          </template>

          <!-- 嵌套子路由第二步在这里写 -->
          <div v-for="(res, ind) in item.children" :key="ind + 'b'">
            <el-menu-item v-if="res && res.path" :index="res.path">{{
              res.meta.name
            }}</el-menu-item>
          </div>

          <!-- <el-menu-item index="/Commodity/CommodityList">商品列表</el-menu-item>
          <el-menu-item index="/Commodity/AddCommodity">商品添加</el-menu-item>
          <el-menu-item index="/Commodity/CommodityClassify"
            >商品分类</el-menu-item -->
        </el-submenu>
      </template>

      <!-- </template> -->
      <!-- <el-menu-item index="/index">
        <i class="el-icon-menu"></i>
        <span slot="title">后台首页</span>
      </el-menu-item>
      <el-menu-item index="/orderList">
        <i class="el-icon-menu"></i>
        <span slot="title">订单管理</span>
      </el-menu-item>

      <el-submenu index="/commodity">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>商品管理</span>
        </template>
        <el-menu-item index="/Commodity/CommodityList">商品列表</el-menu-item>
        <el-menu-item index="/Commodity/AddCommodity">商品添加</el-menu-item>
        <el-menu-item index="/Commodity/CommodityClassify"
          >商品分类</el-menu-item
        >
      </el-submenu>

      <el-menu-item index="/shop">
        <i class="el-icon-menu"></i>
        <span slot="title">店铺管理</span>
      </el-menu-item>
      <el-submenu index="Account">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>账号管理</span>
        </template>
        <el-menu-item index="/Account/AccountList">账号列表</el-menu-item>
        <el-menu-item index="/Account/AddAccount">添加账号</el-menu-item>
        <el-menu-item index="/Account/TurnPassword">修改密码</el-menu-item>
      </el-submenu>
      <el-submenu index="sell">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>销售统计</span>
        </template>
        <el-menu-item index="/Sell/CommodityStatic">商品统计</el-menu-item>
        <el-menu-item index="/sell/OrderStatic">订单统计</el-menu-item>
      </el-submenu> -->
    </el-menu>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  methods: {
    handleOpen() { },
    handleClose() { },
  },
  computed: {
    ...mapState(["menus"]),
  },
};
</script>

<style lang="less" scoped>
.nav {
  width: 300px;
  height: 100%;
  background-color: #001529;
  float: left;

  /deep/.el-menu-item {
    color: #ffff;

    span {
      color: purple;
    }
  }

  /deep/.el-submenu__title {
    color: orange;
  }
}
</style>
