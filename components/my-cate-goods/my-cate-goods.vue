<template>
  <view class="section_4 flex-row">
    <image :src="goods.imageSrc" class="image_10" />
    <view class="flex-col group_9">
      <view>
        <text class="text_12 u-line-1">{{goods.name}}</text>
        <!-- <text class="text_12">色不含色素</text> -->
      </view>
      <view class="bottom-group row justify-between" >
        <view class="image_15" style="color: red;">￥{{goods.price}}</view>
        <!-- <image src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/621652a25a7e3f03105c7dbc/621de8024fa933001194cacf/16461492114140390914.png" class="image_15" /> -->
        <!-- <image src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/621652a25a7e3f03105c7dbc/621de8024fa933001194cacf/16461492112513317072.png" class="image_16"  /> -->
      <view @click="clickBuy" class="btnBuy shadow">立即购买</view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: "my-cate-goods",
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
      clickBuy(){
        uni.navigateTo({
          url: '/subpkg/GoodsDetails/GoodsDetails?goods_id='+this.goods.id
        })
      }
    },
  }
</script>

<style lang="scss">
  .btnBuy {
    margin-bottom: 15rpx;
    font-size: 26rpx;
    padding: 10rpx 30rpx;
    background-color: #ff007f;
    color: #FFFFFF;
    text-align: center;
    border-radius: 30rpx;
  }

  html {
    font-size: 16px;
  }

  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans',
      'Droid Sans', 'Helvetica Neue', 'Microsoft Yahei', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  view,
  image,
  text {
    box-sizing: border-box;
    flex-shrink: 0;
  }

  #app {
    width: 100vw;
    height: 100vh;
  }

  .flex-row {
    display: flex;
    flex-direction: row;
  }

  .flex-col {
    display: flex;
    flex-direction: column;
  }

  .justify-start {
    display: flex;
    justify-content: flex-start;
  }

  .justify-center {
    display: flex;
    justify-content: center;
  }

  .justify-end {
    display: flex;
    justify-content: flex-end;
  }

  .justify-evenly {
    display: flex;
    justify-content: space-evenly;
  }

  .justify-around {
    display: flex;
    justify-content: space-around;
  }

  .justify-between {
    display: flex;
    justify-content: space-between;
  }

  .items-start {
    display: flex;
    align-items: flex-start;
  }

  .items-center {
    display: flex;
    align-items: center;
  }

  .items-end {
    display: flex;
    align-items: flex-end;
  }

  .section_4 {
    margin-bottom: 17rpx;
    color: rgb(51, 51, 51);
    font-size: 34rpx;
    line-height: 41rpx;
    padding: 25rpx 22rpx 30rpx 24rpx;
    background-color: rgb(255, 255, 255);
    box-shadow: 0px 1rpx 54rpx rgba(65, 65, 65, 0.09);
    border-radius: 10rpx;

    .image_10 {
      border-radius: 10rpx;
      width: 200rpx;
      height: 200rpx;
    }

    .group_9 {
      margin-left: 16rpx;
      flex: 1 1 auto;
      align-self: center;

      .bottom-group {
        padding-left: 6rpx;

        .image_15 {
          width: 143rpx;
          height: 28rpx;
        }

        .image_16 {
          margin-top: 6rpx;
          width: 103rpx;
          height: 21rpx;
        }
      }

      .row {
        margin-top: 80rpx;
      }

      .text_12 {
        opacity: 0.97;
      }
    }
  }
</style>
