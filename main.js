// #ifndef VUE3
import Vue from 'vue'
import App from './App'

// 导入 store 的实例对象
import store from './store/store.js'

// uview
import uView from "uview-ui";
Vue.use(uView);
// fNavbar
import fNavbar from '@/components/f-navbar/f-navbar';
// 导入封装的http
import {
  $http
} from '@escook/request-miniprogram'

uni.$http = $http
// 配置请求根路径
// $http.baseUrl = 'http://localhost:8088/sct/api/meiye'
$http.baseUrl = 'https://www.shichengtai.xyz:8088/sct/api/meiye'
// $http.baseUrl = 'https://api-hmugo-web.itheima.net'

// 请求开始之前做一些事情
$http.beforeRequest = function(options) {
  uni.showLoading({
    title: '数据加载中...',
  })

  // 判断请求的是否为有权限的 API 接口
  if (options.url.indexOf('/my/') !== -1) {
    // 为请求头添加身份认证字段
    options.header = {
      // 字段的值可以直接从 vuex 中进行获取
      Authorization: store.state.m_user.token,
    }
  }
}

// 请求完成之后做一些事情
$http.afterRequest = function() {
  uni.hideLoading()
}
// 封装的展示消息提示的方法
uni.$showMsg = function(title = '数据加载失败！', duration = 1500) {
  uni.showToast({
    title,
    duration,
    icon: 'none',
  })
}


// 封装根据传入时间参数并格式化为  类似 2022-04-15 01:35：23
uni.$getDateTime = function(nowDate) {
  // var nowDate = new Date();
  var year = nowDate.getFullYear();
  var month = (nowDate.getMonth() + 1) < 10 ? "0" + (nowDate.getMonth() + 1) : (nowDate.getMonth() +
    1); //获取当前月份的日期，不足10补0
  var day = nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate.getDate(); //获取当前几号，不足10补0
  var hour = nowDate.getHours() < 10 ? "0" + nowDate.getHours() : nowDate.getHours(); //获取当前小时，不足10补0
  var minutes = nowDate.getMinutes() < 10 ? "0" + nowDate.getMinutes() : nowDate.getMinutes(); //获取当前分钟，不足10补0
  var second = nowDate.getSeconds() < 10 ? "0" + nowDate.getSeconds() : nowDate.getSeconds(); //获取当前秒，不足10补0
  var time = hour + ':' + minutes + ":" + second;
  var dateTime = year + '-' + month + '-' + day + ' ' + time;
  return dateTime;
}
// 封装根据传入时间参数并格式化为  类似 2022-04-15
uni.$getDateAndYear = function(nowDate) {
  // var nowDate = new Date();
  var year = nowDate.getFullYear();
  var month = (nowDate.getMonth() + 1) < 10 ? "0" + (nowDate.getMonth() + 1) : (nowDate.getMonth() +
    1); //获取当前月份的日期，不足10补0
  var day = nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate.getDate(); //获取当前几号，不足10补0
  var dateTime = year + '-' + month + '-' + day;
  return dateTime;
}



Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App,
  //  将 store 挂载到 Vue 实例上
  store,
})
app.$mount()
// #endif

// #ifdef VUE3
import {
  createSSRApp
} from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif
