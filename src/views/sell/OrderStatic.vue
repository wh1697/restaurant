<template>
  <div class="content">
    <!-- 上面的时间期限 -->
    <div class="time">
      <span>时间范围</span>
      <el-date-picker
        class="times"
        v-model="value1"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      >
      </el-date-picker>

      <!-- 按钮 -->
      <el-button type="primary" class="adds">查询</el-button>
    </div>

    <!-- 下面的echarts图 -->
    <!-- 想用echarts图第三步 -->
    <div id="ww"></div>
  </div>
</template>

<script>
// 想用echarts图第一步先在终端安装 npm install echarts 一个项目只需要安装一次就可以
// 想用echarts图第二步导入下面这个 import * as echarts from "echarts";
import * as echarts from "echarts";
export default {
  data() {
    return {
      //  时间范围
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
    };
  },


  // 想用echarts图第六步 页面一进入就显示
  mounted() {
    this.aa();
  },

  // 想用echarts图第五步
  methods: {
    aa() {
      var chartDom = document.getElementById("ww");
      var myChart = echarts.init(chartDom);
      // 柱状图
      var option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999",
            },
          },
        },
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        legend: {
          data: ["蒸发量", "降水量", "平均温度"],
        },
        xAxis: [
          {
            type: "category",
            data: [
              "1月",
              "2月",
              "3月",
              "4月",
              "5月",
              "6月",
              "7月",
              "8月",
              "9月",
              "10月",
              "11月",
              "12月",
            ],
            axisPointer: {
              type: "shadow",
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "水量",
            min: 0,
            max: 250,
            interval: 50,
            axisLabel: {
              formatter: "{value} ml",
            },
          },
          {
            type: "value",
            name: "温度",
            min: 0,
            max: 25,
            interval: 5,
            axisLabel: {
              formatter: "{value} °C",
            },
          },
        ],
        series: [
          {
            name: "蒸发量",
            type: "bar",
            tooltip: {
              valueFormatter: function (value) {
                return value + " ml";
              },
            },
            data: [
              2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4,
              3.3,
            ],
          },
          {
            name: "降水量",
            type: "bar",
            tooltip: {
              valueFormatter: function (value) {
                return value + " ml";
              },
            },
            data: [
              2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0,
              2.3,
            ],
          },
          {
            name: "平均温度",
            type: "line",
            yAxisIndex: 1,
            tooltip: {
              valueFormatter: function (value) {
                return value + " °C";
              },
            },
            data: [
              2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2,
            ],
          },
        ],
      };
      // myChart.setOption(option);
      // window.addEventListener("resize", function () {
      //   myChart.resize();
      // });
      option && myChart.setOption(option);
    },
  },
};
</script>

<style lang="less" scoped>
.content {
  width: 100%;
  height: 100%;
  //   background-color: red;
  overflow: hidden;
  .time {
    width: 1200px;
    height: 70px;
    // background-color: orange;
    margin: 10px 10px 10px 10px;

    .times {
      margin-top: 10px;
    }
  }

  // 想用echarts图第四步
  #ww {
    width: 1500px;
    height: 700px;
    // background-color: pink;
    margin-top: 30px;
    margin-left: 30px;
  }
}
</style>
