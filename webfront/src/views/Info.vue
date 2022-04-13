<template>
  <div class="info">
    <el-row>
      <el-col :span="12">
        <div id="customerChart1" style="height:300px"></div>
      </el-col>
      <el-col :span="12">
        <div id="customerChart2" style="height:300px"></div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24"></el-col>
    </el-row>
  </div>
</template>
<script>
import { onMounted } from "vue";
import * as echarts from "echarts";
export default {
  name:'info',
  setup() {
    onMounted(() => {
      //需要获取到element,所以是onMounted的Hook
      let myChart1 = echarts.init(document.getElementById("customerChart1"));
      // 绘制图表
      myChart1.setOption({
        title: { text: "总用户量" },
        tooltip: {},
        xAxis: {
          data: ["12-3", "12-4", "12-5", "12-6", "12-7", "12-8"],
        },
        yAxis: {},
        series: [
          {
            name: "用户量",
            type: "line",
            data: [5, 20, 36, 10, 10, 20],
          },
        ],
      });
      let myChart2 = echarts.init(document.getElementById("customerChart2"));
      // 绘制图表
      myChart2.setOption({
        title: { text: "总用户量" },
        tooltip: {},
        xAxis: {
          data: ["12-3", "12-4", "12-5", "12-6", "12-7", "12-8"],
        },
        yAxis: {},
        series: [
          {
            name: "用户量",
            type: "line",
            data: [5, 20, 36, 10, 10, 20],
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