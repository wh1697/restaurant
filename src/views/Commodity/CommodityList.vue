<template>
  <!-- 右侧模块下面内容 -->
  <div class="home">
    <h1>商品列表</h1>
    <el-table :data="tableData" style="width: 100%">
      <!-- 点击展开信息开始 -->
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="商品 ID">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="商品名称">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="商品分类">
              <span>{{ props.row.category }}</span>
            </el-form-item>
            <el-form-item label="商品价格">
              <span>{{ props.row.price }}</span>
            </el-form-item>
            <el-form-item label="商品图片">
              <span>{{ props.row.imgUrl }}</span>
            </el-form-item>
            <el-form-item label="创建时间">
              <span>{{ props.row.ctime }}</span>
            </el-form-item>

            <el-form-item label="商品销量">
              <span>{{ props.row.sellCount }}</span>
            </el-form-item>

            <el-form-item label="商品评价">
              <span>{{ props.row.rating }}</span>
            </el-form-item>
            <el-form-item label="商品描述">
              <span>{{ props.row.goodsDesc }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>

      <!-- 点击展开信息结束 -->

      <!-- 表格头部标题展示开始 -->
      <el-table-column label="商品名称" prop="name"> </el-table-column>
      <el-table-column label="所属分类" prop="category"> </el-table-column>
      <el-table-column label="商品价格" prop="price"> </el-table-column>
      <el-table-column label="商品图片" prop="imgUrl">
        <!-- 这块是陈院帮修改的 效果是添加商品的时候可以把上传的图片给显示到商品列表页面了 -->
        <!-- 使用了插槽的作用域 -->
        <template slot-scope="scope">
          <img :src="scope.row.imgUrl" width="50" />
        </template>
      </el-table-column>
      <el-table-column label="商品描述" prop="goodsDesc"> </el-table-column>

      <!-- 表格头部标题结束 -->

      <!-- 编辑删除按钮 -->

      <el-table-column label="操作">
        <!-- @click="handleEdit(scope.$index, scope.row)"
        @click="handleDelete(scope.$index, scope.row)" -->
        <template slot-scope="scope">
          <!-- (点击CommodityList列表页编辑按钮跳转到EditCommodity第三步) 加一个跳转链接  给一个事件处理函数把id传过去 -->
          <!-- (点击CommodityList列表页编辑按钮跳转到EditCommodity第四步) id应该怎么传？？？通过这里的<template slot-scope="scope"> 插槽的作用域 
            搭配 @click="edit_commodity(scope.row.id)" 去传id  
            scope代表当前表格中的数据 row代表当前的每一行数据 id代表每一行数据的id  scope.row.id 代表当前每一行中的id的数据-->
            <!-- (很重要第三步 存) -->
          <el-button size="mini" type="info" @click="edit_commodity(scope.row)">编辑</el-button>

          <!-- 更换删除按钮 去Element ui 复制 Popconfirm 气泡确认框 里面的内容 -->
          <!-- <el-button size="mini" type="danger">删除</el-button> -->
          <!-- (点击商品列表中的某一条数据的删除按钮删除掉该条数据第二步) 第一步去account.js里写发请求 然后到这里绑定一个点击事件 @confirm="delAccount(scope.row.id)"  需要传参数  -->
          <el-popconfirm title="确定删除这条数据吗？" style="margin-left: 10px" @confirm="delCommodity(scope.row.id)">
            <el-button size="mini" type="danger" slot="reference">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <!-- 底部分页 -->
    <el-pagination @size-change="handleSizeChange" @current-change="pageChange" :current-page.sync="currentPage"
      :page-size="pageSize" layout="total,sizes,prev, pager, next, jumper" :total="total" :page-sizes="pageSizes">
    </el-pagination>
  </div>
</template>

<script>
// 发请求一 在api文件夹里面 新建account.js 里面请求名字叫commodityList 然后在这里添加api
import { commodityList } from "@/api/account.js";
import { delCommodity } from "@/api/account.js";
// 导入vuex里面的方法的辅助函数 (很重要第三步 存)
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      tableData: [],

      total: 0, // 定义一个total变量 总页数(一定要和接口里的响应参数保持一致)
      page: {},

      pageSize: 5, // 当前显示的数据条数   page组件默认是10

      // 底部分页需要配置
      currentPage: 1,

      pageSizes: [5, 10, 15, 20, 30],
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleSizeChange() { },

    // 发请求二
    async getList() {
      // 发请求三
      // 发请求四  定义一个方法await等待
      let { data, total } = await commodityList({
        pageSize: this.pageSize,        //data里面定义的数据赋值给接口响应参数 两个要保持一致
        currentPage: this.currentPage,  //data里面定义的数据赋值给接口响应参数 两个要保持一致
      });

      this.tableData = data;    //data里面定义的数据赋值给接口响应参数 两个要保持一致
      this.total = total;    //data里面定义的数据赋值给接口响应参数 两个要保持一致
    },

    pageChange(page) {
      console.log(page);

      // (分页第四步) 把当前的点击页码等于我显示的页码
      // this.currentPage3 = page;

      //(分页第五步)切记一定要调用然后必须去请求里面的let { data, total } = await commodityList 里面改变currentPage 才能点击那一页显示哪一页的数据
      this.getList();
    },

    // (点击商品列表中的某一条数据的删除按钮删除掉该条数据第三步) 记得发完请求来这块操作请求一定要去上面 import 里面导入请求名称
    async delCommodity(id) {
      console.log(id, "拿到了删除的id");
      let ret = await delCommodity({ id });

      // (点击商品列表中的某一条数据的删除按钮删除掉该条数据第四步)
      if (ret.code == 0) {
        this.$message({
          //弹窗一下 因为后端接口文档给了这个 "msg”:"删除成功!" 所以要写这个$message
          type: "success",
          message: "删除成功",
        });
        this.getList(); //刷新列表
      }
    },

    // 编辑按钮绑定的事件
    // (点击CommodityList列表页编辑按钮跳转到EditCommodity第五步)
    // (很重要第四步 存)
    edit_commodity(id) {
      console.log(id);

      this.changeInfo(id);
      // (点击CommodityList列表页编辑按钮跳转到EditCommodity第六步)根据路由去跳转 记得要传参数  搭配第七步 现在已经可以将页面成功跳转了地址为http://localhost:8080/#/Account/EditAccount/93


      // 参数不要因为已经把整条数据都放到vuex里面了 不用id了(很重要第四步 存)
      // this.$router.push({ name: "EditCommodity", params: { id: id } });
      this.$router.push({ name: "EditCommodity" });
    },

    // 把mutations里面的方法放到这里 (很重要第五步 存结束) 下一步去EditCommodity开始取vuex里面保存好的数据
    ...mapMutations(["changeInfo"]),
  },

  // (发请求第四步) 在生命周期里面调用上面这个函数 当页面一进入的时候就会调用getList() 然后getList()就会调用这里的commodityList方法去获取数据 let { data, total } = await commodityList(data2);
  created() {
    this.getList();
  },
};
</script>

<style lang="less" scoped>
.home {
  width: 1500px;
  // background-color: purple;
  // float: left;
  margin: 15px 15px 15px 15px;

  h1 {
    color: #000;
    font-weight: 300;
    font-size: 20px;
    margin-left: 20px;
  }
}

// 表格内容
.demo-table-expand {
  font-size: 0;
}

.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}

.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
