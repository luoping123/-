<template>
  <view class="page">
    <!-- 地址 -->
    <!-- 使用自定义的 address 组件 -->
    <my-address></my-address>
    <!-- 商品 -->
    <view class="goods-data">
      <view class="goods-title">
        <text>商品信息</text>
      </view>
      <!-- 商品信息列表 -->
      <view class="goods-list">
        <view class="list" v-for="(item,index) in goodsDtoList" :key="index">
          <view class="thumb">
            <image :src="item.imageSrc" mode=""></image>
          </view>
          <view class="item">
            <view class="title">
              <text class="name one-omit">{{item.name}}</text>
              <text class="attr">{{item.attribute}}</text>
            </view>
            <view class="price-number">
              <view class="price">
                <text class="min">￥</text>
                <text class="max">{{item.price}}</text>
                <!-- <text class="min">.00</text> -->
              </view>
              <view class="number">
                <!-- x1  x2 -->
                <text>x {{item.goodsNum || 1}}</text> 
              </view>
            </view>
            <!-- <view class="tag">
							<text>支持七天无理由退货</text>
						</view> -->
          </view>
        </view>
      </view>
      <view class="delivery">
        <div class="list">
          <view class="title">配送</view>
          <view class="content">
            <text>快递运输</text>
            <text class="iconfont icon-more"></text>
          </view>
        </div>
        <div class="list">
          <view class="title">运费险</view>
          <view class="content">
            <text>商家赠送</text>
            <!-- <text class="iconfont icon-check"></text> -->
          </view>
        </div>
        <div class="list">
          <view class="title">留言</view>
          <view class="content">
            <input type="text" v-model="remark" placeholder="选填,建议先和商家沟通确认">
          </view>
        </div>
      </view>
    </view>
    <!-- 优惠 -->
    <view class="discounts-data">
      <view class="discounts">
        <!-- <div class="list" @click="$refs['InvoiceInfo'].show()">
          <view class="title">发票</view>
          <view class="content">
            <text>不开发票</text>
            <text class="iconfont icon-more"></text>
          </view>
        </div> -->
        <!-- <div class="list" @click="$refs['UseCoupon'].show()">
          <view class="title">优惠券</view>
          <view class="content">
            <text>无可用</text>
            <text class="iconfont icon-more"></text>
          </view>
        </div> -->
      </view>
    </view>
    <!-- 订单金额 -->
    <view class="order-price">
      <view class="price-list">
        <view class="list">
          <view class="title">
            <text>商品金额</text>
          </view>
          <view class="price">
            <text>￥{{goodsOrderDto.priceSum}}</text>
          </view>
        </view>
        <view class="list">
          <view class="title">
            <text>会员折扣</text>
          </view>
          <view class="price">
            <!-- 目前9折，后续可根据会员等级，动态修改 -->
            <text>-￥{{parseFloat(goodsOrderDto.priceSum*0.1).toFixed(2)}}</text>
          </view>
        </view>
        <view class="list">
          <view class="title">
            <text>运费</text>
          </view>
          <view class="price">
            <text class="highlight">+￥{{goodsOrderDto.freight}}</text>
          </view>
        </view>
        <view class="list">
          <view class="title">
            <text>运费险</text>
          </view>
          <view class="price">
            <text class="highlight">+￥0.00</text>
          </view>
        </view>
      </view>
    </view>
    <!-- 地址提示 -->
    <view class="address-tips" :style="scrollTop >= 100 ? '':'display:none'">
      <text>{{addstr}}</text>
    </view>
    <!-- 底部合计提交 -->
    <view class="footer-submit">
      <view class="price">
        <text class="min">￥</text>
        <text class="max">{{realPrice}}</text>
        <!-- <text class="min">.00</text> -->
      </view>
      <view class="submit" @click="onSubmit">
        <text>提交订单</text>
      </view>
    </view>
    <!-- 发票 -->
    <!-- <invoice-info ref="InvoiceInfo"></invoice-info> -->
    <!-- 优惠券 -->
    <!-- <use-coupon ref="UseCoupon"></use-coupon> -->
  </view>
</template>

<script>
  // 按需导入mapState, mapMutations, mapGetters 辅助函数
  import { mapState, mapMutations, mapGetters } from 'vuex'
  
  // import InvoiceInfo from '../../components/InvoiceInfo/InvoiceInfo.vue';
  // import UseCoupon from '../../components/UseCoupon/UseCoupon.vue'
  export default {
    components: {
      // 发票
      // InvoiceInfo,
      // 优惠券
      // UseCoupon,
    },
    data() {
      return {
        scrollTop: 0,
        goodsOrderDto:{},//商品订单对象
        goodsOrder:{},//商品订单对象
        goodsDtoList:[],//商品列表
        goodsDto:{},//商品对象
        coupon:{},//优惠券对象
        remark:'',//留言（备注）
        redisKey:'',//订单信息在redis数据库中的key
      };
    },
    computed: {
      // 2.2 把 m_user 模块中的 address 对象映射当前组件中使用，代替 data 中 address 对象
      ...mapState('m_user', ['userInfo','token','address']),
      // 将 m_user 模块中的 addstr 映射到当前组件中使用
      ...mapGetters('m_user', ['addstr']),
      realPrice(){//实际需付款
        return parseFloat(this.goodsOrderDto.priceSum*0.9+this.goodsOrderDto.freight).toFixed(2) 
      },
    },
    onLoad(param){
      this.redisKey=param.redisKey || 0;
      this.getGoodsOrderFromRedis(this.redisKey);
      setTimeout(()=>{
        // uni.$showMsg("请检查订单信息，并提交")
      },1500)
    },
    onPageScroll(e) {
      this.scrollTop = e.scrollTop;
    },
    methods: {
      async getGoodsOrderFromRedis(redisKey){
        // 发起请求  将从服务器的Redis数据库中获取订单信息（dto）
        const { data: res } = await uni.$http.get('/goodsOrder/getGoodsOrderFromRedis',{"redisKey":this.redisKey})
        //  请求失败
        if (res.status !== 200) return uni.$showMsg()
        console.log("goodsOrder   res==============>>>>>>>>>>>")
        console.log(res.data)//goodsOrderDto
        this.goodsOrderDto=res.data;
        const tempGoodsOrder={//重构商品订单对象
          id:res.data.id,
          goodsOrderId:res.data.goodsOrderId,
          userId:res.data.userId,
          openId:res.data.openId,
          goodsIdList:'',
          remark:res.data.remark,
          intergralSum:res.data.intergralSum,
          priceSum:res.data.priceSum,
          realPrice:res.data.realPrice,
          useCoupon:res.data.useCoupon,
          orderStatus:res.data.orderStatus,
          payType:res.data.payType,
          payTime:res.data.payTime,
        }
        this.goodsOrder=tempGoodsOrder;
        this.goodsDto= res.data.goods || {};//goodsDto
        this.goodsDtoList=res.data.goodsList || [];//goodsListDto
        if(this.goodsDtoList.length===0){
          this.goodsDtoList[0]=this.goodsDto;
        }
      },
      /**
       * 提交订单
       */
      async onSubmit() {
        var goodsIdList='';
        for(var goods in this.goodsDtoList){
          goodsIdList+=(goods.id || goods.goods_id) + ';'
        }
        console.log("goodsIdList======================>>>>>>>>>>")
        console.log(goodsIdList)
        this.goodsOrder.userId=this.userInfo.userId;
        this.goodsOrder.openId=this.userInfo.openId;
        this.goodsOrder.goodsIdList=goodsIdList;
        this.goodsOrder.remark=this.remark;
        this.goodsOrder.intergralSum=parseFloat(this.realPrice).toFixed(0);
        this.goodsOrder.realPrice=this.realPrice;
        this.goodsOrder.orderStatus='待付款';
        this.goodsOrder.createTime=uni.$getDateTime(new Date());
        this.goodsOrder.receiverName = this.address.userName;
        this.goodsOrder.receiverAddress = this.addstr;
        this.goodsOrder.receiverPhone = this.address.telNumber;
        
        
        console.log("goodsOrder======================>>>>>>>>>>")
        console.log(this.goodsOrder)
        
        console.log("goodsDtoList======================>>>>>>>>>>")
        console.log(this.goodsDtoList)//dto
        // const saveParams={
        //   "goodsOrder":goodsOrder,
        //   "goodsList":this.goodsList
        // }
        // 发起请求  存储初次订单信息  并将订单中的商品信息存入redis，等支付后，存储到mysql 的中间表中
        const goodsOrderAndDtoList={
          "goodsOrder":this.goodsOrder,
          "goodsDtoList":this.goodsDtoList
        }
        const { data: res } = await uni.$http.post('/goodsOrder/saveGoodsOrder',goodsOrderAndDtoList)
        //  请求失败
        if (res.status !== 200) return uni.$showMsg()
        console.log(res.data)
        uni.redirectTo({
          url: '/subpkg/CashierDesk/CashierDesk?goodsOrderId=' +res.data +'&realPrice=' + this.realPrice,
        })
      },
      /**
       * 跳转点击
       * @param {String} type 跳转类型
       */
      onSkip(type) {
        switch (type) {
          case 'address':
            uni.navigateTo({
              url: '/subpkg/AddressList/AddressList',
            })
            break;
        }
      },
      //当从该页面切换出去时，设置redis中的该订单数据失效
      async deleteGoodsOrderToRedis(){
        let key=this.token+';'+this.goods.id+'';
        // 发起请求  将服务器的Redis数据库中当前订单信息设置失效
        const { data: res } = await uni.$http.delete('/goodsOrder/deleteGoodsOrderToRedis',{"redisKey":this.redisKey})
        //  请求失败
        if (res.status !== 200) return uni.$showMsg()
      },
    },
    //当从该页面切换出去时，设置redis中的该订单数据失效
    onHide(){
      this.deleteGoodsOrderToRedis();
    },
  }
</script>

<style scoped lang="scss">
  /*每个页面公共css */
  @import '/colorui/main.css';
  @import '/colorui/icon.css';
  @import '/style/FontStyle.css';

  .page {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    // height: 100%;
    background-color: #f6f6f6;
    padding-bottom: 180rpx;
  }

  /* 地址 */
  .address-data {
    position: relative;
    padding: 10rpx 4%;
    background-color: #FFFFFF;
    border-radius: 0 0 20rpx 20rpx;
    overflow: hidden;

    .bar {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 10rpx;
      background-color: #CCCCCC;
      background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);
      background-size: 72rpx 72rpx;
    }

    .address-list {
      width: 100%;

      .list {
        display: flex;
        align-items: center;
        width: 100%;
        height: 60rpx;

        text {
          font-size: 24rpx;
          color: #555555;
          margin-right: 10rpx;
        }

        .address {
          font-size: 32rpx;
          color: #222222;
        }

        .tips {
          color: $base;
        }
      }
    }
  }

  /* 商品 */
  .goods-data {
    padding: 10rpx 4%;
    background-color: #FFFFFF;
    border-radius: 20rpx;
    margin: 20rpx auto;

    .goods-title {
      display: flex;
      align-items: center;
      width: 100%;
      height: 80rpx;

      text {
        font-size: 26rpx;
        color: #222222;
      }
    }

    .goods-list {
      width: 100%;

      .list {
        display: flex;
        align-items: center;
        width: 100%;
        height: 200rpx;

        .thumb {
          display: flex;
          align-items: center;
          width: 30%;
          height: 100%;

          image {
            width: 160rpx;
            height: 160rpx;
            border-radius: 10rpx;
          }
        }

        .item {
          width: 70%;
          height: 160rpx;

          .title {
            display: flex;
            flex-direction: column;
            // justify-content: center;
            width: 100%;
            height: 80rpx;

            .name {
              font-size: 28rpx;
              color: #222222;
            }

            .attr {
              font-size: 24rpx;
              color: #C0C0C0;
            }
          }

          .price-number {
            display: flex;
            align-items: center;
            // justify-content: space-between;
            justify-content: flex-end;
            width: 100%;
            height: 60rpx;

            .price {
              display: flex;
              align-items: center;

              text {
                color: $base;
                font-weight: bold;
              }

              .min {
                font-size: 26rpx;
              }

              .max {
                font-size: 32rpx;
              }
            }

            .number {
              display: flex;
              align-items: center;

              text {
                font-size: 26rpx;
                color: #222222;
              }
            }
          }

          .tag {
            display: flex;
            align-items: center;
            width: 100%;
            height: 40rpx;

            text {
              padding: 2rpx 12rpx;
              color: $base;
              border: 2rpx solid $base;
              border-radius: 40rpx;
              font-size: 24rpx;
            }
          }
        }
      }
    }

    .delivery {
      width: 100%;

      .list {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height: 80rpx;

        .title {
          font-size: 26rpx;
          color: #555555;
        }

        .content {
          display: flex;
          align-items: center;
          height: 40rpx;

          text {
            font-size: 26rpx;
            color: #222222;
          }

          .iconfont {
            // font-size: 24rpx;
            margin-top: 6rpx;
            margin-left: 10rpx;
          }

          .icon-check {
            font-size: 34rpx;
          }

          input {
            height: 80%;
            font-size: 26rpx;
            color: #222222;
            text-align: right;
          }
        }
      }
    }
  }

  /* 优惠 */
  .discounts-data {
    width: 100%;
    margin: 20rpx auto;
    background-color: #FFFFFF;
    border-radius: 20rpx;

    .discounts {
      padding: 0 4%;

      .list {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height: 80rpx;

        .title {
          font-size: 26rpx;
          color: #555555;
        }

        .content {
          display: flex;
          align-items: center;
          height: 40rpx;

          text {
            font-size: 26rpx;
            color: #222222;
          }

          .iconfont {
            // font-size: 24rpx;
            margin-top: 6rpx;
            margin-left: 10rpx;
          }

          .icon-check {
            font-size: 34rpx;
          }

          input {
            height: 80%;
            font-size: 26rpx;
            color: #222222;
            text-align: right;
          }
        }
      }
    }
  }

  /**
	 * 地址提示
	 */
  .address-tips {
    position: fixed;
    left: 0;
    bottom: 100rpx;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 60rpx;
    padding: 0 4%;
    background-color: #fef2ce;

    text {
      font-size: 26rpx;
      color: #fbbd08;
    }
  }

  /* 订单金额 */
  .order-price {
    width: 100%;
    margin: 20rpx auto;
    background-color: #FFFFFF;
    border-radius: 20rpx;

    .price-list {
      padding: 0 4%;

      .list {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height: 80rpx;

        .title {
          display: flex;
          align-items: center;

          text {
            font-size: 26rpx;
            color: #555555;
          }
        }

        .price {
          display: flex;
          align-items: center;

          text {
            font-size: 26rpx;
            font-weight: bold;
            color: #222222;
          }

          .highlight {
            color: $base;
          }
        }
      }
    }
  }

  /* 顶部合计提交 */
  .footer-submit {
    position: fixed;
    left: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 100rpx;
    background-color: #FFFFFF;
    padding: 0 4%;

    .price {
      display: flex;
      align-items: flex-end;

      text {
        font-weight: bold;
        color: $base;
      }

      .min {
        font-size: 32rpx;
      }

      .max {
        font-size: 48rpx;
      }
    }

    .submit {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 200rpx;
      height: 70rpx;
      background-color: $base;
      border-radius: 70rpx;

      text {
        font-size: 26rpx;
        color: #FFFFFF;
      }
    }
  }
</style>
