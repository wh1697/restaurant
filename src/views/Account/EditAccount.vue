<!-- (点击AccountList列表页编辑按钮跳转到EditAccount第一步) 复制AddAccount到一个新页面EditAccount-->
<!-- EditAccount 编辑账号页面的所有内容都是去复制的AddAccount 添加账号里面内容 就完全可以   只需要配置一下路由  -->
<!-- 因为这个页面想展示的是鼠标点击AccountList 里面的操作下面的编辑按钮 去重新编辑刚才添加账号列表里面的信息 -->
<template>
  <!-- 使用公共组件pane第三步 结束 -->
  <pane>
    <!-- 记得给插槽名字 -->
    <span slot="title">编辑账号</span>
    <!-- 这里的插槽content 就会放到页面的上面例如放到TurnPassword.vue这个页面里面我必须给一个div记得给名字<div slot="content">或者一个<template>起名字为<template slot="content"> -->
    <template slot="content">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="账号">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.pass"></el-input>
        </el-form-item>
        <el-form-item label="用户组">
          <el-select v-model="form.region" placeholder="请选择用户组">
            <el-option label="超级管理员" value="超级管理员"
              >超级管理员</el-option
            >
            <el-option label="普通管理员" value="普通管理员"
              >普通管理员</el-option
            >
          </el-select>
        </el-form-item>
        <!-- 下面的按钮 -->
        <el-form-item>
          <el-button type="primary" @click="onSubmit">保存</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </template>
  </pane>
</template>
<script>
// 使用公共组件pane第一步
import pane from "../../components/pane/pane.vue";

// 在api文件夹里面 新建account.js 里面请求名字叫add 然后在这里添加api(发请求第一步)
import { getInfo, saveAccount } from "@/api/account.js";

// 引入正则
// import { PWD_REG } from "@/utils/reg.js";

export default {
  // 使用公共组件pane第二步
  components: {
    pane,
  },

  data() {
    return {
      form: {
        name: "",
        pass: "",
        region: "",
        uid: "", //(点击AccountList列表页编辑按钮跳转到EditAccount第八步) 把拿到的数据回填到当前的表单上面
      },
    };
  },

  methods: {
    // 将修改好的账号密码保存到账号列表AccountList里面
    onSubmit() {
      // console.log("submit!");
      // 触发整个表单验证 这个$refs.form 代表上面 <el-form ref="form"></el-form> 表单的名称是form  相当于一个id
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          console.log("通过表单验证准备开始发送请求");

          // (发请求第二步)  第一步是写在了account.js 里面
          let data = {
            // (改动复制过来的AddAccount页面的请求 现在要做的是 保存修改好的内容再次显示到账号列表AccountList里面第二步) 
            // 根据接口文档修改data 里面的 form 的数据

            id: this.form.uid,
            account: this.form.name,
            userGroup: this.form.region,
          };
          console.log(data);
          // let data = { ...this.form }; //  此时的...this.form  是我表单里面 :model="form"
          // let result = await add(data)  //可能会请求失败因此给放到try...catch里面

          // (发请求第三步)使用try...catch进行错误处理捕获异常
          try {
            //请求正常时要执行的代码  (改动复制过来的的AddAccount页面的请求 现在要做的是保存修改好的内容再次显示到账号列表AccountList里面第三步)  
            // 这里改的是发请求的名字  

            let result = await saveAccount(data); //记得在上面的import里面定义一下
            // console.log(result);

            // (发请求第四步) 用判断做一个用户的消息提示
            if (result.code == 0) {
              //消息提示信息去element ui复制得来
              this.$message({
                message: result.msg,
                type: "success",
              });

              // (发请求第五步)跳转账号列表
              this.$router.push("/Account/AccountList");
            }

            // (发请求第三步)使用try...catch进行错误处理捕获异常
          } catch (e) {
            //请求失败时要执行的代码
            console.log(e);

            // 可能会出现请求超时的问题再给一个提示框
            this.$message({
              message: e.message,
              type: "warning",
            });
          }
        } else {
          console.log("不能提交");
          return false;
        }
      });
    },

    // 重置表单(复制Element ui)别管问什么
    resetForm() {
      this.$refs.accAddForm.resetFields();
    },

    // (点击AccountList列表页编辑按钮跳转到EditAccount第七步) 
    // 当进入账号编辑这个页面后===》要发请求获取账号密码的信息根据id、去请求数据 拿到我在账号列表里面点击的那条数据
    // 注意每次在account.js中发起请求 所在页面等待promise对象的时候 都一定要记得在上面import 导入一下发起请求定义的名称
    async getAccountInfo() {
      // (点击AccountList列表页编辑按钮跳转到EditAccount第八步) 定义参数uid 获取当前的路由信息 记得把uid保存到form 里面
      // this.$route.params.uid  是为了拿到接口文档的参数uid
      let uid = this.$route.params.uid;
      // (点击AccountList列表页编辑按钮跳转到EditAccount第九步)
      this.form.uid = uid; //******保存当前账号id*****  切记

      // console.log(uid);
      let ret = await getInfo({ uid: uid });
      console.log(ret);

      // (点击AccountList列表页编辑按钮跳转到EditAccount第十步)  设置账号编辑页面的数据 
      // 就是点击AccountList账号列表页的点击的那条数据自动渲染到EditAccount的输入框里面
      if (ret.code == 0) {
        let data = ret.data;
        this.form.name = data.account; //把后端拿到的结果赋值给form表单这个对象
        this.form.pass = data.password; //把后端拿到的结果赋值给form表单这个对象
        this.form.region = data.userGroup; //把后端拿到的结果赋值给form表单这个对象
      }
    },
  },

  // 当页面一进入就显示 老样子继续调用刚才定义的方法  当组件创建的时候获取信息
  created() {
    this.getAccountInfo();
  },
};
</script>

<style lang="less" scoped>
.el-input {
  width: 300px;
}
</style>
