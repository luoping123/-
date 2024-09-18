<template>
  <view class="box">
    <!-- 顶部导航 -->
    <view>
      <f-navbar title="智慧美业" fontSize="35" fontColor="#fff"
        gradient="linear-gradient(90deg,rgb(255, 0, 0),rgb(170, 0, 255))"></f-navbar>
    </view>
    <!-- 服务项目 -->
    <view class="shadow fuwuxiangmu">
      <u-cell title="服务项目："></u-cell>
      <!-- 查看详情box -->
      <view class="d-flex j-start chakanxiangqingbox">
        <!-- 图片 -->
        <view class="imgbox">
          <image class="img" :src="serviceItem.imageSrc"></image>
        </view>
        <!-- 右侧盒子 -->
        <view class="d-flex j-start rightbox">
          <!-- title -->
          <view class="u-line-1 fuwutitle">
            {{serviceItem.name}}
          </view>
          <!-- 查看详情 -->
          <!-- <view class="shadow chakanxiangqing">查看详情 ></view> -->
          <!-- 价格 -->
          <view class="fuwuxiangmuprice">￥{{serviceItem.nowPrice}}</view>
        </view>
      </view>
    </view>
    <!-- 券码 box-->
    <view class="shadow quanmabox">
      <!-- 二维码 box -->
      <view v-if="orderInfo.orderStatus=='待使用'" :style="{ width: qrcode_w + 'px', height: qrcode_w + 'px' }" style="margin: 60rpx auto;">
        <canvas :style="{ width: qrcode_w + 'px', height: qrcode_w + 'px' }" canvas-id="myQrcode"></canvas>
      </view>
      <!-- 券码信息 -->
      <view class="quanmaxinxi">
        <view class="quanmaxixni-row1">
          <view style="font-weight: bold;">券码信息</view>
          <!-- <view class="shenqingtuikuan">申请退款</view> -->
        </view>
        <view style="font-size: 26rpx;margin: 10rpx 0;">{{orderInfo.endDate}} 到期</view>
        <!-- code -->
        <view style="display: flex;justify-content: flex-start;">
          <view style="font-weight: bold;">·</view>
          <view v-if="orderInfo.orderStatus=='待使用'" style="margin-left: 10rpx;">{{orderInfo.qrcodeNumber}}</view>
          <view class="daishiyongtext">{{orderInfo.orderStatus}}</view>
        </view>
      </view>
    </view><!-- 券码 box end-->
    <!-- 服务方式+ 上门地址or店铺地址()  + 预约时间 + 备注  -->
    <view class="shadow" style="border-radius: 20rpx;">
      <u-cell title="服务方式:" :value="orderInfo.serviceType"></u-cell>
      <u-cell title="预约时间:" :value="orderInfo.orderTime"></u-cell>
      <u-cell title="备注:" :value="orderInfo.remarks"></u-cell>
      <!-- 上门地址 -->
      <view></view>
      <!-- 店铺地址 -->
      <view></view>

    </view>

    <!-- 美容师box -->
    <view class="shadow " style="border-radius: 20rpx;margin-top: 40rpx;padding-bottom: 20rpx;">
      <u-cell title="美容师:"></u-cell>
      <view class="d-flex j-start" style="width: 750rpx;height: 250rpx;margin-top: 0rpx;">
        <!-- 美容师照片 -->
        <view class=""
          style="position: relative;top: 20rpx;left: 20rpx;border-radius: 50rpx;height: 230rpx;width: 230rpx;">
          <image style="border-radius: 50rpx;height: 230rpx;width: 230rpx;" :src="beautician.img"></image>
        </view>
        <!-- 右侧盒子 -->
        <view class="d-flex j-start"
          style="border-radius: 15rpx;width: 480rpx;height: 210rpx;margin-top: 15rpx;margin-left: 40rpx;">
          <!-- title -->
          <view class="u-line-1 "
            style="width: 260rpx;height: 45rpx;margin-top: 10rpx;margin-left: 10rpx;font-size: 36rpx;font-weight: bold;">
            {{beautician.name}}
          </view>
          <!-- 查看详情 -->
         <!-- <view class="shadow"
            style="background-color: #f2f2f2;margin-left: 4rpx;margin-top: 10rpx;text-align: end;width: 155rpx;height: 45rpx;font-size: 28rpx;color: #777777;border-radius: 22rpx 0 0 22rpx;">
            查看详情 ></view> -->
          <!-- 评分box -->
          <view style="margin-top: 100rpx;margin-left: -430rpx;width:280rpx ;height: 100rpx;">
            <view style="width: 190rpx;height: 50rpx;color:#f484b2 ;font-weight: bold;">网友评分：</view>
            <view style="width: 300rpx;height: 50rpx;margin-top: 20rpx;margin-left: -10rpx;">
              <u-rate size="20" v-model="beautician.starSum" allowHalf="true" inactiveIcon="heart" activeIcon="heart-fill" disabled="true">
              </u-rate>
            </view>
          </view>
        </view>
      </view>
    </view>
    <!-- 订单编号 + 下单时间+ 付款时间 + 支付方式 + 订单总价 + 优惠金额 + 实付款  -->
    <view class="shadow " style="border-radius: 20rpx;
             margin-top: 40rpx;
             padding: 30rpx;">
      <!-- 实付金额加粗 -->
      <view style="font-weight: bold;">实付金额：￥{{orderInfo.realPay}}</view>
      <!-- 订单号box -->
      <view class="dingdanxinxibox">
        <view class="dingdanxinxititle">订单号：</view>
        <view class="dingdanxinxivalue">{{orderInfo.orderId}}</view>
        <!-- <view class="btncopy">复制</view> -->
      </view>
      <!-- 付款时间box -->
      <view class="dingdanxinxibox">
        <view class="dingdanxinxititle">付款时间：</view>
        <view class="dingdanxinxivalue">{{orderInfo.payTime}}</view>
      </view>
      <!-- 下单时间 box -->
      <view class="dingdanxinxibox">
        <view class="dingdanxinxititle">下单时间：</view>
        <view class="dingdanxinxivalue">{{orderInfo.createTime}}</view>
      </view>
      <!-- 总价 box -->
      <view class="dingdanxinxibox">
        <view class="dingdanxinxititle">总价：</view>
        <view class="dingdanxinxivalue">￥{{orderInfo.sumPrice}}</view>
      </view>
      <!-- 优惠明细 box -->
      <view class="dingdanxinxibox">
        <view class="dingdanxinxititle">优惠明细：</view>
        <view class="dingdanxinxivalue" style="color: red;">-￥0.00</view>
      </view>
      <!-- 实付 box -->
      <view class="dingdanxinxibox">
        <view class="dingdanxinxititle">实付：</view>
        <view class="dingdanxinxivalue">￥{{orderInfo.realPay}}</view>
      </view>
    </view>




  </view>
</template>

<script>
  // 导入二维码生成库
  import qrCode from '@/libs/weapp-qrcode.js';
  export default {
    data() {
      return {
        // 二维码内容号码  （后台随机生成  17位时间+9位随机数）
        qrCodeNumber: 0,
        qrcode_w: uni.upx2px(400),//二维码大小
        // star_sum: 3,//美容师 评价星级
        serviceItem: {},//服务项目对象
        orderInfo: {},//订单对象
        beautician: {},//美容师 对象
        
      };
    },
    onLoad(params) {
      let serviceOrderId = params.serviceOrderId || 0;
      console.log(serviceOrderId);//订单编号
      this.getOrderInfo(serviceOrderId);//获取订单信息
      // this.getServiceItem();//获取服务项目信息
      //1秒后创建二维码
      setTimeout(()=>{
        this.createQRCode();
      },1000)
    },
    methods:{
      //  获取订单信息的方法
      async getOrderInfo(serviceOrderId) {
        // ** 打开节流阀
        this.isloading = true
        //  发起请求
        console.log("getOrderInfo==============>>>>>>>>>>>serviceOrderId")
        console.log(serviceOrderId)
        const { data: res } = await uni.$http.post('/service_order_order/getOrderInfoById',serviceOrderId)
        //  请求失败
        if (res.status !== 200) return uni.$showMsg()
        console.log("getOrderInfo============>>>>>>res.data==============>>>>>>>>>>")
        console.log(res.data)
        //  请求成功，为 data 中的数据赋值
        this.orderInfo = res.data;
        this.serviceItem = res.data.serviceItem;
        this.beautician = res.data.beautician;
        this.qrCodeNumber = res.data.qrcodeNumber;
        // ** 关闭节流阀
        this.isloading = false
        // this.getServiceItem();//获取服务项目信息
        // this.getbeautician();//获取美容师信息
      },
      createQRCode(){
        new qrCode('myQrcode', {
          text: this.orderInfo.qrcodeNumber + '',
          width: this.qrcode_w,
          height: this.qrcode_w,
          colorDark: '#333333',
          colorLight: '#FFFFFF',
          correctLevel: qrCode.CorrectLevel.H
        });
      },
    },
  }
</script>

<style lang="scss">
  .box {
    margin: 30rpx;
  }

  .fuwuxiangmu {
    border-radius: 20rpx;
    border-bottom: 1rpx dashed #ffaa7f;
  }

  .chakanxiangqingbox {
    width: 750rpx;
    height: 240rpx;
  }

  .imgbox {
    margin-top: 15rpx;
    margin-left: 20rpx;
    border-radius: 15rpx;
    height: 210rpx;
    width: 230rpx;
  }

  .img {
    border-radius: 15rpx;
    height: 210rpx;
    width: 230rpx;
  }

  .rightbox {
    border-radius: 15rpx;
    width: 480rpx;
    height: 210rpx;
    margin-top: 15rpx;
    margin-left: 20rpx;
  }

  .fuwutitle {
    width: 260rpx;
    height: 45rpx;
    margin-top: 10rpx;
    margin-left: 10rpx;
    font-size: 36rpx;
    font-weight: bold;
  }

  .chakanxiangqing {
    background-color: #f2f2f2;
    margin-top: 10rpx;
    text-align: end;
    width: 155rpx;
    height: 45rpx;
    font-size: 28rpx;
    color: #777777;
    border-radius: 22rpx 0 0 22rpx;
  }

  .fuwuxiangmuprice {
    margin-top: 150rpx;
    margin-left: -440rpx;
    width: 160rpx;
    height: 50rpx;
    color: #ff007f;
    font-weight: bold;
  }

  .quanmabox {
    border-radius: 15rpx;
    border-top: 1rpx dashed #ffaa7f;
  }

  .quanmaxinxi {
    margin: 30rpx;
    padding-bottom: 30rpx;
  }

  .quanmaxixni-row1 {
    display: flex;
    justify-content: initial;
  }

  .shenqingtuikuan {
    font-size: 28rpx;
    background-color: #e5e5e5;
    padding: 10rpx 20rpx;
    border-radius: 40rpx;
    position: absolute;
    right: 60rpx;
    margin-top: 10rpx;
  }

  .daishiyongtext {
    position: absolute;
    right: 60rpx;
    font-size: 28rpx;
    padding-top: 5rpx;
  }

  // 订单号+付款时间+下单时间+总价+优惠明细+实付 的各自box
  .dingdanxinxibox {
    display: flex;
    justify-content: flex-start;
    margin-top: 20rpx;
  }

  // 订单号+付款时间+下单时间+总价+优惠明细+实付  的文字title
  .dingdanxinxititle {
    width: 189rpx;
    text-align: justify;
    text-align-last: justify;
    font-size: 32rpx;
    color: #7c7c7c;
  }

  .dingdanxinxivalue {
    font-size: 34rpx;
    padding-left: 30rpx;
  }

  .btncopy {
    background-color: #e5e5e5;
    font-size: 32rpx;
    padding: 5rpx 10rpx;
    border-radius: 5rpx;
    margin-left: 20rpx;
  }
</style>
