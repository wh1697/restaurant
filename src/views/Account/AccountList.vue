<template>
  <!-- 使用公共组件pane第三步 结束 -->
  <pane>
    <!-- 记得给插槽名字 -->
    <span slot="title">账号列表</span>
    <!-- 这里的插槽content 就会放到页面的上面例如放到TurnPassword.vue这个页面里面我必须给一个div记得给名字<div slot="content">或者一个<template>起名字为<template slot="content"> -->
    <template slot="content">
      <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%"
        @selection-change="handleSelectionChange">
        <!-- 多选框 -->
        <el-table-column type="selection" width="55"> </el-table-column>

        <!-- (发请求第六步)+ 列表数据显示  prop="account" 根据接口文档给的参数自定义属性 文档给出数据挑选使用 {"id": 38,"ctime": "2020-05-18T22:48:16.000Z", "account": "aaa","userGroup": "超级管理员", "imgUrl": "default.jpg"},-->
        <el-table-column label="账号" width="220" prop="account">
        </el-table-column>
        <!-- (发请求第六步)+ 列表数据显示 prop="userGroup" 根据接口文档给的参数自定义属性-->
        <el-table-column prop="userGroup" label="用户名" width="220">
        </el-table-column>
        <!-- (发请求第六步)+ 列表数据显示 prop="ctime" 根据接口文档给的参数自定义属性-->
        <el-table-column prop="ctime" label="创建时间" width="420" show-overflow-tooltip>
        </el-table-column>

        <!-- 操作下面的编辑和删除按钮 -->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- (点击AccountList列表页编辑按钮跳转到EditAccount第三步) 加一个跳转链接  给一个事件处理函数把id传过去 -->
            <!-- (点击AccountList列表页编辑按钮跳转到EditAccount第四步) id应该怎么传？？？通过这里的<template slot-scope="scope"> 插槽的作用域 搭配 @click="edit_account(scope.row.id)" 去传id  
              scope代表当前表格中的数据 row代表当前的每一行数据 id代表每一行数据的id  scope.row.id 代表当前每一行中的id的数据-->
            <el-button size="mini" type="info" @click="edit_account(scope.row.id)">编辑</el-button>
            <!-- <el-button size="mini" type="danger">删除</el-button> -->

            <!-- 更换删除按钮 去Element ui 复制 Popconfirm 气泡确认框 里面的内容 -->
            <!-- (点击账号列表中的某一条数据的删除按钮删除掉该条数据第二步) 第一步去account.js里写发请求绑定一个点击事件 @confirm="delAccount(scope.row.id)"  需要传参数  -->
            <el-popconfirm title="确定删除这条数据吗？" style="margin-left: 10px" @confirm="delAccount(scope.row.id)">
              <el-button size="mini" type="danger" slot="reference">删除</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <!-- (分页第三步) 当点击的时候获取当前的页码给绑定一个自定义事件 @current-change="pageChange"   这个currentPage 是在Element ui 
        里面的事件参数知道起的名字 作用是当改变时会触发 放到发请求里面 -->
      <el-pagination @current-change="pageChange" :current-page.sync="currentPage3"
        layout="total,sizes,prev, pager, next, jumper" :page-size="pageSize" :total="total" :page-sizes="pageSizes"
        @size-change="handleSizeChange">
        <!-- (分页第八步)  将之前的  :total="4000" 换为:total="total" 变成动态的总页数 -->
        <!-- (分页第九步) 将之前的 :page-size="100" 换为与下面data里面定义的pageSize: 5, 保持一致 这里改为:page-size="pageSize"-->
        <!-- (分页第九步) 将之前的:page-sizes="[100, 200, 300, 400]" 换为:page-sizes="pageSizes"  去控制每一页可选择展示的数据  因此去data中给 pageSizes定义每页显示条数的数组 -->
        <!-- (分页第十一步)  当我们切换多少条每页的时候  虽然可以切换成功但是页面的数据并没有变化  因此给@size-change="handleSizeChange" 这个属性-->
      </el-pagination>

      <!-- 最底部批量删除和取消选择按钮 -->
      <div style="margin-top: 20px">
        <!-- (批量删除第二步) 绑定一个点击事件 @click="delAll"  -->
        <el-button type="danger" @click="delAll">批量删除</el-button>
        <el-button @click="toggleSelection()">取消选择</el-button>
      </div>
    </template>
  </pane>
</template>
<script>
// 使用公共组件pane第一步
import pane from "../../components/pane/pane.vue";

// (发请求第一步)在api文件夹里面 新建account.js 里面请求名字叫list 然后在这里添加api
import { list, delAccount, delAllAccount } from "@/api/account.js";

export default {
  data() {
    return {
      tableData: [], //存放表格数据的
      check_arr: [], //选中的列表数据数组

      //请求已经结束    现在开始(分页第一步) 点击的时候切换另一页 根据接口文档定义变量
      pageSize: 5, // 当前显示的数据条数   page组件默认是10

      // (分页第二步)底部分页当前是第几页显示的页数 点击第几页就显示第几页 因此通过currentPage3来展示
      currentPage3: 1,

      // (分页第六步)当点击分页下面的页码时候页面没有数据展示 就不显示页码了 // 去给total总页数 进行操作 接口文档也给total总页数这个参数了很贴心
      total: 0, // 定义一个total变量 总页数

      // (分页第十步) 定义pageSizes去控制每一页可选择展示的数据的数组
      pageSizes: [5, 10, 15, 20, 30],
    };
  },

  methods: {
    //配置Element ui 多选框的东西复制过来的别问为什么 参数是把所有选中的数据对象都拿到
    handleSelectionChange(val) {
      // (批量删除第一步)取选中的列表数据的数组里面的id 使用数组方法的 map 更好
      let arr = val.map((v, k, arr) => {
        return v.id; //此时点击全选框 可以拿到所有数据的
      });
      // console.log(arr);

      this.check_arr = arr; //check_arr 表示选中的列表数据数组
    },

    // 编辑按钮绑定的事件
    // (点击AccountList列表页编辑按钮跳转到EditAccount第五步)
    edit_account(id) {
      console.log(id);
      // (点击AccountList列表页编辑按钮跳转到EditAccount第六步)根据路由去跳转 记得要传参数  搭配第七步(在EditAccount里面呢)  现在已经可以将页面成功跳转了地址为http://localhost:8080/#/Account/EditAccount/93
      this.$router.push({ name: "EditAccount", params: { uid: id } });
    },

    //  (批量删除第四步)  想删除的时候去发送请求因此批量删除第三步在account里面写
    async delAll() {
      //接口文档的参数ids弄过来 把data里面的check_arr: [], 数组转为字符串用JSON.stringify() 里面存放的是ids参数的字符串格式
      let ids = JSON.stringify(this.check_arr);
      let ret = await delAllAccount({ ids }); //此时ids里面的check_arr: [] 已经拿过来了
      console.log(ret);
      this.getList();  //从新调用要不然  批量删除完刷新才能显示 
    },

    // (发请求第二步) 自定义一个方法前缀async
    async getList() {
      // (发请求第三步) 因为接口文档给出了两个参数currentPage和pageSize 这里需要传参数
      let data2 = {
        // currentPage: 1, //定义当前显示第一页
        currentPage: this.currentPage3, //(分页第五步) 记得来这里更改
        // pageSize: 3, //定义每页显示的数据条数
        pageSize: this.pageSize, //定义每页显示的数据条数 (分页第五步) 记得来这里更改
      };

      // (发请求第二步) 定义一个方法await等待
      let ret = await list(data2);
      console.log(data2, "33");

      //(发请求第五步) 现在去布局里面看el-table 的列表的数据在 :data="tableData"这里
      // 因此要保存列表数据在当前接口的data里面
      this.tableData = ret.data;

      // (分页第七步) 在我的请求里面保存一下这个总页数
      this.total = ret.total;
    },

    // (分页第三步) 当点击的时候获取当前的页码 page参数是固定的
    pageChange(page) {
      console.log(page);

      // (分页第四步) 把当前的点击页码等于我显示的页码
      this.currentPage3 = page;

      //(分页第五步)切记一定要调用然后必须去请求里面的let data2 里面改变currentPage 才能点击那一页显示哪一页的数据
      this.getList();
    },

    // (分页第十二步) 当5条每页或者30条每页点击切换的时候看看每页显示的数据的条数
    handleSizeChange(size) {
      console.log(size);
      this.pageSize = size; // 修改每页显示的条数(不懂为什么传参数size)
      this.getList(); //在重新获取一下列表 会重新获取一下这个新的pageSize
    },

    // (点击账号列表中的某一条数据的删除按钮删除掉该条数据第三步) 记得发完请求来这块操作请求一定要去上面 import 里面导入请求名称
    async delAccount(id) {
      console.log(id, "拿到了删除的id");
      let ret = await delAccount({ id });

      // (点击账号列表中的某一条数据的删除按钮删除掉该条数据第四步)
      if (ret.code == 0) {
        this.$message({
          //弹窗一下 因为后端接口文档给了这个 "msg”:"删除成功!" 所以要写这个$message
          type: "success",
          message: "ret.msg",
        });
        this.getList(); //刷新列表
      }
    },
  },

  // (发请求第四步) 在生命周期里面调用上面这个函数 当页面一进入的时候就会调用getList()  
  // 然后getList()就会调用这里的list方法去获取数据   let ret = await list(data2);
  created() {
    this.getList();
  },

  // 使用公共组件pane第二步
  components: {
    pane,
  },
  created() {
    this.getList();
  },
};
</script>

<style lang="less" scoped>
.button {
  margin-top: 20px;

  .delete {
    background-color: red;
  }

  .choose {
    background-color: blue;
    color: #ffff;
  }
}
</style>
