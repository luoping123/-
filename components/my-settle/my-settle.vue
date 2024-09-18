<template>
  <!-- 最外层的容器 -->
  <view class="my-settle-container">
    <!-- 全选区域 -->
    <label class="radio" @click="changeAllState">
      <radio color="#C00000" :checked="isFullCheck" /><text>全选</text>
    </label>

    <!-- 合计区域 -->
    <view class="amount-box">
      合计:<text class="amount">￥{{checkedGoodsAmount}}</text>
    </view>

    <!-- 结算按钮 -->
    <view class="btn-settle" @click="settlement">结算({{checkedCount}})</view>
  </view>
</template>

<script>
  import {
    mapState,
    mapGetters,
    mapMutations
  } from 'vuex'

  export default {
    computed: {
      ...mapState('m_user', ['userInfo', 'token', 'address']),
      ...mapGetters('m_user', ['addstr']),
      ...mapState('m_cart', ['cart']),
      ...mapGetters('m_cart', ['total', 'checkedCount', 'checkedGoodsAmount']),

      // 是否全选
      isFullCheck() {
        return this.total === this.checkedCount
      },
    },
    data() {
      return {
        // 倒计时的秒数
        seconds: 3,
        // 定时器的 Id
        timer: null
      }
    },
    methods: {
      // 把 m_user 模块中的 updateRedirectInfo 方法映射到当前页面中使用
      ...mapMutations('m_user', ['updateRedirectInfo']),
      // 展示倒计时的提示消息
      showTips(n) {
        // 调用 uni.showToast() 方法，展示提示消息
        uni.showToast({
          // 不展示任何图标
          icon: 'none',
          // 提示的消息
          title: '请登录后再结算！' + n + ' 秒后自动跳转到登录页',
          // 为页面添加透明遮罩，防止点击穿透
          mask: true,
          // 1.5 秒后自动消失
          duration: 1500
        })
      },
      // 延迟导航到 my 页面
      delayNavigate() {
        // 把 data 中的秒数重置成 3 秒
        this.seconds = 3
        this.showTips(this.seconds)
        //  将定时器的 Id 存储到 timer 中
        this.timer = setInterval(() => {
          this.seconds--
          //  判断秒数是否 <= 0
          if (this.seconds <= 0) {
            // 清除定时器
            clearInterval(this.timer)
            //  跳转页面
            uni.navigateTo({
              url: '/subpkg/login/login',
              // 页面跳转成功之后的回调函数
              success: () => {
                // 调用 vuex 的 updateRedirectInfo 方法，把跳转信息存储到 Store 中
                this.updateRedirectInfo({
                  // 跳转的方式
                  openType: 'navigate',
                  // 从哪个页面跳转过去的
                  from: '/pages/cart/cart'
                })
              }
            })
            //  终止后续代码的运行（当秒数为 0 时，不再展示 toast 提示消息）
            return
          }
          this.showTips(this.seconds)
        }, 1000)
      },
      //使用 mapMutations 辅助函数，把 m_cart 模块提供的 updateAllGoodsState 方法映射到当前组件中使用
      ...mapMutations('m_cart', ['updateAllGoodsState']),
      // label 的点击事件处理函数
      changeAllState() {
        // 修改购物车中所有商品的选中状态
        // !this.isFullCheck 表示：当前全选按钮的状态取反之后，就是最新的勾选状态
        this.updateAllGoodsState(!this.isFullCheck)
      },
      // 点击了结算按钮
      async settlement() {
        // 1. 先判断是否勾选了要结算的商品
        if (!this.checkedCount) return uni.$showMsg('请选择要结算的商品！')

        // 2. 再判断用户是否选择了收货地址
        if (!this.addstr) return uni.$showMsg('请选择收货地址！')

        // 3. 最后判断用户是否登录了
        if (!this.token) return this.delayNavigate()
        // if (this.userInfo.userId === null || this.userInfo.openId === null) {
        //   uni.$showMsg("请先登录，再进行购买哦~")
        //   setTimeout(() => {
        //     uni.navigateTo({
        //       url: '/subpkg2/login/login'
        //     })
        //   }, 1500)
        //   return;
        // }
        let redisKey = this.token + ';' + uni.$getDateTime(new Date());
        //组织商品订单 对象
        const goodsOrder = {
          userId: this.userInfo.userId, //普通用户id
          openId: this.userInfo.openId, //微信登录id
          goods: this.cart.filter(x => x.goods_state).map(x => ({
            id: x.goods_id,
            name: x.goods_name,
            price: x.goods_price,
            goodsNum: x.goods_count,
            imageSrc: x.goods_small_logo,
            attribute: x.goods_attribute
          }))[0],
          goodsList: this.cart.filter(x => x.goods_state).map(x => ({
            id: x.goods_id,
            name: x.goods_name,
            price: x.goods_price,
            goodsNum: x.goods_count,
            imageSrc: x.goods_small_logo,
            attribute: x.goods_attribute
          })),
          priceSum: this.checkedGoodsAmount,
          freight: 0, //运费暂时为0
          redisKey: redisKey //redis key
        }
        // 发起请求  将当前订单信息存入服务器的Redis数据库中，并设置5分钟的有效时长，当该页面hide（）时，删除数据
        console.log("goodsOrder==================================>>>>>>>>>>>>>")
        console.log(goodsOrder) //（dto）
        const {
          data: res
        } = await uni.$http.post('/goodsOrder/saveGoodsOrderToRedis', goodsOrder)
        //  请求失败
        if (res.status !== 200) return uni.$showMsg()
        // 请求成功
        setTimeout(() => {
          uni.navigateTo({
            url: '/subpkg/ConfirmOrder/ConfirmOrder?redisKey=' + redisKey
          })
        }, 1000)
      },
    },
  }
</script>

<style lang="scss">
  .my-settle-container {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
    // 将背景色从 cyan 改为 white
    background-color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 5px;
    font-size: 14px;

    .radio {
      display: flex;
      align-items: center;
    }

    .amount {
      color: #c00000;
    }

    .btn-settle {
      height: 50px;
      min-width: 100px;
      background-color: #c00000;
      color: white;
      line-height: 50px;
      text-align: center;
      padding: 0 10px;
    }
  }
</style>
