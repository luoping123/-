<template>
  <view>
    <!-- 整体大盒子 -->
    <view @click="click" :class="[index===mrsChecked ? 'mrs-checked' :'mrs-unchecked']" class="mrsBox shadow ">
      <!-- 图片  头像 -->
      <view class="mrsImage">
        <u-avatar :src="mrs.img" size="80"></u-avatar>
      </view>
      <!-- 名字 -->
      <view class="mrsName">{{mrs.name}}</view>
    </view>
  </view>
</template>

<script>
  export default {
    name: "my-mrs-y",
    props: {
      // 美容师的信息对象
      mrs: {
        type: Object,
        default: {},
      },
      mrsChecked: {
        type: Number,
        default: 0,
      },
      index: {
        type: Number,
        default: 0,
      }

    },
    data() {
      return {

      };
    },
    methods: {
      click() {
        this.$emit('click');
      }
    }
  }
</script>

<style lang="scss">
  // 美容师  未选中样式
  .mrs-unchecked {
    border-radius: 15rpx;
  }

  // 美容师  选中样式
  .mrs-checked {
    border-radius: 175rpx 175rpx 0 0;
    background-color: #f484b2;
  }

  .mrsName {
    position: relative;
    top: 90rpx;
    left: 110rpx;
    width: 80rpx;
    height: 50rpx;
  }

  .mrsImage {
    position: relative;
    top: 50rpx;
    left: 60rpx;
    width: 190rpx;
    height: 190rpx;
  }

  .mrsBox {
    margin-left: 20rpx;
    margin-top: 15rpx;
    margin-bottom: 15rpx;
    width: 300rpx;
    height: 350rpx;
  }
</style>
