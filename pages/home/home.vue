<template>
  <view>
    <!-- 顶部导航 -->
    <view>
      <f-navbar title="智慧美业" fontSize="35" fontColor="#fff"
        gradient="linear-gradient(90deg,rgb(255, 0, 0),rgb(170, 0, 255))"></f-navbar>
        <!-- gradient="linear-gradient(45deg,rgb(28,187,180),rgb(141,198, 63))" -->
    </view>
    <!-- 使用自定义的搜索组件 -->
    <view class="search-box">
      <my-search gradient="linear-gradient(90deg,rgb(255, 0, 0),rgb(170, 0, 255))" @click="gotoSearch"></my-search>
    </view>
    <!-- 轮播图区域 -->
    <view>
      <swiper :indicator-dots="true" :autoplay="true" :duration="1000" :circular="true">
        <!-- 循环渲染轮播图的 item 项 -->
        <swiper-item v-for="(item,i) in swiperList" :key="i">
          <!-- <navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id"> -->
            <!-- 动态绑定图片的 src 属性 -->
            <image :src="item.imageSrc"></image>
          <!-- </navigator> -->
        </swiper-item>
      </swiper>
    </view> <!-- 轮播图 -->
    <!-- 滚动通知 -->
    <view v-if="notice.isShow===1">
      <u-notice-bar :text="notice.content"></u-notice-bar>
    </view>
    <!-- 宫格导航 -->
    <view>
      <u-grid :border="false" col="4">
        <u-grid-item v-for="(item,index) in gridlist" :key="index" @click="click(item)">
          <!-- <u-icon :customStyle="{paddingTop:20+'rpx'}" :name="listItem.name" :size="22"></u-icon> -->
          <!-- <u-image :src="listItem.src" :lazy-load="true"  width="80px" height="80px"></u-image> -->
          <u-icon :customStyle="{paddingTop:20+'rpx'}" :name="item.icon" :size="22"></u-icon>
          <text class="grid-text">{{item.name}}</text>
        </u-grid-item>
      </u-grid>
      <!-- <u-toast ref="uToast" /> -->
    </view>
    <!-- 限时秒杀 -->
    <view v-if="limitKillEnable==1">
      <my-xsms :qgGoodsList=limitKillGoodsList :time="limitTime"></my-xsms>
    </view>

    <!-- 服务项目栏 -->
    <view>
      <!-- 分割线 -->
      <u-divider text="服务项目" textColor="#ffaaff" lineColor="#ffaaff" dashed="true"></u-divider>
      <!-- u-tabs 横条滚动分类-->
      <view>
        <view class="u-tab b-s-2 shadow b-a-r-10 mx-10" style="background-color: #fafafa;">
          <u-tabs :current="tabsCurrent" @change="change" :list="tabslist" lineWidth="30" lineColor="#ffaaff"
            :activeStyle="{
            						color: '#303133',
            						fontWeight: 'bold',
            						transform: 'scale(1.05)'
            					}" :inactiveStyle="{
            						color: '#606266',
            						transform: 'scale(1)'
            					}" itemStyle="padding-left: 15px; padding-right: 15px; height: 34px;">
          </u-tabs>
        </view>
        <swiper :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish" style="height: 1200rpx;">
          <!-- :style="{height: servicelist[swiperCurrent].length*350 + 'rpx'}"> -->
          <swiper-item class="swiper-item" v-for="(cate, cateIndex) in tabslist" :key="cateIndex">
            <!-- <text>{{item.name}}</text> -->
            <scroll-view scroll-y style="height:100%;width: 100%;" @scrolltolower="onreachBottom">
              <!-- 商品列表 -->
              <view class="px-20 u-m-t-30 d-flex j-sb flex-wrap " style="margin-bottom: 30rpx;">
                <block v-for="(service,index) in servicelist[swiperCurrent].records" :key="index">
                  <my-goods-y :goods="service"></my-goods-y>
                </block>
              </view>
            </scroll-view>
          </swiper-item>
        </swiper>
      </view>
      <!-- 横向滚动 -->
      <view>
        <!-- <my-scroll-list :scrollRigntList="scrollRigntList" @right="right" @left="left"></my-scroll-list> -->
      </view>

    </view><!-- 服务项目栏end -->



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
        // 总数量，用来实现分页
        currentTotal: 0,
        // 1. 轮播图的数据列表，默认为空数组
        swiperList: [],
        notice: {},
        gridlist: [],
        tabslist: [],
        //   {
        //   name: '玻尿酸',
        //   badge: {
        //     isDot: true
        //   }
        // }, 
        
        // 因为内部的滑动机制限制，请将tabs组件和swiper组件的current用不同变量赋值
        tabsCurrent: 0, // tabs组件的current值，表示当前活动的tab选项
        swiperCurrent: 0, // swiper组件的current值，表示当前那个swiper-item是活动的
        servicelist: [],//服务项目列表 的列表   [[服务项目,服务项目,],[],[]]
        limitTime: 0,//限时秒杀  倒计时 单位毫秒
        limitKillEnable:1,//限时秒杀  是否可用  0：不可用， 1：可用
        limitKillGoodsList: [],//限时秒杀  产品列表




      };
    },
    onLoad() {
      // 2. 在小程序页面刚加载的时候，调用获取轮播图数据的方法
      this.getSwiperList();
      // 获取滚动通知信息
      this.getNotice();
      //获取秒杀数据
      this.getLimitKill();
      // 获取九宫格列表数据
      this.getGridList();
      // 获取tabslist
      this.getTabsList();
      //获取servicelist  服务项目列表  列表    [[服务项目,服务项目,],[],[]]
      this.getServiceListListByCate();
    },
    methods: {
      gotoSearch() {
        uni.navigateTo({
          url: '/subpkg/Search/Search'
        })
      },
      // 3. 获取轮播图数据的方法
      async getSwiperList(cb) {
        // ** 打开节流阀
        this.isloading = true
        // 3.1 发起请求
        const { data: res } = await uni.$http.get('/swiper/getswiper')
        // ** 关闭节流阀
        this.isloading = false
        // 只要数据请求完毕，就立即按需调用 cb 回调函数,cb() 是关闭下拉刷新的
        cb && cb()
        // 3.2 请求失败
        if (res.status !== 200) return uni.$showMsg()
        // 3.3 请求成功，为 data 中的数据赋值
        this.swiperList = res.data
      },
      // 获取滚动通知信息
      async getNotice(cb) {
        // ** 打开节流阀
        this.isloading = true
        // 3.1 发起请求
        const { data: res } = await uni.$http.get('/notice/getnotice')
        // ** 关闭节流阀
        this.isloading = false
        // 只要数据请求完毕，就立即按需调用 cb 回调函数,cb() 是关闭下拉刷新的
        cb && cb()
        // 3.2 请求失败
        if (res.status !== 200) return uni.$showMsg()
        // 3.3 请求成功，为 data 中的数据赋值
        this.notice = res.data
      },
      //获取qgGoodsList  和time  限时抢购  列表    
      async getLimitKill(cb) {
        // ** 打开节流阀
        this.isloading = true
        // 3.1 发起请求
        const { data: res } = await uni.$http.get('/limit_kill/getLimitKill')
        // ** 关闭节流阀
        this.isloading = false
        // 只要数据请求完毕，就立即按需调用 cb 回调函数,cb() 是关闭下拉刷新的
        cb && cb()
        // 3.2 请求失败
        if (res.status !== 200) return uni.$showMsg()
        // 3.3 请求成功，为 data 中的数据赋值
        console.log("==========================>>>>>>>>>>>>");
        console.log(res);
        this.limitTime=res.data.limitKill.limitTime*1000;
        this.limitKillEnable=res.data.limitKill.enable;
        this.limitKillGoodsList=res.data.list;
      },
      // 获取九宫格列表数据
      async getGridList(cb) {
        // ** 打开节流阀
        this.isloading = true
        // 3.1 发起请求
        const { data: res } = await uni.$http.get('/grid_cate/getgrid_catelist')
        // ** 关闭节流阀
        this.isloading = false
        // 只要数据请求完毕，就立即按需调用 cb 回调函数,cb() 是关闭下拉刷新的
        cb && cb()
        // 3.2 请求失败
        if (res.status !== 200) return uni.$showMsg()
        // 3.3 请求成功，为 data 中的数据赋值
        this.gridlist = res.data
      },
      // 获取tabslist
      async getTabsList(cb) {
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
        this.tabslist = res.data
      },
      //获取servicelist  服务项目列表  列表    [[服务项目,服务项目,],[],[]]
      async getServiceListListByCate(cb) {
        // ** 打开节流阀
        this.isloading = true
        // 3.1 发起请求
        const { data: res } = await uni.$http.get('/service_item/getservicelistlistbycate')
        // ** 关闭节流阀
        this.isloading = false
        // 只要数据请求完毕，就立即按需调用 cb 回调函数,cb() 是关闭下拉刷新的
        cb && cb()
        // 3.2 请求失败
        if (res.status !== 200) return uni.$showMsg()
        // 3.3 请求成功，为 data 中的数据赋值
        console.log("==========================>>>>>>>>>>>>");
        console.log(res);
        this.servicelist = res.data;
        this.currentTotal = this.servicelist[this.swiperCurrent].total;
      },
      //获取分页  服务项目数据
      async getPageServiceListByCate() {
        // ** 打开节流阀
        this.isloading = true
        // console.log(this.tabslist[this.tabsCurrent].id)
        this.queryObj.cateId=this.tabslist[this.tabsCurrent].id;
        // 发起请求
        const {data: res} = await uni.$http.get('/service_item/getpageservicelist', this.queryObj)
        if (res.status !== 200) return uni.$showMsg()
        console.log(res.data)
        // 为数据赋值：通过展开运算符的形式，进行新旧数据的拼接
        this.servicelist[this.swiperCurrent].records = [...this.servicelist[this.swiperCurrent].records, ...res.data.records];
        this.servicelist[this.swiperCurrent].pageCurrent = res.data.current;
        setTimeout(()=>{
          // ** 关闭节流阀
          this.isloading = false
        },1000)
      },
      // 下拉刷新的事件
      onPullDownRefresh() {
        // 1. 重置关键数据
        this.isloading = false
        this.notice = {};
        this.swiperList = [];
        this.gridlist = [];
        this.tabslist= [];
        this.servicelist = [];
        // 2. 重新发起请求   传参（关闭下拉刷新，因为默认不关闭）
        this.getNotice(() => uni.stopPullDownRefresh())
        this.getSwiperList(() => uni.stopPullDownRefresh())
        this.getGridList(() => uni.stopPullDownRefresh())
        this.getTabsList(() => uni.stopPullDownRefresh())
        this.getServiceListListByCate(() => uni.stopPullDownRefresh())
      },
      // 九宫格单击按钮
      click(item) {
        // 目前前是跳转到商品分类页面
        if(item.openType == 'navigate'){
          uni.navigateTo({
            url: item.navigatorUrl
          })
        }else if(item.openType == 'switchTab'){
          uni.switchTab({
            url: item.navigatorUrl
          })
        }else{
          uni.navigateTo({
            url: '/subpkg/cate/cate'
          })
        }
        // 后续应该改为跳转到预约页面
        console.log(name)
        // this.$refs.uToast.success(`点击了${name}`)
      },
      change(e) {
        this.tabsCurrent = e.index;
        this.swiperCurrent = e.index;
        this.currentTotal=this.servicelist[this.swiperCurrent].total;
        this.queryObj.pageCurrent=this.servicelist[this.swiperCurrent].pageCurrent;
        this.queryObj.pageSize=this.servicelist[this.swiperCurrent].pageSize;
      },
      transition(e) {},
      animationfinish(e) {
        this.swiperCurrent = e.detail.current;
        this.tabsCurrent = e.detail.current;
        this.currentTotal=this.servicelist[this.swiperCurrent].total;
        this.queryObj.pageCurrent=this.servicelist[this.swiperCurrent].pageCurrent;
        this.queryObj.pageSize=this.servicelist[this.swiperCurrent].pageSize;
      },
      // scroll-view到底部加载更多
      onreachBottom() {
        console.log("上拉触底")
        // 判断是否正在请求其它数据，如果是，则不发起额外的请求
        if (this.isloading) return uni.$showMsg("正在加载下一页")
        // 判断是否还有下一页数据     公式：当前的页码值 * 每页显示多少条数据 >= 总数条数
        if (this.queryObj.pageCurrent * this.queryObj.pageSize >= this.currentTotal) return uni.$showMsg('数据加载完毕！')
        // 让页码值自增 +1
        this.queryObj.pageCurrent += 1
        // 重新获取列表数据
        this.getPageServiceListByCate();
      },
      left() {
        console.log('left');
      },
      right() {
        console.log('right');
      },
      onChange(e) {
        this.timeData = e
      }

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

  // 设置定位效果为“吸顶”
  .search-box {
    position: sticky;
    // 吸顶的“位置”
    top: 64px;
    // 提高层级，防止被轮播图覆盖
    z-index: 99999999999;
  }

  swiper {
    height: 330rpx;

    .swiper-item,
    image {
      width: 100%;
      height: 100%;
    }
  }

  .grid-text {
    font-size: 14px;
    color: #909399;
    padding: 10rpx 0 20rpx 0rpx;
    /* #ifndef APP-PLUS */
    box-sizing: border-box;
    /* #endif */
  }

  .u-tab {
    position: sticky;
    // // 吸顶的“位置”
    top: 115px;
    // // 提高层级，防止被轮播图覆盖
    z-index: 99999999999;
  }

  // 倒计时
  .time {
    @include flex;
    align-items: center;

    &__custom {
      margin-top: 4px;
      width: 22px;
      height: 22px;
      background-color: #FFFFFF;
      border-radius: 4px;
      /* #ifndef APP-NVUE */
      display: flex;
      /* #endif */
      justify-content: center;
      align-items: center;

      &__item {
        color: #f14553;
        font-size: 12px;
        text-align: center;
      }
    }

    &__doc {
      color: #FFFFFF;
      padding: 0px 4px;
    }

    &__item {
      color: #606266;
      font-size: 15px;
      margin-right: 4px;
    }
  }

  // 限时抢购查看更多
  .qgshow-more {
    background-color: #fff0f0;
    border-radius: 3px;
    padding: 3px 6px;
    @include flex(column);
    align-items: center;
    width: 50rpx;
    height: 235rpx;
    margin-top: 15rpx;
    margin-left: 30rpx;
    margin-right: 5rpx;
    margin-bottom: 15rpx;
    padding-top: 50rpx;

    .text {
      font-size: 12px;
      width: 12px;
      color: #f56c6c;
      line-height: 16px;
    }
  }
</style>
