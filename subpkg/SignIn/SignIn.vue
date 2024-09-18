<template>
  <!-- 签到页面 -->
	<view class="page">
		<!-- 头部背景 -->
		<view class="head-bg">
			<view class="head-user">
				<view class="user">
					<image :src="userInfo.avatarUrl" mode=""></image>
					<text>{{userInfo.nickName}}</text>
				</view>
				<view class="exchange" @click="isRule = true">
					<text>规则说明</text> 
					<text class="iconfont icon-more"></text>
				</view>
			</view>
			<view class="integral-balance">
				<view class="integral" @click="onIntegral">
					<text>累计获得积分</text>
					<text class="number">{{userInfo.integral}}</text>
					<text class="btn" :class="{'action':SigninStatus===1}">{{SigninStatus===0?'立即签到':'已签到'}}</text>
				</view>
			</view>
			<view class="bg">
				<image src="/static/integral_bg1.png" mode=""></image>
			</view>
		</view>
		<!-- 签到 -->
		<view class="Signin-data">
			<view class="signin-title">
				<view class="title">
					<text>每日签到</text>
				</view>
			</view>
			<view class="day-list" v-if="!continuSignin">
				<view class="list" v-for="(item,index) in 7" 
				:class="{'action':index+1 <= signInVo.sinNumber }"
				:key="index">
					<view class="circle">
            <view v-if="signInVo.sinNumber==0">
              <text v-show="index != 6">+{{index+1}}</text>
              <text v-show="index == 6">+15</text>
            </view>
            <view v-else>
              <text v-show="index+1 > signInVo.sinNumber && index != 6">+{{index+1}}</text>
              <text v-show="index+1 > signInVo.sinNumber && index == 6">+15</text>
              <text class="iconfont icon-duihao" v-show="index+1 <= signInVo.sinNumber"></text>
            </view>
					</view>
					<view class="day">
						<text>{{index+1}}天</text>
					</view>
				</view>
			</view>
      <view class="day-list" v-else>
      	<view class="list" v-for="(item,index) in 7" 
      	:key="index">
      		<view class="circle">
            <view>
              <text v-show="index != 6">+{{index+1}}</text>
              <text v-show="index == 6">+15</text>
            </view>
      		</view>
      		<view class="day">
      			<text>{{index+1}}天</text>
      		</view>
      	</view>
      </view>
		</view>
		<!-- 签到提示弹窗 -->
		<view class="sigin-hint">
			<view class="cu-modal" :class="{'show':isSignin}">
			  <view class="cu-dialog">
			    <view class="cu-bar bg-white justify-end">
			      <view class="content">签到成功</view>
			      <view class="action">
			        <text class="cuIcon-close text-red" @click="isSignin = false"></text>
			      </view>
			    </view>
			    <view class="sigin-content">
						<view class="icon">
							<text class="iconfont icon-signin"></text>
						</view>
						<view class="title">
							<view>恭喜您，连续签到<text>{{signInVo.sinNumber}}</text>天，获得<text>{{signInVo.sinNumber==7 ? 15 : signInVo.sinNumber}}</text>积分</view>
						</view>
						<view class="hint">
							<text>连续签到7天可获得额外奖励</text>
						</view>
						<view class="btn" @click="isSignin = false">
							<text>我知道了</text>
						</view>
					</view>
			  </view>
			</view>
		</view>
		<!-- 规则说明弹窗 -->
		<view class="rule-win">
			<view class="cu-modal" :class="{'show':isRule}">
			  <view class="cu-dialog">
			    <view class="cu-bar bg-white justify-end">
			      <view class="content">规则说明</view>
			      <view class="action">
			        <text class="cuIcon-close text-red" @click="isRule = false"></text>
			      </view>
			    </view>
			    <view class="rule-content">
						<text>
							1.签到第1天送1积分，连续签到第2天送2积分，以此类推，连续签到第7天可获额外红包奖励共15积分。第8天签到则重新开始-个七日轮回，视为首日签到;若签到中断则重新计算;
							2.在幸福集市任意门店内，可进行门店打卡，将获赠额外积分，每日1次机会;
							4.本活动的红包奖励、宝箱奖励均为优惠券形式，具体面额、有效时间、使用渠道以实际到账的优惠券为准;
							5.积分可在“积分明细”中查询，优惠券可在“会员-优惠券”中查看。
						</text>
					</view>
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
				isSignin: false,//签到完成弹窗 是否显示
        signInKey:'',//签到信息对象  存储的key
        signInVo:{},//签到信息对象
        nowDate:'',//今天日期  类似 2022-04-15
        nextDate:'',//下一天日期
				SigninStatus: 0,//是否已经签到，0：未签到，1：已签到
        resetSignin: false,//是否重新计算签到天数
				// 规则
				isRule: false,//规则弹窗是否显示
			};
		},
    computed: {
      // 将 m_cart 模块中的 cart 数组映射到当前页面中使用
      ...mapState('m_user', ['userInfo']),
    },
    onLoad() {
      this.signInKey='SignIn-' + this.userInfo.userId;
      this.nowDate=uni.$getDateAndYear(new Date());//类似 2022-04-15
      var date=new Date();
      date.setDate(date.getDate() + 1);
      this.nextDate= uni.$getDateAndYear(date);//类似 2022-04-15
      this.getSignInFromRedis();
    },
		methods:{
      async getSignInFromRedis(){
        const { data: res } = await uni.$http.get('/IntegralBill/getSignInFromRedis',{"signInKey":this.signInKey})
        // 请求失败
        if (res.status !== 200) return uni.$showMsg()
        console.log(res.data);
        this.signInVo = res.data;
        if(this.nowDate == this.signInVo.sinNext){//今天===签到的下一天，说明：今天未签到，属于连续签到
          this.SigninStatus = 0;
          this.resetSignin=false;
        }else{//今天!==签到的下一天
          if(this.nowDate == this.signInVo.signNow){//今天==签到日期，说明：今天已经签到
            this.SigninStatus = 1;
          }else{//今天！==签到日期，说明：今天未签到，而且要从第一天开始算起
            this.SigninStatus = 0;
            this.resetSignin=true;
          }
        }
      },
      //  调用 mapMutations 辅助方法，把 m_user 模块中的 updateUserInfo 映射到当前组件中使用
      ...mapMutations('m_user', ['updateUserInfo']),
			/**
			 * 签到点击
			 */
			async onIntegral(){
        if(this.SigninStatus==1)return ;
        if(this.nowDate == this.signInVo.sinNext){//今天===签到的下一天，说明：今天未签到，属于连续签到
          var number= this.signInVo.sinNumber<7?this.signInVo.sinNumber+1:1
          const signInVo={
            signNow: this.nowDate,
            sinNext: this.nextDate,
            sinNumber: number,
            signInKey:this.signInKey
          };
          const { data: res } = await uni.$http.post('/IntegralBill/updateSignInToRedis',signInVo)
          // 请求失败
          if (res.status !== 200) return uni.$showMsg()
          console.log(res.data);
          this.userInfo.integral=res.data
          this.updateUserInfo(this.userInfo);
          this.getSignInFromRedis();
          this.SigninStatus = 1;
          this.isSignin = true;
        }else{//今天!==签到的下一天
          if(this.nowDate !== this.signInVo.signNow){//今天！==签到日期，说明：今天未签到，而且要从第一天开始算起
            const signInVo={
              signNow: this.nowDate,
              sinNext: this.nextDate,
              sinNumber: 1,
              signInKey:this.signInKey
            };
            const { data: res } = await uni.$http.post('/IntegralBill/updateSignInToRedis',signInVo)
            // 请求失败
            if (res.status !== 200) return uni.$showMsg()
            console.log(res.data);
            this.userInfo.integral=res.data
            this.updateUserInfo(this.userInfo);
            this.getSignInFromRedis();
            this.SigninStatus = 1;
            this.isSignin = true;
          }
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
		height: 460rpx;
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
			height: 240rpx;
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
				.btn{
					display: flex;
					align-items: center;
					justify-content: center;
					width: 260rpx;
					height: 70rpx;
					background-color: #FFFFFF;
					color: $base;
					font-size: 26rpx;
					border-radius: 80rpx;
					margin-top: 30rpx;
				}
				.action{
					background-color: #f6f6f6;
					color: #959595;
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
	
	
	/* 签到 */
	.Signin-data{
		width: 100%;
		background-color: #FFFFFF;
		border-radius: 20rpx;
		.signin-title{
			display: flex;
			align-items: center;
			padding: 0 4%;
			height: 100rpx;
			.title{
				display: flex;
				align-items: center;
				text{
					color: #222222;
					font-size: 28rpx;
					font-weight: bold;
				}
			}
		}
		.day-list{
			display: flex;
			align-items: center;
			padding: 0 4%;
			height: 200rpx;
			.list{
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				width: 14%;
				height: 100%;
				.circle{
					display: flex;
					align-items: center;
					justify-content: center;
					width: 60rpx;
					height: 60rpx;
					background-color: #EEEEEE;
					border-radius: 100%;
					text{
						font-size: 24rpx;
						color: #959595;
					}
				}
				.day{
					display: flex;
					align-items: center;
					justify-content: center;
					margin-top: 20rpx;
					text{
						font-size: 26rpx;
						color: #555555;
					}
				}
			}
			.action{
				.circle{
					background: $rgba-03;
					text{
						color: $base;
						font-weight: bold;
					}
				}
			}
		}
	}
	
	/* 邀请新人 */
	.invitation-data{
		width: 100%;
		background-color: #FFFFFF;
		border-radius: 20rpx;
		margin: 20rpx auto;
		padding-bottom: 20rpx;
		.invitation-title{
			display: flex;
			align-items: center;
			padding: 04%;
			height: 100rpx;
			.title{
				display: flex;
				align-items: center;
				width: 100%;
				text{
					color: #222222;
					font-size: 28rpx;
				}
			}
		}
		.invitation-show{
			display: flex;
			align-items: center;
			width: 94%;
			height: 160rpx;
			margin: 20rpx auto;
			background-color: #FFFFFF;
			box-shadow: 0 0 10rpx rgba(0,0,0,0.1);
			border-radius: 20rpx;
			padding-top: 10rpx;
			.icon{
				display: flex;
				justify-content: center;
				width: 15%;
				height: 80%;
				text{
					font-size: 48rpx;
					color: #0077EE;
				}
			}
			.item{
				width: 85%;
				height: 80%;
				padding-right: 20rpx;
				.title-btn{
					display: flex;
					justify-content: space-between;
					width: 100%;
					height: 80rpx;
					.title{
					display: flex;
					.bt{
							color: #222222;
							font-size: 30rpx;
							font-weight: bold;
						}
						.ji{
							font-size: 26rpx;
							color: $base;
							margin-left: 10rpx;
						}
					}
					.btn{
						display:flex;
						align-items: center;
						justify-content: center;
						width: 180rpx;
						height: 50rpx;
						background: linear-gradient(to right,$base,$change-clor);
						border-radius: 60rpx;
						box-shadow: 0 10rpx 10rpx $base;
						text{
							color: #FFFFFF;
							font-size: 24rpx;
						}
					}
				}
				.describe{
					display: flex;
					align-items: center;
					text{
						font-size: 24rpx;
						color: #959595;
					}
				}
			}
		}
	}
	
	
	/* 签到弹窗 */
	.sigin-hint{
		.sigin-content{
			width: 100%;
			height: 500rpx;
			background-color: #FFFFFF;
			.icon{
				display: flex;
				align-items: center;
				justify-content: center;
				width: 100%;
				height: 200rpx;
				text{
					color: $base;
					font-size: 160rpx;
				}
			}
			.title{
				display: flex;
				align-items: center;
				justify-content: center;
				width: 100%;
				height: 100rpx;
				view{
					font-size: 30rpx;
					font-weight: bold;
					text{
						color: $base;
					}
				}
			}
			.btn{
				display: flex;
				align-items: center;
				justify-content: center;
				width: 80%;
				height: 60rpx;
				background: linear-gradient(to right,$base,$change-clor);
				border-radius: 60rpx;
				box-shadow: 0 10rpx 10rpx $base;
				margin: 40rpx auto 0;
				text{
					font-size: 26rpx;
					color: #FFFFFF;
				}
			}
		}
	}
	
	
	/* 规则说明弹窗*/
	.rule-win{
		.rule-content{
			padding: 20rpx 4%;
			text-align: left;
			text{
				font-size: 26rpx;
				color: #555555;
				text-align: left;
				line-height: 50rpx;
			}
		}
	}
</style>
