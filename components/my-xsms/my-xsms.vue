<template>
  <view>
    <!-- 红色渐变背景框 -->
    <view class="shadow mx-20 my-20"
      style="background-image:linear-gradient(90deg,rgb(245, 87, 71),rgb(234, 36, 103));width:710rpx;height: 486rpx; border-radius: 20rpx;">

      <view class="" style="position: relative;left: 23rpx;top: 26rpx;width: 170rpx;height: 40rpx;font-family: SourceHanSansCN-Normal;font-size: 38rpx;font-weight: bold;font-stretch: normal;line-height: 35rpx;letter-spacing: 0rpx;
    color: #ffffff;">限时秒杀</view>
      <!-- 白色竖分割线 -->
      <view style="width: 2rpx;height: 50rpx;background-color: #ffffff;position: relative;top: -20rpx;left: 200rpx;">
      </view>
      <!-- 倒计时 -->
      <view style="position: relative;top:-80rpx;left: 230rpx;">
        <u-count-down :time="time" format="HH:mm:ss" autoStart millisecond @change="onChange">
          <view class="time">
            <view class="time__custom">
              <text class="time__custom__item">{{ timeData.hours>10?timeData.hours:'0'+timeData.hours}}</text>
            </view>
            <text class="time__doc">:</text>
            <view class="time__custom">
              <text class="time__custom__item">{{ timeData.minutes }}</text>
            </view>
            <text class="time__doc">:</text>
            <view class="time__custom">
              <text class="time__custom__item">{{ timeData.seconds }}</text>
            </view>
          </view>
        </u-count-down>
      </view>

      <!-- 立即抢购 -->
      <view
        style="position: relative;top: -125rpx;left: 520rpx;font-family: SourceHanSansCN-Normal;font-size: 31rpx;font-weight: normal;font-stretch: normal;line-height: 35rpx;letter-spacing: 0rpx;color: #ffffff;">
        立即抢购 &nbsp; ></view>

      <!-- 白色商品背景框 -->
      <view class="shadow mx-10"
        style="width: 675rpx;height: 380rpx;background-color: #ffffff;border-radius: 10rpx;position: relative;top: -95rpx;margin-left: 15rpx;">
        <!-- 横向滚动列表 -->
        <u-scroll-list :indicator="false">
          <!-- 循环秒杀商品列表 -->
          <view style="display: flex;justify-content: space-around;">
            <block v-for="(item, index) in qgGoodsList" :key="index">
              <my-qggoods :qgGoodsList="item"></my-qggoods>
            </block>
          </view>
          <!-- 查看更多 -->
          <!-- <view class="qgshow-more shadow">
            <text class="text">查看更多</text>
            <u-icon name="arrow-leftward" color="#f56c6c" size="12"></u-icon>
          </view> -->
          <view style="width: 15rpx;height: 260rpx; color:#FFFFFF ;">1</view>
        </u-scroll-list>
      </view><!-- 白色商品背景框 -->

    </view>
  </view>
</template>

<script>
  export default {
    name: "my-xsms",
    props: {
      // 抢购商品的信息对象
      qgGoodsList: {
        type: Array,
        default: [],
      },
      time:{
        type:Number,
        default:24 * 60 * 60 * 1000,
      }

    },
    data() {
      return {
        // 倒计时
        timeData: {},
      };
    },
    methods: {
      onChange(e) {
        this.timeData = e
        // this.$emit('onChange', e);  
      },
    }
  }
</script>

<style lang="scss">
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
