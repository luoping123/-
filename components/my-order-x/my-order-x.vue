<template>
  <view style="margin-top: 30rpx;">
    <!-- 服务预约列表 -->
    <view class="box2 shadow d-flex j-start">
      <!-- 图片 -->
      <view class="viewImage">
        <image class="imagecss shadow" :src="order.imageSrc"></image>
      </view>
      <!-- 右侧盒子 -->
      <view class="rightBox">
        <!-- name -->
        <view class="txtName u-line-1">{{order.name}}</view>
        <!-- 预约时间段 -->
        <view class="txtTime">10:00 | 11:00 | ... | 21:00 | 多时间</view>
        <!-- 价格和 预约按钮 -->
        <view class="viewPriceBtn d-flex j-sb">
          <view class="txtPrice">￥{{order.nowPrice}}</view>
          <navigator class="navigateView shadow" :url="'../../subpkg/ServiceOrderChoose/ServiceOrderChoose?order_good_id=' + order.id ">预约</navigator>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: "my-order-x",
    props: {
      // 预约的信息对象
      order: {
        type: Object,
        default: {},
      },

    },
    data() {
      return {
        order1: this.order,
      };
    },
    methods: {

    }
  }
</script>

<style lang="scss">
  .box2 {
    margin-left: 15rpx;
    width: 720rpx;
    height: 280rpx;
    border-radius: 20rpx;
  }

  .viewImage {
    border-radius: 15rpx;
    margin-top: 25rpx;
    margin-left: 15rpx;
    height: 230rpx;
    width: 260rpx;
  }

  .imagecss {
    border-radius: 15rpx;
    height: 230rpx;
    width: 250rpx;
  }

  .rightBox {
    border-radius: 15rpx;
    width: 430rpx;
    height: 230rpx;
    margin-top: 25rpx;
    margin-left: 5rpx;
  }

  .txtName {
    width: 350rpx;
    height: 45rpx;
    margin-top: 10rpx;
    margin-left: 10rpx;
    font-size: 36rpx;
    font-weight: bold;
  }

  .txtTime {
    width: 390rpx;
    height: 45rpx;
    margin-top: 15rpx;
    margin-left: 10rpx;
    font-size: 28rpx;
    color: #999999;
  }

  .viewPriceBtn {
    width: 400rpx;
    height: 65rpx;
    margin-top: 50rpx;
    margin-left: 10rpx;
  }

  .txtPrice {
    margin-top: 15rpx;
    width: 160rpx;
    height: 50rpx;
    color: #f35997;
    font-weight: bold;
  }

  .navigateView {
    border-radius: 35rpx;
    background-color: #f35997;
    width: 180rpx;
    height: 60rpx;
    text-align: center;
    padding-top: 5rpx;
    font-size: 38rpx;
    color: #FFFFFF;
  }
</style>
