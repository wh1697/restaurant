<template>
  <div class="classify">
    <!-- 标题和按钮 -->
    <div class="title">
      <h1>商品分类</h1>
      <el-button type="primary" class="adds">添加商品</el-button>
    </div>

    <!-- 第一步放一个盒子包着我一会复制的Element Ui 表单的所有内容 -->
    <div class="content">
      <!-- 第三步 去Element Ui的Form表单里面复制 -->
      <el-table :data="tableData" style="width: 100%">
        <!-- 表格头部标题展示开始 -->
        <el-table-column label="序号" prop="id"> </el-table-column>
        <el-table-column label="分类名称" prop="name"> </el-table-column>
        <el-table-column label="是否启用">
          <!-- 按钮 -->
          <el-switch v-model="value" active-color="#13ce66" inactive-color="#ff4949">
          </el-switch>
        </el-table-column>

        <!-- 表格头部标题结束 -->

        <!-- 编辑删除按钮 -->
        <el-table-column label="操作">
          <!-- @click="handleEdit(scope.$index, scope.row)"
          @click="handleDelete(scope.$index, scope.row)" -->
          <template slot-scope="scope">
            <el-button size="mini">完成</el-button>
          <!-- 更换删除按钮 去Element ui 复制 Popconfirm 气泡确认框 里面的内容 -->
            <!-- <el-button size="mini" type="danger">删除</el-button> -->
            <!-- (点击商品分类中的某一条数据的删除按钮删除掉该条数据第二步) 第一步去account.js里写发请求 然后到这里绑定一个点击事件 @confirm="delAccount(scope.row.id)"  需要传参数  -->
            <el-popconfirm title="确定删除这条数据吗？" style="margin-left: 10px" @confirm="delClassify(scope.row.id)">
            <el-button size="mini" type="danger" slot="reference">删除</el-button>
          </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 分页 -->
    <!-- 底部分页通过改变这里改变样式layout="total,prev, pager, next, jumper" -->
    <div class="page">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page.sync="currentPage3" :page-size="100" layout="total,prev, pager, next, jumper" :total="4000">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { delClassify } from '@/api/account';

export default {
  data() {
    return {
      tableData: [
        {
          id: "1",
          name: "特色粥品",
        },
        {
          id: "2",
          name: "特色粥品",
        },
        {
          id: "3",
          name: "特色粥品",
        },
        {
          id: "4",
          name: "特色粥品",
        },
        {
          id: "5",
          name: "特色粥品",
        },
        {
          id: "6",
          name: "特色粥品",
        },
        {
          id: "7",
          name: "特色粥品",
        },
        {
          id: "8",
          name: "特色粥品",
        },
      ],

      value: true,
      // 底部分页
      currentPage3: 1,
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },

    // 底部分页
    handleSizeChange() {

    },
    handleCurrentChange() {

    },


    // (点击商品分类中的某一条数据的删除按钮删除掉该条数据第三步) 记得发完请求来这块操作请求一定要去上面 import 里面导入请求名称
    async delClassify(id){
      console.log(id,'拿到了删除的id');
      let ret =await delClassify({id});
      // (点击商品分类中的某一条数据的删除按钮删除掉该条数据第四步)
      if (ret.code == 0) {
        this.$message({
          //弹窗一下 因为后端接口文档给了这个 "msg”:"删除成功!" 所以要写这个$message
          type: "success",
          message: "删除成功",
        });
        this.getList(); //刷新列表
      }
    }




  },
};
</script>

<style lang="less">
// 第二步给样式
.classify {
  width: 1200px;
  // height: 800px;
  // background-color: orange;
  margin-top: 20px;
  margin-left: 20px;

  .title {
    width: 1200px;
    height: 50px;
    // background-color: aqua;

    h1 {
      font-size: 25px;
      font-weight: 800;
      float: left;
    }

    .adds {
      float: right;
      margin-top: 10px;
    }
  }

  .content {
    // width: 800px;
    // height: 700px;
    background-color: pink;
    margin-top: 20px;
    border-top: 5px solid gray;
  }
}
</style>
