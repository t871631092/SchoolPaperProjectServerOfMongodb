<template>
  <div class="info">
    <el-row>
      <el-col :span="12">
        <div class="echart" id="customerChart1" style="height: 300px"></div>
      </el-col>
      <el-col :span="12">
        <div class="echart" id="customerChart2" style="height: 300px"></div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="echart" id="customerChart3" style="height: 300px"></div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { onMounted } from "vue";
import * as echarts from "echarts";
export default {
  name: "info",
  data() {
    return {
      myChart1: "",
      myChart2: "",
      myChart3: "",
    };
  },
  mounted() {
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
    this.myChart1 = echarts.init(document.getElementById("customerChart1"));
    // 绘制图表
    this.myChart1.setOption({
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
    this.myChart2 = echarts.init(document.getElementById("customerChart2"));
    // 绘制图表
    this.myChart2.setOption({
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
    this.myChart3 = echarts.init(document.getElementById("customerChart3"));
    // 绘制图表
    this.myChart3.setOption({
      title: { text: "用户城市分布" },
      xAxis: {
        type: "category",
        data: ["广州", "深圳", "上海", "杭州", "北京", "成都", "南京", "江苏"],
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
    this.get("info/day30", (res) => {
      if (res.success) {
        const dates = [];
        const data = [];
        for (let i of res.data) {
          dates.push(i.str);
          data.push(i.data);
        }
        this.myChart2.setOption({
          title: { text: "新用户注册数量" },
          tooltip: {},
          xAxis: {
            data: dates,
          },
          yAxis: {},
          series: [
            {
              name: "用户量",
              type: "line",
              data: data,
            },
          ],
        });
      }
    });
    this.get("info/day30Open", (res) => {
      if (res.success) {
        const dates = [];
        const data = [];
        for (let i of res.data) {
          dates.push(i.addDate.substring(5, 11));
          data.push(i.time);
        }
        this.myChart1.setOption({
          title: { text: "软件打开次数" },
          tooltip: {},
          xAxis: {
            data: dates,
          },
          yAxis: {},
          series: [
            {
              name: "用户量",
              type: "line",
              data: data,
            },
          ],
        });
      }
    });
    this.get("info/gps", (res) => {
      if (res.success) {
        const dates = [];
        const data = [];
        for (let i of Object.keys(res.data)) {
          if(i!='null'){
          dates.push(i);
          data.push(res.data[i]);
          }
        }
        this.myChart3.setOption({
          title: { text: "用户城市分布" },
          xAxis: {
            type: "category",
            data: dates,
          },
          yAxis: {
            type: "value",
          },
          series: [
            {
              data: data,
              type: "bar",
            },
          ],
        });
      }
    });
    window.onresize = function () {
      //自适应大小
      myChart1.resize();
      myChart2.resize();
      myChart3.resize();
    };
  },
  beforeDestory() {
    window.onresize = null;
  },
};
</script>
<style scoped>
.echart {
  margin: 25px;
  padding: 25px;
  margin-top: 0;
  border-radius: 25px;
  box-shadow: 0 0 5px 1px lightgray;
}
</style>