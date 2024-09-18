const app = getApp();

// 获取首页内容
export async function getIndex(){
	uni.showProgress();
	uni.setProgressPercent(4)
	let [err1,index] = await uni.request({
		url:app.globalData.baseUrl + "/api/index",
	})
	uni.setProgressPercent(20)
	let [err2,category] = await uni.request({
		url:app.globalData.baseUrl + "/api/category",
	})
	uni.setProgressPercent(36)
	// 首页精品推荐type02
	let [err3,groom1] = await uni.request({
		url:app.globalData.baseUrl + "/api/groom/list/1",
	})
	uni.setProgressPercent(52)
	// 首页热门榜单type03
	let [err4,groom2] = await uni.request({
		url:app.globalData.baseUrl + "/api/groom/list/2",
	})
	uni.setProgressPercent(68)
	// 首页首发新品type04
	let [err5,groom3] = await uni.request({
		url:app.globalData.baseUrl + "/api/groom/list/3",
	})
	uni.setProgressPercent(84)
	// 首页促销单品type05
	let [err6,groom4] = await uni.request({
		url:app.globalData.baseUrl + "/api/groom/list/4",
	})
	uni.setProgressPercent(100)
	uni.closeProgress()
	// console.log(err1,err2,err3,err4,err5,err6,index,category,groom1,groom2,groom3,groom4)
	if(err1||err2||err3||err4||err5||err6){
		uni.showToast({
			title:"获取失败",
			icon:"none",
			duration:800
		})
	}else{
		return {index,category,groom1,groom2,groom3,groom4};
	}
}

// 获取商品分类
export async function getCate(){
	uni.showProgress();
	uni.setProgressPercent(20)
	let [err,category] = await uni.request({
		url:app.globalData.baseUrl + "/api/category",
	})
	uni.setProgressPercent(100)
	uni.closeProgress()
	if(err){
		uni.showToast({
			title:"获取失败",
			icon:"none",
			duration:800
		})
	}else{
		return {category};
	}
}

export default{
	getIndex,
	getCate
}