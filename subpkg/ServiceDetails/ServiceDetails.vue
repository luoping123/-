<template>
  <view @click="isMore = false">
    <view class="goods-head" :style="'background:rgba(255,255,255,' + PageScrollTop / 100 + ')'">
      <!-- 返回 -->
      <view class="back" @click="onBack">
        <view class="back-one" :class="{ action: PageScrollTop > 120 }">
          <text></text>
        </view>
      </view>
      
    </view>
    <!-- banner，标题 -->
    <view class="banner-title">
      <!-- banner -->
      <view class="banner">
        <swiper class="screen-swiper round-dot" indicator-dots="true" circular="true" autoplay="true" interval="5000"
          duration="500">
          <swiper-item v-for="(item, index) in swiperList" :key="index">
            <image style="width: 100%;" :src="item.url" mode="aspectFill" v-if="item.type==='image'"></image>
            <video style="width: 100%;" :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false"
              :objectFit="cover" v-if="item.type == 'video'"></video>
          </swiper-item>
        </swiper>
      </view>
      <!-- 价格 -->
      <view class="price-info" v-if="type===0">
        <view class="price">
          <text class="min">￥</text>
          <text class="max">{{serviceItem.nowPrice}}</text>
          <!-- <text class="min">.00</text> -->
        </view>
      </view>
      <!-- 限时抢购 -->
      <!-- <view class="flash-price" v-if="type===1">
        <view class="price-item">
          <view class="icon-item">
            <text class="iconfont icon-flash-sale"></text>
          </view>
          <view class="price">
            <view class="current-price">
              <text class="min">￥</text>
              <text class="max">{{goods.price}}</text>
            </view>
            <view class="original-price">
              <text>￥{{goods.olderPrice}}</text>
            </view>
          </view>
          <view class="tag">
            <text class="iconfont icon-flash-naozhong"></text>
          </view>
        </view>
        <view class="time-item">
          <view class="title">
            <text>距结束还剩：</text>
          </view>
          <view class="time">
            <text class="num">02</text>
            <text class="dot">:</text>
            <text class="num">46</text>
            <text class="dot">:</text>
            <text class="num">52</text>
          </view>
        </view>
      </view> -->
      <!-- 标题 -->
      <view class="goods-title">
        <text>{{serviceItem.name}}{{serviceItem.subName}}</text>
      </view>
    </view>
    <!-- 服务介绍 -->
    <view class="products-introduction" ref="products">
      <view class="title">
        <text>服务介绍</text>
      </view>
      <view class="content" v-html="web_content"></view>
    </view>
    <!-- 底部 商品导航组件 -->
    <view class="goods_nav">
      <!-- fill 控制右侧按钮的样式 -->
      <!-- options 左侧按钮的配置项 -->
      <!-- buttonGroup 右侧按钮的配置项 -->
      <!-- click 左侧按钮的点击事件处理函数 -->
      <!-- buttonClick 右侧按钮的点击事件处理函数 -->
      <uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick"
        @buttonClick="buttonClick" />
    </view>
    <u-popup :show="showContactUs" :overlay="true" :closeOnClickOverlay="true"  :round="10"
      mode="center" @close="close" @open="open">
      <button type="primary"  open-type="contact" bindcontact="handleContact" session-from="sessionFrom">点击进入客服</button>
    </u-popup>
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
        // 左侧按钮组的配置对象
        options: [{
          icon: 'headphones',
          text: '客服'
        }],
        // 右侧按钮组的配置对象
        buttonGroup: [{
            text: '立即预约',
            backgroundColor: '#ffa200',
            color: '#fff'
          }
        ],
        TabShow: 0, //下划后  出现的顶部分栏 index
        showContactUs:false,//客服
        isMore: false, //分享更多
        serviceItem: {}, //服务项目信息
        swiperList: [], //轮播图
        web_content: '', //商品详情  的 富文本
        // '<div class="m-img"><img src="https://zhedplus.oss-cn-hangzhou.aliyuncs.com/content_img/20191118/1fb5ff162f25fd4c7383bd998ff2fde9.jpg"><div class="tools" hidden><i class="fa fa-arrow-up move-up"></i><i class="fa fa-arrow-down move-down"></i><em class="move-remove" hidden ><i class="fa fa-times" aria-hidden="true"></i> 移除</em><div class="cover"></div></div></div>',
        PageScrollTop: 0,
        type: 0,
      };
    },
    computed: {
      ...mapState('m_user', ['userInfo', 'token', 'address']),
    },
    onLoad(params) {
      this.type = params.type || 0;
      let serviceItemId = params.serviceItemId || -1;
      if (serviceItemId !== -1) {
        this.getServiceItemDetails(serviceItemId);
      }
    },
    onPageScroll(e) {
      this.PageScrollTop = e.scrollTop;
    },
    methods: {
      async getServiceItemDetails(serviceItemId) {
        // 发起请求
        const {data: res} = await uni.$http.get('/serviceItemDetails/getServiceItemDetailsByServiceItemId', {
          'serviceItemId': serviceItemId
        })
        console.log(res.data)
        // 判断是否获取失败
        if (res.status !== 200) return uni.$showMsg()
        // 转存数据
        this.serviceItem = res.data.serviceItem; //商品数据
        //商品轮播图
        this.swiperList = res.data.swiperDtoList;
        //抢购栏目还是普通栏目
        this.type = res.data.priceType ? res.data.priceType : 0;
        //富文本详情
        this.web_content = `<div style="width:100%">` + res.data.content + `</div>`;
      },
      /**
       * 返回
       */
      onBack() {
        uni.navigateBack();
      },
      /**
       * 查看更多评价 点击事件
       */
      // onEvaluate() {
      //   uni.navigateTo({
      //     url: '/subpkg/GoodsEvaluateList/GoodsEvaluateList?goods_id='+ this.goods.id
      //   })
      // },
      // 左侧按钮的点击事件处理函数
      onClick(e) {
        if(e.content.text === '客服'){
          this.showContactUs=true;//提示进入客服
        }
      },
      // 底部弹出的颜色、尺码选择框   打开事件
      open() {
        // console.log('open');
      },
      // 底部弹出的颜色、尺码选择框  关闭事件
      close() {
        this.showContactUs=false;//客服弹窗
      },
      // 右侧按钮的点击事件处理函数
      buttonClick(e) {
        if (e.content.text === '立即预约') {
          console.log("userInfo======================>>>>>>>>>>>>>>>>>>>>")
          console.log(this.userInfo.userId + '' === 'undefined')
          if (this.userInfo.openId + '' === 'undefined') { //默认只是微信登录
            uni.$showMsg("请先登录，再进行预约哦~")
            setTimeout(() => {
              uni.navigateTo({
                url: '/subpkg/login/login',
                // 页面跳转成功之后的回调函数
                success: () => {
                  // 调用 vuex 的 updateRedirectInfo 方法，把跳转信息存储到 Store 中
                  this.updateRedirectInfo({
                    // 跳转的方式
                    openType: 'navigate',
                    // 从哪个页面跳转过去的
                    from: '/subpkg/ServiceDetails/ServiceDetails'
                  })
                }
              })
            }, 1000)
            return
          }
          uni.navigateTo({
            url:'/subpkg/ServiceOrderChoose/ServiceOrderChoose?order_good_id=' + this.serviceItem.id
          })
        }
      },
      
    }
  };
</script>

<style scoped lang="scss">
  /*每个页面公共css */
  @import '/colorui/main.css';
  @import '/colorui/icon.css';
  @import '/style/FontStyle.css';
  @import 'GoodsAttr.scss';

  .page {
    position: absolute;
    width: 100%;
    // height: 100%;
    background: #f6f6f6;
    overflow-x: hidden;
    // overflow-y: auto;
  }

  .goods-head {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100rpx;
    background: rgba(255, 255, 255, 0);
    /* #ifdef APP-PLUS */
    height: calc(100rpx + var(--status-bar-height));
    /* #endif */
    /* #ifdef MP */
    height: 200rpx;

    /* #endif */
    .back {
      position: absolute;
      left: 0;
      top: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100rpx;
      height: 100%;
      /* #ifdef APP-PLUS */
      padding-top: 50rpx;
      /* #endif */
      /* #ifdef MP */
      padding-top: 100rpx;

      /* #endif */
      // 返回
      .back-one {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 50rpx;
        height: 50rpx;
        background-color: rgba(0, 0, 0, 0.3);
        border-radius: 100%;

        text {
          display: flex;
          width: 20rpx;
          height: 20rpx;
          border-left: 2rpx solid #FFFFFF;
          border-bottom: 2rpx solid #FFFFFF;
          transform: rotate(45deg);
        }
      }

      .action {
        background-color: transparent;

        text {
          border-color: #555555;
        }
      }
    }

    // tab切换
    .head-tab {
      display: flex;
      align-items: center;
      height: 100%;
      /* #ifdef APP-PLUS */
      padding-top: 50rpx;
      /* #endif */
      /* #ifdef MP */
      padding-top: 100rpx;

      /* #endif */
      .tab {
        position: relative;
        margin: 0 20rpx;
        padding: 0 10rpx;

        text {
          color: #555555;
          font-size: 26rpx;
        }
      }

      .action {
        text {
          color: #212121;
          font-size: 28rpx;
        }

        .line {
          position: absolute;
          left: 0;
          bottom: -10rpx;
          width: 100%;
          height: 6rpx;
          background: linear-gradient(to right, $base, rgba(255, 255, 255, 0.3));
        }
      }
    }

    // 分享更多
    .share-more {
      position: absolute;
      right: 0;
      top: 0;
      width: 140rpx;
      height: 100%;
      /* #ifdef APP-PLUS */
      padding-top: 50rpx;
      /* #endif */
      /* #ifdef MP */
      padding-top: 100rpx;

      /* #endif */
      .share-more-one {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-right: 20rpx;
        height: 100%;

        .list {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 50rpx;
          height: 50rpx;
          background-color: rgba(0, 0, 0, 0.3);
          border-radius: 100%;

          text {
            font-size: 28rpx;
            color: #FFFFFF;
          }
        }
      }

      .action {
        .list {
          background-color: transparent;

          text {
            color: #555555;
          }
        }
      }

      .mroe-list {
        position: fixed;
        right: 20rpx;
        top: 100rpx;
        /* #ifdef MP */
        top: 180rpx;
        /* #endif */
        width: 200rpx;
        background-color: rgba(255, 255, 255, 0.9);
        border-radius: 10rpx;

        .list {
          display: flex;
          align-items: center;
          width: 90%;
          height: 80rpx;
          margin: 0 auto;
          border-bottom: 2rpx solid #C8C7CC;
          padding: 0 4%;

          .icon {
            display: flex;
            align-items: center;
            width: 60rpx;

            text {
              font-size: 34rpx;
            }
          }

          .title {
            display: flex;
            align-items: center;

            text {
              font-size: 26rpx;
            }
          }
        }
      }
    }
  }

  /* banner 标题 */
  .banner-title {
    background-color: #FFFFFF;
    padding-bottom: 20rpx;
  }

  /* banner */
  .banner {
    width: 100%;
    height: 750rpx;

    .screen-swiper {
      width: 100%;
      height: 100%;
    }
  }

  /* 价格 */
  .price-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 4%;
    height: 120rpx;

    .price {
      display: flex;
      align-items: center;

      .min {
        color: $base;
        font-size: 28rpx;
        font-weight: bold;
      }

      .max {
        color: $base;
        font-size: 48rpx;
        font-weight: bold;
      }
    }

    .info {
      display: flex;
      align-items: center;
      height: 100%;

      .list {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 0 20rpx;

        text {
          font-size: 24rpx;
          color: #555555;
        }

        .iconfont {
          font-size: 34rpx;
          margin-bottom: 10rpx;
          color: #555555;
        }

        .action {
          color: $base;
        }
      }
    }
  }

  /* 限时抢购 */
  .flash-price {
    display: flex;
    width: 100%;
    height: 100rpx;
    background-color: #FFFFFF;
    // border-radius: 20rpx;
    overflow: hidden;

    .price-item {
      position: relative;
      display: flex;
      width: 70%;
      height: 100%;
      background: linear-gradient(to left, $base, $assist-clor);
      padding: 0 20rpx;
      overflow: hidden;

      .icon-item {
        display: flex;
        align-items: center;
        height: 100%;

        text {
          font-size: 42rpx;
          color: #FFFFFF;
        }
      }

      .price {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-left: 20rpx;

        .current-price {
          display: flex;
          align-items: center;

          // height: 60rpx;
          text {
            color: #FFFFFF;
            font-weight: bold;
          }

          .min {
            font-size: 28rpx;
          }

          .max {
            font-size: 38rpx;
          }
        }

        .original-price {
          display: flex;
          align-items: center;

          text {
            font-size: 24rpx;
            color: #FFFFFF;
            opacity: 0.7;
            text-decoration: line-through;
          }
        }
      }

      .tag {
        position: absolute;
        right: -20rpx;
        bottom: -20rpx;
        transform: rotate(-45deg);

        text {
          font-size: 68rpx;
          color: rgba(0, 0, 0, 0.2);
        }
      }
    }

    .time-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 30%;
      height: 100%;
      background-color: $rgba-05;

      // opacity: 0.5;
      .title {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;

        text {
          color: #FFFFFF;
          font-size: 24rpx;
        }
      }

      .time {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 50rpx;

        .num {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40rpx;
          height: 40rpx;
          font-size: 24rpx;
          color: #FFFFFF;
          background-color: $base;
          border-radius: 10rpx;
        }

        .dot {
          font-size: 24rpx;
          color: $base;
          margin: 0 5rpx;
        }
      }
    }
  }

  /* 标题 */
  .goods-title {
    padding: 0 4%;
    margin: 20rpx auto;

    text {
      font-size: 28rpx;
      color: #212121;
    }
  }

  /* 开通会员 */
  .dredge-vip {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 90%;
    height: 80rpx;
    margin: 20rpx auto;
    background-color: #F5F5DC;
    border-radius: 20rpx;
    overflow: hidden;

    .title {
      display: flex;
      align-items: center;
      height: 100%;
      padding: 0 4%;

      text {
        font-size: 26rpx;
        color: #333333;

        .col {
          color: $base;
          font-weight: bold;
        }
      }

      .iconfont {
        font-size: 34rpx;
        color: #333333;
        margin-right: 20rpx;
      }
    }

    .dredge {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100rpx;
      height: 80rpx;
      background-color: #464C5B;

      text {
        font-size: 24rpx;
        color: #F5F5DC;
        text-align: center;
      }
    }
  }

  /* 优惠 */
  .goods-discounts {
    padding: 0 4%;
    background-color: #FFFFFF;
    border-radius: 20rpx;
    overflow: hidden;
    margin: 20rpx auto;

    .list {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 4%;
      height: 100rpx;
      border-bottom: 2rpx solid #f6f6f6;

      .title {
        display: flex;
        align-items: center;
        width: 15%;
        height: 100%;
        font-size: 24rpx;
        color: #212121;
      }

      .content {
        display: flex;
        align-items: center;
        width: 80%;
        height: 100%;

        >text {
          font-size: 24rpx;
          color: #555555;
        }

        .serve {
          display: flex;
          align-items: center;
          margin-right: 20rpx;

          text {
            font-size: 24rpx;
            color: #555555;
          }

          .iconfont {
            font-size: 26rpx;
            color: $base;
            margin-right: 10rpx;
          }
        }

        .coupon-list {
          position: relative;
          display: flex;
          align-items: center;
          // width: 100rpx;
          height: 30rpx;
          border: 2rpx solid $base;
          border-radius: 6rpx;
          margin-right: 20rpx;

          view {
            display: inline-block;
            padding: 0 5rpx;
            color: $base;
            font-size: 24rpx;
            transform: scale(0.8);
          }
        }

        .coupon-list:before {
          position: absolute;
          left: -10rpx;
          top: 50%;
          content: "";
          width: 12rpx;
          height: 12rpx;
          background-color: #fff;
          border-right: 2rpx solid $base;
          border-radius: 100%;
          transform: translate(0, -50%);
        }

        .coupon-list:after {
          position: absolute;
          right: -10rpx;
          top: 50%;
          content: "";
          width: 12rpx;
          height: 12rpx;
          background-color: #fff;
          border-left: 2rpx solid $base;
          border-radius: 100%;
          transform: translate(0, -50%);
        }
      }

      .more {
        display: flex;
        align-items: center;

        text {
          font-size: 24rpx;
          color: #CCCCCC;
        }
      }
    }
  }

  /* 评价 */
  .evaluate-data {
    padding: 0 4%;
    margin: 20rpx auto;
    background-color: #FFFFFF;
    border-radius: 20rpx;
    overflow: hidden;

    .title-more {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      height: 100rpx;

      .title {
        display: flex;
        align-items: center;
        height: 100%;

        text {
          font-size: 28rpx;
          color: #212121;
          margin-right: 20rpx;
        }

        .num {
          font-size: 24rpx;
        }
      }

      .more {
        display: flex;
        align-items: center;

        text {
          font-size: 26rpx;
          color: #212121;
        }
      }
    }

    .evaluate-list {
      width: 100%;

      .user-info {
        display: flex;
        align-items: center;
        width: 100%;
        height: 80rpx;

        .thumb {
          width: 60rpx;
          height: 60rpx;

          image {
            width: 100%;
            height: 100%;
            border-radius: 100%;
          }
        }

        .nickname-grade {
          height: 60rpx;
          margin-left: 20rpx;

          .nickname {
            display: flex;
            align-items: center;

            text {
              font-size: 24rpx;
              color: #212121;
            }
          }

          .grade {
            display: flex;
            align-items: center;
            margin-top: 6rpx;

            text {
              font-size: 24rpx;
              color: $base;
            }
          }
        }
      }

      .content {
        width: 100%;

        .character {
          display: flex;
          align-items: center;
          padding: 10rpx 0;

          text {
            font-size: 24rpx;
            color: #333333;
          }
        }

        .attr {
          display: flex;
          align-items: center;
          padding: 10rpx 0;

          text {
            font-size: 24rpx;
            color: #CCCCCC;
          }
        }

        .thumb-list {
          display: flex;
          flex-wrap: wrap;
          width: 100%;
          // height: 200rpx;
          margin: 10rpx 0;

          .list {
            width: 200rpx;
            height: 200rpx;
            margin-right: 3%;

            image {
              width: 100%;
              height: 100%;
            }
          }
        }
      }

      .look-all {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 20rpx auto;

        text {
          padding: 10rpx 20rpx;
          font-size: 26rpx;
          color: #212121;
          border: 2rpx solid #f6f6f6;
          border-radius: 40rpx;
        }
      }
    }
  }

  /* 排行榜 */
  .ranking-list {
    padding: 0 4%;
    margin: 20rpx auto;
    background-color: #FFFFFF;
    border-radius: 20rpx;
    overflow: hidden;

    .ranking-title {
      display: flex;
      align-items: center;
      width: 100%;
      height: 80rpx;

      .title {
        font-size: 26rpx;
        color: #212121;
      }
    }

    .goods-list {
      display: flex;
      flex-wrap: wrap;
      width: 100%;

      .list {
        width: 32%;
        height: 360rpx;
        border-radius: 10rpx;
        overflow: hidden;
        margin-right: 2%;

        .thumb {
          width: 100%;
          height: 200rpx;

          image {
            width: 100%;
            height: 100%;
          }
        }

        .title {
          display: flex;
          align-items: center;
          width: 100%;
          height: 80rpx;

          text {
            font-size: 24rpx;
            color: #555555;
          }
        }

        .price {
          display: flex;
          align-items: center;
          width: 100%;
          height: 60rpx;

          text {
            color: $base;
            font-size: 24rpx;
            font-weight: bold;
          }
        }
      }

      .list:nth-child(3n) {
        margin-right: 0;
      }
    }
  }

  /* 商品介绍 */
  .products-introduction {
    padding: 0 4% 100rpx;

    .title {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 80rpx;

      text {
        font-size: 28rpx;
        color: #212121;
        margin: 0 20rpx;
      }
    }

    .title:before {
      content: "";
      width: 100rpx;
      height: 2rpx;
      background-color: #c0c0c0;
    }

    .title:after {
      content: "";
      width: 100rpx;
      height: 2rpx;
      background-color: #c0c0c0;
    }

    .content {
      width: 100%;

      image {
        width: 100%;
      }

      img {
        width: 100%;
      }
    }
  }

  /* 底部 */
  .goods_nav {
    // 为商品导航组件添加固定定位
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
  }


  /* 底部 */
  .page-footer {
    position: fixed;
    left: 0;
    bottom: 0;
    display: flex;
    width: 100%;
    height: 100rpx;
    background-color: #FFFFFF;
    border-top: 2rpx solid #f6f6f6;
    padding: 0 4%;

    .footer-fn {
      display: flex;
      align-items: center;
      width: 40%;
      height: 100%;

      .list {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 50%;
        height: 100%;

        text {
          font-size: 24rpx;
          color: #555555;
        }

        .iconfont {
          font-size: 42rpx;
          color: #212121;
        }
      }
    }

    .footer-buy {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 60%;
      height: 100%;

      .cart-add {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 48%;
        height: 70rpx;
        background: linear-gradient(to right, $base, $assist-clor);
        border-radius: 70rpx;

        text {
          font-size: 26rpx;
          color: #FFFFFF;
        }
      }

      .buy-at {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 48%;
        height: 70rpx;
        background: $change-clor;
        border-radius: 70rpx;

        text {
          font-size: 26rpx;
          color: #FFFFFF;
        }
      }
    }
  }

  // .da{
  // 	position: absolute;
  // 	    height: 100%;
  // 	    width:5px;
  // 	    top: 0;
  // 	    right: -5px;
  // 	    background-image: linear-gradient(to bottom, #eeeeee 5px, transparent 5px, transparent),
  // 	    radial-gradient(10px circle at 5px 10px, transparent 5px, #eeeeee 5px);
  // 	    background-size: 5px 15px;
  // }
</style>
