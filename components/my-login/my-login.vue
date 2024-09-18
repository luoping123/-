<template>
  <view class="login-container">
    <!-- 提示登录的图标 -->
    <uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
    <!-- 登录按钮 -->
    <button type="primary" class="btn-login" @tap="getUserProfile">一键登录</button>
    <!-- 登录提示 -->
    <view class="tips-text">登录后尽享更多权益</view>
  </view>
</template>

<script>
  // 按需导入mapState, mapMutations, mapGetters 辅助函数
  import {
    mapState,
    mapMutations,
    mapGetters
  } from 'vuex'
  export default {
    computed: {
      //  从 m_user 模块中导入需要的 token 字符串
      ...mapState('m_user', ['token','redirectInfo','userInfo']),
    },
    data() {
      return {
        // userInfo:{},
        nickName:'',
        avatarUrl:'',
      };
    },
    methods:{
      // 2. 调用 mapMutations 辅助方法，把 m_user 模块中的 updateUserInfo 映射到当前组件中使用
      ...mapMutations('m_user', ['updateUserInfo', 'updateToken', 'updateRedirectInfo']),
      getUserProfile() { //新版登录
        uni.getUserProfile({
          lang: 'zh_CN',
          desc: '用于获取您的个人信息',
          success: res => {
            console.log("hhh====新版====================>>>>>>>>")
            console.log(res)
            // 获取用户信息成功，
            console.log(res.userInfo)
            // this.userInfo=res.userInfo;
            // this.avatarUrl=res.userInfo.avatarUrl;
            // this.nickName=res.userInfo.nickName;
            // 获取登录成功后的 Token 字符串
            this.getToken(res)
          },
          fail: err => { //err
            // 判断是否获取用户信息成功
            if (err.errMsg === 'getUserProfile:fail auth deny') return uni.$showMsg('您取消了登录授权！')
          },
          complete: res => { //final
          }
        })
      },
      // 调用登录接口，换取永久的 token
      async getToken(info) {
        // 调用微信登录接口
        const [err, res] = await uni.login().catch(err => err)
        console.log(res)
        // 判断是否 uni.login() 调用失败
        if (err || res.errMsg !== 'login:ok') return uni.$showError('登录失败！')
        // 准备参数对象
        const query = {
          code: res.code,
          encryptedData: info.encryptedData,
          iv: info.iv,
          rawData: info.rawData,
          signature: info.signature
        }
        //预登陆
        console.log("res.code=====================>>>>>>>>>>>>>>>>>>")
        console.log(res.code)
        const {
          data: res2
        } = await uni.$http.post('/login/wxBeforeLogin', res.code)
        console.log("res2=====================>>>>>>>>>>>>>>>>>>")
        console.log(res2)
        // 调用后台api接口  【换取 token】 
        const {
          data: loginResult
        } = await uni.$http.post('/login/wxLogin', query)
        console.log("loginResult=====================>>>>>>>>>>>>>>>>>>")
        console.log(loginResult)
        if (loginResult.status !== 200) return uni.$showMsg('登录失败！')
        uni.$showMsg('登录成功')
        console.log("登录成功")
        console.log(loginResult.data);
        // this.userInfo=loginResult.data;
        // 3. 将用户的基本信息存储到 vuex 中
        this.updateUserInfo(loginResult.data)
        // 2. 更新 vuex 中的 token
        this.updateToken(loginResult.data.token)
        
        // var page=getCurrentPages().pop();
        // if(page==undefined || page==null) return;
        // page.onShow();
        // this.$forceUpdate();
        this.navigateBack()
        // setTimeout(() => {
        //   console.log("======================================")
        //   console.log(this.avatarUrl)
        //   console.log(this.nickName)
        //   uni.navigateBack({
            
        //   })
        // }, 1500)
      },
      // 返回登录之前的页面
      navigateBack() {
        // redirectInfo 不为 null，并且导航方式为 switchTab
        console.log(this.redirectInfo.openType);
        if (this.redirectInfo && this.redirectInfo.openType === 'navigate') {
          // 调用小程序提供的 uni.switchTab() API 进行页面的导航
          uni.reLaunch({
            // 要导航到的页面地址
            url: this.redirectInfo.from,
            // 导航成功之后，把 vuex 中的 redirectInfo 对象重置为 null
            complete: () => {
              this.updateRedirectInfo(null)
            }
          })
        }
      }
    }
  }
</script>

<style lang="scss">
.login-container {
  // 登录盒子的样式
  height: 750rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f8f8f8;
  position: relative;
  overflow: hidden;

  // 绘制登录盒子底部的半椭圆造型
  &::after {
    content: ' ';
    display: block;
    position: absolute;
    width: 100%;
    height: 40px;
    left: 0;
    bottom: 0;
    background-color: white;
    border-radius: 100%;
    transform: translateY(50%);
  }

  // 登录按钮的样式
  .btn-login {
    width: 90%;
    border-radius: 100px;
    margin: 15px 0;
    background-color: #c00000;
  }

  // 按钮下方提示消息的样式
  .tips-text {
    font-size: 12px;
    color: gray;
  }
}
</style>
