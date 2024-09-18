<template>
	<view class="authorize" v-show="show">
		<view class="popup">
			<view class="pic"><image src="../../static/images/authorize01.jpg" mode=""></image></view>
			<view class="title">授权提醒</view>
			<view class="tip">请授权头像等信息，以便为您提供更好的服务</view>
			<view class="bottom">
				<view class="item" @click="close">随便逛逛</view>
				<button type="primary" open-type="getUserInfo" class="item grant" @getuserinfo="goAuthorize">去授权</button>
			</view>
		</view>
		<view class="close" @click="close"></view>
	</view>
</template>

<script>
	import {login} from "@/api/user.js";
	export default{
		props:{
			show:{
				type:Boolean,
				default:false
			}
		},
		data(){
			return{
				
			}
		},
		watch:{

		},
		created() {
			
		},
		methods:{
			close:function(){
				this.$emit("closePop")
			},
			goAuthorize:function(re){ //去授权
				this.$emit("login")
			}
		}
	}
</script>

<style scoped>
	.authorize .popup{
		width: 500rpx;
		background-color: #fff;
		position: fixed;
		top: 50%;
		left: 50%;
		margin-left: -250rpx;
		transform: translateY(-50%);
		z-index: 1001;
	}
	.authorize .popup .pic{
		width: 150rpx;
		height: 150rpx;
		margin: -67rpx auto 0 auto;
		display: block;
		border: 8rpx solid #fff;
		border-radius: 50%;
	}
	.authorize .popup .pic image{
		border-radius: 50%;
	}
	.authorize .popup .title{
		font-size: 28rpx;
		color: #000;
		text-align: center;
		margin-top: 30rpx;
	}
	.authorize .popup .tip{
		font-size: 22rpx;
		color: #555;
		padding: 0 24rpx;
		margin-top: 25rpx;
	}
	.authorize .popup .bottom{
		display: flex;
	}
	.authorize .popup .bottom .item{
		width: 50%;
		height: 80rpx;
		background-color: #eeeeee;
		text-align: center;
		line-height: 80rpx;
		font-size: 24rpx;
		color: #666;
		margin-top: 54rpx;
	}
	.authorize .popup .bottom .grant{
		font-size: 28rpx;
		color: #fff;
		font-weight: bold;
		background-color: #e93323;
		border-radius: 0;
		padding: 0;
	}
	.authorize .close{
		position: fixed;
		top: 0;
		right: 0;
		left: 0;
		bottom: 0;
		background-color: rgba(0,0,0,0.65);
		z-index: 1000;
	}
</style>
