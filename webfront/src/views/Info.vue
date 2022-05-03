<template>
  <div class="info">
    <el-row>
      <el-col :span="12">
        <div id="customerChart1" style="height: 300px"></div>
      </el-col>
      <el-col :span="12">
        <div id="customerChart2" style="height: 300px"></div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div id="customerChart3" style="height: 300px"></div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { onMounted } from "vue";
import * as echarts from "echarts";
export default {
  name: "info",
  setup() {
    onMounted(() => {
      let date = new Date();
      const dateArr = [];
      const appData = [];
      const userData = [];
      const cityData = [];
      for (let i = 0; i < 30; i++) {
        dateArr.push("" + date.getMonth() + "-" + date.getDate());
        date.setDate(date.getDate() - 1);
        appData.push(Math.floor(10000 * Math.random()) + 500);
        userData.push(Math.floor(10000 * Math.random()) + 500);
        // cityData.push(ath.floor(20000 * Math.random()) + 500);
      }
      //需要获取到element,所以是onMounted的Hook
      let myChart1 = echarts.init(document.getElementById("customerChart1"));
      // 绘制图表
      myChart1.setOption({
        title: { text: "软件打开次数" },
        tooltip: {},
        xAxis: {
          data: dateArr,
        },
        yAxis: {},
        series: [
          {
            name: "用户量",
            type: "line",
            data: appData,
          },
        ],
      });
      let myChart2 = echarts.init(document.getElementById("customerChart2"));
      // 绘制图表
      myChart2.setOption({
        title: { text: "新用户注册数量" },
        tooltip: {},
        xAxis: {
          data: dateArr,
        },
        yAxis: {},
        series: [
          {
            name: "用户量",
            type: "line",
            data: userData,
          },
        ],
      });
      let myChart3 = echarts.init(document.getElementById("customerChart3"));
      // 绘制图表
      myChart3.setOption({
        title: { text: "用户城市分布" },
        xAxis: {
          type: "category",
          data: [
            "广州",
            "深圳",
            "上海",
            "杭州",
            "北京",
            "成都",
            "南京",
            "江苏",
          ],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [4420, 3400, 2150, 1080, 470, 110, 130, 120, 130, 34],
            type: "bar",
          },
        ],
      });
      window.onresize = function () {
        //自适应大小
        myChart.resize();
      };
    });
  },
};
</script>