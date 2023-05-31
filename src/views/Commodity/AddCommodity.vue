<template>
  <div class="add">
    <h1>商品添加</h1>

    <!-- 第一步放一个盒子包着我一会复制的Element Ui 表单的所有内容 -->
    <div class="content">
      <!-- 第三步 去Element Ui的Form表单里面复制 -->
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="商品名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="商品分类">
          <el-select v-model="form.category" placeholder="请选择活动区域">
            <el-option label="高端奢侈品牌" value="高端奢侈品牌"></el-option>
            <el-option label="廉价折扣品牌" value="廉价折扣品牌"></el-option>
          </el-select>
        </el-form-item>

        <!-- 商品价格 v-model="form.num" 这块记得改啊 -->
        <el-form-item label="商品价格">
          <el-input-number
            v-model="form.price"
            @change="handleChange"
            :min="1"
            :max="10"
          ></el-input-number>
        </el-form-item>

        <!-- 商品图片 push到这里 :file-list="form.pics" -->
        <el-form-item label="商品图片">
          <!-- :file-list="form.pics"  这里加上的这个 form 是我data里面定义的上面el-form  里面的:model="form"  pics要在data里面定义成 pics:[] -->
          <!-- :on-success="handleAvatarSuccess" 代表(店铺图片上传成功回调)  -->
          <!-- :before-upload="beforeAvatarUpload"  代表上传之前的限制 -->
          <el-upload
            action="http://192.168.137.114:5000/shop/upload"
            list-type="picture-card"
            :file-list="form.imgUrl"
            :on-preview="handlePictureCardPreview"
            :on-success="handleAvatarSuccess"
            :on-remove="handleRemove"
            :before-upload="beforeAvatarUpload"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>

        <!-- 商品描述 -->
        <el-form-item label="商品描述">
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            class="tell"
            v-model="form.goodsDesc"
          ></textarea>
        </el-form-item>
      </el-form>

      <el-button type="primary" class="adds" @click="onSubmit"
        >添加商品</el-button
      >
    </div>
  </div>
</template>

<script>
// 发请求第一步
import { addCommodity } from "@/api/account";
export default {
  data() {
    return {
      // 第四步  因为:model="form" 里面给空值用来存放input输入框里面的值
      form: {
        name: "", //商品名称
        category: "", //商品分类
        price: "", //商品价格
        imgUrl: [], //商品图片
        goodsDesc: "",
      },

      // 店铺头像
      // imageUrl: "",

      //  模态框  商品图片上传第五步  在data 里面的 return 里面自定义一个模态框
      dialogVisible: false,
      dialogImageUrl: "",
      baseimgURL: "http://192.168.137.114:5000/upload/shop/",
    };
  },

  methods: {
    onSubmit() {
      // console.log("点击成功");
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          console.log("通过表单验证准备开始发送请求");
          console.log(this.form, "this.form");
          // console.log(data);

          try {
            // 因为使用map或者是filter去过滤返回的是一个新的数组 所以我要定义一下 []  ''
            // this.form.imgUrl = this.form.imgUrl.map((res) => {return res.url;}).toString();

            // 这块是小陈老师帮改的  解决了添加商品的时候 请求成功但是一直显示参数错误的问题  错误原因是添加商品的时候上传的图片是数组形式但是接口文档给的是字符串形式
            // let imgUrl = this.form.imgUrl.length && this.form.imgUrl.map((res) => { return res.url; }).toString() || "";
            // let info = {...this.form,imgUrl:imgUrl
            // }
            // console.log(info)

            // 这块是陈院帮改的 解决了添加商品的时候 请求成功但是一直显示参数错误的问题  错误原因是添加商品的时候上传的图片是数组形式但是接口文档给的是字符串形式
            let img = this.form.imgUrl[0].imgUrl;
            let info = {
              name: this.form.name, //商品名称
              category: this.form.category, //商品分类
              price: this.form.price, //商品价格
              imgUrl: this.form.imgUrl[0].url, //商品图片
              goodsDesc: this.form.goodsDesc,
            };
            console.log(info);

            let result = await addCommodity({ ...info });

            if (result.code == 0) {
              this.$router.push("/Commodity/CommodityList");
            }
          } catch (e) {
            console.log(e);
          }
        } else {
          console.log("不能提交");
          return false;
        }
      });
    },

    handlePictureCardPreview(file) {},

    handleRemove(file) {},

    // 商品图片上传第二步 (上传之前去限制一下) 在图片上传前控制大小和类型进行判断   size: 414313  type: "image/jpeg"
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

    // 商品图片上传第三步(商品图片上传成功的回调)  //res代表上传成功后端返回的     file代表组件返回的信息 如uid
    handleAvatarSuccess(res, file) {
      console.log(res,'888')
      // 商品图片上传第六步 判断一下
      if (res.code === 0) {
        // 图片上传第四步  把图片地址:src="imageUrl" 放到店铺头像上传成功的回调里面  记得要给一个模态框 然后去拼接 = 图片的域名
        this.form.imgUrl.push({
          url: this.baseimgURL + res.imgUrl,
          uid: file.uid,
        });
        console.log(this.form.imgUrl);
      } else {
        this.$message.error(res.msg);
      }

      // console.log(res);
    },

    // 商品价格
    handleChange(value) {
      console.log(value);
    },
  },
};
</script>

<style lang="less" scoped>
.add {
  width: 1200px;
  height: 800px;
  // background-color: orange;
  margin-top: 20px;
  margin-left: 20px;

  // 第二步给样式
  .content {
    width: 800px;
    // height: 700px;
    // background-color: pink;
    margin-top: 20px;
    border-top: 5px solid gray;

    .tell {
      width: 300px;
      height: 100px;
    }

    .adds {
      margin-left: 150px;
    }
  }
}
</style>
