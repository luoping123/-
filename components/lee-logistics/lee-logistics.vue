<template>
  <block v-if="init">
    <scroll-view class="lee-logistics-scroll" :style="{ height }" scroll-y="true" v-if="result">
      <view class="lee-logistics">
        <!-- 物流公司与送达状态面板 -->
        <view class="lee-logistics-caption">
          <image class="lee-logistics-caption-logo" :src="result.logo" mode="widthFix" />
          <view class="lee-logistics-caption-info">
            <view class="lee-logistics-caption-status">{{ deliverystatus[result.deliverystatus].status  }}</view>
            <view class="lee-logistics-caption-nu">
              <text>{{ result.expName }}：</text>
              <text>{{ result.number }}</text>
            </view>
          </view>
        </view>
        <!-- 物流公司与送达状态面板END -->

        <!-- 物流信息列表 -->
        <view class="lee-logistics-list">
          <view class="lee-logistics-msg" v-for="(item, index) of result.list" :key="index">
            <view class="lee-logistics-msg-time">
              <view>{{ item.time.split(' ')[1] }}</view>
              <view>{{ item.time.split(' ')[0] }}</view>
            </view>
            <view class="lee-logistics-msg-context">
              <rich-text :nodes="item.status | contextFormatter"></rich-text>
            </view>
          </view>
        </view>
        <!-- 物流信息列表END -->
      </view>
    </scroll-view>
    <view class="lee-logistics-defults" :style="{ height }" v-else>
      <view class="lee-logistics-defults-icon leeIcon-empty"></view>
      <view class="lee-logistics-defults-title">暂无查询结果</view>
      <view class="lee-logistics-defults-intro">单号输入错误或暂未寄出</view>
    </view>
  </block>
</template>

<script>
  export default {
    props: {
      no: {
        type: String,
        required: true
      },
      height: {
        type: String,
        default: '100%'
      }
    },
    data() {
      return {
        init: false,
        result: null,
        deliverystatus: [{
          status: '快递收件(揽件)'
        }, {
          status: '在途中'
        }, {
          status: '正在派件'
        }, {
          status: '已签收'
        }, {
          status: '派送失败'
        }, {
          status: '疑难件'
        }, {
          status: '退件签收'
        }, ],
      }
    },
    filters: {
      // 格式化物流信息
      contextFormatter(v) {
        return v.replace(/\d{11}/, re => `<span class="phoneText">${re}</span>`)
      }
    },
    onLoad(){
      console.log("============121212================")
      this.search();
    },
    methods: {
      // 查询快递信息
      search() {
        const that = this;
        wx.request({
          url: 'https://wuliu.market.alicloudapi.com/kdi',
          method: 'GET',
          header: {
            "Authorization": "APPCODE 1a45d486b6ea4603b4fe859cc6a7a1eb"
          },
          data: {
            // type:"zto",
            no: that.no //"9887252432111"//快递单号
          },
          success(res) {
            //console.log(res.data)
            // cb(res.data);
            that.dataHandler(res.data)
          }
        })
      },
      // 查询到数据后的处理函数
      dataHandler(res) {
        console.log("res==============>>>>>>>>>>")
        console.log(res);
        this.init = true
        this.result = res.status == 0 ? res.result : null
      }
    }
  }
</script>

<style lang="scss">
  @import './icon.scss';

  .lee-logistics-defults {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    color: $uni-text-color-grey;

    &-icon {
      font-size: 200rpx;
      font-weight: 600;
    }

    &-title {
      font-size: 40rpx;
      margin-bottom: 10rpx;
    }

    &-intro {
      font-size: 32rpx;
    }
  }

  .lee-logistics {
    padding: 30rpx;

    &-list {
      padding: 30rpx;
      background-color: $uni-bg-color;
      border-radius: 8rpx;
      box-shadow: 0 0 2rpx rgba(0, 0, 0, .15);
      padding-top: 50rpx;
    }
  }

  .lee-logistics-caption {
    padding: 30rpx;
    background-color: $uni-bg-color;
    border-radius: 8rpx;
    box-shadow: 0 0 2rpx rgba(0, 0, 0, .15);
    display: flex;
    align-items: center;
    margin-bottom: 30rpx;

    &-logo {
      $size: 120rpx;
      width: $size;
      height: $size;
    }

    &-info {
      flex: 1;
      width: 0;
      margin-left: 30rpx;
    }

    &-status {
      font-size: 36rpx;
      font-weight: 400;
      margin-bottom: 10rpx;
    }

    &-nu {
      font-size: 32rpx;
    }
  }

  .lee-logistics-msg {
    display: flex;

    &-time {
      width: 140rpx;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      padding-right: 30rpx;
      font-size: 24rpx;
    }

    &-context {
      flex: 1;
      width: 0;
      padding-left: 30rpx;
      padding-bottom: 50rpx;
      border-left: 2rpx solid $uni-border-color;
      position: relative;
      font-size: 32rpx;

      &::before {
        --size: 20rpx;
        content: '';
        position: absolute;
        width: var(--size);
        height: var(--size);
        top: calc(-1 * var(--size) / 2);
        left: calc(-1 * var(--size) / 2);
        background-color: $uni-border-color;
        border-radius: 50%;
      }

    }

    &:last-child>&-context {
      border: none;
    }

    &:first-child>&-context {
      border-color: $uni-color-primary;
      border-left-style: dashed;

      &::before {
        --size: 30rpx;
        background-color: $uni-color-primary;
      }
    }
  }

  .phoneText {
    color: $uni-color-primary;
    font-weight: 600;
  }
</style>
