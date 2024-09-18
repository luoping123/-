<template>
  <view class="goods-item">
    <!-- 商品左侧图片区域 -->
    <view class="goods-item-left">
      <image @click="gotoDetailClickHandler" :src="goods.imageSrc || defaultPic" class="goods-pic"></image>
    </view>
    <!-- 商品右侧信息区域 -->
    <view class="goods-item-right">
      <!-- 商品标题 -->
      <view class="goods-name" @click="gotoDetailClickHandler">{{goods.name}}</view>
      <view style="margin-top: 50rpx;">
          <!-- 商品价格 -->
          <view class="goods-price">￥{{goods.price }}</view>
      </view>
      <view class="goods-info-box">
        <!-- 加入购物车  立即购买 -->
        <view style="display: flex;justify-content: flex-start;">
          <view class="addToCartCss" @click="btnAddToCart()">加入购物车</view>
          <view class="buyCss" @click="btnBuyNow()">立即购买</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  // 从 vuex 中按需导出 mapState 辅助方法
  import {mapState, mapMutations,mapGetters} from 'vuex'
  export default {
    // 定义 props 属性，用来接收外界传递到当前组件的数据
    props: {
      // 商品的信息对象
      goods: {
        type: Object,
        defaul: {},
      }
    },
    data() {
      return {
        // 默认的空图片
        defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png',
      }
    },
    methods: {
      // 把 m_cart 模块中的 addToCart 方法映射到当前页面使用
      ...mapMutations('m_cart', ['addToCart']),
      // radio 组件的点击事件处理函数
      radioClickHandler() {
        // 通过 this.$emit() 触发外界通过 @ 绑定的 radio-change 自定义事件，
        // 同时把商品的 Id 和 勾选状态 作为参数传递给 radio-change 事件处理函数
        this.$emit('radio-change', {
          // 商品的 Id
          goods_id: this.goods.goods_id,
          // 商品最新的勾选状态
          goods_state: !this.goods.goods_state
        })
      },
      //加入购物车  单击事件
      btnAddToCart(){
        // 组织一个商品的信息对象
        const goods = {
          goods_id: this.goods.id, // 商品的Id
          goods_name: this.goods.name, // 商品的名称
          goods_price: this.goods.price, // 商品的价格
          goods_count: 1, // 商品的数量
          goods_small_logo: this.goods.imageSrc, // 商品的图片
          goods_state: true // 商品的勾选状态
        }
        console.log("加入购物车")
        console.log(goods)
        //  通过 this 调用映射过来的 addToCart 方法，把商品信息对象存储到购物车中
        this.addToCart(goods)
        uni.$showMsg("加入成功")
      },
      //立即购买 单击事件
      btnBuyNow(){
        uni.navigateTo({
          url: '/subpkg/GoodsDetails/GoodsDetails?goods_id='+this.goods.id
        })
      },
      gotoDetailClickHandler(){
          uni.navigateTo({
            url: '/subpkg/GoodsDetails/GoodsDetails?goods_id='+this.goods.id
          })
      }
    }
  }
</script>

<style lang="scss">
  .goods-item {
    // 让 goods-item 项占满整个屏幕的宽度
    width: 750rpx;
    // 设置盒模型为 border-box
    box-sizing: border-box;
    display: flex;
    padding: 10px 5px;
    border-bottom: 1px solid #f0f0f0;

    .goods-item-left {
      margin-right: 5px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .goods-pic {
        width: 140px;
        height: 120px;
        display: block;
      }
    }

    .goods-item-right {
      display: flex;
      flex: 1;
      flex-direction: column;
      justify-content: space-between;

      .goods-name {
        font-size: 13px;
      }

      .goods-info-box {
        display: flex;
        align-items: center;
        justify-content: flex-end;
      }

      .goods-price {
        font-size: 16px;
        color: #c00000;
      }
    }
  }
  .addToCartCss{
    margin-bottom: 15rpx;
    font-size: 26rpx;
    padding: 10rpx 30rpx;
    background-color: #ff0000;
    color: #FFFFFF;
    text-align: center;
    border-radius: 30rpx 0rpx 0rpx 30rpx;
  }
  .buyCss{
    margin-bottom: 15rpx;
    font-size: 26rpx;
    padding: 10rpx 30rpx;
    background-color: #ffa200;
    color: #FFFFFF;
    text-align: center;
    border-radius:  0rpx 30rpx 30rpx 0rpx ;
  }
</style>
