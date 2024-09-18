<template>
  <view>
    <!-- 顶部导航 -->
    <view>
      <f-navbar title="智慧美业" fontSize="35" fontColor="#fff"
        gradient="linear-gradient(90deg,rgb(255, 0, 0),rgb(170, 0, 255))"></f-navbar>
    </view>
    <!-- 选择： 日期 + 服务分类 -->
    <view class="shadow xd" style="height: 220rpx;background-color: #fefefe;">
      <!-- tabs标签页 -->
      <view>
        <my-tabs :current="dateListCurrent" @change="dateListTabschange" :list="getDateList" :activeStyle="{
      				color: '#ffffff',
      				transform: 'scale(1.05)',
              background:'#ff007f'
      			}" :inactiveStyle="{
      				color: '#606266',
      				transform: 'scale(1)',
              background:'#ffffff'
      			}">
          <view class="d-flex flex-wrap a-c-center" slot="right"
            style="z-index: 0;box-shadow: -10rpx 0 10rpx #999999;width: 80rpx;background-color: #ffffff;padding-left: 25rpx;"
            @tap="$u.toast('插槽被点击')">
            <u-icon class="" name="calendar" size="25" color="#999999" bold></u-icon>
            <text class="" style="color: #999999;font-size: 32rpx;margin-top: -10rpx;">选择</text>
          </view>
        </my-tabs>
      </view>
      <!-- 分类选择 -->
      <view>
        <my-tabs :current="cateListCurrent" @change="cateListTabschange" :list="cateList" :activeStyle="{
        			color: '#f47aac',
        			transform: 'scale(1.05)',
              background:'#f9eaf0'
        		}" :inactiveStyle="{
        			color: '#777777',
        			transform: 'scale(1)',
              background:'#f7f7f7'
        		}">
        </my-tabs>
      </view>
    </view>
    <!-- 服务列表 -->
    <!-- <view> -->
      <scroll-view scroll-y style="height: 850rpx;" :style="{height: wh + 'px'}" @scrolltolower="onreachBottom">
        <view  style="margin-bottom: 30rpx;">
          <block v-for="(item, index) in orderGoodsList" :key="index">
            <my-order-x :order="item"></my-order-x>
          </block>
        </view>
      </scroll-view>
    <!-- </view> -->




  </view>
</template>

<script>
  // 导入自己封装的 mixin 模块(用于设置tabBar购物车的徽标)
  import badgeMix from '@/mixins/tabbar-badge.js'
  
  export default {
    // 将 badgeMix 混入到当前的页面中进行使用
    mixins: [badgeMix],
    data() {
      return {
        // 请求参数对象
        queryObj: {
          // 查询关键词
          keyName: '',
          // 商品分类Id
          cateId: '',
          // 页码值
          pageCurrent: 1,
          // 每页显示多少条数据
          pageSize: 10
        },
        // 窗口的可用高度 = 屏幕高度 - navigationBar高度 - tabBar 高度
        wh: 0,
        pageTotal: 0,
        dateList: [],
        cateList: [],
        dateListCurrent: 0, // tabs组件的current值，表示当前活动的 日期  tab选项
        cateListCurrent: 0, // tabs组件的current值，表示当前活动的 类别  tab选项
        orderGoodsList:[],
      };
    },
    computed: {
      getDateList() {
        var nowDate = new Date();
        var weeks = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
        this.dateList[0] = {};
        var date = (nowDate.getMonth() + 1) < 10 ? "0" + (nowDate.getMonth() + 1) : (nowDate.getMonth() +
          1); //获取当前月份的日期，不足10补0
        var day = nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate.getDate(); //获取当前几号，不足10补0 
        this.dateList[0].date = date + '.' + day;
        var week = weeks[nowDate.getDay()];
        this.dateList[0].week = week;
        this.dateList[0].dateAndYear=uni.$getDateAndYear(nowDate);
        for (var i = 1; i < 9; i++) {
          this.dateList[i] = {};
          nowDate.setDate(nowDate.getDate() + 1);
          date = (nowDate.getMonth() + 1) < 10 ? "0" + (nowDate.getMonth() + 1) : (nowDate.getMonth() +
            1); //获取当前月份的日期，不足10补0
          day = nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate.getDate(); //获取当前几号，不足10补0 
          this.dateList[i].date = date + '.' + day;
          week = weeks[nowDate.getDay()];
          this.dateList[i].week = week;
          this.dateList[i].dateAndYear=uni.$getDateAndYear(nowDate);
        }
        return this.dateList;
      }
    },
    onLoad(){
      // 获取当前系统的信息
      const sysInfo = uni.getSystemInfoSync()
      // 为 wh 窗口可用高度动态赋值   可用高度 = 屏幕高度 - navigationBar高度 - tabBar高度 - 自定义的search组件高度
      this.wh = sysInfo.windowHeight - 114
      // 获取tabslist
      this.getCateList();
      // this.getOrderGoodsList();
    },
    methods: {
      // 获取cateList
      async getCateList(cb) {
        // ** 打开节流阀
        this.isloading = true
        // 3.1 发起请求
        const { data: res } = await uni.$http.get('/service_item_cate/getservicecatelist')
        // ** 关闭节流阀
        this.isloading = false
        // 只要数据请求完毕，就立即按需调用 cb 回调函数,cb() 是关闭下拉刷新的
        cb && cb()
        // 3.2 请求失败
        if (res.status !== 200) return uni.$showMsg()
        // 3.3 请求成功，为 data 中的数据赋值
        this.cateList = res.data
        this.getOrderGoodsList();//获取orderGoodsList
      },
      // 获取orderGoodsList
      async getOrderGoodsList(cb) {
        // ** 打开节流阀
        this.isloading = true
        // console.log(this.tabslist[this.cateListCurrent].id)
        this.queryObj.cateId=this.cateList[this.cateListCurrent].id;
        // 发起请求
        const {data: res} = await uni.$http.get('/service_item/getpageservicelist', this.queryObj)
        if (res.status !== 200) return uni.$showMsg()
        console.log(res.data)
        // 为数据赋值：通过展开运算符的形式，进行新旧数据的拼接
        this.orderGoodsList = [...this.orderGoodsList, ...res.data.records];
        this.pageTotal = res.data.total;
        setTimeout(()=>{
          // ** 关闭节流阀
          this.isloading = false
        },1000)
      },
      // 下拉刷新的事件
      onPullDownRefresh() {
        // 1. 重置关键数据
        this.isloading = false
        this.cateList= [];
        this.orderGoodsList = [];
        // 2. 重新发起请求   传参（关闭下拉刷新，因为默认不关闭）
        this.getCateList(() => uni.stopPullDownRefresh())
        setTimeout(()=>{
          this.getOrderGoodsList(() => uni.stopPullDownRefresh())
        },1000)
        
      },
      // scroll-view到底部加载更多
      onreachBottom() {
        console.log("上拉触底")
        // 判断是否正在请求其它数据，如果是，则不发起额外的请求
        if (this.isloading) return uni.$showMsg("正在加载下一页")
        // 判断是否还有下一页数据     公式：当前的页码值 * 每页显示多少条数据 >= 总数条数
        if (this.queryObj.pageCurrent * this.queryObj.pageSize >= this.pageTotal) return uni.$showMsg('数据加载完毕！')
        // 让页码值自增 +1
        this.queryObj.pageCurrent += 1
        // 重新获取列表数据
        this.getOrderGoodsList();
      },
      //类别选择  改变事件
      cateListTabschange(e) {
        this.cateListCurrent = e.index;
        this.orderGoodsList = [];//清空预约服务项目
        this.queryObj.pageCurrent=1;//设为第一页
        this.getOrderGoodsList();//获取orderGoodsList
      },
      //日期选择  改变事件
      dateListTabschange(e){
        this.dateListCurrent = e.index;
      },
    },

  }
</script>

<style lang="scss">
  .actName {
    max-width: 100rpx;
    font-size: 28rpx;
    color: #fff;
    padding-left: 5rpx;
    float: right;
  }
  .xd{
    position: sticky;
    // 吸顶的“位置”
    top: 64px;
    // 提高层级，防止被轮播图覆盖
    z-index: 99999999999;
  }
</style>
