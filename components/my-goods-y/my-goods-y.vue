<template>
  <view>
    <!-- 商品列表 -->
    <!-- <view class="px-20 u-m-t-30 d-flex j-sb flex-wrap"> -->
      <view  class="shadow u-m-t-30 " style="border-top-left-radius: 10rpx;border-top-right-radius: 10rpx;width: 345rpx;" @click="toDetail()">
        <image :src="goods.imageSrc" mode="" class="img-345" style="border-top-left-radius: 10rpx;border-top-right-radius: 10rpx;"></image>
        <view class="px-10">
          <text class="u-line-1 u-font-28 font-weight black-color my-10" >{{goods.name}}</text>
          <text class="u-line-1 u-font-24 gray-color">{{goods.subName}}</text>
        </view>
        <view class="d-flex j-sb px-20 u-m-t-5">
          <view class="d-flex a-center ">
            <view class="main-color u-m-r-15">
              <text class="font-weight u-font-26">￥</text>
              <text class="font-weight u-font-36">{{goods.nowPrice}}</text>
            </view>
            <view class="line-through gray-color u-font-26">{{goods.olderPrice}}</view>
          </view>
          <u-icon name="shopping-cart" color="#ffaaff" size="36"></u-icon>
        </view>
      </view>
    <!-- </view> -->
    
    
    
    
  </view>
</template>

<script>
  export default {
    name:"my-goods-y",
    props: {
      // 商品的信息对象
      goods: {
        type: Object,
        default: {},
      },
      
    },
    data() {
      return {
        
      };
    },
    methods:{
      toDetail(){
        uni.navigateTo({
          url:'/subpkg/ServiceDetails/ServiceDetails?serviceItemId=' + this.goods.id
        })
      }
    },
  }
</script>

<style lang="scss">

</style>
