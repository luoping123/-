<template>
  <view>
    <u-scroll-list @right="right" @left="left">
      <view class="scroll-list" style="flex-direction: row;">
        <view class="scroll-list__goods-item" v-for="(item, index) in scrollRigntList" :key="index"
          :class="[(index === 9) && 'scroll-list__goods-item--no-margin-right']">
          <image class="scroll-list__goods-item__image" :src="item.thumb"></image>
          <text class="scroll-list__goods-item__text">￥{{ item.price }}</text>
        </view>
        <view class="scroll-list__show-more">
          <text class="scroll-list__show-more__text">查看更多</text>
          <u-icon name="arrow-leftward" color="#f56c6c" size="12"></u-icon>
        </view>
      </view>
    </u-scroll-list>
  </view>
</template>

<script>
  export default {
    name:"my-scroll-list",
    props:{
      // 横向滚动列表
      scrollRigntList: {
        type: Object,
        default: {},
      },
    },
    data() {
      return {
        
      };
    },
    methods:{
      left() {
        this.$emit('left');
      },
      right() {
        this.$emit('right');
      }
    }
  }
</script>

<style lang="scss">
// 横向滚动
  .scroll-list {
  	@include flex(column);
  
  	&__goods-item {
  		margin-right: 20px;
  
  		&__image {
  			width: 60px;
  			height: 60px;
  			border-radius: 4px;
  		}
  
  		&__text {
  			color: #f56c6c;
  			text-align: center;
  			font-size: 12px;
  			margin-top: 5px;
  		}
  	}
  
  	&__show-more {
  		background-color: #fff0f0;
  		border-radius: 3px;
  		padding: 3px 6px;
  		@include flex(column);
  		align-items: center;
  
  		&__text {
  			font-size: 12px;
  			width: 12px;
  			color: #f56c6c;
  			line-height: 16px;
  		}
  	}
  }
</style>
