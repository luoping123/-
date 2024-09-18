<template>
  <view>
    <!-- 顶部导航 -->
    <view>
      <f-navbar title="智慧美业" fontSize="35" fontColor="#fff"
        gradient="linear-gradient(90deg,rgb(255, 0, 0),rgb(170, 0, 255))"></f-navbar>
    </view>
    <!--选项卡： 预约到店 or 预约上门 -->
    <view>
      <u-subsection :list="xuanXiangList" mode="subsection" :current="subCurrent" activeColor="#ff007f"
        @change="xuanXiangChange">
      </u-subsection>
    </view>
    <view>
      <!-- 上门   地址  subCurrent===1 才显示 -->
      <view v-if="subCurrent===1">
        <!-- 使用自定义的 address 组件 -->
        <my-address></my-address>
      </view>
      <!-- 查看详情box -->
      <view class="shadow d-flex j-start" style="width: 750rpx;height: 240rpx;">
        <!-- 图片 -->
        <view class=""
          style="margin-top: 15rpx;margin-left: 20rpx;border-radius: 15rpx;height: 210rpx;width: 230rpx;">
          <image style="border-radius: 15rpx;height: 210rpx;width: 230rpx;" :src="order_good.imageSrc"></image>
        </view>
        <!-- 右侧盒子 -->
        <view class="d-flex j-start"
          style="border-radius: 15rpx;width: 480rpx;height: 210rpx;margin-top: 15rpx;margin-left: 20rpx;">
          <!-- title -->
          <view class="u-line-1 "
            style="width: 260rpx;height: 45rpx;margin-top: 10rpx;margin-left: 10rpx;font-size: 36rpx;font-weight: bold;">
            {{order_good.name}}
          </view>
          <!-- 查看详情 -->
          <view @click="toDetail()" class="shadow"
            style="background-color: #f2f2f2;margin-left: 60rpx;margin-top: 10rpx;text-align: end;width: 155rpx;height: 45rpx;font-size: 28rpx;color: #777777;border-radius: 22rpx 0 0 22rpx;">
            查看详情 ></view>
          <!-- 价格 -->
          <view
            style="margin-top: 150rpx;margin-left: -468rpx;width:160rpx ;height: 50rpx;color:#ff007f ;font-weight: bold;">
            ￥{{order_good.nowPrice}}</view>
        </view>
      </view>
      <!-- 选择 服务时间 -->
      <view class="shadow" :style="[{height: 285+60*getHeight+'rpx'}]" style="width: 750rpx;margin-top: 25rpx;">
        <!-- title -->
        <view class="d-flex j-start" style="width: 750rpx;height: 60rpx;">
          <!-- 红竖条 -->
          <view
            style="margin-top: 23rpx;margin-left: 20rpx;background-color: #ff007f;width: 10rpx;height: 35rpx;border-radius: 5rpx;">
          </view>
          <view style="margin-top: 15rpx;margin-left: 10rpx;font-size: 35rpx;">服务时间</view>
          <view style="color: #cccccc;font-size: 32rpx;margin-top: 18rpx;">（必选）</view>
        </view>
        <!-- 日期选择   -->
        <view>
          <my-tabs :current="dateTabsCurrent" @change="dateTabsChange" :list="getDateList" :activeStyle="{
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
        <!-- 时间选择  :style="[{height: 100+60*getHeight+'rpx'}]"  -->
        <view class=""  style="margin-top: 5rpx;width: 750rpx;display: flex;flex-wrap: wrap;">
          <!-- 时间 item项 -->
          <view @click="timeClick(index)" :class="[index===timeChecked ? 'time-checked' :'time-unchecked']"
            class="shadow"
            style=" float: left;width: 150rpx;height: 58rpx;margin-left: 25rpx; margin-right: 10rpx;margin-top: 30rpx;text-align: center;padding-top: 5rpx;"
            v-if="timeList.length!==0" v-for="(item,index) in getTimeList " :key="index">{{item}}</view>
          <view class="shadow" v-if="timeList.length===0"
            style="float: left;width: 150rpx;height: 58rpx;margin-left: 25rpx;margin-right: 10rpx;margin-top: 30rpx;text-align: center;padding-top: 5rpx;color: #a6a6a6;">
            已约满</view>

        </view>
      </view>
      <!-- 选择美容师 -->
      <view class="shadow" style="width: 750rpx;height: 450rpx;margin-top: 35rpx;">
        <!-- title -->
        <view class="d-flex j-start" style="width: 750rpx;height: 60rpx;">
          <!-- 红竖条 -->
          <view
            style="margin-top: 23rpx;margin-left: 20rpx;background-color: #ff007f;width: 10rpx;height: 35rpx;border-radius: 5rpx;">
          </view>
          <view style="margin-top: 15rpx;margin-left: 10rpx;font-size: 35rpx;">美容师</view>
        </view>
        <!-- 美容师列表 -->
        <view style="width: 750rpx;height:370rpx ;margin-top: 0rpx;">
          <u-scroll-list :indicator="false">
            <!-- 循环美容师列表 -->
            <view v-for="(item, index) in mrsList" :key="index">
              <my-mrs-y @click="mrsClick(index)" :index=index :mrsChecked=mrsChecked :mrs="item"></my-mrs-y>
            </view>
            <view v-if="mrsList.length ==0">
              <image src="http://cn.shichengtai.xyz/icon/noOrder.png" style="width: 650rpx;height: 300rpx;margin-left: 30rpx;"></image>
            </view>
            <!-- 右侧占位符 -->
            <view style="width: 15rpx;height: 260rpx; color:#FFFFFF ;">1</view>
          </u-scroll-list>
        </view>
      </view>
    </view>
    
    
    <!-- 确认预约按钮 -->
    <view @click="orderSubmit" class="shadow"
      style="position: relative;top: 15rpx;left: 510rpx;padding-top: 5rpx;margin-bottom: 15rpx;width: 220rpx;height: 60rpx;background-color: #ff007f;color: #FFFFFF;text-align: center;border-radius: 30rpx;">
      确认预约</view>

  </view>
</template>

<script>
  // 按需导入mapState, mapMutations, mapGetters 辅助函数
  import {
    mapState,
    mapMutations,
    mapGetters
  } from 'vuex'

  export default {
    data() {
      return {
        dateList: [],//选择日期列表
        timeList: [],//选择时间列表
        mrsList: [],//美容师列表
        order_good: {},//预约服务项目
        subCurrent: 0, //上门or到店
        dateTabsCurrent: 0, //日期选择
        timeChecked: 0, //时间选中index
        mrsChecked: 0, //美容师选中index
        xuanXiangList: ['预约到店', '预约上门'],

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
      },
      getTimeList() {
        var nowDate = new Date();
        if (this.dateTabsCurrent !== 0) {
          this.timeList = ["8:00", "9:00", "10:00", "11:00",
            "12:00", "13:00", "14:00", "15:00",
            "16:00", "17:00", "18:00", "19:00",
            "20:00", "21:00"
          ];
          return this.timeList;
        }
        this.timeList=[];
        var list = ["已约满", "已约满", "已约满", "已约满",
          "已约满", "已约满", "已约满", "已约满",
          "8:00", "9:00", "10:00", "11:00",
          "12:00", "13:00", "14:00", "15:00",
          "16:00", "17:00", "18:00", "19:00",
          "20:00", "21:00"
        ];
        var now_hour = nowDate.getHours();
        var begin = 0; //选择时间范围  开始时间0-23
        var end = 0; //选择时间范围  结束时间0-23
        if (now_hour < 8) {
          begin = 8;
          end = 21;
        } else if (now_hour < 21) {
          begin = now_hour + 1;
          end = 21;
        } else {
          begin = 0;
          end = 0;
        }
        if (begin === 0 && end === 0) {
          this.timeList = [];
          return this.timeList
        }
        var j = 0;
        for (var i = begin; i <= end; i++, j++) {
          this.timeList[j] = list[i];
        }
        return this.timeList;
      },
      getHeight() {
        if (this.dateTabsCurrent !== 0) {
          return 4.5;
        }
        if (this.timeList.length <= 4) {
          return 0;
        } else if (this.timeList.length <= 8) {
          return 2;
        } else if (this.timeList.length <= 12) {
          return 3;
        } else if (this.timeList.length <= 16) {
          return 4.5;
        } else if (this.timeList.length <= 20) {
          return 6;
        } else if (this.timeList.length <= 24) {
          return 7.5;
        } else if (this.timeList.length <= 28) {
          return 9;
        } else {
          return 0;
        }
      }
    },
    onLoad(options) {
      // 获取预约商品 Id
      const id = options.order_good_id;
      // 调用请求商品详情数据的方法
      this.getOrderGoods(id);
      // 获取美容师数据列表
      this.getMrsList();
    },
    methods: {
      // 获取预约服务的信息
      async getOrderGoods(id) {
        // ** 打开节流阀
        this.isloading = true
        // 3.1 发起请求
        const { data: res } = await uni.$http.post('/service_item/getServiceItemById',id)
        // 3.2 请求失败
        if (res.status !== 200) return uni.$showMsg()
        // 3.3 请求成功，为 data 中的数据赋值
        this.order_good = res.data
        // ** 关闭节流阀
        this.isloading = false
        // const {data: res} = await uni.$http.get('/api/public/v1/goods/detail', {goods_id})
      },
      // 3. 获取美容师数据列表的方法
      async getMrsList() {
        // ** 打开节流阀
        this.isloading = true
        const date = this.dateList[this.dateTabsCurrent];
        const time = this.timeList[this.timeChecked];
        const chooseDateTime = date.dateAndYear + ' ' + time;
        console.log(chooseDateTime);
        // 3.1 发起请求
        const { data: res } = await uni.$http.get('/beautician/getBeauticianList',{
          "beauticianTime":chooseDateTime
        })
        // 3.2 请求失败
        if (res.status !== 200) return uni.$showMsg()
        // 3.3 请求成功，为 data 中的数据赋值
        this.mrsList = res.data
        // ** 关闭节流阀
        this.isloading = false
      },
      // 选择 上门or到店
      xuanXiangChange(index) {
        this.subCurrent = index
      },
      // 选择日期单击事件
      dateTabsChange(e) {
        this.dateTabsCurrent = e.index;
        this.timeChecked = 0;
        this.getMrsList();
      },
      // 选择时间单击事件
      timeClick(index) {
        this.timeChecked = index;
        this.getMrsList();
      },
      // 选择美容师单击事件
      mrsClick(index) {
        this.mrsChecked = index;
      },
      toDetail(){
        uni.navigateTo({
          url:'/subpkg/ServiceDetails/ServiceDetails?serviceItemId=' + this.order_good.id
        })
      },
      // 3.1 把 m_order 模块中的 updateSubCurrent 函数映射到当前组件
      ...mapMutations('m_order', ['updateSubCurrent']),
      // 确认预约  按钮单击事件
      orderSubmit() {
        // 时间超过今晚21点并且不选择其他日期中的时间
        if (this.timeList.length === 0 || this.mrsList.length ==0) return uni.$showMsg('请正确选择预约时间和美容师！')
        this.updateSubCurrent(this.subCurrent);
        uni.navigateTo({
          // subCurrent===0 是到店   1 是上门
          url: '/subpkg/ServiceOrderOrderSubmit/ServiceOrderOrderSubmit?order_good=' + JSON.stringify(this.order_good) + '&date=' + JSON
            .stringify(this.dateList[this.dateTabsCurrent]) + '&time=' + JSON.stringify(this.timeList[this.timeChecked]) + '&mrsId=' + this.mrsList[this.mrsChecked].id
          // +'&mrs='+JSON.stringify(this.mrsList[this.mrsChecked])
        })
      },

    },
  }
</script>

<style lang="scss">
  // 时间未选中样式
  .time-unchecked {
    color: #a6a6a6;
  }

  // 时间选中样式
  .time-checked {
    background-color: #ff007f;
    color: #ffffff;
  }


  // 美容师 查看更多
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
