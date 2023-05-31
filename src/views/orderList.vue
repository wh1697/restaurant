<template>
  <div class="order">
    <div class="orders">
      <!-- 第一个Element ui 复制 -->
      <div class="info">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="订单号">
            <el-input v-model="formInline.user" placeholder="订单号"></el-input>
          </el-form-item>
          <el-form-item label="收货人">
            <el-input v-model="formInline.user" placeholder="收货人"></el-input>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="formInline.user" placeholder="手机号"></el-input>
          </el-form-item>
          <el-form-item label="订单状态">
            <el-select v-model="formInline.region" placeholder="订单状态">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>

      <!-- 第二个Element ui 复制 -->
      <div class="time">
        <span>选择时间</span>
        <el-date-picker class="times" v-model="value1" type="datetimerange" range-separator="至" start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
        <el-button type="primary" class="adds">查询</el-button>
      </div>

      <!-- 第三个Element ui 复制 -->

      <div class="total">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column fixed prop="orderNo" label="订单号" width="150">
          </el-table-column>
          <el-table-column prop="orderTime" label="下单时间" width="120">
          </el-table-column>
          <el-table-column prop="phone" label="手机号" width="120">
          </el-table-column>
          <el-table-column prop="consignee" label="收货人" width="120">
          </el-table-column>
          <el-table-column prop="deliverAddress" label="配送地址" width="300">
          </el-table-column>
          <el-table-column prop="deliveryTime" label="送达时间" width="120">
          </el-table-column>
          <el-table-column prop="remarks" label="用户备注" width="120">
          </el-table-column>
          <el-table-column prop="orderAmount" label="订单金额" width="120">
          </el-table-column>
          <el-table-column prop="orderState" label="订单状态" width="120">
          </el-table-column>
          <el-table-column prop="orderState" label="订单状态" width="120">
          </el-table-column>
          <el-table-column prop="orderState" label="订单状态" width="120">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
              <el-button type="text" size="small">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 第四个Element ui 分页复制 -->
      <div class="page">
        <el-pagination @size-change="handleSizeChange" @current-change="pageChange"
          :current-page.sync="currentPage" :page-size="pageSize" layout="total,prev, pager, next, jumper" :total="total" :page-sizes="pageSizes">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
// 发请求一 在api文件夹里面 新建account.js 里面请求名字叫getOrder 然后在这里添加api
import { getOrder } from '@/api/account.js'
export default {
  data() {
    return {
      formInline: {
        user: "",
        region: "",
      },

      // 下面的表格

      value1: {},

      tableData: [],

      // 底部分页需要配置
      currentPage: 1,

      total: 0, // 定义一个total变量 总页数
      pageSize: 5, // 当前显示的数据条数   page组件默认是10
      pageSizes: [5, 10, 15, 20, 30],



    };
  },

  created() {
    this.getList();
  },

  methods: {
    handleClick(row) {
      console.log(row);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },


    // 发请求二
    async getList() {
      // 发请求三
      // 发请求四  定义一个方法await等待
      let { data, total } = await getOrder({
        pageSize: this.pageSize,
        currentPage: this.currentPage,
      });

      this.tableData = data;
      this.total = total;
    },

    pageChange(page) {
      console.log(page);

      // (分页第四步) 把当前的点击页码等于我显示的页码
      // this.currentPage3 = page;

      //(分页第五步)切记一定要调用然后必须去请求里面的let data2 里面改变currentPage 才能点击那一页显示哪一页的数据
      this.getList();
    },


  },
};
</script>

<style lang="less" scoped>
.order {
  height: 100%;
  background-color: rgb(239, 243, 246);
  overflow: hidden;

  .orders {
    width: 1500px;
    height: 870px;
    // background-color: peru;
    margin: 20px auto;

    .info {
      width: 1200px;
      height: 60px;
      // background-color: red;
      display: flex;
      align-items: center;
      margin-left: 30px;

      .demo-form-inline {
        height: 30px;
      }
    }

    .time {
      width: 1200px;
      height: 60px;
      // background-color: purple;
      margin-left: 22px;
      margin-top: 10px;

      .times {
        margin-top: 10px;
      }

      .adds {
        margin-left: 10px;
      }
    }

    .total {
      width: 1500px;
      height: 550px;
      // background-color: yellowgreen;
      margin-top: 30px;
    }

    .page {
      width: 1200px;
      height: 50px;
      // background-color: aqua;
    }
  }
}
</style>
