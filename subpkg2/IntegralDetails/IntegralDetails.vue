<template>
	<view class="page">
		<!-- 头部背景 -->
		<view class="head-bg">
			<view class="head-user">
				<view class="user">
					<image :src="userInfo.avatarUrl" mode=""></image>
					<text>{{userInfo.nickName}}</text>
				</view>
			</view>
			<view class="integral-balance">
				<view class="integral" @click="onIntegral">
					<text>当前可用积分</text>
					<text class="number">{{userInfo.integral}}</text>
				</view>
			</view>
			<view class="bg">
				<image src="/static/integral_bg1.png" mode=""></image>
			</view>
		</view>
		<!-- 优惠券兑换专区 -->
		<view class="coupon-exchange">
			<view class="exchange-title">
				<view class="title">优惠券兑换</view>
			</view>
			<view class="coupon-list">
				<view class="list" v-for="(item,index) in couponList"
					@click="onExchange(0,item)"
					:key="index">
					<view class="thumb">
						<image src="" mode=""></image>
					</view>
					<view class="title">{{item.money}}元直减优惠券</view>
					<view class="integral">{{item.integral}}积分</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
  // 按需导入mapState, mapMutations, mapGetters 辅助函数
  import {
    mapState,
    mapMutations,
    mapGetters
  } from 'vuex'
	export default {
		data() {
			return {
          couponList:[],//优惠券列表
          // goodsList:[],//积分兑换商品列表  
			};
		},
    computed: {
      // 将 m_cart 模块中的 cart 数组映射到当前页面中使用
      ...mapState('m_user', ['userInfo']),
    },
    onLoad() {
      this.getCouponList();
    },
		methods:{
      async getCouponList(){
        const {data: res} = await uni.$http.get('/coupon/getCouponList')
        if (res.status !== 200) return uni.$showMsg()
        this.couponList = res.data;
      },
      
			/**
			 * 兑换点击
			 * @param {Number} type 0 优惠券 1 普通商品 2 会员商品
			 */
			onExchange(type,item){
				uni.navigateTo({
					url: '/subpkg2/ExchangeDetails/ExchangeDetails?type=' + type + '&id=' + item.id,
				})
			},
			/**
			 * 兑换记录
			 */
			onExchangeRecord(){
				uni.navigateTo({
					url: '/subpkg2/ExchangeRecord/ExchangeRecord',
				})
			},
			/**
			 * 积分点击
			 */
			onIntegral(){
				// uni.navigateTo({
				// 	url: '/subpkg/IntegralRecord/IntegralRecord'
				// })
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
	background-color: #f6f6f6;
}

.head-bg{
	position: relative;
	width: 100%;
	height: 400rpx;
	background: linear-gradient($base,$change-clor);
	.head-user{
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 4%;
		height: 100rpx;
		.user{
			display: flex;
			align-items: center;
			image{
				width: 70rpx;
				height: 70rpx;
				border-radius: 100%;
			}
			text{
				font-size: 28rpx;
				color: #FFFFFF;
				margin-left: 20rpx;
			}
		}
		.exchange{
			display: flex;
			align-items: center;
			text{
				font-size: 28rpx;
				color: #FFFFFF;
			}
		}
	}
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
/* 兑换通用标题 */
.exchange-title{
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100rpx;
	.title{
		font-size: 28rpx;
		font-weight: bold;
		color: #222222;
	}
}

/* 优惠券兑换专区 */
.coupon-exchange{
	width: 100%;
	margin: 20rpx auto;
	background-color: #FFFFFF;
	border-radius: 20rpx;
	.coupon-list{
		display: flex;
		flex-wrap: wrap;
		padding: 0 4%;
		.list{
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			width: 33%;
			height: 240rpx;
			.thumb{
				width: 100rpx;
				height: 100rpx;
				background-color: #ff0000;
				border-radius: 100%;
				overflow: hidden;
				image{
					width: 100%;
					height: 100%;
					background: url('/static/coupon_default.png') no-repeat center center;
					background-size: 50rpx 50rpx;
				}
			}
			.title{
				font-size: 24rpx;
				font-weight: bold;
				color: #222222;
				margin-top: 20rpx;
			}
			.integral{
				font-size: 28rpx;
				font-weight: bold;
				color: $base;
				margin-top: 10rpx;
			}
		}
	}
}

/* 精选积分兑换专区 */
.handpick-exchange{
	width: 100%;
	margin: 20rpx auto;
	background-color: #FFFFFF;
	border-radius: 20rpx;
	.handpick-list{
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		padding: 20rpx 4%;
		.list{
			width: 48%;
			height: 340rpx;
			margin-bottom: 20rpx;
			.thumb{
				display: flex;
				align-items: center;
				justify-content: center;
				width: 100%;
				height: 200rpx;
				image{
					width: 200rpx;
					height: 200rpx;
					border-radius: 10rpx;
				}
			}
			.title{
				display: flex;
				align-items: center;
				width: 100%;
				height: 80rpx;
				text{
					font-size: 26rpx;
					color: #222222;
				}
			}
			.price-integral{
				display: flex;
				align-items: center;
				justify-content: center;
				width: 100%;
				height: 60rpx;
				.integral{
					font-size: 28rpx;
					font-weight: bold;
					color: $base;
				}
				.price{
					font-size: 24rpx;
					color: #959595;
					text-decoration: line-through;
					margin-left: 20rpx;
				}
			}
		}
	}
}

/* 超级会员兑换专区 */
.vip-exchange{
	width: 100%;
	margin: 20rpx auto;
	background-color: #FFFFFF;
	border-radius: 20rpx;
	.goods-list{
		padding: 0 4%;
		.list{
			display: flex;
			align-items: center;
			width: 100%;
			height: 220rpx;
			border-bottom: 2rpx solid #f6f6f6;
			.thumb{
				display: flex;
				align-items: center;
				width: 30%;
				height: 200rpx;
				image{
					width: 200rpx;
					height: 200rpx;
					border-radius: 10rpx;
				}
			}
			.item{
				width: 70%;
				height: 200rpx;
				.title{
					display: flex;
					align-items: center;
					width: 100%;
					height: 100rpx;
					text{
						font-size: 26rpx;
						color: #222222;
					}
				}
				.price-integral-btn{
					display: flex;
					align-items: center;
					justify-content: space-between;
					width: 100%;
					height: 80rpx;
					.price-integral{
						display: flex;
						align-items: center;
						.integral{
							font-size: 28rpx;
							font-weight: bold;
							color: $base;
						}
						.price{
							font-size: 24rpx;
							color: #959595;
							text-decoration: line-through;
							margin-left: 20rpx;
						}
					}
					.btn{
						padding: 10rpx 20rpx;
						background-color: $base;
						color: #FFFFFF;
						font-size: 24rpx;
						box-shadow: 0 2px 5px $base;
						border-radius: 200rpx;
					}
				}
			}
		}
	}
}

</style>
