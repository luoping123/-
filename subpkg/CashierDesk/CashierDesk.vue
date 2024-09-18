<template>
  <view class="page">
    <view class="price-count-down">
      <view class="price">
        <text class="min">￥</text>
        <text class="max">{{realPrice}}</text>
        <!-- <text class="min">.00</text> -->
      </view>
      <view class="count-down">
        <view class="title">支付剩余时间</view>
        <view class="count">
          <u-count-down :time="timeDown" format="HH:mm:ss"></u-count-down>
         <!-- <text class="time">{{hour}}</text>
          <text class="dot">:</text>
          <text class="time">{{min}}</text>
          <text class="dot">:</text>
          <text class="time">{{sec}}</text> -->
        </view>
      </view>
    </view>
    <!-- 支付方式列表 -->
    <view class="pay-way">
      <view class="pay-list">
        <view class="list" v-for="(item,index) in PayList" @click="onPayWay(item,index)" :key="index">
          <view class="pay-type">
            <image :src="item.icon" mode=""></image>
            <text>{{item.name}}</text>
          </view>
          <view class="check">
            <text class="iconfont" :class="PayWay === index ? 'icon-checked action':'icon-check'"></text>
          </view>
        </view>
      </view>
    </view>
    <view class="pay-submit">
      <view class="submit" @click="onSubmit">{{PayPirce}}</view>
    </view>
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
    computed: {
      // 将 m_cart 模块中的 cart 数组映射到当前页面中使用
      ...mapState('m_user', ['userInfo']),
    },
    data() {
      return {
        goodsOrderId:0,//订单编号
        realPrice:0,//需要实际支付金额
        PayList: [{
          icon: '/static/wx_pay.png',
          name: '微信支付',
        }, {
          icon: '/static/zfb_pay.png',
          name: '支付宝支付',
        }, {
          icon: '/static/ye_pay.png',
          name: '余额支付',
        }, ],
        orderType:'商品',//订单类别  商品、服务
        serviceOrderId:'',//服务订单id
        PayWay: 0,//付款方式下标
        PayPirce: '',
        CountDown: 1000,//旧倒计时
        timeDown:30*60*1000,//新倒计时
        day: 0,
        hour: 0,
        min: 0,
        sec: 0,
      };
    },
    onLoad(params) {
      this.orderType=params.orderType || '商品';
      this.goodsOrderId=params.goodsOrderId || 0;
      this.realPrice=params.realPrice || 0;
      this.PayPirce='微信支付￥'+this.realPrice;
      this.serviceOrderId= params.serviceOrderId || '';
      console.log(this.orderType=='服务')
      if(this.orderType=='服务'){//服务
        console.log("this.orderType==服务")
        
        this.getTimeService(this.serviceOrderId);
      }else{//商品
        this.getTime(this.goodsOrderId);
      }
    },
    methods: {
      // 2. 调用 mapMutations 辅助方法，把 m_user 模块中的 updateUserInfo 映射到当前组件中使用
      ...mapMutations('m_user', ['updateUserInfo']),
      async getTime(goodsOrderId){
        // 发起请求  获取订单支付失效倒计时
        const { data: res } = await uni.$http.get('/goodsOrder/getGoodsOrderTimeByOrderId',{"goodsOrderId":goodsOrderId})
        //  请求失败
        if (res.status !== 200) return uni.$showMsg()
        console.log(res.data);//秒
        this.timeDown=res.data*1000;
        // this.CountDown=res.data;
      },
      async getTimeService(serviceOrderId){
        // 发起请求  获取订单支付失效倒计时
        const { data: res } = await uni.$http.get('/service_order_order/getServiceOrderTimeByOrderId',{"serviceOrderId":serviceOrderId})
        //  请求失败
        if (res.status !== 200) return uni.$showMsg()
        console.log(res.data);//秒
        this.timeDown=res.data*1000;
        // this.CountDown=res.data;
      },
      /**
       * 支付方式切换点击
       */
      onPayWay(item, index) {
        this.PayWay = index;
        this.PayPirce = `${item.name}￥${this.realPrice}`
      },
      /**
       * 支付点击
       */
      async onSubmit() {
        //调用指纹识别API
        var that=this;
        uni.startSoterAuthentication({
          requestAuthModes: ['fingerPrint'],
          challenge: that.orderId+'',
          authContent: '请验证指纹',
          success(res) {
            console.log(res);
            switch(res.errCode){
              case 0: //识别成功 
                  if(that.orderType=='服务'){//服务
                    //组装订单信息，存入后台
                    that.saveServiceOrderInfo();
                  }else{//商品
                    //组装订单信息，存入后台
                    that.saveOrderInfo();
                  }
                  break;
              case 90001: //本设备不支持生物认证
                  uni.$showMsg("本设备不支持生物认证")
                  break;
              case 90002: //用户未授权使用该生物认证接口
                  uni.$showMsg("用户未授权使用该生物认证接口")
                  break;
              case 90003: //请求使用的生物认证方式不支持
                  uni.$showMsg("请求使用的生物认证方式不支持")
                  break;
              case 90008: //用户取消授权
                  uni.$showMsg("您取消了支付")
                  break;
              case 90009: //识别失败
                  uni.$showMsg("识别失败")
                  break;
              case 90010: //重试次数过多被冻结
                  uni.$showMsg("重试次数过多被冻结")
                  break;
              case 90011: //用户未录入所选识别方式
                  uni.$showMsg("用户未录入所选识别方式")
                  break;
            }
          },
          fail(err) {
            console.log(err);
          },
          complete(res) {
            console.log(res);
          }
        })
      },
      //保存订单信息（待发货）
      async saveOrderInfo(){
        // 发起请求  根据订单编号，从redis中获取订单信息
        const { data: res } = await uni.$http.get('/goodsOrder/getGoodsOrderFromRedisByOrderId',{"goodsOrderId":this.goodsOrderId})
        //  请求失败
        if (res.status !== 200) return uni.$showMsg()
        console.log("saveOrderInfo===>getGoodsOrderFromRedisByOrderId============>>>>>>>>>>>>>>>>")
        console.log(res.data);
        var goodsOrder=res.data;
        goodsOrder.goodsOrderId=this.goodsOrderId;
        goodsOrder.orderStatus='待发货';//订单状态
        goodsOrder.payType=this.PayList[this.PayWay].name;//付款方式
        goodsOrder.payTime=uni.$getDateTime(new Date());//付款时间
        
        if(goodsOrder.payType=='余额支付'){
          if(this.userInfo.balance < this.realPrice) return uni.$showMsg("钱包余额不足，请充值")
        }
        
        console.log("goodsOrder==============>>>>>>>>>")
        console.log(goodsOrder)
        // 发起请求  根据订单对象，存储到mysql数据库中
        const { data: res2 } = await uni.$http.put('/goodsOrder/updateGoodsOrdeStatusBuySuccessByOrderId',goodsOrder)
        //  请求失败
        if (res2.status !== 200) return uni.$showMsg()
        console.log("res2.data=====================>>>>>>>>>>>>>>>>");
        console.log(res2.data);
        if(goodsOrder.payType=='余额支付'){
          console.log("支付前的余额：")
          console.log(this.userInfo.balance);
          this.userInfo.balance -=  this.realPrice;
          console.log("支付后：")
          console.log(this.userInfo.balance);
          this.updateUserInfo(this.userInfo);
        }
        uni.$showMsg("付款成功")
        setTimeout(()=>{
          uni.redirectTo({
            url: '/subpkg/PayResult/PayResult?realPrice=' +this.realPrice + '&payType=' + goodsOrder.payType
          })
        },1500)
      },
      //保存服务订单信息（待使用）
      async saveServiceOrderInfo(){
        // 发起请求  根据订单编号，从redis中获取订单信息
        const { data: res } = await uni.$http.get('/service_order_order/getServiceOrderFromRedisByOrderId',{"serviceOrderId":this.serviceOrderId})
        //  请求失败
        if (res.status !== 200) return uni.$showMsg()
        console.log("saveServiceOrderInfo===>getServiceOrderFromRedisByOrderId============>>>>>>>>>>>>>>>>")
        console.log(res.data);
        var serviceOrderOrder=res.data;
        let payTime = uni.$getDateTime(new Date());//付款时间
        let endDate = uni.$getDateTime(payTime.getMonth()+1);//设置一个月后到期
        serviceOrderOrder.realPay = this.realPrice;//实付款
        serviceOrderOrder.payType = this.PayList[this.PayWay].name;//付款方式
        serviceOrderOrder.payTime = payTime;//付款时间
        serviceOrderOrder.orderStatus = '待使用';//订单状态
        serviceOrderOrder.endDate = endDate;//到期时间
        console.log("serviceOrderOrder==============>>>>>>>>>")
        console.log(serviceOrderOrder)
        
        if(this.PayList[this.PayWay].name=='余额支付'){
          if(this.userInfo.balance < this.realPrice) return uni.$showMsg("钱包余额不足，请充值")
        }
        
        // 发起请求  根据订单对象，存储到mysql数据库中
        const { data: res2 } = await uni.$http.put('/service_order_order/updateServiceOrdeStatusBuySuccessByOrderId',serviceOrderOrder)
        //  请求失败
        if (res2.status !== 200) return uni.$showMsg()
        console.log("res2.data=====================>>>>>>>>>>>>>>>>");
        console.log(res2.data);
        if(this.PayList[this.PayWay].name=='余额支付'){
          console.log("支付前的余额：")
          console.log(this.userInfo.balance);
          this.userInfo.balance -=  this.realPrice;
          console.log("支付后：")
          console.log(this.userInfo.balance);
          this.updateUserInfo(this.userInfo);
        }
        uni.$showMsg("付款成功")
        setTimeout(()=>{
          uni.redirectTo({
            url: '/subpkg/ServiceOrderOrderDetail/ServiceOrderOrderDetail?serviceOrderId=' +serviceOrderOrder.orderId,
          })
        },1500)
      },
    }
  }
</script>

<style scoped lang="scss">
  /*每个页面公共css */
  @import '/colorui/main.css';
  @import '/colorui/icon.css';
  @import '/style/FontStyle.css';

  .page {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #f6f6f6;
  }

  /* 金额倒计时 */
  .price-count-down {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 200rpx;
    background-color: #FFFFFF;

    .price {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 80rpx;

      text {
        color: $base;
        font-weight: bold;
      }

      .min {
        font-size: 32rpx;
      }

      .max {
        font-size: 52rpx;
      }
    }

    .count-down {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 60rpx;

      .title {
        font-size: 24rpx;
        color: #222222;
      }

      .count {
        display: flex;
        align-items: center;
        margin-left: 20rpx;

        .time {
          padding: 4rpx 4rpx;
          background-color: #EEEEEE;
          font-size: 24rpx;
          color: #222222;
          border-radius: 2rpx;
        }

        .dot {
          margin: 0 10rpx;
          font-size: 24rpx;
          color: #222222;
        }
      }
    }
  }

  /* 支付方式 */
  .pay-way {
    width: 100%;
    background-color: #FFFFFF;
    margin-top: 220rpx;

    .pay-list {
      padding: 0 4%;

      .list {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height: 100rpx;
        border-bottom: 2rpx solid #f6f6f6;

        .pay-type {
          display: flex;
          align-items: center;

          image {
            width: 40rpx;
            height: 40rpx;
          }

          text {
            font-size: 28rpx;
            color: #222222;
            margin-left: 20rpx;
          }
        }

        .check {
          display: flex;
          align-items: center;

          text {
            font-size: 42rpx;
            color: #C0C0C0;
          }

          .action {
            color: $base;
          }
        }
      }
    }
  }

  /* 支付提交 */
  .pay-submit {
    position: absolute;
    left: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100rpx;
    background-color: #FFFFFF;

    .submit {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 90%;
      height: 70%;
      background-color: $base;
      color: #FFFFFF;
      border-radius: 100rpx;
      font-size: 26rpx;
    }
  }
</style>
