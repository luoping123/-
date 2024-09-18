<template>
  <!-- 我的钱包页面 -->
	<view class="page">
		<!-- 头部背景 -->
		<view class="head-bg">
			<view class="head-user">
				<view class="user">
				</view>
				<view class="exchange" @click="onConsumeRecord">
					<text>消费明细</text>
					<text class="iconfont icon-more"></text>
				</view>
			</view>
			<view class="wallet-balance">
				<view class="wallet">
					<text class="number">￥{{userInfo.balance}}</text>
					<text><text class="iconfont icon-qianbao" style="margin-right: 20rpx;"></text>当前余额</text>
				</view>
			</view>
			<view class="bg">
				<image src="/static/integral_bg1.png" mode=""></image>
			</view>
		</view>
		<!-- 钱包充值 -->
		<view class="wallet-recharge">
			<view class="recharge-title">
				<text>钱包充值</text>
			</view>
			<view class="recharge-list">
				<view @click="choose(index)" class="list" v-for="(item,index) in moneyList" 
				:class="{'action':nowIndex==index}"
				:key="index">
					<view class="price">
						<text>{{item.payPrice}}元</text>
					</view>
					<view class="give">
						<text>送{{item.addPrice}}元</text>
					</view>
				</view>
			</view>
		</view>
		<view class="recharge-btn">
			<view class="btn" @click="payNow()">立即充值 ￥{{moneyList[nowIndex].payPrice}}</view>
		</view>
	</view>
</template>

<script>
  // 按需导入mapState, mapMutations, mapGetters 辅助函数
  import { mapState,mapMutations, mapGetters} from 'vuex'
	export default {
		data() {
			return {
				nowIndex:0,//选中项
        moneyList:[{//充值种类选择
            payPrice:100,//支付多少
            addPrice:20//送多少
          },{
            payPrice:200,
            addPrice:50
          },{
            payPrice:300,
            addPrice:75
          },{
            payPrice:500,
            addPrice:100
          },{
            payPrice:800,
            addPrice:150
          },{
            payPrice:1000,
            addPrice:260
          },{
            payPrice:1500,
            addPrice:350
          },{
            payPrice:2000,
            addPrice:500
          }
        ],
			};
		},
    computed: {
      // 将 m_cart 模块中的 cart 数组映射到当前页面中使用
      ...mapState('m_user', ['userInfo']),
    },
		methods:{
      //  调用 mapMutations 辅助方法，把 m_user 模块中的 updateUserInfo 映射到当前组件中使用
      ...mapMutations('m_user', ['updateUserInfo']),
      choose(index){
        this.nowIndex=index;
      },
			/**
			 * 消费明细点击
			 */
			onConsumeRecord(){
				uni.navigateTo({
					url: '/subpkg2/ConsumeRecord/ConsumeRecord'
				})
			},
      //立即充值  单击事件
      async payNow() {
        //调用指纹识别API
        var that=this;
        uni.startSoterAuthentication({
          requestAuthModes: ['fingerPrint'],
          challenge: that.orderId+'',
          authContent: '请验证指纹',
          success(res) {
            console.log(res);
            switch(res.errCode){
              case 0: //识别成功 
                  that.saveMoney();
                  break;
              case 90001: //本设备不支持生物认证
                  uni.$showMsg("本设备不支持生物认证")
                  break;
              case 90002: //用户未授权使用该生物认证接口
                  uni.$showMsg("用户未授权使用该生物认证接口")
                  break;
              case 90003: //请求使用的生物认证方式不支持
                  uni.$showMsg("请求使用的生物认证方式不支持")
                  break;
              case 90008: //用户取消授权
                  uni.$showMsg("您取消了支付")
                  break;
              case 90009: //识别失败
                  uni.$showMsg("识别失败")
                  break;
              case 90010: //重试次数过多被冻结
                  uni.$showMsg("重试次数过多被冻结")
                  break;
              case 90011: //用户未录入所选识别方式
                  uni.$showMsg("用户未录入所选识别方式")
                  break;
            }
          },
          fail(err) {
            console.log(err);
          },
          complete(res) {
            console.log(res);
          }
        })
      },
      //保存钱包数据
      async saveMoney(){
        const money=this.moneyList[this.nowIndex].payPrice + this.moneyList[this.nowIndex].addPrice;
        let moneySum=parseFloat(this.userInfo.balance + money).toFixed(2)
        const myWalletVo={
          balance : moneySum,
          userId : this.userInfo.userId
        }
        const { data: res } = await uni.$http.put('/walletBill/updateWallet',myWalletVo)
        console.log(myWalletVo);
        // 请求失败
        if (res.status !== 200) return uni.$showMsg()
        console.log(res.data);
        uni.$showMsg("充值成功")
        this.userInfo.balance=res.data;
        // 3. 将用户的基本信息存储到 vuex 中
        this.updateUserInfo(this.userInfo) 
        setTimeout(()=>{
          uni.redirectTo({
            url:'/subpkg/MyWallet/MyWallet'
          })
        },1000)
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
	background-color: #FFFFFF;
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
	.wallet-balance{
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 200rpx;
		.wallet{
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

/* 钱包充值 */
.wallet-recharge{
	width: 100%;
	background-color: #FFFFFF;
	.recharge-title{
		display: flex;
		align-items: center;
		padding: 0 4%;
		height: 100rpx;
		text{
			font-size: 30rpx;
			font-weight: bold;
			color: #222222;
		}
	}
	.recharge-list{
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		padding: 0 4% 100rpx;
		.list{
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			width: 48%;
			height: 200rpx;
			background-color: #FFFFFF;
			border: 2rpx solid #EEEEEE;
			border-radius: 10rpx;
			margin-bottom: 20rpx;
			.price{
				display: flex;
				align-items: center;
				justify-content: center;
				width: 100%;
				text{
					font-size: 32rpx;
					font-weight: bold;
					color: #555555;
				}
			}
			.give{
				display: flex;
				align-items: center;
				justify-content: center;
				width: 100%;
				margin-top: 10rpx;
				text{
					font-size: 26rpx;
					color: #959595;
				}
			}
		}
		.action{
			background-color: $rgba-02;
			border: 2rpx solid $base;
			.price{
				text{
					color: $base;
				}
			}
			.give{
				text{
					color: $base;
				}
			}
		}
	}
}


/* 充值按钮 */
.recharge-btn{
	position: fixed;
	left: 0;
	bottom: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100rpx;
	background-color: #FFFFFF;
	.btn{
		display: flex;
		align-items: center;
		justify-content: center;
		width: 90%;
		height: 70rpx;
		color: #FFFFFF;
		font-size: 28rpx;
		background-color: $base;
		border-radius: 70rpx;
		box-shadow: 0 10rpx 10rpx $base;
	}
}
</style>
