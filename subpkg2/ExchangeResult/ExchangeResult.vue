<template>
	<view class="page">
		<!-- 顶部结果 -->
		<view class="head-result" v-if="ExchangeType == 0">
			<view class="icon">
				<text class="iconfont icon-success"></text>
			</view>
			<view class="title">
				<text>优惠券兑换成功</text>
			</view>
		<!-- 	<view class="describe">
				<text>优惠券有效期：</text>
				<text class="ac">2020.2.2-2020.4.4</text>
			</view> -->
		</view>
		<!-- 返回按钮 -->
		<view class="back-btn">
			<view class="btn-bg" @click="onBackBtn(0)">回到首页</view>
			<view class="btn-br" @click="onBackBtn(1)">积分兑换</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				ExchangeType: 0,
			};
		},
		onLoad(params) {
			this.ExchangeType = params.type||0;
		},
		methods:{
			/**
			 * 返回点击
			 */
			onBackBtn(type){
				switch (type){
					case 0:
						uni.switchTab({
							url: '/pages/home/home'
						})
						break;
					case 1:
						uni.redirectTo({
							url: '/subpkg2/IntegralDetails/IntegralDetails'
						})
						break;
				}
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

/* 顶部结果 */
.head-result {
	width: 100%;
	height: 400rpx;
	background-color: #ffffff;
	.icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 200rpx;
		text {
			font-size: 120rpx;
			color: #22aa44;
		}
	}
	.title {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 60rpx;
		text {
			font-size: 32rpx;
			font-weight: bold;
			color: #222222;
		}
	}
	.describe {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 60rpx;
		text {
			font-size: 26rpx;
			color: #959595;
		}
		.ac{
			color: $base;
		}
	}
}

/* 收货信息 */
.delivery-address {
	padding: 0 4%;
	height: 200rpx;
	background-color: #FFFFFF;
	.title {
		display: flex;
		align-items: center;
		width: 100%;
		height: 80rpx;
		font-size: 28rpx;
		font-weight: bold;
		color: #555555;
	}
	.address-phone {
		display: flex;
		align-items: center;
		width: 100%;
		height: 120rpx;
		.icon {
			display: flex;
			align-items: center;
			width: 10%;
			height: 100%;
			text {
				font-size: 38rpx;
				color: #959595;
			}
		}
		.address {
			width: 80%;
			height: 100%;
			.location {
				display: flex;
				align-items: center;
				width: 100%;
				height: 50%;
				text {
					font-size: 26rpx;
					color: #222222;
				}
			}
			.name-phone {
				display: flex;
				align-items: center;
				width: 100%;
				text {
					font-size: 26rpx;
					color: #959595;
				}
			}
		}
		.more {
			display: flex;
			align-items: center;
			justify-content: flex-end;
			width: 10%;
			height: 100%;
			text {
				font-size: 32rpx;
				color: #959595;
			}
		}
	}
}

/* 返回按钮 */
.back-btn{
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100rpx;
	.btn-bg{
		display: flex;
		align-items: center;
		justify-content: center;
		width: 240rpx;
		height: 60rpx;
		font-size: 26rpx;
		color: #FFFFFF;
		background-color: $base;
		border-radius: 60rpx;
		margin-right: 20rpx;
		box-shadow: 0 4rpx 10rpx $base;
	}
	.btn-br{
		display: flex;
		align-items: center;
		justify-content: center;
		width: 240rpx;
		height: 60rpx;
		font-size: 26rpx;
		color: $base;
		border: 2rpx solid $base;
		border-radius: 60rpx;
		margin-left: 20rpx;
		box-shadow: 0 4rpx 10rpx #FFFFFF;
	}
}

</style>
