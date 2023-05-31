<template>
  <!-- 右侧模块下面内容 -->
  <div class="home">
    <h1>商品列表</h1>
    <el-table :data="tableData" style="width: 100%">
      <!-- 点击展开开始 -->
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="商品名称">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="所属店铺">
              <span>{{ props.row.shop }}</span>
            </el-form-item>
            <el-form-item label="商品 ID">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="店铺 ID">
              <span>{{ props.row.shopId }}</span>
            </el-form-item>
            <el-form-item label="商品分类">
              <span>{{ props.row.category }}</span>
            </el-form-item>
            <el-form-item label="店铺地址">
              <span>{{ props.row.address }}</span>
            </el-form-item>
            <el-form-item label="商品描述">
              <span>{{ props.row.desc }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>

      <!-- 点击展开信息结束 -->

      <!-- 表格头部标题展示开始 -->
      <el-table-column label="商品名称" prop="id"> </el-table-column>
      <el-table-column label="所属分类" prop="name"> </el-table-column>
      <el-table-column label="商品价格" prop="desc"> </el-table-column>
      <el-table-column label="商品图片" prop="aa"> </el-table-column>
      <el-table-column label="商品描述" prop="address"> </el-table-column>

      <!-- 表格头部标题结束 -->

      <!-- 编辑删除按钮 -->

      <el-table-column label="操作">
        <!-- @click="handleEdit(scope.$index, scope.row)"
      @click="handleDelete(scope.$index, scope.row)" -->
        <template>
          <el-button size="mini">编辑</el-button>
          <el-button size="mini" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 底部分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage3"
      :page-size="100"
      layout="total,sizes,prev, pager, next, jumper"
      :total="4000"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          id: "田园蔬菜粥",
          name: "特色粥品",
          category: "江浙小吃、小吃零食",
          desc: "16",
          aa: "../../assets/img/logo.png",
          address: "一碗皮蛋瘦肉粥,总是",
          shop: "王小虎夫妻店",
          shopId: "10333",
        },
        {
          id: "鲜蔬菌菇粥",
          name: "特色粥品",
          category: "江浙小吃、小吃零食",
          desc: "16",
          aa: "../../assets/img/logo.png",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333",
        },
        {
          id: "红枣山药糙米粥",
          name: "特色粥品",
          category: "江浙小吃、小吃零食",
          desc: "16",
          aa: "../../assets/img/logo.png",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333",
        },
        {
          id: "红豆慧米美肤粥",
          name: "特色粥品",
          category: "江浙小吃、小吃零食",
          desc: "16",
          aa: "../../assets/img/logo.png",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333",
        },
        {
          id: "南瓜粥",
          name: "特色粥品",
          category: "江浙小吃、小吃零食",
          desc: "16",
          aa: "../../assets/img/logo.png",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333",
        },
      ],

      // 底部分页需要配置
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

    handleSizeChange() {},
    handleCurrentChange() {},
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
