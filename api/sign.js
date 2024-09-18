import {checkLogin} from "./user.js";
const app = getApp();

// 签到配置
export function signConfig(){
	return new Promise((resolve,reject)=>{
		checkLogin().then(o=>{
			uni.request({
				url: app.globalData.baseUrl + "/api/sign/config",
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

// 签到用户信息
export function signUser(sign=1,integral=1){
	return new Promise((resolve,reject)=>{
		checkLogin().then(o=>{
			uni.request({
				url: app.globalData.baseUrl + "/api/sign/user",
				method:"POST",
				header:{
					"Authori-zation":"Bearer " + app.globalData.token
				},
				data:{
					sign,
					integral
				},
				success(e) {
					resolve(e.data)
				}
			})
		})
	})
}

// 签到
export function signIntegral(){
	return new Promise((resolve,reject)=>{
		checkLogin().then(o=>{
			uni.request({
				url: app.globalData.baseUrl + "/api/sign/integral",
				method:"POST",
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

// 签到列表(年月)
export function signMonth(page=1,limit=100){
	return new Promise((resolve,reject)=>{
		checkLogin().then(o=>{
			uni.request({
				url: app.globalData.baseUrl + "/api/sign/month",
				header:{
					"Authori-zation":"Bearer " + app.globalData.token
				},
				data:{
					page,
					limit
				},
				success(e) {
					resolve(e.data)
				}
			})
		})
	})
}

export default{
	signConfig,
	signUser,
	signIntegral,
	signMonth
}