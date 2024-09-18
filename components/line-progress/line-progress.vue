<template>
  <!-- 进度条自定义组件 -->
	<view class="progress" v-if="show">
		<u-line-progress :striped="true" :height="10" :round="false" active-color="#3491ff" :percent="percent" :striped-active="true" ><block></block></u-line-progress>
	</view>
</template>

<script>
	export default{
		name:"progress",
		data(){
			return{
				show:false,
				timeOut:5000,
				percent:0
			}
		},
		created(){
			const that = this;
			uni.showProgress = function(){
				that.show = true;
				that.clear()
			}
			uni.setProgressPercent = function(p){
				that.percent = p
			}
			uni.closeProgress = function(){
				setTimeout(()=>{
					that.show = false;
				},500)
			}
		},
		methods:{
			clear:function(){
				const that = this;
				setTimeout(()=>{
					that.show = false;
				},that.timeOut)
			}
		}
	}
</script>

<style>
	.progress{
		position: fixed;
		top: 0;
		left: 0;
		z-index: 9999;
		width: 100%;
		height: 20rpx;
		margin-top: var(--status-bar-height);
	}
</style>
