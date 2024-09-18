<template>
	<view class="page">
		<!-- 优惠券tab -->
		<view class="coupon-tab">
			<view class="tab" :class="{'action':TabShow===0}" @click="onCouponTab(0)">
				<text>未使用</text>
				<text class="line"></text>
			</view>
			<view class="tab" :class="{'action':TabShow===1}" @click="onCouponTab(1)">
				<text>已使用</text>
				<text class="line"></text>
			</view>
			<view class="tab" :class="{'action':TabShow===2}" @click="onCouponTab(2)">
				<text>已过期</text>
				<text class="line"></text>
			</view>
		</view>
		<!-- 优惠券列表 -->
		<view class="coupon-list">
			<view class="list" v-for="(item,index) in 6" :key="index">
				<view class="list-data" :class="{'coupon-lose':TabShow!=0}">
					<view class="coupon-price">
						<view class="discounts">
							<text class="min">￥</text>
							<text class="max">200</text>
						</view>
						<view class="full-reduction"><text>满600元减200元</text></view>
						<view class="jag"></view>
					</view>
					<view class="coupon-info">
						<view class="info-title">
							<view class="tag"><text>限品类券</text></view>
							<view class="title"><text>仅可购买酒水部分商品</text></view>
						</view>
						<view class="date-get">
							<view class="date"><text>2020.3.09-2020.03.15</text></view>
							<view class="get" @click="onCouponUse" v-if="TabShow===0">
								<text>立即使用</text>
							</view>
						</view>
						<view class="describe-title" @click="isDes=!isDes">
							<text>详细信息</text>
							<text class="iconfont icon-more more" :style="isDes?'transform: rotate(-90deg);':'transform: rotate(90deg);'"></text>
						</view>
					</view>
				</view>
				<view class="use-status" v-if="TabShow != 0">
					<text v-if="TabShow === 1">已使用</text>
					<text v-else-if="TabShow === 2">已过期</text>
				</view>
				<view class="describe" v-show="isDes">
					<text>限品类：尽可购买酒水部分商品</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			TabShow: 0,
			isDes: false,
		};
	},
	methods:{
		/**
		 * 优惠券tab点击
		 * @param {Number} type
		 */
		onCouponTab(type){
			this.TabShow = type;
		},
		/**
		 * 去使用点击
		 */
		onCouponUse(){
			uni.navigateTo({
				url: '/pages/SearchGoodsList/SearchGoodsList'
			})
		}
	}
};
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
	background-color: #ffffff;
}

/* 优惠券tab */
.coupon-tab {
	position: fixed;
	left: 0;
	top: 0;
	/* #ifdef H5 */
	top: 88rpx;
	/* #endif */
	z-index: 10;
	display: flex;
	align-items: center;
	width: 100%;
	height: 100rpx;
	background-color: #ffffff;
	.tab {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 33%;
		height: 100%;
		text {
			font-size: 26rpx;
			color: #555555;
		}
	}
	.action {
		text {
			color: #222222;
		}
		.line {
			position: absolute;
			left: 50%;
			bottom: 10rpx;
			width: 30%;
			height: 6rpx;
			background: linear-gradient(to right, $base, #f6f6f6);
			transform: translate(-50%, 0);
		}
	}
}

/* 优惠券 */
.coupon-list {
	padding: 20rpx 4%;
	margin: 120rpx auto 0;
	background-color: #ffffff;
	.list {
		position: relative;
		width: 100%;
		min-height: 200rpx;
		box-shadow: 0 0 14rpx rgba(0, 0, 0, 0.1);
		border-radius: 6rpx;
		margin-bottom: 20rpx;
		overflow: hidden;
		.list-data {
			display: flex;
			align-items: center;
			width: 100%;
			height: 200rpx;
			.coupon-price {
				position: relative;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				width: 30%;
				height: 100%;
				background-color: $base;
				.discounts {
					display: flex;
					justify-content: center;
					align-items: flex-end;
					width: 100%;
					.min {
						color: #ffffff;
						font-size: 32rpx;
						font-weight: bold;
					}
					.max {
						font-size: 48rpx;
						color: #ffffff;
						font-weight: bold;
					}
				}
				.full-reduction {
					display: flex;
					justify-content: center;
					align-items: center;
					width: 100%;
					height: 60rpx;
					text {
						font-size: 24rpx;
						color: #ffffff;
					}
				}
				.jag {
					position: absolute;
					top: 0;
					left: -6rpx;
					width: 6px;
					height: 100%;
					background-size: 10px 6px;
					background-color: #fff;
					background-position: 100% 35%;
					background-image: linear-gradient(-45deg, $base 25%, transparent 25%, transparent), linear-gradient(-135deg, $base 25%, transparent 25%, transparent),
						linear-gradient(-45deg, transparent 75%, $base 75%), linear-gradient(-135deg, transparent 75%, $base 75%);
				}
			}
			.coupon-info {
				width: 70%;
				height: 90%;
				padding: 0 4%;
				.info-title {
					display: flex;
					width: 100%;
					height: 60rpx;
					.tag {
						margin-right: 10rpx;
						text {
							padding: 4rpx 16rpx;
							color: #ffffff;
							background-color: $base;
							font-size: 24rpx;
							border-radius: 40rpx;
						}
					}
					.title {
						text {
							font-size: 24rpx;
							color: #212121;
						}
					}
				}
				.date-get {
					display: flex;
					align-items: center;
					justify-content: space-between;
					width: 100%;
					height: 80rpx;
					border-bottom: 2rpx dashed #eeeeee;
					.date {
						display: flex;
						align-items: center;
						text {
							font-size: 24rpx;
							color: #555555;
						}
					}
					.get {
						text {
							padding: 10rpx 20rpx;
							background-color: $base;
							color: #ffffff;
							font-size: 24rpx;
							border-radius: 100rpx;
						}
						.use {
							background-color: transparent;
							border: 1px solid $base;
							color: $base;
						}
					}
				}
				.describe-title {
					display: flex;
					align-items: center;
					justify-content: space-between;
					width: 100%;
					height: 40rpx;
					text {
						color: #555555;
						font-size: 24rpx;
					}
					.more {
						transform: rotate(90deg);
					}
				}
			}
		}
		.coupon-lose{
			.coupon-price{
				background-color: #c0c0c0;
				.jag {
					position: absolute;
					top: 0;
					left: -6rpx;
					width: 6px;
					height: 100%;
					background-size: 10px 6px;
					background-color: #fff;
					background-position: 100% 35%;
					background-image: linear-gradient(-45deg, #c0c0c0 25%, transparent 25%, transparent), linear-gradient(-135deg, #c0c0c0 25%, transparent 25%, transparent),
						linear-gradient(-45deg, transparent 75%, #c0c0c0 75%), linear-gradient(-135deg, transparent 75%, #c0c0c0 75%);
				}
			}
			.coupon-info{
				.info-title{
					.tag{
						text{
							background-color: #c0c0c0;
						}
					}
					.title{
						text{
							color: #c0c0c0;
						}
					}
				}
				.date-get{
					.date{
						text{
							color: #c0c0c0;
						}
					}
				}
			}
		}
		.describe{
			display: flex;
			align-items: center;
			padding: 0 4%;
			height: 60rpx;
			background-color: #FFFFFF;
			box-shadow: 0 -10rpx 10rpx #F5F5F5;
			text{
				color: #CCCCCC;
				font-size: 24rpx;
			}
		}
		.use-status {
			position: absolute;
			right: -20rpx;
			top: -25rpx;
			z-index: 10;
			width: 100rpx;
			height: 100rpx;
			border: 2rpx solid #c0c0c0;
			border-radius: 100%;
			text {
				display: inline-block;
				color: #c0c0c0;
				font-size: 24rpx;
				transform: rotate(45deg);
				margin-top: 40rpx;
			}
		}
	}
}

</style>
