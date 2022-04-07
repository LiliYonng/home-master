import { watchEffect, ref } from 'vue'
import * as echarts from 'echarts'
//不是组件，而是函数，调用时才画表格。那么返回呢，返回什么？返回函数调用的接口,传入的是option和引用的dom
export function useEchart(option, chart) {
  let myChart = null
  let chartOption = null
  //有坐标的图表
  const axisChart = ref({
    title: {
      text: ''
    },
    legend: {
      // 图例文字颜色
      textStyle: {
        color: '#333'
      }
    },
    grid: {
      left: '20%'
    },
    // 提示框
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category', // 类目轴
      data: [], //需要初始化的x坐标数据
      axisLine: {
        lineStyle: {
          color: '#17b3a3'
        }
      },
      axisLabel: {
        interval: 0,
        color: '#333'
      }
    },
    yAxis: [
      {
        type: 'value',
        axisLine: {
          lineStyle: {
            color: '#17b3a3'
          }
        }
      }
    ],
    color: ['#2ec7c9', '#b6a2de', '#5ab1ef', '#ffb980', '#d87a80', '#8d98b3'],
    series: [] //需要初始化的数据
  })
  //无坐标图表
  const normalChart = ref({
    title: {
      text: ''
    },
    tooltip: {
      trigger: 'item'
    },
    color: [
      '#0f78f4',
      '#dd536b',
      '#9462e5',
      '#a6a6a6',
      '#e1bb22',
      '#39c362',
      '#3ed1cf'
    ],
    series: []
  })
  const initChart = () => {
    //判断传入的是哪种表格
    if ('xData' in option) {
      axisChart.value.title.text = option.title
      axisChart.value.xAxis.data = option.xData
      axisChart.value.series = option.series
      chartOption = axisChart.value
    } else {
      normalChart.value.title.text = option.title
      normalChart.value.series = option.series
      chartOption = normalChart.value
    }
  }
  const setChart = () => {
    initChart()
    if (myChart) {
      myChart.setOption(chartOption)
    } else {
      myChart = echarts.init(chart)
      myChart.setOption(chartOption)
    }
  }
  watchEffect(setChart)
}
