<template>
  <view class="user">
    <!-- 顶部导航 -->
    <view>
      <f-navbar title="个人中心" fontSize="35" fontColor="#fff"
        gradient="linear-gradient(90deg,rgb(255, 0, 0),rgb(170, 0, 255))"></f-navbar>
    </view>
  	<!-- <navbar backgroundColor="#e93323" color="#ffffff">个人中心</navbar> -->
  	<view class="header acea-row row-between-wrapper" style="background:linear-gradient(90deg,rgb(255, 0, 0),rgb(170, 0, 255)) ;">
  		<view class="picTxt acea-row row-between-wrapper">
  			<view class="pic"><image :src="userInfo.avatarUrl+''!=='undefined'?userInfo.avatarUrl:''" mode="" class="pic"></image></view>
  			<view class="text">
  				<view class="acea-row row-middle">
  					<!-- <view class="name line1" @click="openPop">{{userInfo?userInfo.nickname:"请点击授权"}}</view> -->
            <view class="name line1" @click="openPop">{{userInfo.nickName+''==='undefined'?"请点击授权":userInfo.nickName}}</view>
  				</view>
  				<!-- <view class="getPhone">
  					<text>绑定手机号</text>
  				</view> -->
  			</view>
  		</view>
  		<navigator url="/pages/pack/user_info/user_info" class="setting iconfont icon-shezhi"></navigator>
  	</view>
  	<view class="wrapper">
  		<view class="nav acea-row row-middle">
  			<view class="item" @click="onWallet('wallet')">
  				<view>我的余额</view>
  				<view class="num">{{userInfo.balance | 0}}</view>
  			</view>
  			<view class="item" @click="onWallet('integral')">
  				<view>当前积分</view>
  				<view class="num">{{userInfo.integral | 0}}</view>
  			</view>
  			<view class="item" @click="onWallet('coupon')">
  				<view>优惠券</view>
  				<view class="num">{{userInfo.couponCount |0}}</view>
  			</view>
  		</view>
      <!-- 签到积分，付款码 -->
      <view class="integral-payment">
      	<view class="list" @click="onWallet('SignIn')">
      		<view class="title">
      			<text class="iconfont icon-qiandao" style="font-weight: bold;"></text>
      			<text>签到</text>
      		</view>
      		<view class="mess">
      			<text>每日签到 领取积分</text>
      		</view>
      	</view>
      	<view class="list" @click="onWallet('payment')">
      		<view class="title">
      			<text class="iconfont icon-fukuanma"></text>
      			<text>付款码</text>
      		</view>
      		<view class="mess">
      			<text>到店扫码 快捷支付</text>
      		</view>
      	</view>
      </view>
      <!-- 我的订单   -->
  		<view class="myOrder">
  			<view class="title acea-row row-between-wrapper">
  				<view>商城订单</view>
  				<navigator class="allOrder" :url="'/subpkg/GoodsOrderList/GoodsOrderList'">
  					全部订单
  					<text class="iconfont icon-jiantou">></text>
  				</navigator>
  			</view>
  			<view class="orderState acea-row row-middle">
  				<u-grid :col="5" :border="false">
  					<u-grid-item>
  						<navigator :url="'/subpkg/GoodsOrderList/GoodsOrderList?type=0'" class="item">
  							<view class="pic"><image src="../../static/images/dfk.png" mode="" class="pic"></image></view>
  							<view>待付款</view>
  						</navigator>
  					</u-grid-item>
  					<u-grid-item>
  						<navigator :url="'/subpkg/GoodsOrderList/GoodsOrderList?type=1'" class="item">
  							<view class="pic"><image src="../../static/images/dfh.png" mode="" class="pic"></image></view>
  							<view>待发货</view>
  						</navigator>
  					</u-grid-item>
  					<u-grid-item>
  						<navigator :url="'/subpkg/GoodsOrderList/GoodsOrderList?type=2'" class="item">
  							<view class="pic"><image src="../../static/images/dsh.png" mode="" class="pic"></image></view>
  							<view>待收货</view>
  						</navigator>
  					</u-grid-item>
  					<u-grid-item>
  						<navigator :url="'/subpkg/GoodsOrderList/GoodsOrderList?type=3'" class="item">
  							<view class="pic"><image src="../../static/images/dpj.png" mode="" class="pic"></image></view>
  							<view>待评价</view>
  						</navigator>
  					</u-grid-item>
  					<u-grid-item>
  						<navigator :url="'/subpkg/GoodsOrderList/GoodsOrderList?type=4'" class="item">
  							<view class="pic"><image src="../../static/images/sh.png" mode="" class="pic"></image></view>
  							<view>已完成</view>
  						</navigator>
  					</u-grid-item>
  				</u-grid>
  			</view>
  		</view>
      <!-- 我的预约   -->
      <view class="myOrder">
      	<view class="title acea-row row-between-wrapper">
      		<view>预约订单</view>
      		<navigator class="allOrder" :url="'/subpkg/ServiceOrderList/ServiceOrderList'">
      			全部订单
      			<text class="iconfont icon-jiantou">></text>
      		</navigator>
      	</view>
      	<view class="orderState acea-row row-middle">
      		<u-grid :col="5" :border="false">
      			<u-grid-item>
      				<navigator :url="'/subpkg/ServiceOrderList/ServiceOrderList?type=0'" class="item">
      					<view class="pic"><image src="../../static/images/dfk.png" mode="" class="pic"></image></view>
      					<view>待付款</view>
      				</navigator>
      			</u-grid-item>
      			<u-grid-item>
      				<navigator :url="'/subpkg/ServiceOrderList/ServiceOrderList?type=1'" class="item">
      					<view class="pic"><image src="../../static/images/dfh.png" mode="" class="pic"></image></view>
      					<view>待使用</view>
      				</navigator>
      			</u-grid-item>
      			<u-grid-item>
      				<navigator :url="'/subpkg/ServiceOrderList/ServiceOrderList?type=3'" class="item">
      					<view class="pic"><image src="../../static/images/dpj.png" mode="" class="pic"></image></view>
      					<view>待评价</view>
      				</navigator>
      			</u-grid-item>
      			<u-grid-item>
      				<navigator :url="'/subpkg/ServiceOrderList/ServiceOrderList?type=4'" class="item">
      					<view class="pic"><image src="../../static/images/sh.png" mode="" class="pic"></image></view>
      					<view>已完成</view>
      				</navigator>
      			</u-grid-item>
      		</u-grid>
      	</view>
      </view>
      <!-- 我的服务 -->
  		<view class="myService">
  			<view class="title acea-row row-middle">我的服务</view>
  			<view class="serviceList acea-row row-middle">
  				<u-grid :col="4" :border="false">
  					<!-- <u-grid-item>
  						<navigator url="/subpkg2/MyMemberInterest/MyMemberInterest" class="item">
  							<view class="pic"><image src="../../static/images/myService01.png" mode="" class="pic"></image></view>
  							<view>会员中心</view>
  						</navigator>
  					</u-grid-item> -->
  					<u-grid-item>
  						<view @click="onWallet('wallet')" class="item">
  							<view class="pic"><image src="../../static/images/myService04.png" mode="" class="pic"></image></view>
  							<view>我的余额</view>
  						</view>
  					</u-grid-item>
  					<u-grid-item>
  						<!-- <navigator url="/pages/pack/user_address_list/user_address_list" class="item"> -->
                <view @click="myAddress" class="item">
  							<view class="pic"><image src="../../static/images/myService05.png" mode="" class="pic"></image></view>
  							<view>地址信息</view>
  						</view>
  					</u-grid-item>
  					<u-grid-item>
  						<view @click="onWallet('coupon')" class="item">
  							<view class="pic"><image src="../../static/images/myService07.png" mode="" class="pic"></image></view>
  							<view>优惠券</view>
  						</view>
  					</u-grid-item>
  					<u-grid-item>
  						<view @click="onWallet('integral')" class="item">
  							<view class="pic"><image src="../../static/images/myService02.png" mode="" class="pic"></image></view>
  							<view>我的积分</view>
  						</view>
  					</u-grid-item>
            <!-- <u-grid-item>
            	<navigator url="/subpkg/BrowsingHistory/BrowsingHistory" class="item">
            		<view class="pic"><image src="../../static/images/myService02.png" mode="" class="pic"></image></view>
            		<view>浏览记录</view>
            	</navigator>
            </u-grid-item> -->
  				</u-grid>
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
    computed: {
      // 将 m_cart 模块中的 cart 数组映射到当前页面中使用
      ...mapState('m_user', ['userInfo','token']),
    },
    data() {
      return {
        show:false,//授权登录弹窗  是否显示
        iflogin:false,//是否登录
      }
    },
    onLoad(){
      if(this.userInfo.openId===undefined || this.userInfo.userId===undefined ){
        uni.$showMsg("登录尽享更多权益~")
        uni.navigateTo({
          url: '/subpkg/login/login',
          // 页面跳转成功之后的回调函数
          success: () => {
            // 调用 vuex 的 updateRedirectInfo 方法，把跳转信息存储到 Store 中
            this.updateRedirectInfo({
              // 跳转的方式
              openType: 'navigate',
              // 从哪个页面跳转过去的
              from: '/pages/vipcard/vipcard'
            })
          }
        })
        return;
      }
    },
    methods:{
      // 把 m_user 模块中的 updateRedirectInfo 方法映射到当前页面中使用
      ...mapMutations('m_user', ['updateRedirectInfo']),
      //请点击授权  单击事件
      openPop:function(){
      	// if(!this.iflogin){
      	// 	this.show = true
      	// }
        uni.navigateTo({
          url: '/subpkg/login/login'
        })
      },
      // 弹窗关闭 单击事件
      closePop:function(){
      	this.show = false
      },
      /**
       * 钱包跳转点击
       */
      onWallet(type){
      	switch (type){
      		case 'integral'://积分页面
      			uni.navigateTo({
      				url: '/subpkg2/IntegralDetails/IntegralDetails',
      			})
      			break;
      		case 'coupon'://优惠券页面
      			uni.navigateTo({
      				url: '/subpkg2/MyCoupon/MyCoupon',
      			})
      			break;
      		case 'wallet'://钱包页面
      			uni.navigateTo({
      				url: '/subpkg/MyWallet/MyWallet',
      			})
      			break;
      		case 'SignIn'://签到页面
      			uni.navigateTo({
      				url: '/subpkg/SignIn/SignIn',
      			})
      			break;
      		case 'payment'://付款码页面
      			uni.navigateTo({
      				url: '/subpkg2/PaymentCode/PaymentCode',
      			})
      			break;
      	}
      },
      //地址信息
      async myAddress(){
        const [err, succ] = await uni.chooseAddress().catch(err => err)
      },
      /**
       * 跳转点击
       * @param {String} type 跳转类型
       */
      onSkip(type){
        switch (type){
          case 'goods'://跳转到商品详情页面
            uni.navigateTo({
              url: '/subpkg/GoodsDetails/GoodsDetails',
              animationType: 'zoom-fade-out',
              animationDuration: 200
            })
            break;
        }
      },
    },
  }
</script>
<style scoped lang="scss">
/*每个页面公共css */
  @import '/colorui/main.css';
  @import '/colorui/icon.css';
  @import '/style/FontStyle.css'; 
  
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
  
  
	.user{
		font-size: 28rpx;
		background-color: #f5f5f5;
		color: #333;
		min-height: 100vh;
	}
	.user .header{
		background-color: #e93323!important;
		padding: 0 30rpx;
		height: 190rpx;
		position: relative;
	}
	.user .header::before{
		position: absolute;
		left: 0;
		right: 0;
		bottom: -290rpx;
		z-index: -1;
		content: '';
		height: 100rpx;
		width: 100%;
		border-radius: 0 0 50% 50%;
		background-color: #e93323;
	}
	.user .header .picTxt .pic{
		width: 120rpx;
		height: 120rpx;
	}
	.user .header .picTxt .pic image{
		width: 100%;
		height: 100%;
		border-radius: 50%;
		border: 2px solid #f5f5f5;
	}
	.user .header .picTxt .text{
		width: 434rpx;
		color: rgba(255,255,255,1);
		margin-left: 35rpx;
	}
	.user .header .picTxt .text .name{
		font-size: 32rpx;
		max-width: 270rpx;
	}
	.user .header .picTxt .text .getPhone{
		margin-top: 20rpx;
	}
	.user .header .picTxt .text .getPhone text{
		padding: 2rpx 18rpx;
		background-color: #ca1f10;
		border-radius: 50px;
		font-size: 22rpx;
		border: 1px solid #e8695e;
		color: #ffffff;
	}
	.user .header .setting{
		font-size: 36rpx;
		color: #fff;
		margin-top: -52rpx;
	}
	.user .wrapper{
		padding: 0 20rpx;
		position: relative;
		z-index: 999;
	}
	.user .wrapper .nav{
		background-color: #fff;
		border-radius: 6rpx;
		height: 140rpx;
	}
	.user .wrapper .nav .item{
		flex: 1;
		text-align: center;
		font-size: 26rpx;
		color: #aaa;
	}
	.user .wrapper .nav .item:nth-child(n+1){
		border-left: 1px solid #eee;
	}
	.user .wrapper .nav .item .num{
		margin-top: 10rpx;
		font-size: 36rpx;
		color: #282828;
	}
	.user .wrapper .myOrder{
		background-color: #fff;
		border-radius: 10rpx;
		margin-top: 15rpx;
	}
	.user .wrapper .myOrder .title{
		height: 88rpx;
		padding: 0 30rpx;
		border-bottom: 1px dashed #ddd;
		font-size: 30rpx;
		color: #282828;
	}
	.user .wrapper .myOrder .title .allOrder{
		font-size: 26rpx;
		color: #666;
		height: 88rpx;
		line-height: 88rpx;
	}
	.user .wrapper .myOrder .title .allOrder text{
		font-size: 30rpx;
		margin-left: 7rpx;
	}
	.user .wrapper .myOrder .orderState{
		height: 160rpx;
	}
	.user .wrapper .myOrder .orderState .item{
		font-size: 26rpx;
		color: #454545;
		flex: 1;
		text-align: center;
	}
	.user .wrapper .myOrder .orderState u-grid{
		width: 100%;
	}
	.user .wrapper .myOrder .orderState .item .pic{
		width: 49rpx;
		height: 42rpx;
		margin: 0 auto 18rpx auto;
		position: relative;
	}
	.user .wrapper .myService{
		background-color: #fff;
		margin-top: 15rpx;
		border-radius: 10rpx;
	}
	.user .wrapper .myService .title{
		height: 88rpx;
		padding: 0 30rpx;
		border-bottom: 1px dashed #ddd;
		font-size: 30rpx;
		color: #282828;
	}
	.user .wrapper .myService .serviceList{
		padding: 8rpx 0 27rpx 0;
	}
	.user .wrapper .myService .serviceList u-grid{
		width: 100%;
	}
	.user .wrapper .myService .serviceList .item{
		text-align: center;
		font-size: 26rpx;
		color: #333;
	}
	.user .wrapper .myService .serviceList .item .pic{
		width: 52rpx;
		height: 52rpx;
		margin: 0 auto 16rpx auto;
	}
  
  /* 签到，付款码 */
  .integral-payment{
  	display: flex;
  	justify-content: space-between;
  	// width: 94%;
    width: 100%;
  	height: 180rpx;
  	margin: 20rpx auto;
  	.list{
  		width: 48%;
  		height: 100%;
  		background-color: #FFFFFF;
  		border-radius: 20rpx;
  		.title{
  			display: flex;
  			align-items: center;
  			justify-content: center;
  			width: 100%;
  			height: 120rpx;
  			.iconfont{
  				font-size: 48rpx;
  				margin-right: 10rpx;
  				font-weight: normal;
  			}
  			text{
  				color: #212121;
  				font-size: 28rpx;
  				font-weight: bold;
  			}
  		}
  		.mess{
  			display: flex;
  			align-items: center;
  			justify-content: center;
  			width: 100%;
  			text{
  				color: #C0C0C0;
  				font-size: 26rpx;
  			}
  		}
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
