import {checkLogin} from "./user.js";
const app = getApp();

// 订单确认
export function confirm(cartId){
	return new Promise((resolve,reject)=>{
		uni.showProgress();
		uni.setProgressPercent(20)
		checkLogin().then(o=>{
			uni.request({
				url: app.globalData.baseUrl + "/api/order/confirm",
				method:"POST",
				header:{
					"Content-Type":"application/json",
					"Authori-zation":"Bearer " + app.globalData.token
				},
				data:{
					cartId
				},
				success(e) {
					uni.setProgressPercent(100)
					uni.closeProgress()
					resolve(e.data)
				}
			})
		})
	})
}

// 计算订单金额
export function orderComputed(key="",addressId="",couponId="",useIntegral=0,payType="weixin"){
	if(key==""||addressId==""){
		return {status:0,msg:'参数错误'}
	}
	return new Promise((resolve,reject)=>{
		checkLogin().then(o=>{
			uni.request({
				url: app.globalData.baseUrl + "/api/order/computed/" + key,
				method:"POST",
				header:{
					"Authori-zation":"Bearer " + app.globalData.token
				},
				data:{
					addressId,
					couponId,
					useIntegral,
					payType
				},
				success(e) {
					resolve(e.data)
				}
			})
		})
	})
}

// 订单创建(weixin:微信支付，yue:余额支付)
export function orderCreate(params,payType="yue"){
	return new Promise((resolve,reject)=>{
		checkLogin().then(o=>{
			let p = {...params,payType};
			uni.request({
				url: app.globalData.baseUrl + "/api/order/create/" + p.key,
				method:"POST",
				header:{
					"Authori-zation":"Bearer " + app.globalData.token
				},
				data:p,
				success(e) {
					resolve(e.data)
				}
			})
		})
	})
}
//获取商品订单列表
export function getOrderList(params){
	return new Promise((resolve,reject)=>{
		uni.request({
			url: app.globalData.baseUrl + "/goodsOrder/getOrderListPages",
			header:{
				"Authori-zation":"Bearer " + app.globalData.token
			},
			data:params,
			success(e) {
				resolve(e.data)
			},
			fail() {
				uni.closeProgress()
				uni.showToast({
					title:"请求失败",
					icon:"none"
				})
			}
		})
	})
}

//获取服务订单列表
export function getServiceOrderList(params){
	return new Promise((resolve,reject)=>{
		uni.request({
			url: app.globalData.baseUrl + "/service_order_order/getServiceOrderListPages",
			header:{
				"Authori-zation":"Bearer " + app.globalData.token
			},
			data:params,
			success(e) {
				resolve(e.data)
			},
			fail() {
				uni.closeProgress()
				uni.showToast({
					title:"请求失败",
					icon:"none"
				})
			}
		})
	})
}

// 订单支付
export function orderPay(order_id,paytype,from="routine"){
	return new Promise((resolve,reject)=>{
		checkLogin().then(o=>{
			uni.request({
				url: app.globalData.baseUrl + "/api/order/pay",
				header:{
					"Authori-zation":"Bearer " + app.globalData.token
				},
				method:"POST",
				data:{
					uni:order_id,
					paytype,
					from
				},
				success(e) {
					resolve(e.data)
				}
			})
		})
	})
}

// 取消订单
export function orderCancel(id){
	return new Promise((resolve,reject)=>{
		checkLogin().then(o=>{
			uni.request({
				url: app.globalData.baseUrl + "/api/order/cancel",
				header:{
					"Authori-zation":"Bearer " + app.globalData.token
				},
				method:"POST",
				data:{
					id
				},
				success(e) {
					resolve(e.data)
				}
			})
		})
	})
}

// 获取订单详情
export function orderDetail(order_id){
	return new Promise((resolve,reject)=>{
		checkLogin().then(o=>{
			uni.request({
				url: app.globalData.baseUrl + "/api/order/detail/" + order_id,
				header:{
					"Authori-zation":"Bearer " + app.globalData.token
				},
				success(e) {
					resolve(e.data)
				}
			})
		})
	})
}

// 获取订单产品信息
export function orderProduct(unique){
	return new Promise((resolve,reject)=>{
		checkLogin().then(o=>{
			uni.request({
				url: app.globalData.baseUrl + "/api/order/product",
				method:"POST",
				header:{
					"Authori-zation":"Bearer " + app.globalData.token
				},
				data:{
					unique
				},
				success(e) {
					resolve(e.data)
				}
			})
		})
	})
}

// 订单评价
export function orderComment(params){
	return new Promise((resolve,reject)=>{
		checkLogin().then(o=>{
			uni.request({
				url: app.globalData.baseUrl + "/api/order/comment",
				method:"POST",
				header:{
					"Authori-zation":"Bearer " + app.globalData.token
				},
				data:params,
				success(e) {
					resolve(e.data)
				}
			})
		})
	})
}

// 再次下单
export function orderAgain(unis){
	return new Promise((resolve,reject)=>{
		checkLogin().then(o=>{
			uni.request({
				url: app.globalData.baseUrl + "/api/order/again",
				method:"POST",
				header:{
					"Authori-zation":"Bearer " + app.globalData.token
				},
				data:{
					uni:unis
				},
				success(e) {
					resolve(e.data)
				}
			})
		})
	})
}

// 订单退款理由
export function orderRefundReason(){
	return new Promise((resolve,reject)=>{
		checkLogin().then(o=>{
			uni.request({
				url: app.globalData.baseUrl + "/api/order/refund/reason",
				header:{
					"Authori-zation":"Bearer " + app.globalData.token
				},
				success(e) {
					resolve(e.data)
				}
			})
		})
	})
}

// 订单退款审核
export function orderRefundVerify(params){
	return new Promise((resolve,reject)=>{
		checkLogin().then(o=>{
			uni.request({
				url: app.globalData.baseUrl + "/api/order/refund/verify",
				method:"POST",
				header:{
					"Authori-zation":"Bearer " + app.globalData.token
				},
				data:params,
				success(e) {
					resolve(e.data)
				}
			})
		})
	})
}

export default{
	confirm,
	orderComputed,
	orderCreate,
	getOrderList,
  getServiceOrderList,
	orderPay,
	orderCancel,
	orderDetail,
	orderProduct,
	orderComment,
	orderAgain,
	orderRefundReason,
	orderRefundVerify
}