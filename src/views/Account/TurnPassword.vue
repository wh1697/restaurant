<template>
  <!-- 使用公共组件pane第三步 结束 -->
  <pane>
    <!-- 此时这个span标签 修改密码 记得与pane插槽名字对应 -->
    <span slot="title">修改密码</span>

    <!-- 表单自定义校验 -->
    <!-- 这里的插槽content 就会放到页面的上面例如放到TurnPassword.vue这个页面里面我必须给一个div记得给名字<div slot="content">或者一个<template>起名字为<template slot="content">-->
    <div slot="content">
      <div style="margin: 20px"></div>
      <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign" :rules="rules" ref="ruleForm">
        <el-form-item label="原密码" prop="checkPass">
          <el-input v-model="formLabelAlign.name"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="Pass">
          <el-input v-model="formLabelAlign.region"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="oldPass">
          <el-input v-model="formLabelAlign.type"></el-input>
        </el-form-item>

         <!-- 下面的按钮 -->
         <el-form-item>
          <el-button type="primary" @click="onSubmit">确定</el-button>
          <el-button>重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </pane>
</template>

<script>
// 使用公共组件pane第一步
import pane from "../../components/pane/pane.vue";
// 表单自定义校验第四步 记得去utils里面创建一个reg.js文件夹里面内容写正则表达式
import { PWD_REG } from "@/utils/reg";
export default {
  data() {
    // 表单自定义校验第一步(必须要用箭头函数才能将this指向return里面定义的rules)
    let checkOldpass = (rules, value, callback) => {
      // 表单自定义校验第三步
      if (!value) {
        // console.log(rules,'rules');
        callback(new Error(rules.mes));
      } else {
        switch (rules.field) {
          case "oldPass":
            // 表单自定义校验第五步进行判断 当value不匹配的时候
            // if(!PWD_REG.test(value)){
            //   callback(new Error('原密码输入格式错误'));   //这块有接口了还要加现在不知道用户输入的密码

            // }

            // 表单自定义校验第六步 切记一定要调用这个回调函数
            callback();
            break;

          case "Pass":
            // 表单自定义校验第八步
            if (this.ruleForm.checkPass) {
              // this.$refs.ruleForm.validateField("checkPass");
              if (!this.$refs.ruleForm.validateField("checkPass")) {
                callback(new Error("两次密码输入不一样11")); //这块有接口了还要加现在不知道用户输入的密码
              }
            }
            // 表单自定义校验第五步进行判断 当value不匹配的时候
            if (!PWD_REG.test(value)) {
              callback(new Error("原密码输入格式错误")); //这块有接口了还要加现在不知道用户输入的密码
            }

            break;

          case "checkPass":
            if (this.ruleForm.pass !== value) {
              //拿之前输入的密码和现在输入的密码进行对比
              callback(new Error("两次密码输入不一样2"));
            }
            break;

          default:
            break;
        }
      }
    };
    // callback();

    return {
      labelPosition: "right",

      formLabelAlign: {
        name: "",
        region: "",
        type: "",
      },

      // 表单自定义校验第二步
      rules: {
        oldPass: {
          required: true,
          validator: checkOldpass,
          mes: "请输入原密码",
        },
        Pass: {
          required: true,
          validator: checkOldpass,
          mes: "请输入新密码",
          trigger: "blur",
        },
        checkPass: {
          required: true,
          validator: checkOldpass,
          mes: "请再次输入原密码",
          trigger: "blur",
        },
      },

      ruleForm: {
        oldPass: "",
        Pass: "",
        checkPass: "",
      },
    };
  },

  // 表单自定义校验第七步
  resetForm(formName) {
    // 将所有字段值重置为初始值并移除校验结果
    this.$refs[formName].resetFields();
  },

  // 使用公共组件pane第二步
  components: {
    pane,
  },

  methods: {
    onSubmit() {
      console.log("submit!");
    },
  },
};
</script>

<style></style>
