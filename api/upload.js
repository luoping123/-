import {checkLogin} from "./user.js";
const app = getApp();
// 上传图片
export function uploadImg(name,count,dir="store/comment"){
	return new Promise((resolve,reject)=>{
		checkLogin().then(()=>{
			uni.chooseImage({
				count,
				success(e) {
					uni.showProgress();
					uni.setProgressPercent(20);
					// console.log("filePath",e.tempFilePaths[0])
					uni.uploadFile({
						url:app.globalData.baseUrl + "/api/upload/image",
						filePath:e.tempFilePaths[0],
						name,
						formData: {
							'filename': name,
							'dir': 'store/comment'
						},
						header:{
							"Content-Type":"multipart/form-data",
							"Authori-zation":"Bearer " + app.globalData.token
						},
						success(res){
							let d = JSON.parse(res.data)
							console.log("上传图片成功",d)
							uni.setProgressPercent(100);
							uni.closeProgress();
							resolve(d)
						},
						fail() {
							uni.setProgressPercent(100);
							uni.closeProgress();
							uni.showToast({
								title:"上传失败"
							})
							reject()
						}
					})
				}
			})
		})
	})
}

export default{
	uploadImg
}
