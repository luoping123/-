<template>
	<view class="orderDatail">
		<!-- <navbar :showBack="true" backgroundColor="#e93323" color="#ffffff">订单详情</navbar> -->
		<view class="header bg-color acea-row row-middle">
			<view class="data">
				<view class="state">{{goodsOrder.orderStatus}}</view>
				<view><text class="time">{{goodsOrder.createTime}}</text></view>
			</view>
		</view>
		<view>
			<view class="nav">
				<view class="navCon acea-row row-between-wrapper">
					<!-- <view :class="goodsOrder.orderStatus=='待付款'?'on':''">待付款</view>
					<view :class="goodsOrder.orderStatus!=='待付款'?'on':''">{{goodsOrder.orderStatus}}</view> -->
				</view>
				<view class="progress acea-row row-between-wrapper">
          <u-steps :current="OrderStatusSteps">
          		<u-steps-item title="待付款" ></u-steps-item>
          		<u-steps-item title="待发货" ></u-steps-item>
          		<u-steps-item title="待收货" ></u-steps-item>
              <u-steps-item title="待评价" ></u-steps-item>
              <u-steps-item title="已完成" ></u-steps-item>
          	</u-steps>
					<!-- <view class="iconfont" :class="goodsOrder.orderStatus=='待付款'?'icon-webicon318 font-color':'icon-yuandianxiao'"></view>
					<view class="line"></view>
					<view class="iconfont" :class="goodsOrder.orderStatus=='待发货'?'icon-webicon318 font-color':'icon-yuandianxiao'"></view>
					<view class="line"></view>
					<view class="iconfont" :class="goodsOrder.orderStatus=='待收货'?'icon-webicon318 font-color':'icon-yuandianxiao'"></view>
					<view class="line"></view>
					<view class="iconfont" :class="goodsOrder.orderStatus=='待评价'?'icon-webicon318 font-color':'icon-yuandianxiao'"></view>
					<view class="line"></view>
					<view class="iconfont" :class="goodsOrder.orderStatus=='已完成'?'icon-webicon318 font-color':'icon-yuandianxiao'"></view> -->
				</view>
			</view>
			<view class="address">
				<view class="name">
					{{goodsOrder.receiverName}}<text class="phone">{{goodsOrder.receiverPhone}}</text>
				</view>
				<view>{{goodsOrder.receiverAddress}}</view>
			</view>
      <view class="text-wuliu" v-if="goodsOrder.orderStatus == '待收货'" @click="gotoWuLiu()">查看物流信息</view>
			<view class="line"><image src="/static/images/line.jpg" mode=""></image></view>
		</view>
    <view class="goods-list" style="padding: 30rpx;">
      <view class="list" v-for="(item,index) in goodsOrder.goodsVoList" :key="index">
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
		<view class="orderGoods">
			<view class="total">共{{goodsOrder.sumNumber}}件商品</view>
			<view class="goodWrapper">
				<navigator url="" class="item acea-row row-between-wrapper" v-for="(item,index) in list.goodsVoList" :key="index">
					<view class="pic"><image :src="item.imageSrc" mode=""></image></view>
					<view class="text">
						<view class="acea-row row-between-wrapper">
							<view class="name line1">{{item.name}}</view>
							<view class="num">x {{item.number}}</view>
						</view>
						<view class="attr line1">{{item.attribute}}</view>
						<view class="money font-color">￥{{item.price}}</view>
						<!-- <navigator :url="item.is_reply==1?'':('/pages/pack/order_rate/order_rate?unique='+item.unique)" v-if="list.paid==1&&list.status==2" class="evaluate">{{item.is_reply==1?'已评价':'评价'}}</navigator> -->
					</view>
				</navigator>
			</view>
		</view>
		<view class="wrapper">
			<view class="item acea-row row-between">
				<view>订单编号：</view>
				<view class="conter acea-row row-middle row-right">
					{{goodsOrderId}}
					<!-- <text class="copy" @click="copy(goodsOrderId)">复制</text> -->
				</view>
			</view>
			<view class="item acea-row row-between">
				<view>下单时间：</view>
				<view class="conter acea-row row-middle row-right">
					{{goodsOrder.createTime}} 
				</view>
			</view>
			<view class="item acea-row row-between">
				<view>支付状态：</view>
				<view class="conter acea-row row-middle row-right">
					{{goodsOrder.orderStatus}}
				</view>
			</view>
			<view class="item acea-row row-between">
				<view>支付方式：</view>
				<view class="conter acea-row row-middle row-right">
          {{goodsOrder.payType}}
					<!-- {{list.pay_type | getType}} -->
				</view>
			</view>
		</view>
		<view class="wrapper">
			<view class="item acea-row row-between">
				<view>支付金额：</view>
				<view class="conter acea-row row-middle row-right">
					￥{{goodsOrder.realPrice}}
				</view>
			</view>
			<!-- <view class="item acea-row row-between">
				<view>优惠券抵扣：</view>
				<view class="conter acea-row row-middle row-right">
					-￥{{goodsOrder.coupon_price}}
				</view>
			</view> -->
			<!-- <view class="item acea-row row-between" v-show="list.deduction_price != 0">
				<view>积分抵扣：</view>
				<view class="conter acea-row row-middle row-right">
					-￥{{goodsOrder.deduction_price}}
				</view>
			</view> -->
			<view class="item acea-row row-between">
				<view>运费：</view>
				<view class="conter acea-row row-middle row-right">
          免运费
					<!-- ￥{{goodsOrder.pay_postage}} -->
				</view>
			</view>
			<view class="actualPay acea-row row-right">
				实付款：
				<text class="money font-color">￥{{goodsOrder.realPrice}}</text>
			</view>
		</view>
		<view style="height: 100rpx;"></view>
		<view class="footer acea-row row-right row-middle" v-if="list.paid==0">
			<view class="qs-btn" @click.stop="orderCancel(goodsOrderId)">取消订单</view>
			<view class="bnt bg-color" @click.stop="openPay(goodsOrderId)">立即付款</view>
		</view>
		<!-- <view class="footer acea-row row-right row-middle" v-if="list.paid==1&&(list.status==2||list.status==3)">
			<navigator :url="'/pages/pack/order_refund/order_refund?uni='+order_id" class="qs-btn" >申请退款</navigator>
			<view class="bnt bg-color" @click.stop="buyAgain">再次购买</view>
		</view> -->
		<!-- <payType-window :show="showPay" :showIcon="false" :payType="payType" @close="closePay" @changeType="changeType"></payType-window> -->
	</view>
</template>

<script>
	// import api from "@/api/api.js";
	export default{
		data(){
			return{
				goodsOrder:{},
				showPay:false,
				goodsOrderId:'',
				startOnShow:false
			}
		},
		onLoad(params) {
      console.log(params.goodsOrderId)
      this.goodsOrderId = params.goodsOrderId || 0;
      this.getDetail(this.goodsOrderId);
		},
		onShow() {
			console.log()
			if(this.startOnShow){
				let goodsOrderId = this.goodsOrderId;
				this.getDetail(goodsOrderId)
			}
		},
    computed:{
      OrderStatusSteps(){
        var current=0;
        switch(this.goodsOrder.orderStatus){
          case '待付款':
            current=0;
            break;
          case '待发货':
            current=1;
            break;
          case '待收货':
            current=2;
            break;
          case '待评价':
            current=3;
            break;
          case '已完成':
            current=4;
            break;
        }
        return current;
      }
    },
		methods:{
			async getDetail(goodsOrderId){
				const { data: res } = await uni.$http.get('/goodsOrder/getGoodsOrderByOrderId',{"goodsOrderId":goodsOrderId})
				// 请求失败
				if (res.status !== 200) return uni.$showMsg()
        console.log(res.data);
        this.goodsOrder=res.data;
			},
      //查看物流详细信息
      gotoWuLiu(){
        uni.navigateTo({
          url:'/subpkg/WuLiu/WuLiu?postalNumber=' + this.goodsOrder.postalNumber
        })
      },
			copy(w){
				// uni.setClipboardData({
				// 	data:w,
				// 	success() {
				// 		uni.showToast({
				// 			title:"复制成功",
				// 			icon:"none"
				// 		})
				// 	}
				// })
			},
			orderCancel(id){ // 取消订单
				// const that = this;
				// uni.showModal({
				// 	title:"是否删除？",
				// 	success(e) {
				// 		if(e.confirm){
				// 			api.order.orderCancel(id).then(e=>{
				// 				uni.showToast({
				// 					title:e.msg,
				// 					icon:"none"
				// 				})
				// 				if(e.status == 200){
				// 					uni.navigateBack({})
				// 				}
				// 			})
				// 		}
				// 	}
				// })
			},
			changeType:function(paytype){ // 跟换支付方式
				// let order_id = this.order_id;
				// let from = "weixin";
				// const that = this;
				// api.order.orderPay(order_id,paytype,from).then(e=>{
				// 	uni.showToast({
				// 		title:e.msg,
				// 		icon:"none"
				// 	})
				// 	if(e.status == 200){
				// 		that.getDetail(order_id)
				// 	}
				// })
			}, 
			buyAgain:function(){ //再次下单
				// let order_id = this.order_id;
				// api.order.orderAgain(order_id).then(e=>{
				// 	console.log(e.status)
				// 	if(e.status == 200){
				// 		uni.navigateTo({
				// 			url:"/pages/pack/order_confirm/order_confirm?id="+e.data.cateId
				// 		})
				// 	}
				// })
			},
			openPay:function(id){
				this.order_id = id;
				this.showPay = true
			},
			closePay:function(){
				this.showPay = false
			}
		}
	}
</script>

<style lang="scss">
  @import "uview-ui/index.scss";
  @import "/colorui/iconfont.css";
  view {
  	box-sizing: border-box;
  }
  
  image {
  	width: 100%;
  	height: 100%;
  }
  
  .iconfont {
  	font-family: "iconfont" !important;
  	font-size: 16px;
  	font-style: normal;
  	-webkit-font-smoothing: antialiased;
  	-moz-osx-font-smoothing: grayscale;
  }
  
  .acea-row {
  	display: flex;
  	flex-wrap: wrap;
  }
  
  .acea-row.row-top {
  	align-items: flex-start;
  }
  
  .acea-row.row-middle {
  	align-items: center;
  }
  
  .acea-row.row-bottom {
  	align-items: flex-end;
  }
  
  .acea-row.row-left {
  	justify-content: flex-start;
  }
  
  .acea-row.row-center {
  	justify-content: center;
  }
  
  .acea-row.row-right {
  	justify-content: flex-end;
  }
  
  .acea-row.row-between {
  	justify-content: space-between;
  }
  
  .acea-row.row-around {
  	justify-content: space-around;
  }
  
  .acea-row.row-column {
  	flex-direction: column;
  }
  
  .acea-row.row-column-between {
  	flex-direction: column;
  	justify-content: space-between;
  }
  
  .acea-row.row-column-around {
  	flex-direction: column;
  	justify-content: space-around;
  }
  
  .acea-row.row-center-wrapper {
  	align-items: center;
  	justify-content: center;
  }
  
  .acea-row.row-between-wrapper {
  	align-items: center;
  	justify-content: space-between;
  }
  
  .line1 {
  	overflow: hidden;
  	text-overflow: ellipsis;
  	white-space: nowrap;
  }
  
  .line2{
  	word-break: break-all;
  	display: -webkit-box;
  	-webkit-line-clamp: 2;
  	-webkit-box-orient: vertical;
  	overflow: hidden;
  }
  
  // 修改微信checkbox
  checkbox .wx-checkbox-input {
  	background-color: #fafafa;
  }
  
  checkbox .wx-checkbox-input {
  	border-radius: 50%;
  	width: 38rpx;
  	height: 38rpx;
  }
  
  checkbox .wx-checkbox-input.wx-checkbox-input-checked {
  	border: 1px solid #e93323 !important;
  	background-color: #e93323 !important;
  	color: #fff !important;
  }
  
  checkbox .wx-checkbox-input.wx-checkbox-input-checked::before {
  	font-size: 35rpx;
  }
  
  .bg-color{
  	background-color: #e93323!important;
  }
  
  .font-color{
  	color: #fc4141!important;
  }
  
  radio .wx-radio-input {
  	border-radius: 50%;
  	width: 38rpx;
  	height: 38rpx
  }
  
  radio .wx-radio-input.wx-radio-input-checked {
  	border: 1px solid #e93323!important;
  	background-color: #e93323!important
  }
  
  radio .uni-radio-input {
  	border-radius: 50%;
  	width: 38rpx;
  	height: 38rpx
  }
  
  radio .uni-radio-input.uni-radio-input-checked {
  	border: 1px solid #e93323!important;
  	background-color: #e93323!important
  }
  
  .text-wuliu{
    margin-left: 30rpx;
    margin-bottom: 15rpx;
  }
  
	.orderDatail .header{
		padding: 0 30rpx;
		height: 150rpx;
	}
	.orderDatail .header .data{
		color: rgba(255, 255, 255, 0.8);
		font-size: 24rpx;
	}
	.orderDatail .header .data .state{
		font-size: 30rpx;
		font-weight: bold;
		color: #fff;
		margin-bottom: 7rpx;
	}
	.orderDatail .header .data .time{
		margin-left: 20rpx
	}
	.orderDatail .nav{
		background-color: #fff;
		font-size: 26rpx;
		color: #282828;
		padding: 25rpx 0;
	}
	.orderDatail .nav .navCon{
		padding: 0 40rpx;
	}
	.orderDatail .nav .navCon .on{
		color: #e93323;
	}
	.orderDatail .nav .progress{
		padding: 0 65rpx;
		margin-top: 10rpx;
	}
	.orderDatail .nav .progress .iconfont{
		font-size: 25rpx;
		color: #939390;
		margin-top: -2rpx;
	}
	.orderDatail .nav .progress .line{
		width: 100rpx;
		height: 2rpx;
		background-color: #939390;
	}
	.orderDatail .address{
		font-size: 26rpx;
		color: #868686;
		background-color: #fff;
		margin-top: 13rpx;
		padding: 35rpx 30rpx;
	}
	.orderDatail .address .name{
		font-size: 30rpx;
		color: #282828;
		margin-bottom: 15rpx;
	}
	.orderDatail .address .name .phone{
		margin-left: 40rpx;
	}
	.orderDatail .line{
		width: 100%;
		height: 3rpx;
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
	.orderDatail .line image{
		display: block;
	}
	.orderDatail .orderGoods{
		background-color: #fff;
		margin-top: 12rpx;
	}
	.orderDatail .orderGoods .total{
		width: 100%;
		height: 86rpx;
		padding: 0 30rpx;
		border-bottom: 2rpx solid #f0f0f0;
		font-size: 30rpx;
		color: #282828;
		line-height: 86rpx;
		box-sizing: border-box;
	}
	.orderDatail .orderGoods .goodWrapper .item{
		margin-left: 30rpx;
		padding-right: 30rpx;
		border-bottom: 2rpx solid #f0f0f0;
		height: 180rpx;
	}
	.orderDatail .orderGoods .goodWrapper .item .pic{
		width: 130rpx;
		height: 130rpx;
	}
	.orderDatail .orderGoods .goodWrapper .item .pic image{
		border-radius: 6rpx;
	}
	.orderDatail .orderGoods .goodWrapper .item .text{
		width: 537rpx;
		position: relative;
	}
	.orderDatail .orderGoods .goodWrapper .item .text .name{
		font-size: 28rpx;
		color: #282828;
		width: 453rpx;
	}
	.orderDatail .orderGoods .goodWrapper .item .text .num{
		font-size: 26rpx;
		color: #868686;
	}
	.orderDatail .orderGoods .goodWrapper .item .text .attr{
		font-size: 20rpx;
		color: #868686;
		margin-top: 7rpx;
	}
	.orderDatail .orderGoods .goodWrapper .item .text .money{
		font-size: 26rpx;
		margin-top: 17rpx;
	}
	.orderDatail .orderGoods .goodWrapper .item .text .evaluate{
		position: absolute;
		width: 114rpx;
		height: 46rpx;
		border: 1rpx solid #bbb;
		border-radius: 4rpx;
		text-align: center;
		line-height: 46rpx;
		right: 0;
		bottom: -5rpx;
	}
	.orderDatail .wrapper{
		background-color: #fff;
		margin-top: 12rpx;
		padding: 30rpx;
	}
	.orderDatail .wrapper .item{
		font-size: 28rpx;
		color: #282828;
	}
	.orderDatail .wrapper .item:nth-child(n+2){
		margin-top: 20rpx;
	}
	.orderDatail .wrapper .item .conter{
		color: #868686;
		width: 460rpx;
		text-align: right;
	}
	.orderDatail .wrapper .item .conter .copy{
		font-size: 20rpx;
		color: #333;
		border-radius: 3rpx;
		border: 1rpx solid #666;
		padding: 3rpx 15rpx;
		margin-left: 24rpx;
	}
	.orderDatail .wrapper .actualPay{
		border-top: 1rpx solid #eee;
		margin-top: 30rpx;
		padding-top: 30rpx;
	}
	.orderDatail .wrapper .actualPay .money{
		font-weight: bold;
		font-size: 30rpx;
	}
	.orderDatail .footer{
		width: 100%;
		height: 100rpx;
		position: fixed;
		bottom: 0;
		left: 0;
		background-color: #fff;
		padding: 0 30rpx;
		box-sizing: border-box;
	}
	.orderDatail .footer .qs-btn{
		width: auto;
		height: 60rpx;
		text-align: center;
		line-height: 60rpx;
		border-radius: 50rpx;
		color: #fff;
		font-size: 27rpx;
		padding: 0 3%;
		color: #aaa;
		border: 1px solid #ddd;
		margin-right: 20rpx;
	}
	.orderDatail .footer .bnt{
		width: 176rpx;
		height: 60rpx;
		text-align: center;
		line-height: 60rpx;
		border-radius: 50rpx;
		color: #fff;
		font-size: 27rpx;
	}
</style>
