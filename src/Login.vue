<template>
  <!-- 登录页面第一步：：在views页面创建Login页面和Layout页面 然后记得去 router文件夹的index.js里面配置路由 -->
  <div class="login">
    <div class="login-box">
      <h1>系统登陆</h1>
      <!-- 登录页面第三步 去Element Ui的Form表单里面复制-->
      <!-- 第六步给input输入框加表单验证 rules   去Element Ui复制 然后把这个rules定义规则写到data里面 -->
      <el-form ref="form" :model="form" :rules="rules">
        <!-- 用户名 -->
        <!-- 第八步 先在 <el-form-item></el-form-item>里面加上 prop="account" -->
        <el-form-item prop="account">
          <!-- 第五步给input输入框前面加上icon图标 注意：prefix-icon 输入框头部图标  suffix-icon 输入框尾部图标 -->
          <el-input v-model="form.account" prefix-icon="iconfont icon-denglu" type="text"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <!-- 第八步 先在 <el-form-item></el-form-item>里面加上 prop="password" -->
        <el-form-item prop="password">
          <!-- 第九步密码框显示输入密码小眼睛切换难点 先去el-input标签里面定义类型 type="password" 上面的用户名也要记得定义上类型type="text" 因此我要给input 一个点击事件@click.native="changeType($event)" 或者直接不加().native是一个修饰符意思是给点击事件再加一个事件 然后去methods里面写事件处理函数-->
          <!-- 第十步 当我点击的时候去修改第九步定义的type的类型 因此我要去data里面定义一个变量isOpen -->
          <el-input v-model="form.password" prefix-icon="iconfont icon-suoding" :suffix-icon="isOpen ? 'iconfont icon-yanjing' : 'iconfont icon-biyanjing'
            " :type="isOpen ? 'text' : 'password'" @click.native="changeType">
          </el-input>
          <!-- 第十二步 小眼睛怎么变化的 难点来了先给闭着的小眼睛icon图标绑定属性给冒号 :suffix-icon 通过isOpen去判断小眼睛的打开或者关闭 先默认为关-->
          <!-- 第十三步 给input框的类型为 type="password" 的时候也去绑定属性 也去用isOpen判断一下 -->
        </el-form-item>
      </el-form>

      <el-button type="primary" class="logins" @click="onSubmit">登录</el-button>
    </div>
  </div>
</template>
<script>
// 发请求第一步从login.js中按需导入login方法
import { login } from "@/api/login.js";
import { getRouter } from "@/router/index";
// 使用vuex把登录之后获取到的后端的信息保存起来 第三步(前几步骤在store的index.js里面写)引用完mapMutations接下来去methods里面注册mapMutations
import { mapMutations } from "vuex";
// 使用vuex把登录之后获取到的后端的信息保存起来 第六步 注意存完之后就开始取state里面的东西这里import 引用完mapState时候  我要在登录页面的计算属性里面注册
import { mapState } from "vuex";

export default {
  //为什么data()是个方法而不是一个对象？因为一个项目里面会有很多个对象，如果是一个对象的话会导致我定义在里面的变量会复用
  data() {
    return {
      // 登录页面第四步  因为:model="form" 里面给空值用来存放input输入框里面的值
      form: {
        account: "",
        password: "",
      },

      // 第七步 把验证规则代码复制到data里去验证 v-model="form.account" 里面的account 先在 <el-form-item></el-form-item>里面加上 prop="account"
      rules: {
        //固定的验证input框输入规则
        account: { required: true, message: "输入不能为空", trigger: "blur" },
        password: [
          { required: true, message: "输入不能为空", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
      },

      isOpen: "false", //第十步用到的
    };
  },

  // 使用vuex把登录之后获取到的后端的信息保存起来 第七步
  computed: {
    ...mapState(["user"]), //user是state里面定义的变量名称
  },

  // 登录页面第三步 去Element Ui的Form表单里面复制
  methods: {
    changeType(e) {
      // 第十四步 进行判断(if判断这块不懂)
      if (e.target.className.indexOf("yanjing")) {
        // 第十一步点击后去改变input的type类型 类型改变成功后我应该让小眼睛打开和关闭跟着变化
        this.isOpen = !this.isOpen;
        // console.log(e, "看看加的这个native修饰符返回了啥");
      }
    },
    // 使用vuex把登录之后获取到的后端的信息保存起来 第四步 (一定要写到methods里面) 因为有多个所以写成数组的格式
    ...mapMutations(["saveUser"]), //第三步已经import了第四步应该在methods里面写 (相当于把vuex的mutations里面的方法注册到登录页面的methods里面)
    // 发请求第二步 按钮点击事件的处理函数
    onSubmit() {
      // 检查表单是否通过验证
      this.$refs.form.validate(async (valid) => {
        // 发请求第三步判断通过验证
        if (valid) {
          // 发请求第四步去element ui复制 Message消息提示信息
          // this.$message({
          //   showClose: true,
          //   message: "输入正确",
          //   type: "success",
          // });

          //  发请求第五步查看接口文档里面的参数 也就是我data 里面的值 account 和 password
          let user = {
            account: this.form.account,
            password: this.form.password,
          };

          // 发请求第六步 await等待异步处理结果 把发请求第五步的user装过来
          let ret = await login(user);
          console.log(ret); //打印的是then里面的结果**** 下一步思路登录请求发送成功后开始进行页面跳转 先把返回的接口信息保存到本地存储里面 *****

          // 发请求第七步 提示成功
          if (ret.code == 0) {
            // 把发请求第四步复制过来
            this.$message({
              // showClose: true,
              message: ret.msg, //这里更改为后台返回的msg
              type: "success",
            });

            // 发请求第八步 保存用户的角色role和令牌token 到本地存储localStorage
            let user_info = {
              role: ret.role,
              token: ret.token,
            };

            // 使用vuex把登录之后获取到的后端的信息保存起来 第五步
            this.saveUser(user_info); //我可以在登录页面通过this去访问到vuex的mutations里面的方法  然后再把user_info里面存放的数据传过去
            // console.log(this.user_info, 999);    //此时已经可以拿到 role 和 token
            getRouter();
            // 3  .发请求第九步  因为本地存储只能存储字符串 因此要记得把对象转为字符串
            // localStorage.setItem("user_info", JSON.stringify(user_info));
            // 发请求第十步 登录成功跳转到首页
            this.$router.push("/index");
          }
        } else {
          console.log("验证不通过，不能提交");
          // 去element ui复制 Message消息提示信息
          this.$message({
            showClose: true,
            message: "用户名和密码不能为空",
            type: "warning",
          });
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
// 登录页面第二步给样式
.login {
  height: 100%;
  background: url(@/assets/img/bg.png) no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;

  .login-box {
    width: 350px;

    h1 {
      font-size: 35px;
      color: #000;
      margin-bottom: 20px;
      text-align: center;
    }

    .logins {
      width: 350px;
    }
  }
}
</style>
