<template>
  <!-- 使用公共组件pane第三步 结束 -->
  <pane>
    <!-- 记得给插槽名字 -->
    <span slot="title">店铺管理</span>

    <!-- 这里的插槽content 就会放到页面的上面例如放到TurnPassword.vue这个页面里面我必须给一个div记得给名字<div slot="content">或者一个<template>起名字为<template slot="content"> -->
    <template slot="content">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="店铺名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="店铺公告">
          <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>

        <!-- 店铺头像 图片上传第一步 -->
        <!-- action 上传地址 必选参数 -->
        <!-- show-file-list 是否显示已上传文件列表 -->
        <!-- on-success 文件上传成功时的钩子 -->
        <!-- before-upload 上传文件之前的钩子，参数为上传的文件， -->
        <el-form-item label="店铺头像" class="shopHeader">
          <el-upload
            class="avatar-uploader"
            action="http://localhost:5000/shop/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <!-- 图片上传第四步 把图片地址:src="imageUrl" 放到店铺头像上传成功的回调里面 -->
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon kk"></i>
          </el-upload>
        </el-form-item>

        <!-- 店铺图片第一步 push到这里 :file-list="form.pics"  -->
        <el-form-item label="店铺图片">
          <!-- :file-list="form.pics"  这里加上的这个 form 是我data里面定义的上面el-form  里面的:model="form"  pics要在data里面定义成 pics:[] -->
          <!-- :on-success="handleAvatarSuccess2" 代表(店铺图片上传成功回调)  -->
          <!-- :before-upload="beforeAvatarUpload"  代表上传之前的限制 -->
          <el-upload
            action="http://localhost:5000/shop/upload"
            list-type="picture-card"
            :file-list="form.pics"
            :on-preview="handlePictureCardPreview"
            :on-success="handleAvatarSuccess2"
            :on-remove="handleRemove"
            :before-upload="beforeAvatarUpload"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <!-- 模态框 -->
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
        </el-form-item>
      </el-form>

      <!-- 配送费一直到活动 -->

      <el-form
        :model="ruleForm"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="配送费" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="配送时间" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="配送描述" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="店铺评分" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="销量" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>

        <el-form-item label="活动" prop="type">
          <el-checkbox-group v-model="ruleForm.type">
            <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
            <el-checkbox label="地推活动" name="type"></el-checkbox>
            <el-checkbox label="线下主题活动" name="type"></el-checkbox>
            <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
            <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>

      <!-- 时间 -->
      <span>营业时间</span>
      <el-date-picker
        class="times"
        v-model="value1"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      >
      </el-date-picker>
    </template>
  </pane>
</template>

<script>
// 使用公共组件pane第一步
import pane from "../components/pane/pane.vue";
export default {
  data() {
    return {
      // 店铺名称+店铺公告
      form: {
        name: "",
        desc: "",
        pics: [],
      },

      // 店铺头像
      imageUrl: "",

      // 店铺图片
      dialogImageUrl: "",
      dialogVisible: false,

      //   配送费一直到活动
      ruleForm: {
        name: "",
        type: [],
      },

      //  营业时间

      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],

      //  模态框  图片上传第五步  在data 里面的 return 里面自定义一个模态框
      dialogVisible: false,
      dialogImageUrl: "",
      baseimgURL: "http://localhost:5000/upload/shop/",
    };
  },

  methods: {
    // 店铺头像 配置Element ui 不然不能用
    // 图片上传第三步 (店铺头像上传成功回调)
    handleAvatarSuccess(res) {
      // console.log(res,'888')
      // 图片上传第六步 判断一下
      if (res.code === 0) {
        // 图片上传第四步  把图片地址:src="imageUrl" 放到店铺头像上传成功的回调里面  记得要给一个模态框 然后去拼接 = 图片的域名
        this.imageUrl = this.baseimgURL + res.imgUrl;
      } else {
        this.$message.error(res.msg);
      }

      // console.log(res);
    },

    // 店铺头像  配置Element ui 不然不能用
    // 图片上传第二步 (上传之前去限制一下) 在图片上传前控制大小和类型进行判断   size: 414313  type: "image/jpeg"
    beforeAvatarUpload(file) {
      if (file.size / 1024 / 1024 > 2) {
        this.$message.error("不能超过2M");
        return; //用$message后 一定要记得return
      }
      if (file.type != "image/jpeg") {
        this.$message.error("请上传jpg图片");
        return;
      }
      //  console.log(file);
    },

    // 店铺图片第二步(店铺图片上传成功的回调)     //res代表上传成功后端返回的     file代表组件返回的信息 如uid
    handleAvatarSuccess2(res, file) {
      // console.log(res, "res");
      // console.log(file, "file");
      this.form.pics.push({
        //this.form.pics 表示 push到这里 :file-list="form.pics"
        url: this.baseimgURL + res.imgUrl, //图片地址需要拼接
        uid: file.uid, //解决Element ui 上传图片的时候动画有问题空白了一张图片的位置几秒钟后才回到本身位置
      });
    },

    // 删除图片第一步  (在this.form.pics 过滤出当前删除的对象) 因为所有添加的东西我都是在this.form.pics push进去的
    handleRemove(file) {
      // console.log(file);
      this.form.pics = this.form.pics.filter((res) => {
        // 通过uid去判断我要删除的是哪个对象 因为filter 不会改变当前的数组因此要进行赋值加上this.form.pics=
        res.uid != file.uid;
      });
    },

    // 图片预览第一步  使用上面定义好的模态框
    handlePictureCardPreview(file) {
      // console.log(file);
      this.dialogVisible = true;
      this.dialogImageUrl = file.url; //file 里面的参数 有url地址
    },
  },
  // 使用公共组件pane第二步
  components: {
    pane,
  },
};
</script>

<style lang="less" scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  .kk {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 148px;
    height: 148px;
  }

  // 店铺头像中间的加号调节位置
  .avatar-uploader-icon[data-v-f1ce81e0] {
    line-height: 148px;
  }
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.el-range-editor.el-input__inner {
  margin-left: 20px;
}
</style>
