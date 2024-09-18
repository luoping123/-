import {checkLogin} from "./user.js";
const app = getApp();

// 热门搜索关键字获取
export function getSearchKeyword(){
	return new Promise((resolve,reject)=>{
		uni.showProgress();
		uni.setProgressPercent(20)
		checkLogin().then(o=>{
			uni.request({
				url: app.globalData.baseUrl + "/api/search/keyword",
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
	getSearchKeyword
}