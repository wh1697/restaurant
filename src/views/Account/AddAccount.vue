<!-- 主要展示的核心是登录成功后自动跳转到首页  -->
<!-- 然后 点击账号管理里面的 添加账号页面 输入账号密码等信息后 自动跳转地址将刚才输入的信息添加到 账号列表里面 -->
<template>
  <!-- 使用公共组件pane第三步 结束 -->
  <pane>
    <!-- 记得给插槽名字 -->
    <span slot="title">添加账号</span>
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
            <el-option label="超级管理员" value="超级管理员">超级管理员</el-option>
            <el-option label="普通管理员" value="普通管理员">普通管理员</el-option>
          </el-select>
        </el-form-item>
        <!-- 下面的按钮 -->
        <el-form-item>
          <el-button type="primary" @click="onSubmit">添加</el-button>
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
import { add } from "@/api/account.js";

// 引入正则
import { PWD_REG } from "@/utils/reg.js";

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
      },
    };
  },

  methods: {
    // 添加账号
    onSubmit() {
      // console.log("submit!");
      // 触发整个表单验证 这个$refs.form 代表上面 <el-form ref="form"></el-form> 表单的名称是form  相当于一个id
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          console.log("通过表单验证准备开始发送请求");

          // (发请求第二步)    根据接口文档给的参数和自己在data里面定义的参数做这个功能
          let data = {
            account: this.form.name,
            password: this.form.pass,
            userGroup: this.form.region,
          };
          console.log(data);
          // let data = { ...this.form }; //  此时的...this.form  是我表单里面 :model="form"
          // let result = await add(data)  //可能会请求失败因此给放到try...catch里面

          // (发请求第三步)使用try...catch进行错误处理捕获异常
          try {
            //请求正常时要执行的代码(发请求第四步)
            let result = await add(data);
            // console.log(result);
            // (发请求第四步) 用判断做一个用户的消息提示
            if (result.code == 0) {
              //消息提示信息去element ui复制得来
              // this.$message({
              //   message: result.msg,
              //   type: "success",
              // });
              // (发请求第五步)跳转账号列表
              this.$router.push("/Account/AccountList");
            }
            // (发请求第三步)使用try...catch进行错误处理捕获异常
          } catch (e) {
            //请求失败时要执行的代码
            console.log(e);

            // 可能会出现请求超时的问题再给一个提示框
            // this.$message({
            //   message: e.message,
            //   type: "warning",
            // });
          }
        } else {
          console.log("不能提交");
          return false;
        }
      });
    },

    resetForm() { },  //重置按钮
  },
};
</script>

<style lang="less" scoped>
.el-input {
  width: 300px;
}
</style>
