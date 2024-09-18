<template>
  <!-- 商品订单列表页面 -->
	<view class="order-list">
    <!-- 顶部导航 -->
    <!-- <view>
      <f-navbar title="我的订单" fontSize="35" fontColor="#fff"
        gradient="linear-gradient(90deg,rgb(255, 0, 0),rgb(170, 0, 255))"></f-navbar>
    </view> -->
		<!-- <navbar :showBack="true">我的订单</navbar> -->
		<view>
			<u-tabs ref="uTabs" gutter="60" height="80" active-color="#e93323" :bold="false" :list="list" :current="current" @change="tabsChange" :is-scroll="true" swiperWidth="750"></u-tabs>
		</view>
		<swiper :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish" class="swiper" :style="'height: calc(100vh - '+hei+'rpx);'">
			<swiper-item class="swiper-item" v-for="(item,index) in list" :key="index">
				<scroll-view scroll-y class="scroll-view" @scrolltolower="onreachBottom" v-if="JSON.stringify(item.orderList) != '[]'" :style="'height: calc(100vh - '+hei+'rpx);'">
          <view class="scroll-view-item"  v-for="(item2,index2) in item.orderList" :key="index2">
					<!-- <navigator :url="'/pages/pack/order_detail/order_detail?order_id='+item2.goodsOrderId" class="scroll-view-item" v-for="(item2,index2) in item.orderList" :key="index2"> -->
						<view class="title acea-row row-between-wrapper">
							<view class="acea-row row-middle">{{item2.createTime}}</view>
							<view class="font-color" v-if="item2.orderStatus=='待付款'">未付款</view>
							<view class="font-color" v-else>{{item2.orderStatus}}</view>
              <!-- 退款 -->
							<!-- <view class="font-color" v-if="item2.refund_status!=0">{{item2.refund_status | setRefund}}</view> -->
						</view>
						<view class="item-info acea-row row-between row-top" v-for="(item3,index3) in item2.goodsVoList" :key="index3">
							<view class="pic"><image :src="item3.imageSrc" mode="" style="width: 200rpx;
		height: 200rpx;"></image></view>
							<view class="text acea-row row-between">
								<view class="name line2" style="margin-left:80rpx ;">{{item3.name}}</view>
								<view class="money">
									<view>￥{{item3.price}}</view>
									<view>x{{item3.number}}</view>
								</view>
							</view>
						</view>
						<view class="totalPrice" v-if="item2.orderStatus=='待付款'">
							共{{item2.sumNumber}}件商品，需付款
							<text class="money font-color">￥{{item2.realPrice}}</text>
						</view>
						<view class="bottom acea-row row-right row-middle" v-if="item2.orderStatus=='待付款'">
							<view class="bnt cancelBnt" @click.stop="orderCancel(item2.goodsOrderId)">取消订单</view>
							<view class="bnt bg-color" v-if="item2.isOutTime==0" @click.stop="openPay(item2.goodsOrderId,item2.realPrice)">立即付款</view>
              <view class="bnt" style="background-color: #aaaaaa;" v-if="item2.isOutTime==1" >支付超时</view>
            </view>
						<view class="bottom acea-row row-right row-middle" v-else>
              <view class="bnt bg-color" style="background-color: #ffd83c;" v-if="item2.orderStatus=='待收货'" @click.stop="acceptGoods(item2.goodsOrderId,item2.realPrice)">确认收货</view>
              <view class="bnt bg-color" style="background-color: #ffd83c;" v-if="item2.orderStatus=='待评价'" @click.stop="assessGoods(item2.goodsOrderId,item2.realPrice)">立即评价</view>
							<view class="bnt bg-color" @click.stop="toGoodsOrderDetail(item2.goodsOrderId,item2.orderStatus)">查看详情</view>
						</view>
					<!-- </navigator> -->
          </view>
					<u-loadmore :status="item.status" bg-color="#f2f2f2" margin-bottom="20"/>
				</scroll-view>
				<view class="no-orderList" v-else :style="'height: calc(100vh - '+hei+'rpx);'">
					<image src="../../static/images/noOrder.png" mode=""></image>
				</view>
			</swiper-item>
		</swiper>
		<!-- <payType-window :show="showPay" :showIcon="false" :payType="payType" @close="closePay" @changeType="changeType"></payType-window> -->
		<!-- 进度条开始 -->
		<!-- <line-progress></line-progress> -->
		<!-- 进度条结束 -->
	</view>
</template>

<script>
  // 按需导入mapState, mapMutations, mapGetters 辅助函数
  import {
    mapState,
    mapMutations,
    mapGetters
  } from 'vuex'
	import api from "@/api/api.js";
	const app = getApp();
	export default{
		data(){
			return{
				current:0,//tabs  current
				swiperCurrent:0, 
				type:0,
				loop:0,
				hei:0,//高度
				showPay:false,
				order_id:"",
				goshow:false,
        // 总数量，用来实现分页
        currentTotal: 0,
				list: [{
						name: '待付款',
						id:0,
						type:0,
						page:1,
						limit:5,
            total:0,
						status:"loadmore",
						orderList:[]
					}, {
						name: '待发货',
						id:1,
						type:1,
						page:1,
						limit:5,
            total:0,
						status:"loadmore",
						orderList:[]
					}, {
						name: '待收货',//订单状态 名称
						id:2,
						type:2,//订单状态 编号
						page:1,
						limit:5,
            total:0,
						status:"loadmore",
						orderList:[]//订单列表
					}, {
						name: '待评价',
						id:3,
						type:3,
						page:1,
						limit:5,
            total:0,
						status:"loadmore",
						orderList:[]
					}, {
						name: '已完成',
						id:4,
						type:4,
						page:1,
						limit:5,
            total:0,
						status:"loadmore",
						orderList:[]
					}
				]
			}
		},
    computed: {
      // 将 m_cart 模块中的 cart 数组映射到当前页面中使用
      ...mapState('m_user', ['userInfo']),
    },
		onLoad(e) {
      if(this.userInfo.openId===undefined || this.userInfo.userId===undefined ){
        uni.$showMsg("登录尽享更多权益~")
        setTimeout(()=>{
          uni.navigateTo({
            url: '/subpkg/login/login',
            // 页面跳转成功之后的回调函数
            success: () => {
              // 调用 vuex 的 updateRedirectInfo 方法，把跳转信息存储到 Store 中
              this.updateRedirectInfo({
                // 跳转的方式
                openType: 'navigate',
                // 从哪个页面跳转过去的
                from: '/subpkg/GoodsOrderList/GoodsOrderList'
              })
            }
          })
        },1000)
        return;
      }
			this.hei = app.globalData.navHeight + 80;
			this.init(e)
		},
		onShow() {
			if(this.goshow){
				this.reload()
			}
		},
		filters:{
			setStatus:function(e){
				switch(e){
          case 0:
          	return "待付款"
          break;
					case 1:
						return "待发货"
					break;
					case 2:
						return "待收货"
					break;
					case 3:
						return "待评价"
					break;
					case 4:
						return "已完成"
					break;
				}
			},
			setRefund:function(e){
				switch(e){
					case 1:
						return "申请中"
					break;
					case 2:
						return "已退款"
					break;
				}
			}
		},
		methods:{
      toGoodsOrderDetail(goodsOrderId,orderStatus){
        if(orderStatus!=='待付款'){
          uni.navigateTo({
            url:'/subpkg/GoodsOrderDetail/GoodsOrderDetail?goodsOrderId='+goodsOrderId
          })
        }
      },
			async init(e){
				let list = this.list;
				for(let i of list){
					await this.getOrderList(i.page,i.limit,i.type)
				}
				this.goshow = true;
				if(JSON.stringify(e) != "{}"){
					this.swiperCurrent = e.type;
          this.current=e.type;
          this.currentTotal=this.list[e.type].total;
				}
			},
			async reload(current){
				const that = this;
				let params = {};
				let list = this.list;
				for(let i of list){
					await this.reloadOrderList(i.page,i.limit,i.type)
				}
			},
			reloadOrderList(page,limit,type){
        // ** 打开节流阀
        this.isloading = true
				const that = this;
        const openId = this.userInfo.openId;
				let params = {page,limit,type,openId};
				let list = this.list;
				list.find(f=>f.type==type).status = "loading";
				this.list = list
				return new Promise((resolve, reject) => {
					api.order.getOrderList(params).then(e=>{
            console.log("reloadOrderList===》 getOrderList  =====》》》e>>>>>>>>>>>>>>")
            console.log(e);
						let d = list.find(f=>f.type==type);
						if (e.status !== 200) return uni.$showMsg();
						d.orderList = e.data.records;
						d.page = page;
						d.total=e.data.total;
						that.list = list;
						// ** 关闭节流阀
						this.isloading = false;
						d.status = "loadmore";
						resolve("ok");
					})
				})
			},
			getOrderList(page,limit,type){
        // ** 打开节流阀
        this.isloading = true
				const that = this;
				const openId = this.userInfo.openId;
				let params = {page,limit,type,openId};
				let list = this.list;
				list.find(f=>f.type==type).status = "loading";
				this.list = list
				return new Promise((resolve, reject) => {
					api.order.getOrderList(params).then(e=>{
            console.log("getOrderList===》 getOrderList  =====》》》e>>>>>>>>>>>>>>")
            console.log(e.data);
						let d = list.find(f=>f.type==type);
            if (e.status !== 200) return uni.$showMsg();
            d.orderList = d.orderList.concat(e.data.records);
            d.page = page;
            d.total=e.data.total;
						that.list = list;
            // ** 关闭节流阀
            this.isloading = false;
            d.status = "loadmore";
						resolve("ok");
					})
				})
			},
			// tabs通知swiper切换
			tabsChange(e) {
				console.log("tabsChange")
        this.current=e.index;
				this.swiperCurrent = e.index;
        this.currentTotal=this.list[this.current].total;
			},
			// swiper-item左右移动，通知tabs的滑块跟随移动
			transition(e) {},
			// 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
			// swiper滑动结束，分别设置tabs和swiper的状态
			animationfinish(e) {
				let current = e.detail.current;
				this.swiperCurrent = current;
				this.current = current;
        this.currentTotal=this.list[this.current].total;
			},
			// scroll-view到底部加载更多
			onreachBottom() {
        console.log("上拉触底")
        // 判断是否正在请求其它数据，如果是，则不发起额外的请求
        if (this.isloading) return uni.$showMsg("正在加载下一页")
        // 判断是否还有下一页数据     公式：当前的页码值 * 每页显示多少条数据 >= 总数条数
        if (this.list[this.current].page * this.list[this.current].limit >= this.currentTotal) {
          this.list[this.current].status="nomore";
          return uni.$showMsg('数据加载完毕！')
        }
				let current = this.current;
				let i = this.list.find(e=>e.id==current)
				this.getOrderList(i.page+1,i.limit,i.type)
			},
			async orderCancel(id){ // 取消订单
				const that = this;
				let current = this.current;
				let orderList = this.list[current].orderList;
				let orderList_idx = orderList.findIndex(e=>e.goodsOrderId == id)
				uni.showModal({
					title:"是否取消并删除该订单？",
					async success(e) {
						console.log(e)
						if(e.confirm){
              // 发起请求
              console.log(id)
              let goodsOrderId=id;
              const {data: res} = await uni.$http.put('/goodsOrder/cancelGoodsOrder', goodsOrderId)
              if (res.status !== 200) return uni.$showMsg()//失败
              //成功
              uni.$showMsg("订单取消成功")
							orderList.splice(orderList_idx,1);
							that.list[current].orderList = orderList;
						}
					}
				})
			},
			openPay(goodsOrderId,realPrice){
        console.log(goodsOrderId)
        console.log(realPrice)
        uni.navigateTo({
          url:'/subpkg/CashierDesk/CashierDesk?goodsOrderId=' + goodsOrderId + '&realPrice=' + realPrice
        })
				// this.order_id = id;
        // this.goodsOrderId=params.goodsOrderId || 0;
        // this.realPrice=params.realPrice || 0;
			},
		}
	}
</script>

<style>
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
  	/* background-color: #e93323!important; */
    background-color: #e93323;
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
  
	.order-list .swiper{
		width: 100%;
	}
	.order-list .swiper .swiper-item .scroll-view{
		background-color: #f2f2f2;
	}
	.order-list .swiper .swiper-item .scroll-view .scroll-view-item{
		width: 690rpx;
		margin: 16rpx auto 0;
		background-color: #FFFFFF;
		border-radius: 16rpx;
	}
	.order-list .swiper .swiper-item .scroll-view .scroll-view-item:last-of-type{
		margin: 16rpx auto;
	}
	.order-list .swiper .swiper-item .scroll-view .scroll-view-item .title{
		height: 84rpx;
		padding: 0 30rpx;
		border-bottom: 1rpx solid #eee;
		font-size: 28rpx;
		color: #282828;
	}
	.order-list .swiper .swiper-item .scroll-view .scroll-view-item .item-info{
		padding: 0 30rpx;
		margin-top: 22rpx;
	}
	.order-list .swiper .swiper-item .scroll-view .scroll-view-item .item-info .pic{
		width: 120rpx;
		height: 120rpx;
	}
	.order-list .swiper .swiper-item .scroll-view .scroll-view-item .item-info .pic image{
		border-radius: 6rpx;
	}
	.order-list .swiper .swiper-item .scroll-view .scroll-view-item .item-info .text{
		width: 486rpx;
		font-size: 28rpx;
		color: #999;
		margin-top: 6rpx;
	}
	.order-list .swiper .swiper-item .scroll-view .scroll-view-item .item-info .text .name{
		width: 306rpx;
		color: #282828;
	}
	.order-list .swiper .swiper-item .scroll-view .scroll-view-item .item-info .text .money{
		text-align: right;
	}
	.order-list .swiper .swiper-item .scroll-view .scroll-view-item .totalPrice{
		font-size: 26rpx;
		color: #282828;
		text-align: right;
		margin: 27rpx 0 0 30rpx;
		padding: 0 30rpx 30rpx 0;
		border-bottom: 1rpx solid #eee;
	}
	.order-list .swiper .swiper-item .scroll-view .scroll-view-item .totalPrice .money{
		font-size: 28rpx;
		font-weight: bold;
	}
	.order-list .swiper .swiper-item .scroll-view .scroll-view-item .bottom{
		height: 107rpx;
		padding: 0 30rpx;
	}
	.order-list .swiper .swiper-item .scroll-view .scroll-view-item .bottom .bnt{
		width: 176rpx;
		height: 60rpx;
		text-align: center;
		line-height: 60rpx;
		color: #fff;
		border-radius: 50rpx;
		font-size: 27rpx;
	}
	.order-list .swiper .swiper-item .scroll-view .scroll-view-item .bottom .bnt:nth-child(2){
		margin-left: 17rpx;
	}
	.order-list .swiper .swiper-item .scroll-view .scroll-view-item .bottom .bnt.cancelBnt{
		border: 1rpx solid #ddd;
		color: #aaa;
	}
	.order-list .swiper .swiper-item .no-orderList{
		width: 100%;
		background-color: #f2f2f2;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 50rpx;
	}
	.order-list .swiper .swiper-item .no-orderList image{
		width: 414rpx;
		height: 336rpx;
	}
	.order-list .swiper .swiper-item .no-orderList text{
		font-size: 26rpx;
		color: #999;
	}
</style>
