<template>
  <!-- 整个盒子 -->
  <view class="shadow box">
    <view class="box2">
      <image class="goodsimg" :src="qgGoodsList.imageSrc"></image>
      <view class="txtName u-line-1">{{qgGoodsList.name}}</view>
      <!-- btn 立即抢购 -->
      <image :src="btnSrc" class="btnPay" @click="gotoDetail()"></image>
    </view>
  </view>
</template>

<script>
  export default {
    name: "my-qggoods",
    props: {
      // 抢购商品的信息对象
      qgGoodsList: {
        type: Object,
        default: {},
      },

    },
    data() {
      return {
        btnSrc: 'http://cn.shichengtai.xyz/icon/limitKill.png',
      };
    },
    methods:{
      gotoDetail(){
        const type =  this.qgGoodsList.goodsCateId || -1
        if(type == -1){//服务项目
          uni.navigateTo({
            url:'/subpkg/ServiceDetails/ServiceDetails?serviceItemId=' + this.qgGoodsList.id
          })
        }else{
          uni.navigateTo({
            url:'/subpkg/GoodsDetails/GoodsDetails?goods_id=' + this.qgGoodsList.id
          })
        }
      }
    },

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

  .box {
    width: 300rpx;
    height: 350rpx;
    margin-top: 15rpx;
    margin-left: 15rpx;
    margin-bottom: 15rpx;
  }

  .box2 {
    width: 300rpx;
    height: 370rpx;
  }

  .goodsimg {
    width: 300rpx;
    height: 210rpx;
  }

  .txtName {
    font-size: 32rpx;
    margin-left: 5%;
  }

  .btnPay {
    width: 80%;
    height: 20%;
    margin-left: 10%;
    margin-top: 10rpx;
  }
</style>
