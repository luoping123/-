<template>
  <!-- 付款码页面 -->
	<view class="page">
		<!--  -->
		<view class="card-data">
			<!-- 会员 -->
			<view class="member-data">
				<view class="phone">
					<text>188****8888</text>
				</view>
				<view class="vip-level">
					<image src="/static/rank.png"></image>
					<text>v1</text>
				</view>
			</view>
			<!-- 余额 -->
			<view class="balance-data">
				<view class="data">
					<view class="price">{{isPirce?'10000.00':'*****'}}</view>
					<view class="title" @click="isPirce = !isPirce">
						<text>余额</text>
						<text class="iconfont" :class="isPirce?'icon-eye-on':'icon-eye-off'"></text>
					</view>
				</view>
			</view>
			<!-- 付款码 -->
			<view class="payment-code">
				<view class="number" @click="isNumber = !isNumber">
					<text>{{isNumber?'7118 5881 7024 5795':'7118 **** **** 5795'}}</text>
					<text>查看数字</text>
				</view>
				<view class="code">
					<image src="http://cn.shichengtai.xyz/goods/code.png" mode=""></image>
				</view>
				<view class="hint">
					<text>付款码每30秒自动更新，请在店内消费时使用</text>
				</view>
			</view>
			<!-- 其他支付方式 -->
			<view class="payment-way">
				<view class="title">
					<text>其他支付方式</text>
				</view>
				<view class="btn" @click="isPayWay = true">
					<text>{{PayWayText}}</text>
					<text class="tag">点击选择</text>
				</view>
			</view>
		</view>
		<!-- 支付方式选择窗口 -->
		<view class="pay-way-win" @click="isPayWay = false">
			<view class="cu-modal bottom-modal" :class="{'show':isPayWay}">
			  <view class="cu-dialog">
			    <view class="pay-list">
						<view class="list" @click.stop="onPayWay(0)">
							<view class="pay">
								<image src="/static/ye_pay.png" mode=""></image>
								<text>余额支付</text>
							</view>
							<view class="check">
								<text class="iconfont" :class="PayWay===0?'icon-checked action':'icon-check'"></text>
							</view>
						</view>
						<view class="list" @click.stop="onPayWay(1)">
							<view class="pay">
								<image src="/static/wx_pay.png" mode=""></image>
								<text>微信支付</text>
							</view>
							<view class="check">
								<text class="iconfont" :class="PayWay===1?'icon-checked action':'icon-check'"></text>
							</view>
						</view>
						<view class="list" @click.stop="onPayWay(2)">
							<view class="pay">
								<image src="/static/zfb_pay.png" mode=""></image>
								<text>支付宝支付</text>
							</view>
							<view class="check">
								<text class="iconfont" :class="PayWay===2?'icon-checked action':'icon-check'"></text>
							</view>
						</view>
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
				isPayWay: false,
				PayWay: 0,
				PayWayText: '余额支付',
				// 数字
				isNumber: false,
				// 金额
				isPirce: false,
			};
		},
		methods:{
			/**
			 * 支付方式选择点击
			 * @param {Number} type 0 余额 1 微信 2 支付宝
			 */
			onPayWay(type){
				this.PayWay = type;
				switch (type) {
					case 0:
						this.PayWayText = '余额支付';
						break;
					case 1:
						this.PayWayText = '微信支付';
						break;
					case 2:
						this.PayWayText = '支付宝支付';
						break;
				}
				this.isPayWay = false;
			}
		}
	}
</script>

<style scoped lang="scss">
  /*每个页面公共css */
   @import '/colorui/main.css';
   @import '/colorui/icon.css';
   @import '/style/FontStyle.css';
	.page{
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: #f9f9f9;	
	}
	
	
	.card-data{
		width: 90%;
		height: 90%;
		margin: 40rpx auto 0;
		background-color: #FFFFFF;
		border-radius: 20rpx;
		box-shadow: 0 0 20rpx rgba(0,0,0,0.1);
		// 会员
		.member-data{
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			width: 100%;
			height: 200rpx;
			.phone{
				display: flex;
				align-items: center;
				height: 80rpx;
				text{
					font-size: 32rpx;
					font-weight: bold;
					color: #222222;
				}
			}
			.vip-level{
				display: flex;
				align-items: center;
				padding: 10rpx 40rpx;
				background-color: $base;
				border-radius: 100rpx;
				image{
					width: 24rpx;
					height: 24rpx;
				}
				text{
					font-size: 24rpx;
					color: #ffe678;
					margin-left: 10rpx;
				}
			}
		}
		// 余额
		.balance-data{
			display: flex;
			align-items: center;
			width: 100%;
			height: 200rpx;
			.data{
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				width: 100%;
				height: 90%;
				.price{
					display: flex;
					align-items: center;
					height: 80rpx;
					font-size: 56rpx;
					color: $base;
				}
				.title{
					display: flex;
					align-items: center;
					text{
						font-size: 28rpx;
						color: #959595;
						margin-right: 20rpx;
					}
				}
			}
		}
		// 付款码
		.payment-code{
			padding: 0 4%;
			.number{
				display: flex;
				align-items: center;
				justify-content: center;
				width: 100%;
				height: 80rpx;
				text{
					font-size: 28rpx;
					color: #555555;
					margin-right: 20rpx;
				}
			}
			.code{
				width: 100%;
				height: 256rpx;
				image{
					width: 100%;
					height: 100%;
				}
			}
			.hint{
				display: flex;
				align-items: center;
				justify-content: center;
				width: 100%;
				height: 80rpx;
				text{
					font-size: 26rpx;
					color: #959595;
				}
			}
		}
		// 其他支付方式
		.payment-way{
			width: 100%;
			height: 200rpx;
			.title{
				display: flex;
				align-items: center;
				justify-content: center;
				width: 100%;
				height: 80rpx;
				text{
					font-size: 30rpx;
					font-weight: bold;
					color: #555555;
				}
			}
			.btn{
				position: relative;
				display: flex;
				align-items: center;
				justify-content: center;
				width: 80%;
				height: 70rpx;
				margin: 20rpx auto;
				background: linear-gradient(to right,$base,$change-clor);
				border-radius: 70rpx;
				box-shadow: 0 10rpx 10rpx $base;
				text{
					color: #FFFFFF;
					font-size: 28rpx;
				}
				.tag{
					position: absolute;
					right: 0;
					top: -20rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					width: 140rpx;
					height: 40rpx;
					background-color: #F37B1D;
					border-radius: 10rpx;
					text{
						font-size: 24rpx;
					}
				}
			}
		}
	}
	
	
	/* 支付方式选择 */
	.pay-way-win{
		.cu-dialog{
			border-radius: 20rpx 20rpx 0 0 !important;
		}
		.pay-list{
			padding: 20rpx 4%;
			.list{
				display: flex;
				align-items: center;
				justify-content: space-between;
				width: 100%;
				height: 100rpx;
				border-bottom: 2rpx solid #f6f6f6;
				.pay{
					display: flex;
					align-items: center;
					image{
						width: 44rpx;
						height: 44rpx;
					}
					text{
						font-size: 28rpx;
						color: #222222;
						margin-left: 20rpx;
					}
				}
				.check{
					display: flex;
					align-items: center;
					text{
						font-size: 38rpx;
						color: #959595;
					}
					.action{
						color: $base;
					}
				}
			}
		}
	}
</style>
