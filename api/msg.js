export function showToast(status,msg,icon="none",duration=800){
	switch(status){
		case 1:
			uni.showToast({
				icon,
				title:msg,
				duration
			})
		break;
		case 2:
			
		break;
		case 0:
			uni.showToast({
				icon:"none",
				title:msg,
				duration
			})
		break;
	}
}


export default{
	showToast
}