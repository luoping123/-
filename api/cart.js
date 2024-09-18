import {checkLogin} from "./user.js";
const app = getApp();

// 添加购物车
export function addCart(data){
	return new Promise((resolve,reject)=>{
		checkLogin().then(o=>{
			uni.request({
				url: app.globalData.baseUrl + "/api/cart/add",
				method:"POST",
				header:{
					"Content-Type":"application/json",
					"Authori-zation":"Bearer " + app.globalData.token
				},
				data,
				success(e) {
					resolve(e.data)
				}
			})
		})
	})
}

// 获取购物车数量
export function getCartCount(){
	return new Promise((resolve,reject)=>{
		checkLogin().then(o=>{
			uni.request({
				url: app.globalData.baseUrl + "/api/cart/count",
				header:{
					"Authori-zation":"Bearer " + app.globalData.token
				},
				data:{
					numType:true
				},
				success(e) {
					resolve(e.data)
				}
			})
		})
	})
}

// 获取购物车列表
export function getCartList(){
	return new Promise((resolve,reject)=>{
		checkLogin().then(o=>{
			uni.showProgress();
			uni.setProgressPercent(20)
			uni.request({
				url: app.globalData.baseUrl + "/api/cart/list",
				header:{
					"Authori-zation":"Bearer " + app.globalData.token
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

// 购物车 修改产品数量
export function cartNum(id,number){
	return new Promise((resolve,reject)=>{
		checkLogin().then(o=>{
			uni.request({
				url: app.globalData.baseUrl + "/api/cart/num",
				method:"POST",
				header:{
					"Authori-zation":"Bearer " + app.globalData.token
				},
				data:{
					id,
					number
				},
				success(e) {
					resolve(e.data)
				}
			})
		})
	})
}

// 删除购物车
export function delCart(ids){
	return new Promise((resolve,reject)=>{
		checkLogin().then(o=>{
			uni.request({
				url: app.globalData.baseUrl + "/api/cart/del",
				method:"POST",
				header:{
					"Authori-zation":"Bearer " + app.globalData.token
				},
				data:{
					ids
				},
				success(e) {
					resolve(e.data)
				}
			})
		})
	})
}

export default{
	addCart,
	getCartCount,
	getCartList,
	cartNum,
	delCart
}