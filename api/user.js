// status为0时,失败
// status为1时,成功并展示msg
// status为2时,成功但不展示msg
import {showToast} from "./msg.js";
const app = getApp();
var outTime = 10800;  // token过期时间(3小时)
// 小程序登入
export async function login(){
	let [err,e] = await checkToken()
	if(err){ // token不存在
		return await getCode();
	}else{ // token存在
		let token = e.data;
		return await getUser(token);
	}
}

// 检查token缓存是否存在
function checkToken(){
	return new Promise((resolve,reject)=>{
		uni.getStorage({
			key:"myToken",
			success(res){ // token缓存存在=>检查token是否过期
				let token = res.data;
				if(JSON.stringify(app.globalData.userInfo) == "{}"){ // 如果userInfo不存在，检测token是否过期
					getUser(token).then(e=>{ // 检查token是否过期
						if(e.status != 0){
							resolve([null,token])
						}else{
							resolve(["err",null])
						}
					})
				}else{ // 如果userInfo存在，判断是否超时
					uni.getStorage({
						key:"oldTime",
						success(o){
							let nowTime = Math.round(new Date().getTime()/1000)
							let t = parseInt(o.data) + parseInt(outTime) - parseInt(nowTime)
							// console.log("oldTime",o.data,outTime,nowTime,t)
							if(t>=0){
								resolve([null,token])
							}else{
								resolve(["err",null])
							}
						}
					})
				}
			},
			fail(err) {
				resolve([err,null])
			}
		})
	})
}

// 登入,获取code
function getCode(){
	uni.showLoading({
		title:"登入中",
		mask:true
	})
	return new Promise((resolve,reject)=>{
		uni.login({}).then(([err,e])=>{	// 登入成功
			app.globalData.code = e.code;
			resolve(getUserInfo()) 
		}).catch(()=>{ // 登入失败
			showToast(0,"获取code失败")
			resolve({status:0,msg:"获取code失败"})
		})
	})
}

// 获取用户信息并关联登入，授权使用button的open-type功能
function getUserInfo(){
	return new Promise((resolve,reject)=>{
		uni.getUserInfo({}).then(([err,e])=>{ // 获取wx用户信息用于关联登入
			if(err){ // 未授权
				uni.hideLoading();
				uni.switchTab({
					url:"/pages/user/user",
				})
				showToast(0,"登入失败，未授权")
				resolve({status:0,msg:"登入失败，未授权"})
			}else{ // 授权之后=>没账号创建账号，有账号更新信息，并拿到token(mp_auth接口)
				let url = app.globalData.baseUrl + "/api/wechat/mp_auth";
				let data = e;
				data.code = app.globalData.code;
				data.spread_spid = app.globalData.spread_spid;
				data.spread_code = app.globalData.spread_code;
				uni.request({ // 请求关联登入
					url,
					method:"POST",
					header:{"Content-Type":"application/json"},
					dataType:"json",
					data
				}).then(([err,o])=>{
					if(o.data.status == 200){
						resolve(getUser(o.data.data.token)) // 通过token获取后台user信息
						uni.setStorage({
							key:"oldTime",
							data:Math.round(new Date().getTime()/1000)
						})
						// oldTime = Math.round(new Date().getTime()/1000)
					}else{
						uni.hideLoading();
						showToast(0,"登入失败，关联登入错误")
						resolve({status:0,msg:"登入失败，关联登入错误"})
					}
				})
			}
		})
	})
}

// 通过token获取后台user信息
export function getUser(token){
	return new Promise((resolve,reject)=>{
		uni.request({
			url: app.globalData.baseUrl + "/api/user",
			header:{
				"Authori-zation":"Bearer " + token
			},
			success(u) {
				if(u.data.status == 200){
					uni.setStorageSync("myToken",token)  // 将token加入缓存
					app.globalData.userInfo = u.data.data;
					app.globalData.token = token;
					uni.hideLoading();
					resolve({status:2,msg:"登入成功"})  
				}else{ //token过期
					uni.hideLoading();
					resolve({status:0,msg:"token过期"})
				}
			}
		})
	})
}

// 检查是否登入
export function checkLogin(){
	return new Promise((resolve,reject)=>{
		checkToken().then(([err,e])=>{
			if(err){ // token不存在或失效=>未登入=>去登入
				getCode().then(o=>{
					if(o.status != 0){
						resolve(o);
					}
				})
			}else{ // token存在=>检查userIfon是否存在
				if(JSON.stringify(app.globalData.userInfo) == "{}"){ //userIfon不存在=>使用token获取用户信息
					let token = e.data;
					getUser(token).then(o=>{
						resolve(o);
					})
				}else{
					showToast(2,"登入状态存在")
					resolve({status:2,msg:"登入状态存在"});
				}
			}
		})
	})
}

// 修改用户信息
export async function editUser(data){
	let [err,e] = await uni.request({
		url: app.globalData.baseUrl + "/api/user/edit",
		method:"POST",
		header:{
			"Content-Type":"application/json",
			"Authori-zation":"Bearer " + app.globalData.token
		},
		data
	})
	if(!err){
		if(e.data.status == 200){
			app.globalData.userInfo.avatar = data.avatar;
			app.globalData.userInfo.nickname = data.nickname;
		}
		return e.data;
	}
}

// 修改/添加地址
export function editAddress(data){
	uni.showLoading({
		title:"保存中"
	})
	return new Promise((resolve,reject)=>{
		checkLogin().then(o=>{
			if(o.status != 0){
				uni.request({
					url: app.globalData.baseUrl + "/api/address/edit",
					method:"POST",
					header:{
						"Authori-zation":"Bearer " + app.globalData.token
					},
					data,
					success(e) {
						uni.hideLoading()
						resolve(e.data)
					}
				})
			}
		})
	})
}

// 获取地址列表
export function getAddressList(page=1,limit=20){
	return new Promise((resolve,reject)=>{
		uni.showProgress();
		uni.setProgressPercent(20)
		checkLogin().then(o=>{
			if(o.status != 0){
				uni.request({
					url: app.globalData.baseUrl + "/api/address/list",
					header:{
						"Authori-zation":"Bearer " + app.globalData.token
					},
					data:{
						page,
						limit
					},
					success(e){
						uni.setProgressPercent(100)
						uni.closeProgress()
						resolve(e.data)
					}
				})
			}
		})
	})
}

// 获取地址详情
export function getAddressDetail(id){
	return new Promise((resolve,reject)=>{
		uni.showProgress();
		uni.setProgressPercent(20)
		checkLogin().then(o=>{
			if(o.status != 0){
				uni.request({
					url: app.globalData.baseUrl + "/api/address/detail/" + id,
					header:{
						"Authori-zation":"Bearer " + app.globalData.token
					},
					success(e){
						uni.setProgressPercent(100)
						uni.closeProgress()
						resolve(e.data)
					}
				})
			}
		})
	})
}

// 删除地址
export function delAddress(id){
	uni.showLoading({
		title:"正在删除"
	})
	return new Promise((resolve,reject)=>{
		checkLogin().then(o=>{
			if(o.status != 0){
				uni.request({
					url: app.globalData.baseUrl + "/api/address/del",
					method:"POST",
					header:{
						"Authori-zation":"Bearer " + app.globalData.token
					},
					data:{
						id
					},
					success(e){
						console.log(e)
						uni.hideLoading()
						resolve(e.data)
					}
				})
			}
		})
	})
}

// 会员等级列表
export function getUserLevel(){
	return new Promise((resolve,reject)=>{
		checkLogin().then(o=>{
			uni.request({
				url: app.globalData.baseUrl + "/api/user/level/grade",
				header:{
					"Authori-zation":"Bearer " + app.globalData.token
				},
				success(e){
					resolve(e.data)
				}
			})
		})
	})
}

// 检测用户是否可以成为会员
export function userDetection(id){
	return new Promise((resolve,reject)=>{
		checkLogin().then(o=>{
			uni.request({
				url: app.globalData.baseUrl + "/api/user/level/detection",
				header:{
					"Authori-zation":"Bearer " + app.globalData.token
				},
				success(e){
					resolve(e.data)
				}
			})
		})
	})
}

// 获取账单
export function getBill(type=0,page=1,limit=20){
	return new Promise((resolve,reject)=>{
		checkLogin().then(o=>{
			uni.request({
				url: app.globalData.baseUrl + "/api/spread/commission/" + type,
				header:{
					"Authori-zation":"Bearer " + app.globalData.token
				},
				data:{
					page,
					limit
				},
				success(e){
					resolve(e.data)
				}
			})
		})
	})
}

// 获取积分记录
export function getIntegralList(page=1,limit=10){
	return new Promise((resolve,reject)=>{
		checkLogin().then(o=>{
			uni.request({
				url: app.globalData.baseUrl + "/api/integral/list",
				header:{
					"Authori-zation":"Bearer " + app.globalData.token
				},
				data:{
					page,
					limit
				},
				success(e){
					resolve(e.data)
				}
			})
		})
	})
}


export default{
	login,
	checkLogin,
	getUser,
	editUser,
	editAddress,
	getAddressList,
	getAddressDetail,
	delAddress,
	getUserLevel,
	userDetection,
	getBill,
	getIntegralList
}