<!-- (点击CommodityList商品列表页编辑按钮跳转到EditCommodity第一步) 复制AddCommodity到一个新页面EditCommodity-->
<!-- EditCommodity 编辑商品页面的所有内容都是去复制的AddCommodity 添加商品里面内容 就完全可以   只需要配置一下路由  -->
<!-- 因为这个页面想展示的是鼠标点击CommodityList 里面的操作下面的编辑按钮 去重新编辑刚才添加到 商品列表里面的信息 -->
<template>
  <div class="add">
    <h1>编辑商品</h1>

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
          <el-input-number v-model="form.price" @change="handleChange" :min="1" :max="10"></el-input-number>
        </el-form-item>

        <!-- 商品图片 push到这里 :file-list="form.pics" -->
        <el-form-item label="商品图片">
          <!-- :file-list="form.pics"  这里加上的这个 form 是我data里面定义的上面el-form  里面的:model="form"  pics要在data里面定义成 pics:[] -->
          <!-- :on-success="handleAvatarSuccess" 代表(店铺图片上传成功回调)  -->
          <!-- :before-upload="beforeAvatarUpload"  代表上传之前的限制 -->
          <el-upload action="http://192.168.137.114:5000/shop/upload" list-type="picture-card" :file-list="form.imgUrl"
            :on-preview="handlePictureCardPreview" :on-success="handleAvatarSuccess" :on-remove="handleRemove"
            :before-upload="beforeAvatarUpload">
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>

        <!-- 商品描述 -->
        <el-form-item label="商品描述">
          <textarea name="" id="" cols="30" rows="10" class="tell" v-model="form.goodsDesc"></textarea>
        </el-form-item>
      </el-form>

      <el-button type="primary" class="adds" @click="onSubmit">添加商品</el-button>
    </div>
  </div>
</template>

<script>
// 发请求第一步
import { addCommodity,getCommodity } from "@/api/account";
// 导入辅助函数 (很重要第六步 取)
import { mapState } from "vuex";
export default {
  data() {
    return {
      // 第四步  因为:model="form" 里面给空值用来存放input输入框里面的值
      form: {
        name: "", //商品名称
        category: "", //商品分类
        price: "", //商品价格
        imgUrl: [], //商品图片
        goodsDesc: "",  //商品描述
        id: "", //(点击CommodityList列表页编辑按钮跳转到EditCommodity第八步) 把拿到的数据回填到当前的表单上面
      },

      // 店铺头像
      // imageUrl: "",

      //  模态框  商品图片上传第五步  在data 里面的 return 里面自定义一个模态框
      dialogVisible: false,
      dialogImageUrl: "",
      baseimgURL: "http://192.168.137.114:5000/upload/shop/",
    };
  },
  // (很重要第七步 取) 在计算属性里面取到了我在vuex的state里面定义的info 里面存放的是点击按钮的那条数据
  computed:{
    ...mapState(['info'])
  },

  // (很重要第八步 取) 把取到的数据显示在编辑商品EditAccount页面
  created(){
    console.log(this.info,'info')
    this.form ={...this.info,imgUrl:[{url:this.info.imgUrl}]}
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
            // 因为使用map或者是filter去过滤返回的是一个新的数组 所以我要定义一下
            // this.form.imgUrl = this.form.imgUrl.map((res) => {return res.url;}).toString();

            // let imgUrl = (this.form.imgUrl.length && this.form.imgUrl.map((res) => { return res.url; }).toString()) || "";

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

            // let result = await addCommodity({ ...this.form });
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

    handlePictureCardPreview(file) { },

    handleRemove(file) { },

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
      // console.log(res,'888')
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

    // (点击CommodityList列表页编辑按钮跳转到EditCommodity第七步)
    // 当进入账号编辑这个页面后===》要发请求获取账号密码的信息根据id、去请求数据 拿到我在账号列表里面点击的那条数据
    // 注意每次在account.js中发起请求 所在页面等待promise对象的时候 都一定要记得在上面import 导入一下发起请求定义的名称

    async getAccountInfo() {
      // (点击CommodityList列表页编辑按钮跳转到EditCommodity第八步) 去上面定义参数id 获取当前的路由信息 记得把id保存到form 里面
      // this.$route.params.id  是为了拿到接口文档的参数id
      let id = this.$route.params.id;

      // (点击CommodityList列表页编辑按钮跳转到EditCommodity第九步)
      this.form.id = id; //******保存当前账号id*****  切记

      // console.log(uid);
      let ret = await getCommodity({ id: id });
      console.log(ret);

      // (点击CommodityList列表页编辑按钮跳转到EditCommodity第十步)  设置账号编辑页面的数据 
      // 就是点击AccountList账号列表页的点击的那条数据自动渲染到EditAccount的输入框里面
      if (ret.code == 0) {
        let data = ret.data;
        this.form.name = data.name; //把后端拿到的结果赋值给form表单这个对象
        this.form.category = data.category; //把后端拿到的结果赋值给form表单这个对象
        this.form.price = data.price; //把后端拿到的结果赋值给form表单这个对象
        this.form.imgUrl = data.imgUrl; //把后端拿到的结果赋值给form表单这个对象
        this.form.goodsDesc = data.goodsDesc; //把后端拿到的结果赋值给form表单这个对象
      }
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
    background-color: pink;
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
