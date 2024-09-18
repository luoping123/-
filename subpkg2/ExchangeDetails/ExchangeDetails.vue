<template>
	<view class="page">
		<!-- 优惠券兑换 -->
		<view class="banner-title" v-if="ExchangeType == 0">
			<view class="banner">
				<image src="/static/coupon_default.png" mode=""></image>
			</view>
			<view class="title">
				<view class="name">{{coupon.money}}元直减优惠券</view>
				<!-- <view class="describe">领券当日开始90天内有效</view> -->
			</view>
			<view class="integral-title">
				<view class="integral">
					<text class="action">{{coupon.integral}}</text>
					<text>积分</text>
				</view>
				<view class="integral">
					<text>剩余</text>
					<text class="action">{{coupon.number}}</text>
					<text>件</text>
				</view>
			</view>
		</view>
		<!-- 兑换须知 -->
		<view class="convertible-notes">
			<view class="title">兑换须知</view>
			<view class="content">
				<view>1、领券当日开始90天内有效;</view>
				<view>2、本优惠券限量{{coupon.number}}件/期，兑完即止;</view>
				<view>3、优惠券兑换后，不可取消兑换并返还积分。</view>
			</view>
		</view>
		<!-- 兑换按钮 -->
		<view class="exchange-btn">
			<view class="btn" @click="isExchange = true">立即兑换</view>
		</view>
		<!-- 兑换弹窗 -->
		<view class="exchange-win">
			<view class="cu-modal" :class="{'show':isExchange}">
			  <view class="cu-dialog">
			    <view class="bg-img" style="background-image: url('http://cn.shichengtai.xyz/goods/banner_04.png');height:200px;">
			      <view class="cu-bar justify-end text-white">
			        <view class="action">
			          <text class="cuIcon-close" @click="isExchange = false"></text>
			        </view>
			      </view>
			    </view>
					<view class="affirm-btn">
						<view class="btn" @click="onAffirm">确认</view>
					</view>
			  </view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				ExchangeType: 0,
				isExchange: false,
        id:0,
        coupon:{},//优惠券信息
        goods:{},//商品信息
        swiperList: [
          {
            id: 0,
            type: 'image',
            url: 'http://cn.shichengtai.xyz/goods/banner_01.png'
          },
        ],
			};
		},
		onLoad(params) {
			this.ExchangeType = params.type||0;
      this.id = params.id || 0;
      this.init();//初始化
		},
		methods:{
      async init(){
        if(this.ExchangeType==0){//优惠券
          // 发起请求
          const {data: res} = await uni.$http.get('/coupon/getCouponById', this.id)
          if (res.status !== 200) return uni.$showMsg()
          this.coupon = res.data;
        }else if(this.ExchangeType==2){//兑换商品
          // 发起请求
          const {data: res} = await uni.$http.get('/goods/getExchangeGoods', this.id)
          if (res.status !== 200) return uni.$showMsg()
          this.goods = res.data;
          this.swiperList = [{
            id: 0,
            type: 'image',
            url: this.goods.imageUrl
          }]
        }
      },
			/**
			 * 兑换确认点击
			 */
			onAffirm(){
				uni.navigateTo({
					url: '/subpkg2/ExchangeResult/ExchangeResult?type=' + this.ExchangeType,
				})
			}
		}
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
	height: 100%;
	background-color: #f6f6f6;
}

/* 优惠券兑换 */
.banner-title {
	width: 100%;
	height: 420rpx;
	background-color: #ffffff;
	border-radius: 0 0 20rpx 20rpx;
	.banner {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 200rpx;
		height: 200rpx;
		margin: 0 auto;
		background-color: $base;
		border-radius: 100%;
		image {
			width: 120rpx;
			height: 120rpx;
		}
	}
	.title {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 140rpx;
		.name {
			font-size: 32rpx;
			font-weight: bold;
			color: #222222;
		}
		.describe {
			font-size: 24rpx;
			color: #959595;
			margin-top: 10rpx;
		}
	}
	.integral-title {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 4%;
		height: 80rpx;
		.integral {
			display: flex;
			align-items: center;
			text {
				font-size: 24rpx;
				color: #959595;
			}
			.action {
				font-size: 32rpx;
				font-weight: bold;
				color: $base;
				margin-right: 10rpx;
			}
		}
	}
}

/* 商品兑换 */
.banner-goods {
	width: 100%;
	background-color: #ffffff;
	border-radius: 0 0 20rpx 20rpx;
	.banner {
		width: 100%;
		height: 360rpx;
		overflow: hidden;
		.screen-swiper {
			width: 100%;
			height: 100%;
			image {
				width: 100%;
				height: 100%;
			}
		}
	}
	.goods-title {
		width: 100%;
		padding: 20rpx;
		border-bottom: 2rpx solid #f6f6f6;
		.title-vip {
			display: flex;
			align-items: center;
			justify-content: space-between;
			width: 100%;
			.title {
				display: flex;
				align-items: center;
				text-align: left;
				width: 70%;
				text {
					font-size: 26rpx;
					font-weight: bold;
					color: #222222;
				}
			}
			.vip {
				display: flex;
				align-items: center;
				text {
					padding: 6rpx 12rpx;
					font-size: 24rpx;
					color: #ff9900;
					border: 2rpx solid #ff9900;
					border-radius: 200rpx;
				}
			}
		}
		.integral-title {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 4%;
			height: 80rpx;
			.integral {
				display: flex;
				align-items: center;
				text {
					font-size: 24rpx;
					color: #959595;
				}
				.action {
					font-size: 32rpx;
					font-weight: bold;
					color: $base;
					margin-right: 10rpx;
				}
			}
		}
	}
}

/* 兑换须知 */
.convertible-notes {
	width: 100%;
	background-color: #ffffff;
	margin: 20rpx auto;
	border-radius: 20rpx;
	padding-bottom: 20rpx;
	.title {
		display: flex;
		align-items: center;
		padding: 0 4%;
		height: 80rpx;
		font-size: 28rpx;
		font-weight: bold;
	}
	.content {
		padding: 0 4%;
		font-size: 26rpx;
		color: #555555;
		line-height: 50rpx;
	}
}

/* 兑换按钮 */
.exchange-btn {
	position: fixed;
	left: 0;
	bottom: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100rpx;
	background-color: #ffffff;
	.btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 90%;
		height: 70rpx;
		font-size: 28rpx;
		color: #ffffff;
		background: linear-gradient($base, $change-clor);
		box-shadow: 0 2px 5px $base;
		border-radius: 70rpx;
	}
}

/* 兑换弹窗 */
.exchange-win {
	.goods-title {
		width: 100%;
		padding: 20rpx;
		border-bottom: 2rpx solid #EEEEEE;
		.title-vip {
			display: flex;
			align-items: center;
			justify-content: space-between;
			width: 100%;
			.title {
				display: flex;
				align-items: center;
				width: 70%;
				height: 100rpx;
				text {
					font-size: 26rpx;
					font-weight: bold;
					color: #222222;
					text-align: left;
				}
			}
			.vip {
				display: flex;
				align-items: center;
				text {
					padding: 6rpx 12rpx;
					font-size: 24rpx;
					color: #ff9900;
					border: 2rpx solid #ff9900;
					border-radius: 200rpx;
				}
			}
		}
		.integral-title {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 4%;
			height: 80rpx;
			.integral {
				display: flex;
				align-items: center;
				text {
					font-size: 24rpx;
					color: #959595;
				}
				.action {
					font-size: 32rpx;
					font-weight: bold;
					color: $base;
					margin-right: 10rpx;
				}
			}
		}
	}
	.delivery-address{
		padding: 0 4%;
		height: 200rpx;
		.title{
			display: flex;
			align-items: center;
			width: 100%;
			height: 80rpx;
			font-size: 28rpx;
			font-weight: bold;
			color: #555555;
		}
		.address-phone{
			display: flex;
			align-items: center;
			width: 100%;
			height: 120rpx;
			.icon{
				display: flex;
				align-items: center;
				width: 10%;
				height: 100%;
				text{
					font-size: 38rpx;
				}
			}
			.address{
				width: 80%;
				height: 100%;
				.location{
					display: flex;
					align-items: center;
					width: 100%;
					height: 50%;
					text{
						font-size: 26rpx;
						color: #222222;
					}
				}
				.name-phone{
					display: flex;
					align-items: center;
					width: 100%;
					text{
						font-size: 26rpx;
						color: #959595;
					}
				}
			}
			.more{
				display: flex;
				align-items: center;
				justify-content: flex-end;
				width: 10%;
				height: 100%;
				text{
					font-size: 32rpx;
					color: #959595;
				}
			}
		}
	}
	.affirm-btn{
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100rpx;
		.btn{
			display: flex;
			align-items: center;
			justify-content: center;
			width: 90%;
			height: 60rpx;
			font-size: 28rpx;
			color: #ffffff;
			background: linear-gradient($base, $change-clor);
			box-shadow: 0 2px 5px $base;
			border-radius: 70rpx;
		}
	}
}

</style>
