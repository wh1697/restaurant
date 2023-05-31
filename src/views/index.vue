<template>
  <!-- 有四个框的首页展示大盒子 -->
  <div class="index">
    <!-- <h1>首页</h1> -->
    <!-- 使用响应式布局方式 -->
    <el-row class="index-box">
      <el-col class="aa">
        <!-- 第四步 -->
        <Card :cardArr="cardArr"></Card>
      </el-col>
    </el-row>

    <!-- 想用echarts图第三步 -->
    <div id="ww"></div>
  </div>
</template>

<script>
import Card from "../components/Card/Card.vue";
// 想用echarts图第一步先在终端安装 npm install echarts 一个项目只需要安装一次就可以
// 想用echarts图第二步导入下面这个 import * as echarts from "echarts";
import * as echarts from "echarts";

// echarts图表发起请求第三步
import { totaldata } from "@/api/totaldata";

// 首页的echarts图数据存放到vuex里面 第六步(前几步全在store的index.js里面写) 数据已经存好下面要取出vuex里面的数据在页面显示
import { mapState, mapActions } from "vuex";

export default {
  // 引用卡片组件
  components: {
    Card,
  },

  // 首页的echarts图数据存放到vuex里面 第七步 取vuex里面的数据上一步已经定义好了state的辅助函数 直接在计算属性中拿到就可以
  computed: {
    ...mapState(["echarts"]),
  },

  //第三步在父组件定义要传过来的数据
  data() {
    return {
      cardArr: [
        {
          // img: "../assets/img/logo.png",   //这样是拿不到图片的不会显示
          img: require("../assets/img/logo.png"),
          name: "总订单",
          money: "102,400",
        },
        {
          img: require("../assets/img/logo.png"),
          name: "总销售额",
          money: "102,400",
        },
        {
          img: require("../assets/img/logo.png"),
          name: "今日订单数",
          money: "102,400",
        },
        {
          img: require("../assets/img/logo.png"),
          name: "今日销售额",
          money: "102,400",
        },
      ],

      // echarts图表发起请求第六步  在data里面定义echarts图x轴的数据
      xData: [],

      // echarts图表发起请求第八步
      orderData: [],
    };
  },

  // echarts图表发起请求第五步 一进入页面的时候就要发起请求
  created() {
    // this.getTotaldata(); //此时参数里面有xData就是x轴的数据
  },

  // 想用echarts图第六步 页面一进入就显示
  async mounted() {
    // this.aa();   //没有进行数据请求放这里请求完数据就要换地方
    // echarts图表发起请求第十步  因为Echarts图是需要有dom后才开始对页面进行渲染的
    await this.getTotaldata(); //此时参数里面有xData就是x轴的数据

    // 首页的echarts图数据存放到vuex里面 第十一步 (记得给mounted async 和里面的 await )
    this.aa();
  },

  // 想用echarts图第五步
  methods: {
    // 注意:96-108行注释掉是因为我使用了第二种方法把数据放到了vuex里面
    // // echarts图表发起请求第四步
    // async getTotaldata() {
    //   // let res = await totaldata();   //这样请求完返回的是所有的参数
    //   // console.log(res, "Echarts发请求传递的参数展示");

    //   // echarts图表发起请求第七步
    //   let { xData, orderData } = await totaldata(); //因为接口返回的xData 是一个对象 因此我们可以用{} 取到 而且可以用哪个取哪个
    //   this.xData = xData;             // 如果想保存到vuex里面首要思想是将xData 放到vuex的state里面
    //   this.orderData = orderData;     //如果想保存到vuex里面首要思想是将orderData 放到vuex的state里面

    //   // echarts图表发起请求第十一步 得到数据再去渲染echarts表
    //   this.aa();
    // },

    // 首页的echarts图数据存放到vuex里面 第十步
    ...mapActions(["getTotaldata"]),

    aa() {
      var chartDom = document.getElementById("ww");
      var myChart = echarts.init(chartDom);
      var option = {
        title: {
          text: "Stacked Line",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["Email", "Union Ads", "Video Ads", "Direct", "Search Engine"],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          // echarts图表发起请求第六步
          //发请求修改x轴数据
          // data: this.xData,
          // 首页的echarts图数据存放到vuex里面 第九步
          data: this.echarts.xData,
        },
        yAxis: {
          type: "value",
        },

        series: [
          {
            name: "Email",
            type: "line",
            stack: "Total",
            // echarts图表发起请求第九步
            // data: this.orderData,
            // 首页的echarts图数据存放到vuex里面 第八步
            data: this.echarts.orderData,
          },
          {
            name: "Union Ads",
            type: "line",
            stack: "Total",
            data: this.echarts.orderData,
          },
          {
            name: "Video Ads",
            type: "line",
            stack: "Total",
            data: this.echarts.orderData,
          },
          {
            name: "Direct",
            type: "line",
            stack: "Total",
            data: this.echarts.orderData,
          },
          {
            name: "Search Engine",
            type: "line",
            stack: "Total",
            data: this.echarts.orderData,
          },
        ],
      };

      option && myChart.setOption(option);
    },
  },
};
</script>

<style lang="less" scoped>
// 有四个框的首页展示大盒子
.index {
  width: 1500px;
  background-color: rgb(239, 243, 246);
  margin: 20px 20px 20px 20px;
  .index-box {
    display: flex;
    // background-color: red;

    .aa {
      width: 200px;
    }
  }

  // 想用echarts图第四步
  #ww {
    width: 1500px;
    height: 700px;
    // background-color: pink;
    margin-top: 30px;
  }
}
</style>
