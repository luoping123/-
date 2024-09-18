const app = getApp();
import {checkLogin} from "./user.js";

// 获取商品详情
export async function getGoodsDetail(goods_id){
	uni.showProgress();
	uni.setProgressPercent(20)
	let o = await checkLogin();
	if(o.status != 0){
		let [err,data] = await uni.request({
			url:app.globalData.baseUrl + "/api/product/detail/"+goods_id,
			header:{
				"Authori-zation":"Bearer " + app.globalData.token
			},
		})
		uni.setProgressPercent(100)
		uni.closeProgress()
		if(err){
			uni.showToast({
				title:"获取失败",
				icon:"loading",
				duration:800
			})
		}else{
			return{data}
		}
	}else{uni.navigateBack({})}
}

// 获取商品评论
export async function getGoodsReply(goods_id){
	uni.showProgress();
	uni.setProgressPercent(20)
	let [err,data] = await uni.request({
		url:app.globalData.baseUrl + " /api/reply/list/"+goods_id,
	})
	uni.setProgressPercent(100)
	uni.closeProgress()
	if(err){
		uni.showToast({
			title:"获取失败",
			icon:"loading",
			duration:800
		})
	}else{
		return{data}
	}
}

// 获取商品列表数据
export async function getGoodsList(data){
	let obj = {};
	uni.showProgress();
	uni.setProgressPercent(20)
	let [err,e] = await uni.request({
		url:app.globalData.baseUrl + "/api/products",
		data
	})
	uni.setProgressPercent(60)
	if(err){
		uni.showToast({
			title:"获取失败",
			icon:"loading",
			duration:800
		})
	}else{
		let d = e.data;
		if(JSON.stringify(d.data) != "[]"){
			obj.goodsList = d;
			obj.showHot = false;
			uni.setProgressPercent(100)
			uni.closeProgress()
			return obj;
		}else{  //data为空时，加载热门推荐
			let h = await getHotGoods();
			obj.goodsList = d;
			obj.hotGoods = h;
			obj.showHot = true;
			uni.setProgressPercent(100)
			uni.closeProgress()
			return obj;
		}
	}
}

// 获取热门推荐
export async function getHotGoods(data={page:1,limit:4}){
	let [err,e] = await uni.request({
		url:app.globalData.baseUrl + "/api/product/hot",
		header:{
			"Content-Type":"application/json"
		},
		data
	})
	if(err){
		uni.showToast({
			title:"获取失败",
			icon:"loading",
			duration:800
		})
	}else{
		let h = e.data;
		return h;
	}
}


export default{
	getGoodsDetail,
	getGoodsReply,
	getGoodsList,
	getHotGoods
}