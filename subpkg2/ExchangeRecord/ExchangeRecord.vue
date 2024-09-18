<template>
	<view class="page">
		<!-- 头部背景 -->
		<view class="head-bg">
			<view class="integral-balance">
				<view class="integral">
					<text>当前可用积分</text>
					<text class="number">10000</text>
				</view>
			</view>
			<view class="bg">
				<image src="/static/integral_bg1.png" mode=""></image>
			</view>
		</view>
		<!-- 记录列表 -->
		<view class="record-list">
			<view class="list" v-for="(item,index) in 10" :key="index">
				<view class="title-date">
					<view class="title">
						<text>10元直减优惠券</text>
					</view>
					<view class="date">
						<text>2020-2-2 13:11</text>
					</view>
				</view>
				<view class="integral">
					<text>-1000</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
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
	background-color: #FFFFFF;
}

.head-bg{
	position: relative;
	width: 100%;
	height: 300rpx;
	background: linear-gradient($base,$change-clor);
	.integral-balance{
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 200rpx;
		.integral{
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			text{
				font-size: 30rpx;
				color: #FFFFFF;
			}
			.number{
				font-size: 60rpx;
				margin-top: 10rpx;
				// font-weight: bold;
			}
		}
	}
	.bg{
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 40rpx;
		image{
			width: 100%;
			height: 100%;
		}
	}
}

/* 记录列表 */
.record-list{
	width: 100%;
	background-color: #FFFFFF;
	.list{
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 4%;
		height: 140rpx;
		border-bottom: 2rpx solid #f6f6f6;
		.title-date{
			width: 70%;
			height: 100%;
			.title{
				display: flex;
				align-items: center;
				width: 100%;
				height: 60rpx;
				text{
					font-size: 28rpx;
					font-weight: bold;
					color: #222222;
				}
			}
			.date{
				display: flex;
				align-items: center;
				width: 100%;
				height: 60rpx;
				text{
					font-size: 24rpx;
					color: #959595;
				}
			}
		}
		.integral{
			display: flex;
			align-items: center;
			height: 100%;
			text{
				font-size: 28rpx;
				font-weight: bold;
				color: $base;
			}
		}
	}
}
</style>
