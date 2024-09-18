import {checkLogin} from "./user.js";
const app = getApp();
// 我的优惠券
export function getCoupon(type=1){
	return new Promise((resolve,reject)=>{
		checkLogin().then(o=>{
			uni.request({
				url: app.globalData.baseUrl + "/api/coupons/user/" + type,
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

// 领取优惠券列表
export function getCouponsList(page=1,limit=100,product_id=0,type=0){
	return new Promise((resolve,reject)=>{
		checkLogin().then(o=>{
			uni.showProgress();
			uni.setProgressPercent(20)
			uni.request({
				url: app.globalData.baseUrl + "/api/coupons",
				header:{
					"Authori-zation":"Bearer " + app.globalData.token
				},
				data:{
					page,
					limit,
					product_id,
					type
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

// 领取优惠券
export function receiveCoupon(id){
	return new Promise((resolve,reject)=>{
		checkLogin().then(o=>{
			uni.request({
				url: app.globalData.baseUrl + "/api/coupon/receive",
				method:"POST",
				header:{
					"Authori-zation":"Bearer " + app.globalData.token
				},
				data:{
					couponId:id
				},
				success(e) {
					resolve(e.data)
				}
			})
		})
	})
}

export default{
	getCoupon,
	getCouponsList,
	receiveCoupon
}