<template>
  <view class="cart-container" v-if="cart.length !== 0">
    <!-- 顶部导航 -->
    <view>
      <f-navbar title="智慧美业" fontSize="35" fontColor="#fff"
        gradient="linear-gradient(90deg,rgb(255, 0, 0),rgb(170, 0, 255))"></f-navbar>
    </view>
    <!-- 使用自定义的 address 组件 -->
    <my-address></my-address>
    <!-- 购物车商品列表的标题区域 -->
    <view class="cart-title">
      <!-- 左侧的图标 -->
      <uni-icons type="shop" size="18"></uni-icons>
      <!-- 描述文本 -->
      <text class="cart-title-text">购物车</text>
    </view>
    <!-- 商品列表区域 -->
    <!-- uni-swipe-action 是最外层包裹性质的容器   滑动删除功能 -->
    <uni-swipe-action>
      <block v-for="(goods, i) in cart" :key="i">
        <!-- uni-swipe-action-item 可以为其子节点提供滑动操作的效果。需要通过 options 属性来指定操作按钮的配置信息 -->
        <uni-swipe-action-item :right-options="options" @click="swipeActionClickHandler(goods)">
          <!-- <navigator :url="'/subpkg/goods_detail/goods_detail?goods_id=' + goods.goods_id"> -->
            <my-goods :goods="goods" :show-radio="true" :show-num="true" @goto-detail="gotoDetail" @radio-change="radioChangeHandler" @num-change="numberChangeHandler"></my-goods>
          <!-- </navigator> -->
        </uni-swipe-action-item>
      </block>
    </uni-swipe-action>
    <!-- 结算区域 -->
    <my-settle></my-settle>
  </view>
  <!-- 空白购物车区域 -->
  <view class="empty-cart" v-else>
    <image src="/static/cart_empty@2x.png" class="empty-img"></image>
    <text class="tip-text">空空如也~</text>
  </view>
</template>

<script>
  // 导入自己封装的 mixin 模块(用于设置tabBar购物车的徽标)
  import badgeMix from '@/mixins/tabbar-badge.js'
  // 按需导入 mapState 这个辅助函数
  import {
    mapState,
    mapMutations
  } from 'vuex'

  export default {
    // 将 badgeMix 混入到当前的页面中进行使用
    mixins: [badgeMix],
    computed: {
      // 将 m_cart 模块中的 cart 数组映射到当前页面中使用
      ...mapState('m_cart', ['cart']),
    },
    data() {
      return {
        options: [{
          text: '删除', // 显示的文本内容
          style: {
            backgroundColor: '#C00000' // 按钮的背景颜色
          }
        }]
      };
    },
    methods: {
      ...mapMutations('m_cart', ['updateGoodsState', 'updateGoodsCount', 'removeGoodsById']),
      // 商品的勾选状态发生了变化
      radioChangeHandler(e) {
        this.updateGoodsState(e) //调用'm_cart',映射过来的'updateGoodsState'方法
      },
      // 商品的数量发生了变化
      numberChangeHandler(e) {
        this.updateGoodsCount(e)
      },
      // 点击了滑动操作按钮
      swipeActionClickHandler(goods) {
        this.removeGoodsById(goods.goods_id)
      },
      // 点击跳转到商品详情页面
      gotoDetail(goods) {
        uni.navigateTo({
          url: '/subpkg/GoodsDetails/GoodsDetails?goods_id=' + goods.goods_id
        })
      }
    },
  }
</script>

<style lang="scss">
  .cart-container {
    padding-bottom: 50px;
  }

  .actName {
    max-width: 100rpx;
    font-size: 28rpx;
    color: #fff;
    padding-left: 5rpx;
    float: right;
  }

  .cart-title {
    height: 40px;
    display: flex;
    align-items: center;
    font-size: 14px;
    padding-left: 5px;
    border-bottom: 1px solid #efefef;

    .cart-title-text {
      margin-left: 10px;
    }
  }

  .empty-cart {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 150px;

    .empty-img {
      width: 90px;
      height: 90px;
    }

    .tip-text {
      font-size: 12px;
      color: gray;
      margin-top: 15px;
    }
  }
  /* 购物车失效商品列表 */
  .lose-efficacy-list{
    width: 100%;
    background-color: #FFFFFF;
    padding: 0 30rpx;
    margin-top: 30rpx;
    border-radius: 10rpx;
    overflow: hidden;
    .lose-efficacy-title{
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      height: 80rpx;
      .title{
        display: flex;
        align-items: center;
        height: 100%;
        text{
          font-size: 28rpx;
          color: #222222;
        }
      }
      .empty{
        display: flex;
        align-items: center;
        height: 100%;
        text{
          font-size: 26rpx;
          color: $base;
        }
      }
    }
    .list{
      display: flex;
      align-items: center;
      width: 100%;
      height: 240rpx;
      border-bottom: 1px solid #f6f6f6;
      .tag{
        display: flex;
        align-items: center;
        width: 10%;
        height: 100%;
        text{
          padding: 4rpx 10rpx;
          font-size: 24rpx;
          color: #FFFFFF;
          background-color: rgba(0,0,0,0.3);
          border-radius: 20rpx;
        }
      }
      .goods{
        display: flex;
        align-items: center;
        width: 90%;
        height: 100%;
        background-color: #FFFFFF;
        border-radius: 10rpx;
        .pictrue{
          display: flex;
          align-items: center;
          justify-content: center;
          width: 30%;
          height: 100%;
          image{
            width: 160rpx;
            height: 160rpx;
            border-radius: 10rpx;
          }
        }
        .item{
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          width: 70%;
          height: 160rpx;
          .title{
            width: 100%;
            text{
              font-size: 28rpx;
              color: #999999;
            }
          }
          .explain{
            display: flex;
            align-items: center;
            text{
              font-size: 24rpx;
              color: #222222;
            }
          }
        }
      }
    }
  }
  /* 为你推荐 */
  .recommend-info{
    width: 100%;
    background-color: #f2f2f2;
    .recommend-title{
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100rpx;
      .title{
        display: flex;
        align-items: center;
        image{
          width: 416rpx;
          height: 40rpx;
        }
      }
    }
    .goods-list{
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      padding: 0 30rpx;
      .list{
        width: 49%;
        height: 540rpx;
        margin-bottom: 20rpx;
        background-color: #FFFFFF;
        border-radius: 10rpx;
        overflow: hidden;
        .pictrue{
          display: flex;
          justify-content: center;
          width: 100%;
          image{
            height: 350rpx;
          }
        }
        .title-tag{
          // display: flex;
          height: 100rpx;
          padding: 20rpx;
          .tag{
            float: left;
            margin-right: 10rpx;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            white-space: normal;
            font-size: 26rpx;
            line-height: 40rpx;
            text{
              font-size: 24rpx;
              color: #FFFFFF;
              padding: 4rpx 16rpx;
              background: linear-gradient(to right,$base,$change-clor);
              border-radius: 6rpx;
              margin-right: 10rpx;
            }
          }
        }
        .price-info{
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          padding: 0 20rpx;
          height: 80rpx;
          .user-price{
            display: flex;
            align-items: center;
            text{
              color: $price-clor;
            }
            .min{
              font-size: 24rpx;
            }
            .max{
              font-size: 32rpx;
            }
          }
          .vip-price{
            display: flex;
            align-items: center;
            image{
              width: 26rpx;
              height: 26rpx;
              margin-right: 10rpx;
            }
            text{
              color: #fcb735;
              font-size: 24rpx;
            }
          }
        }
      }
    }
  }
  
  
</style>
