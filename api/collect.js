var app = getApp();
import {checkLogin} from "./user.js";

// 添加收藏
export function addCollect(id){
	return new Promise((resolve,reject)=>{
		checkLogin().then(o=>{
			uni.request({
				url: app.globalData.baseUrl + "/api/collect/add",
				method:"POST",
				header:{
					"Content-Type":"application/json",
					"Authori-zation":"Bearer " + app.globalData.token
				},
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

// 取消收藏
export function delCollect(id){
	return new Promise((resolve,reject)=>{
		checkLogin().then(o=>{
			uni.request({
				url: app.globalData.baseUrl + "/api/collect/del",
				method:"POST",
				header:{
					"Content-Type":"application/json",
					"Authori-zation":"Bearer " + app.globalData.token
				},
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

// 批量收藏
export function collectAll(id,category="product"){
	return new Promise((resolve,reject)=>{
		checkLogin().then(o=>{
			uni.request({
				url: app.globalData.baseUrl + "/api/collect/all",
				method:"POST",
				header:{
					"Content-Type":"application/json",
					"Authori-zation":"Bearer " + app.globalData.token
				},
				data:{
					id,
					category
				},
				success(e) {
					resolve(e.data)
				}
			})
		})
	})
}

// 收藏列表
export function getCollectList(page=1,limit=10){
	return new Promise((resolve,reject)=>{
		checkLogin().then(o=>{
			uni.showProgress();
			uni.setProgressPercent(20)
			uni.request({
				url: app.globalData.baseUrl + "/api/collect/user",
				header:{
					"Authori-zation":"Bearer " + app.globalData.token
				},
				data:{
					page,
					limit
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

export default{
	addCollect,
	delCollect,
	collectAll,
	getCollectList
}