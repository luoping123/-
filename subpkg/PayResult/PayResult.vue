<template>
	<view class="page">
		<view class="pay-price">
			<view class="icon">
				<image src="/static/pay_success.png" mode=""></image>
			</view>
			<view class="price-data">
				<view class="list">
					<view class="title">支付方式</view>
					<view class="content">：{{payType}}</view>
				</view>
				<view class="list">
					<view class="title">支付金额</view>
					<view class="content">：￥{{realPrice}}</view>
				</view>
			</view>
		</view>
		<!-- 跳转按钮 -->
		<view class="skip-btn">
			<view class="btn" @click="onSkip(0)">我的订单</view>
			<view class="btn" @click="onSkip(1)">返回首页</view>
		</view>
    <!-- 为你推荐 -->
    <view class="recommend-info" v-if="goodsList.length > 0">
      <view class="recommend-title">
        <view class="title">
          <image src="/static/wntj_title.png" mode=""></image>
        </view>
      </view>
      <view class="goods-list">
        <view class="list" v-for="(item,index) in goodsList" @click="onSkip(item)" :key="index">
          <view class="pictrue">
            <image :src="item.imageSrc" mode="heightFix"></image>
          </view>
          <view class="title-tag">
            <view class="tag">
              <text v-if="item.is_goods === 1">特价</text>
              {{item.name}}
            </view>
          </view>
          <view class="price-info">
            <view class="user-price" v-if="item.olderPrice +'' != 'null'">
              <text class="min">￥</text>
              <text class="max">{{item.olderPrice}}</text>
            </view>
            <view class="vip-price">
              <image src="/static/vip_ico.png"></image>
              <text>￥{{item.price}}</text>
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
        realPrice:0,//实际付款
        payType: '微信支付',
        goodsList:[],
			}
		},
    onLoad(params){
      this.realPrice=params.realPrice || 0;
      this.payType = params.payType || '微信支付';
      this.getGoodsList();
    },
		methods: {
			/**
			 * @param {Number} type 0 订单 1 首页
			 */
			onSkip(type){
				switch(type){
					case 0://去订单
						uni.redirectTo({
							url: '/subpkg/GoodsOrderList/GoodsOrderList'
						})
						break;
					case 1://去首页
						uni.switchTab({
							url: '/pages/home/home'
						})
						break;
          default:
            uni.redirectTo({
            	url: '/subpkg/GoodsDetails/GoodsDetails?goods_id=' + type.id
            })
            break;
				}
			},
      async getGoodsList(){
          const lowPrice = parseFloat(this.realPrice - 50).toFixed(2);
          const topPrice = parseFloat(this.realPrice + 200).toFixed(2);
          const {data: res} = await uni.$http.get('/goods/getGoodsListLikePrice',{
            "lowPrice" : lowPrice,
            "topPrice" : topPrice
          })
          if (res.status !== 200) return uni.$showMsg()
          console.log(res.data)
          this.goodsList = res.data;
      },
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
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: #FFFFFF;
	}
	.pay-price{
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 200rpx;
		background-color: #FFFFFF;
		.icon{
			width: 150rpx;
			height: 100rpx;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.price-data{
			height: 100rpx;
			margin-left: 50rpx;
			.list{
				display: flex;
				align-items: center;
				width: 100%;
				height: 50rpx;
				.title{
					font-size: 28rpx;
					color: #222222;
				}
				.content{
					font-size: 28rpx;
					color: $base;
				}
			}
		}
	}
	/* 跳转按钮 */
	.skip-btn{
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100rpx;
		margin-top: 100rpx;
		.btn{
			display: flex;
			align-items: center;
			justify-content: center;
			width: 40%;
			height: 70%;
			font-size: 26rpx;
			color: #FFFFFF;
			background-color: $base;
			border-radius: 100rpx;
			margin: 0 20rpx;
		}
	}
	/* 为你推荐 */
	.recommend-info{
	  width: 100%;
	  background-color: #f2f2f2;
	  .recommend-title{
	    display: flex;
	    align-items: center;
	    justify-content: center;
	    width: 100%;
	    height: 100rpx;
	    .title{
	      display: flex;
	      align-items: center;
	      image{
	        width: 416rpx;
	        height: 40rpx;
	      }
	    }
	  }
	  .goods-list{
	    display: flex;
	    flex-wrap: wrap;
	    justify-content: space-between;
	    padding: 0 30rpx;
	    .list{
	      width: 49%;
	      height: 540rpx;
	      margin-bottom: 20rpx;
	      background-color: #FFFFFF;
	      border-radius: 10rpx;
	      overflow: hidden;
	      .pictrue{
	        display: flex;
	        justify-content: center;
	        width: 100%;
	        image{
	          height: 350rpx;
	        }
	      }
	      .title-tag{
	        // display: flex;
	        height: 100rpx;
	        padding: 20rpx;
	        .tag{
	          float: left;
	          margin-right: 10rpx;
	          overflow: hidden;
	          text-overflow: ellipsis;
	          display: -webkit-box;
	          -webkit-line-clamp: 2;
	          -webkit-box-orient: vertical;
	          white-space: normal;
	          font-size: 26rpx;
	          line-height: 40rpx;
	          text{
	            font-size: 24rpx;
	            color: #FFFFFF;
	            padding: 4rpx 16rpx;
	            background: linear-gradient(to right,$base,$change-clor);
	            border-radius: 6rpx;
	            margin-right: 10rpx;
	          }
	        }
	      }
	      .price-info{
	        display: flex;
	        flex-wrap: wrap;
	        align-items: center;
	        justify-content: space-between;
	        padding: 0 20rpx;
	        height: 80rpx;
	        .user-price{
	          display: flex;
	          align-items: center;
	          text{
	            color: $price-clor;
	          }
	          .min{
	            font-size: 24rpx;
	          }
	          .max{
	            font-size: 32rpx;
	          }
	        }
	        .vip-price{
	          display: flex;
	          align-items: center;
	          image{
	            width: 26rpx;
	            height: 26rpx;
	            margin-right: 10rpx;
	          }
	          text{
	            color: #fcb735;
	            font-size: 24rpx;
	          }
	        }
	      }
	    }
	  }
	}
	
</style>
